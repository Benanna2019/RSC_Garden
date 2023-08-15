import { useGetCommentsQuery } from '@/lib/supabase/db_functions'
import { Comment } from './Comment'
import { getServerSession } from '@/lib/supabase/supabase-server'

export const dynamic = 'force-dynamic'

export default async function GetComments({ refId }: { refId: string }) {
  const { data, error } = await useGetCommentsQuery(refId)
  const supabase = getServerSession()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
      <div className="flex flex-col space-y-3">
        {data?.length > 0 &&
          data.map((comment) => (
            <Comment
              key={comment.id}
              refId={refId}
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
    </>
  )
}
