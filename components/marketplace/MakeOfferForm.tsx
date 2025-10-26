'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useKektvOffers } from '@/lib/hooks/useKektvOffers'
import { useTechTokenApproval } from '@/lib/hooks/useTechTokenApproval'
import { useAllVoucherMetadata } from '@/lib/hooks/useVoucherMetadata'
import { VOUCHER_IDS, VOUCHER_NAMES, meetsMinimumOffer, calculateTotalPrice } from '@/config/contracts/kektv-offers'

const VOUCHER_OPTIONS = [
  { id: VOUCHER_IDS.GENESIS, name: VOUCHER_NAMES[VOUCHER_IDS.GENESIS], icon: '💎', color: 'purple' },
  { id: VOUCHER_IDS.SILVER, name: VOUCHER_NAMES[VOUCHER_IDS.SILVER], icon: '🥈', color: 'gray' },
  { id: VOUCHER_IDS.GOLD, name: VOUCHER_NAMES[VOUCHER_IDS.GOLD], icon: '🥇', color: '[#daa520]' },
  { id: VOUCHER_IDS.PLATINUM, name: VOUCHER_NAMES[VOUCHER_IDS.PLATINUM], icon: '💠', color: 'cyan' },
]

/**
 * Form to create new offers on KEKTV vouchers
 * User selects voucher type, quantity, and price (in TECH)
 */
export function MakeOfferForm() {
  const { address } = useAccount()
  const { makeOffer, isPending } = useKektvOffers()
  const approval = useTechTokenApproval()
  const { metadataMap, loading: metadataLoading } = useAllVoucherMetadata()

  const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null)
  const [amount, setAmount] = useState('')
  const [pricePerItem, setPricePerItem] = useState('')

  // Watch for successful approval and refetch approval status
  useEffect(() => {
    if (approval.isSuccess) {
      const timer = setTimeout(async () => {
        await approval.refetch()
        alert('TECH Token approved! You can now make offers.')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [approval.isSuccess, approval.refetch])

  const handleApproveTech = async () => {
    try {
      await approval.approveTech()
      // Success message shown by useEffect after refetch
    } catch (error) {
      alert(`TECH approval failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleMakeOffer = async () => {
    if (selectedVoucher === null || !amount || !pricePerItem) {
      alert('Please fill in all fields')
      return
    }

    const amountBigInt = BigInt(amount)
    const priceBigInt = BigInt(Math.floor(Number(pricePerItem) * 100)) / 100n // Round to 2 decimals

    // Check minimum offer value
    if (!meetsMinimumOffer(amountBigInt, priceBigInt * BigInt(10 ** 18))) {
      alert('Offer total must be at least 0.001 TECH')
      return
    }

    try {
      await makeOffer(selectedVoucher, amountBigInt, pricePerItem)
      alert('Offer created successfully! TECH tokens escrowed in contract.')

      // Reset form
      setSelectedVoucher(null)
      setAmount('')
      setPricePerItem('')
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
      {/* TECH Approval Step */}
      {approval.isLoading ? (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-blue-400">Checking TECH token approval status...</p>
          </div>
        </div>
      ) : !approval.isApproved && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-2 font-fredoka">
            💰 TECH Token Approval Required
          </h3>
          <p className="text-gray-400 mb-4">
            You need to approve the offers contract to escrow your TECH tokens. This is a one-time approval.
          </p>
          <button
            onClick={handleApproveTech}
            disabled={approval.isPending}
            className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-fredoka font-bold hover:bg-yellow-400 transition disabled:opacity-50"
          >
            {approval.isPending ? 'Approving...' : 'Approve TECH Token'}
          </button>
        </div>
      )}

      {/* Make Offer Form */}
      <div className="bg-gray-900/60 rounded-lg border border-[#daa520]/20 p-6">
        <h3 className="text-2xl font-bold text-[#daa520] mb-6 font-fredoka">
          Make an Offer
        </h3>

        <div className="space-y-4">
          {/* Select Voucher Type */}
          <div>
            <label className="block text-gray-400 mb-3">Select Voucher Type</label>
            <div className="grid grid-cols-2 gap-3">
              {VOUCHER_OPTIONS.map((voucher) => {
                const metadata = metadataMap[voucher.id]
                const mediaUrl = metadata?.animation_url || metadata?.image
                const isSelected = selectedVoucher === voucher.id

                return (
                  <button
                    key={voucher.id}
                    onClick={() => setSelectedVoucher(voucher.id)}
                    className={`
                      rounded-lg border p-4 transition-all text-left
                      ${isSelected
                        ? `bg-gradient-to-br from-${voucher.color}/20 to-${voucher.color}/20 border-${voucher.color} ring-2 ring-${voucher.color}/50`
                        : `bg-gradient-to-br from-${voucher.color}/10 to-${voucher.color}/10 border-${voucher.color}/30 hover:border-${voucher.color}/50`
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {mediaUrl ? (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-black/20 flex-shrink-0">
                          <Image
                            src={mediaUrl}
                            alt={voucher.name}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center bg-black/20 rounded-lg flex-shrink-0">
                          <div className="text-4xl">{voucher.icon}</div>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className={`font-bold text-${voucher.color} font-fredoka`}>
                          {voucher.name}
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

          {/* Price Per Item */}
          <div>
            <label className="block text-gray-400 mb-2">Price Per Voucher (TECH)</label>
            <input
              type="number"
              min="0.001"
              step="0.001"
              value={pricePerItem}
              onChange={(e) => setPricePerItem(e.target.value)}
              placeholder="Enter price (e.g., 500)"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#daa520] focus:outline-none"
            />
            <div className="text-xs text-gray-500 mt-1">
              Minimum total offer: 0.001 TECH
            </div>
          </div>

          {/* Total Price Preview */}
          {amount && pricePerItem && (
            <div className="bg-[#daa520]/10 border border-[#daa520]/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total TECH Required:</span>
                <span className="text-2xl font-bold text-[#daa520]">
                  {(Number(amount) * Number(pricePerItem)).toLocaleString()} TECH
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                TECH tokens will be escrowed in contract until offer is accepted or canceled
              </div>
            </div>
          )}

          {/* Make Offer Button */}
          <button
            onClick={handleMakeOffer}
            disabled={!approval.isApproved || isPending || !selectedVoucher || !amount || !pricePerItem}
            className={`
              w-full py-4 rounded-lg font-fredoka font-bold text-lg transition-all
              ${!approval.isApproved || isPending || !selectedVoucher || !amount || !pricePerItem
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#daa520] to-yellow-600 text-black hover:scale-105 shadow-lg shadow-[#daa520]/20'
              }
            `}
          >
            {!approval.isApproved ? '🔐 Approve TECH Token First' :
              isPending ? '⏳ Creating Offer...' :
              '💰 Make Offer'}
          </button>
        </div>
      </div>
    </div>
  )
}
