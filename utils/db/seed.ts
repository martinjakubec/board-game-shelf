import { hash } from "bcrypt"
import prisma from "./prismaClient"
;(async () => {
  await prisma.user.create({
    data: {
      bggUsername: "aenelruun",
      password: await hash("123", 10),
      username: "123",
    },
  })
})()
