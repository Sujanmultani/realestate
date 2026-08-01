import './globals.css';
import { Fraunces, Inter_Tight } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import { auth } from '@/lib/auth';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
});

export const metadata = {
  title: 'EstatePortal — Editorial Real Estate & Verified Residences',
  description: 'Find verified apartments, luxury villas, commercial spaces, and residential plots across major Indian cities.',
  keywords: ['Real Estate', 'Properties for Sale', 'Apartments for Rent', 'Mumbai Real Estate', 'Bengaluru Flats', 'EstatePortal'],
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-bg text-primary font-sans antialiased" suppressHydrationWarning>
        <SessionProviderWrapper session={session}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
