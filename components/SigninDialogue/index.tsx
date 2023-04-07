'use client'
import { CommentForm } from '../Comment/CommentForm'
import { SignInDialogComp } from './SignInDialogComp'

export default function SignInDialog({ refId, type, session }: any) {
  return (
    <SignInDialogComp>
      {({ openModal }: any) => (
        <CommentForm
          refId={refId}
          type={type}
          openModal={openModal}
          session={session}
        />
      )}
    </SignInDialogComp>
  )
}
