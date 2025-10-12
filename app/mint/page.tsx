import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EnhancedMintForm } from '@/components/web3/mint/EnhancedMintForm'
import { TierWidget } from '@/components/TierWidget'
import Image from 'next/image'

/**
 * Mint Page
 *
 * NFT minting interface with transaction handling
 */
export default function MintPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-bold text-white font-fredoka">
              Mint KEKTECH NFTs
            </h1>
            <p className="text-xl text-gray-400">
              Join the KEKTECH community on the $BASED Chain 🐸🚀
            </p>
          </div>

          {/* Main Mint Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Left Column - Tier Widget */}
            <div className="lg:col-span-1">
              <TierWidget />
            </div>

            {/* Center/Right Column - Mint Form with NFT Preview */}
            <div className="lg:col-span-2 space-y-8">
              {/* NFT Preview Placeholder */}
              <div className="bg-gradient-to-br from-gray-900/50 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-8">
                <div className="max-w-md mx-auto">
                  <div className="aspect-square rounded-xl overflow-hidden border-2 border-[#3fb8bd] mb-4 relative">
                    <Image
                      src="/images/kektech.gif"
                      alt="KEKTECH NFT Preview"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-6">
                      <div className="text-center">
                        <p className="text-[#3fb8bd] font-bold text-xl font-fredoka">Your NFT Preview</p>
                        <p className="text-gray-300 text-sm">Mint to reveal your unique KEKTECH artifact</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Mint Form with Animations */}
              <EnhancedMintForm />

              {/* Additional Info */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-[#4ecca7]/30 bg-gray-900/50 p-4 text-center">
                  <div className="mb-2 text-2xl font-bold text-[#4ecca7]">
                    4,200
                  </div>
                  <div className="text-sm text-gray-400">Total Supply</div>
                </div>
                <div className="rounded-lg border border-[#3fb8bd]/30 bg-gray-900/50 p-4 text-center">
                  <div className="mb-2 text-2xl font-bold text-[#3fb8bd]">
                    18.369 $BASED
                  </div>
                  <div className="text-sm text-gray-400">Mint Price</div>
                </div>
                <div className="rounded-lg border border-[#ff00ff]/30 bg-gray-900/50 p-4 text-center">
                  <div className="mb-2 text-2xl font-bold text-[#ff00ff]">50</div>
                  <div className="text-sm text-gray-400">
                    Max Per Transaction
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-white font-fredoka">
                  What You Get
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2">✅</span>
                    <span>Unique hand-drawn NFT with provably rare traits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✅</span>
                    <span>On-chain metadata and tier ranking system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✅</span>
                    <span>Daily KEKTV token rewards based on rarity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✅</span>
                    <span>Access to exclusive KEKTECH community</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✅</span>
                    <span>Fast and secure minting on $BASED Chain</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
