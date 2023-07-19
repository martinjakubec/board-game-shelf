import { BGGBoardgameItem } from "@/utils/boardgame/fetcher"
import GameCard from "../GameCard/GameCard"

export default function GameGrid({
  boardgames,
}: {
  boardgames: BGGBoardgameItem[]
}) {
  const sortedBoardgames = boardgames.sort((gameA, gameB) => {
    const nameA = Array.isArray(gameA.name)
      ? gameA.name[0].value
      : gameA.name.value
    const nameB = Array.isArray(gameB.name)
      ? gameB.name[0].value
      : gameB.name.value
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })

  return (
    <>
      <p>Modal which shows a game&apos;s info</p>

      <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full gap-6">
        {sortedBoardgames.map((game) => {
          return <GameCard boardgame={game} key={game.id} />
        })}
      </div>
    </>
  )
}
