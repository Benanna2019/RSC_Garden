'use client'
import * as React from 'react'
import { Dialog, Popover } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { LayoutGroup, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export function Navbar({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  const sections = {
    items: [
      {
        href: '/',
        label: 'Home',
        icon: null,
        trailingAccessory: null,
        isActive: pathname === '/',
        trailingAction: null,
        isExternal: false,
      },

      {
        href: '/articles',
        label: 'Articles',
        icon: null,
        trailingAccessory: null,
        isActive: pathname === '/articles' || pathname?.includes('/articles/'),
        trailingAction: null,
        isExternal: false,
      },
    ],
  }

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex w-full flex-row justify-between space-x-0 pr-10 ">
            <div className="flex lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-900"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <Popover.Group className="hidden w-full lg:flex lg:justify-between">
              <div className="flex">
                {sections.items.map((item, i) => (
                  <React.Fragment key={i}>
                    <LayoutGroup>
                      <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                          'flex rounded-md align-middle transition-all hover:bg-violet-300 hover:text-neutral-900 hover:underline',
                          {
                            'text-neutral-500': !item.isActive,
                          },
                        )}
                      >
                        <span className="relative py-1 px-2">
                          {item.label}
                          {item.isActive ? (
                            <motion.div
                              className="absolute inset-0 z-[-1] rounded-md font-extrabold "
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
                    </LayoutGroup>
                  </React.Fragment>
                ))}
              </div>
            </Popover.Group>
            <div className="flex">
              <div className="text-md flex flex-col py-1 px-2 align-middle font-semibold text-black">
                {children}
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 drop-shadow-lg sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
                >
                  Home
                </Link>
                <Link
                  href="/articles"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
                >
                  Articles
                </Link>
              </div>
              <hr className=" flex h-0.5 w-full items-center justify-center bg-black" />
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </aside>
  )
}

{
  /* <LayoutGroup>
        <nav
          className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-50"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Navigation />
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="text-md flex w-1/5 flex-col items-center justify-center p-4 font-semibold text-white">
              {session ? <SignOut /> : <SignIn />}
            </div>
          </div>
        </nav>
      </LayoutGroup> */
}
