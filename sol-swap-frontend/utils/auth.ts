import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/utils/db'

export const getUserByClerkID = async () => {
  const { userId } = await auth()
  console.log('userid: ', userId)
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        clerkId: userId ?? '', // Check if userId is null and provide a default value
      },
    })
    return user
  } catch (e) {
    console.log('Error : ', e)
  }
}
