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
      alert('Offer accepted successfully! Vouchers transferred to buyer, TECH transferred to you.')
      onSuccess?.()
    } catch (error) {
      alert(`Accept failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleReject = async () => {
    try {
      await rejectOffer(offer.offerId)
      alert('Offer rejected! TECH refunded to offerer.')
      onSuccess?.()
    } catch (error) {
      alert(`Reject failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Calculate total offer price
  const totalPrice = offer.offerPrice * offer.amount

  return (
    <div className="bg-gradient-to-br from-[#daa520]/10 to-yellow-600/10 rounded-lg border border-[#daa520]/20 overflow-hidden hover:border-[#daa520]/40 transition-all">
      <div className="p-6">
        {/* Voucher Media */}
        {mediaUrl ? (
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-black/20 mb-4">
            <Image
              src={mediaUrl}
              alt={voucherName}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-black/20 rounded-lg mb-4">
            <div className="text-6xl">🎫</div>
          </div>
        )}

        {/* Voucher Info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-[#daa520] font-fredoka">
            {voucherName}
          </h3>
        </div>

        {/* Offer Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Offerer:</span>
            <span className="text-white font-mono text-xs">
              {offer.offerer.slice(0, 6)}...{offer.offerer.slice(-4)}
            </span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Quantity:</span>
            <span className="text-white font-bold">{offer.amount.toString()}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Price/Each:</span>
            <span className="text-white font-bold">
              {formatOfferPrice(offer.offerPrice)}
            </span>
          </div>
          <div className="flex justify-between text-gray-400 border-t border-gray-800 pt-2 mt-2">
            <span className="font-bold">Total:</span>
            <span className="text-[#daa520] font-bold text-lg">
              {formatOfferPrice(totalPrice)}
            </span>
          </div>
          <div className="text-xs text-gray-500 text-center mt-1">
            TECH tokens escrowed in contract
          </div>
        </div>

        {/* Action Buttons */}
        {isYourOffer ? (
          <div className="mt-4 py-3 rounded-lg bg-gray-700 text-gray-400 text-center font-fredoka font-bold">
            Your Offer
          </div>
        ) : isYourVoucher && address ? (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={handleAccept}
              disabled={isPending}
              className="py-3 rounded-lg font-fredoka font-bold transition-all bg-gradient-to-r from-[#daa520] to-yellow-600 text-black hover:scale-105 shadow-lg shadow-[#daa520]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Processing...' : '✅ Accept'}
            </button>
            <button
              onClick={handleReject}
              disabled={isPending}
              className="py-3 rounded-lg font-fredoka font-bold transition-all bg-red-500/20 text-red-400 hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Processing...' : '🚫 Reject'}
            </button>
          </div>
        ) : (
          <div className="mt-4 py-3 rounded-lg bg-gray-800 text-gray-500 text-center font-fredoka font-bold text-sm">
            Connect wallet to accept
          </div>
        )}
      </div>
    </div>
  )
}
