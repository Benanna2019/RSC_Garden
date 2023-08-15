import { Navbar } from './Navbar'
import { getServerSession } from '@/lib/supabase/supabase-server'

export const dynamic = 'force-dynamic'

export default async function Nav() {
  const supabase = getServerSession()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // const isAdmin = session
  //   ? session.user.email === process.env.ALT_ADMIN_EMAIL
  //   : false

  // add admin route for video uploads for courses

  return <Navbar session={session} />
}
