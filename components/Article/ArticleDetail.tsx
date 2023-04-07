import * as React from 'react'
import Link from 'next/link'
import { timestampToCleanTime } from '@/lib/utils/transformers'
import type { Post } from '@/lib/utils/post-validator'
import { Detail } from '../ListDetail/Detail'
import { Tags } from '../Tags'
import { MarkdownRenderer } from '../MarkdownRenderer'
import { LoadingSpinner } from '../LoadingSpinner'

interface Props {
  post: Post
  children: React.ReactNode
}

export default function ArticleDetail({ post, children }: Props) {
  if (!post) {
    return <Detail.Null />
  }

  const publishedAt = timestampToCleanTime({ timestamp: post.date })
  return (
    <>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Detail.Container data-cy="post-detail">
          <Detail.ContentContainer>
            <Detail.Header>
              <Link
                href="/articles"
                className="hover:animate-pulse hover:text-blue-500 hover:underline"
              >
                <p>← Back</p>
              </Link>
              <Tags tags={post.categories} />
              <Detail.Title>{post.title}</Detail.Title>
              <span
                title={publishedAt.raw}
                className="inline-block leading-snug"
              >
                {publishedAt.formatted}
              </span>
            </Detail.Header>

            <MarkdownRenderer children={post.body} className="prose mt-8" />

            {/* bottom padding to give space between post content and comments */}
            <div className="py-6" />
          </Detail.ContentContainer>
          {children}
        </Detail.Container>
      </React.Suspense>
    </>
  )
}
