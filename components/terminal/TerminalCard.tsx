'use client'

import Image from 'next/image'
import { ArrowUp, ArrowDown, TrendingUp, Users, Clock, Zap } from 'lucide-react'

interface TerminalCardProps {
  // NFT/Token Info
  image: string
  name: string
  tokenId?: string

  // Stats
  price?: string
  priceChange?: number
  marketCap?: string
  holders?: number
  volume?: string
  age?: string

  // Status indicators
  status?: 'hot' | 'new' | 'graduating' | 'graduated'
  badges?: string[]

  // Actions
  onCardClick?: () => void
  onAction?: (action: string) => void

  // Mini chart data (optional)
  chartData?: number[]
}

/**
 * TerminalCard - NFT/Token card component for terminal UI
 *
 * Displays NFT/token information in a compact card format
 * Similar to crypto trading terminal cards
 */
export function TerminalCard({
  image,
  name,
  tokenId,
  price,
  priceChange,
  marketCap,
  holders,
  volume,
  age,
  status,
  badges,
  onCardClick,
  onAction,
  chartData
}: TerminalCardProps) {
  const isPositive = priceChange && priceChange > 0
  const isNegative = priceChange && priceChange < 0

  return (
    <div
      onClick={onCardClick}
      className="group relative bg-[#111111] rounded-lg border border-gray-800 hover:border-[#3fb8bd]/50 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Status Badge */}
      {status && (
        <div className="absolute top-2 left-2 z-10">
          <span className={`
            px-2 py-0.5 rounded text-xs font-bold
            ${status === 'hot' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : ''}
            ${status === 'new' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
            ${status === 'graduating' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : ''}
            ${status === 'graduated' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : ''}
          `}>
            {status === 'hot' && '🔥'}
            {status === 'new' && '✨'}
            {status === 'graduating' && '🎓'}
            {status === 'graduated' && '⭐'}
            {status.toUpperCase()}
          </span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-3">
        {/* Top Section - Image and Basic Info */}
        <div className="flex items-start gap-3 mb-3">
          {/* NFT/Token Image */}
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#3fb8bd]/50 transition-colors flex-shrink-0">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          {/* Name and Price */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white truncate mb-1 font-fredoka">
              {name}
            </h3>
            {tokenId && (
              <p className="text-xs text-gray-500 truncate">
                #{tokenId}
              </p>
            )}
            {price && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[#3fb8bd] font-bold font-mono">
                  {price}
                </span>
                {priceChange !== undefined && (
                  <span className={`
                    text-xs font-bold flex items-center gap-0.5
                    ${isPositive ? 'text-green-400' : ''}
                    ${isNegative ? 'text-red-400' : ''}
                  `}>
                    {isPositive && <ArrowUp className="w-3 h-3" />}
                    {isNegative && <ArrowDown className="w-3 h-3" />}
                    {Math.abs(priceChange)}%
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {marketCap && (
            <div className="flex items-center gap-1.5 text-xs">
              <TrendingUp className="w-3 h-3 text-gray-500" />
              <span className="text-gray-400">MC:</span>
              <span className="text-white font-mono">{marketCap}</span>
            </div>
          )}
          {holders !== undefined && (
            <div className="flex items-center gap-1.5 text-xs">
              <Users className="w-3 h-3 text-gray-500" />
              <span className="text-gray-400">Holders:</span>
              <span className="text-white font-mono">{holders}</span>
            </div>
          )}
          {volume && (
            <div className="flex items-center gap-1.5 text-xs">
              <Zap className="w-3 h-3 text-gray-500" />
              <span className="text-gray-400">Vol:</span>
              <span className="text-white font-mono">{volume}</span>
            </div>
          )}
          {age && (
            <div className="flex items-center gap-1.5 text-xs">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-gray-400">Age:</span>
              <span className="text-white font-mono">{age}</span>
            </div>
          )}
        </div>

        {/* Mini Chart (if chart data provided) */}
        {chartData && chartData.length > 0 && (
          <div className="mb-3 h-12 relative">
            <MiniChart data={chartData} color={isPositive ? '#4ade80' : isNegative ? '#ef4444' : '#3fb8bd'} />
          </div>
        )}

        {/* Badges */}
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAction?.('buy')
            }}
            className="flex-1 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded font-bold text-sm transition-colors border border-green-500/30"
          >
            Buy
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAction?.('view')
            }}
            className="flex-1 py-2 bg-[#3fb8bd]/10 hover:bg-[#3fb8bd]/20 text-[#3fb8bd] rounded font-bold text-sm transition-colors border border-[#3fb8bd]/30"
          >
            View
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3fb8bd]/0 to-[#4ecca7]/0 group-hover:from-[#3fb8bd]/5 group-hover:to-[#4ecca7]/5 pointer-events-none transition-all duration-200" />
    </div>
  )
}

/**
 * MiniChart - Simple SVG chart for cards
 */
function MiniChart({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
