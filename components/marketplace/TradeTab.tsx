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
