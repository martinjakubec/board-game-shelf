/* eslint-disable @next/next/no-img-element */

import { BGGBoardgameItem } from "@/utils/collection/fetcher"
import GameCard from "../GameCard/GameCard"
import { useEffect, useState } from "react"
import GameDetailModal from "../GameDetailModal/GameDetailModal"
import { Modal } from "../Modal/Modal"
import { ModalTitle } from "../Modal/ModalTitle"
import { ModalBody } from "../Modal/ModalBody"

export default function GameGrid({
  boardgames,
}: {
  boardgames: BGGBoardgameItem[]
}) {
  const sortedBoardgames = boardgames.sort((gameA, gameB) => {
    const nameA = Array.isArray(gameA.name)
      ? gameA.name[0]?.value || "N/A"
      : gameA.name.value
    const nameB = Array.isArray(gameB.name)
      ? gameB.name[0]?.value || "N/A"
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

  const [currentBoardgame, setCurrentBoardgame] =
    useState<BGGBoardgameItem | null>(null)

  useEffect(() => {
    if (modalId) {
      setCurrentBoardgame(sortedBoardgames.find((game) => game.id == modalId)!)
    }
  }, [modalId, sortedBoardgames])

  return (
    <>
      {isModalOpen && modalId && currentBoardgame && (
        <GameDetailModal
          boardgame={currentBoardgame}
          onClose={() => {
            setIsModalOpen(false)
            setModalId(null)
          }}
        />
      )}

      {sortedBoardgames.length > 0 ? (
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
      ) : (
        <p>User has 0 boardgames in their BGG collection.</p>
      )}
    </>
  )
}
