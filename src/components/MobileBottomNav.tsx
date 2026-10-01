'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Layers, CheckSquare, Bookmark } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const isCategory = (pathname.startsWith('/category') || pathname.startsWith('/c')) && !pathname.includes('flashcards');
  const isFlashcards = pathname.includes('flashcards');
  const isQuiz = pathname.startsWith('/quiz');
  const isBookmarks = pathname === '/bookmarks';
  const isHome = pathname === '/';

  const navItems = [
    {
      label: t.nav.home,
      href: '/',
      icon: Home,
      active: isHome
    },
    {
      label: t.nav.practice,
      href: '/category/all',
      icon: BookOpen,
      active: isCategory
    },
    {
      label: t.nav.flashcards,
      href: '/category/all/flashcards',
      icon: Layers,
      active: isFlashcards
    },
    {
      label: t.nav.quiz,
      href: '/quiz',
      icon: CheckSquare,
      active: isQuiz
    },
    {
      label: t.nav.bookmarks,
      href: '/bookmarks',
      icon: Bookmark,
      active: isBookmarks
    }
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <div className="mobile-bottom-nav-inner">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-bottom-nav-item ${item.active ? 'active' : ''}`}
            >
              <div className="mobile-bottom-nav-icon">
                <Icon size={20} />
              </div>
              <span className="mobile-bottom-nav-label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
