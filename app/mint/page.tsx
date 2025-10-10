import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MintForm } from '@/components/web3/mint/MintForm'

/**
 * Mint Page
 *
 * NFT minting interface with transaction handling
 */
export default function MintPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            {/* Page Header */}
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                Mint KEKTECH NFTs
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Join the KEKTECH community on the $BASED Chain
              </p>
            </div>

            {/* Mint Form */}
            <MintForm />

            {/* Additional Info */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  10,000
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Supply</div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  0.001 ETH
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Mint Price</div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Max Per Transaction
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                What You Get
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Unique generative NFT with provably rare traits</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>On-chain metadata and ranking system</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Access to exclusive KEKTECH community</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Fast and secure minting on $BASED Chain</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
