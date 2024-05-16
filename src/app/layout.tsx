import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import StoreProvider from "./ui/StoreProvider"

const poppins = Poppins({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tandhur",
  description: "Website Tandhur",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={poppins.className}>{children}</body>
      </StoreProvider>
    </html>
  )
}
