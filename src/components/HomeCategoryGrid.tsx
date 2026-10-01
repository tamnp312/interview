'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Code,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Database,
  Shield,
  Terminal,
  Cpu,
  Layers,
  Globe,
  Server,
  Cloud,
  Layout,
  Smartphone
} from 'lucide-react';
import { CategoryMeta } from '../lib/types';
import TechLogo from './TechLogo';
import { useLanguage } from '../i18n/LanguageContext';


interface HomeCategoryGridProps {
  categories: CategoryMeta[];
}

// Helper to choose relevant icon based on category name
function getCategoryIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes('database') || n.includes('sql') || n.includes('mongo') || n.includes('redis')) return <Database size={22} />;
  if (n.includes('security')) return <Shield size={22} />;
  if (n.includes('docker') || n.includes('kubernetes') || n.includes('cloud') || n.includes('aws') || n.includes('terraform')) return <Cloud size={22} />;
  if (n.includes('mobile') || n.includes('flutter') || n.includes('android') || n.includes('react native')) return <Smartphone size={22} />;
  if (n.includes('system') || n.includes('network') || n.includes('backend') || n.includes('node') || n.includes('spring') || n.includes('kafka') || n.includes('rabbitmq')) return <Server size={22} />;
  if (n.includes('ai') || n.includes('machine learning') || n.includes('deep learning')) return <Cpu size={22} />;
  if (n.includes('react') || n.includes('vue') || n.includes('angular') || n.includes('next') || n.includes('css') || n.includes('html') || n.includes('frontend')) return <Layout size={22} />;
  if (n.includes('git') || n.includes('linux') || n.includes('os')) return <Terminal size={22} />;
  return <Code size={22} />;
}

export default function HomeCategoryGrid({ categories }: HomeCategoryGridProps) {
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);
  const { t } = useLanguage();

  const filtered = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase().trim();
    return categories.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q) ||
      c.subcategories.some((sub: any) => sub.name.toLowerCase().includes(q))
    );
  }, [categories, search]);

  const INITIAL_COUNT = 12;
  const isSearching = search.trim().length > 0;
  const displayed = isSearching || showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const remainingCount = Math.max(0, categories.length - INITIAL_COUNT);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Category search & controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          maxWidth: '380px',
          width: '100%'
        }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              color: 'var(--ink-muted)',
              pointerEvents: 'none'
            }}
          />
          <input
            id="input-home-category-search"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.home.searchTopicsPlaceholder}
            style={{
              width: '100%',
              padding: '9px 34px 9px 36px',
              fontSize: '0.88rem',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: 'var(--surface-raised)',
              color: 'var(--ink)',
              outline: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s'
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-subtle)';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: '10px',
                background: 'transparent',
                border: 'none',
                color: 'var(--ink-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              title={t.common.delete}
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)' }}>
          {t.home.showing} <strong style={{ color: 'var(--ink)' }}>{displayed.length}</strong> / {categories.length} {t.home.topics}
        </div>
      </div>

      {/* Grid */}
      <div className="cat-grid">
        {displayed.map(cat => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            prefetch={true}
            className="cat-card"
          >
            <div className="cat-icon">
              <TechLogo slug={cat.slug} name={cat.name} size={26} />
            </div>
            <div className="cat-info">
              <h3 className="cat-name">{cat.name}</h3>
              <div className="cat-meta">
                <span className="cat-badge">{cat.count} {t.category.questionsBadge}</span>
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <span>• {cat.subcategories.length} {t.category.subcatLabel.replace(':', '')}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {displayed.length === 0 && isSearching && (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          color: 'var(--ink-muted)'
        }}>
          {t.category.emptyTitle} &quot;{search}&quot;.
        </div>
      )}

      {/* Toggle View More */}
      {!isSearching && remainingCount > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button
            id="btn-home-toggle-categories"
            onClick={() => setShowAll(!showAll)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: 'var(--radius)',
              background: 'var(--surface-raised)',
              border: '1px solid var(--border-strong)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.92rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {showAll ? (
              <>
                <ChevronUp size={18} />
                <span>{t.question.collapse}</span>
              </>
            ) : (
              <>
                <ChevronDown size={18} />
                <span>{t.home.viewAll} ({categories.length} {t.home.topics})</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
