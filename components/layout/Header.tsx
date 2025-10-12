'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ConnectButton } from '@/components/web3/ConnectButton'

/**
 * Header Component
 *
 * Navigation bar with KEKTECH logo, navigation links, and wallet connection
 */
export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#3fb8bd]/20 bg-black backdrop-blur-md dark:border-[#3fb8bd]/20 dark:bg-black">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Navigation Links - Restructured */}
        <nav className="hidden items-center space-x-4 md:flex lg:space-x-6">
          <Link
            href="/marketplace"
            className={`font-fredoka text-sm font-medium transition-colors hover:text-[#3fb8bd] ${
              pathname === '/marketplace' ? 'text-[#3fb8bd] font-bold' : 'text-gray-300'
            }`}
          >
            Marketplace
          </Link>
          <Link
            href="/dashboard"
            className={`font-fredoka text-sm font-medium transition-colors hover:text-[#3fb8bd] ${
              pathname === '/dashboard' ? 'text-[#3fb8bd] font-bold' : 'text-gray-300'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/gallery"
            className={`font-fredoka text-sm font-medium transition-colors hover:text-[#3fb8bd] ${
              pathname === '/gallery' ? 'text-[#3fb8bd] font-bold' : 'text-gray-300'
            }`}
          >
            Gallery
          </Link>
          <Link
            href="/rewards"
            className={`font-fredoka text-sm font-medium transition-colors hover:text-[#3fb8bd] ${
              pathname === '/rewards' ? 'text-[#3fb8bd] font-bold' : 'text-gray-300'
            }`}
          >
            Rewards
          </Link>
          <Link
            href="/#roadmap"
            className={`font-fredoka text-sm font-medium transition-colors hover:text-[#3fb8bd] ${
              pathname === '/' && typeof window !== 'undefined' && window.location.hash === '#roadmap' ? 'text-[#3fb8bd] font-bold' : 'text-gray-300'
            }`}
          >
            Roadmap
          </Link>
          <Link
            href="/#traits"
            className={`font-fredoka text-sm font-medium transition-colors hover:text-[#3fb8bd] ${
              pathname === '/' && typeof window !== 'undefined' && window.location.hash === '#traits' ? 'text-[#3fb8bd] font-bold' : 'text-gray-300'
            }`}
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
