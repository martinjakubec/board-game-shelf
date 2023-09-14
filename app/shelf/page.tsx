"use client"

import GameGrid from "@/components/GameGrid/GameGrid"
import {
  BGGBoardgameResponse,
  userCollectionFetcher,
} from "@/utils/collection/fetcher"
import ShelfBar from "@/components/ShelfBar/ShelfBar"
import { useQuery } from "react-query"

export default function Home() {
  const {
    data: boardgamesData,
    error,
    isLoading,
  } = useQuery(["userCollection", "Aenelruun"], () =>
    userCollectionFetcher("Aenelruun")
  ) // TODO: replace Aenelruun with username

  return (
    <>
      <ShelfBar isAnotherUsersCollection={false} />
      {isLoading && <p className="text-slate-600 text-lg">Loading...</p>}
      {boardgamesData && (
        <div className="flex justify-between flex-wrap">
          {!!error && (
            <p className="text-slate-600 text-lg">
              Error: {(error as Error).message}
            </p>
          )}
          {boardgamesData && (
            <GameGrid boardgames={boardgamesData.items.item} />
          )}
        </div>
      )}
    </>
  )
}
