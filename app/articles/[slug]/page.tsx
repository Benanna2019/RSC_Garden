import ArticleDetail from '../../../components/Article/ArticleDetail'
import { Post } from '../../../lib/post-validator'
import { getPostBySlug } from '../../../models/post'


export default async function PostPage({ params }: any) {
  let data = await getPostBySlug(params.slug)
  return <ArticleDetail post={data[0]} />
}
