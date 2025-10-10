import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

/**
 * Homepage
 *
 * Landing page with hero section and wallet connection CTA
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-kek-dark to-gray-950 dark:from-kek-dark dark:to-gray-950">
          <div className="container mx-auto px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center rounded-full bg-kek-green/20 px-4 py-1.5 text-sm font-semibold text-kek-green dark:bg-kek-green/10 dark:text-kek-green">
                <span className="mr-2">🚀</span>
                Live on $BASED Chain (32323)
              </div>

              {/* Heading */}
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white dark:text-white sm:text-5xl md:text-6xl">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-kek-green via-kek-cyan to-kek-purple bg-clip-text text-transparent">
                  KEKTECH
                </span>
              </h1>

              {/* Description */}
              <p className="mb-8 text-lg text-gray-300 dark:text-gray-300 sm:text-xl">
                The ultimate NFT collection on the $BASED Chain. Connect your wallet to start
                minting unique digital collectibles.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/mint"
                  className="w-full rounded-lg bg-gradient-to-r from-kek-green to-kek-cyan px-8 py-3 text-center text-base font-medium text-black transition-all hover:shadow-lg hover:shadow-kek-green/50 sm:w-auto"
                >
                  Start Minting
                </Link>
                <Link
                  href="/gallery"
                  className="w-full rounded-lg border border-kek-purple bg-transparent px-8 py-3 text-center text-base font-medium text-kek-purple transition-all hover:bg-kek-purple/10 hover:shadow-lg hover:shadow-kek-purple/30 sm:w-auto"
                >
                  View Gallery
                </Link>
              </div>
            </div>
          </div>

          {/* Background Decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -left-4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-kek-green/20 blur-3xl" />
            <div className="absolute -right-4 top-1/4 h-96 w-96 -translate-y-1/2 rounded-full bg-kek-purple/20 blur-3xl" />
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 dark:bg-gray-950 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Why KEKTECH?
              </h2>
              <p className="mb-12 text-lg text-gray-600 dark:text-gray-400">
                Join our growing community and own a piece of digital history
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 text-4xl">⚡</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Fast Minting
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Lightning-fast transactions on the $BASED Chain with low gas fees
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 text-4xl">🎨</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Unique Art
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Each NFT is unique with provably rare traits and attributes
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 text-4xl">🌐</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  Community
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Join a vibrant community of collectors and enthusiasts
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-900 py-16 dark:bg-gray-900 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 text-center md:grid-cols-3">
              {/* Stat 1 */}
              <div>
                <div className="mb-2 text-4xl font-bold text-kek-green dark:text-kek-green">4,200</div>
                <div className="text-gray-400 dark:text-gray-400">Total Supply</div>
              </div>

              {/* Stat 2 */}
              <div>
                <div className="mb-2 text-4xl font-bold text-kek-cyan dark:text-kek-cyan">32323</div>
                <div className="text-gray-400 dark:text-gray-400">Chain ID</div>
              </div>

              {/* Stat 3 */}
              <div>
                <div className="mb-2 text-4xl font-bold text-kek-purple dark:text-kek-purple">50</div>
                <div className="text-gray-400 dark:text-gray-400">Max Per Transaction</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
