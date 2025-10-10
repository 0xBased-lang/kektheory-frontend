'use client'

import Link from 'next/link'
import { ConnectButton } from '@/components/web3/ConnectButton'

/**
 * Header Component
 *
 * Navigation bar with KEKTECH branding and wallet connection
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">KEKTECH</span>
          <span className="rounded bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
            $BASED
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/mint"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Mint
          </Link>
          <Link
            href="/gallery"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Gallery
          </Link>
        </nav>

        {/* Wallet Connect Button */}
        <ConnectButton />
      </div>
    </header>
  )
}
