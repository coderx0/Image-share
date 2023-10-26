import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'


import './globals.css'
import Providers from '@/components/Providers/Provider'
import Drawer from '@/components/Drawer/Drawer'
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ImageDash',
  description: 'A simple Image sharing App',
}

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode,
  modal: React.ReactNode
}) {

  return (
    <html
      lang='en'
      className={cn(
        'antialiased ',
        inter.className
      )}
      data-theme="luxury"
      >
      <body className='min-h-screen antialiased bg-base-100'>
        <Providers>
          <Drawer>
            {children}
          </Drawer>
          <Toaster richColors/>
            {modal}
        </Providers>
      </body>
    </html>
  )
}
