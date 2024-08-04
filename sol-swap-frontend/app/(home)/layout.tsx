import Navbar from '@/components/Navbar'
import { getUserByClerkID } from '@/utils/auth'

const HomeLayout = async ({ children }: any) => {
  const user = await getUserByClerkID()

  return (
    <div className="h-screen w-full relative bg-slate-50 text-black">
      <div className="h-full w-full pb-6">
        <div>
          <Navbar/>
        </div>
        <div className="h-[calc(100vh-70px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
