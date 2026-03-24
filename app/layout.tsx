import type { Metadata } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
const devName = process.env.NEXT_PUBLIC_DEV_NAME || 'Dev Studio'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${devName} — Desarrollo Web & Apps Móviles para Startups`,
    template: `%s | ${devName}`
  },
  description:
    'Desarrollo web y aplicaciones móviles profesionales para startups. Transformo ideas en productos digitales de alta calidad con tecnología moderna.',
  keywords: [
    'desarrollo web',
    'aplicaciones móviles',
    'startups',
    'React',
    'Next.js',
    'React Native',
    'freelance',
    'desarrollador web',
    'TypeScript',
    'Node.js'
  ],
  authors: [{ name: devName }],
  creator: devName,
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: devName,
    title: `${devName} — Desarrollo Web & Apps Móviles para Startups`,
    description:
      'Desarrollo web y aplicaciones móviles profesionales para startups. Transformo ideas en productos digitales de alta calidad.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${devName} — Desarrollo Web y Apps Móviles`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${devName} — Desarrollo Web & Apps Móviles`,
    description:
      'Desarrollo web y aplicaciones móviles profesionales para startups.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
