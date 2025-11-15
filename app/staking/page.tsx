import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BlurredTitleSection } from '@/components/ui/BlurredTitleSection'
import { Lock, Coins, TrendingUp, Clock, AlertCircle } from 'lucide-react'

/**
 * Staking Page
 *
 * NFT staking interface (coming soon)
 * Placeholder page with information about upcoming staking features
 */
export default function StakingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black to-gray-950">
        {/* Page Header */}
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <BlurredTitleSection
            title="NFT Staking"
            subtitle="Stake your KEKTECH NFTs to earn enhanced rewards"
          />
        </div>

        {/* Coming Soon Banner */}
        <section className="py-12 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-yellow-500/10 to-transparent rounded-2xl border-2 border-yellow-500/30 p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Lock className="w-10 h-10 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold text-yellow-400 mb-4 font-fredoka">
                  Coming Soon
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  NFT staking functionality is currently in development. Stay tuned for the official launch!
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-bold">Launching in Phase 2</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Preview */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-12 font-fredoka">
              What's Coming
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-6">
                <div className="w-12 h-12 rounded-lg bg-[#3fb8bd]/20 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-[#3fb8bd]" />
                </div>
                <h3 className="text-xl font-bold text-[#3fb8bd] mb-3 font-fredoka">Stake NFTs</h3>
                <p className="text-gray-400 text-sm">
                  Lock your KEKTECH NFTs in staking contracts to earn passive rewards
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-[#4ecca7]/10 to-transparent rounded-2xl border border-[#4ecca7]/20 p-6">
                <div className="w-12 h-12 rounded-lg bg-[#4ecca7]/20 flex items-center justify-center mb-4">
                  <Coins className="w-6 h-6 text-[#4ecca7]" />
                </div>
                <h3 className="text-xl font-bold text-[#4ecca7] mb-3 font-fredoka">Enhanced Rewards</h3>
                <p className="text-gray-400 text-sm">
                  Earn boosted TECH token rewards based on rarity and lock duration
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gradient-to-br from-[#daa520]/10 to-transparent rounded-2xl border border-[#daa520]/20 p-6">
                <div className="w-12 h-12 rounded-lg bg-[#daa520]/20 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-[#daa520]" />
                </div>
                <h3 className="text-xl font-bold text-[#daa520] mb-3 font-fredoka">Multipliers</h3>
                <p className="text-gray-400 text-sm">
                  Stake multiple NFTs to unlock stacking multipliers and higher APY
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gradient-to-br from-[#ff00ff]/10 to-transparent rounded-2xl border border-[#ff00ff]/20 p-6">
                <div className="w-12 h-12 rounded-lg bg-[#ff00ff]/20 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-[#ff00ff]" />
                </div>
                <h3 className="text-xl font-bold text-[#ff00ff] mb-3 font-fredoka">Flexible Periods</h3>
                <p className="text-gray-400 text-sm">
                  Choose your lock duration: short-term flexibility or long-term gains
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Will Work */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-20 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-12 font-fredoka">
              How It Will Work
            </h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-[#3fb8bd] flex items-center justify-center flex-shrink-0 font-bold text-black text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#3fb8bd] mb-2 font-fredoka">Select Your NFTs</h3>
                  <p className="text-gray-300">
                    Choose which KEKTECH NFTs you want to stake. Rarer NFTs will earn higher rewards.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-[#4ecca7] flex items-center justify-center flex-shrink-0 font-bold text-black text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#4ecca7] mb-2 font-fredoka">Choose Lock Period</h3>
                  <p className="text-gray-300">
                    Select your staking duration. Longer locks earn higher APY but your NFTs will be locked for that period.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-[#daa520] flex items-center justify-center flex-shrink-0 font-bold text-black text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#daa520] mb-2 font-fredoka">Earn Rewards</h3>
                  <p className="text-gray-300">
                    Your TECH token rewards accumulate automatically. Claim them anytime or let them compound.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-[#ff00ff] flex items-center justify-center flex-shrink-0 font-bold text-black text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#ff00ff] mb-2 font-fredoka">Unstake Anytime</h3>
                  <p className="text-gray-300">
                    After the lock period ends, unstake your NFTs and claim all pending rewards. No penalties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stay Updated */}
        <section className="py-20 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6 font-fredoka">
                Stay Updated
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Follow our social channels for staking launch announcements and updates
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://twitter.com/kektech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#3fb8bd] hover:bg-[#4ecca7] text-black font-bold rounded-xl transition-colors"
                >
                  Follow on Twitter
                </a>
                <a
                  href="https://t.me/kektech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-[#3fb8bd] hover:border-[#4ecca7] text-[#3fb8bd] hover:text-[#4ecca7] font-bold rounded-xl transition-colors"
                >
                  Join Telegram
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
