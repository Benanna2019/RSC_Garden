'use client'

import * as React from 'react'
import Button, { PrimaryButton } from '@/components/Button'
import { Textarea } from '@/components/Input'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { timestampToCleanTime } from '@/lib/utils/transformers'

import { MarkdownRenderer } from '../MarkdownRenderer'
import { CommentMenu } from './CommentMenu'
import { CommentInfoType } from '@/lib/supabase/db_functions'
import { Session } from '@supabase/auth-helpers-nextjs'
import { handleDeleteComment, handleUpdateComment } from '@/app/actions'
import { CommentAvatar } from './CommentAvatar'

type Props = {
  comment: CommentInfoType
  refId: string
  session?: Session | null
}

export const Comment = ({ comment, session }: Props) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editText, setEditText] = React.useState(comment.content)
  const [isSavingEdit, setIsSavingEdit] = React.useState(false)

  function handleEdit() {
    setIsEditing(true)
  }

  const createdAt = timestampToCleanTime({
    monthForm: 'short',
    timestamp: comment.created_at,
  })

  return (
    <div className="group flex flex-col space-y-0">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <CommentAvatar
            user={comment.author.name}
            src={comment.author.avatar_url}
            width={40}
            height={40}
            quality={100}
            layout="fixed"
            className="rounded-full"
          />

          <div className="flex space-x-1">
            <div className="font-semibold leading-snug text-primary">
              <div className="line-clamp-1 flex break-all">
                {comment.author.name}
              </div>
            </div>
            <p className="text-quaternary leading-snug">·</p>
            <p
              className="text-quaternary line-clamp-1 leading-snug"
              title={createdAt.raw}
            >
              {createdAt.formatted}
            </p>
          </div>
        </div>

        {comment?.author_id === session?.user.id && (
          <CommentMenu
            comment={comment}
            handleDelete={handleDeleteComment}
            handleEdit={handleEdit}
            session={session}
          />
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col space-y-3 pl-14">
          <form
            action={async (formData) => {
              setIsSavingEdit(true)
              const content = formData.get('editComment') as string
              await handleUpdateComment({
                id: comment.id,
                content,
                updated_at: new Date().toISOString(),
              })

              setIsSavingEdit(false)
              setIsEditing(false)
            }}
          >
            <Textarea
              onChange={(e: any) => setEditText(e.target.value)}
              id="editComment"
              name="editComment"
              value={editText}
            />
            <div className="flex justify-between">
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              <PrimaryButton
                disabled={editText?.trim().length === 0 || isSavingEdit}
                type="submit"
              >
                {isSavingEdit ? <LoadingSpinner /> : 'Save'}
              </PrimaryButton>
            </div>
          </form>
        </div>
      ) : (
        <MarkdownRenderer
          children={comment.content}
          className="comment prose flex-grow pl-14 leading-normal"
          variant="comment"
        />
      )}
    </div>
  )
}
