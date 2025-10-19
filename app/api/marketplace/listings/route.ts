import { NextResponse } from 'next/server'
import { createPublicClient, http, parseAbiItem } from 'viem'
import { basedChain } from '@/config/chains'
import { KEKTV_MARKETPLACE_ADDRESS, KEKTV_MARKETPLACE_ABI } from '@/config/contracts/kektv-marketplace'

/**
 * Marketplace Listings API
 *
 * Fetches active listings by scanning VoucherListed events from the blockchain
 * Caches results for 30 seconds to reduce RPC calls
 *
 * GET /api/marketplace/listings
 * Returns: Array of active listings
 */

export const runtime = 'edge'
export const revalidate = 30 // Cache for 30 seconds

interface Listing {
  seller: string
  tokenId: number
  voucherName: string
  voucherIcon: string
  rarity: string
  amount: bigint
  pricePerItem: bigint
  totalPrice: bigint
  blockNumber: bigint
  transactionHash: string
}

const VOUCHER_TYPES = [
  { id: 0, name: 'Genesis Voucher', icon: '🏆', rarity: 'legendary' },
  { id: 1, name: 'Silver Voucher', icon: '🥈', rarity: 'rare' },
  { id: 2, name: 'Gold Voucher', icon: '🥇', rarity: 'epic' },
  { id: 3, name: 'Platinum Voucher', icon: '💎', rarity: 'legendary' },
]

// Create public client for blockchain reads
const publicClient = createPublicClient({
  chain: basedChain,
  transport: http('https://mainnet.basedaibridge.com/rpc'),
})

