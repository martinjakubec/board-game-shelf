import { NextRequest, NextResponse } from "next/server"
import {
  generateErrorResponse,
  generateSuccessResponse,
} from "../../../apiUtils/apiUtils"
import prisma from "@/utils/db/prismaClient"

export type GetUserGamesParams = {
  params: {
    username: string
  }
}

// export enum GetUserGamesError {
//   USER_NOT_FOUND = "User not found",
//   NO_GAMES_FOUND = "No games found",
// }

export async function GET(req: NextRequest, routeParams: GetUserGamesParams) {
  const { username } = routeParams.params

  const userToFind = await prisma.user.findUnique({
    where: {
      username: username,
    },
  })

  if (!userToFind) {
    return NextResponse.json(generateErrorResponse("User not found"), {
      status: 404,
    })
  }

  const games = await prisma.game.findMany({
    where: {
      userId: userToFind.id,
    },
  })

  return NextResponse.json(
    generateSuccessResponse<string[]>(games.map((game) => game.bggGameId)),
    {
      status: 200,
    }
  )
}
