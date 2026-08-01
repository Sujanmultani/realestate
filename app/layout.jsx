import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'EstatePortal — Premium Real Estate & Property Listings in India',
  description: 'Find verified apartments, luxury villas, commercial spaces, and residential plots for sale and rent across major Indian cities.',
  keywords: ['Real Estate', 'Properties for Sale', 'Apartments for Rent', 'Mumbai Real Estate', 'Bengaluru Flats', 'EstatePortal'],
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased" suppressHydrationWarning>
        <SessionProviderWrapper session={session}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
