"use client"

import GameCard from "@/components/GameCard/GameCard"
import {
  BGGBoardgameResponse,
  boardgameFetcher,
} from "@/utils/boardgame/fetcher"
import { PropsWithChildren } from "react"
import useSWR, { Fetcher } from "swr"

export default function Home() {
  const startId = "199792,199793"
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
      <h1 className="mt-10 font-bold text-5xl mb-6">Shelf</h1>
      {isLoading && <p className="text-slate-600 text-lg">Loading...</p>}
      {boardgamesData && (
        <div className="flex justify-between flex-wrap">
          {boardgamesData.items.item.map((game) => {
            return <GameCard key={game.$.id} boardgame={game} />
          })}
        </div>
      )}
    </>
  )
}
