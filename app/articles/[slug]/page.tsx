import type { Post } from '@/lib/utils/post-validator'
import { getPostBySlug } from '@/models/post'
import Comments from '@/components/Comment'
import ArticleDetail from '@/components/Article/ArticleDetail'

export default async function PostPage({ params }: any) {
  let data = await getPostBySlug(params.slug)

  const post = data[0] as Post

  return (
    <ArticleDetail post={post}>
      <Comments refId={post._id} />
    </ArticleDetail>
  )
}
