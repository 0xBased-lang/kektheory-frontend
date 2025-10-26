/**
 * KEKTV Offers Contract Configuration
 * Deployed on BasedAI Mainnet
 *
 * Contract: KektvVouchersOffers
 * Address: 0x591486eBd4CA9EFACB40BEb42e8c3D41d5364899
 * Network: BasedAI (32323)
 * Deployed: 2025-10-25
 */

import { Address } from 'viem'
import kektvOffersAbi from './kektv-offers-abi.json'

// ============ Contract Addresses ============

export const KEKTV_OFFERS_ADDRESS = '0x591486eBd4CA9EFACB40BEb42e8c3D41d5364899' as Address

export const KEKTV_VOUCHERS_ADDRESS = '0x7FEF981beE047227f848891c6C9F9dad11767a48' as Address

export const TECH_TOKEN_ADDRESS = '0x62E8D022CAf673906e62904f7BB5ae467082b546' as Address

// ============ Contract ABI ============

export const KEKTV_OFFERS_ABI = kektvOffersAbi

// ============ Network Configuration ============

export const BASEDAI_NETWORK = {
  id: 32323,
  name: 'BasedAI',
  nativeCurrency: {
    name: 'BASED',
    symbol: 'BASED',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.basedaibridge.com/rpc'],
    },
    public: {
      http: ['https://mainnet.basedaibridge.com/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BasedAI Explorer',
      url: 'https://explorer.bf1337.org',
    },
  },
} as const

// ============ Constants ============

/**
 * Minimum offer value in TECH tokens (wei)
 * 0.001 TECH = 1000000000000000 wei
 */
export const MIN_OFFER_VALUE = '1000000000000000' as const // 0.001 TECH

/**
 * KEKTV Voucher Token IDs
 */
export const VOUCHER_IDS = {
  GENESIS: 0,
  SILVER: 1,
  GOLD: 2,
  PLATINUM: 3,
} as const

/**
 * Voucher names for display
 */
export const VOUCHER_NAMES = {
  [VOUCHER_IDS.GENESIS]: 'Genesis',
  [VOUCHER_IDS.SILVER]: 'Silver',
  [VOUCHER_IDS.GOLD]: 'Gold',
  [VOUCHER_IDS.PLATINUM]: 'Platinum',
} as const

// ============ TypeScript Types ============

/**
 * Offer struct as returned by contract
 */
export interface Offer {
  offerId: bigint
  offerer: Address
  voucherOwner: Address
  tokenId: bigint
  amount: bigint
  offerPrice: bigint
  createdAt: bigint
  active: boolean
}

/**
 * Offer creation parameters
 */
export interface MakeOfferParams {
  tokenId: number
  amount: bigint
  offerPrice: bigint
}

/**
 * Complete contract configuration
 */
export const KEKTV_OFFERS_CONFIG = {
  address: KEKTV_OFFERS_ADDRESS,
  abi: KEKTV_OFFERS_ABI,
  network: BASEDAI_NETWORK,
  constants: {
    minOfferValue: MIN_OFFER_VALUE,
    voucherIds: VOUCHER_IDS,
    voucherNames: VOUCHER_NAMES,
  },
  relatedContracts: {
    vouchers: KEKTV_VOUCHERS_ADDRESS,
    techToken: TECH_TOKEN_ADDRESS,
  },
} as const

export type KektvOffersConfig = typeof KEKTV_OFFERS_CONFIG

// ============ Helper Functions ============

/**
 * Get voucher name by ID
 */
export function getVoucherName(tokenId: number): string {
  return VOUCHER_NAMES[tokenId as keyof typeof VOUCHER_NAMES] || 'Unknown'
}

/**
 * Check if offer value meets minimum
 */
export function meetsMinimumOffer(amount: bigint, pricePerToken: bigint): boolean {
  const totalPrice = amount * pricePerToken
  return totalPrice >= BigInt(MIN_OFFER_VALUE)
}

/**
 * Format offer price for display
 */
export function formatOfferPrice(price: bigint): string {
  return (Number(price) / 1e18).toFixed(4) + ' TECH'
}

/**
 * Calculate total offer price
 */
export function calculateTotalPrice(amount: bigint, pricePerToken: bigint): bigint {
  return amount * pricePerToken
}
