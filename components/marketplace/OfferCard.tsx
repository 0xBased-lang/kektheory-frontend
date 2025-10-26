'use client'

import Image from 'next/image'
import { useAccount } from 'wagmi'
import { useKektvOffers } from '@/lib/hooks/useKektvOffers'
import { useAllVoucherMetadata } from '@/lib/hooks/useVoucherMetadata'
import { getVoucherName, formatOfferPrice } from '@/config/contracts/kektv-offers'
import type { Offer } from '@/config/contracts/kektv-offers'

interface OfferCardProps {
  offer: Offer
  onSuccess?: () => void
}

/**
 * Individual offer card component
 * Matches the style of marketplace listing cards
 */
export function OfferCard({ offer, onSuccess }: OfferCardProps) {
  const { address } = useAccount()
  const { acceptOffer, rejectOffer, isPending } = useKektvOffers()
  const { metadataMap } = useAllVoucherMetadata()

  const metadata = metadataMap[Number(offer.tokenId)]
  const mediaUrl = metadata?.animation_url || metadata?.image
  const voucherName = metadata?.name || getVoucherName(Number(offer.tokenId))

  const isYourOffer = offer.offerer.toLowerCase() === address?.toLowerCase()
  const isYourVoucher = !offer.voucherOwner || offer.voucherOwner === '0x0000000000000000000000000000000000000000'

  const handleAccept = async () => {
    try {
      await acceptOffer(offer.offerId)
      alert('Offer accepted successfully! Vouchers transferred to buyer, BASED transferred to you.')
      onSuccess?.()
    } catch (error) {
      alert(`Accept failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleReject = async () => {
    try {
      await rejectOffer(offer.offerId)
      alert('Offer rejected! BASED refunded to offerer.')
      onSuccess?.()
    } catch (error) {
      alert(`Reject failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Calculate total offer price
  const totalPrice = offer.offerPrice * offer.amount

  return (
    <div className="rounded-xl border p-4 transition-all bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/30 hover:border-[#daa520]/50">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Voucher Image */}
        {mediaUrl ? (
          <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-black/20 flex-shrink-0">
            <Image
              src={mediaUrl}
              alt={voucherName}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-full sm:w-32 h-32 flex items-center justify-center bg-black/20 rounded-lg flex-shrink-0">
            <div className="text-6xl">🎫</div>
          </div>
        )}

        {/* Offer Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-white text-lg font-fredoka">
                {voucherName}
              </h4>
              <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#daa520] to-yellow-600 text-black text-sm font-bold flex-shrink-0">
                ×{offer.amount.toString()}
              </div>
            </div>

            <div className="space-y-1 text-sm mb-3">
              <div className="flex justify-between text-gray-400">
                <span>Offerer:</span>
                <span className="text-white font-mono text-xs">
                  {offer.offerer.slice(0, 6)}...{offer.offerer.slice(-4)}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Price/Each:</span>
                <span className="text-white font-bold">
                  {formatOfferPrice(offer.offerPrice)}
                </span>
              </div>
              <div className="flex justify-between text-gray-400 border-t border-gray-800 pt-1 mt-1">
                <span className="font-bold">Total:</span>
                <span className="text-[#daa520] font-bold">
                  {formatOfferPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isYourOffer ? (
            <div className="py-2 rounded-lg bg-gray-700 text-gray-400 text-center font-fredoka font-bold text-sm">
              Your Offer
            </div>
          ) : isYourVoucher && address ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAccept}
                disabled={isPending}
                className="py-2 rounded-lg font-fredoka font-bold transition-all bg-gradient-to-r from-[#daa520] to-yellow-600 text-black hover:scale-105 shadow-lg shadow-[#daa520]/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isPending ? 'Processing...' : '✅ Accept'}
              </button>
              <button
                onClick={handleReject}
                disabled={isPending}
                className="py-2 rounded-lg font-fredoka font-bold transition-all bg-red-500/20 text-red-400 hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isPending ? 'Processing...' : '🚫 Reject'}
              </button>
            </div>
          ) : (
            <div className="py-2 rounded-lg bg-gray-800 text-gray-500 text-center font-fredoka font-bold text-sm">
              Connect wallet to accept
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
