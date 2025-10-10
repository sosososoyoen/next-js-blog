import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Rubik_Bubbles } from 'next/font/google';
import { Navbar } from './components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from './components/footer';
import { baseUrl } from './sitemap';
import { themeEffect } from 'utils/themeEffect';
import { BLOG_NAME } from './lib/constants';

// Google Fonts 설정
const rubikBubbles = Rubik_Bubbles({
  subsets: ['latin'],
  weight: '400', // Rubik Bubbles는 400 weight만 지원
  display: 'swap',
  variable: '--font-rubik-bubbles',
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: BLOG_NAME,
    template: `${BLOG_NAME} | %s`,
  },
  description: 'IT, 개발에 대해 자유롭게 기록하는 공간입니다.',
  icons: {
    icon: [
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: BLOG_NAME,
    description: 'IT, 개발에 대해 자유롭게 기록하는 공간입니다.',
    url: baseUrl,
    siteName: BLOG_NAME,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable,
        rubikBubbles.variable
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: `(${themeEffect.toString()})()` }}
        />
      </head>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col md:px-0">
          <Navbar />
          {children}
           <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
