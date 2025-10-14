'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface NFTData {
  tokenId: string
  name: string
  imageUrl: string
  rarityScore: number
}

interface RankingsAPIResponse {
  nfts: Array<{
    rank: number
    tokenId: string
    name: string
    rarityScore: number
    imageUrl: string
  }>
}

// Fallback NFTs in case API fails
const FALLBACK_NFTS = [
  { tokenId: '65', name: 'KEKTECH #65', imageUrl: '/images/65.png', rarityScore: 85 },
  { tokenId: '171', name: 'KEKTECH #171', imageUrl: '/images/171.png', rarityScore: 72 },
  { tokenId: '180', name: 'KEKTECH #180', imageUrl: '/images/180.png', rarityScore: 95 },
  { tokenId: '69', name: 'KEKTECH #69', imageUrl: '/images/69.png', rarityScore: 88 },
  { tokenId: '686', name: 'KEKTECH #686', imageUrl: '/images/686.png', rarityScore: 45 },
  { tokenId: '782', name: 'KEKTECH #782', imageUrl: '/images/782.png', rarityScore: 68 },
]

// Get random NFTs from the collection
function getRandomNFTs(nfts: NFTData[], count: number): NFTData[] {
  const shuffled = [...nfts].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Get rarity tier and color based on score
function getRarityInfo(score: number): { tier: string; color: string } {
  if (score >= 90) return { tier: 'Legendary', color: 'text-orange-400' }
  if (score >= 75) return { tier: 'Epic', color: 'text-purple-400' }
  if (score >= 55) return { tier: 'Rare', color: 'text-blue-400' }
  if (score >= 35) return { tier: 'Uncommon', color: 'text-green-400' }
  return { tier: 'Common', color: 'text-gray-400' }
}

export function FeaturedNFTs() {
  const [allNFTs, setAllNFTs] = useState<NFTData[]>([])
  const [displayedNFTs, setDisplayedNFTs] = useState<NFTData[]>(FALLBACK_NFTS)
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  // Fetch all minted NFTs from API
  useEffect(() => {
    async function fetchNFTs() {
      try {
        // Use rankings API directly - it's fast and has all the data we need
        const response = await fetch('https://api.kektech.xyz/rankings')
        if (!response.ok) throw new Error('Failed to fetch NFTs')

        const data: RankingsAPIResponse = await response.json()

        // Transform rankings data to our format
        const nfts: NFTData[] = data.nfts.map((nft) => ({
          tokenId: nft.tokenId,
          name: nft.name,
          imageUrl: nft.imageUrl,
          rarityScore: nft.rarityScore
        }))

        setAllNFTs(nfts)

        // Set initial random selection
        if (nfts.length >= 6) {
          setDisplayedNFTs(getRandomNFTs(nfts, 6))
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching NFTs:', error)
        // Use fallback NFTs on error
        setDisplayedNFTs(FALLBACK_NFTS)
        setIsLoading(false)
      }
    }

    fetchNFTs()
  }, [])

  // Rotate NFTs every 10 seconds
  useEffect(() => {
    if (allNFTs.length < 6) return

    const rotationInterval = setInterval(() => {
      // Fade out
      setFadeOut(true)

      // After fade out, change NFTs and fade back in
      setTimeout(() => {
        setDisplayedNFTs(getRandomNFTs(allNFTs, 6))
        setFadeOut(false)
      }, 300) // Match this with CSS transition duration
    }, 10000) // Rotate every 10 seconds

    return () => clearInterval(rotationInterval)
  }, [allNFTs])

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Featured <span className="text-kek-green">NFTs</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover some of our most unique and sought-after pieces from the KEKTECH collection
          </p>
          {!isLoading && allNFTs.length > 6 && (
            <p className="text-sm text-gray-500 mt-2">
              🔄 Rotating through {allNFTs.length} minted NFTs
            </p>
          )}
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 transition-opacity duration-300 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {isLoading ? (
            // Loading skeleton
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 animate-pulse">
                <div className="aspect-square bg-gray-700" />
                <div className="p-3">
                  <div className="h-4 bg-gray-700 rounded mb-2" />
                  <div className="h-3 bg-gray-700 rounded w-16" />
                </div>
              </div>
            ))
          ) : (
            displayedNFTs.map((nft) => {
              const rarityInfo = getRarityInfo(nft.rarityScore)

              return (
                <Link
                  key={nft.tokenId}
                  href={`/gallery`}
                  className="group block"
                >
                  <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:border-kek-green hover:shadow-lg hover:shadow-kek-green/20 hover:scale-105">
                    {/* NFT Image */}
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={nft.imageUrl}
                        alt={nft.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* NFT Info */}
                    <div className="p-3">
                      <h3 className="font-semibold text-white text-sm mb-1 truncate">
                        {nft.name}
                      </h3>
                      <p className={`text-xs ${rarityInfo.color} font-medium`}>
                        {rarityInfo.tier}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-kek-green to-kek-cyan text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-kek-green/30 hover:scale-105"
          >
            View Full Collection
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
