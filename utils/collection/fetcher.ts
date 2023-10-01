import { parseStringPromise } from "xml2js"
import { QueryFunction } from "react-query"

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
  bggUsername: string,
  username?: string
): Promise<BGGBoardgameResponse> => {
  // return Promise.resolve(dummyResponse)
  try {
    // ADD HANDLING FOR WHEN USER IS NOT FOUND/HAVE 0 GAMES IN COLLECTION

    const userCollectionResponse = await fetch(
      `https://boardgamegeek.com/xmlapi2/collection?username=${bggUsername}&brief=1&own=1`,
      { method: "GET" }
    )
    const parsedCollectionResponse = await userCollectionResponse.text()

    const collectionData: BGGUserCollectionResponse = await parseStringPromise(
      parsedCollectionResponse,
      {
        ignoreAttrs: !true,
        mergeAttrs: true,
        explicitArray: false,
      }
    )

    const totalItems = parseInt(collectionData.items?.totalitems)
    if (isNaN(totalItems)) throw new Error()

    if (totalItems == 0) {
      return {
        items: {
          item: [],
        },
      } as BGGBoardgameResponse
      // see if the user exists and if it does,
    } else {
    }

    let boardGameIds = collectionData.items.item
      .map((item) => {
        return item.objectid
      })
      .join(",")

    console.log(username)
    if (username) {
      const bgsBoardGameRequest = await fetch(`/api/user/game/${username}`)
      const bgsBoardGameResponse = await bgsBoardGameRequest.json()

      if (bgsBoardGameResponse.success) {
        boardGameIds += "," + bgsBoardGameResponse.data.join(",")
        console.log(boardGameIds)
      } else {
        throw new Error(bgsBoardGameResponse.error)
      }
    }

    const boardGameResponse = await fetch(
      `https://boardgamegeek.com/xmlapi2/thing?id=${boardGameIds}&type=boardgame&stats=1`,
      { method: "GET" }
    )
    const parsedBoardGameResponse = await boardGameResponse.text()
    const boardgameData = await parseStringPromise(parsedBoardGameResponse, {
      ignoreAttrs: !true,
      mergeAttrs: true,
      explicitArray: false,
    })

    return boardgameData as BGGBoardgameResponse
  } catch (err) {
    const error = new Error("User not found", { cause: err })
    throw error
  }
}
