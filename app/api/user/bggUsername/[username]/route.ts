import {
  generateErrorResponse,
  generateSuccessResponse,
} from "@/app/api/apiUtils/apiUtils"
import prisma from "@/utils/db/prismaClient"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

enum GetBGGUsernameError {
  UNAUTHORIZED = "Unauthorized",
  USER_NOT_FOUND = "User not found",
}

export type GetBGGUsernameGamesParams = {
  params: {
    username: string
  }
}

export async function GET(
  req: NextRequest,
  { params: { username } }: GetBGGUsernameGamesParams
) {
  try {
    // const token = await getToken({ req }).then((token) => token)
    // if (!token) {
    //   return NextResponse.json(
    //     generateErrorResponse(GetBGGUsernameError.UNAUTHORIZED),
    //     {
    //       status: 401,
    //     }
    //   )
    // }

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })

    if (!user) {
      return NextResponse.json(
        generateErrorResponse(GetBGGUsernameError.USER_NOT_FOUND),
        {
          status: 404,
        }
      )
    }

    return NextResponse.json(
      generateSuccessResponse<{ bggUsername: string | null }>({
        bggUsername: user.bggUsername,
      }),
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
