import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'

// Unified button variants using class-variance-authority for consistency
const buttonVariants = cva(
  // Base styles - shared across all buttons
  'inline-flex items-center justify-center gap-2 font-fredoka font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#3fb8bd]/50 focus:ring-offset-2 focus:ring-offset-gray-950',
  {
    variants: {
      variant: {
        // Primary: Solid gradient fill - main CTAs
        primary:
          'bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] text-black shadow-lg shadow-[#3fb8bd]/30 hover:shadow-xl hover:shadow-[#3fb8bd]/40 hover:scale-105',

        // Secondary: Outlined with gradient border - secondary actions
        secondary:
          'border-2 border-[#3fb8bd] bg-transparent text-[#3fb8bd] hover:bg-[#3fb8bd]/10 hover:scale-105',

        // Outline: Subtle outline - tertiary actions
        outline:
          'border border-gray-700 bg-transparent text-gray-300 hover:border-[#3fb8bd]/50 hover:text-[#3fb8bd] hover:bg-[#3fb8bd]/5',

        // Ghost: Minimal style - subtle interactions
        ghost:
          'bg-transparent text-gray-300 hover:bg-gray-800/50 hover:text-[#3fb8bd]',

        // Gradient Border: Special effect with inner fill - premium features
        'gradient-border':
          'relative overflow-hidden bg-gradient-to-r from-[#3fb8bd] to-[#4ecca7] p-[2px] shadow-lg shadow-[#3fb8bd]/50 hover:shadow-2xl hover:shadow-[#3fb8bd]/70 hover:scale-105',

        // Danger: Warning/destructive actions
        danger:
          'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40',
      },
      size: {
        sm: 'px-4 py-2 text-sm rounded-lg',
        md: 'px-6 py-3 text-base rounded-xl',
        lg: 'px-8 py-4 text-lg rounded-xl',
        xl: 'px-10 py-5 text-xl rounded-2xl',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

// Button Props Types
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export interface LinkButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof buttonVariants> {
  href: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  external?: boolean
}

// Standard Button Component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isGradientBorder = variant === 'gradient-border'

    if (isGradientBorder) {
      return (
        <button
          ref={ref}
          disabled={disabled || isLoading}
          className={buttonVariants({ variant, size, fullWidth, className })}
          {...props}
        >
          <span className="relative flex items-center justify-center gap-2 rounded-[10px] bg-gray-900 px-8 py-4 transition-all group-hover:bg-transparent w-full">
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <>
                {leftIcon}
                {children}
                {rightIcon}
              </>
            )}
          </span>
        </button>
      )
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={buttonVariants({ variant, size, fullWidth, className })}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

// Link Button Component (for Next.js Link)
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      href,
      leftIcon,
      rightIcon,
      external,
      children,
      ...props
    },
    ref
  ) => {
    const isGradientBorder = variant === 'gradient-border'

    if (external) {
      if (isGradientBorder) {
        return (
          <a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant, size, fullWidth, className })}
            {...props}
          >
            <span className="relative flex items-center justify-center gap-2 rounded-[10px] bg-gray-900 px-8 py-4 transition-all group-hover:bg-transparent w-full">
              {leftIcon}
              {children}
              {rightIcon}
            </span>
          </a>
        )
      }

      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant, size, fullWidth, className })}
          {...props}
        >
          {leftIcon}
          {children}
          {rightIcon}
        </a>
      )
    }

    if (isGradientBorder) {
      return (
        <Link
          ref={ref}
          href={href}
          className={buttonVariants({ variant, size, fullWidth, className })}
          {...props}
        >
          <span className="relative flex items-center justify-center gap-2 rounded-[10px] bg-gray-900 px-8 py-4 transition-all group-hover:bg-transparent w-full">
            {leftIcon}
            {children}
            {rightIcon}
          </span>
        </Link>
      )
    }

    return (
      <Link
        ref={ref}
        href={href}
        className={buttonVariants({ variant, size, fullWidth, className })}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </ Link>
    )
  }
)

LinkButton.displayName = 'LinkButton'

// Icon wrapper for consistent icon sizing
export const ButtonIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center justify-center">{children}</span>
)
