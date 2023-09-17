import prisma from "@/utils/db/prismaClient"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import {
  generateErrorResponse,
  generateSuccessResponse,
} from "../apiUtils/apiUtils"

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req }).then((token) => token)
  if (!token)
    return NextResponse.json(generateErrorResponse("Unauthorized"), {
      status: 401,
    })
  try {
    console.info(`Deleting user ${token.username}`)
    const deletedUser = await prisma.user.update({
      where: { username: token.username },
      data: { deletedAt: new Date() },
    })

    if (deletedUser)
      return NextResponse.json(
        generateSuccessResponse<string>("User successfully deleted"),
        { status: 200 }
      )
  } catch (err) {
    console.error(err)
    return NextResponse.json(generateErrorResponse((err as Error).message), {
      status: 500,
    })
  }
}
