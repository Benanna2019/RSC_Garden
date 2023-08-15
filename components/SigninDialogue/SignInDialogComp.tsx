'use client'
import * as React from 'react'

import { ModalComponent } from '@/components/Modal'
import { SignInDialogContent } from './SignInDialogContent'
import { Session } from '@supabase/auth-helpers-nextjs'
import { CommentForm } from '../Comment/CommentForm'

export function SignInDialogComp({
  children = null,
  trigger = null,
}: {
  children?: Function | null
  trigger?: React.ReactElement | null
}) {
  return (
    <ModalComponent
      trigger={trigger}
      title={'Sign In'}
      modalContent={() => <SignInDialogContent />}
    >
      {children ? ({ openModal }: any) => children({ openModal }) : null}
    </ModalComponent>
  )
}

export function SignInDialog({
  refId,
  session,
}: {
  refId: string
  session: Session | null
}) {
  return (
    <SignInDialogComp>
      {({ openModal }: any) => (
        <CommentForm refId={refId} openModal={openModal} session={session} />
      )}
    </SignInDialogComp>
  )
}
