'use client'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { ErrorAlert } from '@/components/Alert'
import { CommentButton } from '@/components/Button'
import { Textarea } from '@/components/Input'
import { useDebounce } from '@/lib/utils/useDebounce'
import { handleAddComment } from '@/lib/supabase/db_functions'
import { useSupabase } from '../Providers/Supabase-Provider'

interface Props {
  refId: string
  type: 'POST'
  openModal: () => void
  session: Session | null
}

export function CommentForm({ refId, openModal, session }: Props) {
  const { supabase } = useSupabase()

  const [text, setText] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)

  const router = useRouter()

  async function onSubmit(e: any) {
    e.preventDefault()
    // not signed in, save to localstorage
    if (!session) {
      // persist everything to local storage so we don't lose it
      localStorage.setItem(refId, text)
      // pop the sign in modal
      return openModal()
    }

    setText('')
    localStorage.removeItem(refId)
    const { error: addCommentError } = await handleAddComment(
      {
        post_id: refId,
        text,
        author_email: session.user.email,
        author_name: session.user.name,
        author_url: session.user.image,
      },
      supabase,
    )
    if (addCommentError) {
      setError(addCommentError.message)
      return
    }
    router.refresh()
  }

  function onKeyDown(
    e: React.FormEvent<HTMLFormElement> & React.KeyboardEvent<HTMLFormElement>,
  ) {
    if (e.keyCode === 13 && e.metaKey) {
      return onSubmit(e)
    }
  }

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
        onSubmit={onSubmit}
      >
        <div className="relative flex w-full flex-none">
          <Textarea
            data-cy="comment-form-textarea"
            placeholder={
              !session ? 'Signin to leave a comment' : 'Write a comment...'
            }
            name="comment"
            disabled={session === null}
            value={text}
            onChange={handleChange}
            onKeyDown={onKeyDown}
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
              <input type="submit" hidden />
            </CommentButton>
          </div>
        </div>
        {error && <ErrorAlert>{error}</ErrorAlert>}
      </form>
    </div>
  )
}
