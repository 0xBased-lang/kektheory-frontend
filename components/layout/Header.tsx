'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ConnectButton } from '@/components/web3/ConnectButton'

/**
 * Header Component
 *
 * Navigation bar with KEKTECH logo, navigation links, and wallet connection
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#3fb8bd]/20 bg-black backdrop-blur-md dark:border-[#3fb8bd]/20 dark:bg-black">
      <div className="container mx-auto flex h-32 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - Clickable Home Link - LARGER SIZE */}
        <Link href="/" className="flex items-center bg-black p-2 hover:opacity-80 transition">
          <Image
            src="/images/kektech.gif"
            alt="𝕂Ǝ𝕂丅ᵉ匚🅷 Collection - Home"
            width={200}
            height={100}
            className="h-auto w-40 sm:w-48 md:w-56 lg:w-60"
            unoptimized
            priority
          />
        </Link>

        {/* Navigation Links - Simplified */}
        <nav className="hidden items-center space-x-4 md:flex lg:space-x-6">
          <Link
            href="/#dashboard"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-[#3fb8bd]"
          >
            Dashboard
          </Link>
          <Link
            href="/mint"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-[#3fb8bd]"
          >
            Mint
          </Link>
          <Link
            href="/#marketplace"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-[#3fb8bd]"
          >
            Trade
          </Link>
          <Link
            href="/gallery"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-[#3fb8bd]"
          >
            Gallery
          </Link>
          <Link
            href="/rewards"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-[#3fb8bd]"
          >
            Rewards
          </Link>
          <Link
            href="/#roadmap"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-[#3fb8bd]"
          >
            Roadmap
          </Link>
          <Link
            href="/#traits"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-[#3fb8bd]"
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
