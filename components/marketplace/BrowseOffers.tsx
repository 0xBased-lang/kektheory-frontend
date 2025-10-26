'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTokenOffers, useOfferDetails } from '@/lib/hooks/useKektvOffers'
import { useAllVoucherMetadata } from '@/lib/hooks/useVoucherMetadata'
import { OfferCard } from './OfferCard'
import { VOUCHER_IDS } from '@/config/contracts/kektv-offers'

// Only show voucher IDs 1, 2, and 3 (exclude 0)
const VOUCHER_OPTIONS = [
  { id: VOUCHER_IDS.SILVER, fallbackIcon: '🥈', color: 'gray' },
  { id: VOUCHER_IDS.GOLD, fallbackIcon: '🥇', color: 'gray' },
  { id: VOUCHER_IDS.PLATINUM, fallbackIcon: '💠', color: 'gray' },
]

/**
 * Browse all active offers on KEKTV vouchers
 * Shows offers grouped by voucher type
 */
export function BrowseOffers() {
  const [selectedToken, setSelectedToken] = useState<number | null>(null)
  const { metadataMap } = useAllVoucherMetadata()

  // If a token is selected, fetch its offers
  const { offerIds, isLoading, refetch } = useTokenOffers(selectedToken)

  return (
    <div className="space-y-8">
      {/* Voucher Type Selector */}
      <div>
        <h3 className="text-xl font-bold text-[#daa520] mb-4 font-fredoka text-center">
          Select Voucher Type
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {VOUCHER_OPTIONS.map((voucher) => {
            const metadata = metadataMap[voucher.id]
            const mediaUrl = metadata?.animation_url || metadata?.image
            const voucherName = metadata?.name || voucher.fallbackIcon
            const isSelected = selectedToken === voucher.id

            return (
              <button
                key={voucher.id}
                onClick={() => setSelectedToken(voucher.id)}
                className={`
                  bg-gradient-to-br from-[#daa520]/10 to-yellow-600/10 rounded-lg border overflow-hidden transition-all
                  ${isSelected
                    ? 'border-[#daa520] ring-2 ring-[#daa520]/50 shadow-lg shadow-[#daa520]/20'
                    : 'border-[#daa520]/20 hover:border-[#daa520]/40'
                  }
                `}
              >
                <div className="p-6">
                  {/* Voucher Media */}
                  {mediaUrl ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-black/20 mb-4">
                      <Image
                        src={mediaUrl}
                        alt={voucherName}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">{voucher.fallbackIcon}</div>
                    </div>
                  )}

                  {/* Voucher Name */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#daa520] font-fredoka">
                      {voucherName}
                    </h3>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Offers Display */}
      {selectedToken === null ? (
        <div className="text-center py-24">
          <div className="text-8xl mb-6">👆</div>
          <h3 className="text-2xl font-bold text-[#daa520] mb-4 font-fredoka">Select a Voucher Type</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Choose a voucher type above to see all active offers
          </p>
        </div>
      ) : isLoading ? (
        <div className="text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#daa520] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading offers...</p>
        </div>
      ) : offerIds.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-8xl mb-6">💼</div>
          <h3 className="text-2xl font-bold text-[#daa520] mb-4 font-fredoka">No Active Offers</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            No one has made offers on this voucher type yet. Be the first!
          </p>
        </div>
      ) : (
        <OffersList offerIds={offerIds} onSuccess={refetch} />
      )}
    </div>
  )
}

/**
 * Display list of offers given their IDs
 */
function OffersList({ offerIds, onSuccess }: { offerIds: bigint[]; onSuccess: () => void }) {
  const [activeOfferCount, setActiveOfferCount] = useState(0)

  return (
    <div>
      {activeOfferCount > 0 && (
        <h3 className="text-xl font-bold text-[#daa520] mb-6 font-fredoka text-center">
          Active Offers ({activeOfferCount})
        </h3>
      )}
      <div className={`grid gap-6 ${
        activeOfferCount === 1 ? 'grid-cols-1 max-w-md mx-auto' :
        activeOfferCount === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto' :
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }`}>
        {offerIds.map((offerId) => (
          <OfferItem
            key={offerId.toString()}
            offerId={offerId}
            onSuccess={onSuccess}
            onActiveChange={(isActive) => {
              if (isActive) setActiveOfferCount(prev => prev + 1)
            }}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Individual offer item that fetches and displays offer details
 */
function OfferItem({
  offerId,
  onSuccess,
  onActiveChange
}: {
  offerId: bigint
  onSuccess: () => void
  onActiveChange?: (isActive: boolean) => void
}) {
  const { offer, isLoading } = useOfferDetails(offerId)

  // Notify parent when we know if this offer is active
  useEffect(() => {
    if (!isLoading && offer && offer.active && onActiveChange) {
      onActiveChange(true)
    }
  }, [isLoading, offer, onActiveChange])

  if (isLoading || !offer || !offer.active) {
    return null // Don't show inactive or loading offers
  }

  return <OfferCard offer={offer} onSuccess={onSuccess} />
}
