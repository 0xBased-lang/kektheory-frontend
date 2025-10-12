/**
 * KEKTV Blockchain Service
 * Interacts with KEKTV NFT contract on BASED Chain
 */

// BASED Chain Configuration
export const BASED_CHAIN_CONFIG = {
  chainId: 32323,
  chainIdHex: '0x7e43',
  name: 'BASED',
  rpcUrl: 'https://rpc.bf1337.org',
  explorerUrl: 'https://explorer.bf1337.org',
  nativeCurrency: {
    name: 'BASED',
    symbol: 'BASED',
    decimals: 18
  }
}

// Contract Addresses
export const CONTRACTS = {
  KEKTECH: '0x40B6184b901334C0A88f528c1A0a1de7a77490f1',
  KEKTV: '0x7FEF981beE047227f848891c6C9F9dad11767a48'
}

// ERC-721 ABI will be used in future versions for more complex interactions
// For now, we use simple eth_call with encoded function data

export interface NFTListing {
  tokenId: number
  name: string
  image: string
  price: string
  priceInBased: number
  owner: string
  listed: boolean
}

export interface UserNFTHoldings {
  kektech: number
  kektv: number
}

/**
 * Get NFT balance for a wallet address
 */
export async function getNFTBalance(
  walletAddress: string,
  contractAddress: string
): Promise<number> {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('No ethereum provider found')
    }

    // Use eth_call to query balance
    const data = encodeFunctionData('balanceOf(address)', [walletAddress])

    const result = await window.ethereum.request({
      method: 'eth_call',
      params: [
        {
          to: contractAddress,
          data: data
        },
        'latest'
      ]
    })

    // Decode result (it's a uint256)
    return parseInt(result as string, 16)
  } catch (error) {
    console.error('Error fetching NFT balance:', error)
    return 0
  }
}

/**
 * Get user's NFT holdings for both KEKTECH and KEKTV
 */
export async function getUserNFTHoldings(
  walletAddress: string
): Promise<UserNFTHoldings> {
  try {
    const [kektechBalance, kektvBalance] = await Promise.all([
      getNFTBalance(walletAddress, CONTRACTS.KEKTECH),
      getNFTBalance(walletAddress, CONTRACTS.KEKTV)
    ])

    return {
      kektech: kektechBalance,
      kektv: kektvBalance
    }
  } catch (error) {
    console.error('Error fetching user holdings:', error)
    return { kektech: 0, kektv: 0 }
  }
}

/**
 * Fetch KEKTV listings from blockchain
 * Note: This is a simplified version - a real implementation would need:
 * - A marketplace contract with listing functions
 * - Or indexing events from the blockchain
 * - Or a backend API that tracks listings
 */
export async function getKEKTVListings(): Promise<NFTListing[]> {
  try {
    // For now, return mock data with BASED pricing
    // TODO: Implement real marketplace contract integration
    return [
      {
        tokenId: 1,
        name: 'KEKTV #001',
        image: '/images/kektv-placeholder.gif',
        price: '10 BASED',
        priceInBased: 10,
        owner: '0x0000000000000000000000000000000000000000',
        listed: true
      },
      {
        tokenId: 2,
        name: 'KEKTV #002',
        image: '/images/kektv-placeholder.gif',
        price: '15 BASED',
        priceInBased: 15,
        owner: '0x0000000000000000000000000000000000000000',
        listed: true
      },
      {
        tokenId: 3,
        name: 'KEKTV #003',
        image: '/images/kektv-placeholder.gif',
        price: '20 BASED',
        priceInBased: 20,
        owner: '0x0000000000000000000000000000000000000000',
        listed: true
      }
    ]
  } catch (error) {
    console.error('Error fetching KEKTV listings:', error)
    return []
  }
}

/**
 * Get KEKTV marketplace statistics
 */
export async function getKEKTVMarketplaceStats() {
  try {
    // TODO: Implement real stats from blockchain/marketplace contract
    return {
      totalListed: 9,
      floorPrice: 10,
      holders: 7,
      volume24h: 250
    }
  } catch (error) {
    console.error('Error fetching marketplace stats:', error)
    return {
      totalListed: 0,
      floorPrice: 0,
      holders: 0,
      volume24h: 0
    }
  }
}

/**
 * Helper function to encode function data for eth_call
 */
function encodeFunctionData(signature: string, params: unknown[]): string {
  // Simple function signature hashing (first 4 bytes of keccak256)
  const functionSelector = keccak256(signature).slice(0, 10)

  // For balanceOf, we need to encode the address parameter
  if (signature === 'balanceOf(address)' && params.length === 1) {
    const address = (params[0] as string).toLowerCase().replace('0x', '')
    // Pad address to 32 bytes (64 hex chars)
    const paddedAddress = address.padStart(64, '0')
    return functionSelector + paddedAddress
  }

  return functionSelector
}

/**
 * Simple keccak256 hash (for function selectors)
 * In production, use a proper library like ethers.js
 */
function keccak256(text: string): string {
  // For now, return pre-computed hash for balanceOf
  // In production, use: import { keccak256 as keccak } from 'ethers'
  const precomputed: { [key: string]: string } = {
    'balanceOf(address)': '0x70a08231'
  }

  return precomputed[text] || '0x00000000'
}

// Type declaration for ethereum provider is handled globally