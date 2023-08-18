/* eslint-disable @next/next/no-img-element */
import { BGGBoardgameItem } from "@/utils/user/fetcher"
import Image from "next/image"
import { MouseEventHandler } from "react"

export default function GameCard({
  boardgame,
  showModalFunction,
}: {
  boardgame: BGGBoardgameItem
  showModalFunction: (gameId: string) => any
}) {
  const boardgameName = Array.isArray(boardgame.name)
    ? boardgame.name[0].value
    : boardgame.name.value
  return (
    <div
      className="cursor-pointer y-8 rounded-xl bg-lime-300 duration-300 hover:-translate-y-1 overflow-hidden"
      onClick={() => {
        showModalFunction(boardgame.id)
      }}
    >
      <img
        loading="lazy"
        src={boardgame.thumbnail}
        className="w-full aspect-square object-cover bg-lime-200"
        alt={`Cover art for ${boardgameName}`}
      />
      <div className="p-4">
        <h3 className="text-lg">{boardgameName}</h3>
        <p className="text-sm">{boardgame.yearpublished.value}</p>
      </div>
    </div>
  )
}
