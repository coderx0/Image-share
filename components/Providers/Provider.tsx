'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import {NextUIProvider} from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import { FC, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const queryClient = new QueryClient()

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default Providers
