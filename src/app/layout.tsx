import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Cursor from '@/components/layout/cursor';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'opsz'],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Zytheq University',
    template: '%s · Zytheq University',
  },
  description: 'Zytheq University — the Zytheq learning portal for trainers, candidates, and staff.',
  applicationName: 'Zytheq University',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body 
        className={`${fraunces.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans antialiased text-ink selection:bg-ink selection:text-paper`}
        suppressHydrationWarning
      >
        <Cursor />
        {children}
      </body>
    </html>
  );
}
