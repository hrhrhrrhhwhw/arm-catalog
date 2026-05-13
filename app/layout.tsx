import { Mulish } from 'next/font/google'
import './globals.css'
import { Providers } from './StoreProvider'
import { cn } from '@/lib/utils'
import Header from '@/components/Header/header-client'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme-provider'

const mulish = Mulish({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className={cn('antialiased', 'font-sans', mulish.variable)}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
          <Providers>
            <Toaster />
            <Header />
            <main>{children}</main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
