import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BlurredTitleSection } from '@/components/ui/BlurredTitleSection'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

/**
 * Roadmap Page
 *
 * Detailed project roadmap with phases and milestones
 */
export default function RoadmapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black to-gray-950">
        {/* Page Header */}
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <BlurredTitleSection
            title="𝕂Ǝ𝕂丅ᵉ匚🅷 Roadmap"
            subtitle="Our journey from launch to full ecosystem"
          />
        </div>

        {/* Visual Roadmap Section */}
        <section className="py-12 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto mb-16">
              <div className="rounded-2xl overflow-hidden border border-[#3fb8bd]/30 shadow-2xl shadow-[#3fb8bd]/10">
                <Image
                  src="/images/kekorama.jpg"
                  alt="KEKTECH Roadmap Visual"
                  width={1400}
                  height={800}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Phases Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Phase 1 */}
              <div className="relative bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-8 overflow-hidden">
                {/* Checkered Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#3fb8bd]/20 border-2 border-[#3fb8bd] flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-[#3fb8bd]" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-[#3fb8bd] font-fredoka">Phase 1: Collection Launch</h3>
                      <p className="text-[#4ecca7] font-medium">Status: Completed ✓</p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-gray-300 ml-16">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#4ecca7] mt-0.5 flex-shrink-0" />
                      <span>Release of our founding collection: 4,200 uniquely crafted Pepe NFTs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#4ecca7] mt-0.5 flex-shrink-0" />
                      <span>Pricing set at 18.369 $BASED per NFT</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#4ecca7] mt-0.5 flex-shrink-0" />
                      <span>Community building, NFT give-aways</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#4ecca7] mt-0.5 flex-shrink-0" />
                      <span>Snapshots for token airdrop</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative bg-gradient-to-br from-[#4ecca7]/10 to-transparent rounded-2xl border border-[#4ecca7]/20 p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#4ecca7]/20 border-2 border-[#4ecca7] flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[#4ecca7]" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-[#4ecca7] font-fredoka">Phase 2: Reward System Implementation</h3>
                      <p className="text-[#3fb8bd] font-medium">Status: In Progress ⏳</p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-gray-300 ml-16">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#4ecca7] mt-0.5 flex-shrink-0" />
                      <span>Establishment of the token economy that will power future upgrades</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#4ecca7] mt-0.5 flex-shrink-0" />
                      <span>Token airdrop with multiplier for early supporters</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Circle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span>Rarity and stacking multiplier - hold rare and multiple NFTs to get higher token emissions!</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Circle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span>Introduction of daily token rewards for all NFT holders</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="relative bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
                      <Circle className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-[#3fb8bd] font-fredoka">Phase 3: Limited Edition Mint</h3>
                      <p className="text-gray-400 font-medium">Status: Upcoming</p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-gray-300 ml-16">
                    <li className="flex items-start gap-3">
                      <Circle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span>Limited edition free mint of 420 handpicked NFTs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Circle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span>Main collection NFT holders with Easter Egg traits qualify for the 420 limited edition free mint</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="relative bg-gradient-to-br from-[#4ecca7]/10 to-transparent rounded-2xl border border-[#4ecca7]/20 p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
                      <Circle className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-[#4ecca7] font-fredoka">Phase 4: NFT Upgrading System</h3>
                      <p className="text-gray-400 font-medium">Status: Upcoming</p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-gray-300 ml-16">
                    <li className="flex items-start gap-3">
                      <Circle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span>Introduction of new handcrafted characters and attributes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Circle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span>Interactive, gamified upgrade experience allowing holders to choose their path</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Circle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span>Use earned rewards to make meaningful choices that shape your unique Pepe PFP</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Circle className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span>Unlock the full potential of all Easter eggs hidden throughout the collection</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Visualization */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-20 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold text-[#3fb8bd] text-center mb-12 font-fredoka">
              Project Timeline
            </h3>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3fb8bd] via-[#4ecca7] to-gray-600" />

                {/* Timeline Items */}
                <div className="space-y-12 relative">
                  <TimelineItem
                    status="completed"
                    title="Q4 2024"
                    description="Collection Launch & Community Building"
                  />
                  <TimelineItem
                    status="current"
                    title="Q1 2025"
                    description="Reward System & Token Distribution"
                  />
                  <TimelineItem
                    status="upcoming"
                    title="Q2 2025"
                    description="Limited Edition Mint (420 NFTs)"
                  />
                  <TimelineItem
                    status="upcoming"
                    title="Q3 2025"
                    description="NFT Upgrading System Launch"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

/**
 * TimelineItem Component
 */
function TimelineItem({
  status,
  title,
  description
}: {
  status: 'completed' | 'current' | 'upcoming'
  title: string
  description: string
}) {
  return (
    <div className="flex gap-6 items-start">
      <div className="relative">
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center border-4 border-gray-950 z-10
          ${status === 'completed' ? 'bg-[#3fb8bd]' : ''}
          ${status === 'current' ? 'bg-[#4ecca7] animate-pulse' : ''}
          ${status === 'upcoming' ? 'bg-gray-700' : ''}
        `}>
          {status === 'completed' && <CheckCircle2 className="w-6 h-6 text-black" />}
          {status === 'current' && <Clock className="w-6 h-6 text-black" />}
          {status === 'upcoming' && <Circle className="w-6 h-6 text-gray-400" />}
        </div>
      </div>
      <div className="flex-1 pb-8">
        <h4 className={`
          text-xl font-bold mb-2 font-fredoka
          ${status === 'completed' ? 'text-[#3fb8bd]' : ''}
          ${status === 'current' ? 'text-[#4ecca7]' : ''}
          ${status === 'upcoming' ? 'text-gray-400' : ''}
        `}>
          {title}
        </h4>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  )
}
