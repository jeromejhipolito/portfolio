import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ClientEffects } from '@/components/effects/client-effects';
import { generatePersonSchema, generateWebSiteSchema } from '@/lib/structured-data';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jerome Hipolito — Senior Full Stack Developer, Philippines | Laravel · Next.js · React',
  description:
    'Senior Full Stack Developer specializing in distributed systems, microservices, and AI-assisted development. One-person team delivering architecture to E2E testing. Open to remote roles.',
  openGraph: {
    title: 'Jerome Hipolito — Senior Full Stack Developer',
    description:
      'One engineer. Full stack. 500+ automated tests. See the work and the workflow.',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jerome Hipolito — Senior Full Stack Developer',
    description:
      'One engineer. Full stack. 500+ automated tests. See the work and the workflow.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              generatePersonSchema(process.env.NEXT_PUBLIC_BASE_URL || 'https://jerome.dev'),
              generateWebSiteSchema(process.env.NEXT_PUBLIC_BASE_URL || 'https://jerome.dev'),
            ]),
          }}
        />
        <ClientEffects />
        {children}
      </body>
    </html>
  );
}
