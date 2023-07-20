/* eslint-disable @next/next/no-img-element */

import { BGGBoardgameItem } from "@/utils/boardgame/fetcher"

export default function GameDetailModal({
  boardgame,
  isOpen,
  hideModalFunction,
}: {
  boardgame: BGGBoardgameItem
  isOpen: boolean
  hideModalFunction: () => any
}) {
  const boardgameName = Array.isArray(boardgame.name)
    ? boardgame.name[0].value
    : boardgame.name.value
  return (
    <div
      className={`fixed h-screen w-screen bg-slate-500 bg-opacity-50 z-10 top-0 left-0 ${
        isOpen ? "" : "hidden"
      }`}
      onClick={hideModalFunction}
    >
      <div
        className="fixed rounded-lg bg-slate-100 max-w-[500px] w-full  left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 overflow-hidden"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="p-2 w-full bg-lime-500 text-center font-bold text-white">
          <h2 className="text-2xl">
            {Array.isArray(boardgame.name)
              ? boardgame.name[0].value
              : boardgame.name.value}{" "}
            ({boardgame.yearpublished.value})
          </h2>
        </div>
        <div className="overflow-y-auto">
          <div className="p-4 flex justify-center ">
            <img
              src={boardgame.image}
              alt={`Cover art for ${boardgameName}`}
              className="max-h-[250px]"
            />
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
        </div>
      </div>
    </div>
  )
}
