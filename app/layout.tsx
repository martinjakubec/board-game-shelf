import { Metadata } from "next"
import "./globals.css"
import Appbar from "@/components/Appbar/Appbar"

export const metadata: Metadata = {
  title: "Wiiiii",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative bg-lime-50">
        <Appbar />
        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  )
}
