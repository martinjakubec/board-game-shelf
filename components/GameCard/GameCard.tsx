import { BGGBoardgameItem } from "@/utils/boardgame/fetcher"
import Image from "next/image"

export default function GameCard({
  boardgame,
}: {
  boardgame: BGGBoardgameItem
}) {
  const boardgameName = boardgame.name[0].$.value
  return (
    <div
      className="w-48 h-56 p-4"
      style={{
        backgroundImage: `url("${boardgame.image[0]}")`,
        // backgroundColor: "blue",
      }}
    >
      <p>{boardgameName}</p>
    </div>
  )

  // <p>{boardgame.$.id}</p>
}
