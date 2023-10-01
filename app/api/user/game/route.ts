import prisma from "@/utils/db/prismaClient"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import {
  generateErrorResponse,
  generateSuccessResponse,
} from "../../apiUtils/apiUtils"

export enum AddUserGamesError {
  USER_NOT_FOUND = "User not found",
  GAME_ALREADY_IN_COLLECTION = "Game is already in user's collection",
  UNAUTHORIZED = "Unauthorized",
  INVALID_JSON = "Invalid JSON",
  MISSING_REQUIRED_FIELDS = "Missing required fields",
}

export enum AddUserGamesSuccess {
  GAME_ADDED_SUCCESSFULLY = "Game added successfully",
}

export enum RemoveUserGamesError {
  USER_NOT_FOUND = "User not found",
  GAME_NOT_IN_COLLECTION = "Game is not in user's collection",
  UNAUTHORIZED = "Unauthorized",
  INVALID_JSON = "Invalid JSON",
  MISSING_REQUIRED_FIELDS = "Missing required fields",
}

export enum RemoveUserGamesSuccess {
  GAME_REMOVED_SUCCESSFULLY = "Game removed successfully",
}

// adds to user's collection
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req }).then((token) => token)
    if (!token) {
      return NextResponse.json(
        generateErrorResponse(AddUserGamesError.UNAUTHORIZED),
        {
          status: 401,
        }
      )
    }
    let reqBody
    try {
      reqBody = await req.json()
    } catch (err) {
      console.log(err)

      return NextResponse.json(
        generateErrorResponse(AddUserGamesError.INVALID_JSON),
        {
          status: 400,
        }
      )
    }
    const { gameId } = reqBody

    if (!gameId) {
      return NextResponse.json(
        generateErrorResponse(AddUserGamesError.MISSING_REQUIRED_FIELDS),
        {
          status: 400,
        }
      )
    }

    const userToUpdate = await prisma.user.findUnique({
      where: {
        username: token.username,
        deletedAt: null,
      },
    })

    if (!userToUpdate) {
      return NextResponse.json(
        generateErrorResponse(AddUserGamesError.USER_NOT_FOUND),
        {
          status: 404,
        }
      )
    }

    const gameExists = await prisma.game.findFirst({
      where: {
        userId: userToUpdate.id,
        bggGameId: gameId.toString(),
      },
    })

    if (gameExists) {
      return NextResponse.json(
        generateErrorResponse(AddUserGamesError.GAME_ALREADY_IN_COLLECTION),
        {
          status: 400,
        }
      )
    }

    const game = await prisma.game.create({
      data: {
        userId: userToUpdate.id,
        bggGameId: gameId.toString(),
      },
    })

    if (game) {
      return NextResponse.json(
        generateSuccessResponse<string>(
          AddUserGamesSuccess.GAME_ADDED_SUCCESSFULLY
        ),
        {
          status: 200,
        }
      )
    }
  } catch (err) {
    console.log(err)
    return NextResponse.json(generateErrorResponse((err as Error).message), {
      status: 500,
    })
  }
}

// removes from user's collection
export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req }).then((token) => token)
    if (!token) {
      return NextResponse.json(
        generateErrorResponse(RemoveUserGamesError.UNAUTHORIZED),
        {
          status: 401,
        }
      )
    }
    let reqBody
    try {
      reqBody = await req.json()
    } catch (err) {
      console.log(err)

      return NextResponse.json(
        generateErrorResponse(RemoveUserGamesError.INVALID_JSON),
        {
          status: 400,
        }
      )
    }
    const { gameId } = reqBody

    if (!gameId) {
      return NextResponse.json(
        generateErrorResponse(RemoveUserGamesError.MISSING_REQUIRED_FIELDS),
        {
          status: 400,
        }
      )
    }

    const userToUpdate = await prisma.user.findUnique({
      where: {
        username: token.username,
        deletedAt: null,
      },
    })

    if (!userToUpdate) {
      return NextResponse.json(
        generateErrorResponse(RemoveUserGamesError.USER_NOT_FOUND),
        {
          status: 401,
        }
      )
    }

    const gameExists = await prisma.game.findFirst({
      where: {
        userId: userToUpdate.id,
        bggGameId: gameId.toString(),
      },
    })

    if (!gameExists) {
      return NextResponse.json(
        generateErrorResponse(RemoveUserGamesError.GAME_NOT_IN_COLLECTION),
        {
          status: 400,
        }
      )
    }

    await prisma.game.delete({
      where: {
        id: gameExists.id,
      },
    })

    return NextResponse.json(
      generateSuccessResponse<string>(
        RemoveUserGamesSuccess.GAME_REMOVED_SUCCESSFULLY
      ),
      {
        status: 200,
      }
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(generateErrorResponse((err as Error).message), {
      status: 500,
    })
  }
}
