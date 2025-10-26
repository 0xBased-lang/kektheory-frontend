/**
 * NFT History Page
 * Complete history view for a specific NFT
 * Shows statistics and timeline in an organized layout
 */

'use client'

import { NFTStatistics } from './NFTStatistics'
import { NFTTimeline } from './NFTTimeline'
import { useAllVoucherMetadata } from '@/lib/hooks/useVoucherMetadata'
import { VOUCHER_NAMES } from '@/config/contracts/kektv-offers'

interface NFTHistoryPageProps {
  tokenId: number
}

export function NFTHistoryPage({ tokenId }: NFTHistoryPageProps) {
  const { metadataMap } = useAllVoucherMetadata()
  const nftMetadata = metadataMap[tokenId]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-[#daa520] font-fredoka">
          𝕂Ǝ𝕂TV #{tokenId}
        </h1>
        <p className="text-xl text-gray-300">{VOUCHER_NAMES[tokenId as keyof typeof VOUCHER_NAMES]}</p>
        {nftMetadata?.name && (
          <p className="text-sm text-gray-500">{nftMetadata.name}</p>
        )}
      </div>

      {/* Statistics Section */}
      <section>
        <NFTStatistics tokenId={tokenId} />
      </section>

      {/* Timeline Section */}
      <section>
        <NFTTimeline tokenId={tokenId} />
      </section>

      {/* Info footer */}
      <div className="text-center text-xs text-gray-500 py-4">
        <p>History data provided by BasedAI Explorer</p>
        <p>Updates every minute • Data since contract deployment</p>
      </div>
    </div>
  )
}
