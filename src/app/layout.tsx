import Providers from '@/utils/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Xhop',
  description: 'Shop at Xhop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link href="https://fonts.cdnfonts.com/css/noto-sans-nko-unjoined" rel="stylesheet" />
        <link href="/favicon.ico" rel="icon" sizes="any" />
      </Head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        </body>
    </html>
  )
}
