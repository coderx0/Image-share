import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'


import './globals.css'
import Providers from '@/components/Providers/Provider'
import Drawer from '@/components/Drawer/Drawer'
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Breadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
}

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode,
  authModal: React.ReactNode,
}) {

  return (
    <html
      lang='en'
      className={cn(
        'antialiased ',
        inter.className
      )}
      data-theme="cupcake"
      >
      <body className='min-h-screen antialiased'>
        <Providers>
          <Drawer>
            {authModal}
            {children}
          </Drawer>
          <Toaster richColors/>
        </Providers>
      </body>
    </html>
  )
}
