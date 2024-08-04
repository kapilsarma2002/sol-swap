import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <SignIn />
    </div>
  )
}

export default SignInPage
