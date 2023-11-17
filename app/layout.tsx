import { cn } from '@/lib/utils'
import { Open_Sans } from 'next/font/google'


import './globals.css'
import Providers from '@/components/Providers/Provider'
import Drawer from '@/components/Drawer/Drawer'
import { Toaster } from 'sonner';

const font = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'ImageDash',
  description: 'A simple Image sharing App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <html
      lang='en'
      className={cn(
        'antialiased ',
        font.className
      )}
      data-theme="forest"
      >
      <body className='min-h-screen antialiased bg-base-100 tracking-wide'>
        <Providers>
          <Drawer>
            {children}
          </Drawer>
          <Toaster richColors/>
        </Providers>
      </body>
    </html>
  )
}
