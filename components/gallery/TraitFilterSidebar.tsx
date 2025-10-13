'use client'

import { useState } from 'react'
import { CompleteNFT } from '@/lib/hooks/useCompleteNFTs'

interface FilterState {
  [category: string]: string[]
}

interface TraitFilterSidebarProps {
  nfts: CompleteNFT[]
  onFilterChange: (filters: FilterState) => void
}

// Trait categories and their display names
const TRAIT_CATEGORIES = {
  Background: 'Background',
  Body: 'Body',
  Tattoo: 'Tattoo',
  Style: 'Style',
  Clothes: 'Clothes',
  Tools: 'Tools',
  Eyes: 'Eyes',
  Glasses: 'Glasses',
  Hat: 'Hat',
  Special: 'Special',
  'Easter Eggs': 'Easter Eggs'
}

/**
 * Trait Filtering Sidebar
 *
 * Dynamic filtering based on actual minted NFT traits
 * Security: Only shows traits from minted NFTs
 */
export function TraitFilterSidebar({ nfts, onFilterChange }: TraitFilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({})
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Background', 'Body']) // Default expanded
  )

  // Build trait options from actual NFT data
  const traitOptions = buildTraitOptions(nfts)

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const toggleFilter = (category: string, value: string) => {
    const newFilters = { ...filters }

    if (!newFilters[category]) {
      newFilters[category] = []
    }

    const index = newFilters[category].indexOf(value)
    if (index > -1) {
      newFilters[category].splice(index, 1)
      if (newFilters[category].length === 0) {
        delete newFilters[category]
      }
    } else {
      newFilters[category].push(value)
    }

    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearAll = () => {
    setFilters({})
    onFilterChange({})
  }

  const clearCategory = (category: string) => {
    const newFilters = { ...filters }
    delete newFilters[category]
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const activeFilterCount = Object.values(filters).reduce((sum, values) => sum + values.length, 0)

  return (
    <div className="w-80 bg-gray-900/60 border border-gray-800 rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white font-fredoka">Filter by Traits</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-[#3fb8bd] hover:text-[#4ecca7] transition"
          >
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 scrollbar-thin">
        {Object.entries(TRAIT_CATEGORIES).map(([key, label]) => {
          const categoryFilters = filters[key] || []
          const options = traitOptions[key] || []
          const isExpanded = expandedCategories.has(key)

          if (options.length === 0) return null

          return (
            <div key={key} className="border border-gray-800 rounded-lg overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(key)}
                className="w-full px-4 py-3 bg-gray-800/50 hover:bg-gray-800 transition flex items-center justify-between"
              >
                <span className="font-medium text-white flex items-center gap-2">
                  {label}
                  {categoryFilters.length > 0 && (
                    <span className="px-2 py-0.5 bg-[#3fb8bd]/20 text-[#3fb8bd] text-xs rounded-full">
                      {categoryFilters.length}
                    </span>
                  )}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Category Options */}
              {isExpanded && (
                <div className="p-4 space-y-2">
                  {categoryFilters.length > 0 && (
                    <button
                      onClick={() => clearCategory(key)}
                      className="text-xs text-gray-400 hover:text-white mb-2"
                    >
                      Clear {label}
                    </button>
                  )}

                  {options.map(({ value, count, percentage }) => {
                    const isChecked = categoryFilters.includes(value)
                    const displayName = formatTraitName(value)

                    return (
                      <label
                        key={value}
                        className="flex items-center justify-between cursor-pointer hover:bg-gray-800/30 p-2 rounded transition"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleFilter(key, value)}
                            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-[#3fb8bd] focus:ring-[#3fb8bd] focus:ring-offset-0"
                          />
                          <span className="text-sm text-gray-300">{displayName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500">{count}</span>
                          <span className={`${getRarityColor(percentage)} font-medium`}>
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Active Filters Summary */}
      {activeFilterCount > 0 && (
        <div className="pt-4 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Showing NFTs matching ALL selected traits
          </p>
        </div>
      )}
    </div>
  )
}

// Build trait options from actual NFT data
function buildTraitOptions(nfts: CompleteNFT[]) {
  const traitMap: Record<string, Record<string, number>> = {}

  // Count traits from minted NFTs
  nfts.forEach(nft => {
    nft.attributes?.forEach(attr => {
      if (!traitMap[attr.trait_type]) {
        traitMap[attr.trait_type] = {}
      }
      if (!traitMap[attr.trait_type][attr.value]) {
        traitMap[attr.trait_type][attr.value] = 0
      }
      traitMap[attr.trait_type][attr.value]++
    })
  })

  // Convert to sorted options
  const options: Record<string, Array<{ value: string; count: number; percentage: number }>> = {}

  Object.entries(traitMap).forEach(([category, values]) => {
    options[category] = Object.entries(values)
      .map(([value, count]) => ({
        value,
        count,
        percentage: (count / nfts.length) * 100
      }))
      .sort((a, b) => b.count - a.count) // Sort by count descending
  })

  return options
}

function formatTraitName(name: string): string {
  return name
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getRarityColor(percentage: number): string {
  if (percentage < 1) return 'text-purple-400'
  if (percentage < 5) return 'text-yellow-400'
  if (percentage < 15) return 'text-green-400'
  if (percentage < 30) return 'text-blue-400'
  return 'text-cyan-400'
}