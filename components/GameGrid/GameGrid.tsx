import { BGGBoardgameItem } from "@/utils/boardgame/fetcher"
import GameCard from "../GameCard/GameCard"
import { useEffect, useState } from "react"
import GameDetailModal from "../GameDetailModal/GameDetailModal"

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalId, setModalId] = useState<null | string>(null)

  const showModal = (gameId: string) => {
    setIsModalOpen(true)
    setModalId(gameId)
  }

  const hideModal = (e: KeyboardEvent | null) => {
    console.log("hiding")

    if (e && e.type == "keydown" && (e as KeyboardEvent).code == "Escape") {
      setModalId(null)
      setIsModalOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", hideModal)

    return () => {
      document.removeEventListener("keydown", hideModal)
    }
  }, [])

  return (
    <>
      {isModalOpen && modalId && (
        <GameDetailModal
          isOpen={isModalOpen}
          boardgame={sortedBoardgames.find((game) => game.id == modalId)!}
          hideModalFunction={() => {
            setModalId(null)
            setIsModalOpen(false)
          }}
        />
      )}

      <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full gap-6">
        {sortedBoardgames.map((game) => {
          return (
            <GameCard
              boardgame={game}
              key={game.id}
              showModalFunction={showModal}
            />
          )
        })}
      </div>
    </>
  )
}
