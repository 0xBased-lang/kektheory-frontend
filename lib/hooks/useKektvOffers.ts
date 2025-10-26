import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
  useReadContract,
} from 'wagmi'
import { KEKTV_OFFERS_ADDRESS, KEKTV_OFFERS_ABI, type Offer } from '@/config/contracts/kektv-offers'
import { basedChain } from '@/config/chains'

/**
 * Hook for KEKTV Offers operations (V2 - BASED Payments)
 *
 * Handles:
 * - Making offers on KEKTV vouchers (uses BASED native token)
 * - Accepting offers (if you own the vouchers)
 * - Canceling offers (if you made them)
 * - Rejecting offers (if they're on your vouchers)
 * - Querying offers by token, user, etc.
 * - Auto network switching to BasedAI
 *
 * V2 Changes:
 * - Uses BASED (native token) instead of TECH (ERC-20)
 * - No token approval needed
 * - Simpler UX for users
 */
export function useKektvOffers() {
  const { address, chainId } = useAccount()
  const { switchChainAsync } = useSwitchChain()
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  /**
   * Make an offer on a KEKTV voucher (V2 - pays in BASED)
   * @param tokenId - Voucher type ID (0-3: Genesis, Silver, Gold, Platinum)
   * @param amount - Number of vouchers to offer on
   * @param totalBasedString - Total BASED to offer (e.g., "500" = 500 BASED total)
   * @param voucherOwner - Address that owns the vouchers (can be zero address for general offers)
   */
  const makeOffer = async (
    tokenId: number,
    amount: bigint,
    totalBasedString: string,
    voucherOwner: string = '0x0000000000000000000000000000000000000000'
  ) => {
    if (!address) throw new Error('Wallet not connected')

    try {
      // Auto-switch to BasedAI Chain if on wrong network
      if (chainId !== basedChain.id) {
        await switchChainAsync({ chainId: basedChain.id })
      }

      // Convert BASED string to wei (1 BASED = 10^18 wei)
      const totalBased = BigInt(totalBasedString) * BigInt(10 ** 18)

      console.log('💰 Make Offer (V2 - BASED):', {
        tokenId,
        amount: amount.toString(),
        totalBased: (totalBased / BigInt(10 ** 18)).toString() + ' BASED',
        voucherOwner,
      })

      // Make the offer (send BASED as value, escrowed in contract)
      const hash = await writeContractAsync({
        address: KEKTV_OFFERS_ADDRESS,
        abi: KEKTV_OFFERS_ABI,
        functionName: 'makeOffer',
        args: [BigInt(tokenId), amount, voucherOwner as `0x${string}`],
        value: totalBased, // Send BASED as payment
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

      // Accept the offer (transfers vouchers to buyer, BASED to seller)
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

      // Cancel the offer (refunds BASED to offerer)
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

      // Reject the offer (refunds BASED to offerer)
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
      refetchInterval: 5000, // Auto-refetch every 5 seconds
      staleTime: 0, // Always consider data stale
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
      refetchInterval: 5000, // Auto-refetch every 5 seconds
      staleTime: 0, // Always consider data stale
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
      refetchInterval: 5000, // Auto-refetch every 5 seconds
      staleTime: 0, // Always consider data stale
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

  // Transform tuple response to Offer object
  // Contract returns: [offerId, offerer, voucherOwner, tokenId, amount, offerPrice, createdAt, active]
  type OfferTuple = readonly [bigint, string, string, bigint, bigint, bigint, bigint, boolean]
  const offerTuple = data as OfferTuple | undefined

  const offer: Offer | undefined = offerTuple
    ? {
        offerId: offerTuple[0],
        offerer: offerTuple[1],
        voucherOwner: offerTuple[2],
        tokenId: offerTuple[3],
        amount: offerTuple[4],
        offerPrice: offerTuple[5],
        createdAt: offerTuple[6],
        active: offerTuple[7],
      }
    : undefined

  return {
    offer,
    isLoading,
    error,
    refetch,
  }
}
