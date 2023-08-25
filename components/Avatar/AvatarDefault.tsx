import { Avatar, AvatarFallback } from '../ui/avatar'

export default function AvatarDefault() {
  return (
    <Avatar className="h-8 w-8">
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  )
}
