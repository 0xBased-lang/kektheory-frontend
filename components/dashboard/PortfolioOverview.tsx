'use client'

interface PortfolioOverviewProps {
  techBalance: string
  techBalanceCompact: string
  totalNFTs: number
  kektechNFTCount: number
  totalVouchers: number
  uniqueVoucherTypes: number
  isLoading: boolean
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
      {/* TECH Token Balance */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 p-6 hover:border-cyan-500/40 transition">
        <div className="text-4xl mb-3">💰</div>
        <div className="text-3xl font-bold text-cyan-400 mb-2 font-fredoka">
          {techBalanceCompact}
        </div>
        <div className="text-sm text-gray-400">TECH Tokens</div>
        <div className="text-xs text-gray-500 mt-1 truncate" title={techBalance}>
          {parseFloat(techBalance) > 0 ? `${techBalance} TECH` : 'No tokens'}
        </div>
      </div>

      {/* NFT Collection */}
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 p-6 hover:border-green-500/40 transition">
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
      </div>

      {/* Voucher Collection */}
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 p-6 hover:border-purple-500/40 transition">
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
      </div>

      {/* Total Assets */}
      <div className="bg-gradient-to-br from-gray-700/20 to-gray-800/20 rounded-xl border border-gray-700/30 p-6 hover:border-gray-600/40 transition">
        <div className="text-4xl mb-3">📊</div>
        <div className="text-3xl font-bold text-white mb-2 font-fredoka">
          {totalNFTs + (totalVouchers > 0 ? 1 : 0) + (parseFloat(techBalance) > 0 ? 1 : 0)}
        </div>
        <div className="text-sm text-gray-400">Asset Types</div>
        <div className="text-xs text-gray-500 mt-1">
          Total holdings
        </div>
      </div>
    </div>
  )
}
