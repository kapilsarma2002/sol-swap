import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Keypair} from '@solana/web3.js'

const createNewUser = async () => {
  const user = await currentUser()
  const keypair = Keypair.generate()
  const publicKey = keypair.publicKey.toBase58()
  const privateKey = keypair.secretKey

  // console.log('user: ', user)

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id ?? '',
        name: user?.firstName + ' ' + user?.lastName,
        email: user?.emailAddresses[0].emailAddress ?? '',
        profilePicture: user?.imageUrl,
        solWallet: {
          create: {
            publicKey: publicKey,
            privateKey: privateKey.toString(),
          }
        },
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
