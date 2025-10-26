'use client'
import { useAccount } from 'wagmi'
import { useUserOffers, useOfferDetails, useKektvOffers } from '@/lib/hooks/useKektvOffers'
import { OfferCard } from './OfferCard'

/**
 * Display offers you've made on other users' vouchers
 * Allows you to cancel your offers
 */
export function YourOffers() {
  const { address } = useAccount()
  const { offerIds, isLoading, refetch } = useUserOffers(address)
  const { cancelOffer, isPending } = useKektvOffers()

  // Debug logging
  console.log('📤 Your Offers Debug:', {
    address,
    offerIds,
    offerCount: offerIds?.length || 0,
    isLoading,
  })

  if (!address) {
    return (
      <div className="text-center py-16">
        <p className="text-xl font-fredoka text-gray-400">
          Connect your wallet to view your offers
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#daa520] mx-auto mb-4"></div>
        <p className="text-gray-400">Loading your offers...</p>
      </div>
    )
  }

  if (!offerIds || offerIds.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 mb-6">
          <svg
            className="w-full h-full text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-xl font-fredoka text-gray-400 mb-2">
          You haven&apos;t made any offers yet
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Browse vouchers and make an offer to get started
        </p>

        {/* Debug info for troubleshooting */}
        {address && (
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg max-w-md mx-auto">
            <p className="text-xs text-blue-400 mb-2">💡 Just made an offer?</p>
            <p className="text-xs text-gray-400 mb-3">
              Data may take a few seconds to load. Check the browser console for debug info or click the Refresh button in Browse Offers.
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-lg text-sm text-blue-300 hover:bg-blue-500/30 transition"
            >
              🔄 Click to Refresh
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-[#daa520] font-fredoka">
          Your Offers ({offerIds.length})
        </h3>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-[#daa520] transition"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offerIds.map((offerId) => (
          <YourOfferCard
            key={offerId.toString()}
            offerId={offerId}
            onSuccess={refetch}
            cancelOffer={cancelOffer}
            isPending={isPending}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Individual offer card with cancel button
 */
function YourOfferCard({
  offerId,
  onSuccess,
  cancelOffer,
  isPending,
}: {
  offerId: bigint
  onSuccess: () => void
  cancelOffer: (offerId: bigint) => Promise<`0x${string}`>
  isPending: boolean
}) {
  const { offer, isLoading } = useOfferDetails(offerId)

  const handleCancel = async () => {
    try {
      const txHash = await cancelOffer(offerId)
      console.log('Offer cancelled, tx:', txHash)
      alert('Offer cancelled successfully! BASED refunded to your wallet.')
      onSuccess()
    } catch (error) {
      alert(`Cancel failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  if (isLoading || !offer) {
    return (
      <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-6 animate-pulse">
        <div className="h-32 bg-gray-800 rounded"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-4 hover:border-[#daa520]/50 transition">
      <OfferCard offer={offer} onSuccess={onSuccess} />

      {/* Cancel Button */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <button
          onClick={handleCancel}
          disabled={isPending}
          className="w-full px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-fredoka font-semibold hover:bg-red-500/20 hover:border-red-500/50 transition disabled:opacity-50"
        >
          {isPending ? '⏳ Cancelling...' : '❌ Cancel Offer'}
        </button>
      </div>
    </div>
  )
}
