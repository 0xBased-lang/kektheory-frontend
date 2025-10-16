'use client'

import Link from 'next/link'
import Image from 'next/image'

/**
 * Footer Component
 *
 * Site footer with links, chain information, and social media
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <h3 className="mb-3 text-lg font-bold text-[#06b6d4]">𝕂Ǝ𝕂TECH</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              NFT Collection on the $BASED Chain (32323)
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[#06b6d4]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/mint" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Mint
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>

          {/* Blockchain */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[#06b6d4]">Blockchain</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Chain: $BASED (32323)</li>
              <li>
                <a
                  href="https://mainnet.basedaibridge.com/rpc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  RPC Endpoint ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Marketplaces */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[#06b6d4]">Marketplaces</h4>
            <div className="space-y-3">
              {/* Explorer */}
              <a
                href="https://explorer.bf1337.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-gray-900 border border-gray-800 group-hover:border-[#3fb8bd] transition-colors">
                  <Image
                    src="/images/bf.png"
                    alt="BF Explorer"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  BF Explorer
                </span>
              </a>

              {/* Aftermint */}
              <a
                href="https://aftermint.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-gray-900 border border-gray-800 group-hover:border-[#4ecca7] transition-colors">
                  <Image
                    src="/aftermint-logo.avif"
                    alt="Aftermint"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  Aftermint
                </span>
              </a>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-[#06b6d4]">Community</h4>
            <div className="flex items-center gap-3">
              {/* X (Twitter) */}
              <a
                href="https://x.com/KektechNFT"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 border-2 border-gray-800 hover:border-[#3fb8bd] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#3fb8bd]/30"
                aria-label="Follow us on X (Twitter)"
              >
                <Image
                  src="/images/x.webp"
                  alt="X"
                  width={24}
                  height={24}
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/KEKTECH"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 border-2 border-gray-800 hover:border-[#4ecca7] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#4ecca7]/30"
                aria-label="Join our Telegram"
              >
                <Image
                  src="/images/telegram.webp"
                  alt="Telegram"
                  width={24}
                  height={24}
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} 𝕂Ǝ𝕂TECH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
