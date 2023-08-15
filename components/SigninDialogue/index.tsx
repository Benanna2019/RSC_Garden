import { getServerSession } from '@/lib/supabase/supabase-server'
import { SignInDialog } from './SignInDialogComp'

export default async function SignInDialogSession({
  refId,
}: {
  refId: string
}) {
  const supabase = getServerSession()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return <SignInDialog refId={refId} session={session} />
}
