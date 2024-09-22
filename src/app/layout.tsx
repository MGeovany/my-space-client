import './globals.css'
import '../styles/custom-styles.css'
import '../styles/dracula.css'
import '../styles/prose-styles.css'
import '@mantine/core/styles.css'

import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import { SiteLayout } from '@/components/layouts'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
  pageProps,
}: Readonly<{
  children: ReactNode
  pageProps: any
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers pageProps={pageProps}>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  )
}
