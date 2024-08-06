import Image from "next/image"

const Greeting = ({name, image}: {name: string, image: string}) => {

  return (
    <div className="flex">
      <Image src={image} alt="profile picture" width={50} height={20} className="rounded-full mr-4" />
      <div className="text-2xl font-semibold flex flex-col justify-center">
        Welcome back, {name}!
      </div>
    </div>
  )
}

export default Greeting