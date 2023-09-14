"use client"

import Button from "@/components/Button/Button"
import PageTitle from "@/components/PageTitle/PageTitle"
import BGGSection from "@/components/Profile/BGGSection/BGGSection"
import { useSession } from "next-auth/react"

export default function Page() {
  const { data } = useSession()

  return (
    <>
      <PageTitle>Profile - {data?.user.username}</PageTitle>
      <BGGSection bggUsername={data?.user.bggUsername || ""} />
      <Button
        text="test"
        onClick={async () => {
          await fetch("/api/user", { method: "DELETE" })
        }}
      />
    </>
  )
}
