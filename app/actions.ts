'use server'

import { CommentType } from '@/lib/supabase/db_functions'
import { Database } from '@/lib/supabase/db_types'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function increment(slug: string) {
  const supabase = createServerActionClient<Database>({ cookies })
  const { error } = await supabase.rpc('increment_post_views', {
    slug,
  })

  if (error) {
    console.log('error incrementing page view', error)
  }
}

export async function handleAddComment(
  commentData: Pick<CommentType, 'content' | 'post_id'>,
) {
  const supabase = createServerActionClient<Database>({ cookies })
  const { content, post_id } = commentData

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw new Error('You must be logged in to comment')
  }

  const { data, error } = await supabase
    .from('comments')
    .insert([{ content, post_id, author_id: session.user.id }])
    .select()

  if (error) {
    throw new Error(`error adding comment: ${error}`)
  }

  revalidatePath('/articles/[slug]')
}

export async function handleUpdateComment({
  id,
  content,
  updated_at,
}: {
  id: string
  content: string
  updated_at: string
}) {
  const supabase = createServerActionClient<Database>({ cookies })

  const { data, error } = await supabase
    .from('comments')
    .update({ content, updated_at })
    .match({ id })

  if (error) {
    throw new Error(`error updating comment: ${error}`)
  }

  revalidatePath('/articles/[slug]')
}

export async function handleDeleteComment(commentId: string) {
  const supabase = createServerActionClient<Database>({ cookies })

  const { error } = await supabase.from('comments').delete().eq('id', commentId)

  if (error) {
    throw new Error(`There was an error deleting the comment: ${error}`)
  }
  revalidatePath(`/articles/[slug]`)
}
