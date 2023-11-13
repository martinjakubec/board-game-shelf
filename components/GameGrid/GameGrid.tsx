/* eslint-disable @next/next/no-img-element */

import { BGGBoardgameItem } from "@/utils/collection/fetcher"
import GameCard from "../GameCard/GameCard"
import { useEffect, useMemo, useState } from "react"
import GameDetailModal from "../GameDetailModal/GameDetailModal"
// import { FilterState } from "@/app/shelf/page"
// import { filterByPlayers } from "@/utils/collection/filter"

interface GameGridProps {
  boardgames: BGGBoardgameItem[]
  refetch: () => any
  // filter: FilterState
}

export default function GameGrid({
  boardgames,
  refetch,
  // filter,
}: GameGridProps) {
  // const sortedAndFilteredBoardgames = useMemo(() => {
  //   let filteredBoardgames = boardgames.filter(
  //     (game) => {
  //       return filterByPlayers(game, filter.players)
  //     }
  //   )
  //   return filteredBoardgames
  // }, [boardgames, filter])

  const alphabeticallySortedBoardgames = useMemo(() => {
    // sort boardgames alphabetically by name using a - b
    return boardgames.sort((a, b) => {
      return a.name > b.name ? 1 : -1
    })
  }, [boardgames])

  // MODAL STUFF
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalId, setModalId] = useState<null | string>(null)

  const showModal = (gameId: string) => {
    setIsModalOpen(true)
    setModalId(gameId)
  }

  const [currentBoardgame, setCurrentBoardgame] =
    useState<BGGBoardgameItem | null>(null)

  useEffect(() => {
    if (modalId) {
      setCurrentBoardgame(boardgames.find((game) => game.id == modalId)!)
    }
  }, [modalId, boardgames])

  return (
    <>
      {isModalOpen && modalId && currentBoardgame && (
        <GameDetailModal
          boardgame={currentBoardgame}
          onClose={() => {
            setIsModalOpen(false)
            setCurrentBoardgame(null)
            setModalId(null)
          }}
          refetchGames={refetch}
        />
      )}

      {/* {sortedAndFilteredBoardgames.length > 0 ? (
        <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full gap-6">
          {sortedAndFilteredBoardgames.map((game) => {
            return (
              <GameCard
                boardgame={game}
                key={game.id}
                showModalFunction={showModal}
              />
            )
          })}
        </div>
      ) : boardgames.length > 0 ? (
        <p>No games match your filter criteria.</p>
      ) : (
        <p>User has 0 boardgames in their shelf.</p>
      )} */}

      {alphabeticallySortedBoardgames.length > 0 ? (
        <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full gap-6">
          {alphabeticallySortedBoardgames.map((game) => {
            return (
              <GameCard
                boardgame={game}
                key={game.id}
                showModalFunction={showModal}
              />
            )
          })}
        </div>
      ) : boardgames.length > 0 ? (
        <p>No games match your filter criteria.</p>
      ) : (
        <p>User has 0 boardgames in their shelf.</p>
      )}
    </>
  )
}
