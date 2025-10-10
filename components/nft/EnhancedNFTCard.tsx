'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RankingNFT } from '@/lib/api/kektech-rankings'
import { EXPLORER_URL, KEKTECH_CONTRACT_ADDRESS } from '@/config/constants'

interface EnhancedNFTCardProps {
  nft: RankingNFT
}

/**
 * EnhancedNFTCard Component with 3D Flip Animation
 *
 * Features:
 * - 3D card flip on hover/click
 * - Animated glow effects
 * - Front: NFT image with rank badge
 * - Back: Detailed metadata
 * - Smooth transitions
 */
export function EnhancedNFTCard({ nft }: EnhancedNFTCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const explorerURL = `${EXPLORER_URL}/token/${KEKTECH_CONTRACT_ADDRESS}?a=${nft.tokenId}`

  return (
    <div
      className="group relative h-[400px] w-full cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      {/* Card Container with 3D Transform */}
      <div
        className={`relative h-full w-full transition-all duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 backface-hidden overflow-hidden rounded-xl border-2 border-kek-green/30 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl transition-all duration-300 hover:border-kek-green hover:shadow-2xl hover:shadow-kek-green/40"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-gradient-radial from-kek-green/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* NFT Image */}
          <div className="relative h-[280px] overflow-hidden">
            <Image
              src={nft.imageUrl}
              alt={nft.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Rank Badge with Glow */}
            <div className="absolute right-3 top-3 animate-pulse-glow">
              <div className="rounded-full bg-gradient-to-r from-kek-green via-kek-cyan to-kek-purple px-4 py-1.5 text-sm font-bold text-black shadow-lg shadow-kek-green/50">
                🏆 Rank #{nft.rank}
              </div>
            </div>

            {/* Flip Hint */}
            <div className="absolute bottom-3 left-3 rounded-lg bg-black/50 px-3 py-1 text-xs text-gray-300 backdrop-blur-sm">
              Hover to flip →
            </div>
          </div>

          {/* Card Info */}
          <div className="relative space-y-2 p-4">
            <h3 className="truncate text-lg font-bold text-white drop-shadow-glow">
              {nft.name}
            </h3>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Token ID</span>
              <span className="font-mono font-semibold text-kek-cyan">#{nft.tokenId}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Rarity</span>
              <span className="font-semibold text-kek-purple">{nft.rarityScore.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 backface-hidden overflow-hidden rounded-xl border-2 border-kek-cyan/50 bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
          </div>

          <div className="relative flex h-full flex-col justify-between p-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-kek-green">NFT Details</h3>
                <span className="text-2xl">🎨</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-kek-green/20 bg-black/40 p-3 backdrop-blur-sm">
                  <div className="text-xs text-gray-400">Global Rank</div>
                  <div className="text-2xl font-bold text-kek-green">#{nft.rank}</div>
                </div>

                <div className="rounded-lg border border-kek-purple/20 bg-black/40 p-3 backdrop-blur-sm">
                  <div className="text-xs text-gray-400">Rarity Score</div>
                  <div className="text-2xl font-bold text-kek-purple">{nft.rarityScore.toFixed(1)}</div>
                </div>

                <div className="rounded-lg border border-kek-cyan/20 bg-black/40 p-3 backdrop-blur-sm">
                  <div className="text-xs text-gray-400">Token ID</div>
                  <div className="text-xl font-bold font-mono text-kek-cyan">#{nft.tokenId}</div>
                </div>

                <div className="rounded-lg border border-kek-green/20 bg-black/40 p-3 backdrop-blur-sm">
                  <div className="text-xs text-gray-400">Collection</div>
                  <div className="text-lg font-bold text-kek-green">KEKTECH</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <a
                href={explorerURL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg border border-kek-green bg-kek-green/10 py-3 text-center font-semibold text-kek-green transition-all hover:bg-kek-green hover:text-black hover:shadow-lg hover:shadow-kek-green/50"
                onClick={(e) => e.stopPropagation()}
              >
                View on Explorer ↗
              </a>

              <div className="text-center text-xs text-gray-500">
                Click to flip back
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
