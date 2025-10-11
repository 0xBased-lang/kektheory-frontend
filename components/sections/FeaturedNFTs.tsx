'use client'

import Image from 'next/image'
import Link from 'next/link'

const FEATURED_NFTS = [
  { 
    id: 65, 
    name: "KEKTECH #65",
    rarity: "Epic",
    rarityColor: "text-purple-400"
  },
  { 
    id: 171, 
    name: "KEKTECH #171",
    rarity: "Rare", 
    rarityColor: "text-blue-400"
  },
  { 
    id: 180, 
    name: "KEKTECH #180",
    rarity: "Legendary",
    rarityColor: "text-orange-400"
  },
  { 
    id: 69, 
    name: "KEKTECH #69",
    rarity: "Epic",
    rarityColor: "text-purple-400"
  },
  { 
    id: 686, 
    name: "KEKTECH #686",
    rarity: "Common",
    rarityColor: "text-gray-400"
  },
  { 
    id: 782, 
    name: "KEKTECH #782",
    rarity: "Rare",
    rarityColor: "text-blue-400"
  },
]

export function FeaturedNFTs() {
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
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {FEATURED_NFTS.map((nft) => (
            <Link 
              key={nft.id} 
              href={`/gallery`}
              className="group block"
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:border-kek-green hover:shadow-lg hover:shadow-kek-green/20 hover:scale-105">
                {/* NFT Image */}
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={`/images/${nft.id}.png`}
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
                  <p className={`text-xs ${nft.rarityColor} font-medium`}>
                    {nft.rarity}
                  </p>
                </div>
              </div>
            </Link>
          ))}
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
