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
    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
      {/* KEKTECH NFTs - Elegant Card Button */}
      <button
        onClick={() => onSectionChange('nfts')}
        className={`relative overflow-hidden rounded-xl border transition-all hover:scale-105 ${
          activeSection === 'nfts'
            ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/60 shadow-lg shadow-green-500/20'
            : 'bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20 hover:border-green-500/40'
        }`}
      >
        {/* Checkered Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="relative px-5 py-3 flex items-center gap-3">
          <span className="text-2xl">🐸</span>
          <div className="text-left">
            <div className="text-xs text-gray-400 font-fredoka">KEKTECH NFTs</div>
            <div className="text-lg font-bold text-green-400 font-fredoka">
              {kektechNFTCount}
              {totalNFTs > kektechNFTCount && (
                <span className="text-xs text-gray-500 ml-1">+{totalNFTs - kektechNFTCount}</span>
              )}
            </div>
          </div>
        </div>
      </button>

      {/* TECH Token - Elegant Card Button */}
      <button
        onClick={() => onSectionChange('tech')}
        className={`relative overflow-hidden rounded-xl border transition-all hover:scale-105 ${
          activeSection === 'tech'
            ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/60 shadow-lg shadow-cyan-500/20'
            : 'bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border-cyan-500/20 hover:border-cyan-500/40'
        }`}
      >
        {/* Checkered Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="relative px-5 py-3 flex items-center gap-3">
          <span className="text-2xl">💰</span>
          <div className="text-left">
            <div className="text-xs text-gray-400 font-fredoka">TECH Tokens</div>
            <div className="text-lg font-bold text-cyan-400 font-fredoka">
              {techBalanceCompact}
            </div>
          </div>
        </div>
      </button>

      {/* Vouchers - Elegant Card Button */}
      <button
        onClick={() => onSectionChange('vouchers')}
        className={`relative overflow-hidden rounded-xl border transition-all hover:scale-105 ${
          activeSection === 'vouchers'
            ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/60 shadow-lg shadow-purple-500/20'
            : 'bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20 hover:border-purple-500/40'
        }`}
      >
        {/* Checkered Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="relative px-5 py-3 flex items-center gap-3">
          <span className="text-2xl">🎫</span>
          <div className="text-left">
            <div className="text-xs text-gray-400 font-fredoka">Vouchers</div>
            <div className="text-lg font-bold text-purple-400 font-fredoka">
              {totalVouchers}
              {uniqueVoucherTypes > 0 && (
                <span className="text-xs text-gray-500 ml-1">({uniqueVoucherTypes})</span>
              )}
            </div>
          </div>
        </div>
      </button>

      {/* Total Assets - Elegant Card Button */}
      <button
        onClick={() => onSectionChange('assets')}
        className={`relative overflow-hidden rounded-xl border transition-all hover:scale-105 ${
          activeSection === 'assets'
            ? 'bg-gradient-to-br from-gray-700/30 to-gray-800/30 border-gray-600/60 shadow-lg shadow-gray-600/20'
            : 'bg-gradient-to-br from-gray-700/10 to-gray-800/10 border-gray-700/30 hover:border-gray-600/40'
        }`}
      >
        {/* Checkered Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="relative px-5 py-3 flex items-center gap-3">
          <span className="text-2xl">📊</span>
          <div className="text-left">
            <div className="text-xs text-gray-400 font-fredoka">Asset Types</div>
            <div className="text-lg font-bold text-white font-fredoka">
              {totalNFTs + (totalVouchers > 0 ? 1 : 0) + (parseFloat(techBalance) > 0 ? 1 : 0)}
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}
