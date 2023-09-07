"use client"

import PageTitle from "@/components/PageTitle/PageTitle"
import BGGSection from "@/components/Profile/BGGSection/BGGSection"
import { useSession } from "next-auth/react"

export default function Page() {
  const { data } = useSession()

  return (
    <>
      <PageTitle>Profile - {data?.user.username}</PageTitle>
      <BGGSection bggUsername={data?.user.bggUsername || ""} />
    </>
  )
}
