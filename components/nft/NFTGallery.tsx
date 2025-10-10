'use client'

import { useState, useEffect } from 'react'
import { NFTCard } from './NFTCard'
import { fetchRankingsWithFallback, type RankingNFT } from '@/lib/api/kektech-rankings'

/**
 * NFTGallery Component
 *
 * Displays a grid of NFTs with:
 * - Real-time data from rankings API (2470+ NFTs)
 * - Loading state with skeleton cards
 * - Empty state with mint CTA
 * - Error state with retry button
 * - Responsive grid layout (1-4 columns)
 * - Automatic fallback to mock data if API unavailable
 */
export function NFTGallery() {
  const [nfts, setNfts] = useState<RankingNFT[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadNFTs() {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch from rankings API with automatic fallback to mock data
        const data = await fetchRankingsWithFallback()

        console.log(`✅ Gallery: Loaded ${data.nfts.length} NFTs`)
        setNfts(data.nfts)
      } catch (err) {
        // This should rarely happen since fetchRankingsWithFallback has built-in fallback
        console.error('❌ Gallery: Failed to load NFTs:', err)
        setError(err instanceof Error ? err.message : 'Failed to load NFTs')
      } finally {
        setIsLoading(false)
      }
    }

    loadNFTs()
  }, [])

  // Loading State
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
            <div className="p-4">
              <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="mb-3 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="mb-3 flex gap-1">
                <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="h-9 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-900/20">
        <div className="mb-4 text-4xl">⚠️</div>
        <h3 className="mb-2 text-lg font-semibold text-red-900 dark:text-red-100">
          Failed to Load NFTs
        </h3>
        <p className="mb-4 text-red-700 dark:text-red-300">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  // Empty State
  if (nfts.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 text-6xl">🎨</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          No NFTs Yet
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Be the first to mint a KEKTECH NFT!
        </p>
        <a
          href="/mint"
          className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Start Minting
        </a>
      </div>
    )
  }

  // NFT Grid
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {nfts.map((nft) => (
        <NFTCard key={nft.tokenId} nft={nft} />
      ))}
    </div>
  )
}
