import { BGGBoardgameItem } from "./fetcher"

export function filterByPlayers(
  game: BGGBoardgameItem,
  players?: number
): boolean {
  if (players == undefined) {
    return true
  }
  return (
    parseInt(game.minplayers.value) <= players &&
    parseInt(game.maxplayers.value) >= players
  )
}

export function filterByName(game: BGGBoardgameItem, name?: string): boolean {
  const nameCondition = Array.isArray(game.name)
    ? game.name.some((nameObject) =>
        nameObject.value.toLowerCase().includes(name?.toLowerCase() || "")
      )
    : game.name.value.toLowerCase().includes(name?.toLowerCase() || "")

  return nameCondition
}

export function filterByYear(game: BGGBoardgameItem, year?: number): boolean {
  if (year == undefined) {
    return true
  }
  return parseInt(game.yearpublished.value) === year
}
