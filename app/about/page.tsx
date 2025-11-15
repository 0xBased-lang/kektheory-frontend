import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BlurredTitleSection } from '@/components/ui/BlurredTitleSection'

/**
 * About Us Page
 *
 * Team story, vision, and creative journey
 */
export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black to-gray-950">
        {/* Page Header */}
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <BlurredTitleSection
            title="About 𝕂Ǝ𝕂丅ᵉ匚🅷"
            subtitle="Our story, vision, and creative journey"
          />
        </div>

        {/* Our Story Section */}
        <section className="py-12 border-t border-gray-800">
          <div className="container mx-auto px-6">
            {/* First Row: Text Left, Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-[#3fb8bd] font-fredoka">Our Story</h3>
                <p className="text-gray-300 leading-relaxed">
                  𝕂Ǝ𝕂TECH emerges from the intersection of art and blockchain technology, born from our appreciation for the PepeCoin legacy dating back to 2016. Our dedicated team initially envisioned a modest NFT collection but found ourselves captivated by the energy of the PepeCoin 🐸 and $BASED 🧠 communities.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our creative journey began in early 2024 within the thriving PepeCoin movement. Through Pepepaint, our team discovered a digital canvas where Pepe art could flourish in new ways. This discovery helped us grow as artists and develop a clear vision for our project.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  What started as artistic exploration evolved into something meaningful when our early artwork received recognition from Pepelovers 🐸 and other respected figures in the Pepe community. This endorsement fueled our determination to craft more distinctive Pepe art and build something valuable for fellow enthusiasts. With each creation, we deepen our commitment to honoring the culture that brought us together. 🐸🤝
                </p>
              </div>

              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#3fb8bd]/30 shadow-xl shadow-[#3fb8bd]/10">
                <Image
                  src="/images/1.png"
                  alt="KEKTECH NFT Artwork"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Second Row: Image Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#3fb8bd]/30 shadow-xl shadow-[#3fb8bd]/10 lg:order-1">
                <Image
                  src="/images/2.png"
                  alt="KEKTECH NFT Collection"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="space-y-6 lg:order-2">
                <h3 className="text-3xl font-bold text-[#3fb8bd] font-fredoka">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  At 𝕂Ǝ𝕂TECH, we aim to create more than just another NFT collection. We envision a dynamic ecosystem where art, community, and technology converge to create lasting value. At our core, spreading fresh, dank Pepe art throughout the crypto space drives everything we do. We're building a platform where holders can customize their digital identities, earn rewards, and participate in the evolution of the collection itself.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our mission extends beyond digital assets—we're committed to producing high-quality Pepe art that celebrates the culture and contributes to the broader crypto art space. This is our homage to the communities that inspired us and our contribution to the ever-evolving PEPENING 🐸🚀 movement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Team Section */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-20 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold text-[#3fb8bd] text-center mb-12 font-fredoka">
              Meet the Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* BenzoBert */}
              <div className="bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#3fb8bd] to-[#4ecca7] p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-4xl">
                    🧑‍🎨
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-[#3fb8bd] mb-2 font-fredoka">𝔹enzo𝔹ert</h4>
                <p className="text-[#4ecca7] mb-4 font-medium">Lead Artist & Co-Founder</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Master of the Pepe craft, BenzoBert brings each artifact to life with meticulous attention to detail and deep appreciation for meme culture.
                </p>
              </div>

              {/* Princess Bubblegum */}
              <div className="bg-gradient-to-br from-[#4ecca7]/10 to-transparent rounded-2xl border border-[#4ecca7]/20 p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#4ecca7] to-[#3fb8bd] p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-4xl">
                    👸
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-[#4ecca7] mb-2 font-fredoka">Princess 𝔹u𝔹𝔹legum</h4>
                <p className="text-[#3fb8bd] mb-4 font-medium">Creative Director & Co-Founder</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The creative vision behind 𝕂Ǝ𝕂TECH, Princess Bubblegum ensures every piece captures the essence of what makes Pepe art special.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Journey Section */}
        <section className="py-20 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-[#3fb8bd] mb-8 font-fredoka text-center">
                Community Journey
              </h3>
              <div className="space-y-6 mb-12">
                <p className="text-gray-300 leading-relaxed text-center">
                  We're committed to engaging with our community at every step. We value your feedback and will adapt our vision to create the best experience for our holders. Above all, we're dedicated to our highest utility: spreading dank Pepe art throughout the space, bringing creative joy to the broader crypto community. 🐸🎨🔥
                </p>
                <p className="text-gray-300 leading-relaxed text-center">
                  We strongly believe in collaborations and will pursue partnerships with other $Based NFT communities to create opportunities that strengthen the entire ecosystem.
                </p>
              </div>

              {/* Making Of GIF */}
              <div className="rounded-2xl overflow-hidden border border-[#3fb8bd]/20 shadow-xl shadow-[#3fb8bd]/10">
                <Image
                  src="/images/makingof.gif"
                  alt="KEKTECH Creative Process - Behind the Scenes"
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <p className="text-center text-gray-400 mt-4 text-sm">
                Watch our artistic process: hand-drawing each unique 𝕂Ǝ𝕂TECH artifact
              </p>
            </div>
          </div>
        </section>

        {/* Collection Stats */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-20 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold text-[#3fb8bd] text-center mb-12 font-fredoka">
              Collection Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#3fb8bd]/10 to-transparent rounded-2xl border border-[#3fb8bd]/20 p-8 text-center">
                <div className="text-5xl font-bold text-[#3fb8bd] mb-2 font-fredoka">4,200</div>
                <div className="text-gray-400 font-medium">Unique NFTs</div>
              </div>
              <div className="bg-gradient-to-br from-[#4ecca7]/10 to-transparent rounded-2xl border border-[#4ecca7]/20 p-8 text-center">
                <div className="text-5xl font-bold text-[#4ecca7] mb-2 font-fredoka">18.369</div>
                <div className="text-gray-400 font-medium">$BASED per Mint</div>
              </div>
              <div className="bg-gradient-to-br from-[#daa520]/10 to-transparent rounded-2xl border border-[#daa520]/20 p-8 text-center">
                <div className="text-5xl font-bold text-[#daa520] mb-2 font-fredoka">100%</div>
                <div className="text-gray-400 font-medium">Hand-Drawn Art</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
