'use client'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import { useRouter } from 'next/navigation';

const Navbar = () => {

  const redirectToHome = () => {
    const router = useRouter();
    router.push('/home');
  }

  return (
    <div className="border-b h-[70px] py-4 px-8 w-full bg-slate-100 flex flex-row justify-between items-center">
      <h1
        className="font-bold text-2xl cursor-pointer"
        onClick={redirectToHome}
      >
        SOLView
      </h1>
      <div>
        <SignedOut>
          <div className="bg-black text-white px-4 rounded-lg text-sm">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default Navbar
