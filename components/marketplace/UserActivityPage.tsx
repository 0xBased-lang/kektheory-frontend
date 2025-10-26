/**
 * User Activity Page
 * Shows user's personal offer history and statistics
 */

'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useMyOfferHistory, useMyStats } from '@/lib/hooks/useOfferHistory'
import { formatUnits } from 'ethers'
import type { OfferEvent } from '@/lib/services/explorer-api'
import { VOUCHER_NAMES } from '@/config/contracts/kektv-offers'

export function UserActivityPage() {
  const { address, isConnected } = useAccount()
  const { data: events, isLoading, refetch: refetchHistory } = useMyOfferHistory()
  const { stats, isLoading: statsLoading } = useMyStats()
  const [filter, setFilter] = useState<'all' | 'made' | 'received'>('all')

  const handleRefresh = async () => {
    // Refetching events will automatically update stats (stats are derived from events)
    await refetchHistory()
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
      <UserStatistics stats={stats} onRefresh={handleRefresh} isRefreshing={isLoading || statsLoading} />

      {/* Activity Timeline */}
      <div className="space-y-4">
        {/* Filter tabs */}
        <div className="flex gap-2 border-b border-gray-700">
          <FilterTab
            label="All Activity"
            count={events?.length || 0}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <FilterTab
            label="Offers Made"
            count={stats.offersMade}
            active={filter === 'made'}
            onClick={() => setFilter('made')}
          />
          <FilterTab
            label="Offers Received"
            count={stats.offersReceived}
            active={filter === 'received'}
            onClick={() => setFilter('received')}
          />
        </div>

        {/* Events list */}
        <ActivityList events={events || []} filter={filter} userAddress={address!} />
      </div>
    </div>
  )
}

/**
 * User statistics cards
 */
function UserStatistics({
  stats,
}: {
  stats: ReturnType<typeof useMyStats>['stats']
  onRefresh?: () => void
  isRefreshing?: boolean
}) {
  return (
    <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-6">
      <h3 className="text-lg font-bold text-[#daa520] mb-4 font-fredoka">📊 Your Stats</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Offers Made" value={stats.offersMade.toString()} icon="💰" />
        <StatCard label="Offers Received" value={stats.offersReceived.toString()} icon="📥" />
        <StatCard label="Accepted" value={stats.offersAccepted.toString()} icon="✅" highlight={stats.offersAccepted > 0} />
        <StatCard label="Cancelled" value={stats.offersCancelled.toString()} icon="❌" />

        {stats.totalSpent > BigInt(0) && (
          <StatCard label="Total Spent" value={formatUnits(stats.totalSpent, 18) + ' TECH'} icon="💸" />
        )}

        {stats.totalEarned > BigInt(0) && (
          <StatCard label="Total Earned" value={formatUnits(stats.totalEarned, 18) + ' TECH'} icon="💰" />
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
      className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
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
  filter,
  userAddress,
}: {
  events: OfferEvent[]
  filter: 'all' | 'made' | 'received'
  userAddress: string
}) {
  const normalizedAddress = userAddress.toLowerCase()

  // Filter events
  const filteredEvents = events.filter((event) => {
    if (filter === 'all') return true

    if (filter === 'made') {
      return 'offerer' in event && event.offerer.toLowerCase() === normalizedAddress
    }

    if (filter === 'received') {
      return (
        'voucherOwner' in event &&
        event.voucherOwner.toLowerCase() === normalizedAddress &&
        event.voucherOwner !== '0x0000000000000000000000000000000000000000'
      )
    }

    return false
  })

  if (filteredEvents.length === 0) {
    return (
      <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-8 text-center">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-xl font-fredoka text-gray-400 mb-2">No activity yet</p>
        <p className="text-sm text-gray-500">Start trading to see your history here!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {filteredEvents.map((event, i) => (
        <ActivityCard key={`${event.transactionHash}-${i}`} event={event} userAddress={userAddress} />
      ))}
    </div>
  )
}

/**
 * Activity card (single event)
 */
function ActivityCard({ event, userAddress }: { event: OfferEvent; userAddress: string }) {
  const normalizedAddress = userAddress.toLowerCase()
  const isOfferer = 'offerer' in event && event.offerer.toLowerCase() === normalizedAddress
  const isOwner = 'voucherOwner' in event && event.voucherOwner.toLowerCase() === normalizedAddress

  return (
    <div className="bg-gray-900/60 rounded-lg border border-gray-700/50 p-4 hover:border-gray-600/50 transition">
      <div className="flex items-start justify-between gap-4">
        {/* Left: Event info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{getEventIcon(event.eventType)}</span>
            <div>
              <p className="text-sm font-medium text-white">
                {getEventLabel(event.eventType, isOfferer, isOwner)}
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
                {formatUnits(event.offerPrice, 18)} TECH
              </p>
            )}

            {/* Role indicator */}
            <div className="flex gap-2">
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
            </div>
          </div>
        </div>

        {/* Right: Transaction link */}
        <a
          href={`https://explorer.bf1337.org/tx/${event.transactionHash}`}
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
function getEventIcon(eventType: OfferEvent['eventType']): string {
  switch (eventType) {
    case 'OfferMade':
      return '💰'
    case 'OfferAccepted':
      return '✅'
    case 'OfferCancelled':
      return '❌'
    case 'OfferRejected':
      return '🚫'
  }
}

function getEventLabel(eventType: OfferEvent['eventType'], isOfferer: boolean, isOwner: boolean): string {
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
