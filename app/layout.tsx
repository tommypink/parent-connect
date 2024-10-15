import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BottomNavigation from '@/components/BottomNavigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ParentConnect',
  description: 'Enhancing communication between parents and teachers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen pb-16">{children}</main>
        <BottomNavigation />
      </body>
    </html>
  );
}
