'use client'

import { EnhancedNFTCard } from './EnhancedNFTCard'
import { LiveSupplyCounter } from '@/components/web3/LiveSupplyCounter'
import { useRankings } from '@/lib/hooks/useRankings'

/**
 * NFTGallery Component
 *
 * Displays a grid of NFTs with:
 * - Real-time data from rankings API (2470+ NFTs)
 * - Auto-refresh every 30 seconds
 * - Live supply counter from smart contract
 * - Loading state with skeleton cards
 * - Empty state with mint CTA
 * - Error state with retry button
 * - Responsive grid layout (1-4 columns)
 * - Automatic fallback to mock data if API unavailable
 */
export function NFTGallery() {
  const { rankings: nfts, loading: isLoading, error, lastUpdated, refresh } = useRankings(30000)

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
          onClick={refresh}
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

  // NFT Grid with Enhanced Cards and Real-time Features
  return (
    <div className="space-y-8">
      {/* Header with Live Supply Counter */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">
              Collection Gallery
            </h2>
            <button
              onClick={refresh}
              className="flex items-center gap-2 px-3 py-1 text-sm text-kek-green border border-kek-green/30 rounded-lg hover:border-kek-green hover:bg-kek-green/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
          
          {/* Real-time Update Indicator */}
          {lastUpdated && (
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <div className="w-2 h-2 bg-kek-green rounded-full animate-pulse"></div>
              <span>
                Last updated: {lastUpdated.toLocaleTimeString()} • Auto-refreshing every 30s
              </span>
            </div>
          )}
        </div>
        
        {/* Live Supply Counter */}
        <div className="w-full lg:w-80">
          <LiveSupplyCounter />
        </div>
      </div>

      {/* NFT Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {nfts.map((nft) => (
          <EnhancedNFTCard key={nft.tokenId} nft={nft} />
        ))}
      </div>
      
      {/* Footer Stats */}
      <div className="text-center text-gray-400 border-t border-gray-800 pt-6">
        <p>Showing {nfts.length} NFTs • Updates automatically every 30 seconds</p>
      </div>
    </div>
  )
}
