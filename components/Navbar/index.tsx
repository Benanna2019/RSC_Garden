import * as React from 'react'

import { Navigation } from './Navigation'

export function Navbar({
  isOpen,
  children,
}: {
  isOpen?: boolean
  children?: React.ReactNode
}) {
  return (
    <>
      <nav className="flex h-20 w-full items-center justify-center border-gray-150 bg-black">
        <Navigation />
      </nav>
    </>
  )
}
