"use client"

import GameGrid from "@/components/GameGrid/GameGrid"
import PageTitle from "@/components/PageTitle/PageTitle"
import { userCollectionFetcher } from "@/utils/collection/fetcher"
import { FormEventHandler, useRef } from "react"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import ShelfBar from "@/components/ShelfBar/ShelfBar"

export default function Page({ params: { username } }: { params: { username: string } }) {
  const {
    data: boardgamesData,
    error: boardgamesError,
    isLoading,
  } = useSWR(username, userCollectionFetcher)

  return (
    <>
      <ShelfBar isAnotherUsersCollection={true} username={username} />
      {isLoading && <p className="text-slate-600 text-lg">Loading...</p>}
      {boardgamesError && (
        <p className="text-slate-600 text-lg">{boardgamesError.message}</p>
      )}
      {boardgamesData && (
        <div className="flex justify-between flex-wrap">
          <GameGrid boardgames={boardgamesData.items.item} />
        </div>
      )}
    </>
  )
}
