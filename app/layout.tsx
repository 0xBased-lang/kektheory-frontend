import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'KEKTECH NFT Collection | $BASED Chain',
  description:
    'Mint your KEKTECH NFT on the $BASED Chain (32323). Join the community and own a piece of the future.',
  keywords: ['KEKTECH', 'NFT', 'BASED', 'Blockchain', 'Web3', 'Crypto'],
  authors: [{ name: 'KEKTECH Team' }],
  openGraph: {
    title: 'KEKTECH NFT Collection',
    description: 'Mint your KEKTECH NFT on the $BASED Chain',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KEKTECH NFT Collection',
    description: 'Mint your KEKTECH NFT on the $BASED Chain',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
