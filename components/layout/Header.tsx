'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ConnectButton } from '@/components/web3/ConnectButton'

/**
 * Header Component
 *
 * Navigation bar with KEKTECH branding and wallet connection
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-kek-green/20 bg-black/95 backdrop-blur-md dark:border-kek-green/20 dark:bg-black/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Animated Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/images/kektech.gif"
            alt="KEKTECH"
            width={48}
            height={48}
            className="h-12 w-12"
            unoptimized
          />
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white dark:text-white">KEKTECH</span>
            <span className="rounded bg-gradient-to-r from-kek-green to-kek-cyan px-2 py-0.5 text-xs font-semibold text-black">
              $BASED
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="/"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-kek-green dark:text-gray-300 dark:hover:text-kek-green"
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-kek-green dark:text-gray-300 dark:hover:text-kek-green"
          >
            About us
          </Link>
          <Link
            href="/#roadmap"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-kek-green dark:text-gray-300 dark:hover:text-kek-green"
          >
            Roadmap
          </Link>
          <Link
            href="/gallery"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-kek-green dark:text-gray-300 dark:hover:text-kek-green"
          >
            Gallery
          </Link>
          <Link
            href="/#traits"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-kek-green dark:text-gray-300 dark:hover:text-kek-green"
          >
            Traits
          </Link>
        </nav>

        {/* Wallet Connect Button */}
        <ConnectButton />
      </div>
    </header>
  )
}
