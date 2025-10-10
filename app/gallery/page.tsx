import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { NFTGallery } from '@/components/nft/NFTGallery'

/**
 * Gallery Page
 *
 * NFT gallery displaying all minted KEKTECH NFTs
 */
export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              KEKTECH Gallery
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore all minted KEKTECH NFTs on the $BASED Chain
            </p>
          </div>

          {/* NFT Gallery */}
          <NFTGallery />
        </div>
      </main>

      <Footer />
    </div>
  )
}
