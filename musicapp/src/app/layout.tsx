import './globals.css'

export const metadata = {
  title: 'musicApp',
  description: 'Generated new musicApp',
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
