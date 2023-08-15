'use client'
import * as React from 'react'
import { CommentButton } from '@/components/Button'
import { Textarea } from '@/components/Input'
import { useDebounce } from '@/lib/utils/useDebounce'
import { handleAddComment } from '@/app/actions'
import { Session } from '@supabase/auth-helpers-nextjs'

interface Props {
  refId: string
  openModal: () => void
  session: Session | null
}

export function CommentForm({ refId, openModal, session }: Props) {
  const [text, setText] = React.useState('')

  React.useEffect(() => {
    const localText = localStorage.getItem(refId)
    if (localText) {
      setText(localText)
    }
  }, [])

  const debouncedText = useDebounce(text, 500)

  React.useEffect(() => {
    localStorage.setItem(refId, debouncedText)
  }, [debouncedText])

  function handleChange(e: any) {
    return setText(e.target.value)
  }

  return (
    <div className="filter-blur sticky bottom-0 flex flex-col border-t border-gray-150 bg-white bg-opacity-90 pb-10 dark:border-gray-800 dark:bg-gray-900 sm:pb-0">
      <form
        className="mx-auto flex w-full max-w-3xl flex-none items-center space-x-4 px-4 py-4 md:px-6"
        action={async (formData: FormData) => {
          if (!session) {
            // persist everything to local storage so we don't lose it
            localStorage.setItem(refId, text)
            // pop the sign in modal
            return openModal()
          }
          setText('')
          localStorage.removeItem(refId)
          const content = formData.get('comment') as string
          await handleAddComment({ post_id: refId, content })
        }}
      >
        <div className="relative flex w-full flex-none">
          <Textarea
            data-cy="comment-form-textarea"
            placeholder={
              !session ? 'Signin to leave a comment' : 'Write a comment...'
            }
            id="comment"
            name="comment"
            disabled={session === null}
            value={text}
            onChange={handleChange}
            style={{ paddingRight: '48px' }}
          />

          <div className="absolute bottom-1 right-1">
            <CommentButton
              data-cy="submit-comment-button"
              type="submit"
              disabled={text.trim().length === 0}
              size="small-square"
            >
              ↑
            </CommentButton>
          </div>
        </div>
      </form>
    </div>
  )
}
