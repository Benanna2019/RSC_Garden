'use client'

import { usePathname } from 'next/navigation'

import { HomeIcon, WritingIcon } from '../Icon'
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import { NavigationLink } from './NavigationLink'

export function Navigation() {
  const pathname = usePathname()

  const sections = [
    {
      items: [
        {
          href: '/',
          label: 'Home',
          icon: HomeIcon,
          trailingAccessory: null,
          isActive: pathname === '/',
          trailingAction: null,
          isExternal: false,
          onClickFn: null,
        },

        {
          href: '/about',
          label: 'About',
          icon: WritingIcon,
          trailingAccessory: null,
          isActive: pathname === '/about',
          trailingAction: null,
          isExternal: false,
          onClickFn: null,
        },

        {
          href: '/articles',
          label: 'Articles',
          icon: WritingIcon,
          trailingAccessory: null,
          isActive:
            pathname === '/articles' || pathname?.includes('/articles/'),
          trailingAction: null,
          isExternal: false,
          onClickFn: null,
        },
        // isAdmin && {
        //   href: '/admin',
        //   label: 'Admin',
        //   icon: WrenchScrewdriverIcon,
        //   trailingAccessory: null,
        //   isActive: pathname === '/admin' || pathname?.includes('/admin/'),
        //   trailingAction: null,
        //   isExternal: false,
        //   onClickFn: null,
        // },
      ],
    },
  ]

  return (
    <div className="w-full space-y-1 px-3 py-3">
      {sections.map((section: any, i: number) => {
        return (
          <ul key={i} className="flex justify-start space-x-4 pl-8">
            {section.items.map((item: any, j: number) => (
              <NavigationLink key={j} link={item} />
            ))}
          </ul>
        )
      })}
    </div>
  )
}
