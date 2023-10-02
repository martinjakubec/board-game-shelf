/* eslint-disable @next/next/no-img-element */

import { BGGBoardgameItem } from "@/utils/collection/fetcher"
import { Modal } from "../Modal/Modal"
import { ModalTitle } from "../Modal/ModalTitle"
import { ModalBody } from "../Modal/ModalBody"
import Button from "../Button/Button"

export default function GameDetailModal({
  boardgame,
  onClose,
  refetchGames,
}: {
  boardgame: BGGBoardgameItem
  onClose: () => any
  refetchGames: () => any
}) {
  const handleDeleteGame = async () => {
    const deleteGameRequest = await fetch("/api/user/game", {
      method: "DELETE",
      body: JSON.stringify({ gameId: boardgame.id }),
    })
    const deleteGameResponse = await deleteGameRequest.json()
    if (deleteGameResponse.success) {
      console.log("game deleted")
      refetchGames()
      onClose()
    } else {
      console.log("error deleting game")
    }
  }

  return (
    <Modal onClose={onClose}>
      <ModalTitle>
        {Array.isArray(boardgame.name)
          ? boardgame.name[0]?.value
          : boardgame.name.value}{" "}
        ({boardgame.yearpublished.value})
      </ModalTitle>
      <ModalBody>
        <div className="p-4 flex flex-col justify-center align-middle items-center">
          <img
            src={boardgame.image}
            alt={`Cover art for ${boardgame.name}`}
            className="max-h-[250px]"
          />
          {boardgame.source.includes("bgs") && (
            <div className="pt-4">
              <Button
                onClick={handleDeleteGame}
                text="Remove game from shelf"
                type="button"
                variant="danger"
              />
            </div>
          )}
        </div>
        <div className="max-h-[450px] p-4 bg-lime-200 grid grid-cols-2 sm:grid-cols-4 gap-2 gap-y-8">
          <div className="text-center">
            <p className="font-bold text-lg">BGG Rating</p>
            <p>
              {parseFloat(boardgame.statistics.ratings.average.value).toFixed(
                2
              )}
              /10
            </p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">Player Count</p>
            <p>
              {boardgame.minplayers.value} - {boardgame.maxplayers.value}{" "}
              players
            </p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">Playtime</p>
            <p>
              {boardgame.minplaytime.value !== boardgame.maxplaytime.value
                ? `${boardgame.minplaytime.value} - ${boardgame.maxplaytime.value} min`
                : `${boardgame.minplaytime.value} min`}
            </p>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">Complexity</p>
            <p>
              {parseFloat(
                boardgame.statistics.ratings.averageweight.value
              ).toFixed(2)}
              /5
            </p>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}
