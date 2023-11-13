"use client"

import GameGrid from "@/components/GameGrid/GameGrid"
import { userCollectionFetcher } from "@/utils/collection/fetcher"
import ShelfBar from "@/components/ShelfBar/ShelfBar"
import { useQuery } from "react-query"
import { AddGame } from "@/components/AddGame/AddGame"
import { useSession } from "next-auth/react"
// import FilterBar from "@/components/FilterBar/FilterBar"
// import { useState } from "react"
// import Button from "@/components/Button/Button"

export interface FilterState {
  name?: string
  players?: number
  playTime?: number[]
  complexity?: number[]
  yearPublished?: number[]
}

export default function Page() {
  const { data, status } = useSession()

  // const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true)

  // const [filter, setFilter] = useState<FilterState>({})

  const {
    data: boardgamesData,
    error,
    isLoading,
    refetch,
  } = useQuery(
    ["userCollection", data?.user.username],
    () => userCollectionFetcher(data!.user.username),
    {
      enabled: status === "authenticated" && !!data?.user.username,
      retryDelay: 2000,
    }
  )

  return (
    <>
      <ShelfBar isAnotherUsersCollection={false} />
      {/* <Button
        text={isFilterOpen ? "Hide filter" : "Show filter"}
        onClick={() => {
          setIsFilterOpen((prevValue) => {
            return !prevValue
          })
        }}
      />
      {isFilterOpen && <FilterBar filter={filter} setFilter={setFilter} />} */}
      <div className="py-4">
        <AddGame refetch={refetch} />
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
            <GameGrid
              // filter={filter}
              boardgames={boardgamesData.items.item}
              refetch={refetch}
            />
          )}
        </div>
      )}
    </>
  )
}
