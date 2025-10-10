import { defineChain } from 'viem'

/**
 * $BASED Chain Configuration
 *
 * CRITICAL: Chain ID is 32323 (verified from production VPS)
 * DO NOT change this value without verifying with the backend
 */
export const basedChain = defineChain({
  id: 32323,
  name: 'BasedAI',
  nativeCurrency: {
    name: 'BASED',
    symbol: 'BASED',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.basedaibridge.com/rpc/'],
    },
    public: {
      http: ['https://mainnet.basedaibridge.com/rpc/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BasedAI Explorer',
      url: 'https://explorer.bf1337.org',
    },
  },
  testnet: false,
})
