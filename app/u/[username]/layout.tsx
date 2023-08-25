import { Metadata } from 'next'
import Image from 'next/image'

import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/app/u/components/sidebar-nav'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/supabase/db_types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
}

interface SettingsLayoutProps {
  children: React.ReactNode
}

export const dynamic = 'force-dynamic'

export default async function ProfileLayout({ children }: SettingsLayoutProps) {
  const supabase = createServerActionClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', session?.user.email)

  if (!data || data.length === 0 || error) {
    redirect('/')
  }

  const sidebarNavItems = [
    {
      title: 'Profile',
      href: `/u/${data[0].username}/#`,
    },
  ]

  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">Profiles are coming soon.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            {/* <SidebarNav items={sidebarNavItems} /> */}
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
