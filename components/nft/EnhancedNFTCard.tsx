'use client'

import Image from 'next/image'
import Link from 'next/link'
import { RankingNFT } from '@/lib/api/kektech-rankings'

interface EnhancedNFTCardProps {
  nft: RankingNFT
}

/**
 * Simplified NFTCard Component (No Flip Effect)
 *
 * Features:
 * - Clean card design with hover effect
 * - Clickable to navigate to NFT detail page
 * - Shows rank badge, token ID, and name
 */
export function EnhancedNFTCard({ nft }: EnhancedNFTCardProps) {
  return (
    <Link
      href={`/nft?id=${nft.tokenId}`}
      className="group block overflow-hidden rounded-xl border-2 border-[#3fb8bd]/30 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg transition-all duration-300 hover:border-[#3fb8bd] hover:shadow-2xl hover:shadow-[#3fb8bd]/30"
    >
      {/* NFT Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={nft.imageUrl}
          alt={nft.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Rank Badge */}
        <div className="absolute right-3 top-3">
          <div className="rounded-full bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] px-4 py-1.5 text-sm font-bold text-black shadow-lg">
            #{nft.rank}
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="space-y-2 p-4">
        <h3 className="font-fredoka truncate text-lg font-bold text-white">
          {nft.name}
        </h3>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Token ID</span>
          <span className="font-mono font-semibold text-[#4ecca7]">#{nft.tokenId}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Rarity</span>
          <span className="font-semibold text-[#ff00ff]">{nft.rarityScore.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  )
}
