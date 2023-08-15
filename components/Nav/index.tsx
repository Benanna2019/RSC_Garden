import { Navbar } from './Navbar'
import { getServerSession } from '@/lib/supabase/supabase-server'

export default async function Nav() {
  const supabase = getServerSession()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <Navbar session={session} />
}
