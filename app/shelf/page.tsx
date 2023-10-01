"use client"

import GameGrid from "@/components/GameGrid/GameGrid"
import {
  BGGBoardgameResponse,
  userCollectionFetcher,
} from "@/utils/collection/fetcher"
import ShelfBar from "@/components/ShelfBar/ShelfBar"
import { useQuery } from "react-query"
import { AddGame } from "@/components/AddGame/AddGame"
import { useSession } from "next-auth/react"

export default function Page() {
  const { data, status } = useSession()

  const {
    data: boardgamesData,
    error,
    isLoading,
  } = useQuery(
    ["userCollection", "Aenelruun"],
    () => userCollectionFetcher("Aenelruun", data!.user.username),
    { enabled: status === "authenticated" && !!data?.user.username }
  ) 
  // TODO: replace Aenelruun with username

  return (
    <>
      <ShelfBar isAnotherUsersCollection={false} />
      <div className="py-4">
        <AddGame />
      </div>
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
