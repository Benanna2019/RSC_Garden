import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './db_types'

export const useSupabase = () => createClientComponentClient<Database>()
