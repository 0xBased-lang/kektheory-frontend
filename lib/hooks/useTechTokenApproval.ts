import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { useEffect } from 'react'
import { KEKTV_OFFERS_ADDRESS, TECH_TOKEN_ADDRESS } from '@/config/contracts/kektv-offers'

/**
 * Standard ERC-20 ABI for approve and allowance functions
 */
const ERC20_ABI = [
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

/**
 * Maximum uint256 value for unlimited approval
 * This is a common pattern for ERC-20 approvals to avoid repeated transactions
 */
const MAX_UINT256 = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

/**
 * Hook to manage TECH token approval for the offers contract
 *
 * TECH is an ERC-20 token that must be approved for the offers contract
 * to escrow TECH tokens when making offers.
 *
 * Unlike ERC-1155 (setApprovalForAll), ERC-20 uses allowance system:
 * - User approves a specific amount (we use max for convenience)
 * - Contract can then transferFrom up to that amount
 */
export function useTechTokenApproval() {
  const { address } = useAccount()
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // Check current TECH allowance for offers contract
  const { data: allowance, isLoading, refetch } = useReadContract({
    address: TECH_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, KEKTV_OFFERS_ADDRESS] : undefined,
    query: {
      enabled: !!address, // Only query when wallet connected
      staleTime: 0, // Always fetch fresh data
      gcTime: 0, // Don't cache results
    },
  })

  // User is approved if allowance > 0
  const isApproved = allowance ? allowance > 0n : false

  // Debug logging
  useEffect(() => {
    if (address) {
      console.log('💰 TECH Approval Status:', {
        userAddress: address,
        offersContract: KEKTV_OFFERS_ADDRESS,
        allowance: allowance ? allowance.toString() : '0',
        isApproved,
        isLoading,
      })
    }
  }, [address, allowance, isApproved, isLoading])

  /**
   * Approve offers contract to spend TECH tokens
   * Uses max uint256 for unlimited approval (standard practice)
   */
  const approveTech = async () => {
    if (!address) throw new Error('Wallet not connected')

    try {
      console.log('✅ Approving TECH for offers contract...')

      const hash = await writeContractAsync({
        address: TECH_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [KEKTV_OFFERS_ADDRESS, MAX_UINT256],
        gas: 100000n, // ERC-20 approve is simple, doesn't need much gas
      })

      return hash
    } catch (error) {
      throw error
    }
  }

  return {
    isApproved,
    allowance: allowance || 0n,
    isLoading,
    approveTech,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
    refetch,
  }
}
