import type { Metadata } from "next"
import React from "react"
import "@/globals.css"

export const metadata: Metadata = {
  title: "Hatsuboshi App"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                {children}
            </body>
        </html>
    )
}
