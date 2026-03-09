import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CSE Session 2019-20 Reunion - পুনর্মিলনী আমন্ত্রণ',
  description: 'Cox\'s Bazar Polytechnic Institute CSE Diploma 2023 Batch Reunion Invitation. আমরা আবার একসাথে হতে চাই, পুরোনো বন্ধুদের নিয়ে, পুরোনো গল্পগুলো নতুন করে বাঁচাতে।',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/logo.jpeg',
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        {/* Inline critical CSS for faster initial render */}
        <style dangerouslySetInnerHTML={{__html: `
          body{margin:0;background:#0F172A;color:#FFF7ED;font-family:system-ui,-apple-system,sans-serif;overflow-x:hidden}
          *{box-sizing:border-box}
        `}} />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
