import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '相続リスク診断',
  description: 'いくつかの質問に答えるだけで、相続トラブルの起きやすさを簡易チェックできます（無料）',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
