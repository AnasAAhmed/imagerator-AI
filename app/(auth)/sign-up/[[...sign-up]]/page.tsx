import { SignUp } from '@clerk/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign-up',
  description: 'Create your fisrt account to get best out of it' + " | Imaginify",
}

const SignUpPage = () => {
  return <div className='min-h-[80vh] flex justify-center items-center'><SignUp /></div>
}

export default SignUpPage