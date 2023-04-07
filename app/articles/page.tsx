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
    <div className="mx-auto flex max-w-5xl flex-col pt-8">
      <Detail.Container data-cy="home-intro">
        <Detail.ContentContainer>
          <div className="space-y-8 pb-24 md:space-y-16">
            <SectionContainer className="mx-auto">
              <SectionContent>
                <div className="prose mx-auto">
                  <h1 className=" text-blue-500">All Articles</h1>
                  <Suspense fallback={<LoadingSpinner />}>
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
