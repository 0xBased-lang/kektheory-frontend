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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900/60 rounded-xl border border-gray-800 p-6 animate-pulse"
          >
            <div className="h-10 w-10 bg-gray-800 rounded-lg mb-3"></div>
            <div className="h-8 w-20 bg-gray-800 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-800 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {/* KEKTECH NFTs - MAIN POSITION */}
      <button
        onClick={() => onSectionChange('nfts')}
        className={`bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border p-6 transition text-left cursor-pointer hover:scale-105 ${
          activeSection === 'nfts'
            ? 'border-green-500/60 ring-2 ring-green-500/30 shadow-lg shadow-green-500/20'
            : 'border-green-500/20 hover:border-green-500/40'
        }`}
      >
        <div className="text-4xl mb-3">🐸</div>
        <div className="text-3xl font-bold text-green-400 mb-2 font-fredoka">
          {kektechNFTCount}
        </div>
        <div className="text-sm text-gray-400">KEKTECH NFTs</div>
        {totalNFTs > kektechNFTCount && (
          <div className="text-xs text-gray-500 mt-1">
            +{totalNFTs - kektechNFTCount} other NFTs
          </div>
        )}
      </button>

      {/* TECH Token */}
      <button
        onClick={() => onSectionChange('tech')}
        className={`bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border p-6 transition text-left cursor-pointer hover:scale-105 ${
          activeSection === 'tech'
            ? 'border-cyan-500/60 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/20'
            : 'border-cyan-500/20 hover:border-cyan-500/40'
        }`}
      >
        <div className="text-4xl mb-3">💰</div>
        <div className="text-3xl font-bold text-cyan-400 mb-2 font-fredoka">
          {techBalanceCompact}
        </div>
        <div className="text-sm text-gray-400">TECH Tokens</div>
        <div className="text-xs text-gray-500 mt-1 truncate" title={techBalance}>
          {parseFloat(techBalance) > 0 ? `${techBalance} TECH` : 'No tokens'}
        </div>
      </button>

      {/* Vouchers */}
      <button
        onClick={() => onSectionChange('vouchers')}
        className={`bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border p-6 transition text-left cursor-pointer hover:scale-105 ${
          activeSection === 'vouchers'
            ? 'border-purple-500/60 ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/20'
            : 'border-purple-500/20 hover:border-purple-500/40'
        }`}
      >
        <div className="text-4xl mb-3">🎫</div>
        <div className="text-3xl font-bold text-purple-400 mb-2 font-fredoka">
          {totalVouchers}
        </div>
        <div className="text-sm text-gray-400">Total Vouchers</div>
        {uniqueVoucherTypes > 0 && (
          <div className="text-xs text-gray-500 mt-1">
            {uniqueVoucherTypes} type{uniqueVoucherTypes !== 1 ? 's' : ''}
          </div>
        )}
      </button>

      {/* Total Assets */}
      <button
        onClick={() => onSectionChange('assets')}
        className={`bg-gradient-to-br from-gray-700/20 to-gray-800/20 rounded-xl border p-6 transition text-left cursor-pointer hover:scale-105 ${
          activeSection === 'assets'
            ? 'border-gray-600/60 ring-2 ring-gray-600/30 shadow-lg shadow-gray-600/20'
            : 'border-gray-700/30 hover:border-gray-600/40'
        }`}
      >
        <div className="text-4xl mb-3">📊</div>
        <div className="text-3xl font-bold text-white mb-2 font-fredoka">
          {totalNFTs + (totalVouchers > 0 ? 1 : 0) + (parseFloat(techBalance) > 0 ? 1 : 0)}
        </div>
        <div className="text-sm text-gray-400">Asset Types</div>
        <div className="text-xs text-gray-500 mt-1">
          Total holdings
        </div>
      </button>
    </div>
  )
}
