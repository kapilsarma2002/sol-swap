import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <SignUp
        forceRedirectUrl={'https://sol-swap-smoky.vercel.app/new-user'}
        fallbackRedirectUrl={'/new-user'}
      />
    </div>
  )
}

export default SignUpPage
