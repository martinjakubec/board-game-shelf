import { parseStringPromise } from "xml2js"
import { QueryFunction } from "react-query"
import { ApiError, ApiSuccess } from "@/app/api/apiUtils/apiUtils"

export type BGGBoardgameItem = {
  type: string
  id: string
  thumbnail: string
  image: string
  name:
    | {
        type: "primary" | "alternate"
        sortindex: number
        value: string
      }[]
    | {
        type: "primary" | "alternate"
        sortindex: number
        value: string
      }
  description: string
  yearpublished: {
    value: string
  }
  minplayers: {
    value: string
  }
  maxplayers: {
    value: string
  }
  minplaytime: {
    value: string
  }
  maxplaytime: {
    value: string
  }
  minage: {
    value: string
  }
  statistics: {
    ratings: {
      average: {
        value: string
      }
      averageweight: {
        value: string
      }
    }
  }
  source: ("bgs" | "bgg")[]
}

export type BGGBoardgameResponse = {
  items: {
    [key: string]: any
    item: BGGBoardgameItem[]
  }
}

export type BGGBoardgameCollectionItem = {
  objectid: string
  collid: string
}

export type BGGUserCollectionResponse = {
  items: {
    item: BGGBoardgameCollectionItem[]
    totalitems: string
  }
}

const dummyResponse: BGGBoardgameResponse = {
  items: {
    item: [
      {
        description: "Test description",
        source: ["bgs", "bgg"],
        id: "3955",
        image:
          "https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__original/img/AkbtYVc6xXJF3c9EUrakklcclKw=/0x0/filters:format(png)/pic6973671.png",
        maxplayers: {
          value: "2",
        },
        maxplaytime: {
          value: "20",
        },
        minage: {
          value: "20",
        },
        minplayers: {
          value: "20",
        },
        minplaytime: {
          value: "20",
        },
        name: [
          {
            sortindex: 1,
            type: "primary",
            value: "Test game",
          },
        ],
        thumbnail:
          "https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__original/img/AkbtYVc6xXJF3c9EUrakklcclKw=/0x0/filters:format(png)/pic6973671.png",
        statistics: {
          ratings: {
            average: {
              value: "2",
            },
            averageweight: {
              value: "4",
            },
          },
        },
        type: "BG type",
        yearpublished: {
          value: "2000",
        },
      },
    ],
  },
}

export const userCollectionFetcher = async (
  username: string
): Promise<BGGBoardgameResponse> => {
  // return Promise.resolve(dummyResponse)
  try {
    const bgsBoardGameRequest = await fetch(`/api/user/game/${username}`)
    const bgsBoardGameResponse = await bgsBoardGameRequest.json()

    let bgsBoardgameIds: string[] = []
    let bggBoardgameIds: string[] = []

    let boardGameIds = ""

    if (bgsBoardGameResponse.success) {
      bgsBoardgameIds.push(...bgsBoardGameResponse.data)
      boardGameIds = bgsBoardGameResponse.data.join(",")
    } else {
      throw new Error(bgsBoardGameResponse.error)
    }

    const bggUsernameRequest = await fetch(`/api/user/bggUsername/${username}`)
    const bggUsernameResponse: ApiSuccess<{ bggUsername: string }> | ApiError =
      await bggUsernameRequest.json()
    let bggUsername
    if (bggUsernameResponse.success) {
      bggUsername = bggUsernameResponse.data.bggUsername
    }

    if (bggUsername) {
      const doesUserExistRequest = await fetch(
        `https://boardgamegeek.com/xmlapi2/user?name=${bggUsername}`,
        { method: "GET" }
      )

      const doesUserExistResponse = await doesUserExistRequest.text()

      const doesUserExistData = await parseStringPromise(
        doesUserExistResponse,
        {
          ignoreAttrs: !true,
          mergeAttrs: true,
          explicitArray: false,
        }
      )

      if (doesUserExistData.user.id) {
        const userCollectionResponse = await fetch(
          `https://boardgamegeek.com/xmlapi2/collection?username=${bggUsername}&brief=1&own=1`,
          { method: "GET" }
        )
        const parsedCollectionResponse = await userCollectionResponse.text()

        const collectionData: BGGUserCollectionResponse =
          await parseStringPromise(parsedCollectionResponse, {
            ignoreAttrs: !true,
            mergeAttrs: true,
            explicitArray: false,
          })

        const totalItems = parseInt(collectionData.items?.totalitems)
        console.log(totalItems, isNaN(totalItems))
        if (isNaN(totalItems)) throw new Error("hurr")

        totalItems > 0 &&
          (boardGameIds +=
            "," +
            collectionData.items.item
              .map((item) => {
                bggBoardgameIds.push(item.objectid)
                return item.objectid
              })
              .join(","))
      }
    }

    console.log(boardGameIds)

    if (boardGameIds.length === 0) {
      return {
        items: {
          item: [],
        },
      } as BGGBoardgameResponse
    }

    const setBoardGameIds = new Set(boardGameIds.split(","))
    console.log("setBoardgameids", setBoardGameIds)

    boardGameIds = Array.from(setBoardGameIds).join(",")
    console.log("boardGameIds", boardGameIds)

    const boardGameResponse = await fetch(
      `https://boardgamegeek.com/xmlapi2/thing?id=${boardGameIds}&type=boardgame&stats=1`,
      { method: "GET" }
    )
    if (boardGameResponse.status !== 429) {
      console.log("BGG API too many requests.")
    }
    const parsedBoardGameResponse = await boardGameResponse.text()
    const boardgameData: BGGBoardgameResponse = await parseStringPromise(
      parsedBoardGameResponse,
      {
        ignoreAttrs: !true,
        mergeAttrs: true,
        explicitArray: false,
      }
    )

    // ensures that the item property is always an array
    Array.isArray(boardgameData.items.item) ||
      (boardgameData.items.item = [boardgameData.items.item])

    boardgameData.items.item.forEach((item) => {
      item.source = []
      if (bggBoardgameIds.includes(item.id)) item.source.push("bgg")
      if (bgsBoardgameIds.includes(item.id)) item.source.push("bgs")
    })

    return boardgameData
  } catch (err) {
    console.error(err)
    const error = new Error((err as Error).message, { cause: err })
    throw error
  }
}
