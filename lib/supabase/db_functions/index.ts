import type { Database } from '@/lib/supabase/db_types'
import type { PostgrestError } from '@supabase/postgrest-js'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export type CommentType = Database['public']['Tables']['comments']['Row']
export type AuthorType = Database['public']['Tables']['profiles']['Row']
export type CommentInfoType = CommentType & { author: AuthorType }

// should receive the client version of supabase using useSupabase and context

// Should receive a server instance of supabase
export async function useGetCommentsQuery(
  postId: string,
): Promise<{ data: CommentInfoType[]; error: PostgrestError }> {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })
  const { data, error } = await supabase
    .from('comments')
    .select('*, author: profiles(*)')
    .eq('post_id', postId)

  return { data: data as CommentInfoType[], error: error as PostgrestError }
}

export async function getUserInformation() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })
  const { data } = await supabase.auth.getUser()
  const user = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data?.user?.id)
  return user
}

export type PostPageViewData = {
  pathname: string
  post_title: string
  post_id: string
}
