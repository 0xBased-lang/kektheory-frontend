import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { basedChain } from './chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'

/**
 * Wagmi Configuration
 *
 * CRITICAL: This configures Web3 wallet connectivity
 * - Chain ID 32323 ($BASED)
 * - Reown Project ID: ee738e17f6b483db152c5e439167f805
 * - Multi-wallet support: MetaMask, WalletConnect, Coinbase Wallet
 */

// Get Reown Project ID from environment variable
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!

// Verify Project ID is set
if (!projectId) {
  throw new Error('NEXT_PUBLIC_REOWN_PROJECT_ID is not set in environment variables')
}

// Metadata for WalletConnect
const metadata = {
  name: 'KEKTECH NFT Collection',
  description: 'Mint KEKTECH NFTs on BasedAI Network',
  url: 'https://www.kektech.xyz',
  icons: ['https://www.kektech.xyz/images/logo.png'],
}

// Create Wagmi configuration
export const config = createConfig({
  chains: [basedChain],
  connectors: [
    // WalletConnect (Reown AppKit)
    walletConnect({
      projectId,
      metadata,
      showQrModal: true,
    }),
    // MetaMask and other injected wallets
    injected({
      shimDisconnect: true,
    }),
    // Coinbase Wallet
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [basedChain.id]: http(),
  },
})

// Declare module for TypeScript
declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
