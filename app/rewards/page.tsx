'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { useState, useEffect } from 'react'

/**
 * Rewards Page
 * Details about the KEKTECH token economy and reward system
 */
export default function RewardsPage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [userRewards, setUserRewards] = useState({
    dailyRewards: 0,
    totalEarned: 0,
    rarityMultiplier: 1.0,
    stackingMultiplier: 1.0
  })

  useEffect(() => {
    // Check wallet connection
    const checkWallet = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[]
          if (accounts.length > 0) {
            setWalletConnected(true)
            // Mock rewards data - replace with actual blockchain queries
            setUserRewards({
              dailyRewards: 150,
              totalEarned: 4500,
              rarityMultiplier: 2.5,
              stackingMultiplier: 1.8
            })
          }
        } catch (error) {
          console.error('Wallet check error:', error)
        }
      }
    }
    checkWallet()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="font-fredoka mb-4 text-4xl font-bold text-white sm:text-5xl">
              🎁 KEKTECH Rewards
            </h1>
            <p className="font-fredoka text-lg text-gray-300">
              Earn daily rewards by holding KEKTECH NFTs. Rarity matters!
            </p>
          </div>

          {/* Rewards Dashboard */}
          {walletConnected ? (
            <div className="mb-16">
              <h2 className="font-fredoka mb-6 text-2xl font-bold text-white">Your Rewards Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-6">
                  <h3 className="text-sm text-gray-400 mb-2">Daily Rewards</h3>
                  <div className="text-3xl font-bold text-[#3fb8bd]">{userRewards.dailyRewards}</div>
                  <div className="text-xs text-gray-500 mt-1">Tokens/day</div>
                </div>

                <div className="bg-gradient-to-br from-[#4ecca7]/10 to-transparent rounded-2xl border border-[#4ecca7]/20 p-6">
                  <h3 className="text-sm text-gray-400 mb-2">Total Earned</h3>
                  <div className="text-3xl font-bold text-[#4ecca7]">{userRewards.totalEarned.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mt-1">All-time tokens</div>
                </div>

                <div className="bg-gradient-to-br from-[#ff00ff]/10 to-transparent rounded-2xl border border-[#ff00ff]/20 p-6">
                  <h3 className="text-sm text-gray-400 mb-2">Rarity Multiplier</h3>
                  <div className="text-3xl font-bold text-[#ff00ff]">{userRewards.rarityMultiplier}x</div>
                  <div className="text-xs text-gray-500 mt-1">Based on rarity</div>
                </div>

                <div className="bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-6">
                  <h3 className="text-sm text-gray-400 mb-2">Stacking Multiplier</h3>
                  <div className="text-3xl font-bold text-[#3fb8bd]">{userRewards.stackingMultiplier}x</div>
                  <div className="text-xs text-gray-500 mt-1">Hold multiple NFTs</div>
                </div>
              </div>

              <button className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] text-black font-bold hover:scale-105 transition font-fredoka">
                Claim Rewards
              </button>
            </div>
          ) : (
            <div className="mb-16 bg-gradient-to-br from-gray-900 to-transparent rounded-2xl border border-gray-800 p-12 text-center">
              <p className="text-xl text-gray-400 mb-6">Connect your wallet to view your rewards</p>
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] text-black font-bold hover:scale-105 transition font-fredoka">
                Connect Wallet
              </button>
            </div>
          )}

          {/* How Rewards Work */}
          <div className="mb-16">
            <h2 className="font-fredoka mb-8 text-3xl font-bold text-white text-center">How Rewards Work</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Daily Rewards */}
              <div className="bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-8">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-fredoka text-xl font-bold text-[#3fb8bd] mb-3">Daily Token Rewards</h3>
                <p className="text-gray-300">
                  All KEKTECH NFT holders receive daily token emissions automatically. The base rate applies to all holders, making passive income accessible to everyone.
                </p>
              </div>

              {/* Rarity Multiplier */}
              <div className="bg-gradient-to-br from-[#4ecca7]/10 to-transparent rounded-2xl border border-[#4ecca7]/20 p-8">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="font-fredoka text-xl font-bold text-[#4ecca7] mb-3">Rarity Multiplier</h3>
                <p className="text-gray-300">
                  Rarer NFTs earn higher multipliers! Mythic and Legendary NFTs receive significantly higher token rewards, making rarity truly valuable.
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-400">Mythic:</span>
                    <span className="font-bold">5.0x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-400">Legendary:</span>
                    <span className="font-bold">3.0x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-400">Epic:</span>
                    <span className="font-bold">2.0x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-400">Rare:</span>
                    <span className="font-bold">1.5x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-400">Common:</span>
                    <span className="font-bold">1.0x</span>
                  </div>
                </div>
              </div>

              {/* Stacking Multiplier */}
              <div className="bg-gradient-to-br from-[#ff00ff]/10 to-transparent rounded-2xl border border-[#ff00ff]/20 p-8">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="font-fredoka text-xl font-bold text-[#ff00ff] mb-3">Stacking Multiplier</h3>
                <p className="text-gray-300">
                  Hold multiple KEKTECH NFTs to unlock stacking bonuses! The more NFTs you hold, the higher your multiplier gets.
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>1 NFT:</span>
                    <span className="font-bold">1.0x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2-5 NFTs:</span>
                    <span className="font-bold">1.2x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>6-10 NFTs:</span>
                    <span className="font-bold">1.5x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>11+ NFTs:</span>
                    <span className="font-bold">2.0x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Token Economy */}
          <div className="mb-16">
            <h2 className="font-fredoka mb-8 text-3xl font-bold text-white text-center">Token Economy</h2>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-900 to-transparent rounded-2xl border border-gray-800 p-8 space-y-6">
                <div>
                  <h3 className="font-fredoka text-xl font-bold text-[#3fb8bd] mb-3">What Are KEKTECH Tokens?</h3>
                  <p className="text-gray-300">
                    KEKTECH tokens power the ecosystem and enable future upgrades. Tokens will be used for NFT customization, trait upgrades, and participation in special events.
                  </p>
                </div>

                <div>
                  <h3 className="font-fredoka text-xl font-bold text-[#4ecca7] mb-3">Token Airdrop</h3>
                  <p className="text-gray-300">
                    Early supporters and existing holders will receive a token airdrop with multipliers based on holding duration and NFT rarity. Snapshots are taken periodically to reward loyal community members.
                  </p>
                </div>

                <div>
                  <h3 className="font-fredoka text-xl font-bold text-[#ff00ff] mb-3">Future Utility</h3>
                  <p className="text-gray-300">
                    Tokens will unlock NFT upgrade paths, allow trait customization, and grant access to exclusive features. The gamified upgrade system lets you shape your unique Pepe PFP using earned rewards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="font-fredoka mb-6 text-3xl font-bold text-white">Start Earning Today</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              The more KEKTECH NFTs you hold, and the rarer they are, the more rewards you&apos;ll earn every day. Join our community and start building your token portfolio!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/mint"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] text-black font-bold hover:scale-105 transition font-fredoka text-lg"
              >
                Mint KEKTECH NFTs
              </a>
              <a
                href="/gallery"
                className="px-8 py-4 rounded-xl border-2 border-[#3fb8bd] text-[#3fb8bd] font-bold hover:bg-[#3fb8bd]/10 transition font-fredoka text-lg"
              >
                Browse Gallery
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}