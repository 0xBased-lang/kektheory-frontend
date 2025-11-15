'use client'

import { ArrowUpRight, ArrowDownRight, ShoppingCart, Tag } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export interface ActivityItem {
  id: string
  type: 'buy' | 'sell' | 'mint' | 'offer' | 'transfer'
  user: string
  tokenName: string
  tokenId?: string
  price?: string
  timestamp: Date
  changePercent?: number
}

interface TerminalActivityFeedProps {
  title?: string
  activities: ActivityItem[]
  maxItems?: number
}

/**
 * TerminalActivityFeed - Real-time activity feed sidebar
 *
 * Displays recent trading activity in a terminal-style feed
 */
export function TerminalActivityFeed({
  title = 'Activity Feed',
  activities,
  maxItems = 10
}: TerminalActivityFeedProps) {
  const displayedActivities = activities.slice(0, maxItems)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="font-bold text-white font-fredoka">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">Live trading activity</p>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto">
        {displayedActivities.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No recent activity
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {displayedActivities.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * ActivityRow - Individual activity item
 */
function ActivityRow({ activity }: { activity: ActivityItem }) {
  const { type, user, tokenName, tokenId, price, timestamp, changePercent } = activity

  const getIcon = () => {
    switch (type) {
      case 'buy':
        return <ArrowUpRight className="w-4 h-4 text-green-400" />
      case 'sell':
        return <ArrowDownRight className="w-4 h-4 text-red-400" />
      case 'mint':
        return <ShoppingCart className="w-4 h-4 text-[#3fb8bd]" />
      case 'offer':
        return <Tag className="w-4 h-4 text-yellow-400" />
      default:
        return <ArrowUpRight className="w-4 h-4 text-gray-400" />
    }
  }

  const getActionText = () => {
    switch (type) {
      case 'buy':
        return 'bought'
      case 'sell':
        return 'sold'
      case 'mint':
        return 'minted'
      case 'offer':
        return 'offered on'
      case 'transfer':
        return 'transferred'
      default:
        return 'interacted with'
    }
  }

  const getActionColor = () => {
    switch (type) {
      case 'buy':
        return 'text-green-400'
      case 'sell':
        return 'text-red-400'
      case 'mint':
        return 'text-[#3fb8bd]'
      case 'offer':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="p-3 hover:bg-gray-900/50 transition-colors cursor-pointer">
      <div className="flex items-start gap-2">
        {/* Icon */}
        <div className="mt-0.5">{getIcon()}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm leading-tight">
                <span className="text-gray-300 truncate block max-w-[120px] inline-block">
                  {user}
                </span>{' '}
                <span className={`font-bold ${getActionColor()}`}>
                  {getActionText()}
                </span>
              </p>
              <p className="text-white font-medium mt-0.5 truncate">
                {tokenName}
                {tokenId && (
                  <span className="text-gray-500 text-xs ml-1">#{tokenId}</span>
                )}
              </p>
            </div>

            {/* Timestamp */}
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {formatDistanceToNow(timestamp, { addSuffix: false })}
            </span>
          </div>

          {/* Price and Change */}
          {price && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#3fb8bd] font-mono text-sm font-bold">
                {price}
              </span>
              {changePercent !== undefined && changePercent !== 0 && (
                <span
                  className={`text-xs font-bold ${
                    changePercent > 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {changePercent > 0 ? '+' : ''}
                  {changePercent}%
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * WalletSection - Wallet info for sidebar
 */
export function WalletSection({
  walletName = 'Wallet 1',
  balance,
  address
}: {
  walletName?: string
  balance?: string
  address?: string
}) {
  return (
    <div className="p-4 border-b border-gray-800 bg-[#0f0f0f]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-white font-fredoka">{walletName}</h3>
        {balance && (
          <span className="text-[#3fb8bd] font-mono font-bold">{balance}</span>
        )}
      </div>
      {address && (
        <p className="text-xs text-gray-500 font-mono truncate">{address}</p>
      )}
    </div>
  )
}
