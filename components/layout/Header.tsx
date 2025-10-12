'use client'

import Link from 'next/link'
import Image from 'next/image'
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
        {/* Logo - Left Side */}
        <Link href="/" className="flex items-center hover:opacity-80 transition">
          <Image
            src="/images/kektech.gif?v=4"
            alt="𝕂Ǝ𝕂丅ᵉ匚🅷 Home"
            width={180}
            height={90}
            className="h-auto w-36 sm:w-44 md:w-52 lg:w-56"
            unoptimized
            priority
          />
        </Link>

        {/* Navigation Links - Center/Right */}
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
