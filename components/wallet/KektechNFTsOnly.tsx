'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useWalletNFTs } from '@/lib/hooks/useWalletNFTs'
import { KEKTECH_CONTRACT_ADDRESS } from '@/config/constants'

interface KektechNFTsOnlyProps {
  address: string
}

/**
 * KektechNFTsOnly Component
 *
 * Displays ONLY KEKTECH NFTs (filters out all other NFTs)
 */
export function KektechNFTsOnly({ address }: KektechNFTsOnlyProps) {
  const { nfts, loading, error, retry } = useWalletNFTs(address)

  // Filter to show ONLY KEKTECH NFTs
  const kektechNFTs = useMemo(() => {
    return nfts.filter((nft) => {
      const nftAddress = nft?.token?.address_hash
      if (!nftAddress || !KEKTECH_CONTRACT_ADDRESS) return false
      return nftAddress.toLowerCase() === KEKTECH_CONTRACT_ADDRESS.toLowerCase()
    })
  }, [nfts])

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#3fb8bd]"></div>
        <p className="mt-4 text-gray-400">Loading your KEKTECH NFTs...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-900 rounded-xl p-8 text-center max-w-2xl mx-auto">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-bold text-red-100 mb-3">Failed to Load NFTs</h3>
        <p className="text-red-300 mb-6">{error}</p>
        <button
          onClick={retry}
          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition font-fredoka"
        >
          🔄 Retry
        </button>
        <p className="text-xs text-gray-400 mt-4">
          Address: {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
      </div>
    )
  }

  // Empty state - No KEKTECH NFTs
  if (kektechNFTs.length === 0) {
    return (
      <div className="bg-gray-900/60 rounded-xl border border-gray-800 p-12 text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-6">🐸</div>
        <h3 className="text-2xl font-bold text-white mb-4 font-fredoka">No KEKTECH NFTs Found</h3>
        <p className="text-gray-400 mb-6">
          You don&apos;t have any KEKTECH NFTs in your wallet yet. Start by minting one!
        </p>
        <Link
          href="/marketplace"
          className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] text-black font-bold hover:scale-105 transition font-fredoka"
        >
          Mint KEKTECH NFTs
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* KEKTECH Collection */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 font-fredoka">
          Your 𝕂Ǝ𝕂TECH Collection ({kektechNFTs.length})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {kektechNFTs.map((nft) => (
            <div
              key={nft.id}
              className="bg-gray-900/60 rounded-xl border border-gray-800 hover:border-[#3fb8bd] transition overflow-hidden group"
            >
              <div className="aspect-square relative bg-gray-800">
                {nft.image_url || nft.metadata?.image_url ? (
                  <Image
                    src={nft.image_url || nft.metadata?.image_url || ''}
                    alt={nft.metadata?.name || `NFT #${nft.id}`}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      // Fallback to placeholder on image error
                      e.currentTarget.style.display = 'none'
                      const placeholder = e.currentTarget.nextElementSibling as HTMLElement
                      if (placeholder) placeholder.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div className="flex items-center justify-center h-full text-4xl" style={{ display: nft.image_url || nft.metadata?.image_url ? 'none' : 'flex' }}>
                  🐸
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-white text-sm truncate">
                  {nft.metadata?.name || `#${nft.id}`}
                </h3>
                <p className="text-xs text-gray-400">𝕂Ǝ𝕂TECH</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Section */}
      <div className="bg-gradient-to-br from-[#4ecca7]/10 to-transparent rounded-2xl border border-[#4ecca7]/20 p-8">
        <h2 className="text-2xl font-bold text-[#4ecca7] mb-4 font-fredoka">
          🎁 Your Rewards
        </h2>
        <p className="text-gray-300 mb-6">
          You own {kektechNFTs.length} 𝕂Ǝ𝕂TECH NFT{kektechNFTs.length > 1 ? 's' : ''}!
          Earn daily rewards and exclusive benefits.
        </p>
        <Link
          href="/rewards"
          className="inline-block px-6 py-3 rounded-xl bg-[#4ecca7]/20 text-[#4ecca7] font-bold hover:bg-[#4ecca7]/30 transition font-fredoka"
        >
          View Rewards Details
        </Link>
      </div>
    </div>
  )
}
