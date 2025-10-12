'use client'

import { useAccount } from 'wagmi'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { NFTDashboard } from '@/components/wallet/NFTDashboard'

/**
 * Dashboard Page
 *
 * Personal dashboard showing wallet NFTs, portfolio stats, and rewards
 */
export default function DashboardPage() {
  const { address, isConnected } = useAccount()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="font-fredoka mb-4 text-4xl font-bold text-white sm:text-5xl">
              Your Dashboard
            </h1>
            <p className="font-fredoka text-lg text-gray-300">
              View your NFT collection, portfolio stats, and rewards
            </p>
          </div>

          {/* Dashboard Content */}
          {isConnected && address ? (
            <NFTDashboard address={address} />
          ) : (
            <div className="bg-gray-900/60 rounded-xl border border-gray-800 p-12 text-center max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🔗</div>
              <h2 className="font-fredoka text-2xl font-bold text-white mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Please connect your wallet to view your NFT dashboard, portfolio statistics, and rewards.
              </p>
              <p className="text-sm text-gray-500">
                Click the &quot;Connect Wallet&quot; button in the header to get started
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
