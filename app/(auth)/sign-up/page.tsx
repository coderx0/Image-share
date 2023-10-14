"use client"

import UserAuthForm from '@/components/UserAuthForm'
import { RegisterRequest, RegisterValidator } from '@/lib/validators/register'
import { hashPassword } from '@/utils/password'
// import { hashPassword } from '@/utils/password'
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

  const { mutate: createAccount } = useMutation({
    mutationFn: async ({
      email,
      password,
      username
    }: RegisterRequest) => {
      const payload: RegisterRequest = { email, password,username }
      const  {data}  = await axios.post('/api/auth/signup', payload)
      return data
    },
    onError: (error) => {
      // @ts-ignore
      console.log({error: error.response.data})
      return toast.error('Something Went Wrong',{
        description: 'Could not create an account. Please try again.',
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

      // location.assign(`${process.env.NEXT_PUBLIC_CLIENT_URL}/photo/${data.postId}`)
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

  return (
<section className="grid h-auto md:h-screen grid-cols-1 md:grid-cols-2 gap-0">
  <div className="flex-col flex items-center justify-center bg-white">
    <div className="py-16 md:py-24 lg:py-32 px-5 md:px-10">
      <div className="text-center max-w-[480px] md:max-w-[480px]">
        <h2 className="font-bold text-3xl md:text-5xl mb-8 md:mb-12 lg:mb-16">Start your 14-day free trial</h2>
        <div className="mx-auto max-w-[400px] mb-4 pb-4">
          <form name="wf-form-password" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <img alt="" src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9455fae6cf89_EnvelopeSimple.svg" className="absolute left-[5%] top-[26%] inline-block"/>
              <input 
              {...register('email')}
                type="email" 
                className="m-0 mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14" 
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
              className="m-0 mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14" 
              maxLength={20}
              minLength={8} 
              placeholder="Password (min 8 characters)"/>
              <div>
              </div>
              <div>
              </div>
            </div>
            <div className="relative mb-4">
              <User className="absolute left-[5%] top-[26%] inline-block"/>
              <input 
              {...register('username')}
              type="text" 
              className="m-0 mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14" 
              minLength={3} 
              maxLength={20} 
              placeholder="Username (min 3 characters)"/>
              <div>
              </div>
              <div>
              </div>
            </div>
            <button type="submit" className="m-0 inline-block w-full cursor-pointer items-center bg-black px-6 py-3 text-center font-semibold text-white">
              Register
            </button>
          </form>
          <div className='divider'>
            or
          </div>
            <UserAuthForm/>
        </div>
        <p className="text-[#636262] text-sm sm:text-sm">Already have an account? <Link href="/sign-in" className="font-bold text-[#0b0b1f]">Sign in</Link>
        </p>
      </div>
    </div>
  </div>
  <div className="hidden md:flex flex-col  items-center justify-center bg-[#f2f2f7]">
    <div className="py-16 md:py-24 lg:py-32 px-5 md:px-10">
      <div className="mx-auto text-left max-w-[480px] md:max-w-[480px]">
        <div className="flex-col flex items-center justify-center bg-white h-14 w-14 mb-5 md:mb-6 lg:mb-8">
          <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a949eade6cf7d_Vector-2.svg" alt="" className="inline-block"/>
        </div>
        <p className="max-[479px]:text-sm mb-8 md:mb-12 lg:mb-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim.</p>
        <p className="font-bold max-[479px]:text-sm">John Robert</p>
        <p className="text-sm sm:text-sm">Senior Webflow Developer</p>
      </div>
    </div>
  </div>
</section>
  )
}

export default page
