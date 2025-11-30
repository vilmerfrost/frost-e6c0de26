import type { Metadata } from 'next'
import { RefreshProvider } from '../components/RefreshProvider';
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import AnimatedBackground from '@/components/AnimatedBackground'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
})

export const metadata: Metadata = {
  title: 'Context Brain',
  description: 'A premium AI-powered context brain application.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        'relative font-sans antialiased',
        inter.variable,
        firaCode.variable
      )}
      >
        <AnimatedBackground />
        <div className="relative z-10 min-h-screen">
          <RefreshProvider>{children}</RefreshProvider>
        </div>
      </body>
    </html>
  )
}