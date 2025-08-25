import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import Navigation from "@/components/navigation"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Explore India - Discover the Beauty of Indian States",
  description:
    "Journey through India's diverse states, explore rich history, vibrant culture, and breathtaking landscapes.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
