import { Fetcher } from "swr"
import { parseString, parseStringPromise } from "xml2js"

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
    }
  }
}

export type BGGBoardgameResponse = {
  items: {
    [key: string]: any
    item: BGGBoardgameItem[]
  }
}

export const boardgameFetcher: Fetcher<BGGBoardgameResponse> = (
  arg: string
) => {
  return fetch(arg, { method: "GET" })
    .then((res) => res.text())
    .then(async (res: string) => {
      const object = await parseStringPromise(res, {
        ignoreAttrs: !true,
        mergeAttrs: true,
        explicitArray: false,
      })
      return object as BGGBoardgameResponse
    })
    .catch((err) => {
      console.error(err)
      throw err
    })
}
