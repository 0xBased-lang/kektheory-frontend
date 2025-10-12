'use client'

import { useState, useEffect } from 'react'
import { getTotalSupply, CONTRACTS } from '@/lib/blockchain/kektv'

/**
 * Compact horizontal stats widget for gallery
 * Shows collection stats and tier distribution in one small row
 */
export function CompactStatsWidget() {
  const [totalMinted, setTotalMinted] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const total = await getTotalSupply(CONTRACTS.KEKTECH)
        setTotalMinted(total)
      } catch (error) {
        console.error('Error fetching total supply:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-[#3fb8bd] border-t-transparent" />
      </div>
    )
  }

  const totalSupply = 4200
  const remaining = totalSupply - totalMinted
  const progress = ((totalMinted / totalSupply) * 100).toFixed(1)

  // Tier distribution based on total minted
  const tiers = [
    { name: 'Mythic', minted: Math.floor(totalMinted * (13 / 4200)), total: 13, color: '#ff00ff' },
    { name: 'Legendary', minted: Math.floor(totalMinted * (42 / 4200)), total: 42, color: '#ffd700' },
    { name: 'Epic', minted: Math.floor(totalMinted * (195 / 4200)), total: 195, color: '#9d4edd' },
    { name: 'Rare', minted: Math.floor(totalMinted * (670 / 4200)), total: 670, color: '#3fb8bd' },
    { name: 'Common', minted: Math.floor(totalMinted * (3280 / 4200)), total: 3280, color: '#6c757d' }
  ]

  return (
    <div className="bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/80 rounded-xl border border-[#3fb8bd]/20 px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-6 flex-wrap">
        {/* Collection Stats - Left Side */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Minted</div>
            <div className="text-xl font-bold text-[#3fb8bd]">{totalMinted.toLocaleString()}</div>
          </div>
          <div className="h-8 w-px bg-gray-700" />
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Remaining</div>
            <div className="text-xl font-bold text-[#4ecca7]">{remaining.toLocaleString()}</div>
          </div>
          <div className="h-8 w-px bg-gray-700" />
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Progress</div>
            <div className="text-xl font-bold text-[#ff00ff]">{progress}%</div>
          </div>
        </div>

        {/* Tier Distribution - Right Side */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          {tiers.map((tier) => (
            <div key={tier.name} className="text-center">
              <div className="text-xs font-medium mb-1" style={{ color: tier.color }}>
                {tier.name.charAt(0)}
              </div>
              <div className="text-sm font-bold text-white">
                {tier.minted}/{tier.total}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
