import './globals.css'
import { Inter } from 'next/font/google'

import Header from "@/components/header";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aplikasi Kesehatan',
  description: 'Aplikasi Kesehatan Raveendra',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
      <Header />
      {children}
    </body>
  </html>
  )
}
