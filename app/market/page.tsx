'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  TerminalLayout,
  TerminalCard,
  TerminalPipeline,
  TerminalActivityFeed,
  TerminalTable,
  TerminalStatusBar,
  TerminalTopBar,
  TerminalTabs,
  WalletSection,
  useDefaultMarketplaceStats,
  type ActivityItem,
  type TableRowData,
  type Tab
} from '@/components/terminal'
import { Sparkles, TrendingUp, Trophy } from 'lucide-react'

/**
 * Feels Good Market
 *
 * Prediction market trading terminal with pump.fun style interface
 * Shows three different views: Pipeline, Table, and Grid
 */
export default function FeelsGoodMarketPage() {
  const [activeView, setActiveView] = useState<'pipeline' | 'table' | 'grid'>('pipeline')
  const marketplaceStats = useDefaultMarketplaceStats()

  // Sample NFT data
  const sampleNFTs = [
    {
      id: '1',
      image: '/images/kektech-logo.png',
      name: 'KEKTECH #1',
      tokenId: '1',
      price: '0.15 ETH',
      priceChange: 12.5,
      marketCap: '$42K',
      holders: 156,
      volume: '2.3 ETH',
      age: '2h',
      status: 'hot' as const,
      badges: ['Rare', 'Verified'],
      chartData: [10, 15, 12, 18, 25, 30, 28]
    },
    {
      id: '2',
      image: '/images/kektech-logo.png',
      name: 'KEKTECH #42',
      tokenId: '42',
      price: '0.08 ETH',
      priceChange: -5.2,
      marketCap: '$28K',
      holders: 89,
      volume: '1.2 ETH',
      age: '5h',
      status: 'new' as const,
      chartData: [20, 18, 15, 12, 10, 8, 7]
    },
    {
      id: '3',
      image: '/images/kektech-logo.png',
      name: 'KEKTECH #100',
      tokenId: '100',
      price: '0.22 ETH',
      priceChange: 8.7,
      marketCap: '$65K',
      holders: 234,
      volume: '4.5 ETH',
      age: '1d',
      status: 'graduated' as const,
      badges: ['Limited'],
      chartData: [5, 8, 12, 15, 18, 22, 25]
    }
  ]

  // Sample activity data
  const sampleActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'buy',
      user: '0x1234...5678',
      tokenName: 'KEKTECH #1',
      tokenId: '1',
      price: '0.15 ETH',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      changePercent: 12.5
    },
    {
      id: '2',
      type: 'mint',
      user: '0xabcd...efgh',
      tokenName: 'KEKTECH #42',
      tokenId: '42',
      price: '0.1 ETH',
      timestamp: new Date(Date.now() - 1000 * 60 * 15)
    },
    {
      id: '3',
      type: 'offer',
      user: '0x9876...5432',
      tokenName: 'KEKTECH #100',
      tokenId: '100',
      price: '0.2 ETH',
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    }
  ]

  // Sample table data
  const tableData: TableRowData[] = sampleNFTs.map((nft) => ({
    id: nft.id,
    image: nft.image,
    name: nft.name,
    ticker: `#${nft.tokenId}`,
    marketCap: nft.marketCap,
    athMarketCap: `${parseFloat(nft.marketCap.replace('$', '').replace('K', '')) * 1.5}K`,
    liquidity: nft.volume,
    priceChange24h: nft.priceChange,
    holders: nft.holders,
    trending: nft.status === 'hot'
  }))

  // Tab configuration
  const tabs: Tab[] = [
    { id: 'pipeline', label: 'Pipeline', icon: <Sparkles className="w-4 h-4" />, color: '#3fb8bd' },
    { id: 'table', label: 'Trending', icon: <TrendingUp className="w-4 h-4" />, color: '#4ecca7' },
    { id: 'grid', label: 'Top NFTs', icon: <Trophy className="w-4 h-4" />, color: '#daa520' }
  ]

  return (
    <TerminalLayout
      topBar={
        <TerminalTopBar
          logo={
            <div className="font-fredoka font-bold text-xl text-[#3fb8bd]">
              Feels Good Market
            </div>
          }
          navigation={[
            { id: 'market', label: 'Market', active: true, onClick: () => {} },
            { id: 'home', label: 'Home', onClick: () => { window.location.href = '/' } },
            { id: 'nfts', label: 'NFTs', onClick: () => { window.location.href = '/nfts' } }
          ]}
          walletAddress="0x1234567890abcdef"
        />
      }
      sidebar={
        <>
          <WalletSection
            walletName="Wallet 1"
            balance="1.25 ETH"
            address="0x1234...5678"
          />
          <TerminalActivityFeed
            title="Live Activity"
            activities={sampleActivity}
          />
        </>
      }
      statusBar={
        <TerminalStatusBar
          stats={marketplaceStats}
          notifications={3}
        />
      }
    >
      <div className="p-6">
        {/* View Tabs */}
        <div className="mb-6">
          <TerminalTabs
            tabs={tabs}
            activeTab={activeView}
            onChange={(id) => setActiveView(id as any)}
            variant="pills"
          />
        </div>

        {/* Pipeline View */}
        {activeView === 'pipeline' && (
          <TerminalPipeline
            columns={[
              {
                id: 'new',
                title: '✨ New Creations',
                subtitle: 'Recently minted',
                status: 'paused',
                color: '#4ecca7',
                children: (
                  <>
                    {sampleNFTs.filter(nft => nft.status === 'new').map((nft) => (
                      <TerminalCard key={nft.id} {...nft} />
                    ))}
                  </>
                )
              },
              {
                id: 'graduating',
                title: '🎓 About to Graduate',
                subtitle: 'Hot listings',
                status: 'active',
                color: '#daa520',
                children: (
                  <>
                    {sampleNFTs.filter(nft => nft.status === 'hot').map((nft) => (
                      <TerminalCard key={nft.id} {...nft} />
                    ))}
                  </>
                )
              },
              {
                id: 'graduated',
                title: '⭐ Graduated',
                subtitle: 'Top performers',
                status: 'completed',
                color: '#ff00ff',
                children: (
                  <>
                    {sampleNFTs.filter(nft => nft.status === 'graduated').map((nft) => (
                      <TerminalCard key={nft.id} {...nft} />
                    ))}
                  </>
                )
              }
            ]}
          />
        )}

        {/* Table View */}
        {activeView === 'table' && (
          <div className="bg-[#0a0a0a] rounded-lg border border-gray-800">
            <TerminalTable data={tableData} />
          </div>
        )}

        {/* Grid View */}
        {activeView === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sampleNFTs.map((nft) => (
              <TerminalCard key={nft.id} {...nft} />
            ))}
          </div>
        )}
      </div>
    </TerminalLayout>
  )
}
