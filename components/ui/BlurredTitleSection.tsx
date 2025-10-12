/**
 * Blurred Title Section Component
 *
 * Creates an elegant title section with a blurred background image
 * Features:
 * - Smooth optical blur effect on background image
 * - Layered design with text on top
 * - Responsive and elegant styling
 */

interface BlurredTitleSectionProps {
  title: string
  subtitle?: string
  imageSrc?: string
}

export function BlurredTitleSection({
  title,
  subtitle,
  imageSrc = '/images/kekorama.jpg'
}: BlurredTitleSectionProps) {
  return (
    <div className="relative mb-12 overflow-hidden rounded-2xl">
      {/* Background Layer - Blurred Image */}
      <div className="absolute inset-0 z-0">
        {/* Image container with blur */}
        <div
          className="relative h-full w-full"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(40px) brightness(0.6)',
            opacity: 0.3,
            transform: 'scale(1.1)', // Prevent blur edge artifacts
          }}
        />

        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* Vignette effect for optical elegance */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/70" />
      </div>

      {/* Content Layer - Title and Subtitle */}
      <div className="relative z-10 px-8 py-16 text-center">
        {/* Animated glow effect behind title */}
        <div className="absolute left-1/2 top-1/2 h-32 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3fb8bd]/20 blur-3xl" />

        {/* Title */}
        <h1 className="font-fredoka relative mb-4 text-5xl font-bold text-[#3fb8bd] sm:text-6xl lg:text-7xl drop-shadow-2xl">
          <span className="relative inline-block">
            {title}
            {/* Text glow effect */}
            <span
              className="absolute inset-0 blur-md opacity-50"
              style={{
                color: '#3fb8bd',
                zIndex: -1
              }}
            >
              {title}
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="font-fredoka relative text-lg text-gray-200 sm:text-xl drop-shadow-lg">
            {subtitle}
          </p>
        )}

        {/* Decorative line */}
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-[#3fb8bd] to-transparent opacity-50" />
      </div>

      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  )
}