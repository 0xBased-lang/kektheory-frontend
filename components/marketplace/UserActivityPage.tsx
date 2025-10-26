/**
 * User Activity Page
 * Comprehensive trading hub with actionable sections and history
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useMyOfferHistory, useMyStats } from '@/lib/hooks/useOfferHistory'
import { useKektvListings } from '@/lib/hooks/useKektvListings'
import { useKektvOffers } from '@/lib/hooks/useKektvOffers'
import { useKektvMarketplace } from '@/lib/hooks/useKektvMarketplace'
import { useUserOffers, useReceivedOffers, useOfferDetails } from '@/lib/hooks/useKektvOffers'
import { formatUnits } from 'ethers'
import type { TradingEvent } from '@/lib/services/explorer-api'
import { VOUCHER_NAMES } from '@/config/contracts/kektv-offers'

// Constants
const EXPLORER_BASE_URL = 'https://explorer.bf1337.org'

// Helper function to safely get voucher name
function getVoucherName(tokenId: number | bigint | undefined): string {
  if (tokenId === undefined) return 'Unknown Voucher'
  const id = Number(tokenId)
  if (id in VOUCHER_NAMES) {
    return VOUCHER_NAMES[id as keyof typeof VOUCHER_NAMES]
  }
  return `Voucher #${id}`
}

// Helper function to safely calculate price per item
function calculatePricePerItem(offerPrice: bigint, amount: bigint): number {
  const priceNum = Number(offerPrice)
  const amountNum = Number(amount)
  if (amountNum === 0 || !isFinite(amountNum) || amountNum < 0) return 0
  return priceNum / amountNum / 1e18
}

// Helper function to safely calculate total price
function calculateTotalPrice(offerPrice: bigint): number {
  return Number(offerPrice) / 1e18
}

export function UserActivityPage() {
  const { address, isConnected } = useAccount()
  const { data: events, isLoading, refetch: refetchHistory } = useMyOfferHistory()
  const { stats, isLoading: statsLoading } = useMyStats()
  const { listings, refetch: refetchListings } = useKektvListings(address)
  const { offerIds: madeOfferIds, refetch: refetchMade } = useUserOffers(address)
  const { offerIds: receivedOfferIds, refetch: refetchReceived } = useReceivedOffers(address)

  // Debug logging
  console.log('🔍 Trading Activity Debug:', {
    address,
    listings: listings?.length || 0,
    madeOfferIds: madeOfferIds?.length || 0,
    receivedOfferIds: receivedOfferIds?.length || 0,
    listingsData: listings,
    madeOfferIdsData: madeOfferIds,
    receivedOfferIdsData: receivedOfferIds,
  })

  const handleRefresh = async () => {
    await Promise.all([refetchHistory(), refetchListings(), refetchMade(), refetchReceived()])
  }

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-bold text-[#daa520] mb-2 font-fredoka">
          Connect Your Wallet
        </h2>
        <p className="text-gray-400">Connect your wallet to view your trading activity</p>
      </div>
    )
  }

  if (isLoading || statsLoading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#daa520] mx-auto mb-4"></div>
        <p className="text-gray-400">Loading your activity...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-[#daa520] font-fredoka">My Trading Activity</h1>
          <button
            onClick={handleRefresh}
            disabled={isLoading || statsLoading}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-[#daa520] transition disabled:opacity-50"
          >
            🔄 Refresh
          </button>
        </div>
        <p className="text-gray-400">Manage your offers, listings, and view trading history</p>
      </div>

      {/* Statistics */}
      <UserStatistics
        stats={stats}
        listings={listings}
        madeOffersCount={madeOfferIds.length}
        receivedOffersCount={receivedOfferIds.length}
      />

      {/* Actionable Sections */}
      <div className="space-y-6">
        {/* 1. Offers You Can Accept */}
        <OffersYouCanAcceptSection
          offerIds={receivedOfferIds}
          onRefresh={handleRefresh}
        />

        {/* 2. Your Offers (offers you made) */}
        <YourOffersSection
          offerIds={madeOfferIds}
          onRefresh={handleRefresh}
        />

        {/* 3. Your Marketplace Listings */}
        <YourMarketplaceListingsSection
          listings={listings}
          onRefresh={handleRefresh}
        />
      </div>

      {/* Historical Activity */}
      <div className="space-y-4 pt-6 border-t border-gray-700">
        <h2 className="text-2xl font-bold text-[#daa520] font-fredoka">📜 Activity History</h2>
        <ActivityHistory events={events || []} userAddress={address!} />
      </div>
    </div>
  )
}

