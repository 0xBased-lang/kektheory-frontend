'use client'

import { useState } from 'react'

interface GalleryTabsProps {
  children: (activeTab: 'ranking' | 'traits') => React.ReactNode
}

/**
 * Gallery Tabs Component
 *
 * Two-tab layout for the gallery:
 * - Ranking: Shows all NFTs by rank (default)
 * - Traits: Placeholder for trait filtering (coming soon)
 */
export function GalleryTabs({ children }: GalleryTabsProps) {
  const [activeTab, setActiveTab] = useState<'ranking' | 'traits'>('ranking')

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl bg-gray-900/60 border border-gray-800 p-1">
          <button
            onClick={() => setActiveTab('ranking')}
            className={`
              px-8 py-3 rounded-lg font-fredoka font-bold transition-all duration-200
              ${activeTab === 'ranking'
                ? 'bg-[#3fb8bd] text-black shadow-lg shadow-[#3fb8bd]/20'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }
            `}
          >
            🏆 Ranking
          </button>
          <button
            onClick={() => setActiveTab('traits')}
            className={`
              px-8 py-3 rounded-lg font-fredoka font-bold transition-all duration-200
              ${activeTab === 'traits'
                ? 'bg-[#4ecca7] text-black shadow-lg shadow-[#4ecca7]/20'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }
            `}
          >
            🎨 Traits
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
