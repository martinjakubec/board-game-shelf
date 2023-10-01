"use client"

import PageTitle from "@/components/PageTitle/PageTitle"
import BGGSection from "@/components/Profile/BGGSection/BGGSection"
import UserInfoSection from "@/components/Profile/UserInfoSection/UserInfoSection"
import { useSession } from "next-auth/react"
import { useQuery } from "react-query"
import { ApiError, ApiSuccess } from "../api/apiUtils/apiUtils"

export default function Page() {
  const { data } = useSession()

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery("user", async (): Promise<string> => {
    const request = await fetch("/api/user/bggUsername")
    const response: ApiSuccess<{ bggUsername: string }> | ApiError =
      await request.json()
    if (response.success) {
      return response.data.bggUsername
    }
    throw new Error(response.error)
  })

  return (
    <>
      <PageTitle>Profile settings - {data?.user.username}</PageTitle>
      <BGGSection
        bggUsername={userData || ""}
        onUsernameChange={() => {
          refetch()
        }}
        isLoading={isLoading}
      />
      <UserInfoSection />
    </>
  )
}
