import Link from 'next/link'
import Image from 'next/image'
import { Detail } from '../ListDetail/Detail'
import {
  EggheadInstructorCard,
  SvelteKitCourseCard,
  SocialCards,
  CompareCreditInfoCard,
  TiagInfoCard,
} from '../InfoCards'

export function SectionContent(props: any) {
  return <div className="col-span-10" {...props} />
}

export interface TableRowProps {
  href: string
  title: string
  date: string
  subtitle?: string
}

export function TableRow({ href, title, subtitle, date }: TableRowProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="group flex items-center space-x-4"
    >
      <strong className="flex-none font-medium group-hover:underline">
        {title}
      </strong>
      <span className="w-full shrink border-t border-dashed border-gray-300" />
      {subtitle && <span className="text-tertiary flex-none">{subtitle}</span>}
      {date && (
        <span className="text-quaternary flex-none font-mono">{date}</span>
      )}
    </a>
  )
}

export function SectionContainer(props: any) {
  return <div className="grid grid-cols-1 gap-6 md:grid-cols-12" {...props} />
}

export function HomePage() {
  return (
    <Detail.Container data-cy="home-intro">
      <Detail.ContentContainer>
        <div className="space-y-8 pb-24 md:space-y-16">
          <SectionContainer className="mx-auto">
            <SectionContent>
              <div className="prose mx-auto">
                <p className="text-xl">Welcome digital traveler,</p>
                <p>
                  I&apos;m Ben. I&apos;m a developer, educator, and{' '}
                  <Link href="/articles">
                    <span className="text-blue-500 hover:underline">
                      writer
                    </span>
                  </Link>
                  .
                </p>
                <p>
                  Alongside my primary job, which is working on a large
                  marketing site which compares credit cards, ie the name
                  CompareCredit, I focus primarily on teaching, mentoring, and
                  helping people change careers network to find a job.
                </p>
                <p>
                  Recently I have launched my first course on egghead.io. It is
                  a very basic course but it has paved the way to start doing
                  more courses with the hope of becoming a fulltime educator.
                </p>
                <p>
                  Before becoming a software developer I worked in non-profit. I
                  made a living off of fundraising and was able to work with
                  people in all stages of life. The last year and a half of
                  non-profit work was spent working with Senior Adults. My
                  non-profit days are the catalyst for much of my thinking and
                  how I hope to impact the world through software.
                </p>
              </div>
            </SectionContent>
          </SectionContainer>

          <SectionContainer className="mx-auto">
            <SectionContent>
              <div className="prose mx-auto">
                <p className="text-xl sm:text-3xl">Courses</p>
                <div className="flex flex-col space-y-3">
                  <SvelteKitCourseCard />
                </div>
              </div>
            </SectionContent>
          </SectionContainer>

          <SectionContainer className="mx-auto">
            <SectionContent>
              <div className="prose mx-auto">
                <p className="text-xl sm:text-3xl">Work Exp</p>
                <div className="flex flex-col space-y-6">
                  <EggheadInstructorCard />
                  <CompareCreditInfoCard />
                  <TiagInfoCard />
                </div>
              </div>
            </SectionContent>
          </SectionContainer>

          <SectionContainer className="mx-auto">
            <SectionContent>
              <div className="prose mx-auto">
                <p className="text-xl sm:text-3xl">Socials</p>
                <SocialCards />
              </div>
            </SectionContent>
          </SectionContainer>
        </div>
      </Detail.ContentContainer>
    </Detail.Container>
  )
}
