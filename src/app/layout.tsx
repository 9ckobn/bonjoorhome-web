import type { Metadata } from 'next'
import React from 'react'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'РентДом - Аренда квартир и домов',
  description: 'Качественная краткосрочная аренда жилья в лучших районах города. Квартиры, дома, студии для комфортного проживания.',
  keywords: 'аренда, квартиры, дома, краткосрочная аренда, жилье, Москва, снять квартиру',
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
