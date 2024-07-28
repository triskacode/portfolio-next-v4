import './globals.css';
import type { Metadata } from 'next';
import { fontMono, fontSans } from '@/lib/font';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body className="min-h-screen-dvh bg-background font-sans antialiased">
        <div
          className={cn(
            'relative flex min-h-screen-dvh flex-col bg-background',
            '[--header-height:4rem]',
          )}
        >
          <PageHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
