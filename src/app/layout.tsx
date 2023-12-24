import type { Metadata } from 'next';
import { fontPixel } from '@/lib/fonts';
import './globals.css';

import Header from './header';
import Footer from './footer';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'REAL INTERNET',
  description: 'Make internet great again.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${fontPixel.variable} font-pixel leading-relaxed`}>
        <div className="flex flex-col h-screen">
          <Header siteTitle="REAL INTERNET" />
          <div className="container mx-auto my-3 w-9/12">{children}</div>
          <Footer host="realinternetman.com" />
        </div>
      </body>
    </html>
  );
}
