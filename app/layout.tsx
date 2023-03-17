import { Navbar } from '../components/Navbar'
import { GetAnalytics } from "../components/Analytics"
import './globals.css'

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
      <body>
        <Navbar />
        {children}
        <GetAnalytics />
      </body>
    </html>
  )
}
