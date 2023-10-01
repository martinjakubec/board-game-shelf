import { NextRequest, NextResponse } from "next/server"
import {
  generateErrorResponse,
  generateSuccessResponse,
} from "../../apiUtils/apiUtils"
import { getToken } from "next-auth/jwt"
import prisma from "@/utils/db/prismaClient"
import { Prisma } from "@prisma/client"

enum ChangeBGGUsernameError {
  UNAUTHORIZED = "Unauthorized",
  INVALID_JSON = "Invalid JSON",
  USER_NOT_FOUND = "User not found",
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req }).then((token) => token)
    if (!token) {
      return NextResponse.json(
        generateErrorResponse(ChangeBGGUsernameError.UNAUTHORIZED),
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
        generateErrorResponse(ChangeBGGUsernameError.INVALID_JSON),
        {
          status: 400,
        }
      )
    }

    const { bggUsername } = reqBody

    const updatedUser = await prisma.user.update({
      where: {
        username: token.username,
      },
      data: {
        bggUsername: bggUsername || null,
      },
    })

    return NextResponse.json(
      generateSuccessResponse<string>("BGG username updated successfully"),
      {
        status: 200,
      }
    )
  } catch (err) {
    console.log(err)
    if ((err as Prisma.PrismaClientKnownRequestError).code === "P2025") {
      return NextResponse.json(
        generateErrorResponse(ChangeBGGUsernameError.USER_NOT_FOUND),
        {
          status: 404,
        }
      )
    }
    return NextResponse.json(generateErrorResponse((err as Error).message), {
      status: 500,
    })
  }
}
