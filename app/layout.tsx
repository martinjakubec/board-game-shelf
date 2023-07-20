import { Metadata } from "next"
import "./globals.css"
import Appbar from "@/components/Appbar/Appbar"

export const metadata: Metadata = {
  title: "Board Game Shelf",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative bg-slate-100">
        <Appbar />
        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  )
}
