/* eslint-disable @next/next/no-img-element */
import { BGGBoardgameItem } from "@/utils/boardgame/fetcher"
import Image from "next/image"

export default function GameCard({
  boardgame,
}: {
  boardgame: BGGBoardgameItem
}) {
  const boardgameName = Array.isArray(boardgame.name)
    ? boardgame.name[0].value
    : boardgame.name.value
  return (
    <div className="y-8 rounded-xl bg-white duration-300 hover:-translate-y-1 overflow-hidden">
      <img
        loading="lazy"
        src={boardgame.image}
        className="w-full aspect-square object-cover bg-lime-200"
        alt={`Cover art for ${boardgameName}`}
      />
      <div className="p-4">
        <h3 className="text-lg">{boardgameName}</h3>
        <p className="">{boardgameName}</p>
      </div>
    </div>
  )
}
