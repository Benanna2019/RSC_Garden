import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from './db_types'

export const getServerSession = () =>
  createServerComponentClient<Database>({
    cookies,
  })
