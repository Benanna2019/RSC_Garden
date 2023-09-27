'use client'
import * as React from 'react'
import Link from 'next/link'
//@ts-ignore
import { useInView } from 'react-intersection-observer'
import { Detail } from '../ListDetail/Detail'
import { Tags } from '../Tags'
import { increment } from '@/app/actions'
import { Blog } from '@/.contentlayer/generated'
import { MdxRenderer } from '../MdxRenderer'

interface Props {
  post: Blog
  children: React.ReactNode
}

export default function ArticleDetail({ post, children }: Props) {
  const { inView, ref } = useInView({
    threshold: 0.9,
    triggerOnce: true,
  })

  React.useEffect(() => {
    if (inView) {
      increment(post.slug)
    }
  }, [inView])

  // const publishedAt = timestampToCleanTime({ timestamp: post.date })
  return (
    <>
      {/* <React.Suspense fallback={<LoadingSpinner />}> */}
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
            <Detail.Title ref={ref}>{post.title}</Detail.Title>
            <span
              // title={publishedAt?.raw}
              className="inline-block leading-snug"
            >
              {post.date}
            </span>
          </Detail.Header>

          {/* <MarkdownRenderer children={post.body.code} className="prose mt-8" /> */}
          <div className="prose mt-8">
            <MdxRenderer code={post.body.code} />
          </div>

          {/* bottom padding to give space between post content and comments */}
          <div className="py-6" />
        </Detail.ContentContainer>
        {children}
      </Detail.Container>
      {/* </React.Suspense> */}
    </>
  )
}
