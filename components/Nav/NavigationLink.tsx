'use client'
import clsx from 'clsx'
import { LayoutGroup, motion } from 'framer-motion'
import Link from 'next/link'
import * as React from 'react'

interface NavLink {
  link: {
    href: any
    label: any
    icon: any
    trailingAccessory: any
    trailingAction: any
    isActive?: boolean
    isExternal: any
    onClickFn: any
  }
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export function NavigationLink({
  link: {
    href,
    label,
    icon: Icon,
    trailingAccessory: Accessory,
    trailingAction: Action,
    isActive,
    isExternal,
    onClickFn,
  },
}: NavLink) {
  return (
    <li>
      {!isExternal ? (
        <Link
          href={href}
          onClick={onClickFn}
          className={clsx(
            'flex align-middle text-neutral-50 transition-all hover:text-neutral-100',
            {
              'font-semibold': isActive,
            },
          )}
        >
          <span className="relative py-[5px] px-[10px]">
            {label}
            {isActive ? (
              <motion.div
                className="absolute inset-0 z-[-1] rounded-md text-orange-300"
                layoutId="navbar"
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 30,
                }}
              />
            ) : null}
          </span>
        </Link>
      ) : null}
      {Action ? <Action /> : null}
    </li>
  )
}
