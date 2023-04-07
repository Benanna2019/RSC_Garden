'use client'
import * as React from 'react'

import { ModalComponent } from '@/components/Modal'

import { SignInDialogContent } from './SignInDialogContent'

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
