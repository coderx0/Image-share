'use client'

import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { FC } from 'react'
// import { useToast } from '@/hooks/use-toast'
import { Icons } from './Icons'
import { toast } from 'sonner'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  // const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      toast('Error',{
        description: 'There was an error logging in with Google',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className=''>
      {/* <Button
        isLoading={isLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={loginWithGoogle}
        disabled={isLoading}>
        {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
        Google
      </Button> */}
      <button
        // isLoading={isLoading}
        type='button'
        // size='sm'
        className='w-full btn bg-stone-800 rounded-none text-white'
        onClick={loginWithGoogle}
        disabled={isLoading}>
        {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
        Login with Google
      </button>
    </div>
  )
}

export default UserAuthForm
