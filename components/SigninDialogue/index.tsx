import { SignInDialog } from './SignInDialogComp'
import { Database } from '@/lib/supabase/db_types'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

export const dynamic = 'force-dynamic'

export default async function SignInDialogSession({
  refId,
}: {
  refId: string
}) {
  const supabase = createServerActionClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return <SignInDialog refId={refId} session={session} />
}
