import { Mulish } from 'next/font/google'
import './globals.css'
import { Providers } from './StoreProvider'
import { cn } from '@/lib/utils'
import Header from '@/components/Header/header-client'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme-provider'
import Script from 'next/script'

const mulish = Mulish({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className={cn('antialiased', 'font-sans', mulish.variable)}>
      <body>
        {/* Yandex Metrika */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=109235268', 'ym');

        ym(109235268, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/109235268" 
            style={{ position: 'absolute', left: '-9999px' }}
            alt="" />
          </div>
        </noscript> 
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
