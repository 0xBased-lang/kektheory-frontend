import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BlurredTitleSection } from '@/components/ui/BlurredTitleSection'
import { CollectionStatsWidget } from '@/components/CollectionStatsWidget'
import { FeaturedNFTs } from '@/components/sections/FeaturedNFTs'
import { Sparkles, Image as ImageIcon, Trophy, Palette, Coins, Lock } from 'lucide-react'

/**
 * NFT Hub Page
 *
 * Main landing page for KEKTECH NFT collection
 * Links to mint, gallery, rankings, and other NFT features
 */
export default function NFTsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black to-gray-950">
        {/* Page Header */}
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <BlurredTitleSection
            title="𝕂Ǝ𝕂丅ᵉ匚🅷 NFT Collection"
            subtitle="4,200 hand-drawn Pepe artifacts on the BasedAI Network"
          />
        </div>

        {/* Collection Stats */}
        <section className="py-8 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <CollectionStatsWidget />
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-12 font-fredoka">
              Explore the Collection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Mint NFTs */}
              <Link href="/nfts/mint" className="group">
                <div className="h-full bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border-2 border-[#3fb8bd]/20 p-8 transition-all duration-300 hover:border-[#3fb8bd] hover:shadow-xl hover:shadow-[#3fb8bd]/20 hover:scale-105">
                  <div className="w-16 h-16 rounded-xl bg-[#3fb8bd]/20 flex items-center justify-center mb-6 group-hover:bg-[#3fb8bd]/30 transition-colors">
                    <Sparkles className="w-8 h-8 text-[#3fb8bd]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#3fb8bd] mb-3 font-fredoka">Mint NFTs</h3>
                  <p className="text-gray-400 mb-4">
                    Mint your own unique KEKTECH artifact for 18.369 $BASED
                  </p>
                  <div className="text-[#3fb8bd] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    <span>Start Minting</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>

              {/* Browse Gallery */}
              <Link href="/nfts/gallery" className="group">
                <div className="h-full bg-gradient-to-br from-[#4ecca7]/10 to-transparent rounded-2xl border-2 border-[#4ecca7]/20 p-8 transition-all duration-300 hover:border-[#4ecca7] hover:shadow-xl hover:shadow-[#4ecca7]/20 hover:scale-105">
                  <div className="w-16 h-16 rounded-xl bg-[#4ecca7]/20 flex items-center justify-center mb-6 group-hover:bg-[#4ecca7]/30 transition-colors">
                    <ImageIcon className="w-8 h-8 text-[#4ecca7]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#4ecca7] mb-3 font-fredoka">Gallery</h3>
                  <p className="text-gray-400 mb-4">
                    Browse the full collection with advanced filtering and search
                  </p>
                  <div className="text-[#4ecca7] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    <span>View Gallery</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>

              {/* Rankings */}
              <Link href="/nfts/rankings" className="group">
                <div className="h-full bg-gradient-to-br from-[#daa520]/10 to-transparent rounded-2xl border-2 border-[#daa520]/20 p-8 transition-all duration-300 hover:border-[#daa520] hover:shadow-xl hover:shadow-[#daa520]/20 hover:scale-105">
                  <div className="w-16 h-16 rounded-xl bg-[#daa520]/20 flex items-center justify-center mb-6 group-hover:bg-[#daa520]/30 transition-colors">
                    <Trophy className="w-8 h-8 text-[#daa520]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#daa520] mb-3 font-fredoka">Rankings</h3>
                  <p className="text-gray-400 mb-4">
                    See rarity rankings and discover the rarest artifacts
                  </p>
                  <div className="text-[#daa520] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    <span>View Rankings</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>

              {/* Traits Explorer */}
              <Link href="/nfts/traits" className="group">
                <div className="h-full bg-gradient-to-br from-[#ff00ff]/10 to-transparent rounded-2xl border-2 border-[#ff00ff]/20 p-8 transition-all duration-300 hover:border-[#ff00ff] hover:shadow-xl hover:shadow-[#ff00ff]/20 hover:scale-105">
                  <div className="w-16 h-16 rounded-xl bg-[#ff00ff]/20 flex items-center justify-center mb-6 group-hover:bg-[#ff00ff]/30 transition-colors">
                    <Palette className="w-8 h-8 text-[#ff00ff]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#ff00ff] mb-3 font-fredoka">Traits</h3>
                  <p className="text-gray-400 mb-4">
                    Explore trait distribution and find NFTs by specific traits
                  </p>
                  <div className="text-[#ff00ff] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    <span>Explore Traits</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>

              {/* Rewards */}
              <Link href="/rewards" className="group">
                <div className="h-full bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border-2 border-[#3fb8bd]/20 p-8 transition-all duration-300 hover:border-[#3fb8bd] hover:shadow-xl hover:shadow-[#3fb8bd]/20 hover:scale-105">
                  <div className="w-16 h-16 rounded-xl bg-[#3fb8bd]/20 flex items-center justify-center mb-6 group-hover:bg-[#3fb8bd]/30 transition-colors">
                    <Coins className="w-8 h-8 text-[#3fb8bd]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#3fb8bd] mb-3 font-fredoka">Rewards</h3>
                  <p className="text-gray-400 mb-4">
                    Learn about TECH token rewards and holder benefits
                  </p>
                  <div className="text-[#3fb8bd] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    <span>View Rewards</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>

              {/* Staking (Coming Soon) */}
              <Link href="/staking" className="group">
                <div className="h-full bg-gradient-to-br from-[#4ecca7]/10 to-transparent rounded-2xl border-2 border-[#4ecca7]/20 p-8 transition-all duration-300 hover:border-[#4ecca7] hover:shadow-xl hover:shadow-[#4ecca7]/20 hover:scale-105 relative overflow-hidden">
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs font-bold text-yellow-400">
                    Coming Soon
                  </div>

                  <div className="w-16 h-16 rounded-xl bg-[#4ecca7]/20 flex items-center justify-center mb-6 group-hover:bg-[#4ecca7]/30 transition-colors">
                    <Lock className="w-8 h-8 text-[#4ecca7]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#4ecca7] mb-3 font-fredoka">Staking</h3>
                  <p className="text-gray-400 mb-4">
                    Stake your NFTs to earn enhanced rewards (launching soon)
                  </p>
                  <div className="text-[#4ecca7] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured NFTs */}
        <section className="border-t border-gray-800">
          <FeaturedNFTs />
        </section>

        {/* Collection Info */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-20 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-[#3fb8bd] text-center mb-12 font-fredoka">
                About the Collection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-8">
                  <h3 className="text-xl font-bold text-[#3fb8bd] mb-4 font-fredoka">Artistic Excellence</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Every KEKTECH NFT is hand-drawn by our talented artists BenzoBert and Princess Bubblegum. No AI, no templates—just pure artistic creativity.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#4ecca7]/10 to-transparent rounded-2xl border border-[#4ecca7]/20 p-8">
                  <h3 className="text-xl font-bold text-[#4ecca7] mb-4 font-fredoka">Rarity System</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Each NFT has unique traits with varying rarity levels. Rarer artifacts earn higher TECH token rewards and unlock exclusive benefits.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#daa520]/10 to-transparent rounded-2xl border border-[#daa520]/20 p-8">
                  <h3 className="text-xl font-bold text-[#daa520] mb-4 font-fredoka">Community Driven</h3>
                  <p className="text-gray-300 leading-relaxed">
                    KEKTECH is built by the community, for the community. Holder feedback shapes our roadmap and future developments.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#ff00ff]/10 to-transparent rounded-2xl border border-[#ff00ff]/20 p-8">
                  <h3 className="text-xl font-bold text-[#ff00ff] mb-4 font-fredoka">Future Utility</h3>
                  <p className="text-gray-300 leading-relaxed">
                    NFT holders will gain access to staking, upgrading systems, limited edition mints, and exclusive community perks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6 font-fredoka">
                Start Your Collection Today
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Join the KEKTECH community and own a piece of hand-drawn Pepe art
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/nfts/mint"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] p-[2px] shadow-lg shadow-[#3fb8bd]/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#3fb8bd]/70"
                >
                  <div className="relative rounded-[10px] bg-gray-900 px-8 py-4 transition-all group-hover:bg-transparent">
                    <span className="text-lg font-bold text-[#3fb8bd] group-hover:text-black font-fredoka">
                      Mint Now
                    </span>
                  </div>
                </Link>
                <Link
                  href="/nfts/gallery"
                  className="group px-8 py-4 rounded-xl border-2 border-[#4ecca7]/30 hover:border-[#4ecca7] transition-all"
                >
                  <span className="text-lg font-bold text-[#4ecca7] group-hover:text-white font-fredoka transition-colors">
                    Browse Gallery
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
