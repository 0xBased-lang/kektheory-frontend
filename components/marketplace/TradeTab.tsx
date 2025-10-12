/**
 * TradeTab Component
 *
 * KEKTV trading marketplace tab
 */
export function TradeTab() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Coming Soon Notice */}
      <div className="mb-16 bg-gray-900/60 rounded-xl border border-gray-800 p-12 text-center">
        <div className="text-6xl mb-6">🎫</div>
        <h2 className="font-fredoka mb-4 text-3xl font-bold text-[#3fb8bd]">
          𝕂Ǝ𝕂丅ᵉ匚🅷 Trading Marketplace
        </h2>
        <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
          Trade 𝕂Ǝ𝕂丅ᵉ匚🅷 vouchers with other community members. The trading interface is currently under development.
        </p>
        <div className="inline-block px-6 py-3 rounded-xl bg-gray-800 border border-gray-700 mb-6">
          <span className="text-xl font-bold text-[#3fb8bd]">Coming Soon 🚀</span>
        </div>
        <p className="text-gray-400 max-w-xl mx-auto">
          𝕂Ǝ𝕂丅ᵉ匚🅷 vouchers are exclusive rewards for 𝕂Ǝ𝕂TECH NFT holders. Soon you&apos;ll be able to buy, sell, and trade them here!
        </p>
      </div>

      {/* Preview Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-900/60 rounded-xl border border-gray-800 p-6 text-center">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="font-fredoka text-lg font-bold text-[#3fb8bd] mb-2">Buy & Sell</h3>
          <p className="text-gray-400 text-sm">
            Trade 𝕂Ǝ𝕂丅ᵉ匚🅷 vouchers at market prices with instant settlement
          </p>
        </div>

        <div className="bg-gray-900/60 rounded-xl border border-gray-800 p-6 text-center">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="font-fredoka text-lg font-bold text-[#3fb8bd] mb-2">Live Stats</h3>
          <p className="text-gray-400 text-sm">
            Real-time floor prices, volume, and holder statistics
          </p>
        </div>

        <div className="bg-gray-900/60 rounded-xl border border-gray-800 p-6 text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="font-fredoka text-lg font-bold text-[#3fb8bd] mb-2">Secure Trading</h3>
          <p className="text-gray-400 text-sm">
            On-chain escrow ensures safe and trustless transactions
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="/rewards"
          className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] text-black font-bold hover:scale-105 transition font-fredoka"
        >
          Learn About 𝕂Ǝ𝕂丅ᵉ匚🅷 Rewards
        </a>
      </div>
    </div>
  )
}
