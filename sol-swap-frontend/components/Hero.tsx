'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Hero = () => {

  const router = useRouter()

  const SignUp = () => {
    router.push('/sign-up')
  }

  return (
    <div className="p-20">
      <div className="flex items-center justify-start h-full text-5xl font-semibold">
        Your Personal Digital Asset Vault&nbsp;
        <span className="text-blue-700 font-bold">Solana</span>
      </div>
      <div className="flex items-center justify-center text-2xl text-gray-600 mx-auto">
        Easily monitor and assess the value of your Solana tokens and NFTs.
      </div>
      <div className="flex items-center justify-center mt-10">
        <button
          className="px-4 py-2 bg-blue-700 mt-4 rounded-lg text-white font-bold text-lg flex gap-2"
          onClick={SignUp}
        >
          <Image src="/google.svg" alt="google.svg" width={24} height={18} />{' '}
          Sign Up with Google
        </button>
      </div>
    </div>
  )
}

export default Hero
