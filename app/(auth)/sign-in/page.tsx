import UserAuthForm from '@/components/UserAuthForm'
import { getAuthSession } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FC } from 'react'

const page: FC = async() => {
  const session = await getAuthSession();

  if(session){
    redirect('/')
  }

  return (
<section className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-base-100">
  <div className="flex-col flex items-center justify-center bg-slate-800 text-base-content">
    <div className="py-16 md:py-24 lg:py-32 px-5 md:px-10">
      <div className="text-center max-w-[480px] md:max-w-[480px]">
        <h2 className="font-bold text-3xl lg:text-5xl mb-8 md:mb-12 lg:mb-16">Welcome Back To ImageDash</h2>
        <div className="mx-auto max-w-[400px] mb-4 pb-4">
          <form name="wf-form-password">
            <div className="relative">
              <img alt="" src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9455fae6cf89_EnvelopeSimple.svg" className="absolute left-[5%] top-[26%] inline-block"/>
              <input type="email" className="m-0 mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14" maxLength={256} name="name" placeholder="Email Address"/>
              <div>
              </div>
              <div>
              </div>
            </div>
            <div className="relative mb-4">
              <img alt="" src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a946794e6cf8a_Lock-2.svg" className="absolute left-[5%] top-[26%] inline-block"/>
              <input type="password" className="m-0 mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14" maxLength={256} name="password" placeholder="Password (min 8 characters)"/>
              <div>
              </div>
              <div>
              </div>
            </div>
            
            <button type="submit" className="m-0 inline-block w-full cursor-pointer items-center bg-base-300 px-6 py-3 text-center font-semibold text-base-content">
              Login
            </button>
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

export default page
