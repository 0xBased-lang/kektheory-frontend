'use client'

import { useState } from 'react'
import { useMint } from '@/lib/hooks/useMint'
import { EXPLORER_URL } from '@/config/constants'

/**
 * MintForm Component
 *
 * NFT minting interface with:
 * - Amount selector
 * - Price calculation
 * - Transaction handling
 * - Loading states
 * - Error handling
 * - Success feedback
 */
export function MintForm() {
  const {
    mintAmount,
    setMintAmount,
    isConnected,
    isWritePending,
    isConfirming,
    isConfirmed,
    hash,
    error,
    mint,
    maxMintPerTx,
  } = useMint()

  const [localError, setLocalError] = useState<string | null>(null)

  // Handle mint button click
  const handleMint = async () => {
    setLocalError(null)
    try {
      await mint()
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Mint failed')
    }
  }

  // Handle amount change
  const handleAmountChange = (value: number) => {
    if (value >= 1 && value <= maxMintPerTx) {
      setMintAmount(value)
      setLocalError(null)
    }
  }

  // If not connected, show connect prompt
  if (!isConnected) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Connect Your Wallet
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Please connect your wallet to start minting KEKTECH NFTs
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Click the "Connect Wallet" button in the header
        </p>
      </div>
    )
  }

  // If transaction confirmed, show success
  if (isConfirmed && hash) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center dark:border-green-900 dark:bg-green-900/20">
        <div className="mb-4 text-5xl">🎉</div>
        <h3 className="mb-2 text-lg font-semibold text-green-900 dark:text-green-100">
          Mint Successful!
        </h3>
        <p className="mb-4 text-green-700 dark:text-green-300">
          Successfully minted {mintAmount} KEKTECH NFT{mintAmount > 1 ? 's' : ''}!
        </p>
        <div className="space-y-2">
          <a
            href={`${EXPLORER_URL}/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            View Transaction ↗
          </a>
          <button
            onClick={() => window.location.reload()}
            className="ml-2 inline-block rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 dark:hover:bg-green-900/30"
          >
            Mint More
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Mint KEKTECH NFTs
      </h2>

      {/* Amount Selector */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Amount (Max {maxMintPerTx} per transaction)
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleAmountChange(mintAmount - 1)}
            disabled={mintAmount <= 1 || isWritePending || isConfirming}
            className="rounded-lg bg-gray-200 px-4 py-2 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            max={maxMintPerTx}
            value={mintAmount}
            onChange={(e) => handleAmountChange(parseInt(e.target.value) || 1)}
            disabled={isWritePending || isConfirming}
            className="w-20 rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-lg font-semibold text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={() => handleAmountChange(mintAmount + 1)}
            disabled={mintAmount >= maxMintPerTx || isWritePending || isConfirming}
            className="rounded-lg bg-gray-200 px-4 py-2 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            +
          </button>
        </div>
      </div>

      {/* Price Display */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Price per NFT:</span>
          <span className="font-semibold">0.001 ETH</span>
        </div>
        <div className="mt-2 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
          <span>Total Cost:</span>
          <span>{(0.001 * mintAmount).toFixed(3)} ETH</span>
        </div>
      </div>

      {/* Error Display */}
      {(error || localError) && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/20">
          <p className="text-sm text-red-800 dark:text-red-200">
            {localError || error?.message || 'An error occurred'}
          </p>
        </div>
      )}

      {/* Mint Button */}
      <button
        onClick={handleMint}
        disabled={isWritePending || isConfirming}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isWritePending
          ? 'Waiting for approval...'
          : isConfirming
            ? 'Confirming transaction...'
            : `Mint ${mintAmount} NFT${mintAmount > 1 ? 's' : ''}`}
      </button>

      {/* Transaction Hash Display */}
      {hash && !isConfirmed && (
        <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <p className="mb-2 text-sm font-medium text-blue-900 dark:text-blue-100">
            Transaction submitted!
          </p>
          <a
            href={`${EXPLORER_URL}/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            View on Explorer ↗
          </a>
        </div>
      )}

      {/* Info */}
      <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        Your NFT will be minted on the $BASED Chain (32323)
      </p>
    </div>
  )
}
