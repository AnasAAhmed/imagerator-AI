import { SignIn } from '@clerk/nextjs'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign-in',
  description: 'Sign-in to Imaginify to get best out of it' + " | Imaginify",
}
const SignInPage = () => {
  return <div className='min-h-[80vh] flex justify-center items-center'><SignIn /></div>
}

export default SignInPage