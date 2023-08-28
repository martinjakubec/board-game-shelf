"use client"

import GameGrid from "@/components/GameGrid/GameGrid"
import PageTitle from "@/components/PageTitle/PageTitle"
import { FormEventHandler, useRef, useState } from "react"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { userCollectionFetcher } from "@/utils/collection/fetcher"
import ShelfBar from "@/components/ShelfBar/ShelfBar"

export default function Home() {
  const startId = "199792,199793,174430,3955,284742,154203,218804"
  const {
    data: boardgamesData,
    error,
    isLoading,
  } = useSWR("Aenelruun", userCollectionFetcher)

  const [otherUsername, setOtherUsername] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  return (
    <>
      <ShelfBar isAnotherUsersCollection={false} />
      {isLoading && <p className="text-slate-600 text-lg">Loading...</p>}
      {boardgamesData && (
        <div className="flex justify-between flex-wrap">
          {/* {JSON.stringify(boardgamesData.items.item[0])} */}
          <GameGrid boardgames={boardgamesData.items.item} />
        </div>
      )}
    </>
  )
}
