'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  BookOpen,
  Layers,
  CheckSquare,
  Bookmark,
  Code2,
  Menu,
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import CommandPalette from './CommandPalette';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsSearchOpen(true);
    window.addEventListener('open-command-palette', handleOpen);
    return () => window.removeEventListener('open-command-palette', handleOpen);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const { t } = useLanguage();

  const navLinks = [
    { href: '/', label: t.nav.home, icon: Code2, active: pathname === '/' },
    {
      href: '/category/all',
      label: t.nav.practice,
      icon: BookOpen,
      active: (pathname.startsWith('/category') || pathname.startsWith('/c')) && !pathname.includes('flashcards')
    },
    {
      href: '/category/all/flashcards',
      label: t.nav.flashcards,
      icon: Layers,
      active: pathname.includes('flashcards')
    },
    {
      href: '/quiz',
      label: t.nav.quiz,
      icon: CheckSquare,
      active: pathname.startsWith('/quiz')
    },
    {
      href: '/bookmarks',
      label: t.nav.bookmarks,
      icon: Bookmark,
      active: pathname === '/bookmarks'
    }
  ];

  return (
    <>
      <header className="app-header">
        <div className="container app-header-inner">
          <Link href="/" className="brand">
            <div className="brand-icon">
              <Code2 size={20} />
            </div>
            <span>
              Luyện<span className="brand-accent">PhỏngVấn</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-links">
            {navLinks.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`nav-link ${item.active ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="search-trigger"
              aria-label={t.common.search}
            >
              <Search size={16} />
              <span className="search-text-desktop">{t.nav.searchPlaceholder}</span>
              <span className="search-text-mobile">{t.nav.searchKbd}</span>
              <kbd className="kbd-shortcut">⌘K</kbd>
            </button>

            <LanguageToggle />
            <ThemeToggle />

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn-icon mobile-menu-toggle"
              aria-label={isMobileMenuOpen ? t.common.close : 'Menu'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className="mobile-drawer-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="mobile-drawer"
            onClick={e => e.stopPropagation()}
          >
            <div className="mobile-drawer-header">
              <div className="brand">
                <div className="brand-icon">
                  <Code2 size={18} />
                </div>
                <span>
                  Luyện<span className="brand-accent">PhỏngVấn</span>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LanguageToggle />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-icon"
                  aria-label={t.common.close}
                  style={{ width: '32px', height: '32px' }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="mobile-drawer-body">
              <div className="mobile-drawer-section">
                <div className="mobile-drawer-title">ĐIỀU HƯỚNG CHÍNH</div>
                <div className="mobile-nav-list">
                  {navLinks.map(item => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        prefetch={true}
                        className={`mobile-nav-item ${item.active ? 'active' : ''}`}
                      >
                        <div className="mobile-nav-icon">
                          <Icon size={18} />
                        </div>
                        <span className="mobile-nav-text">{item.label}</span>
                        <ChevronRight size={16} className="mobile-nav-arrow" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="mobile-drawer-section">
                <div className="mobile-drawer-title">CHUYÊN ĐỀ PHỔ BIẾN</div>
                <div className="mobile-topic-grid">
                  {[
                    { name: 'HTML', slug: 'html' },
                    { name: 'CSS', slug: 'css' },
                    { name: 'JavaScript', slug: 'javascript' },
                    { name: 'TypeScript', slug: 'typescript' },
                    { name: 'React', slug: 'react' },
                    { name: 'Next.js', slug: 'nextjs' },
                    { name: 'Node.js', slug: 'nodejs' },
                    { name: 'Golang', slug: 'golang' },
                    { name: 'Python', slug: 'python' },
                    { name: 'Database', slug: 'database' },
                    { name: 'Docker', slug: 'docker' },
                    { name: 'Frontend', slug: 'frontend-essentials' }
                  ].map(topic => (
                    <Link
                      key={topic.slug}
                      href={`/category/${topic.slug}`}
                      className="mobile-topic-chip"
                    >
                      {topic.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mobile-drawer-footer">
                <div className="mobile-drawer-badge">
                  <Sparkles size={14} color="var(--accent)" />
                  <span>{t.common.questionsCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
