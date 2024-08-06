import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Keypair} from '@solana/web3.js'

const createNewUser = async () => {
  const user = await currentUser()
  const keypair = Keypair.generate()
  const publicKey = keypair.publicKey.toBase58()
  const privateKey = keypair.secretKey

  console.log('user: ', user)

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id ?? '',
        username: user?.emailAddresses[0].emailAddress ?? '',
        solWallet: {
          create: {
            publicKey: publicKey,
            privateKey: privateKey.toString(),
          }
        },
        inrWallet: {
          create: {
            balance: 0
          }
        }
      },
    })
  }

  redirect('/home')
}

const NewUser = async () => {
  await createNewUser()
  return <div>...loading</div>
}

export default NewUser
