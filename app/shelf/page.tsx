"use client"

import GameGrid from "@/components/GameGrid/GameGrid"
import useSWR from "swr"
import { userCollectionFetcher } from "@/utils/collection/fetcher"
import ShelfBar from "@/components/ShelfBar/ShelfBar"

export default function Home() {
  const {
    data: boardgamesData,
    error,
    isLoading,
  } = useSWR("Aenelruun", userCollectionFetcher)

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
