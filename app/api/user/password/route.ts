import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import {
  generateErrorResponse,
  generateSuccessResponse,
} from "../../apiUtils/apiUtils"
import prisma from "@/utils/db/prismaClient"
import { compare, hash } from "bcrypt"
import { isNewPasswordValid } from "../../apiUtils/passwordValidator"

export enum PasswordChangeErrors {
  PASSWORD_NOT_VALID = "New password is not valid. Make sure to include one lowercase letter, one uppercase letter, one number and one special character.",
  INCORRECT_PASSWORD = "Incorrect password",
  INCOMPLETE_REQUEST_BODY = "Request body is missing required fields.",
}

export enum PasswordChangeSuccess {
  PASSWORD_SUCCESSFULLY_UPDATED = "Password successfully updated",
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req }).then((token) => token)
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const { oldPassword, newPassword } = await req.json()

    if (oldPassword && newPassword) {
      if (!isNewPasswordValid(newPassword)) {
        return NextResponse.json(
          generateErrorResponse(PasswordChangeErrors.PASSWORD_NOT_VALID),
          {
            status: 400,
          }
        )
      }
      const user = await prisma.user.findUnique({
        where: { username: token.username },
      })
      if (user && (await compare(oldPassword, user.password))) {
        const updatedUser = await prisma.user.update({
          where: { username: token.username },
          data: { password: await hash(newPassword, 10) },
        })
        return NextResponse.json(
          generateSuccessResponse<string>(
            PasswordChangeSuccess.PASSWORD_SUCCESSFULLY_UPDATED
          ),
          { status: 200 }
        )
      }
      return NextResponse.json(
        generateErrorResponse(PasswordChangeErrors.INCORRECT_PASSWORD),
        {
          status: 400,
        }
      )
    }
    return NextResponse.json(
      generateErrorResponse(PasswordChangeErrors.INCOMPLETE_REQUEST_BODY),
      { status: 400 }
    )
  } catch (err) {
    console.error(err)
    return NextResponse.json(generateErrorResponse((err as Error).message), {
      status: 500,
    })
  }
}
