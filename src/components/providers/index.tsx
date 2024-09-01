'use client'
import { NextPageContext } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client'

import { SEO } from './seo'
import { Toast } from './toaster'
import { createContext, useState } from 'react'
import { AuthProvider } from '@/context'

interface Props {
  children?: any
  pageProps: NextPageContext
}

const globalNavigationContext = {
  isOpen: false,
  setIsOpen: (val: boolean) => {},
}

export const GlobalNavigationContext = createContext(globalNavigationContext)

export function Providers({ children, pageProps }: Props) {
  const initialState = {
    isOpen: false,
    setIsOpen,
  }

  const [state, setState] = useState(initialState)

  function setIsOpen(isOpen: any) {
    return setState({ ...state, isOpen })
  }

  return (
    <>
      <UserProvider>
        <SEO />
        <Toast />
        <GlobalNavigationContext.Provider value={state}>
          {children}
        </GlobalNavigationContext.Provider>
      </UserProvider>
    </>
  )
}
