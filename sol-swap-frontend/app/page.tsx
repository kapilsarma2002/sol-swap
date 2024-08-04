'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import Hero from '@/components/Hero'

const Home = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user?.id) {
      router.push('/home')
    }
  }, [user])

  return (
    <div className="h-[calc(100vh-70px)] w-full flex flex-col justify-center items-center overflow-y-auto">
      <Hero />
    </div>
  )
}

export default Home
