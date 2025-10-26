'use client'
import { useState } from 'react'
import { BrowseOffers } from './BrowseOffers'
import { MakeOfferForm } from './MakeOfferForm'
import { YourOffers } from './YourOffers'

type OfferView = 'marketplace' | 'activity' | 'create'

/**
 * Main container for the Offers system with enhanced UX
 *
 * Architecture:
 * - All Offers: Browse all offers with smart "For You" filtering
 * - My Activity: View offers you can accept + offers you've created
 * - Create: Make new offers
 */
export function OffersView() {
  const [activeView, setActiveView] = useState<OfferView>('marketplace')

  const navButtons: {
    id: OfferView
    label: string
    icon: string
  }[] = [
    {
      id: 'marketplace',
      label: 'All Offers',
      icon: '🏪',
    },
    {
      id: 'activity',
      label: 'My Activity',
      icon: '💼',
    },
    {
      id: 'create',
      label: 'Create Offer',
      icon: '➕',
    },
  ]

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar Navigation */}
      <div className="lg:w-64 flex-shrink-0">
        {/* Mobile: Horizontal scrollable */}
        <div className="lg:hidden overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {navButtons.map((button) => {
              const isActive = activeView === button.id

              return (
                <button
                  key={button.id}
                  onClick={() => setActiveView(button.id)}
                  className={`
                    px-6 py-2 rounded-lg font-fredoka font-bold transition-all whitespace-nowrap flex items-center gap-2
                    ${
                      isActive
                        ? 'bg-[#daa520] text-black shadow-lg shadow-[#daa520]/20'
                        : 'bg-gray-800 text-[#daa520] hover:text-white hover:bg-gray-700'
                    }
                  `}
                >
                  <span>{button.icon}</span>
                  <span>{button.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Desktop: Vertical Sidebar */}
        <div className="hidden lg:block bg-gray-900/60 rounded-lg border border-[#daa520]/20 p-3">
          <div className="space-y-2">
            {navButtons.map((button) => {
              const isActive = activeView === button.id

              return (
                <button
                  key={button.id}
                  onClick={() => setActiveView(button.id)}
                  className={`
                    w-full px-4 py-3 rounded-lg font-fredoka font-bold transition-all text-left flex items-center gap-2
                    ${
                      isActive
                        ? 'bg-[#daa520] text-black shadow-lg shadow-[#daa520]/20'
                        : 'bg-gray-800 text-[#daa520] hover:text-white hover:bg-gray-700'
                    }
                  `}
                >
                  <span>{button.icon}</span>
                  <span>{button.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-[500px]">
        {activeView === 'marketplace' && <BrowseOffers />}
        {activeView === 'create' && <MakeOfferForm />}
        {activeView === 'activity' && <YourOffers />}
      </div>
    </div>
  )
}
