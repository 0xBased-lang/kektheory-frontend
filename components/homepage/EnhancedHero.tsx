'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

/**
 * EnhancedHero Component with 3D Effects and Particles
 *
 * Features:
 * - Animated floating particles
 * - 3D text effects
 * - Gradient glow animations
 * - Parallax movement on mouse
 * - CTA buttons with hover effects
 */
export function EnhancedHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-gradient-to-b from-black via-gray-950 to-gray-900">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(63,184,189,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(63,184,189,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-[#3fb8bd]/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              filter: `blur(${Math.random() * 2}px)`,
            }}
          />
        ))}
      </div>

      {/* Radial Glow Effects */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse-glow rounded-full bg-[#3fb8bd]/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse-glow rounded-full bg-[#ff00ff]/10 blur-3xl animation-delay-1000" />

      {/* Content Container with Parallax */}
      <div
        className="relative z-10 flex min-h-[600px] items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="container mx-auto text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-[#3fb8bd]/30 bg-[#3fb8bd]/10 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fb8bd] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#3fb8bd]" />
            </span>
            <span className="font-fredoka text-sm font-semibold text-[#3fb8bd]">
              Live on $BASED Chain (32323)
            </span>
          </div>

          {/* Main Title with 3D Effect */}
          <h1
            className="mb-6 text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            style={{
              background: 'linear-gradient(to right, #3fb8bd, #4ecca7, #ff00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 30px rgba(63, 184, 189, 0.5))',
              transform: `perspective(500px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
            }}
          >
            𝕂Ǝ𝕂丅ᵉ匚🅷
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-8 max-w-2xl font-fredoka text-lg text-gray-300 sm:text-xl md:text-2xl">
            <span className="font-bold text-[#3fb8bd]">4200 Artifacts</span>
            {' | '}
            by <span className="font-bold text-[#4ecca7]">𝔹enzo𝔹ert & Princess 𝔹u𝔹𝔹legum</span>
            {' | '}
            OG Pepecoin on <span className="font-bold text-[#3fb8bd]">$BASED 🧠</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary CTA */}
            <Link
              href="/mint"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] px-8 py-4 font-fredoka text-lg font-bold text-black shadow-lg shadow-[#3fb8bd]/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#3fb8bd]/70"
            >
              <span className="relative z-10">🚀 Start Minting</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#4ecca7] to-[#ff00ff] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/gallery"
              className="group relative overflow-hidden rounded-xl border-2 border-[#4ecca7] bg-transparent px-8 py-4 font-fredoka text-lg font-bold text-[#4ecca7] shadow-lg shadow-[#4ecca7]/30 transition-all hover:scale-105 hover:bg-[#4ecca7]/10 hover:shadow-2xl hover:shadow-[#4ecca7]/50"
            >
              <span className="relative z-10">🎨 View Gallery</span>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-[#3fb8bd]/20 bg-black/40 p-4 backdrop-blur-sm transition-all hover:border-[#3fb8bd] hover:bg-black/60">
              <div className="font-fredoka text-3xl font-bold text-[#3fb8bd]">4,200</div>
              <div className="font-fredoka text-sm text-gray-400">Total Supply</div>
            </div>

            <div className="rounded-xl border border-[#4ecca7]/20 bg-black/40 p-4 backdrop-blur-sm transition-all hover:border-[#4ecca7] hover:bg-black/60">
              <div className="font-fredoka text-3xl font-bold text-[#4ecca7]">32323</div>
              <div className="font-fredoka text-sm text-gray-400">Chain ID</div>
            </div>

            <div className="rounded-xl border border-[#ff00ff]/20 bg-black/40 p-4 backdrop-blur-sm transition-all hover:border-[#ff00ff] hover:bg-black/60">
              <div className="font-fredoka text-3xl font-bold text-[#ff00ff]">11+</div>
              <div className="font-fredoka text-sm text-gray-400">Trait Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
    </section>
  )
}
