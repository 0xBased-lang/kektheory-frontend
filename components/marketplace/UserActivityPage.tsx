/**
 * User Activity Page
 * Shows user's complete trading history: offers and marketplace events
 */

'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useMyOfferHistory, useMyStats } from '@/lib/hooks/useOfferHistory'
import { useKektvListings } from '@/lib/hooks/useKektvListings'
import { useKektvOffers } from '@/lib/hooks/useKektvOffers'
import { useKektvMarketplace } from '@/lib/hooks/useKektvMarketplace'
import { useUserOffers, useReceivedOffers } from '@/lib/hooks/useKektvOffers'
import { formatUnits } from 'ethers'
import type { TradingEvent } from '@/lib/services/explorer-api'
import { VOUCHER_NAMES } from '@/config/contracts/kektv-offers'

export function UserActivityPage() {
  const { address, isConnected } = useAccount()
  const { data: events, isLoading, refetch: refetchHistory } = useMyOfferHistory()
  const { stats, isLoading: statsLoading } = useMyStats()
  const { listings, isLoading: listingsLoading, refetch: refetchListings } = useKektvListings(address)
  const { offerIds: madeOfferIds } = useUserOffers(address)
  const { offerIds: receivedOfferIds } = useReceivedOffers(address)
  const [filter, setFilter] = useState<'all' | 'made' | 'received' | 'listings'>('all')

  const handleRefresh = async () => {
    // Refetching events will automatically update stats (stats are derived from events)
    await Promise.all([refetchHistory(), refetchListings()])
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
          <h1 className="text-4xl font-bold text-[#daa520] font-fredoka">My Activity</h1>
          <button
            onClick={handleRefresh}
            disabled={isLoading || statsLoading}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-[#daa520] transition disabled:opacity-50"
          >
            🔄 Refresh
          </button>
        </div>
        <p className="text-gray-400">Your complete trading history</p>
      </div>

      {/* Statistics */}
      <UserStatistics
        stats={stats}
        listings={listings}
        onRefresh={handleRefresh}
        isRefreshing={isLoading || statsLoading || listingsLoading}
      />

      {/* Activity Timeline */}
      <div className="space-y-4">
        {/* Filter tabs */}
        <div className="flex gap-2 border-b border-gray-700 overflow-x-auto">
          <FilterTab
            label="All Activity"
            count={events?.length || 0}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <FilterTab
            label="Offers Made"
            count={madeOfferIds.length}
            active={filter === 'made'}
            onClick={() => setFilter('made')}
          />
          <FilterTab
            label="Offers Received"
            count={receivedOfferIds.length}
            active={filter === 'received'}
            onClick={() => setFilter('received')}
          />
          <FilterTab
            label="My Listings"
            count={listings.length}
            active={filter === 'listings'}
            onClick={() => setFilter('listings')}
          />
        </div>

        {/* Events list */}
        <ActivityList
          events={events || []}
          listings={listings}
          filter={filter}
          userAddress={address!}
          onRefresh={handleRefresh}
        />
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
}: {
  stats: ReturnType<typeof useMyStats>['stats']
  listings: ReturnType<typeof useKektvListings>['listings']
  onRefresh?: () => void
  isRefreshing?: boolean
}) {
  // Calculate listing statistics
  const activeListingsCount = listings.length
  const totalListedValue = listings.reduce((sum, listing) => {
    return sum + BigInt(listing.totalPrice)
  }, BigInt(0))

  return (
    <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-6">
      <h3 className="text-lg font-bold text-[#daa520] mb-4 font-fredoka">📊 Your Stats</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Offer Stats */}
        <StatCard label="Offers Made" value={stats.offersMade.toString()} icon="💰" />
        <StatCard label="Offers Received" value={stats.offersReceived.toString()} icon="📥" />
        <StatCard label="Accepted" value={stats.offersAccepted.toString()} icon="✅" highlight={stats.offersAccepted > 0} />
        <StatCard label="Cancelled" value={stats.offersCancelled.toString()} icon="❌" />

        {/* Marketplace Stats */}
        <StatCard label="Vouchers Sold" value={stats.vouchersSold.toString()} icon="💸" highlight={stats.vouchersSold > 0} />
        <StatCard label="Vouchers Listed" value={stats.vouchersListed.toString()} icon="🏪" />
        <StatCard label="Active Listings" value={activeListingsCount.toString()} icon="📋" highlight={activeListingsCount > 0} />

        {totalListedValue > BigInt(0) && (
          <StatCard
            label="Total Listed Value"
            value={(Number(totalListedValue) / 1e18).toLocaleString() + ' BASED'}
            icon="💎"
            highlight={true}
          />
        )}

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
 * Filter tab button
 */
function FilterTab({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition whitespace-nowrap ${
        active
          ? 'text-[#daa520] border-[#daa520]'
          : 'text-gray-400 border-transparent hover:text-gray-300'
      }`}
    >
      {label} ({count})
    </button>
  )
}

/**
 * Activity list
 */
function ActivityList({
  events,
  listings,
  filter,
  userAddress,
  onRefresh,
}: {
  events: TradingEvent[]
  listings: ReturnType<typeof useKektvListings>['listings']
  filter: 'all' | 'made' | 'received' | 'listings'
  userAddress: string
  onRefresh: () => void
}) {
  const normalizedAddress = userAddress.toLowerCase()

  // Filter events
  let filteredEvents = events.filter((event) => {
    if (filter === 'all') return true

    if (filter === 'made') {
      return 'offerer' in event && event.offerer.toLowerCase() === normalizedAddress
    }

    if (filter === 'received') {
      // Show OfferMade events where someone ELSE made an offer on YOUR vouchers
      return (
        event.eventType === 'OfferMade' &&
        'voucherOwner' in event &&
        'offerer' in event &&
        event.voucherOwner.toLowerCase() === normalizedAddress &&
        event.offerer.toLowerCase() !== normalizedAddress &&
        event.voucherOwner !== '0x0000000000000000000000000000000000000000'
      )
    }

    return false
  })

  // Show listings in the "listings" filter
  if (filter === 'listings') {
    filteredEvents = events.filter((event) =>
      (event.eventType === 'VoucherListed' ||
       event.eventType === 'ListingCancelled' ||
       event.eventType === 'VoucherSold') &&
      'seller' in event &&
      event.seller.toLowerCase() === normalizedAddress
    )
  }

  if (filteredEvents.length === 0 && filter !== 'listings') {
    return (
      <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-8 text-center">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-xl font-fredoka text-gray-400 mb-2">No activity yet</p>
        <p className="text-sm text-gray-500">Start trading to see your history here!</p>
      </div>
    )
  }

  // Show active listings in listings filter
  if (filter === 'listings') {
    return (
      <div className="space-y-3">
        {/* Active Listings */}
        {listings.length > 0 && (
          <>
            <div className="text-sm text-gray-400 font-medium px-2">Active Listings ({listings.length})</div>
            {listings.map((listing) => (
              <ListingCard
                key={`${listing.seller}-${listing.tokenId}`}
                listing={listing}
                onRefresh={onRefresh}
              />
            ))}
          </>
        )}

        {/* Historical Events */}
        {filteredEvents.length > 0 && (
          <>
            <div className="text-sm text-gray-400 font-medium px-2 mt-6">Listing History ({filteredEvents.length})</div>
            {filteredEvents.map((event, i) => (
              <ActivityCard
                key={`${event.transactionHash}-${i}`}
                event={event}
                userAddress={userAddress}
                onRefresh={onRefresh}
              />
            ))}
          </>
        )}

        {listings.length === 0 && filteredEvents.length === 0 && (
          <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-8 text-center">
            <div className="text-6xl mb-4">🏪</div>
            <p className="text-xl font-fredoka text-gray-400 mb-2">No listings yet</p>
            <p className="text-sm text-gray-500">List your vouchers for sale on the marketplace!</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {filteredEvents.map((event, i) => (
        <ActivityCard
          key={`${event.transactionHash}-${i}`}
          event={event}
          userAddress={userAddress}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  )
}

/**
 * Listing card with cancel button
 */
function ListingCard({
  listing,
  onRefresh
}: {
  listing: ReturnType<typeof useKektvListings>['listings'][0]
  onRefresh: () => void
}) {
  const { cancelListing, isPending } = useKektvMarketplace()
  const [isCancelling, setIsCancelling] = useState(false)

  const handleCancelListing = async () => {
    try {
      setIsCancelling(true)
      await cancelListing(BigInt(listing.tokenId))

      // Wait a bit for blockchain to update, then refresh
      setTimeout(() => {
        onRefresh()
        setIsCancelling(false)
      }, 3000)
    } catch (error) {
      console.error('Failed to cancel listing:', error)
      setIsCancelling(false)
    }
  }

  const pricePerItem = Number(listing.pricePerItem) / 1e18
  const totalPrice = Number(listing.totalPrice) / 1e18

  return (
    <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-4 hover:border-gray-600/50 transition">
      <div className="flex items-start justify-between gap-4">
        {/* Left: Listing info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏪</span>
            <div>
              <p className="text-sm font-medium text-white">Active Listing</p>
              <p className="text-xs text-gray-500">
                𝕂Ǝ𝕂TV #{listing.tokenId} ({VOUCHER_NAMES[listing.tokenId as keyof typeof VOUCHER_NAMES]})
              </p>
            </div>
          </div>

          <div className="space-y-1 ml-10">
            <p className="text-xs text-gray-400">
              <span className="text-gray-500">Amount:</span> <span className="text-white">{listing.amount} vouchers</span>
            </p>
            <p className="text-xs text-gray-400">
              <span className="text-gray-500">Price per voucher:</span>{' '}
              <span className="text-[#daa520] font-bold">{pricePerItem.toLocaleString()} BASED</span>
            </p>
            <p className="text-sm font-bold text-[#daa520]">
              Total: {totalPrice.toLocaleString()} BASED
            </p>
          </div>
        </div>

        {/* Right: Cancel button */}
        <button
          onClick={handleCancelListing}
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
 * Activity card (single event) with action buttons
 */
function ActivityCard({
  event,
  userAddress,
  onRefresh,
}: {
  event: TradingEvent
  userAddress: string
  onRefresh: () => void
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
                <span className="text-gray-500">({VOUCHER_NAMES[event.tokenId as keyof typeof VOUCHER_NAMES]})</span>
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

        {/* Right: Action buttons or transaction link */}
        <div className="flex-shrink-0 flex flex-col gap-2">
          <OfferActionButtons
            event={event}
            userAddress={userAddress}
            onRefresh={onRefresh}
          />
          <a
            href={`https://explorer.bf1337.org/tx/${event.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#daa520] hover:underline text-right"
          >
            View TX →
          </a>
        </div>
      </div>
    </div>
  )
}

/**
 * Offer action buttons (Accept/Cancel/Reject)
 */
function OfferActionButtons({
  event,
  userAddress,
  onRefresh,
}: {
  event: TradingEvent
  userAddress: string
  onRefresh: () => void
}) {
  const { acceptOffer, cancelOffer, isPending } = useKektvOffers()
  const [isProcessing, setIsProcessing] = useState(false)
  const normalizedAddress = userAddress.toLowerCase()

  // Only show buttons for OfferMade events
  if (event.eventType !== 'OfferMade') return null
  if (!('offerId' in event)) return null

  const isOfferer = 'offerer' in event && event.offerer.toLowerCase() === normalizedAddress
  const isOwner = 'voucherOwner' in event && event.voucherOwner.toLowerCase() === normalizedAddress

  const handleAcceptOffer = async () => {
    try {
      setIsProcessing(true)
      await acceptOffer(BigInt(event.offerId))

      // Wait for blockchain to update, then refresh
      setTimeout(() => {
        onRefresh()
        setIsProcessing(false)
      }, 3000)
    } catch (error) {
      console.error('Failed to accept offer:', error)
      setIsProcessing(false)
    }
  }

  const handleCancelOffer = async () => {
    try {
      setIsProcessing(true)
      await cancelOffer(BigInt(event.offerId))

      // Wait for blockchain to update, then refresh
      setTimeout(() => {
        onRefresh()
        setIsProcessing(false)
      }, 3000)
    } catch (error) {
      console.error('Failed to cancel offer:', error)
      setIsProcessing(false)
    }
  }

  // Show Accept button for voucher owners
  if (isOwner && !isOfferer) {
    return (
      <button
        onClick={handleAcceptOffer}
        disabled={isPending || isProcessing}
        className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-sm text-green-400 hover:bg-green-500/30 transition disabled:opacity-50"
      >
        {isPending || isProcessing ? 'Processing...' : '✅ Accept Offer'}
      </button>
    )
  }

  // Show Cancel button for offer makers
  if (isOfferer) {
    return (
      <button
        onClick={handleCancelOffer}
        disabled={isPending || isProcessing}
        className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-sm text-red-400 hover:bg-red-500/30 transition disabled:opacity-50"
      >
        {isPending || isProcessing ? 'Processing...' : '❌ Cancel Offer'}
      </button>
    )
  }

  return null
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
