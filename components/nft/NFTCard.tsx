'use client'

import Image from 'next/image'
import { RankingNFT } from '@/lib/api/kektech-rankings'
import { EXPLORER_URL, KEKTECH_CONTRACT_ADDRESS } from '@/config/constants'

interface NFTCardProps {
  nft: RankingNFT
}

/**
 * NFTCard Component
 *
 * Displays a single NFT with:
 * - NFT image from API
 * - Token ID and name
 * - Global ranking position
 * - Rarity score
 * - Link to block explorer
 */
export function NFTCard({ nft }: NFTCardProps) {
  const explorerURL = `${EXPLORER_URL}/token/${KEKTECH_CONTRACT_ADDRESS}?a=${nft.tokenId}`

  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={nft.imageUrl}
          alt={nft.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />

        {/* Ranking Badge */}
        <div className="absolute right-2 top-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          Rank #{nft.rank}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{nft.name}</h3>

        {/* Token ID */}
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Token ID:</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            #{nft.tokenId}
          </span>
        </div>

        {/* Rarity Score */}
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Rarity Score:</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {nft.rarityScore.toFixed(2)}
          </span>
        </div>

        {/* View on Explorer */}
        <a
          href={explorerURL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          View on Explorer ↗
        </a>
      </div>
    </div>
  )
}
