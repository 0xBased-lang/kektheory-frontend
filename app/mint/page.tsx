import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EnhancedMintForm } from '@/components/web3/mint/EnhancedMintForm'
import { TierWidget } from '@/components/TierWidget'

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
          <div className="mx-auto max-w-2xl">
            {/* Page Header */}
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-4xl font-bold text-white font-fredoka">
                Mint KEKTECH NFTs
              </h1>
              <p className="text-lg text-gray-400">
                Join the KEKTECH community on the $BASED Chain 🐸🚀
              </p>
            </div>

            {/* Enhanced Mint Form with Animations */}
            <EnhancedMintForm />

            {/* Additional Info */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
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

            {/* Compact Tier Distribution */}
            <div className="mt-8">
              <TierWidget showTitle={false} compact={true} />
            </div>

            {/* Features */}
            <div className="mt-8 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
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
      </main>

      <Footer />
    </div>
  )
}
