import SupabaseProvider from '../components/Providers/Supabase-Provider'
import './globals.css'

import { Navbar } from '../components/Navbar'
import { GetAnalytics } from '../components/Analytics'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export const metadata = {
  title: 'Ben A Patton',
  description: 'Digital Garden Using the Next.js app directory',
}

// do not cache this layout
export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <Navbar session={session} />
          {children}
        </SupabaseProvider>
        <GetAnalytics />
      </body>
    </html>
  )
}
