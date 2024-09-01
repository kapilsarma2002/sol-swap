import { currentUser } from '@clerk/nextjs/server'
import Greeting from '@/components/Greeting'
import Assets from '@/components/Assets'
import Key from '@/components/Key'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const Home = async () => {
  const user = await currentUser()
  const userWallet = await getBalance()

  return (
    <div className="pt-8 flex justify-center">
      <div className="max-w-4xl bg-white rounded shadow w-full p-12">
        <Key />
        <Greeting name={user?.firstName ?? ''} image={user?.imageUrl ?? ''} />
        <Assets publicKey={userWallet.publicKey} />
      </div>
    </div>
  )
}

const getBalance = async () => {
  const user = await getUserByClerkID()

  const userWallet = await prisma.solWallet.findFirst({
    where: {
      userId: user?.id,
    },
    select: {
      publicKey: true,
    },
  })

  if (!userWallet) {
    throw new Error('User wallet not found')
  }

  return userWallet
}

export default Home
