'use client'

import { Bell, Activity, TrendingUp, Users, DollarSign, Zap } from 'lucide-react'

interface StatusBarStat {
  icon?: React.ReactNode
  label: string
  value: string | number
  color?: string
  trend?: 'up' | 'down' | 'neutral'
}

interface TerminalStatusBarProps {
  stats?: StatusBarStat[]
  notifications?: number
  onNotificationClick?: () => void
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
}

/**
 * TerminalStatusBar - Bottom status bar with live stats
 *
 * Displays real-time statistics and notifications
 * Similar to crypto trading terminal status bars
 */
export function TerminalStatusBar({
  stats,
  notifications = 0,
  onNotificationClick,
  leftContent,
  rightContent
}: TerminalStatusBarProps) {
  return (
    <div className="h-10 flex items-center justify-between px-4 text-xs">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {leftContent || (
          <>
            {/* Notification Bell */}
            <button
              onClick={onNotificationClick}
              className="flex items-center gap-2 hover:text-[#3fb8bd] transition-colors text-gray-400 relative"
            >
              <Bell className="w-4 h-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
              <span>Notifications</span>
            </button>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Live</span>
            </div>
          </>
        )}
      </div>

      {/* Center Section - Stats */}
      {stats && stats.length > 0 && (
        <div className="flex items-center gap-6">
          {stats.map((stat, index) => (
            <StatusStat key={index} {...stat} />
          ))}
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {rightContent || (
          <div className="text-gray-500 font-mono">
            BasedAI Network
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * StatusStat - Individual stat in the status bar
 */
function StatusStat({ icon, label, value, color = '#3fb8bd', trend }: StatusBarStat) {
  return (
    <div className="flex items-center gap-2">
      {icon && <span style={{ color }}>{icon}</span>}
      <span className="text-gray-400">{label}:</span>
      <span className="font-bold font-mono" style={{ color }}>
        {value}
      </span>
      {trend && (
        <span className={`text-xs ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
        </span>
      )}
    </div>
  )
}

/**
 * Default stats for marketplace
 */
export function useDefaultMarketplaceStats() {
  return [
    {
      icon: <TrendingUp className="w-3 h-3" />,
      label: 'Floor',
      value: '0.1 ETH',
      color: '#3fb8bd',
      trend: 'up' as const
    },
    {
      icon: <DollarSign className="w-3 h-3" />,
      label: 'Volume',
      value: '142.5 ETH',
      color: '#4ecca7',
      trend: 'up' as const
    },
    {
      icon: <Users className="w-3 h-3" />,
      label: 'Holders',
      value: '1,234',
      color: '#daa520',
      trend: 'neutral' as const
    },
    {
      icon: <Zap className="w-3 h-3" />,
      label: 'Sales',
      value: '89',
      color: '#ff00ff',
      trend: 'up' as const
    }
  ]
}
