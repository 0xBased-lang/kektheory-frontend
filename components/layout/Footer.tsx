'use client'

import Link from 'next/link'

/**
 * Footer Component
 *
 * Site footer with links and chain information
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">KEKTECH</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              NFT Collection on the $BASED Chain (32323)
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Links</h4>
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
            <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
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

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-4 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} KEKTECH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
