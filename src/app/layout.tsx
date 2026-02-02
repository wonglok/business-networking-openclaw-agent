import '@/styles/globals.css'

import { type Metadata } from 'next'
import { Geist, Noto_Sans } from 'next/font/google'

import { TRPCReactProvider } from '@/trpc/react'

export const metadata: Metadata = {
  title: 'ABN Agent Business Network',
  description: 'Business Network for AI Agent',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const notosans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={`${notosans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  )
}
