'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getUserNFTHoldings, getKEKTVListings, getKEKTVMarketplaceStats, type NFTListing } from '@/lib/blockchain/kektv'

/**
 * Dashboard-style Homepage
 * Clean, modern design inspired by professional DeFi dashboards
 */
export default function DashboardHomepage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  const [nftHoldings, setNftHoldings] = useState({
    kektech: 0,
    kektv: 0
  })
  const [kektvListings, setKektvListings] = useState<NFTListing[]>([])
  const [marketplaceStats, setMarketplaceStats] = useState({
    totalListed: 0,
    floorPrice: 0,
    holders: 0,
    volume24h: 0
  })

  // Fetch blockchain data and check wallet connection
  useEffect(() => {
    const initializeData = async () => {
      // Check wallet connection
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[]
          if (accounts.length > 0) {
            setWalletConnected(true)
            setUserAddress(accounts[0])

            // Fetch real NFT holdings from blockchain
            const holdings = await getUserNFTHoldings(accounts[0])
            setNftHoldings(holdings)
          }
        } catch (error) {
          console.error('Wallet check error:', error)
        }
      }

      // Fetch KEKTV marketplace data
      try {
        const [listings, stats] = await Promise.all([
          getKEKTVListings(),
          getKEKTVMarketplaceStats()
        ])
        setKektvListings(listings)
        setMarketplaceStats(stats)
      } catch (error) {
        console.error('Error fetching marketplace data:', error)
      }
    }

    initializeData()
  }, [])

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[]
        setWalletConnected(true)
        setUserAddress(accounts[0])

        // Fetch real NFT holdings from blockchain
        const holdings = await getUserNFTHoldings(accounts[0])
        setNftHoldings(holdings)
      } catch (error) {
        console.error('Wallet connection error:', error)
      }
    }
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Clean Header with Wallet Connection */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#3fb8bd]/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Image
                src="/images/kektech.gif"
                alt="KEKTECH"
                width={120}
                height={60}
                className="h-12 w-auto"
                unoptimized
                priority
              />

              {/* Navigation */}
              <nav className="hidden md:flex gap-6">
                <Link href="#dashboard" className="text-gray-300 hover:text-[#3fb8bd] transition">
                  Dashboard
                </Link>
                <Link href="#marketplace" className="text-gray-300 hover:text-[#3fb8bd] transition">
                  Marketplace
                </Link>
                <Link href="/gallery" className="text-gray-300 hover:text-[#3fb8bd] transition">
                  Gallery
                </Link>
                <Link href="/mint" className="text-gray-300 hover:text-[#3fb8bd] transition">
                  Mint
                </Link>
              </nav>
            </div>

            {/* Wallet Connection */}
            <div className="flex items-center gap-4">
              {walletConnected ? (
                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    <span className="text-gray-400">Connected:</span>
                    <span className="ml-2 text-[#3fb8bd] font-mono">
                      {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
                    </span>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] text-black font-bold hover:scale-105 transition"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Clean and Minimal */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Welcome to <span className="text-[#3fb8bd]">𝕂Ǝ𝕂丅ᵉ匚🅷</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              The premier NFT ecosystem on BASED Chain. Collect, trade, and showcase unique digital artifacts.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-6">
                <div className="text-3xl font-bold text-[#3fb8bd]">4,200</div>
                <div className="text-gray-400">Total Supply</div>
              </div>
              <div className="bg-gradient-to-br from-[#4ecca7]/10 to-transparent rounded-2xl border border-[#4ecca7]/20 p-6">
                <div className="text-3xl font-bold text-[#4ecca7]">32323</div>
                <div className="text-gray-400">BASED Chain</div>
              </div>
              <div className="bg-gradient-to-br from-[#ff00ff]/10 to-transparent rounded-2xl border border-[#ff00ff]/20 p-6">
                <div className="text-3xl font-bold text-[#ff00ff]">2</div>
                <div className="text-gray-400">Collections</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/mint"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] text-black font-bold hover:scale-105 transition"
              >
                Start Minting
              </Link>
              <Link
                href="#marketplace"
                className="px-8 py-4 rounded-xl border-2 border-[#3fb8bd] text-[#3fb8bd] font-bold hover:bg-[#3fb8bd]/10 transition"
              >
                Browse Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8">Your Dashboard</h2>

          {walletConnected ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* NFT Holdings Card */}
              <div className="bg-gradient-to-br from-[#3fb8bd]/5 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-6">
                <h3 className="text-xl font-bold text-[#3fb8bd] mb-4">Your NFT Holdings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">KEKTECH NFTs</span>
                    <span className="text-2xl font-bold text-white">{nftHoldings.kektech}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">KEKTV Vouchers</span>
                    <span className="text-2xl font-bold text-white">{nftHoldings.kektv}</span>
                  </div>
                  <Link
                    href="/gallery"
                    className="block mt-4 text-center py-2 rounded-lg bg-[#3fb8bd]/20 text-[#3fb8bd] hover:bg-[#3fb8bd]/30 transition"
                  >
                    View Collection
                  </Link>
                </div>
              </div>

              {/* Rewards Card */}
              <div className="bg-gradient-to-br from-[#4ecca7]/5 to-transparent rounded-2xl border border-[#4ecca7]/20 p-6">
                <h3 className="text-xl font-bold text-[#4ecca7] mb-4">Rewards & Airdrops</h3>
                <div className="space-y-4">
                  <div className="text-gray-300">
                    Hold KEKTECH NFTs to earn KEKTV vouchers and exclusive rewards
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {nftHoldings.kektv} <span className="text-sm text-gray-400">KEKTV earned</span>
                  </div>
                  <button className="w-full py-2 rounded-lg bg-[#4ecca7]/20 text-[#4ecca7] hover:bg-[#4ecca7]/30 transition">
                    Claim Rewards
                  </button>
                </div>
              </div>

              {/* Activity Card */}
              <div className="bg-gradient-to-br from-[#ff00ff]/5 to-transparent rounded-2xl border border-[#ff00ff]/20 p-6">
                <h3 className="text-xl font-bold text-[#ff00ff] mb-4">Recent Activity</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Minted KEKTECH #1337</span>
                    <span>2h ago</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Received KEKTV Airdrop</span>
                    <span>1d ago</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Listed KEKTV #42</span>
                    <span>3d ago</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-900 to-transparent rounded-2xl border border-gray-800 p-12 text-center">
              <p className="text-xl text-gray-400 mb-6">Connect your wallet to view your dashboard</p>
              <button
                onClick={connectWallet}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] text-black font-bold hover:scale-105 transition"
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </section>

      {/* KEKTV Marketplace Section */}
      <section id="marketplace" className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">KEKTV Marketplace</h2>
            <p className="text-gray-400">
              Trade KEKTV vouchers - exclusive rewards for KEKTECH holders
            </p>
          </div>

          {/* Marketplace Stats - Dynamic from Blockchain */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-gray-900/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[#3fb8bd]">{marketplaceStats.totalListed}</div>
              <div className="text-sm text-gray-400">Total Listed</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[#4ecca7]">{marketplaceStats.floorPrice} BASED</div>
              <div className="text-sm text-gray-400">Floor Price</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[#ff00ff]">{marketplaceStats.holders}</div>
              <div className="text-sm text-gray-400">Holders</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{marketplaceStats.volume24h} BASED</div>
              <div className="text-sm text-gray-400">24h Volume</div>
            </div>
          </div>

          {/* Listings Grid - Dynamic from Blockchain */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {kektvListings.map((listing) => (
              <div
                key={listing.tokenId}
                className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-[#3fb8bd]/50 transition group"
              >
                <div className="aspect-square bg-gradient-to-br from-[#3fb8bd]/20 to-[#4ecca7]/20 p-4">
                  <div className="w-full h-full bg-black/50 rounded-lg flex items-center justify-center">
                    <span className="text-4xl">🎫</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-white mb-2">{listing.name}</h4>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-400">Price</span>
                    <span className="font-bold text-[#3fb8bd]">{listing.price}</span>
                  </div>
                  <button className="w-full py-2 rounded-lg bg-[#3fb8bd]/20 text-[#3fb8bd] hover:bg-[#3fb8bd]/30 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}

            {/* Add More Listing Button */}
            <div className="bg-gray-900/30 rounded-xl border-2 border-dashed border-gray-700 flex items-center justify-center min-h-[300px] hover:border-[#3fb8bd]/50 transition cursor-pointer group">
              <div className="text-center">
                <div className="text-5xl mb-4 text-gray-600 group-hover:text-[#3fb8bd] transition">+</div>
                <p className="text-gray-500 group-hover:text-gray-400">List Your KEKTV</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>© 2024 KEKTECH. All rights reserved. Built on BASED Chain (32323)</p>
            <div className="mt-4 flex justify-center gap-6">
              <Link href="#" className="hover:text-[#3fb8bd] transition">Twitter</Link>
              <Link href="#" className="hover:text-[#3fb8bd] transition">Discord</Link>
              <Link href="#" className="hover:text-[#3fb8bd] transition">Telegram</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}