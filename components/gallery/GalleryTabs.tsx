'use client'

import { useState } from 'react'

interface GalleryTabsProps {
  children: (activeTab: 'ranking' | 'filter' | 'traits') => React.ReactNode
}

/**
 * Gallery Tabs Component
 *
 * Three-tab layout for the gallery:
 * - Ranking: Shows all NFTs by rank with stats widget
 * - Filter: Trait filtering with sidebar
 * - Traits: Trait distribution table (rarity overview)
 */
export function GalleryTabs({ children }: GalleryTabsProps) {
  const [activeTab, setActiveTab] = useState<'ranking' | 'filter' | 'traits'>('ranking')

  return (
    <div className="space-y-8">
      {/* Tab Navigation - Dashboard Style */}
      <div className="flex justify-center">
        <div className="inline-flex gap-2 rounded-xl bg-gray-900/60 border border-gray-800 p-1">
          <button
            onClick={() => setActiveTab('ranking')}
            className={`
              px-8 py-3 rounded-lg font-fredoka font-bold transition-all duration-200
              ${activeTab === 'ranking'
                ? 'bg-[#3fb8bd] text-black shadow-lg shadow-[#3fb8bd]/20'
                : 'text-[#3fb8bd] hover:text-white hover:bg-gray-800/50'
              }
            `}
          >
            🏆 Ranking
          </button>
          <button
            onClick={() => setActiveTab('filter')}
            className={`
              px-8 py-3 rounded-lg font-fredoka font-bold transition-all duration-200
              ${activeTab === 'filter'
                ? 'bg-[#4ecca7] text-black shadow-lg shadow-[#4ecca7]/20'
                : 'text-[#4ecca7] hover:text-white hover:bg-gray-800/50'
              }
            `}
          >
            🔍 Filter
          </button>
          <button
            onClick={() => setActiveTab('traits')}
            className={`
              px-8 py-3 rounded-lg font-fredoka font-bold transition-all duration-200
              ${activeTab === 'traits'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'text-purple-400 hover:text-white hover:bg-gray-800/50'
              }
            `}
          >
            🐸 Traits
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {children(activeTab)}
      </div>
    </div>
  )
}
