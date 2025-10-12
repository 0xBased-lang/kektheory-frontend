'use client'

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { basedChain } from '@/config/chains'
import { cn } from '@/lib/utils/cn'

/**
 * ConnectButton Component
 *
 * Wallet connection button with network switching and status display
 */
export function ConnectButton() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()

  // Check if connected to the correct chain
  const isCorrectChain = chain?.id === basedChain.id

  // Format address for display (0x1234...5678)
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // Not connected - show connect button
  if (!isConnected) {
    return (
      <div className="relative">
        <button
          onClick={async () => {
            try {
              console.log('Connect button clicked')
              console.log('Available connectors:', connectors)

              // Prioritize injected connector (MetaMask) if available
              const injectedConnector = connectors.find(
                (c) => c.type === 'injected' || c.id === 'injected'
              )
              const connector = injectedConnector || connectors[0]

              if (connector) {
                console.log('Using connector:', connector.name, connector.type)
                await connect({ connector })
              } else {
                console.error('No connectors available')
                alert('No wallet connectors available. Please install MetaMask or another Web3 wallet.')
              }
            } catch (error) {
              console.error('Connection error:', error)
              alert(`Failed to connect wallet: ${error instanceof Error ? error.message : 'Unknown error'}`)
            }
          }}
          disabled={isPending}
          className={cn(
            'rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white',
            'transition-colors hover:bg-blue-700',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          {isPending ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>
    )
  }

  // Connected but wrong chain - show switch network button
  if (!isCorrectChain) {
    return (
      <button
        onClick={() => switchChain({ chainId: basedChain.id })}
        className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
      >
        Switch to $BASED
      </button>
    )
  }

  // Connected and correct chain - show address and disconnect
  return (
    <div className="flex items-center gap-2">
      {/* Chain Badge */}
      <div className="hidden rounded-lg bg-green-100 px-3 py-2 dark:bg-green-900/20 sm:block">
        <span className="text-xs font-semibold text-green-800 dark:text-green-400">
          $BASED (32323)
        </span>
      </div>

      {/* Address Display */}
      {address && (
        <div className="hidden rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800 sm:block">
          <span className="text-sm font-mono text-gray-900 dark:text-gray-100">
            {formatAddress(address)}
          </span>
        </div>
      )}

      {/* Disconnect Button */}
      <button
        onClick={() => disconnect()}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
      >
        Disconnect
      </button>
    </div>
  )
}
