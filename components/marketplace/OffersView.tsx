'use client'
import { useState } from 'react'
import { BrowseOffers } from './BrowseOffers'
import { MakeOfferForm } from './MakeOfferForm'
import { YourOffers } from './YourOffers'
import { ReceivedOffers } from './ReceivedOffers'

type OfferView = 'browse' | 'make' | 'yours' | 'received'

/**
 * Main container for the Offers system with sub-navigation
 * Integrates into the KEKTV tab alongside Browse & List views
 */
export function OffersView() {
  const [activeView, setActiveView] = useState<OfferView>('browse')

  const navButtons: {
    id: OfferView
    label: string
  }[] = [
    {
      id: 'browse',
      label: 'Browse Offers',
    },
    {
      id: 'make',
      label: 'Make Offer',
    },
    {
      id: 'yours',
      label: 'Your Offers',
    },
    {
      id: 'received',
      label: 'Received',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Navigation Tabs - Centered like main tabs */}
      <div className="flex justify-center gap-3 flex-wrap">
        {navButtons.map((button) => {
          const isActive = activeView === button.id

          return (
            <button
              key={button.id}
              onClick={() => setActiveView(button.id)}
              className={`
                px-6 py-2 rounded-lg font-fredoka font-bold transition-all
                ${
                  isActive
                    ? 'bg-[#daa520] text-black shadow-lg shadow-[#daa520]/20'
                    : 'bg-gray-800 text-[#daa520] hover:text-white hover:bg-gray-700'
                }
              `}
            >
              {button.label}
            </button>
          )
        })}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {activeView === 'browse' && <BrowseOffers />}
        {activeView === 'make' && <MakeOfferForm />}
        {activeView === 'yours' && <YourOffers />}
        {activeView === 'received' && <ReceivedOffers />}
      </div>
    </div>
  )
}
