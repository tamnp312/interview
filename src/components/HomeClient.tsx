'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Layers, CheckSquare, ArrowRight, Zap, Code, Shield } from 'lucide-react';
import type { CategoryMeta, Question, QuestionMeta } from '../lib/types';
import QuestionCard from './QuestionCard';
import HomeCategoryGrid from './HomeCategoryGrid';
import { useLanguage } from '../i18n/LanguageContext';

interface HomeClientProps {
  categories: CategoryMeta[];
  recentQuestions: (Question | QuestionMeta)[];
  total: number;
}

export default function HomeClient({ categories, recentQuestions, total }: HomeClientProps) {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-pill">
            <span className="hero-pill-dot"></span>
            <span>{t.hero.pill}</span>
          </div>

          <h1 className="hero-title">
            {t.hero.title} <br />
            <span className="hero-gradient">{t.hero.titleHighlight}</span>
          </h1>

          <p className="hero-desc">
            {t.hero.desc}
          </p>

          <div className="hero-search-wrap">
            <Link
              href="/category/all"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px 28px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--accent-solid)',
                color: '#fff',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 700,
                boxShadow: 'var(--shadow-glow), var(--shadow-md)',
                transition: 'all 0.2s',
                textDecoration: 'none'
              }}
            >
              <BookOpen size={20} />
              <span>{t.hero.startBtn}</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-num">{total || '4.452'}+</span>
              <span className="stat-label">{t.hero.statQuestions}</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{categories.length || '50'}+</span>
              <span className="stat-label">{t.hero.statTopics}</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{t.hero.statBilingual}</span>
              <span className="stat-label">{t.hero.statBilingualSub}</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{t.hero.statFree}</span>
              <span className="stat-label">{t.common.appName}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container" style={{ marginBottom: '60px' }}>
        <div className="section-head">
          <div>
            <h2 className="section-title">{t.home.featuredTopics}</h2>
            <p className="section-desc">{t.home.featuredDesc}</p>
          </div>
          <Link
            href="/category/all"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--accent)',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            <span>{t.home.viewAll} ({categories.length})</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <HomeCategoryGrid categories={categories} />
      </section>

      {/* Mode Switcher Banner: Flashcards & Quiz */}
      <section className="container" style={{ marginBottom: '60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {/* Flashcards banner */}
          <div style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 15%, var(--surface)), var(--surface))',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius)',
                background: 'var(--accent-subtle)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px'
              }}>
                <Layers size={22} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                {t.home.flashcardsTitle}
              </h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {t.home.flashcardsDesc}
              </p>
            </div>
            <Link
              href="/category/all/flashcards"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 600,
                color: 'var(--accent)'
              }}
            >
              {t.home.flashcardsBtn} <ArrowRight size={16} />
            </Link>
          </div>

          {/* Quiz banner */}
          <div style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, #10b981 15%, var(--surface)), var(--surface))',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius)',
                background: '#10b98120',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px'
              }}>
                <CheckSquare size={22} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                {t.home.quizTitle}
              </h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {t.home.quizDesc}
              </p>
            </div>
            <Link
              href="/quiz"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 600,
                color: '#10b981'
              }}
            >
              {t.home.quizBtn} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Questions Preview */}
      <section className="container">
        <div className="section-head">
          <div>
            <h2 className="section-title">{t.home.popularQuestions}</h2>
            <p className="section-desc">{t.home.popularDesc}</p>
          </div>
          <Link
            href="/category/all"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--accent)',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            <span>{t.home.browseAll}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="q-list">
          {recentQuestions.map(q => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      </section>
    </div>
  );
}
