import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Wanllo App',
  description: 'A wonderful trello',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
