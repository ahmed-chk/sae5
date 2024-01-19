import { Inter } from 'next/font/google'
import '@/assets/style/app.css'
import { Navigation } from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.JS application',
  description: 'Put your description here',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
