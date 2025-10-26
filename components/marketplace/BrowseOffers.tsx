'use client'

import { useState } from 'react'
import { useTokenOffers, useOfferDetails } from '@/lib/hooks/useKektvOffers'
import { OfferCard } from './OfferCard'
import { VOUCHER_IDS } from '@/config/contracts/kektv-offers'

/**
 * Browse all active offers on KEKTV vouchers
 * Shows offers grouped by voucher type
 */
export function BrowseOffers() {
  const [selectedToken, setSelectedToken] = useState<number | null>(null)

  // If a token is selected, fetch its offers
  const { offerIds, isLoading, refetch } = useTokenOffers(selectedToken)

  return (
    <div className="space-y-8">
      {/* Voucher Type Selector */}
      <div>
        <h3 className="text-xl font-bold text-[#daa520] mb-4 font-fredoka text-center">
          Select Voucher Type
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedToken(VOUCHER_IDS.GENESIS)}
            className={`
              p-4 rounded-lg font-fredoka font-bold transition-all
              ${selectedToken === VOUCHER_IDS.GENESIS
                ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500 ring-2 ring-purple-500/50'
                : 'bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30 hover:border-purple-500/50'
              }
              border
            `}
          >
            <div className="text-4xl mb-2">💎</div>
            <div className="text-purple-400">Genesis</div>
          </button>

          <button
            onClick={() => setSelectedToken(VOUCHER_IDS.SILVER)}
            className={`
              p-4 rounded-lg font-fredoka font-bold transition-all
              ${selectedToken === VOUCHER_IDS.SILVER
                ? 'bg-gradient-to-br from-gray-400/20 to-gray-500/20 border-gray-400 ring-2 ring-gray-400/50'
                : 'bg-gradient-to-br from-gray-400/10 to-gray-500/10 border-gray-400/30 hover:border-gray-400/50'
              }
              border
            `}
          >
            <div className="text-4xl mb-2">🥈</div>
            <div className="text-gray-300">Silver</div>
          </button>

          <button
            onClick={() => setSelectedToken(VOUCHER_IDS.GOLD)}
            className={`
              p-4 rounded-lg font-fredoka font-bold transition-all
              ${selectedToken === VOUCHER_IDS.GOLD
                ? 'bg-gradient-to-br from-[#daa520]/20 to-yellow-600/20 border-[#daa520] ring-2 ring-[#daa520]/50'
                : 'bg-gradient-to-br from-[#daa520]/10 to-yellow-600/10 border-[#daa520]/30 hover:border-[#daa520]/50'
              }
              border
            `}
          >
            <div className="text-4xl mb-2">🥇</div>
            <div className="text-[#daa520]">Gold</div>
          </button>

          <button
            onClick={() => setSelectedToken(VOUCHER_IDS.PLATINUM)}
            className={`
              p-4 rounded-lg font-fredoka font-bold transition-all
              ${selectedToken === VOUCHER_IDS.PLATINUM
                ? 'bg-gradient-to-br from-cyan-400/20 to-cyan-500/20 border-cyan-400 ring-2 ring-cyan-400/50'
                : 'bg-gradient-to-br from-cyan-400/10 to-cyan-500/10 border-cyan-400/30 hover:border-cyan-400/50'
              }
              border
            `}
          >
            <div className="text-4xl mb-2">💠</div>
            <div className="text-cyan-300">Platinum</div>
          </button>
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
  return (
    <div>
      <h3 className="text-xl font-bold text-[#daa520] mb-6 font-fredoka text-center">
        Active Offers ({offerIds.length})
      </h3>
      <div className={`grid gap-6 ${
        offerIds.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
        offerIds.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto' :
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }`}>
        {offerIds.map((offerId) => (
          <OfferItem key={offerId.toString()} offerId={offerId} onSuccess={onSuccess} />
        ))}
      </div>
    </div>
  )
}

/**
 * Individual offer item that fetches and displays offer details
 */
function OfferItem({ offerId, onSuccess }: { offerId: bigint; onSuccess: () => void }) {
  const { offer, isLoading } = useOfferDetails(offerId)

  if (isLoading || !offer || !offer.active) {
    return null // Don't show inactive or loading offers
  }

  return <OfferCard offer={offer} onSuccess={onSuccess} />
}
