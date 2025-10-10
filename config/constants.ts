/**
 * KEKTECH Smart Contract Configuration
 *
 * CRITICAL: These values are verified from production
 * DO NOT modify without consulting documentation
 */

// Smart Contract Address (Verified on BasedAI Chain)
export const KEKTECH_CONTRACT_ADDRESS =
  '0x40B6184b901334C0A88f528c1A0a1de7a77490f1' as const

// Chain Configuration
export const CHAIN_ID = 32323 as const // BasedAI Chain

// Collection Parameters (Read from Smart Contract)
export const MAX_SUPPLY = 4200 as const
export const MAX_MINT_PER_TX = 50 as const

// Backend API Endpoints
export const METADATA_API_URL = 'https://kektech.xyz/api/metadata' as const
export const RANKING_API_URL = 'https://api.kektech.xyz' as const
export const IMAGE_API_URL = 'https://kektech.xyz/api/image' as const

// Block Explorer
export const EXPLORER_URL = 'https://explorer.bf1337.org' as const

// RPC Endpoint
export const RPC_URL = 'https://mainnet.basedaibridge.com/rpc/' as const
