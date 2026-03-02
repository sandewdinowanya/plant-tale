import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Plant Tale',
  description: 'Your intelligent gardening companion powered by AI and weather-aware technology.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <div className="app">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
