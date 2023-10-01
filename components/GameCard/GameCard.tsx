/* eslint-disable @next/next/no-img-element */
import { BGGBoardgameItem } from "@/utils/collection/fetcher"

export default function GameCard({
  boardgame,
  showModalFunction,
}: {
  boardgame: BGGBoardgameItem
  showModalFunction: (gameId: string) => any
}) {
  const boardgameName = Array.isArray(boardgame.name)
    ? boardgame.name[0]?.value
    : boardgame.name.value
  return (
    <div
      tabIndex={0}
      className="cursor-pointer y-8 rounded-xl bg-lime-300 hover:bg-lime-500 focus:bg-lime-500 focus:outline-none border-4 border-transparent focus:border-lime-700 duration-200 focus:-translate-y-1 hover:-translate-y-1 will-change-transform overflow-hidden"
      onClick={() => {
        showModalFunction(boardgame.id)
      }}
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          showModalFunction(boardgame.id)
        }
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
