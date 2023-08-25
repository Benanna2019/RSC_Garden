import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AvatarMenu } from './AvatarMenu'
import { Database } from '@/lib/supabase/db_types'
import AvatarDefault from './AvatarDefault'

export default async function Avatar() {
  const supabase = createServerActionClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', session?.user.email)

  if (!data || data.length === 0 || error) {
    console.error(error)
  }

  if (data) {
    return <AvatarMenu user={data[0]} />
  }

  return null
}
