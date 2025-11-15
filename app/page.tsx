import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FeaturedNFTs } from '@/components/sections/FeaturedNFTs'
import { TrendingUp, Rocket, Sparkles, Trophy } from 'lucide-react'

/**
 * KEKTECH Landing Page
 *
 * Simplified homepage highlighting two main sections:
 * 1. Feels Good Market (prediction markets)
 * 2. KEKTECH NFTs (collection)
 */
export default function Homepage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black to-gray-950">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto text-center">
              {/* Hero GIF */}
              <div className="mb-8 flex justify-center">
                <Image
                  src="/images/tech.gif"
                  alt="𝕂Ǝ𝕂丅ᵉ匚🅷 Collection"
                  width={700}
                  height={450}
                  className="max-w-full h-auto rounded-lg"
                  unoptimized
                  priority
                />
              </div>

              {/* Hero Text */}
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-fredoka">
                Welcome to <span className="text-[#3fb8bd]">𝕂Ǝ𝕂丅ᵉ匚🅷</span>
              </h1>
              <p className="font-fredoka text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                Your gateway to <span className="font-bold text-[#3fb8bd]">prediction markets</span> and{' '}
                <span className="font-bold text-[#4ecca7]">hand-drawn Pepe NFTs</span> on the BasedAI Network
              </p>
            </div>
          </div>
        </section>

        {/* Two Main Sections */}
        <section className="py-16 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {/* Feels Good Market */}
              <Link href="/market" className="group">
                <div className="relative h-full bg-gradient-to-br from-[#3fb8bd]/20 to-transparent rounded-3xl border-2 border-[#3fb8bd]/30 p-8 overflow-hidden transition-all duration-300 hover:border-[#3fb8bd] hover:shadow-2xl hover:shadow-[#3fb8bd]/20 hover:scale-[1.02]">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(63,184,189,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(63,184,189,0.05)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />

                  <div className="relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3fb8bd]/20 border border-[#3fb8bd]/30 rounded-full mb-6">
                      <Sparkles className="w-4 h-4 text-[#3fb8bd]" />
                      <span className="text-sm font-bold text-[#3fb8bd]">Coming Soon</span>
                    </div>

                    {/* Icon */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3fb8bd] to-[#4ecca7] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-10 h-10 text-black" />
                    </div>

                    {/* Content */}
                    <h2 className="text-4xl font-bold text-[#3fb8bd] mb-4 font-fredoka">
                      Feels Good Market
                    </h2>
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                      Trade prediction markets in a pump.fun style terminal. Buy low, watch trends, and graduate winners.
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-2 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3fb8bd]" />
                        <span>Terminal-style trading interface</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3fb8bd]" />
                        <span>Pipeline view: New → Graduating → Graduated</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3fb8bd]" />
                        <span>Live activity feeds & market stats</span>
                      </li>
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-[#3fb8bd] font-bold group-hover:gap-4 transition-all">
                      <span>Explore Markets</span>
                      <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* KEKTECH NFTs */}
              <Link href="/nfts" className="group">
                <div className="relative h-full bg-gradient-to-br from-[#4ecca7]/20 to-transparent rounded-3xl border-2 border-[#4ecca7]/30 p-8 overflow-hidden transition-all duration-300 hover:border-[#4ecca7] hover:shadow-2xl hover:shadow-[#4ecca7]/20 hover:scale-[1.02]">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(78,204,167,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(78,204,167,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

                  <div className="relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4ecca7]/20 border border-[#4ecca7]/30 rounded-full mb-6">
                      <Trophy className="w-4 h-4 text-[#4ecca7]" />
                      <span className="text-sm font-bold text-[#4ecca7]">Live Now</span>
                    </div>

                    {/* Icon */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4ecca7] to-[#3fb8bd] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="text-4xl">🐸</span>
                    </div>

                    {/* Content */}
                    <h2 className="text-4xl font-bold text-[#4ecca7] mb-4 font-fredoka">
                      KEKTECH NFTs
                    </h2>
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                      4,200 hand-drawn Pepe artifacts on BasedAI. Mint, trade, and earn rewards with your collection.
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-2 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4ecca7]" />
                        <span>100% hand-drawn by BenzoBert & Princess Bubblegum</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4ecca7]" />
                        <span>Rarity-based rewards with TECH token</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4ecca7]" />
                        <span>Staking & upgrading system (coming soon)</span>
                      </li>
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-[#4ecca7] font-bold group-hover:gap-4 transition-all">
                      <span>View Collection</span>
                      <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured NFTs Section */}
        <FeaturedNFTs />

        {/* Stats Section */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-20 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-12 font-fredoka">
              By the Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#3fb8bd] mb-2 font-fredoka">4,200</div>
                <div className="text-gray-400 font-medium">Unique NFTs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#4ecca7] mb-2 font-fredoka">100%</div>
                <div className="text-gray-400 font-medium">Hand-Drawn</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#daa520] mb-2 font-fredoka">18.369</div>
                <div className="text-gray-400 font-medium">$BASED/NFT</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#ff00ff] mb-2 font-fredoka">∞</div>
                <div className="text-gray-400 font-medium">Possibilities</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-fredoka">
                Ready to Join the <span className="text-[#3fb8bd]">PEPENING</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Explore markets, mint NFTs, and become part of the 𝕂Ǝ𝕂TECH community
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/market"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] p-[2px] shadow-lg shadow-[#3fb8bd]/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#3fb8bd]/70"
                >
                  <div className="relative rounded-[10px] bg-gray-900 px-8 py-4 transition-all group-hover:bg-transparent">
                    <span className="text-lg font-bold text-[#3fb8bd] group-hover:text-black font-fredoka">
                      Explore Markets
                    </span>
                  </div>
                </Link>
                <Link
                  href="/nfts/mint"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#4ecca7] to-[#3fb8bd] p-[2px] shadow-lg shadow-[#4ecca7]/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#4ecca7]/70"
                >
                  <div className="relative rounded-[10px] bg-gray-900 px-8 py-4 transition-all group-hover:bg-transparent">
                    <span className="text-lg font-bold text-[#4ecca7] group-hover:text-black font-fredoka">
                      Mint NFTs
                    </span>
                  </div>
                </Link>
                <Link
                  href="/about"
                  className="group px-8 py-4 rounded-xl border-2 border-gray-700 hover:border-[#3fb8bd] transition-all"
                >
                  <span className="text-lg font-bold text-gray-300 group-hover:text-[#3fb8bd] font-fredoka transition-colors">
                    Learn More
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
