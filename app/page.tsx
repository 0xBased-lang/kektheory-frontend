'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getUserNFTHoldings, getKEKTVListings, getKEKTVMarketplaceStats, type NFTListing } from '@/lib/blockchain/kektv'

/**
 * Dashboard-style Homepage
 * Clean, modern design inspired by professional DeFi dashboards
 */
export default function DashboardHomepage() {
  const [walletConnected, setWalletConnected] = useState(false)
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

        // Fetch real NFT holdings from blockchain
        const holdings = await getUserNFTHoldings(accounts[0])
        setNftHoldings(holdings)
      } catch (error) {
        console.error('Wallet connection error:', error)
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black to-gray-950">
        {/* Hero Section - With tech.gif */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
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
            <p className="font-fredoka text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              <span className="font-bold text-[#3fb8bd]">4200 𝕂Ǝ𝕂丅ᵉ匚🅷 Artifacts</span>
              : digital masterpieces blending tech and meme fun, hand-drawn by{' '}
              <span className="font-bold text-[#4ecca7]">𝔹enzo𝔹ert & Princess 𝔹u𝔹𝔹legum</span>
              . An homage to{' '}
              <span className="font-bold text-[#3fb8bd]">OG Pepecoin 🐸👑</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/mint"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] text-black font-bold hover:scale-105 transition font-fredoka text-lg"
              >
                Start Minting
              </Link>
              <Link
                href="#marketplace"
                className="px-8 py-4 rounded-xl border-2 border-[#3fb8bd] text-[#3fb8bd] font-bold hover:bg-[#3fb8bd]/10 transition font-fredoka text-lg"
              >
                Start Trading
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

      {/* About Us Section */}
      <section id="about" className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-12 font-fredoka">About Us</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                𝕂Ǝ𝕂TECH emerges from the intersection of art and blockchain technology, born from our appreciation for the PepeCoin legacy dating back to 2016. Our dedicated team initially envisioned a modest NFT collection but found ourselves captivated by the energy of the PepeCoin 🐸 and $BASED 🧠communities.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our creative journey began in early 2024 within the thriving PepeCoin movement. Through Pepepaint, our team discovered a digital canvas where Pepe art could flourish in new ways. This discovery helped us grow as artists and develop a clear vision for our project.
              </p>
              <p className="text-gray-300 leading-relaxed">
                What started as artistic exploration evolved into something meaningful when our early artwork received recognition from Pepelovers 🐸 and other respected figures in the Pepe community. This endorsement fueled our determination to craft more distinctive Pepe art and build something valuable for fellow enthusiasts. With each creation, we deepen our commitment to honoring the culture that brought us together. 🐸🤝
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#3fb8bd] font-fredoka">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                At 𝕂Ǝ𝕂TECH, we aim to create more than just another NFT collection. We envision a dynamic ecosystem where art, community, and technology converge to create lasting value. At our core, spreading fresh, dank Pepe art throughout the crypto space drives everything we do. We&apos;re building a platform where holders can customize their digital identities, earn rewards, and participate in the evolution of the collection itself.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our mission extends beyond digital assets—we&apos;re committed to producing high-quality Pepe art that celebrates the culture and contributes to the broader crypto art space. This is our homage to the communities that inspired us and our contribution to the ever-evolving PEPENING 🐸🚀 movement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-12 font-fredoka">ROADMAP</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {/* Phase 1 */}
            <div className="bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-8">
              <h3 className="text-2xl font-bold text-[#3fb8bd] mb-4 font-fredoka">Phase 1: Collection Launch</h3>
              <ul className="space-y-3 text-gray-300">
                <li>→ Release of our founding collection: 4,200 uniquely crafted Pepe NFTs</li>
                <li>→ Pricing set at 18.369 $BASED per NFT</li>
                <li>→ Community building, NFT give-aways</li>
                <li>→ Snapshots for token airdrop</li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="bg-gradient-to-br from-[#4ecca7]/10 to-transparent rounded-2xl border border-[#4ecca7]/20 p-8">
              <h3 className="text-2xl font-bold text-[#4ecca7] mb-4 font-fredoka">Phase 2: Reward System Implementation</h3>
              <ul className="space-y-3 text-gray-300">
                <li>→ Establishment of the token economy that will power future upgrades</li>
                <li>→ Token airdrop with multiplier for early supporters</li>
                <li>→ Rarity and stacking multiplier - hold rare and multiple NFTs to get higher token emissions!</li>
                <li>→ Introduction of daily token rewards for all NFT holders</li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="bg-gradient-to-br from-[#ff00ff]/10 to-transparent rounded-2xl border border-[#ff00ff]/20 p-8">
              <h3 className="text-2xl font-bold text-[#ff00ff] mb-4 font-fredoka">Phase 3: Limited Edition Mint</h3>
              <ul className="space-y-3 text-gray-300">
                <li>→ Limited edition free mint of 420 handpicked NFTs</li>
                <li>→ Main collection NFT holders with Easter Egg traits qualify for the 420 limited edition free mint</li>
              </ul>
            </div>

            {/* Phase 4 */}
            <div className="bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-8">
              <h3 className="text-2xl font-bold text-[#3fb8bd] mb-4 font-fredoka">Phase 4: NFT Upgrading System</h3>
              <ul className="space-y-3 text-gray-300">
                <li>→ Introduction of new handcrafted characters and attributes</li>
                <li>→ Interactive, gamified upgrade experience allowing holders to choose their path</li>
                <li>→ Use earned rewards to make meaningful choices that shape your unique Pepe PFP</li>
                <li>→ Unlock the full potential of all Easter eggs hidden throughout the collection</li>
              </ul>
            </div>
          </div>

          {/* Community Journey */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-6 font-fredoka">Community Journey</h3>
            <p className="text-gray-300 leading-relaxed">
              We&apos;re committed to engaging with our community at every step. We value your feedback and will adapt our vision to create the best experience for our holders. Above all, we&apos;re dedicated to our highest utility: spreading dank Pepe art throughout the space, bringing creative joy to the broader crypto community. 🐸🎨🔥 We strongly believe in collaborations and will pursue partnerships with other $Based NFT communities to create opportunities that strengthen the entire ecosystem.
            </p>
          </div>
        </div>
      </section>

      </main>

      <Footer />
    </div>
  )
}