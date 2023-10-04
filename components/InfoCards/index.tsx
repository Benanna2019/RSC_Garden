import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { GitHubIcon, LinkedInIcon, TwitterIcon, YouTubeIcon } from '../Icon'

type InfoCardProps = {
  title: string
  description?: string
  href?: string
  children?: React.ReactNode
  image: any
}

const courses = [
  {
    href: 'https://egghead.io/courses/build-a-sanity-cms-powered-sveltekit-blog-a15d9e1f?af=5w7fzz',
    title: 'SvelteKit Blog w/ Sanity',
    date: 'April 2023',
    image: '/logos/sveltekit-course-logo.svg',
  },
]

export function SvelteKitCourseCard() {
  return (
    <Card className="relative inset-0 isolate h-auto w-full rounded-md bg-[url('/logos/sveltekit-course-logo.webp')] bg-contain bg-fixed bg-right bg-no-repeat">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 mix-blend-multiply" />
      <CardHeader>
        <CardTitle>
          <a
            className="relative"
            href="https://egghead.io/courses/build-a-sanity-cms-powered-sveltekit-blog-a15d9e1f?af=5w7fzz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-white hover:text-blue-300">
              SvelteKit Blog w/ Sanity
            </span>
          </a>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export function NextMigrationCourseCard() {
  return (
    <Card className="relative inset-0 isolate h-auto w-full rounded-md bg-[url('/logos/NextMigrationCourseGraphic.webp')] bg-contain bg-fixed bg-right bg-no-repeat">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 mix-blend-multiply" />
      <CardHeader>
        <CardTitle>
          <a
            className="relative"
            href="https://egghead.io/courses/migrate-next-js-application-to-app-router-c4b31d29?af=5w7fzz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-white hover:text-blue-300">
              Migrate Next.js Application to App Router
            </span>
          </a>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

// Keeping this as a reference
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

export function EggheadInstructorCard() {
  return (
    <Card className="relative inset-0 isolate h-auto w-full rounded-md bg-[url('/logos/egghead.svg')] bg-contain bg-fixed bg-right bg-no-repeat">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 mix-blend-multiply" />
      <CardHeader>
        <CardTitle>
          <a
            href="https://egghead.io/"
            className="relative"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-white">
              Instructor @{' '}
              <span className="hover:text-blue-300">egghead.io</span>
            </span>
          </a>
        </CardTitle>
        <CardDescription className="relative text-white">
          2022 - Present
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export function CompareCreditInfoCard() {
  return (
    <div className="max-w-3xl">
      <Card className="bg- relative inset-0 isolate h-auto rounded-md bg-[url('/logos/compare-credit_logomark.svg')] bg-contain bg-fixed bg-right bg-no-repeat">
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 mix-blend-multiply" />
        <CardHeader>
          <CardTitle>
            <a
              href="https://www.comparecredit.com/"
              className="relative"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-white">
                Software Engineer @{' '}
                <span className="hover:text-blue-300">CompareCredit</span>
              </span>
            </a>
          </CardTitle>
          <CardDescription className="relative text-white">
            2022 - Present
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export function TiagInfoCard() {
  return (
    <Card className="relative inset-0 isolate h-auto w-full rounded-md bg-[url('/logos/TIAG-logo-blue.png')] bg-contain bg-fixed bg-right bg-no-repeat">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 mix-blend-multiply" />
      <CardHeader>
        <CardTitle>
          <a
            href="https://www.tiag.net/"
            className="relative"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-white">
              Junior Software Developer @{' '}
              <span className="hover:text-blue-300">TIAG</span>
            </span>
          </a>
        </CardTitle>
        <CardDescription className="relative text-white">
          2021 - 2022
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

const socials = [
  {
    href: 'https://www.youtube.com/channel/UCdznsnxpwF9qQCqfOomUqXg',
    title: 'Youtube',
    subtitle: 'Follow',
    icon: YouTubeIcon,
    width: '28',
    height: '24',
    color: 'text-red-500',
  },
  {
    href: 'https://twitter.com/benapatton',
    title: 'Twitter',
    subtitle: 'Follow',
    icon: TwitterIcon,
    width: '28',
    height: '24',
    color: 'text-blue-400',
  },

  {
    href: 'https://www.linkedin.com/in/benjaminapatton/',
    title: 'LinkedIn',
    subtitle: 'Follow',
    icon: LinkedInIcon,
    width: '28',
    height: '24',
    color: 'text-blue-500',
  },
  {
    href: 'https://github.com/Benanna2019',
    title: 'Github',
    subtitle: 'Follow',
    icon: GitHubIcon,
    width: '28',
    height: '24',
    color: 'text-gray-900',
  },
]

export function SocialCards() {
  return (
    <div className="flex max-w-2xl flex-col justify-center space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0  sm:align-middle">
      {socials.map((social) => (
        <Card key={social.href} className="h-20 w-full sm:w-1/6">
          <a href={social.href} target="_blank" rel="noopener noreferrer">
            <CardContent className="flex items-center justify-around space-x-4 py-8 align-middle">
              <span className={`${social.color} hover:animate-pulse`}>
                <social.icon width={social.width} height={social.height} />
              </span>
            </CardContent>
          </a>
        </Card>
      ))}
    </div>
  )
}
