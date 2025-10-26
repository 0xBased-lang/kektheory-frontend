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
      gradient: 'from-purple-500/10 to-purple-600/10',
      activeGradient: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-500'
    },
    {
      id: 'make',
      label: 'Make Offer',
      icon: '✍️',
      gradient: 'from-[#daa520]/10 to-yellow-600/10',
      activeGradient: 'from-[#daa520] to-yellow-600',
      borderColor: 'border-[#daa520]'
    },
    {
      id: 'yours',
      label: 'Your Offers',
      icon: '📤',
      gradient: 'from-cyan-500/10 to-cyan-600/10',
      activeGradient: 'from-cyan-500 to-cyan-600',
      borderColor: 'border-cyan-500'
    },
    {
      id: 'received',
      label: 'Received',
      icon: '📥',
      gradient: 'from-green-500/10 to-emerald-600/10',
      activeGradient: 'from-green-500 to-emerald-600',
      borderColor: 'border-green-500'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Sub-Navigation - Beautiful KEKTV Style Tab Bar */}
      <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl border border-[#daa520]/20 p-2 backdrop-blur-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {navButtons.map((button) => {
            const isActive = activeView === button.id

            return (
              <button
                key={button.id}
                onClick={() => setActiveView(button.id)}
                className={`
                  relative px-4 py-3 rounded-lg font-fredoka font-semibold transition-all duration-300
                  ${
                    isActive
                      ? `bg-gradient-to-r ${button.activeGradient} text-white shadow-lg shadow-${button.borderColor}/50 scale-105 border-2 ${button.borderColor}`
                      : `bg-gradient-to-br ${button.gradient} text-gray-300 border border-gray-700/50 hover:border-gray-600 hover:scale-102`
                  }
                `}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{button.icon}</span>
                  <span className="text-xs sm:text-sm whitespace-nowrap">{button.label}</span>
                </div>

                {/* Active indicator line */}
                {isActive && (
                  <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r ${button.activeGradient}`} />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {activeView === 'browse' && <BrowseOffers />}
        {activeView === 'make' && <MakeOfferForm />}
        {activeView === 'yours' && <YourOffers />}
        {activeView === 'received' && <ReceivedOffers />}
      </div>

      {/* Info Footer */}
      <div className="mt-8 p-6 bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-lg border border-[#daa520]/20">
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
  )
}
