"use client"

import GameGrid from "@/components/GameGrid/GameGrid"
import { userCollectionFetcher } from "@/utils/collection/fetcher"
import ShelfBar from "@/components/ShelfBar/ShelfBar"
import { useQuery } from "react-query"

export default function Page({
  params: { username },
}: {
  params: { username: string }
}) {
  const {
    data: boardgamesData,
    error,
    isLoading,
  } = useQuery(["userCollection", "Aenelruun"], () =>
    userCollectionFetcher("Aenelruun")
  )
  // TODO: replace Aenelruun with username

  return (
    <>
      <ShelfBar isAnotherUsersCollection={true} username={username} />
      {isLoading && <p className="text-slate-600 text-lg">Loading...</p>}
      {!!error && (
        <p className="text-slate-600 text-lg">{(error as Error).message}</p>
      )}
      {boardgamesData && (
        <div className="flex justify-between flex-wrap">
          <GameGrid boardgames={boardgamesData.items.item} />
        </div>
      )}
    </>
  )
}
