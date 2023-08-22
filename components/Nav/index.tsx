import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Navbar } from './Navbar'
import { Database } from '@/lib/supabase/db_types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Nav() {
  const supabase = createServerActionClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', session?.user.email)

  if (error) {
    return <Navbar session={null} user={null} />
  }

  return <Navbar session={session} user={data[0]} />
}
