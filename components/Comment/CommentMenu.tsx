'use client'
import { Menu, Transition } from '@headlessui/react'
import * as React from 'react'
import { MoreHorizontal } from 'react-feather'

import { GhostButton } from '@/components/Button'

export function CommentMenu({
  handleDelete,
  handleEdit,
  comment,
  session,
}: any) {
  return (
    <div className="flex items-center justify-center rounded-md border-2 border-black opacity-0 group-hover:opacity-100">
      <div className="relative inline-block text-left">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button as="div" className="z-0 inline-flex ">
                <GhostButton
                  aria-label="Open comment actions menu"
                  size="small-square"
                >
                  <MoreHorizontal size={16} className=" text-black" />
                </GhostButton>
              </Menu.Button>

              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 -top-36 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-sm outline-none "
                >
                  {comment.author_email === session.user.email && (
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            onClick={handleEdit}
                            className={`${
                              active
                                ? 'bg-gray-100 text-gray-900 '
                                : 'text-gray-900 '
                            } flex w-full cursor-pointer justify-between px-4 py-2 text-left text-sm leading-5`}
                          >
                            Edit
                          </span>
                        )}
                      </Menu.Item>
                    </div>
                  )}

                  {comment.author_email === session.user.email && (
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            onClick={handleDelete}
                            className={`${
                              active
                                ? 'bg-red-50 text-red-500 dark:bg-red-500 dark:bg-opacity-10 dark:text-red-500'
                                : 'text-red-500 dark:text-red-500'
                            } flex w-full cursor-pointer justify-between px-4 py-2 text-left text-sm leading-5`}
                          >
                            Delete
                          </span>
                        )}
                      </Menu.Item>
                    </div>
                  )}
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  )
}
