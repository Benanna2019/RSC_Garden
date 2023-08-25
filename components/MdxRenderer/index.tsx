'use client'
import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'
// import fallbackNetworkingUrl from 'app/hotairballoons.jpg'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/app/components/ui/dialog'
// import { experimental_useFormStatus as useFormStatus } from 'react-dom'
// import { usePathname } from 'next/navigation'

// import {
//   collectLinkActions,
//   saveNotesEntry,
//   checkIfUserHasCollectedLink,
// } from '@/app/actions'
// import { useQuery } from '@tanstack/react-query'

// export const actionsLookupObject = {
//   'collect-link': collectLinkActions,
//   'save-guestbook-entry': saveNotesEntry,
// }

const CustomLink = (props: any) => {
  const href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Callout(props: any) {
  return (
    <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
      <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  )
}

// Keeping the Linkin Callout component for potential future use

// function LinkedInCallout(props: LinkedInProps) {
//   return (
//     <>
//       <div className="mb-8 flex flex-col items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
//         <div className="flex w-full flex-col justify-start">
//           <h3 className="text-xl uppercase text-blue-500">LinkedIn</h3>
//           <h2 className="text-2xl">Weekly LinkedIn Tip</h2>
//         </div>
//         <div className="my-6">
//           <RoundedImage
//             alt="LinkedIn Headline"
//             src="https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlua2VkaW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
//             width={1600}
//             height={840}
//           />
//         </div>
//         <div className="mb-8 flex items-center rounded py-3 text-base text-neutral-900 dark:text-neutral-100">
//           <div className="w-full">{props.children}</div>
//         </div>
//       </div>
//     </>
//   )
// }

// function CollectLinkPopUp(props: CollectionLinkPopUpProps) {
//   const serverAction = actionsLookupObject[props.serverAction]
//   const formRef = React.useRef<HTMLFormElement>(null)
//   const { pending } = useFormStatus()
//   const pathname = usePathname()

//   // All of this is simple for styling the link.
//   // TODOS:
//   // [ ] - If there is no data, closing the dialog should, on first renderthe button should read, collect link.
//   // [ ] - if there is data, meaning the user has this link already, the button should read 'continue reading'
//   // [ ] - get total amount of links from db for a given blog post - DO THIS ON THE BLOG POST PAGE IN THE SERVER COMPONENT
//   // [ ] - check if user has collected links that match on the blog post slug
//   // [ ] - display a 'links collected' metric with something like 'links collected: 1/3'
//   // [ ] - if the user doesn't have a specific link, the button should read 'collect link' and the server action is active
//   // [ ] - if the user has collected the specific link, the button should read 'continue reading' and just close the dialog

//   // NOTES:
//   // Last primary thing to figure out is skipping the server action if there is data
//   // That will mean that there the current user has already collected this link

//   // I would have to do some fancy merging magic but it would be possible to, when I create the blog post
//   // and when I add one of these link popups to the mdx, I can make sure I have a total amount of 'links on this page'
//   // Then when I load the page, get that number, and then query the links table for the current user
//   // and where the pathname of the blog post matches user and pathname in the db, get the total amount of links there.
//   // The just have a 'collectedLinks: x/totalLinks' either in state/as a display

//   const { data, isLoading, isError } = useQuery(
//     ['link', props.serverAction],
//     () =>
//       fetch(`/api/links/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(props.serverAction),
//       }).then((res) => res.json())
//   )

//   return (
//     <>
//       <Dialog>
//         <DialogTrigger>{props.title}</DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{props.title}</DialogTitle>
//             <DialogDescription>{props.content}</DialogDescription>
//             <form
//               style={{ opacity: !pending ? 1 : 0.7 }}
//               className=" max-w-[500px] text-sm"
//               ref={formRef}
//               action={async (formData) => {
//                 await serverAction(formData, pathname)
//                 formRef.current?.reset()
//               }}
//             >
//               <button type="submit" name="intent" value={props.serverAction}>
//                 Collect link
//               </button>
//             </form>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }

const components = {
  Image: RoundedImage,
  a: CustomLink,
  Callout,
}

interface MdxProps {
  code: string
}

export function MdxRenderer({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <article className="prose-quoteless prose prose-neutral dark:prose-invert">
      <Component components={{ ...components }} />
    </article>
  )
}

//   type CollectionLinkPopUpProps = {
//     title: string
//     children?: React.ReactNode
//     serverAction: 'collect-link' | 'save-guestbook-entry'
//     content: string
//   }
