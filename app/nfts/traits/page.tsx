import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BlurredTitleSection } from '@/components/ui/BlurredTitleSection'
import { NFTGallery } from '@/components/nft/NFTGallery'

/**
 * Traits Explorer Page
 *
 * Browse NFTs by traits and view trait distribution
 */
export default function TraitsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <BlurredTitleSection
            title="Traits Explorer"
            subtitle="Browse NFTs by traits and discover trait distribution across the collection"
          />

          {/* NFT Gallery - Pre-set to Traits tab */}
          <NFTGallery initialTab="traits" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
