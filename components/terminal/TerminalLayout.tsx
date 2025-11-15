'use client'

import { ReactNode } from 'react'

interface TerminalLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
  statusBar?: ReactNode
  topBar?: ReactNode
}

/**
 * TerminalLayout - Main container for terminal-style UI
 *
 * Dark theme layout with optional sidebar, status bar, and top navigation
 * Based on crypto trading terminal design
 */
export function TerminalLayout({
  children,
  sidebar,
  statusBar,
  topBar
}: TerminalLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex flex-col">
      {/* Top Navigation Bar */}
      {topBar && (
        <div className="sticky top-0 z-50 bg-[#0f0f0f] border-b border-gray-800">
          {topBar}
        </div>
      )}

      {/* Main Content Area with Optional Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Activity Feed / Wallet Info */}
        {sidebar && (
          <aside className="w-64 bg-[#0f0f0f] border-r border-gray-800 overflow-y-auto">
            {sidebar}
          </aside>
        )}

        {/* Main Terminal Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Bottom Status Bar */}
      {statusBar && (
        <div className="sticky bottom-0 z-40 bg-[#0f0f0f] border-t border-gray-800">
          {statusBar}
        </div>
      )}
    </div>
  )
}
