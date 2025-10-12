'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface NFTMetadata {
  name: string
  description?: string
  image: string
  attributes?: Array<{
    trait_type: string
    value: string | number
  }>
}

interface NFTDetails {
  tokenId: string
  name: string
  imageUrl: string
  rank?: number
  rarityScore?: number
  metadata?: NFTMetadata
}

/**
 * NFT Detail Page Content
 *
 * Displays individual NFT details with metadata
 */
function NFTDetailPageContent() {
  const searchParams = useSearchParams()
  const tokenId = searchParams.get('id')
  const [nftDetails, setNftDetails] = useState<NFTDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!tokenId) {
      setError('No token ID provided')
      setLoading(false)
      return
    }

    const fetchNFTDetails = async () => {
      try {
        setLoading(true)

        // Try multiple endpoints for metadata
        const endpoints = [
          `https://api.kektech.xyz/api/metadata/${tokenId}`,
          `https://kektech.xyz/metadata/${tokenId}`,
          `https://raw.githubusercontent.com/0xBased-lang/KektechNFT/main/metadata/${tokenId}.json`
        ]

        let metadata = null
        for (const endpoint of endpoints) {
          try {
            const response = await fetch(endpoint)
            if (response.ok) {
              metadata = await response.json()
              break
            }
          } catch {
            // Silent fail - try next endpoint
          }
        }

        if (metadata) {
          setNftDetails({
            tokenId,
            name: metadata.name || `KEKTECH #${tokenId}`,
            imageUrl: metadata.image || `/images/${tokenId}.png`,
            metadata
          })
        } else {
          // Fallback if API fails
          setNftDetails({
            tokenId,
            name: `𝕂Ǝ𝕂TECH #${tokenId}`,
            imageUrl: `/images/${tokenId}.png`,
          })
        }
      } catch (err) {
        console.error('Error fetching NFT details:', err)
        setError('Failed to load NFT details')
      } finally {
        setLoading(false)
      }
    }

    fetchNFTDetails()
  }, [tokenId])

  if (!tokenId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-gradient-to-b from-black to-gray-950 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-300">
              <p>No NFT ID provided</p>
              <Link href="/gallery" className="mt-4 inline-block text-[#3fb8bd] hover:underline">
                ← Back to Gallery
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-black via-gray-950 to-gray-900">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/gallery"
            className="font-fredoka mb-8 inline-flex items-center text-lg text-[#3fb8bd] transition-colors hover:text-[#4ecca7]"
          >
            ← Back to Collection
          </Link>

          {/* Loading State */}
          {loading && (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-[#3fb8bd] border-t-transparent" />
                <p className="font-fredoka text-lg text-gray-300">Loading NFT details...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center">
              <p className="font-fredoka text-lg text-red-400">{error}</p>
            </div>
          )}

          {/* NFT Details */}
          {nftDetails && !loading && !error && (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left Column - Image */}
              <div className="group relative overflow-hidden rounded-xl border-2 border-[#3fb8bd]/30 bg-gradient-to-br from-gray-900 to-gray-950 p-4 shadow-2xl transition-all hover:border-[#3fb8bd] hover:shadow-[#3fb8bd]/20">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={nftDetails.imageUrl}
                    alt={nftDetails.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h1 className="font-fredoka mb-2 text-4xl font-bold text-white">
                    {nftDetails.name}
                  </h1>
                  <p className="font-fredoka text-xl text-[#3fb8bd]">
                    Token ID: #{nftDetails.tokenId}
                  </p>
                </div>

                {/* Description */}
                {nftDetails.metadata?.description && (
                  <div className="rounded-xl border border-[#3fb8bd]/20 bg-gray-900/50 p-6">
                    <h2 className="font-fredoka mb-3 text-xl font-bold text-[#3fb8bd]">
                      Description
                    </h2>
                    <p className="font-fredoka text-gray-300">
                      {nftDetails.metadata.description}
                    </p>
                  </div>
                )}

                {/* Stats */}
                {(nftDetails.rank || nftDetails.rarityScore) && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {nftDetails.rank && (
                      <div className="rounded-xl border border-[#3fb8bd]/20 bg-gray-900/50 p-6">
                        <div className="text-sm text-gray-400">Global Rank</div>
                        <div className="font-fredoka text-3xl font-bold text-[#3fb8bd]">
                          #{nftDetails.rank}
                        </div>
                      </div>
                    )}
                    {nftDetails.rarityScore && (
                      <div className="rounded-xl border border-[#ff00ff]/20 bg-gray-900/50 p-6">
                        <div className="text-sm text-gray-400">Rarity Score</div>
                        <div className="font-fredoka text-3xl font-bold text-[#ff00ff]">
                          {nftDetails.rarityScore.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Attributes/Traits */}
                {nftDetails.metadata?.attributes && nftDetails.metadata.attributes.length > 0 && (
                  <div className="rounded-xl border border-[#3fb8bd]/20 bg-gray-900/50 p-6">
                    <h2 className="font-fredoka mb-4 text-xl font-bold text-[#3fb8bd]">
                      Attributes
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {nftDetails.metadata.attributes.map((attr, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-[#4ecca7]/20 bg-black/40 p-3"
                        >
                          <div className="text-xs text-gray-400">{attr.trait_type}</div>
                          <div className="font-fredoka font-semibold text-[#4ecca7]">
                            {attr.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}


/**
 * NFT Detail Page
 *
 * Wrapped in Suspense for useSearchParams
 */
export default function NFTDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-gradient-to-b from-black to-gray-950 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-[#3fb8bd] border-t-transparent" />
                <p className="font-fredoka text-lg text-gray-300">Loading...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <NFTDetailPageContent />
    </Suspense>
  )
}
