import { dummyResponse } from "../testData"
import { filterByName, filterByPlayers, filterByYear } from "./filter"

describe("Testing filtering by player count", () => {
  test("Should return only games that are playable by 2 players", () => {
    const originalBoardgames = dummyResponse.items.item
    const players = 2
    const filteredBoardgames = originalBoardgames.filter((game) => {
      return filterByPlayers(game, players)
    })

    expect(filteredBoardgames.length).toBe(2)
  })

  test("Should return only games that are playable by 1 player", () => {
    const originalBoardgames = dummyResponse.items.item
    const players = 1
    const filteredBoardgames = originalBoardgames.filter((game) => {
      return filterByPlayers(game, players)
    })

    expect(filteredBoardgames.length).toBe(1)
  })

  test("Should return only games that are playable by 5 players", () => {
    const originalBoardgames = dummyResponse.items.item
    const players = 5
    const filteredBoardgames = originalBoardgames.filter((game) => {
      return filterByPlayers(game, players)
    })

    expect(filteredBoardgames.length).toBe(1)
  })

  test("Should return no games when the filter is outside the scope", () => {
    const originalBoardgames = dummyResponse.items.item
    const players = 0
    const filteredBoardgames = originalBoardgames.filter((game) => {
      return filterByPlayers(game, players)
    })

    expect(filteredBoardgames.length).toBe(0)
  })

  test("Should return all games when the filter is not set", () => {
    const originalBoardgames = dummyResponse.items.item
    const filteredBoardgames = originalBoardgames.filter((game) => {
      return filterByPlayers(game)
    })

    expect(filteredBoardgames.length).toBe(2)
  })
})

describe("Testing filtering by name", () => {
  test("Should return all games when the filter is empty", () => {
    const originalBoardgames = dummyResponse.items.item
    const filteredBoardgames = originalBoardgames.filter((game) => {
      return filterByName(game)
    })

    expect(filteredBoardgames.length).toBe(2)
  })

  test("Should return only games that contain the word 'aaa'", () => {
    const originalBoardgames = dummyResponse.items.item
    const name = "aaa"
    const filteredBoardgames = originalBoardgames.filter((game) => {
      return filterByName(game, name)
    })

    expect(filteredBoardgames.length).toBe(1)
  })

  test("Should return only games that contain the word 'bbb'", () => {
    const originalBoardgames = dummyResponse.items.item
    const name = "bbb"
    const filteredBoardgames = originalBoardgames.filter((game) => {
      return filterByName(game, name)
    })

    expect(filteredBoardgames.length).toBe(0)
  })
})

describe("Testing filtering by year", () => {
  test("Should return all games when the filter is empty", () => {
    const originalBoardgames = dummyResponse.items.item
    const filteredBoardgames = originalBoardgames.filter((game) => {
      return filterByYear(game)
    })

    expect(filteredBoardgames.length).toBe(2)
  })
})
