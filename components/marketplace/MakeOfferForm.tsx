'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useKektvOffers } from '@/lib/hooks/useKektvOffers'
import { useAllVoucherMetadata } from '@/lib/hooks/useVoucherMetadata'
import { VOUCHER_IDS, VOUCHER_NAMES, meetsMinimumOffer } from '@/config/contracts/kektv-offers'

// Only show voucher IDs 1, 2, and 3 (exclude 0)
const VOUCHER_OPTIONS = [
  { id: VOUCHER_IDS.SILVER, name: VOUCHER_NAMES[VOUCHER_IDS.SILVER], icon: '🥈', color: 'gray' },
  { id: VOUCHER_IDS.GOLD, name: VOUCHER_NAMES[VOUCHER_IDS.GOLD], icon: '🥇', color: 'gray' },
  { id: VOUCHER_IDS.PLATINUM, name: VOUCHER_NAMES[VOUCHER_IDS.PLATINUM], icon: '💠', color: 'gray' },
]

/**
 * Form to create new offers on KEKTV vouchers (V2 - BASED Payments)
 * User selects voucher type, quantity, and total BASED to offer
 * No token approval needed - just send BASED!
 */
export function MakeOfferForm() {
  const { address } = useAccount()
  const { makeOffer, isPending } = useKektvOffers()
  const { metadataMap } = useAllVoucherMetadata()

  const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null)
  const [amount, setAmount] = useState('')
  const [totalBased, setTotalBased] = useState('')

  const handleMakeOffer = async () => {
    if (selectedVoucher === null || !amount || !totalBased) {
      alert('Please fill in all fields')
      return
    }

    const amountBigInt = BigInt(amount)
    const totalBasedBigInt = BigInt(Math.floor(Number(totalBased) * 100)) / 100n // Round to 2 decimals

    // Check minimum offer value
    if (!meetsMinimumOffer(amountBigInt, totalBasedBigInt * BigInt(10 ** 18))) {
      alert('Offer total must be at least 0.001 BASED')
      return
    }

    try {
      await makeOffer(selectedVoucher, amountBigInt, totalBased)
      alert('Offer created successfully! BASED escrowed in contract.')

      // Reset form
      setSelectedVoucher(null)
      setAmount('')
      setTotalBased('')
    } catch (error) {
      alert(`Make offer failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  if (!address) {
    return (
      <div className="text-center py-24">
        <div className="text-8xl mb-6">🔌</div>
        <h3 className="text-2xl font-bold text-[#daa520] mb-4 font-fredoka">Connect Your Wallet</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Connect your wallet to make offers on KEKTV vouchers
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Make Offer Form */}
      <div className="bg-gray-900/60 rounded-lg border border-[#daa520]/20 p-6">
        <h3 className="text-2xl font-bold text-[#daa520] mb-6 font-fredoka">
          Make an Offer
        </h3>

        <div className="space-y-4">
          {/* Select Voucher Type */}
          <div>
            <label className="block text-gray-400 mb-3 text-center">Select Voucher Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {VOUCHER_OPTIONS.map((voucher) => {
                const metadata = metadataMap[voucher.id]
                const mediaUrl = metadata?.animation_url || metadata?.image
                const voucherName = metadata?.name || voucher.name // Use metadata name if available
                const isSelected = selectedVoucher === voucher.id

                return (
                  <button
                    key={voucher.id}
                    onClick={() => setSelectedVoucher(voucher.id)}
                    className={`
                      bg-gradient-to-br from-[#daa520]/10 to-yellow-600/10 rounded-lg border overflow-hidden transition-all
                      ${isSelected
                        ? 'border-[#daa520] ring-2 ring-[#daa520]/50 shadow-lg shadow-[#daa520]/20'
                        : 'border-[#daa520]/20 hover:border-[#daa520]/40'
                      }
                    `}
                  >
                    <div className="p-4">
                      {/* Voucher Media */}
                      {mediaUrl ? (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden bg-black/20 mb-3">
                          <Image
                            src={mediaUrl}
                            alt={voucherName}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="text-center mb-3">
                          <div className="text-5xl mb-2">{voucher.icon}</div>
                        </div>
                      )}

                      {/* Voucher Name */}
                      <div className="text-center">
                        <div className="font-bold text-[#daa520] font-fredoka">
                          {voucherName}
                        </div>
                        {isSelected && (
                          <div className="text-xs text-[#daa520] mt-1">
                            ✓ Selected
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-400 mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter quantity (e.g., 3)"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#daa520] focus:outline-none"
            />
          </div>

          {/* Total BASED */}
          <div>
            <label className="block text-gray-400 mb-2">Total BASED to Offer</label>
            <input
              type="number"
              min="0.001"
              step="0.001"
              value={totalBased}
              onChange={(e) => setTotalBased(e.target.value)}
              placeholder="Enter total BASED (e.g., 500)"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#daa520] focus:outline-none"
            />
            <div className="text-xs text-gray-500 mt-1">
              Minimum total offer: 0.001 BASED
            </div>
          </div>

          {/* Price Per Voucher Preview */}
          {amount && totalBased && (
            <div className="bg-[#daa520]/10 border border-[#daa520]/30 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total BASED:</span>
                  <span className="text-2xl font-bold text-[#daa520]">
                    {Number(totalBased).toLocaleString()} BASED
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Price Per Voucher:</span>
                  <span className="text-gray-300">
                    {(Number(totalBased) / Number(amount)).toFixed(3)} BASED
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                BASED will be escrowed in contract until offer is accepted or canceled
              </div>
            </div>
          )}

          {/* Make Offer Button */}
          <button
            onClick={handleMakeOffer}
            disabled={isPending || !selectedVoucher || !amount || !totalBased}
            className={`
              w-full py-4 rounded-lg font-fredoka font-bold text-lg transition-all
              ${isPending || !selectedVoucher || !amount || !totalBased
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#daa520] to-yellow-600 text-black hover:scale-105 shadow-lg shadow-[#daa520]/20'
              }
            `}
          >
            {isPending ? '⏳ Creating Offer...' : '💰 Make Offer with BASED'}
          </button>
        </div>
      </div>
    </div>
  )
}
