"use client"

import PageTitle from "@/components/PageTitle/PageTitle"
import BGGSection from "@/components/Profile/BGGSection/BGGSection"
import UserInfoSection from "@/components/Profile/UserInfoSection/UserInfoSection"
import { useSession } from "next-auth/react"
import { useQuery } from "react-query"
import { ApiError, ApiSuccess } from "../api/apiUtils/apiUtils"

export default function Page() {
  const { data } = useSession()

  return (
    <>
      <PageTitle>Profile settings - {data?.user.username}</PageTitle>
      <BGGSection
        username={data?.user.username || ""}
      />
      <UserInfoSection />
    </>
  )
}
