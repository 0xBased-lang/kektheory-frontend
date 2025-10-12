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

// Get Reown Project ID from environment variable (trim to remove any whitespace/newlines)
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID?.trim()!

// Verify Project ID is set
if (!projectId) {
  throw new Error('NEXT_PUBLIC_REOWN_PROJECT_ID is not set in environment variables')
}

// Metadata for WalletConnect
// Use the actual deployment URL for proper domain validation
const appUrl = typeof window !== 'undefined'
  ? window.location.origin
  : process.env.NEXT_PUBLIC_APP_URL || 'https://kektech-nextjs.vercel.app'

const metadata = {
  name: 'KEKTECH NFT Collection',
  description: 'Mint KEKTECH NFTs on BasedAI Network',
  url: appUrl,
  icons: [`${appUrl}/images/logo.png`],
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
