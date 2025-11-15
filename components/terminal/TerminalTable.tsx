'use client'

import Image from 'next/image'
import { ArrowUp, ArrowDown, TrendingUp, Flame } from 'lucide-react'

export interface TableRowData {
  id: string
  image: string
  name: string
  ticker?: string
  marketCap?: string
  athMarketCap?: string
  liquidity?: string
  volume24h?: string
  priceChange24h?: number
  holders?: number
  age?: string
  trending?: boolean
}

interface TerminalTableProps {
  data: TableRowData[]
  onRowClick?: (row: TableRowData) => void
  onAction?: (row: TableRowData, action: string) => void
}

/**
 * TerminalTable - Table view for NFT/token listings
 *
 * Displays data in a spreadsheet-style table with sortable columns
 * Similar to crypto trading terminal tables
 */
export function TerminalTable({
  data,
  onRowClick,
  onAction
}: TerminalTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-800 bg-[#0f0f0f]">
            <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Token
            </th>
            <th className="text-right px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Market Cap
            </th>
            <th className="text-right px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
              ATH MC
            </th>
            <th className="text-right px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Liquidity
            </th>
            <th className="text-right px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
              24h Change
            </th>
            <th className="text-right px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {data.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              onRowClick={onRowClick}
              onAction={onAction}
            />
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No items to display
        </div>
      )}
    </div>
  )
}

/**
 * TableRow - Individual row in the table
 */
function TableRow({
  row,
  onRowClick,
  onAction
}: {
  row: TableRowData
  onRowClick?: (row: TableRowData) => void
  onAction?: (row: TableRowData, action: string) => void
}) {
  const isPositive = row.priceChange24h && row.priceChange24h > 0
  const isNegative = row.priceChange24h && row.priceChange24h < 0

  return (
    <tr
      onClick={() => onRowClick?.(row)}
      className="hover:bg-gray-900/50 transition-colors cursor-pointer group"
    >
      {/* Token Info */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Token Image */}
          <div className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#3fb8bd]/50 transition-colors flex-shrink-0">
            <Image
              src={row.image}
              alt={row.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Name and Ticker */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white font-fredoka">
                {row.name}
              </span>
              {row.trending && (
                <Flame className="w-4 h-4 text-orange-500" />
              )}
            </div>
            {row.ticker && (
              <span className="text-xs text-gray-500">{row.ticker}</span>
            )}
          </div>
        </div>
      </td>

      {/* Market Cap */}
      <td className="px-4 py-3 text-right">
        {row.marketCap ? (
          <div>
            <span className="text-white font-mono font-bold">
              {row.marketCap}
            </span>
            {row.priceChange24h !== undefined && (
              <div className={`text-xs mt-0.5 ${isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-400'}`}>
                {isPositive ? '+' : ''}{row.priceChange24h}%
              </div>
            )}
          </div>
        ) : (
          <span className="text-gray-600">—</span>
        )}
      </td>

      {/* ATH Market Cap */}
      <td className="px-4 py-3 text-right">
        {row.athMarketCap ? (
          <span className="text-[#3fb8bd] font-mono font-bold">
            {row.athMarketCap}
          </span>
        ) : (
          <span className="text-gray-600">—</span>
        )}
      </td>

      {/* Liquidity */}
      <td className="px-4 py-3 text-right">
        {row.liquidity ? (
          <div className="flex items-center justify-end gap-1">
            <TrendingUp className="w-3 h-3 text-gray-500" />
            <span className="text-white font-mono">{row.liquidity}</span>
          </div>
        ) : (
          <span className="text-gray-600">—</span>
        )}
      </td>

      {/* 24h Change */}
      <td className="px-4 py-3 text-right">
        {row.priceChange24h !== undefined ? (
          <div className={`flex items-center justify-end gap-1 font-bold ${isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-400'}`}>
            {isPositive && <ArrowUp className="w-4 h-4" />}
            {isNegative && <ArrowDown className="w-4 h-4" />}
            <span>{Math.abs(row.priceChange24h)}%</span>
          </div>
        ) : (
          <span className="text-gray-600">—</span>
        )}
      </td>

      {/* Action Button */}
      <td className="px-4 py-3 text-right">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAction?.(row, 'buy')
          }}
          className="px-4 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded font-bold text-sm transition-colors border border-green-500/30"
        >
          Buy
        </button>
      </td>
    </tr>
  )
}
