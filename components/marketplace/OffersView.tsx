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
    icon: string
    gradient: string
    activeGradient: string
    borderColor: string
  }[] = [
    {
      id: 'browse',
      label: 'Browse Offers',
      icon: '🔍',
      gradient: 'from-gray-800/40 to-gray-700/40',
      activeGradient: 'from-gray-700 to-gray-600',
      borderColor: 'border-gray-500'
    },
    {
      id: 'make',
      label: 'Make Offer',
      icon: '✍️',
      gradient: 'from-gray-800/40 to-gray-700/40',
      activeGradient: 'from-gray-700 to-gray-600',
      borderColor: 'border-gray-500'
    },
    {
      id: 'yours',
      label: 'Your Offers',
      icon: '📤',
      gradient: 'from-gray-800/40 to-gray-700/40',
      activeGradient: 'from-gray-700 to-gray-600',
      borderColor: 'border-gray-500'
    },
    {
      id: 'received',
      label: 'Received',
      icon: '📥',
      gradient: 'from-gray-800/40 to-gray-700/40',
      activeGradient: 'from-gray-700 to-gray-600',
      borderColor: 'border-gray-500'
    },
  ]

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar Navigation - Vertical Tabs */}
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
                    relative px-6 py-3 rounded-lg font-fredoka font-semibold transition-all duration-300 whitespace-nowrap
                    ${
                      isActive
                        ? `bg-gradient-to-r ${button.activeGradient} text-white shadow-lg border-2 ${button.borderColor}`
                        : `bg-gradient-to-br ${button.gradient} text-gray-300 border border-gray-700/50 hover:border-gray-600`
                    }
                  `}
                >
                  <span className="mr-2">{button.icon}</span>
                  {button.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Desktop: Vertical Sidebar */}
        <div className="hidden lg:block bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl border border-[#daa520]/20 p-3 backdrop-blur-sm">
          <div className="space-y-2">
            {navButtons.map((button) => {
              const isActive = activeView === button.id

              return (
                <button
                  key={button.id}
                  onClick={() => setActiveView(button.id)}
                  className={`
                    relative w-full px-4 py-4 rounded-lg font-fredoka font-semibold transition-all duration-300 text-left
                    ${
                      isActive
                        ? `bg-gradient-to-r ${button.activeGradient} text-white shadow-lg border-2 ${button.borderColor}`
                        : `bg-gradient-to-br ${button.gradient} text-gray-300 border border-gray-700/50 hover:border-gray-600 hover:scale-102`
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{button.icon}</span>
                    <span className="text-sm">{button.label}</span>
                  </div>

                  {/* Active indicator line (left side) */}
                  {isActive && (
                    <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-12 rounded-r-full bg-gradient-to-b ${button.activeGradient}`} />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 space-y-6">
        <div className="min-h-[500px]">
          {activeView === 'browse' && <BrowseOffers />}
          {activeView === 'make' && <MakeOfferForm />}
          {activeView === 'yours' && <YourOffers />}
          {activeView === 'received' && <ReceivedOffers />}
        </div>

        {/* Info Footer */}
        <div className="p-6 bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-lg border border-[#daa520]/20">
        <h3 className="text-lg font-fredoka font-bold text-[#daa520] mb-3">
          How KEKTV Offers Work
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <h4 className="font-semibold text-[#daa520] mb-2">Making Offers</h4>
            <ul className="space-y-1">
              <li>• Choose voucher type and quantity</li>
              <li>• Set your total offer in BASED</li>
              <li>• Your BASED is held safely in escrow</li>
              <li>• Wait for the seller to accept or reject</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#daa520] mb-2">Accepting Offers</h4>
            <ul className="space-y-1">
              <li>• Review offers on your vouchers</li>
              <li>• Accept to sell instantly for BASED</li>
              <li>• Reject if price is too low</li>
              <li>• Trade completes automatically</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#daa520]/20">
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-[#daa520]">Note:</span> Offers are paid in BASED (native token).
            Your funds are always safe in escrow and can be retrieved by cancelling your offer.
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}
