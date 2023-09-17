"use client"

import PageTitle from "@/components/PageTitle/PageTitle"
import BGGSection from "@/components/Profile/BGGSection/BGGSection"
import UserInfoSection from "@/components/Profile/UserInfoSection/UserInfoSection"
import { useSession } from "next-auth/react"

export default function Page() {
  const { data } = useSession()

  return (
    <>
      <PageTitle>Profile settings - {data?.user.username}</PageTitle>
      <BGGSection bggUsername={data?.user.bggUsername || ""} />
      <UserInfoSection />
    </>
  )
}
