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
    <header className="sticky top-0 z-50 w-full border-b border-[#3fb8bd]/20 bg-black/95 backdrop-blur-md dark:border-[#3fb8bd]/20 dark:bg-black/95">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - Bigger and Better Quality */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/kektech.gif"
            alt="𝕂Ǝ𝕂丅ᵉ匚🅷 Collection"
            width={80}
            height={80}
            className="h-16 w-16 sm:h-20 sm:w-20"
            unoptimized
            priority
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="/"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-[#3fb8bd] dark:text-gray-300 dark:hover:text-[#3fb8bd]"
          >
            Home
          </Link>
          <Link
            href="/mint"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-[#3fb8bd] dark:text-gray-300 dark:hover:text-[#3fb8bd]"
          >
            Mint
          </Link>
          <Link
            href="/gallery"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-[#3fb8bd] dark:text-gray-300 dark:hover:text-[#3fb8bd]"
          >
            Gallery
          </Link>
          <Link
            href="/#traits"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-[#3fb8bd] dark:text-gray-300 dark:hover:text-[#3fb8bd]"
          >
            Traits
          </Link>
          <Link
            href="/#roadmap"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-[#3fb8bd] dark:text-gray-300 dark:hover:text-[#3fb8bd]"
          >
            Roadmap
          </Link>
          <Link
            href="/#about"
            className="font-fredoka text-sm font-medium text-gray-300 transition-colors hover:text-[#3fb8bd] dark:text-gray-300 dark:hover:text-[#3fb8bd]"
          >
            About us
          </Link>
        </nav>

        {/* Wallet Connect Button */}
        <ConnectButton />
      </div>
    </header>
  )
}
