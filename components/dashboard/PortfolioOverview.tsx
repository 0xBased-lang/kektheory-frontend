'use client'

export type DashboardSection = 'nfts' | 'tech' | 'vouchers' | 'assets'

interface PortfolioOverviewProps {
  techBalance: string
  techBalanceCompact: string
  totalNFTs: number
  kektechNFTCount: number
  totalVouchers: number
  uniqueVoucherTypes: number
  isLoading: boolean
  activeSection: DashboardSection
  onSectionChange: (section: DashboardSection) => void
}

/**
 * PortfolioOverview Component
 *
 * Hero section displaying aggregated portfolio metrics
 */
export function PortfolioOverview({
  techBalance,
  techBalanceCompact,
  totalNFTs,
  kektechNFTCount,
  totalVouchers,
  uniqueVoucherTypes,
  isLoading,
  activeSection,
  onSectionChange,
}: PortfolioOverviewProps) {
  if (isLoading) {
    return (
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-800 bg-gray-900/60 animate-pulse"
          >
            <div className="h-5 w-5 bg-gray-800 rounded"></div>
            <div>
              <div className="h-3 w-16 bg-gray-800 rounded mb-1"></div>
              <div className="h-4 w-12 bg-gray-800 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {/* KEKTECH NFTs - Compact Button */}
      <button
        onClick={() => onSectionChange('nfts')}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition hover:scale-105 ${
          activeSection === 'nfts'
            ? 'bg-green-500/20 border-green-500/60 ring-1 ring-green-500/30'
            : 'bg-green-500/5 border-green-500/20 hover:border-green-500/40 hover:bg-green-500/10'
        }`}
      >
        <span className="text-xl">🐸</span>
        <div className="text-left">
          <div className="text-xs text-gray-400 leading-none">KEKTECH NFTs</div>
          <div className="text-sm font-bold text-green-400 font-fredoka leading-tight">
            {kektechNFTCount}
            {totalNFTs > kektechNFTCount && (
              <span className="text-xs text-gray-500 ml-1">+{totalNFTs - kektechNFTCount}</span>
            )}
          </div>
        </div>
      </button>

      {/* TECH Token - Compact Button */}
      <button
        onClick={() => onSectionChange('tech')}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition hover:scale-105 ${
          activeSection === 'tech'
            ? 'bg-cyan-500/20 border-cyan-500/60 ring-1 ring-cyan-500/30'
            : 'bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/10'
        }`}
      >
        <span className="text-xl">💰</span>
        <div className="text-left">
          <div className="text-xs text-gray-400 leading-none">TECH Tokens</div>
          <div className="text-sm font-bold text-cyan-400 font-fredoka leading-tight">
            {techBalanceCompact}
          </div>
        </div>
      </button>

      {/* Vouchers - Compact Button */}
      <button
        onClick={() => onSectionChange('vouchers')}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition hover:scale-105 ${
          activeSection === 'vouchers'
            ? 'bg-purple-500/20 border-purple-500/60 ring-1 ring-purple-500/30'
            : 'bg-purple-500/5 border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10'
        }`}
      >
        <span className="text-xl">🎫</span>
        <div className="text-left">
          <div className="text-xs text-gray-400 leading-none">Vouchers</div>
          <div className="text-sm font-bold text-purple-400 font-fredoka leading-tight">
            {totalVouchers}
            {uniqueVoucherTypes > 0 && (
              <span className="text-xs text-gray-500 ml-1">({uniqueVoucherTypes})</span>
            )}
          </div>
        </div>
      </button>

      {/* Total Assets - Compact Button */}
      <button
        onClick={() => onSectionChange('assets')}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition hover:scale-105 ${
          activeSection === 'assets'
            ? 'bg-gray-700/30 border-gray-600/60 ring-1 ring-gray-600/30'
            : 'bg-gray-700/10 border-gray-700/30 hover:border-gray-600/40 hover:bg-gray-700/20'
        }`}
      >
        <span className="text-xl">📊</span>
        <div className="text-left">
          <div className="text-xs text-gray-400 leading-none">Asset Types</div>
          <div className="text-sm font-bold text-white font-fredoka leading-tight">
            {totalNFTs + (totalVouchers > 0 ? 1 : 0) + (parseFloat(techBalance) > 0 ? 1 : 0)}
          </div>
        </div>
      </button>
    </div>
  )
}
