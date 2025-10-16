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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-[#06b6d4]">𝕂Ǝ𝕂TECH</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              NFT Collection on the $BASED Chain (32323)
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-[#06b6d4]">Links</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-gray-900 dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/mint" className="hover:text-gray-900 dark:hover:text-white">
                  Mint
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gray-900 dark:hover:text-white">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Chain Info */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-[#06b6d4]">
              Blockchain
            </h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>Chain: $BASED (32323)</li>
              <li>
                <a
                  href="https://explorer.bf1337.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Explorer ↗
                </a>
              </li>
              <li>
                <a
                  href="https://mainnet.basedaibridge.com/rpc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  RPC Endpoint ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-sm font-semibold text-[#06b6d4]">Join Our Community</h4>
            <div className="flex items-center gap-4">
              {/* X (Twitter) */}
              <a
                href="https://x.com/KektechNFT"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 border-2 border-gray-800 hover:border-[#3fb8bd] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#3fb8bd]/30"
                aria-label="Follow us on X (Twitter)"
              >
                <Image
                  src="/images/x.webp"
                  alt="X (Twitter)"
                  width={32}
                  height={32}
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/KEKTECH"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 border-2 border-gray-800 hover:border-[#4ecca7] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#4ecca7]/30"
                aria-label="Join our Telegram"
              >
                <Image
                  src="/images/telegram.webp"
                  alt="Telegram"
                  width={32}
                  height={32}
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} 𝕂Ǝ𝕂TECH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
