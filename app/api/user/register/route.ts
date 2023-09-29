import prisma from "@/utils/db/prismaClient"
import { hash } from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
import {
  generateErrorResponse,
  generateSuccessResponse,
} from "../../apiUtils/apiUtils"
import { isNewPasswordValid } from "../../apiUtils/passwordValidator"

export async function POST(req: NextRequest) {
  let reqBody
  try {
    reqBody = await req.json()
  } catch (err) {
    return NextResponse.json(generateErrorResponse((err as Error).message), {
      status: 400,
    })
  }

  const { username, password, bggUsername } = reqBody

  console.log("reqBody", reqBody);
  console.log(username, password, bggUsername);
  

  if (!username || !password) {
    return NextResponse.json(generateErrorResponse("Missing required fields"), {
      status: 400,
    })
  }

  if (isNewPasswordValid(password) === false) {
    return NextResponse.json(
      generateErrorResponse("Password does not meet requirements"),
      {
        status: 400,
      }
    )
  }

  try {
    const doesUserExist = await prisma.user.findFirst({
      where: {
        username,
      },
    })

    if(doesUserExist) {
      return NextResponse.json(generateErrorResponse("User already exists"), {
        status: 400,
      })
    }

    const hashedPassword = await hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        bggUsername: bggUsername || undefined,
      },
    })

    if (newUser)
      return NextResponse.json(
        generateSuccessResponse<string>("User successfully created"),
        { status: 200 }
      )
  } catch (err) {
    console.error(err)
    return NextResponse.json(generateErrorResponse((err as Error).message), {
      status: 500,
    })
  }
}
