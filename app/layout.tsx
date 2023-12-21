import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'
import ClientProvider from '@/components/ClientProvider'
import FireBaseAuthProvider from '@/components/FireBaseAuthProvider'
import SubscriptionProvider from '@/components/SubscriptionProvider'
import { Toaster } from '@/components/ui/toaster'


export const metadata: Metadata = {
  title: 'Trojan App',
  description: 'Secreet Chat App',
  verification: {
    google:"google-site-verification=nNM3a6rmk4AUgp2oUFTDovdAwTGEJhxo4H9FG2RlmY4"
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <FireBaseAuthProvider>
          <body className="flex flex-col min-h-screen">
            <SubscriptionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Header />
                {children}
                <Toaster />
              </ThemeProvider >
            </SubscriptionProvider>
          </body>
        </FireBaseAuthProvider>

      </html>
    </ClientProvider>
  )
}
