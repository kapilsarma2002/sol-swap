import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <SignUp fallbackRedirectUrl={'/new-user'} />
    </div>
  )
}

export default SignUpPage
