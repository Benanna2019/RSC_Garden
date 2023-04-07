'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { Avatar } from '@/components/Avatar'
import Button, { PrimaryButton } from '@/components/Button'
import { Textarea } from '@/components/Input'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { timestampToCleanTime } from '@/lib/utils/transformers'

import { MarkdownRenderer } from '../MarkdownRenderer'
import { CommentMenu } from './CommentMenu'
import {
  CommentInfoType,
  handleDeleteComment,
  handleEditComment,
} from '@/lib/supabase/db_functions'
import { useSupabase } from '../Providers/Supabase-Provider'

type Props = {
  comment: CommentInfoType
  refId: string
  type: 'POST'
  session: Session | null
}

export const Comment = ({ comment, session }: Props) => {
  const { supabase } = useSupabase()

  const [isEditing, setIsEditing] = React.useState(false)
  const [editText, setEditText] = React.useState(comment.text)
  const [isSavingEdit, setIsSavingEdit] = React.useState(false)

  const router = useRouter()

  // use supabase, providers, and forms to do editing.

  async function handleDelete() {
    const { error } = await handleDeleteComment(
      comment.id,
      supabase,
      comment?.author_email as string,
      session?.user?.email as string,
    )
    if (error) {
      alert('There was an error deleting the message')
      return
    }
    router.refresh()
  }

  function handleEdit() {
    setIsEditing(true)
  }

  function onKeyDown(e: any) {
    if (e.keycode === 13 && e.metaKey) {
      if (editText?.trim().length === 0 || isSavingEdit) return
      return handleSaveEdit()
    }
    if (e.keyCode === 27 || e.key === 'Escape') {
      setIsEditing(false)
      setEditText(comment.text)
    }
  }

  async function handleSaveEdit() {
    setIsSavingEdit(true)
    const { data, error } = await handleEditComment(
      {
        id: comment.id,
        text: editText,
        updated_at: new Date().toISOString(),
      },
      supabase,
    )
    if (error) {
      alert(error.message)
      setIsSavingEdit(false)
      return
    }
    setIsSavingEdit(false)
    setIsEditing(false)
    router.refresh()
  }

  const createdAt = timestampToCleanTime({
    month: 'short',
    timestamp: comment.created_at,
  })

  return (
    <div className="group flex flex-col space-y-0">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <Avatar
            user={comment?.author_name}
            src={comment?.author_url}
            width={40}
            height={40}
            quality={100}
            layout="fixed"
            className="rounded-full"
          />

          <div className="flex space-x-1">
            <div className="text-primary font-semibold leading-snug">
              <div className="flex break-all line-clamp-1">
                {comment?.author_name}
              </div>
            </div>
            <p className="text-quaternary leading-snug">·</p>
            <p
              className="text-quaternary leading-snug line-clamp-1"
              title={createdAt.raw}
            >
              {createdAt.formatted}
            </p>
          </div>
        </div>

        {comment?.author_email === session?.user.email && (
          <CommentMenu
            comment={comment}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            session={session}
          />
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col space-y-3 pl-14">
          <Textarea
            onChange={(e: any) => setEditText(e.target.value)}
            value={editText}
            onKeyDown={onKeyDown}
          />
          <div className="flex justify-between">
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            <PrimaryButton
              disabled={editText?.trim().length === 0 || isSavingEdit}
              onClick={handleSaveEdit}
            >
              {isSavingEdit ? <LoadingSpinner /> : 'Save'}
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <MarkdownRenderer
          children={comment.text}
          className="comment prose flex-grow pl-14 leading-normal"
          variant="comment"
        />
      )}
    </div>
  )
}
