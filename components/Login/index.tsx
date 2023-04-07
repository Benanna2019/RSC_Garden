'use client'

import { signIn, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { GhostButton } from '../Button'
import { GitHubIcon } from '../Icon'

export function SignOut() {
  const pathname = usePathname()
  return (
    <div className="flex items-stretch justify-items-stretch self-stretch">
      <GhostButton
        onClick={() => signOut({ callbackUrl: pathname as string })}
        style={{ flex: '1' }}
        size="large"
      >
        → Sign out
      </GhostButton>
    </div>
  )
}

export function SignIn() {
  const pathname = usePathname()
  return (
    <div className="flex items-stretch justify-items-stretch self-stretch">
      <GhostButton
        onClick={() => signIn('github', { callbackUrl: pathname as string })}
        style={{ flex: '1' }}
        size="large"
      >
        <GitHubIcon />
        <span>Signin w/ Github</span>
      </GhostButton>
    </div>
  )
}
