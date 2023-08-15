import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Navbar } from './Navbar'
import { Database } from '@/lib/supabase/db_types'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function Nav() {
  const supabase = createServerActionClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // const isAdmin = session
  //   ? session.user.email === process.env.ALT_ADMIN_EMAIL
  //   : false

  // add admin route for video uploads for courses

  return <Navbar session={session} />
}
