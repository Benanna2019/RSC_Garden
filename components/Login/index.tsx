'use client'

import { useRouter } from 'next/navigation'
import { GhostButton } from '../Button'
import { GitHubIcon } from '../Icon'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/supabase/db_types'

export function SignOut() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="flex items-stretch justify-items-stretch self-stretch">
      <GhostButton onClick={handleSignOut} style={{ flex: '1' }} size="large">
        → Sign out
      </GhostButton>
    </div>
  )
}

export function SignIn() {
  const supabase = createClientComponentClient<Database>()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }
  return (
    <div className="flex items-stretch justify-items-stretch self-stretch">
      <GhostButton onClick={handleSignIn} style={{ flex: '1' }} size="large">
        <GitHubIcon />
        <span>Signin w/ Github</span>
      </GhostButton>
    </div>
  )
}
