"use client"

import GameCard from "@/components/GameCard/GameCard"
import GameGrid from "@/components/GameGrid/GameGrid"
import PageTitle from "@/components/PageTitle/PageTitle"
import {
  BGGBoardgameResponse,
  boardgameFetcher,
} from "@/utils/boardgame/fetcher"
import { PropsWithChildren } from "react"
import useSWR, { Fetcher } from "swr"

export default function Home() {
  const startId = "199792,199793,174430,3955,284742,154203,218804"
  const {
    data: boardgamesData,
    error,
    isLoading,
  } = useSWR(
    `https://boardgamegeek.com/xmlapi2/thing?id=${startId}&type=boardgame&stats=1`,
    boardgameFetcher
  )
  return (
    <>
      <PageTitle>Shelf</PageTitle>
      {isLoading && <p className="text-slate-600 text-lg">Loading...</p>}
      {boardgamesData && (
        <div className="flex justify-between flex-wrap">
          {/* {JSON.stringify(boardgamesData.items.item[0].name[0].value)} */}
          <GameGrid boardgames={boardgamesData.items.item} />
        </div>
      )}
    </>
  )
}
