import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key') as unknown as string
  try {
    const user = await getUserByClerkID()

    if (user) {
      const userWallet = await prisma.solWallet.upsert({
        where: {
          userId: user.id,
        },
        update: {
          publicKey: key,
        },
        create: {
          userId: user.id,
          publicKey: key,
          privateKey: '',
        },
        select: {
          publicKey: true,
        }
      })

      // console.log('User wallet updated:', userWallet)
      return NextResponse.json({ res: userWallet})
    } else {
      console.error('User not found')
    }
  } catch (error) {
    console.error('Error updating user wallet:', error)
  }
}
