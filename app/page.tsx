import PageTitle from "@/components/PageTitle/PageTitle"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Board Game Shelf",
}
export default function Home() {
  return <PageTitle>{"'Ello"}</PageTitle>
}
