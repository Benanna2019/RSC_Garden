import * as React from 'react'
import { MessageCircle } from 'react-feather'
import CommentRef from './CommentRef'
import SignInDialog from '../SigninDialogue'
import GetComments from './GetComments'
import { Session } from '@supabase/auth-helpers-nextjs'

interface Props {
  refId: string
}

export const revalidate = 0

export default function Comments({ refId }: Props) {
  return (
    <div className="relative flex flex-1 flex-col border-t border-gray-150 dark:border-gray-800">
      <div className="text-quaternary absolute left-1/2 -top-5 -translate-x-1/2 transform bg-white px-8 py-2 dark:bg-black">
        <MessageCircle />
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col space-y-3 px-4 pt-8 pb-4 md:px-8">
        <React.Suspense fallback={<p>Loading comments...</p>}>
          <GetComments refId={refId} />
        </React.Suspense>
      </div>
      <CommentRef />
      <SignInDialog refId={refId} />
    </div>
  )
}
