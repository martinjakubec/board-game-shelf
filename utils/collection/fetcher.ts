import { Fetcher } from "swr"
import { parseStringPromise } from "xml2js"

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

export const userCollectionFetcher: Fetcher<BGGBoardgameResponse> = async (
  username: string
) => {
  try {
    // ADD HANDLING FOR WHEN USER IS NOT FOUND/HAVE 0 GAMES IN COLLECTION

    const userCollectionResponse = await fetch(
      `https://boardgamegeek.com/xmlapi2/collection?username=${username}&brief=1&own=1`,
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

    const boardGameIds = collectionData.items.item
      .map((item) => {
        return item.objectid
      })
      .join(",")
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
    // error.
    throw error
  }
}
