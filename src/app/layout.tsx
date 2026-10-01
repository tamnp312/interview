import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Suspense } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import NavigationProgressBar from '../components/NavigationProgressBar';
import PwaController from '../components/PwaController';
import { LanguageProvider } from '../i18n/LanguageContext';
import HydrationErrorSuppressor from '../components/HydrationErrorSuppressor';

export const metadata: Metadata = {
  title: 'Luyện Phỏng Vấn IT — 4450+ Câu hỏi phỏng vấn có đáp án',
  description: 'Tổng hợp hơn 4450+ câu hỏi phỏng vấn IT có đáp án song ngữ Việt - Anh từ cơ bản đến nâng cao. Frontend, Backend, DevOps, System Design, AI Engineering.',
  keywords: ['phỏng vấn IT', 'câu hỏi phỏng vấn', 'frontend interview', 'backend interview', 'react', 'nodejs', 'golang', 'system design'],
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'LuyệnPhỏngVấn',
  },
  icons: {
    icon: '/icon-192.svg',
    apple: '/icon-192.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#090a10' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);var l=localStorage.getItem('app_lang')||'vi';document.documentElement.setAttribute('lang',l);}catch(e){}})()`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <HydrationErrorSuppressor />
          <PwaController />
          <Suspense fallback={null}>
            <NavigationProgressBar />
          </Suspense>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileBottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
