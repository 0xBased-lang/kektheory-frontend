import { NextRequest, NextResponse } from 'next/server'

/**
 * Individual NFT Data API with Metadata
 *
 * Security: Only returns data for minted NFTs
 * Performance: Individual caching for each NFT
 *
 * This endpoint serves the NFT detail page with complete metadata
 */

export const runtime = 'edge'

interface NFTAttribute {
  trait_type: string
  value: string
  rarity?: number
}

interface NFTComplete {
  rank: number
  tokenId: string
  name: string
  rarityScore: number
  imageUrl: string
  description: string
  attributes: NFTAttribute[]
  metadata: {
    name: string
    description: string
    image: string
    attributes: NFTAttribute[]
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ tokenId: string }> }
) {
  const { tokenId } = await params

  try {
    // 1. First verify NFT is minted by checking rankings
    const rankingsResponse = await fetch('https://api.kektech.xyz/rankings', {
      cache: 'force-cache',
      next: { revalidate: 300 } // 5 minutes
    })

    if (!rankingsResponse.ok) {
      throw new Error('Failed to verify NFT')
    }

    const { nfts } = await rankingsResponse.json()

    // Find the NFT in rankings (only minted NFTs are here)
    const rankingData = nfts.find((nft: { tokenId: string }) => nft.tokenId === tokenId)

    if (!rankingData) {
      // NFT not found in rankings = not minted or doesn't exist
      return NextResponse.json(
        { error: 'NFT not found or not yet minted' },
        { status: 404 }
      )
    }

    // 2. Fetch metadata for this specific NFT
    let metadata = null
    let attributes: NFTAttribute[] = []

    try {
      const metadataResponse = await fetch(
        `https://api.kektech.xyz/api/metadata/${tokenId}`,
        {
          cache: 'force-cache',
          next: { revalidate: 3600 } // 1 hour cache
        }
      )

      if (metadataResponse.ok) {
        metadata = await metadataResponse.json()
        attributes = metadata.attributes || []

        // Calculate rarity percentages
        attributes = attributes.map(attr => {
          // You could enhance this with actual rarity calculation
          // For now, we'll add placeholder rarity
          return {
            ...attr,
            rarity: calculateRarity(attr.value, attr.trait_type)
          }
        })
      }
    } catch (error) {
      console.error(`Failed to fetch metadata for token ${tokenId}:`, error)
    }

    // 3. Build complete NFT response
    const nftComplete: NFTComplete = {
      ...rankingData,
      description: metadata?.description || "4200 𝕂Ǝ𝕂丅ᵉ匚🅷 Artifacts: digital masterpieces blending tech and meme fun, hand-drawn by 𝔹enzo𝔹ert & Princess 𝔹u𝔹𝔹legum. An homage to OG Pepecoin 🐸👑",
      attributes,
      metadata: {
        name: rankingData.name,
        description: metadata?.description || "4200 𝕂Ǝ𝕂丅ᵉ匚🅷 Artifacts: digital masterpieces blending tech and meme fun, hand-drawn by 𝔹enzo𝔹ert & Princess 𝔹u𝔹𝔹legum. An homage to OG Pepecoin 🐸👑",
        image: rankingData.imageUrl,
        attributes
      }
    }

    // Return with cache headers
    return NextResponse.json(nftComplete, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'X-Token-Id': tokenId,
        'X-Has-Traits': String(attributes.length > 0)
      }
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch NFT data' },
      { status: 500 }
    )
  }
}

// Helper function to calculate rarity percentages
function calculateRarity(value: string, _traitType: string): number {
  // This is a placeholder - in production you'd calculate from actual distribution
  const rarityMap: Record<string, number> = {
    'psychedelic': 1.45,
    'rare_diablo': 0.21,
    'kekius': 0.71,
    'maximus': 0.52,
    // Add more mappings based on your trait distribution
  }

  return rarityMap[value.toLowerCase()] || 10.0 // Default to 10% if not found
}