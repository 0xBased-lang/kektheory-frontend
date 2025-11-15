'use client'

import { Search, Settings, Wallet, ChevronDown } from 'lucide-react'

interface TerminalTopBarProps {
  logo?: React.ReactNode
  navigation?: NavigationItem[]
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  walletAddress?: string
  onConnectWallet?: () => void
  rightActions?: React.ReactNode
}

interface NavigationItem {
  id: string
  label: string
  icon?: React.ReactNode
  active?: boolean
  onClick?: () => void
}

/**
 * TerminalTopBar - Top navigation bar for terminal UI
 *
 * Includes logo, navigation, search, and wallet connection
 */
export function TerminalTopBar({
  logo,
  navigation,
  searchPlaceholder = 'Search NFTs...',
  onSearch,
  walletAddress,
  onConnectWallet,
  rightActions
}: TerminalTopBarProps) {
  return (
    <div className="h-14 flex items-center justify-between px-4 gap-4">
      {/* Left Section - Logo and Navigation */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        {logo && (
          <div className="flex-shrink-0">
            {logo}
          </div>
        )}

        {/* Navigation Items */}
        {navigation && navigation.length > 0 && (
          <nav className="flex items-center gap-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`
                  px-3 py-1.5 rounded-lg font-fredoka font-bold text-sm transition-colors
                  ${item.active
                    ? 'bg-[#3fb8bd]/20 text-[#3fb8bd]'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }
                `}
              >
                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3fb8bd]/50 transition-colors"
          />
        </div>
      </div>

      {/* Right Section - Wallet and Actions */}
      <div className="flex items-center gap-2">
        {rightActions}

        {/* Settings */}
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
          <Settings className="w-4 h-4" />
        </button>

        {/* Wallet Connection */}
        {walletAddress ? (
          <button className="px-3 py-1.5 bg-[#3fb8bd]/20 text-[#3fb8bd] rounded-lg font-mono text-sm font-bold hover:bg-[#3fb8bd]/30 transition-colors flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            <ChevronDown className="w-3 h-3" />
          </button>
        ) : (
          <button
            onClick={onConnectWallet}
            className="px-4 py-1.5 bg-[#3fb8bd] text-black rounded-lg font-bold text-sm hover:bg-[#4ecca7] transition-colors"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  )
}
