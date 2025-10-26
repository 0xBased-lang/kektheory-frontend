import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
  useReadContract,
} from 'wagmi'
import { KEKTV_OFFERS_ADDRESS, KEKTV_OFFERS_ABI } from '@/config/contracts/kektv-offers'
import { basedChain } from '@/config/chains'

/**
 * Hook for KEKTV Offers operations
 *
 * Handles:
 * - Making offers on KEKTV vouchers (uses TECH token escrow)
 * - Accepting offers (if you own the vouchers)
 * - Canceling offers (if you made them)
 * - Rejecting offers (if they're on your vouchers)
 * - Querying offers by token, user, etc.
 * - Auto network switching to BasedAI
 */
export function useKektvOffers() {
  const { address, chainId } = useAccount()
  const { switchChainAsync } = useSwitchChain()
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  /**
   * Make an offer on a KEKTV voucher
   * @param tokenId - Voucher type ID (0-3: Genesis, Silver, Gold, Platinum)
   * @param amount - Number of vouchers to offer on
   * @param pricePerItemString - Price per voucher in TECH (e.g., "500")
   */
  const makeOffer = async (
    tokenId: number,
    amount: bigint,
    pricePerItemString: string
  ) => {
    if (!address) throw new Error('Wallet not connected')

    try {
      // Auto-switch to BasedAI Chain if on wrong network
      if (chainId !== basedChain.id) {
        await switchChainAsync({ chainId: basedChain.id })
      }

      // Convert price string to wei (1 TECH = 10^18 wei)
      const pricePerItem = BigInt(pricePerItemString) * BigInt(10 ** 18)

      console.log('💰 Make Offer:', {
        tokenId,
        amount: amount.toString(),
        pricePerItem: (pricePerItem / BigInt(10 ** 18)).toString() + ' TECH',
        totalCost: ((pricePerItem * amount) / BigInt(10 ** 18)).toString() + ' TECH',
      })

      // Make the offer (TECH tokens will be escrowed in contract)
      const hash = await writeContractAsync({
        address: KEKTV_OFFERS_ADDRESS,
        abi: KEKTV_OFFERS_ABI,
        functionName: 'makeOffer',
        args: [BigInt(tokenId), amount, pricePerItem],
        gas: 500000n, // Fixed gas limit to avoid RPC estimation issues
      })

      return hash
    } catch (error) {
      throw error
    }
  }

  /**
   * Accept an offer on your vouchers
   * @param offerId - The offer ID to accept
   */
  const acceptOffer = async (offerId: bigint) => {
    if (!address) throw new Error('Wallet not connected')

    try {
      // Auto-switch to BasedAI Chain if on wrong network
      if (chainId !== basedChain.id) {
        await switchChainAsync({ chainId: basedChain.id })
      }

      console.log('✅ Accepting Offer:', offerId.toString())

      // Accept the offer (transfers vouchers to buyer, TECH to seller)
      const hash = await writeContractAsync({
        address: KEKTV_OFFERS_ADDRESS,
        abi: KEKTV_OFFERS_ABI,
        functionName: 'acceptOffer',
        args: [offerId],
        gas: 500000n,
      })

      return hash
    } catch (error) {
      throw error
    }
  }

  /**
   * Cancel your own offer
   * @param offerId - The offer ID to cancel
   */
  const cancelOffer = async (offerId: bigint) => {
    if (!address) throw new Error('Wallet not connected')

    try {
      // Auto-switch to BasedAI Chain if on wrong network
      if (chainId !== basedChain.id) {
        await switchChainAsync({ chainId: basedChain.id })
      }

      console.log('❌ Canceling Offer:', offerId.toString())

      // Cancel the offer (refunds TECH to offerer)
      const hash = await writeContractAsync({
        address: KEKTV_OFFERS_ADDRESS,
        abi: KEKTV_OFFERS_ABI,
        functionName: 'cancelOffer',
        args: [offerId],
        gas: 300000n, // Lower gas for cancel
      })

      return hash
    } catch (error) {
      throw error
    }
  }

  /**
   * Reject an offer on your vouchers
   * @param offerId - The offer ID to reject
   */
  const rejectOffer = async (offerId: bigint) => {
    if (!address) throw new Error('Wallet not connected')

    try {
      // Auto-switch to BasedAI Chain if on wrong network
      if (chainId !== basedChain.id) {
        await switchChainAsync({ chainId: basedChain.id })
      }

      console.log('🚫 Rejecting Offer:', offerId.toString())

      // Reject the offer (refunds TECH to offerer)
      const hash = await writeContractAsync({
        address: KEKTV_OFFERS_ADDRESS,
        abi: KEKTV_OFFERS_ABI,
        functionName: 'rejectOffer',
        args: [offerId],
        gas: 300000n, // Lower gas for reject
      })

      return hash
    } catch (error) {
      throw error
    }
  }

  return {
    // Write functions
    makeOffer,
    acceptOffer,
    cancelOffer,
    rejectOffer,

    // Transaction states
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  }
}

/**
 * Hook to query offers by token ID
 * @param tokenId - Voucher type ID (0-3)
 */
export function useTokenOffers(tokenId: number | null) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: KEKTV_OFFERS_ADDRESS,
    abi: KEKTV_OFFERS_ABI,
    functionName: 'getTokenOffers',
    args: tokenId !== null ? [BigInt(tokenId)] : undefined,
    query: {
      enabled: tokenId !== null,
    },
  })

  return {
    offerIds: (data as bigint[]) || [],
    isLoading,
    error,
    refetch,
  }
}

/**
 * Hook to query offers by user (offers user made)
 * @param userAddress - User's wallet address
 */
export function useUserOffers(userAddress: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: KEKTV_OFFERS_ADDRESS,
    abi: KEKTV_OFFERS_ABI,
    functionName: 'getUserOffers',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress,
    },
  })

  return {
    offerIds: (data as bigint[]) || [],
    isLoading,
    error,
    refetch,
  }
}

/**
 * Hook to query received offers (offers on user's vouchers)
 * @param userAddress - User's wallet address
 */
export function useReceivedOffers(userAddress: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: KEKTV_OFFERS_ADDRESS,
    abi: KEKTV_OFFERS_ABI,
    functionName: 'getReceivedOffers',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress,
    },
  })

  return {
    offerIds: (data as bigint[]) || [],
    isLoading,
    error,
    refetch,
  }
}

/**
 * Hook to get details of a specific offer
 * @param offerId - The offer ID to fetch
 */
export function useOfferDetails(offerId: bigint | null) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: KEKTV_OFFERS_ADDRESS,
    abi: KEKTV_OFFERS_ABI,
    functionName: 'getOffer',
    args: offerId !== null ? [offerId] : undefined,
    query: {
      enabled: offerId !== null,
    },
  })

  return {
    offer: data as Offer | undefined,
    isLoading,
    error,
    refetch,
  }
}