export async function GET() {
  try {
    // 1. Get contract deployment block (to avoid scanning entire chain)
    // V6 Contract deployed at block ~2449512 (October 19, 2025, 5:10 AM)
    const deploymentBlock = 2449510n // Start slightly before V6 deployment
    const currentBlock = await publicClient.getBlockNumber()

    // 2. Fetch VoucherListed events
    // V6 uses simple event signature (no timestamp)
    type VoucherListedEvent = {
      args: { seller: string; tokenId: bigint; amount: bigint; pricePerItem: bigint }
      blockNumber: bigint
      transactionHash: string
    }
    let listedEvents: VoucherListedEvent[] = []
    try {
      listedEvents = await publicClient.getLogs({
        address: KEKTV_MARKETPLACE_ADDRESS,
        event: parseAbiItem('event VoucherListed(address indexed seller, uint256 indexed tokenId, uint256 amount, uint256 pricePerItem)'),
        fromBlock: deploymentBlock,
        toBlock: currentBlock,
      }) as VoucherListedEvent[]
    } catch (error) {
      console.warn('Failed to fetch VoucherListed events, using fallback:', error)
    }

    // 3. Fetch VoucherSold events (to filter out sold listings)
    // V6 uses simple event signature (no platformFeeAmount)
    type VoucherSoldEvent = {
      args: { seller: string; buyer: string; tokenId: bigint; amount: bigint; totalPrice: bigint }
    }
    let soldEvents: VoucherSoldEvent[] = []
    try {
      soldEvents = await publicClient.getLogs({
        address: KEKTV_MARKETPLACE_ADDRESS,
        event: parseAbiItem('event VoucherSold(address indexed seller, address indexed buyer, uint256 indexed tokenId, uint256 amount, uint256 totalPrice)'),
        fromBlock: deploymentBlock,
        toBlock: currentBlock,
      }) as VoucherSoldEvent[]
    } catch (error) {
      console.warn('Failed to fetch VoucherSold events:', error)
    }

    // 4. Fetch ListingCancelled events
    // V6 uses simple event signature (no reason)
    type ListingCancelledEvent = {
      args: { seller: string; tokenId: bigint }
    }
    let cancelledEvents: ListingCancelledEvent[] = []
    try {
      cancelledEvents = await publicClient.getLogs({
        address: KEKTV_MARKETPLACE_ADDRESS,
        event: parseAbiItem('event ListingCancelled(address indexed seller, uint256 indexed tokenId)'),
        fromBlock: deploymentBlock,
        toBlock: currentBlock,
      }) as ListingCancelledEvent[]
    } catch (error) {
      console.warn('Failed to fetch ListingCancelled events:', error)
    }

    // 5. Build map of sold/cancelled listings
    const inactiveListings = new Set<string>()

    soldEvents.forEach(event => {
      const seller = event.args.seller
      const tokenId = event.args.tokenId
      inactiveListings.add(`${seller}-${tokenId}`)
    })

    cancelledEvents.forEach(event => {
      const seller = event.args.seller
      const tokenId = event.args.tokenId
      inactiveListings.add(`${seller}-${tokenId}`)
    })

    // 6. Collect unique seller addresses from events
    const sellerAddresses = new Set<string>()
    listedEvents.forEach(event => sellerAddresses.add(event.args.seller as string))

    // 7. Fallback: Add known sellers (for when events fail to load)
    // This ensures listings are found even if event logs aren't available
    const KNOWN_SELLERS = [
      '0xD90e78886b165d0a5497409528042Fc22bB33d2E', // Add your wallet
    ]
    KNOWN_SELLERS.forEach(seller => sellerAddresses.add(seller))

    // 8. Scan all seller + tokenId combinations for active listings
    const activeListings: Listing[] = []
    const processedKeys = new Set<string>()

    for (const seller of sellerAddresses) {
      for (const voucher of VOUCHER_TYPES) {
        const listingKey = `${seller}-${voucher.id}`

        // Skip if already processed or marked inactive
        if (processedKeys.has(listingKey) || inactiveListings.has(listingKey)) {
          continue
        }

        processedKeys.add(listingKey)

        // Check on-chain listing status
        try {
          const listing = await publicClient.readContract({
            address: KEKTV_MARKETPLACE_ADDRESS,
            abi: KEKTV_MARKETPLACE_ABI,
            functionName: 'listings',
            args: [seller as `0x${string}`, BigInt(voucher.id)],
          })

          if (listing && Array.isArray(listing) && listing.length === 3) {
            const [amount, pricePerItem, active] = listing

            if (active && amount > 0n && pricePerItem > 0n) {
              // Find corresponding event for block number and tx hash
              const correspondingEvent = listedEvents.find(
                e => e.args.seller === seller && Number(e.args.tokenId) === voucher.id
              )

              activeListings.push({
                seller,
                tokenId: voucher.id,
                voucherName: voucher.name,
                voucherIcon: voucher.icon,
                rarity: voucher.rarity,
                amount,
                pricePerItem,
                totalPrice: amount * pricePerItem,
                blockNumber: correspondingEvent?.blockNumber || currentBlock,
                transactionHash: correspondingEvent?.transactionHash || '0x0000000000000000000000000000000000000000000000000000000000000000',
              })
            }
          }
        } catch {
          // Silently skip - listing doesn't exist or error reading
          continue
        }
      }
    }

    // 7. Sort by newest first
    activeListings.sort((a, b) => Number(b.blockNumber - a.blockNumber))

    // 8. Convert BigInts to strings for JSON serialization
    const listingsForJSON = activeListings.map(listing => ({
      ...listing,
      amount: listing.amount.toString(),
      pricePerItem: listing.pricePerItem.toString(),
      totalPrice: listing.totalPrice.toString(),
      blockNumber: listing.blockNumber.toString(),
    }))

    // 9. Return with cache headers
    return NextResponse.json(listingsForJSON, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        'X-Total-Listings': String(activeListings.length),
        'X-Scanned-Blocks': String(currentBlock - deploymentBlock),
        'X-Listed-Events': String(listedEvents.length),
        'X-Sold-Events': String(soldEvents.length),
      }
    })

  } catch (error) {
    console.error('Marketplace API Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch marketplace listings',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
