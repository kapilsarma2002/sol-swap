import { currentUser } from '@clerk/nextjs/server'
import Greeting from '@/components/Greeting';

const Home = async () => {

  const user = await currentUser();

  return (
    <div className="pt-8 flex justify-center">
      <div className='max-w-4xl bg-white rounded shadow w-full p-12'>
        <Greeting name={user?.firstName ?? ''} image={user?.imageUrl ?? ''} />
      </div>
    </div>
  )
}

export default Home
