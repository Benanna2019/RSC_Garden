import { Navbar } from './Navbar'
import Avatar from '../Avatar'
import { Suspense } from 'react'
import AvatarDefault from '../Avatar/AvatarDefault'

export default function Nav() {
  return (
    <Navbar>
      <Suspense fallback={<AvatarDefault />}>
        <Avatar />
      </Suspense>
    </Navbar>
  )
}
