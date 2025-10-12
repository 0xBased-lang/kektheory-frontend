import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { NFTGallery } from '@/components/nft/NFTGallery'
import { CollectionStatsWidget } from '@/components/CollectionStatsWidget'

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
            <h1 className="font-fredoka mb-4 text-4xl font-bold text-white sm:text-5xl">
              𝕂Ǝ𝕂丅ᵉ匚🅷 Gallery
            </h1>
            <p className="font-fredoka text-lg text-gray-300">
              Explore all minted KEKTECH NFTs on the $BASED Chain
            </p>
          </div>

          {/* Collection Stats & Tier Distribution Widget */}
          <div className="mb-12 max-w-5xl mx-auto">
            <CollectionStatsWidget />
          </div>

          {/* NFT Gallery */}
          <NFTGallery />
        </div>
      </main>

      <Footer />
    </div>
  )
}
