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
    const listedEvents = await publicClient.getLogs({
      address: KEKTV_MARKETPLACE_ADDRESS,
      event: parseAbiItem('event VoucherListed(address indexed seller, uint256 indexed tokenId, uint256 amount, uint256 pricePerItem)'),
      fromBlock: deploymentBlock,
      toBlock: currentBlock,
    })

    // 3. Fetch VoucherSold events (to filter out sold listings)
    // V6 uses simple event signature (no platformFeeAmount)
    const soldEvents = await publicClient.getLogs({
      address: KEKTV_MARKETPLACE_ADDRESS,
      event: parseAbiItem('event VoucherSold(address indexed seller, address indexed buyer, uint256 indexed tokenId, uint256 amount, uint256 totalPrice)'),
      fromBlock: deploymentBlock,
      toBlock: currentBlock,
    })

    // 4. Fetch ListingCancelled events
    // V6 uses simple event signature (no reason)
    const cancelledEvents = await publicClient.getLogs({
      address: KEKTV_MARKETPLACE_ADDRESS,
      event: parseAbiItem('event ListingCancelled(address indexed seller, uint256 indexed tokenId)'),
      fromBlock: deploymentBlock,
      toBlock: currentBlock,
    })

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

    // 6. Filter active listings and verify on-chain
    const activeListings: Listing[] = []

    for (const event of listedEvents) {
      const seller = event.args.seller as string
      const tokenId = Number(event.args.tokenId)
      const listingKey = `${seller}-${tokenId}`

      // Skip if sold or cancelled
      if (inactiveListings.has(listingKey)) {
        continue
      }

      // Verify listing is still active on-chain
      // V6 contract uses direct struct access via listings mapping
      try {
        const listing = await publicClient.readContract({
          address: KEKTV_MARKETPLACE_ADDRESS,
          abi: KEKTV_MARKETPLACE_ABI,
          functionName: 'listings',
          args: [seller as `0x${string}`, BigInt(tokenId)],
        })

        if (listing && Array.isArray(listing) && listing.length === 3) {
          const [amount, pricePerItem, active] = listing

          if (active && amount > 0n && pricePerItem > 0n) {
            const voucherInfo = VOUCHER_TYPES.find(v => v.id === tokenId)

            activeListings.push({
              seller,
              tokenId,
              voucherName: voucherInfo?.name || `Voucher #${tokenId}`,
              voucherIcon: voucherInfo?.icon || '🎫',
              rarity: voucherInfo?.rarity || 'common',
              amount,
              pricePerItem,
              totalPrice: amount * pricePerItem,
              blockNumber: event.blockNumber,
              transactionHash: event.transactionHash,
            })
          }
        }
      } catch (error) {
        console.error(`Failed to verify listing for ${seller}-${tokenId}:`, error)
        continue
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
