"use client"

import "./globals.css"
import Appbar from "@/components/Appbar/Appbar"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative bg-slate-100">
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Appbar />
            <div className="container mx-auto p-4">{children}</div>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
