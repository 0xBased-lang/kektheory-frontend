import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { NFTGallery } from '@/components/nft/NFTGallery'
import { CompactStatsWidget } from '@/components/CompactStatsWidget'

/**
 * Gallery Page
 *
 * NFT gallery displaying all minted KEKTECH NFTs with collection statistics
 */
export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="font-fredoka mb-4 text-4xl font-bold text-[#3fb8bd] sm:text-5xl">
              𝕂Ǝ𝕂丅ᵉ匚🅷 Gallery
            </h1>
            <p className="font-fredoka text-lg text-gray-300">
              Explore all minted 𝕂Ǝ𝕂TECH NFTs on the $BASED Chain
            </p>
          </div>

          {/* Compact Collection Stats & Tier Distribution */}
          <div className="mb-8">
            <CompactStatsWidget />
          </div>

          {/* NFT Gallery */}
          <NFTGallery />
        </div>
      </main>

      <Footer />
    </div>
  )
}
