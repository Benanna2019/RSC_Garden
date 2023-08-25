import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Database } from '@/lib/supabase/db_types'
import { SignIn, SignOut } from '../Login'
import Link from 'next/link'

export function AvatarMenu({
  user,
}: {
  user: Database['public']['Tables']['profiles']['Row']
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.avatar_url} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/u/${user.username}`}>
              <DropdownMenuItem className="hover:cursor-pointer">
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuLabel>
            <SignIn />
          </DropdownMenuLabel>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
