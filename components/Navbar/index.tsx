import * as React from 'react'
import { SignIn, SignOut } from '../Login'
import { Navigation } from './Navigation'
import { Session } from 'next-auth'

export function Navbar({ session }: { session: Session | null }) {
  return (
    <>
      <nav className="flex h-20 w-full items-center justify-center border-gray-150 bg-black">
        <Navigation />
        <div className="text-md flex w-1/5 flex-col items-center justify-center p-4 font-semibold text-white">
          {session ? <SignOut /> : <SignIn />}
        </div>
      </nav>
    </>
  )
}
