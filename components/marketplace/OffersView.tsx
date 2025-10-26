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

  const navButtons: { id: OfferView; label: string; icon: string }[] = [
    { id: 'browse', label: 'Browse Offers', icon: '🔍' },
    { id: 'make', label: 'Make Offer', icon: '✍️' },
    { id: 'yours', label: 'Your Offers', icon: '📤' },
    { id: 'received', label: 'Received', icon: '📥' },
  ]

  return (
    <div className="space-y-6">
      {/* Sub-Navigation */}
      <div className="flex flex-wrap gap-3">
        {navButtons.map((button) => (
          <button
            key={button.id}
            onClick={() => setActiveView(button.id)}
            className={`
              px-6 py-3 rounded-lg font-fredoka font-semibold transition-all
              ${
                activeView === button.id
                  ? 'bg-gradient-to-r from-[#daa520] to-[#b8860b] text-black shadow-lg shadow-[#daa520]/50 scale-105'
                  : 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 text-gray-300 border border-[#daa520]/30 hover:border-[#daa520]/60 hover:scale-105'
              }
            `}
          >
            <span className="mr-2">{button.icon}</span>
            {button.label}
          </button>
        ))}
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
