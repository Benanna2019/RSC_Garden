import * as React from 'react'
import { MessageCircle } from 'react-feather'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

import { useGetCommentsQuery } from '@/lib/supabase/db_functions'
import { createClient } from '@/lib/supabase/supabase-server'

import { Comment } from './Comment'
import CommentRef from './CommentRef'
import SignInDialog from '../SigninDialogue'

interface Props {
  refId: string
  type: 'POST'
}

export const Comments = async function Comments({ refId, type }: Props) {
  const session = await getServerSession(authOptions)
  const supabase = createClient()

  const { data, error } = await useGetCommentsQuery(refId, supabase)

  if (error) return <p>Error loading comments...</p>

  return (
    <div className="relative flex flex-1 flex-col border-t border-gray-150 dark:border-gray-800">
      <div className="text-quaternary absolute left-1/2 -top-5 -translate-x-1/2 transform bg-white px-8 py-2 dark:bg-black">
        <MessageCircle />
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col space-y-3 px-4 pt-8 pb-4 md:px-8">
        <div className="flex flex-col space-y-3">
          {data?.length > 0 &&
            data.map((comment) => (
              <Comment
                key={comment.id}
                refId={refId}
                type={type}
                comment={comment}
                session={session}
              />
            ))}
          {data?.length === 0 && (
            <p className="text-quaternary block pt-12 pb-16 text-center">
              No comments yet...
            </p>
          )}
        </div>
      </div>
      <CommentRef />
      <SignInDialog refId={refId} session={session} />
    </div>
  )
} as unknown as (props: Props) => JSX.Element
