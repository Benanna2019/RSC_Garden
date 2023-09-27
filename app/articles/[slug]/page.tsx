import type { Metadata } from 'next'
import { allBlogs } from 'contentlayer/generated'
import Comments from '@/components/Comment'
import ArticleDetail from '@/components/Article/ArticleDetail'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const post = allBlogs.find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const { title, date: publishedTime, excerpt: description, slug } = post
  const ogImage = `https://www.benapatton.dev/og?title=${title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://www.benapatton.dev/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = allBlogs.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <ArticleDetail post={post}>
      <Comments refId={post._id} />
    </ArticleDetail>
  )
}
