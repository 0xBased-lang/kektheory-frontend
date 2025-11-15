'use client'

import { ReactNode } from 'react'
import { Filter } from 'lucide-react'

interface PipelineColumn {
  id: string
  title: string
  subtitle?: string
  color?: string
  icon?: ReactNode
  status?: 'paused' | 'active' | 'completed'
  children: ReactNode
  onFilter?: () => void
}

interface TerminalPipelineProps {
  columns: PipelineColumn[]
}

/**
 * TerminalPipeline - Three-column pipeline layout
 *
 * Displays NFTs/tokens in a staged pipeline view:
 * - New Creations → About to Graduate → Graduated
 */
export function TerminalPipeline({ columns }: TerminalPipelineProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      {columns.map((column) => (
        <PipelineColumn key={column.id} {...column} />
      ))}
    </div>
  )
}

/**
 * PipelineColumn - Individual column in the pipeline
 */
function PipelineColumn({
  title,
  subtitle,
  color = '#3fb8bd',
  icon,
  status,
  children,
  onFilter
}: PipelineColumn) {
  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <div>
            <h2 className="font-bold text-white font-fredoka flex items-center gap-2">
              {title}
              {status && (
                <span className={`
                  px-2 py-0.5 rounded text-xs font-bold
                  ${status === 'paused' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : ''}
                  ${status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
                  ${status === 'completed' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : ''}
                `}>
                  {status === 'paused' && '⏸️ Paused'}
                  {status === 'active' && '▶️ Active'}
                  {status === 'completed' && '✅ Completed'}
                </span>
              )}
            </h2>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Filter Button */}
        {onFilter && (
          <button
            onClick={onFilter}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
            aria-label="Filter"
          >
            <Filter className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Column Content - Scrollable */}
      <div className="flex-1 overflow-y-auto space-y-3 px-2 custom-scrollbar">
        {children}
      </div>

      {/* Column Border Accent */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${color};
          border-radius: 3px;
          opacity: 0.5;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
