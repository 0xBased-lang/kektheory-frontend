'use client'

import type { DashboardSection } from './PortfolioOverview'
import { TechTokenCard } from './TechTokenCard'
import { VoucherSection } from './VoucherSection'
import { KektechNFTsOnly } from '@/components/wallet/KektechNFTsOnly'
import type { VoucherBalance } from '@/lib/hooks/useVoucherBalance'

interface DetailViewSectionProps {
  activeSection: DashboardSection
  address: string

  // TECH Token props
  techBalance: string
  techBalanceFormatted: string
  techBalanceCompact: string
  techLoading: boolean

  // Voucher props
  vouchers: VoucherBalance[]
  ownedVouchers: VoucherBalance[]
  totalVouchers: number
  vouchersLoading: boolean
  explorerUrl: string

  // Portfolio metrics
  totalNFTs: number
  kektechNFTCount: number
}

/**
 * DetailViewSection Component
 *
 * Dynamically displays detailed information based on the active section:
 * - 'nfts': Shows NFT gallery with KEKTECH and other NFTs
 * - 'tech': Shows TECH token details and actions
 * - 'vouchers': Shows voucher collection and details
 * - 'assets': Shows comprehensive portfolio summary
 */
export function DetailViewSection({
  activeSection,
  address,
  techBalance,
  techBalanceFormatted,
  techBalanceCompact,
  techLoading,
  vouchers,
  ownedVouchers,
  totalVouchers,
  vouchersLoading,
  explorerUrl,
  totalNFTs,
  kektechNFTCount,
}: DetailViewSectionProps) {

  // NFT Section - ONLY KEKTECH NFTs
  if (activeSection === 'nfts') {
    return (
      <div className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl border border-green-500/20 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-green-400 mb-2 font-fredoka">
              🐸 Your KEKTECH NFT Collection
            </h2>
            <p className="text-gray-400">
              View and manage your KEKTECH NFTs on BasedAI Network
            </p>
          </div>
        </div>
        <KektechNFTsOnly address={address} />
      </div>
    )
  }

  // TECH Token Section
  if (activeSection === 'tech') {
    return (
      <div>
        <TechTokenCard
          balance={techBalance}
          balanceFormatted={techBalanceFormatted}
          balanceCompact={techBalanceCompact}
          isLoading={techLoading}
        />
      </div>
    )
  }

  // Vouchers Section
  if (activeSection === 'vouchers') {
    return (
      <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl border border-purple-500/20 p-8">
        <VoucherSection
          vouchers={vouchers}
          ownedVouchers={ownedVouchers}
          totalVouchers={totalVouchers}
          isLoading={vouchersLoading}
          explorerUrl={explorerUrl}
        />
      </div>
    )
  }

  // Total Assets Overview Section
  if (activeSection === 'assets') {
    return (
      <div className="bg-gradient-to-br from-gray-700/10 to-gray-800/10 rounded-2xl border border-gray-700/30 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 font-fredoka">
            📊 Complete Portfolio Overview
          </h2>
          <p className="text-[#3fb8bd] text-lg font-semibold">
            Comprehensive view of all your assets on BasedAI Network
          </p>
        </div>

        {/* Portfolio Summary Cards - Reordered: KEKTECH NFTs, TECH Tokens, Vouchers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* KEKTECH NFTs Summary - LEFT */}
          <div className="bg-green-500/10 rounded-xl border border-green-500/20 p-6">
            <div className="text-4xl mb-4">🐸</div>
            <h3 className="text-xl font-bold text-green-400 mb-2 font-fredoka">
              KEKTECH NFT Collection
            </h3>
            <div className="text-3xl font-bold text-white mb-2">
              {kektechNFTCount}
            </div>
            <p className="text-sm text-gray-400">
              KEKTECH NFTs
              {totalNFTs > kektechNFTCount && ` (+${totalNFTs - kektechNFTCount} others)`}
            </p>
          </div>

          {/* TECH Tokens Summary - MIDDLE */}
          <div className="bg-cyan-500/10 rounded-xl border border-cyan-500/20 p-6">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2 font-fredoka">
              TECH Tokens
            </h3>
            <div className="text-3xl font-bold text-white mb-2">
              {techBalanceCompact}
            </div>
            <p className="text-sm text-gray-400">
              {parseFloat(techBalance) > 0
                ? `${techBalance} TECH`
                : 'No tokens held'}
            </p>
          </div>

          {/* Vouchers Summary - RIGHT */}
          <div className="bg-purple-500/10 rounded-xl border border-purple-500/20 p-6">
            <div className="text-4xl mb-4">🎫</div>
            <h3 className="text-xl font-bold text-purple-400 mb-2 font-fredoka">
              Vouchers
            </h3>
            <div className="text-3xl font-bold text-white mb-2">
              {totalVouchers}
            </div>
            <p className="text-sm text-gray-400">
              {ownedVouchers.length} type{ownedVouchers.length !== 1 ? 's' : ''} owned
            </p>
          </div>
        </div>

        {/* Asset Breakdown */}
        <div className="bg-gray-900/60 rounded-xl border border-gray-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4 font-fredoka">
            Asset Breakdown
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="text-2xl">💰</div>
                <div>
                  <div className="text-white font-bold">TECH Token (ERC-20)</div>
                  <div className="text-sm text-gray-400">{techBalanceCompact} balance</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-cyan-400 font-bold">
                  {parseFloat(techBalance) > 0 ? 'Active' : 'Empty'}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🐸</div>
                <div>
                  <div className="text-white font-bold">KEKTECH NFTs (ERC-721)</div>
                  <div className="text-sm text-gray-400">{kektechNFTCount} collectibles</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold">
                  {kektechNFTCount} Owned
                </div>
              </div>
            </div>

            {totalNFTs > kektechNFTCount && (
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🎨</div>
                  <div>
                    <div className="text-white font-bold">Other NFTs (ERC-721)</div>
                    <div className="text-sm text-gray-400">Various collections</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">
                    {totalNFTs - kektechNFTCount} Owned
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎫</div>
                <div>
                  <div className="text-white font-bold">KEKTECH Vouchers (ERC-1155)</div>
                  <div className="text-sm text-gray-400">{ownedVouchers.length} types</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-purple-400 font-bold">
                  {totalVouchers} Total
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex-1 min-w-[200px] px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold transition font-fredoka"
          >
            🔝 Back to Top
          </button>
          <button
            disabled
            className="flex-1 min-w-[200px] px-6 py-3 rounded-xl bg-gray-800/50 text-gray-500 font-bold cursor-not-allowed font-fredoka opacity-50"
            title="Coming soon"
          >
            📊 Export Portfolio (Coming Soon)
          </button>
        </div>
      </div>
    )
  }

  return null
}
