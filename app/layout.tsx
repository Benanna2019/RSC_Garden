import './globals.css'

import Nav from '../components/Nav'
import { GetAnalytics } from '../components/Analytics'
import { Suspense } from 'react'

export const metadata = {
  title: 'Ben A Patton',
  description: 'Digital Garden Using the Next.js app directory',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const isAdmin = session
  //   ? session.user.email === process.env.ALT_ADMIN_EMAIL
  //   : false
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Nav />
        </Suspense>
        {children}
        {/* <GetAnalytics /> */}
      </body>
    </html>
  )
}
