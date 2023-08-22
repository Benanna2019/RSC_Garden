'use client'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutGroup, motion } from 'framer-motion'

type NavItems = {
  [key: string]: {
    name: string
  }
}

const navItems: NavItems = {
  '/': {
    name: 'Home',
  },
  '/articles': {
    name: 'Articles',
  },
}
function Logo() {
  return (
    <Link aria-label="Lee Robinson" href="/">
      <motion.svg
        className="h-[25px] text-black "
        width="25"
        height="37"
        viewBox="0 0 232 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{
            opacity: 0,
            pathLength: 0,
          }}
          animate={{
            opacity: 1,
            pathLength: 1,
          }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 50,
          }}
          d="M39 316V0"
          stroke="currentColor"
          strokeWidth={78}
        />
        <motion.path
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 50,
          }}
          d="M232 314.998H129.852L232 232.887V314.998Z"
          fill="currentColor"
        />
      </motion.svg>
    </Link>
  )
}
export default function Sidebar() {
  let pathname = usePathname()
  if (pathname.includes('/articles/')) {
    pathname = '/articles'
  }
  return (
    <aside className="-mx-4 md:mx-0 md:w-[150px] md:flex-shrink-0 md:px-0">
      <div className="lg:sticky lg:top-20">
        <LayoutGroup>
          <nav
            className="fade relative flex scroll-pr-6 flex-row items-start px-4 pb-0 md:relative md:flex-col md:overflow-auto md:px-0"
            id="nav"
          >
            <div className="mb-2 mt-2 flex flex-row space-x-0 pr-10 md:mt-0 md:flex-col">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname
                return (
                  <Link
                    key={path}
                    href={path}
                    className={clsx(
                      'flex align-middle transition-all hover:text-neutral-800',
                      {
                        'text-neutral-500': !isActive,
                        'font-semibold': isActive,
                      },
                    )}
                  >
                    <span className="relative py-[5px] px-[10px]">
                      {name}
                      {path === pathname ? (
                        <motion.div
                          className="absolute inset-0 z-[-1] rounded-md bg-orange-300"
                          layoutId="sidebar"
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  )
}
