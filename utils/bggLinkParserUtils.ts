export const getIdFromLink = (link: string): string => {
  const regex = /https:\/\/boardgamegeek.com\/boardgame\/(\d*)\//i
  const match = link.match(regex)
  const gameId = match ? match[1] : ""
  return gameId || ""
}

export const isBGGLink = (link: string): boolean => {
  return link.includes("boardgamegeek.com/boardgame/")
}

export const doesBGGGameExist = async (gameId: string): Promise<boolean> => {
  const gameRequest = await fetch(
    `https://boardgamegeek.com/xmlapi2/thing?id=${gameId}&type=boardgame`
  )
  const gameResponse = await gameRequest.text()
  if (gameResponse.match(/<item type="boardgame" id="(\d*)">/)) {
    return true
  }
  return false
}
