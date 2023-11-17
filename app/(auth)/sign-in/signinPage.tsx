"use client";

import UserAuthForm from '@/components/UserAuthForm'
import { LoginValidator } from '@/lib/validators/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';
import { z } from 'zod'

type FormData = z.infer<typeof LoginValidator>


const SignInPage: FC = () => {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      email: '',
      password :'',
    },
  })

  const onSubmit = async (data: FormData,e:any)=>{
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect:false,
      });

      if (result?.error) {
        toast.error('Error',{
          description: result.error,
          duration: 4000
        })
      } else {
        toast.success('Success',{
          description: 'Welcome back to Imagedash',
          duration: 4000
        })
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }    
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
<section className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-base-100">
  <div className="flex-col flex items-center justify-center bg-slate-800 text-base-content">
    <div className="py-16 md:py-24 lg:py-32 px-5 md:px-10">
      <div className="text-center max-w-[480px] md:max-w-[480px]">
        <h2 className="font-bold text-3xl lg:text-5xl mb-8 md:mb-12 lg:mb-16">Welcome Back To ImageDash</h2>
        <div className="mx-auto max-w-[400px] mb-4 pb-4">
         
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
              autoComplete=''
              className={`m-0 mb-4 block w-full border border-solid border-black align-middle focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14 ${(errors && errors.password) ? 'bg-red-100 text-red-700':'bg-white text-black'}`} 
              maxLength={20}
              minLength={8} 
              placeholder="Password (min 8 characters)"/>
              <div>
              </div>
              <div>
              </div>
            </div>
           
            <button type="submit" className={`btn w-full rounded-md text-white tracking-wider`}>
              Sign In
            </button>
            {/* <button disabled={isLoading} type="submit" className={`btn w-full rounded-md text-white tracking-wider ${isLoading && 'btn-disabled'}`}>
              {isLoading ? <span className="loading loading-spinner"></span>:'Register'}
            </button> */}
          </form>
          <div className='divider'>
            or
          </div>
            <UserAuthForm/>
        </div>
        <p className="text-base-content text-sm sm:text-sm">Do not have an account? <Link href="/sign-up" className="font-bold ">Register now</Link>
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

export default SignInPage
