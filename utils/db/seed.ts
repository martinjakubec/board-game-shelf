import prisma from "./prismaClient"

;(async () => {
  await prisma.user.create({
    data: {
      bggUsername: "aenelruun",
      
    },
  })
})()
