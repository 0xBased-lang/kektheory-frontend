'use client'

import { useAccount } from 'wagmi'
import { useTechBalance } from './useTechBalance'
import { useVoucherBalance } from './useVoucherBalance'
import { useWalletNFTs } from './useWalletNFTs'
import { KEKTECH_CONTRACT_ADDRESS } from '@/config/constants'
import { useMemo } from 'react'

/**
 * usePortfolioData Hook
 *
 * Aggregates all portfolio data from multiple sources:
 * - TECH token balance
 * - KEKTECH NFTs
 * - KEKTECH Vouchers
 * - Other NFTs
 *
 * @returns Comprehensive portfolio data with loading and error states
 */
export function usePortfolioData() {
  const { address, isConnected } = useAccount()

  // Fetch all data sources
  const techBalance = useTechBalance()
  const voucherBalance = useVoucherBalance()
  const nftData = useWalletNFTs(address)

  // Separate KEKTECH NFTs from other NFTs
  const { kektechNFTs, otherNFTs } = useMemo(() => {
    const kektech = nftData.nfts.filter(
      (nft) =>
        nft.token.address_hash.toLowerCase() === KEKTECH_CONTRACT_ADDRESS.toLowerCase()
    )
    const others = nftData.nfts.filter(
      (nft) =>
        nft.token.address_hash.toLowerCase() !== KEKTECH_CONTRACT_ADDRESS.toLowerCase()
    )
    return { kektechNFTs: kektech, otherNFTs: others }
  }, [nftData.nfts])

  // Calculate portfolio metrics
  const portfolioMetrics = useMemo(() => {
    return {
      // Token metrics
      techBalance: techBalance.balanceNumber,
      techBalanceFormatted: techBalance.balanceFormatted,
      techBalanceCompact: techBalance.balanceCompact,

      // NFT metrics
      totalNFTs: nftData.nfts.length,
      kektechNFTCount: kektechNFTs.length,
      otherNFTCount: otherNFTs.length,

      // Voucher metrics
      totalVouchers: voucherBalance.totalVouchers,
      uniqueVoucherTypes: voucherBalance.uniqueVoucherTypes,

      // Total assets
      totalAssetTypes: [
        techBalance.balanceNumber > 0 ? 1 : 0,
        kektechNFTs.length > 0 ? 1 : 0,
        voucherBalance.totalVouchers > 0 ? 1 : 0,
        otherNFTs.length > 0 ? 1 : 0,
      ].reduce((a, b) => a + b, 0),
    }
  }, [
    techBalance,
    nftData.nfts.length,
    kektechNFTs.length,
    otherNFTs.length,
    voucherBalance.totalVouchers,
    voucherBalance.uniqueVoucherTypes,
  ])

  // Aggregate loading state
  const isLoading =
    techBalance.isLoading || voucherBalance.isLoading || nftData.loading

  // Aggregate error state
  const hasError =
    techBalance.isError || voucherBalance.isError || !!nftData.error

  const errors = [
    techBalance.error,
    voucherBalance.error,
    nftData.error,
  ].filter(Boolean)

  // Refetch all data
  const refetchAll = () => {
    techBalance.refetch()
    voucherBalance.refetch()
    nftData.retry()
  }

  return {
    // Connection state
    address,
    isConnected,

    // Individual data sources
    techBalance,
    voucherBalance,
    nfts: {
      all: nftData.nfts,
      kektech: kektechNFTs,
      others: otherNFTs,
    },

    // Portfolio metrics
    metrics: portfolioMetrics,

    // Aggregate states
    isLoading,
    hasError,
    errors,

    // Actions
    refetchAll,
  }
}
