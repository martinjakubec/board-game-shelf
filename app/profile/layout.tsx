import { Metadata } from "next"

export const metadata: Metadata = {
  title: "BGS - Profile",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
