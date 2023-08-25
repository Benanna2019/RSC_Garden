import React, { Suspense } from 'react'
import { Detail } from '@/components/ListDetail/Detail'
import { ListItem } from '@/components/ListDetail/ListItem'
import { SectionContainer, SectionContent } from '@/components/PageContent/Home'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Post } from '@/lib/utils/post-validator'
import { getPosts } from '@/models/post'

export default async function Articles() {
  let data = await getPosts()

  return (
    <div className="flex flex-col">
      <Detail.Container data-cy="home-intro">
        <Detail.ContentContainer>
          <div className="space-y-8 pb-24 md:space-y-16">
            <SectionContainer className="mx-auto">
              <SectionContent className="max-w-4xl">
                <div className="prose">
                  <h1 className="text-blue-500">All Articles</h1>
                  <Suspense fallback={<ArticleFallback />}>
                    {data.map((post: Post) => (
                      <ListItem
                        key={post._id}
                        href={`/articles/${post.slug}`}
                        title={post.title}
                        description={post.excerpt}
                        byline={post.date}
                      />
                    ))}
                  </Suspense>
                </div>
              </SectionContent>
            </SectionContainer>
          </div>
        </Detail.ContentContainer>
      </Detail.Container>
    </div>
  )
}

function ArticleFallback() {
  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center pt-8">
      <LoadingSpinner />
    </div>
  )
}
