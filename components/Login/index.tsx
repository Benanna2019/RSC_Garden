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
    <div>
      <GhostButton
        onClick={handleSignOut}
        style={{ flex: '1' }}
        size="small"
        className="text-sm text-black"
      >
        Sign out
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
    <div className="flex rounded-md  p-1 hover:border-2 hover:border-white hover:bg-gray-100">
      <GhostButton
        className="flex items-center space-x-2 "
        onClick={handleSignIn}
        style={{ flex: '1' }}
        size="large"
      >
        <GitHubIcon width="16" height="16" />
        <span>Signin</span>
      </GhostButton>
    </div>
  )
}
