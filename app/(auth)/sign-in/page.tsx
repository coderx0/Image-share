import UserAuthForm from '@/components/UserAuthForm'
import Link from 'next/link'
import { FC } from 'react'

const page: FC = () => {

  return (
<section className="grid h-auto md:h-screen grid-cols-1 md:grid-cols-2 gap-0">
  <div className="flex-col flex items-center justify-center bg-white">
    <div className="py-16 md:py-24 lg:py-32 px-5 md:px-10">
      <div className="text-center max-w-[480px] md:max-w-[480px]">
        <h2 className="font-bold text-3xl md:text-5xl mb-8 md:mb-12 lg:mb-16">Start your 14-day free trial</h2>
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
            
            <button type="submit" className="m-0 inline-block w-full cursor-pointer items-center bg-black px-6 py-3 text-center font-semibold text-white">
              Login
            </button>
          </form>
          <div className='divider'>
            or
          </div>
            <UserAuthForm/>
        </div>
        <p className="text-[#636262] text-sm sm:text-sm">Do not have an account? <Link href="/sign-up" className="font-bold text-[#0b0b1f]">Register now</Link>
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
