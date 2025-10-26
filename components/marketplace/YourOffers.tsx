'use client'
import { useAccount } from 'wagmi'

/**
 * Display offers you've made on other users' vouchers
 * Allows you to cancel your offers
 */
export function YourOffers() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="text-center py-16">
        <p className="text-xl font-fredoka text-gray-400">
          Connect your wallet to view your offers
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <p className="text-xl font-fredoka text-gray-400 mb-2">
        You haven't made any offers yet
      </p>
      <p className="text-sm text-gray-500">
        Browse vouchers and make an offer to get started
      </p>
    </div>
  )
}
