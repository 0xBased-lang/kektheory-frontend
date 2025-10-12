'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MintTab } from '@/components/marketplace/MintTab'
import { TradeTab } from '@/components/marketplace/TradeTab'

/**
 * Marketplace Page
 *
 * Unified marketplace with two tabs:
 * - Mint: NFT minting interface
 * - Trade: KEKTV trading marketplace
 */
export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<'mint' | 'trade'>('mint')

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="font-fredoka mb-4 text-4xl font-bold text-[#3fb8bd] sm:text-5xl">
              𝕂Ǝ𝕂丅ᵉ匚🅷 Marketplace
            </h1>
            <p className="font-fredoka text-lg text-gray-300">
              Mint new NFTs or trade KEKTV vouchers
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-xl bg-gray-900/60 p-1 border border-gray-800">
              <button
                onClick={() => setActiveTab('mint')}
                className={`px-8 py-3 rounded-lg font-fredoka font-bold transition-all ${
                  activeTab === 'mint'
                    ? 'bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Mint
              </button>
              <button
                onClick={() => setActiveTab('trade')}
                className={`px-8 py-3 rounded-lg font-fredoka font-bold transition-all ${
                  activeTab === 'trade'
                    ? 'bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Trade
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'mint' && <MintTab />}
            {activeTab === 'trade' && <TradeTab />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
