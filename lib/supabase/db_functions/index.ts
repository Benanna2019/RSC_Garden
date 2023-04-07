import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/supabase/db_types'
import type { PostgrestError } from '@supabase/postgrest-js'
import type { SupabaseContext } from '@/components/Providers/Supabase-Provider'

export type CommentType = Database['public']['Tables']['comments']['Row']
export type AuthorType = Database['public']['Tables']['authors']['Row']

export type CommentInfoType = CommentType

// should receive the client version of supabase using useSupabase and context
export async function handleAddComment(
  commentData: Partial<CommentType>,
  supabase: SupabaseContext['supabase'],
) {
  const { text, post_id, author_email, author_name, author_url } = commentData

  const { data: addCommentData, error } = await supabase
    .from('comments')
    .insert([
      {
        text,
        post_id,
        author_email,
        author_name,
        author_url,
        viewerCanEdit: true,
        viewerCanDelete: true,
      },
    ])

  return { error }
}

// Should receive a server instance of supabase
export async function useGetCommentsQuery(
  postId: string,
  supabase: SupabaseClient,
): Promise<{ data: CommentInfoType[]; error: PostgrestError }> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)

  return { data: data as CommentInfoType[], error: error as PostgrestError }
}

// Should receive the client version of supabase, ie from useSupabase
export async function handleEditComment(
  commentData: Partial<CommentType>,
  supabase: SupabaseContext['supabase'],
) {
  const { id, text, updated_at } = commentData

  const { data, error } = await supabase
    .from('comments')
    .update({ text: text, updated_at: updated_at })
    .match({ id: id })

  return { data, error }
}

// Should receive the client version of supabase, ie from useSupabase
export async function handleDeleteComment(
  commentId: string,
  supabase: SupabaseContext['supabase'],
) {
  const { data, error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)

  return { data, error }
}
