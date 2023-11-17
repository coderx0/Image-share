"use client"

import UserAuthForm from '@/components/UserAuthForm'
import { RegisterRequest, RegisterValidator } from '@/lib/validators/register'
import { hashPassword } from '@/utils/password'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { User } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface pageProps {}
type FormData = z.infer<typeof RegisterValidator>

const page: FC<pageProps> = ({}) => {

  const [password,setPassword] = useState<string>('');
  const [email,setEmail] = useState<string>('');

  const { register, handleSubmit, formState: { errors },setValue, reset} = useForm<FormData>({
    resolver: zodResolver(RegisterValidator),
    defaultValues: {
      email: '',
      password :'',
      username:''
    },
  })

  const { mutate: createAccount,isLoading } = useMutation({
    mutationFn: async ({
      email,
      password,
      username
    }: RegisterRequest) => {
      const payload: RegisterRequest = { email, password,username }
      const  {data}  = await axios.post('/api/auth/signup', payload)
      return data
    },
    onError: (error: any) => {
      // @ts-ignore
      console.log({error: error.response.data})
      return toast.error('Something Went Wrong',{
        description: error.response.data,
        duration: 4000
      })
    },
    onSuccess: async (data) => {
      toast.success('Success',{
        description: 'Account created Successfully.',
      })


      const result = await signIn('credentials', {
        email: email,
        password: password,
      });

      return;
    },
  })

  const onSubmit = async (data: FormData)=>{
    const hashedPassword = await hashPassword(data.password);
    setPassword(data.password);
    setEmail(data.email)

    const payload: RegisterRequest = {
      email: data.email,
      username: data.username,
      password: hashedPassword
    }

    createAccount(payload);
  }

  if(errors){
    if(errors.email){
      toast.error('Error',{
        description: errors.email.message,
        duration: 4000
      })
    }
    if(errors.password){
      toast.error('Error',{
        description: errors.password.message,
        duration: 4000
      })
    }
  }

  return (
<section className="grid h-auto md:h-screen grid-cols-1 md:grid-cols-2 gap-0 bg-base-100">
  <div className="flex-col flex items-center justify-center bg-slate-800 text-base-content w-full">
    <div className="py-16 md:py-24 lg:py-32 px-0 md:px-10 w-full">
      <div className="text-center w-full">
        <h2 className="font-bold text-3xl md:text-5xl mb-8 md:mb-12 lg:mb-16">Join Imagedash</h2>
        <div className="mx-auto mb-4 pb-4 w-[90%] max-w-[420px]">
          <form 
          className='w-full'
          name="wf-form-password" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <img alt="" src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9455fae6cf89_EnvelopeSimple.svg" className="absolute left-[5%] top-[26%] inline-block"/>
              <input 
              autoFocus
              {...register('email')}
                type="email" 
                className={`m-0 mb-4 block w-full border border-solid border-black align-middle focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14 ${(errors && errors.email) ? 'bg-red-100 text-red-700':'bg-white text-black'}`} 
                maxLength={256} 
                placeholder="Email Address"
              />
              <div>
              </div>
              <div>
              </div>
            </div>

            <div className="relative mb-4">
              <img alt="" src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a946794e6cf8a_Lock-2.svg" className="absolute left-[5%] top-[26%] inline-block"/>
              <input 
              {...register('password')}
              type="password" 
              className={`m-0 mb-4 block w-full border border-solid border-black align-middle focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14 ${(errors && errors.password) ? 'bg-red-100 text-red-700':'bg-white text-black'}`} 
              maxLength={20}
              minLength={8} 
              placeholder="Password (min 8 characters)"/>
              <div>
              </div>
              <div>
              </div>
            </div>
            <div className="relative mb-4">
              <User className="absolute left-[5%] top-[26%] inline-block text-black"/>
              <input 
              {...register('username')}
              type="text" 
              className={`m-0 mb-4 block w-full border border-solid border-black align-middle focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14 ${(errors && errors.username) ? 'bg-red-100 text-red-700':'bg-white text-black'}`} 
              minLength={3} 
              maxLength={20} 
              placeholder="Username (min 3 characters)"/>
              <div>
              </div>
              <div>
              </div>
            </div>
            <button disabled={isLoading} type="submit" className={`btn w-full rounded-md text-white tracking-wider ${isLoading && 'btn-disabled'}`}>
              {isLoading ? <span className="loading loading-spinner"></span>:'Register'}
            </button>
          </form>
          <div className='divider'>
            or
          </div>
            <UserAuthForm/>
        </div>
        <p className="text-base-content text-sm sm:text-sm">Already have an account? <Link href="/sign-in" className="font-bold">Sign in</Link>
        </p>
      </div>
    </div>
  </div>
  <div className="hidden md:flex flex-col  items-center justify-center bg-cover bg-no-repeat bg-fixed bg-center"
   style={{backgroundImage: 'url(https://res.cloudinary.com/calmbit/image/upload/v1698936191/xydrokv22hcvypuw1qtl.jpg)'}}
   >
    <div className="h-full w-full flex justify-center items-center backdrop-brightness-50">
      
    </div>
  </div>
</section>
  )
}

export default page
