import './globals.css'

import Nav from '../components/Nav'
import { GetAnalytics } from '../components/Analytics'
import { Suspense } from 'react'

export const metadata = {
  title: 'Ben A Patton',
  description: 'Digital Garden Using the Next.js app directory',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="max">
        <main className="mx-4 mb-40 mt-8 flex max-w-5xl flex-col antialiased lg:mx-auto">
          <Nav />
          {children}
        </main>
        {/* <GetAnalytics /> */}
      </body>
    </html>
  )
}
