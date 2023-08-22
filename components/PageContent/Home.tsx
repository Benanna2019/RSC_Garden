import Link from 'next/link'
import Image from 'next/image'
import { Detail } from '../ListDetail/Detail'
import { MapPin } from 'react-feather'
import CharlestonPinMap from '/public/pin_map_charleston.png'

const workHistory = [
  {
    href: 'https://egghead.io/',
    title: 'Egghead.io',
    subtitle: 'Instructor',
    date: '2022—\u00a0\u00a0',
  },
  {
    href: 'https://comparecredit.com',
    title: 'CompareCredit',
    subtitle: 'Associate Software Engineer',
    date: '2022—\u00a0\u00a0',
  },
  {
    href: 'https://tiag.net/',
    title: 'TIAG',
    subtitle: 'Junior Software Developer',
    date: '2021—22',
  },
]

const courses = [
  {
    href: 'https://egghead.io/courses/build-a-sanity-cms-powered-sveltekit-blog-a15d9e1f?af=5w7fzz',
    title: 'SvelteKit Blog w/ Sanity',
    date: 'April 2023',
    image: '',
  },
]

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
                    <span>writer</span>
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
                <p className="text-xl">Courses</p>
                <div className="flex flex-col space-y-3">
                  {courses
                    ? courses.map((course) => (
                        <TableRow
                          href={course.href}
                          title={course.title}
                          date={course.date}
                          key={course.href}
                        />
                      ))
                    : null}
                </div>
              </div>
            </SectionContent>
          </SectionContainer>

          <SectionContainer className="mx-auto">
            <SectionContent>
              <div className="prose mx-auto">
                <p className="text-xl">Work Exp</p>
                <div className="flex flex-col space-y-3">
                  {workHistory.map((job) => (
                    <TableRow
                      href={job.href}
                      title={job.title}
                      subtitle={job.subtitle}
                      date={job.date}
                      key={job.href}
                    />
                  ))}
                </div>
              </div>
            </SectionContent>
          </SectionContainer>

          <SectionContainer className="mx-auto">
            <SectionContent>
              <div className="prose mx-auto">
                <p className="text-xl">Socials</p>
                <div className="flex flex-col space-y-3">
                  <TableRow
                    href={'https://www.linkedin.com/in/benjaminapatton/'}
                    title={'LinkedIn'}
                    subtitle={'Follow'}
                    date={''}
                  />
                  <TableRow
                    href={
                      'https://www.youtube.com/channel/UCdznsnxpwF9qQCqfOomUqXg'
                    }
                    title={'YouTube'}
                    subtitle={'Subscribe'}
                    date={''}
                  />
                  <TableRow
                    href={'https://github.com/Benanna2019'}
                    title={'GitHub'}
                    subtitle={'Follow'}
                    date={''}
                  />
                </div>
              </div>
            </SectionContent>
          </SectionContainer>
        </div>
      </Detail.ContentContainer>
    </Detail.Container>
  )
}
