'use client'

import { ReactNode } from 'react'

export interface Tab {
  id: string
  label: string
  icon?: ReactNode
  badge?: number
  color?: string
}

interface TerminalTabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
  variant?: 'default' | 'compact' | 'pills'
}

/**
 * TerminalTabs - Tab navigation component
 *
 * Provides tab switching for different terminal views
 */
export function TerminalTabs({
  tabs,
  activeTab,
  onChange,
  variant = 'default'
}: TerminalTabsProps) {
  if (variant === 'compact') {
    return (
      <div className="flex border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              px-6 py-3 font-fredoka font-bold text-sm transition-all relative
              ${activeTab === tab.id
                ? 'text-[#3fb8bd]'
                : 'text-gray-400 hover:text-white'
              }
            `}
          >
            <div className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="px-1.5 py-0.5 bg-red-500 text-white rounded text-xs">
                  {tab.badge}
                </span>
              )}
            </div>
            {activeTab === tab.id && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: tab.color || '#3fb8bd' }}
              />
            )}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'pills') {
    return (
      <div className="flex gap-2 p-2 bg-[#0f0f0f] rounded-lg border border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              px-4 py-2 rounded-lg font-fredoka font-bold text-sm transition-all
              ${activeTab === tab.id
                ? 'text-black shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }
            `}
            style={
              activeTab === tab.id
                ? {
                    backgroundColor: tab.color || '#3fb8bd',
                    boxShadow: `0 4px 14px ${tab.color || '#3fb8bd'}33`
                  }
                : {}
            }
          >
            <div className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="px-1.5 py-0.5 bg-red-500 text-white rounded text-xs">
                  {tab.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    )
  }

  // Default variant
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            px-6 py-3 rounded-t-lg font-fredoka font-bold text-sm transition-all border-t-2
            ${activeTab === tab.id
              ? 'bg-[#111111] text-white border-gray-700'
              : 'bg-transparent text-gray-400 hover:text-white border-transparent'
            }
          `}
          style={
            activeTab === tab.id
              ? { borderTopColor: tab.color || '#3fb8bd' }
              : {}
          }
        >
          <div className="flex items-center gap-2">
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="px-1.5 py-0.5 bg-red-500 text-white rounded text-xs">
                {tab.badge}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
