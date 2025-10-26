'use client'
import { useAccount } from 'wagmi'

/**
 * Display offers you've received on your vouchers
 * Allows you to accept or reject offers
 */
export function ReceivedOffers() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="text-center py-16">
        <p className="text-xl font-fredoka text-gray-400">
          Connect your wallet to view received offers
        </p>
      </div>
    )
  }

  // Placeholder - will be connected to useKektvOffers hook
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
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <p className="text-xl font-fredoka text-gray-400 mb-2">
        No offers received yet
      </p>
      <p className="text-sm text-gray-500">
        When someone makes an offer on your vouchers, they'll appear here
      </p>
    </div>
  )
}
