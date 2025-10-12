'use client'

import { useState, useEffect } from 'react'

/**
 * NFT Item from BasedAI Explorer API
 */
export interface NFTItem {
  id: string
  image_url: string | null
  animation_url: string | null
  metadata: {
    name?: string
    description?: string
    image_url?: string
    attributes?: Array<{
      trait_type: string
      value: string | number
    }>
  } | null
  token: {
    name: string
    symbol: string
    address_hash: string
    type: string
  }
  token_type: string
  value: string
}

/**
 * useWalletNFTs Hook
 *
 * Fetches all NFTs owned by a wallet address from BasedAI Explorer API
 *
 * @param address - Wallet address to fetch NFTs for
 * @returns Object containing NFTs, loading state, and error state
 */
export function useWalletNFTs(address: string | undefined) {
  const [nfts, setNfts] = useState<NFTItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address) {
      setNfts([])
      setLoading(false)
      return
    }

    async function fetchNFTs() {
      setLoading(true)
      setError(null)

      try {
        // Fetch NFTs from BasedAI Explorer API
        const response = await fetch(
          `https://explorer.bf1337.org/api/v2/addresses/${address}/nft`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch NFTs: ${response.statusText}`)
        }

        const data = await response.json()
        setNfts(data.items || [])
      } catch (err) {
        console.error('Error fetching NFTs:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch NFTs')
        setNfts([])
      } finally {
        setLoading(false)
      }
    }

    fetchNFTs()
  }, [address])

  return { nfts, loading, error }
}
