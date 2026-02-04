import '@/styles/globals.css'

import { type Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { TRPCReactProvider } from '@/trpc/react'
import { Toaster } from '@/components/ui/sonner'

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
    <html lang='en' className={`${notosans.variable} w-full h-full`}>
      <body className=' w-full h-full'>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  )
}