/**
 * Offers You Can Accept Section
 */
function OffersYouCanAcceptSection({
  offerIds,
  onRefresh,
}: {
  offerIds: bigint[]
  onRefresh: () => void
}) {
  if (offerIds.length === 0) {
    return (
      <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-lg font-bold text-[#daa520] mb-4 font-fredoka">
          ✨ Offers You Can Accept
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">💰</div>
          <p className="text-gray-400">No offers to accept right now</p>
          <p className="text-sm text-gray-500 mt-1">Offers on your vouchers will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-6">
      <h3 className="text-lg font-bold text-[#daa520] mb-4 font-fredoka">
        ✨ Offers You Can Accept
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        Found {offerIds.length} offer{offerIds.length !== 1 ? 's' : ''} you can accept
      </p>
      <div className="space-y-3">
        {offerIds.map((offerId) => (
          <AcceptableOfferCard
            key={offerId.toString()}
            offerId={offerId}
            onRefresh={onRefresh}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Acceptable Offer Card (can be accepted)
 */
function AcceptableOfferCard({
  offerId,
  onRefresh,
}: {
  offerId: bigint
  onRefresh: () => void
}) {
  const { offer, isLoading } = useOfferDetails(offerId)
  const { acceptOffer, isPending } = useKektvOffers()
  const [isAccepting, setIsAccepting] = useState(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    console.log('📦 AcceptableOfferCard:', { offerId: offerId.toString(), offer, isLoading })
    return () => {
      isMountedRef.current = false
    }
  }, [offerId, offer, isLoading])

  const handleAccept = async () => {
    try {
      setIsAccepting(true)
      await acceptOffer(offerId)
      if (isMountedRef.current) {
        onRefresh()
      }
    } catch (error) {
      console.error('Failed to accept offer:', error)
    } finally {
      if (isMountedRef.current) {
        setIsAccepting(false)
      }
    }
  }

  if (isLoading || !offer) {
    return (
      <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-4">
        <div className="animate-pulse">Loading offer...</div>
      </div>
    )
  }

  const pricePerItem = calculatePricePerItem(offer.offerPrice, offer.amount)
  const totalPrice = calculateTotalPrice(offer.offerPrice)

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-4 hover:border-[#daa520]/50 transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💰</span>
            <div>
              <p className="text-sm font-medium text-white">
                𝕂Ǝ𝕂TV #{offer.tokenId} {getVoucherName(offer.tokenId)}
              </p>
              <p className="text-xs text-gray-500">
                Offerer: {offer.offerer.slice(0, 6)}...{offer.offerer.slice(-4)}
              </p>
            </div>
          </div>

          <div className="ml-10 space-y-1">
            <p className="text-xs text-gray-400">
              <span className="text-gray-500">Quantity:</span> <span className="text-white">{offer.amount.toString()}</span>
            </p>
            <p className="text-xs text-gray-400">
              <span className="text-gray-500">Price/Each:</span>{' '}
              <span className="text-[#daa520] font-bold">{pricePerItem.toLocaleString(undefined, { minimumFractionDigits: 4 })} BASED</span>
            </p>
            <p className="text-sm font-bold text-[#daa520]">
              Total: {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 4 })} BASED
            </p>
            <p className="text-xs text-gray-500">💰 BASED escrowed • General offer (anyone can accept)</p>
          </div>
        </div>

        <button
          onClick={handleAccept}
          disabled={isPending || isAccepting}
          className="flex-shrink-0 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-sm text-green-400 hover:bg-green-500/30 transition disabled:opacity-50"
        >
          {isPending || isAccepting ? 'Accepting...' : '✅ Accept Offer'}
        </button>
      </div>
    </div>
  )
}

/**
 * Your Offers Section (offers you made)
 */
function YourOffersSection({
  offerIds,
  onRefresh,
}: {
  offerIds: bigint[]
  onRefresh: () => void
}) {
  if (offerIds.length === 0) {
    return (
      <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-lg font-bold text-[#daa520] mb-4 font-fredoka">
          💼 Your Offers
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">💼</div>
          <p className="text-gray-400">You haven&apos;t created any offers yet</p>
          <p className="text-sm text-gray-500 mt-1">Browse All Offers and make an offer to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-6">
      <h3 className="text-lg font-bold text-[#daa520] mb-4 font-fredoka">
        💼 Your Offers
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        Offers you&apos;ve created on other users&apos; vouchers
      </p>
      <div className="space-y-3">
        {offerIds.map((offerId) => (
          <YourOfferCard
            key={offerId.toString()}
            offerId={offerId}
            onRefresh={onRefresh}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Your Offer Card (can be cancelled)
 */
function YourOfferCard({
  offerId,
  onRefresh,
}: {
  offerId: bigint
  onRefresh: () => void
}) {
  const { offer, isLoading } = useOfferDetails(offerId)
  const { cancelOffer, isPending } = useKektvOffers()
  const [isCancelling, setIsCancelling] = useState(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const handleCancel = async () => {
    try {
      setIsCancelling(true)
      await cancelOffer(offerId)
      if (isMountedRef.current) {
        onRefresh()
      }
    } catch (error) {
      console.error('Failed to cancel offer:', error)
    } finally {
      if (isMountedRef.current) {
        setIsCancelling(false)
      }
    }
  }

  if (isLoading || !offer) {
    return (
      <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-4">
        <div className="animate-pulse">Loading offer...</div>
      </div>
    )
  }

  const pricePerItem = calculatePricePerItem(offer.offerPrice, offer.amount)
  const totalPrice = calculateTotalPrice(offer.offerPrice)

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-4 hover:border-gray-600/50 transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💼</span>
            <div>
              <p className="text-sm font-medium text-white">
                𝕂Ǝ𝕂TV #{offer.tokenId} {getVoucherName(offer.tokenId)}
              </p>
              <p className="text-xs text-gray-500">
                {offer.voucherOwner === '0x0000000000000000000000000000000000000000'
                  ? 'General offer (anyone can accept)'
                  : `To: ${offer.voucherOwner.slice(0, 6)}...${offer.voucherOwner.slice(-4)}`
                }
              </p>
            </div>
          </div>

          <div className="ml-10 space-y-1">
            <p className="text-xs text-gray-400">
              <span className="text-gray-500">Quantity:</span> <span className="text-white">{offer.amount.toString()}</span>
            </p>
            <p className="text-xs text-gray-400">
              <span className="text-gray-500">Price/Each:</span>{' '}
              <span className="text-[#daa520] font-bold">{pricePerItem.toLocaleString(undefined, { minimumFractionDigits: 4 })} BASED</span>
            </p>
            <p className="text-sm font-bold text-[#daa520]">
              Total: {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 4 })} BASED
            </p>
          </div>
        </div>

        <button
          onClick={handleCancel}
          disabled={isPending || isCancelling}
          className="flex-shrink-0 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-sm text-red-400 hover:bg-red-500/30 transition disabled:opacity-50"
        >
          {isPending || isCancelling ? 'Cancelling...' : '❌ Cancel Offer'}
        </button>
      </div>
    </div>
  )
}

/**
 * Your Marketplace Listings Section
 */
function YourMarketplaceListingsSection({
  listings,
  onRefresh,
}: {
  listings: ReturnType<typeof useKektvListings>['listings']
  onRefresh: () => void
}) {
  if (listings.length === 0) {
    return (
      <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-lg font-bold text-[#daa520] mb-4 font-fredoka">
          🏪 Your Marketplace Listings
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🏪</div>
          <p className="text-gray-400">You don&apos;t have any active listings</p>
          <p className="text-sm text-gray-500 mt-1">List your vouchers for sale to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-6">
      <h3 className="text-lg font-bold text-[#daa520] mb-4 font-fredoka">
        🏪 Your Marketplace Listings
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        Vouchers you&apos;ve listed for sale on the marketplace
      </p>
      <div className="space-y-3">
        {listings.map((listing) => (
          <MarketplaceListingCard
            key={`${listing.seller}-${listing.tokenId}`}
            listing={listing}
            onRefresh={onRefresh}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Marketplace Listing Card
 */
function MarketplaceListingCard({
  listing,
  onRefresh,
}: {
  listing: ReturnType<typeof useKektvListings>['listings'][0]
  onRefresh: () => void
}) {
  const { cancelListing, isPending } = useKektvMarketplace()
  const [isCancelling, setIsCancelling] = useState(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const handleCancel = async () => {
    try {
      setIsCancelling(true)
      await cancelListing(BigInt(listing.tokenId))
      if (isMountedRef.current) {
        onRefresh()
      }
    } catch (error) {
      console.error('Failed to cancel listing:', error)
    } finally {
      if (isMountedRef.current) {
        setIsCancelling(false)
      }
    }
  }

  const pricePerItem = Number(listing.pricePerItem) / 1e18
  const totalPrice = Number(listing.totalPrice) / 1e18

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 p-4 hover:border-gray-600/50 transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏪</span>
            <div>
              <p className="text-sm font-medium text-white">
                𝕂Ǝ𝕂TV #{listing.tokenId} {getVoucherName(listing.tokenId)}
              </p>
            </div>
          </div>

          <div className="ml-10 space-y-1">
            <p className="text-xs text-gray-400">
              <span className="text-gray-500">Quantity:</span> <span className="text-white">{listing.amount.toString()} vouchers</span>
            </p>
            <p className="text-xs text-gray-400">
              <span className="text-gray-500">Price/Each:</span>{' '}
              <span className="text-[#daa520] font-bold">{pricePerItem.toLocaleString()} BASED</span>
            </p>
            <p className="text-sm font-bold text-[#daa520]">
              Total: {totalPrice.toLocaleString()} BASED
            </p>
          </div>
        </div>

        <button
          onClick={handleCancel}
          disabled={isPending || isCancelling}
          className="flex-shrink-0 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-sm text-red-400 hover:bg-red-500/30 transition disabled:opacity-50"
        >
          {isPending || isCancelling ? 'Cancelling...' : '❌ Cancel Listing'}
        </button>
      </div>
    </div>
  )
}

/**
 * User statistics cards
 */
function UserStatistics({
  stats,
  listings,
  madeOffersCount,
  receivedOffersCount,
}: {
  stats: ReturnType<typeof useMyStats>['stats']
  listings: ReturnType<typeof useKektvListings>['listings']
  madeOffersCount: number
  receivedOffersCount: number
}) {
  const activeListingsCount = listings.length
  const totalListedValue = listings.reduce((sum, listing) => {
    return sum + BigInt(listing.totalPrice)
  }, BigInt(0))

  return (
    <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-6">
      <h3 className="text-lg font-bold text-[#daa520] mb-4 font-fredoka">📊 Your Stats</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Active/Actionable Stats */}
        <StatCard label="Offers to Accept" value={receivedOffersCount.toString()} icon="✨" highlight={receivedOffersCount > 0} />
        <StatCard label="Your Active Offers" value={madeOffersCount.toString()} icon="💼" highlight={madeOffersCount > 0} />
        <StatCard label="Active Listings" value={activeListingsCount.toString()} icon="🏪" highlight={activeListingsCount > 0} />

        {totalListedValue > BigInt(0) && (
          <StatCard
            label="Total Listed Value"
            value={(Number(totalListedValue) / 1e18).toLocaleString() + ' BASED'}
            icon="💎"
            highlight={true}
          />
        )}

        {/* Historical Stats */}
        <StatCard label="Total Offers Made" value={stats.offersMade.toString()} icon="💰" />
        <StatCard label="Offers Accepted" value={stats.offersAccepted.toString()} icon="✅" highlight={stats.offersAccepted > 0} />
        <StatCard label="Vouchers Sold" value={stats.vouchersSold.toString()} icon="💸" highlight={stats.vouchersSold > 0} />

        {/* Trading Volume Stats */}
        {stats.totalSpent > BigInt(0) && (
          <StatCard label="Total Spent" value={formatUnits(stats.totalSpent, 18) + ' BASED'} icon="💸" />
        )}

        {stats.totalEarned > BigInt(0) && (
          <StatCard label="Total Earned" value={formatUnits(stats.totalEarned, 18) + ' BASED'} icon="💰" />
        )}
      </div>
    </div>
  )
}

/**
 * Activity History Section
 */
function ActivityHistory({
  events,
  userAddress,
}: {
  events: TradingEvent[]
  userAddress: string
}) {
  if (events.length === 0) {
    return (
      <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-8 text-center">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-xl font-fredoka text-gray-400 mb-2">No activity yet</p>
        <p className="text-sm text-gray-500">Your trading history will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {events.map((event, i) => (
        <ActivityCard
          key={`${event.transactionHash}-${i}`}
          event={event}
          userAddress={userAddress}
        />
      ))}
    </div>
  )
}

/**
 * Activity card (historical event)
 */
function ActivityCard({
  event,
  userAddress,
}: {
  event: TradingEvent
  userAddress: string
}) {
  const normalizedAddress = userAddress.toLowerCase()
  const isOfferer = 'offerer' in event && event.offerer.toLowerCase() === normalizedAddress
  const isOwner = 'voucherOwner' in event && event.voucherOwner.toLowerCase() === normalizedAddress
  const isSeller = 'seller' in event && event.seller.toLowerCase() === normalizedAddress
  const isBuyer = 'buyer' in event && event.buyer.toLowerCase() === normalizedAddress

  return (
    <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-4 hover:border-gray-600/50 transition">
      <div className="flex items-start justify-between gap-4">
        {/* Left: Event info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{getEventIcon(event.eventType)}</span>
            <div>
              <p className="text-sm font-medium text-white">
                {getEventLabel(event.eventType, isOfferer, isOwner, isSeller, isBuyer)}
              </p>
              <p className="text-xs text-gray-500">{formatDate(event.timestamp)}</p>
            </div>
          </div>

          {/* Event details */}
          <div className="space-y-1 ml-10">
            {'tokenId' in event && (
              <p className="text-xs text-gray-400">
                <span className="text-gray-500">NFT:</span>{' '}
                <span className="text-white">𝕂Ǝ𝕂TV #{event.tokenId}</span>{' '}
                <span className="text-gray-500">({getVoucherName(event.tokenId)})</span>
              </p>
            )}

            {'offerPrice' in event && (
              <p className="text-sm font-bold text-[#daa520]">
                {formatUnits(event.offerPrice, 18)} BASED
              </p>
            )}

            {'totalPrice' in event && (
              <p className="text-sm font-bold text-[#daa520]">
                {formatUnits(event.totalPrice, 18)} BASED
              </p>
            )}

            {'amount' in event && (
              <p className="text-xs text-gray-400">
                <span className="text-gray-500">Amount:</span> <span className="text-white">{event.amount} vouchers</span>
              </p>
            )}

            {/* Role indicator */}
            <div className="flex gap-2 flex-wrap">
              {isOfferer && (
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                  You offered
                </span>
              )}
              {isOwner && (
                <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
                  Your voucher
                </span>
              )}
              {isSeller && (
                <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">
                  You sold
                </span>
              )}
              {isBuyer && (
                <span className="text-xs px-2 py-0.5 rounded bg-orange-500/20 text-orange-400">
                  You bought
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Transaction link */}
        <a
          href={`${EXPLORER_BASE_URL}/tx/${event.transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-xs text-[#daa520] hover:underline"
        >
          View TX →
        </a>
      </div>
    </div>
  )
}

/**
 * Stat card
 */
function StatCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string
  value: string
  icon: string
  highlight?: boolean
}) {
  return (
    <div
      className={`bg-gray-800/50 rounded-lg p-4 border ${
        highlight ? 'border-[#daa520]/50' : 'border-gray-700/50'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs text-gray-400">{label}</span>
      </div>
      <p className="text-lg font-bold text-white truncate" title={value}>
        {value}
      </p>
    </div>
  )
}

/**
 * Helper functions
 */
function getEventIcon(eventType: TradingEvent['eventType']): string {
  switch (eventType) {
    case 'OfferMade':
      return '💰'
    case 'OfferAccepted':
      return '✅'
    case 'OfferCancelled':
      return '❌'
    case 'OfferRejected':
      return '🚫'
    case 'VoucherSold':
      return '💸'
    case 'VoucherListed':
      return '🏪'
    case 'ListingCancelled':
      return '🚫'
  }
}

function getEventLabel(
  eventType: TradingEvent['eventType'],
  isOfferer: boolean,
  isOwner: boolean,
  isSeller: boolean,
  isBuyer: boolean
): string {
  switch (eventType) {
    case 'OfferMade':
      if (isOfferer) return 'You made an offer'
      if (isOwner) return 'Received an offer'
      return 'Offer made'

    case 'OfferAccepted':
      if (isOfferer) return 'Your offer was accepted!'
      if (isOwner) return 'You accepted an offer'
      return 'Offer accepted'

    case 'OfferCancelled':
      if (isOfferer) return 'You cancelled your offer'
      if (isOwner) return 'Offer was cancelled'
      return 'Offer cancelled'

    case 'OfferRejected':
      if (isOfferer) return 'Your offer was rejected'
      if (isOwner) return 'You rejected an offer'
      return 'Offer rejected'

    case 'VoucherSold':
      if (isSeller) return 'You sold vouchers'
      if (isBuyer) return 'You bought vouchers'
      return 'Voucher sold'

    case 'VoucherListed':
      if (isSeller) return 'You listed vouchers'
      return 'Voucher listed'

    case 'ListingCancelled':
      if (isSeller) return 'You cancelled your listing'
      return 'Listing cancelled'
  }
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`

  return date.toLocaleDateString()
}
