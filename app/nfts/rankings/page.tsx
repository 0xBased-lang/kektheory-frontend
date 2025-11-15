import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BlurredTitleSection } from '@/components/ui/BlurredTitleSection'
import { NFTGallery } from '@/components/nft/NFTGallery'

/**
 * Rankings Page
 *
 * NFT rarity rankings - dedicated page for the rankings tab
 */
export default function RankingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <BlurredTitleSection
            title="Rarity Rankings"
            subtitle="Discover the rarest KEKTECH NFTs ranked by global rarity score"
          />

          {/* NFT Gallery - Pre-set to Rankings tab */}
          <NFTGallery initialTab="rankings" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
