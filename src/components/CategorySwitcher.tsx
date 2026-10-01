'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronUp, X } from 'lucide-react';
import { CategoryMeta } from '../lib/types';
import { useLanguage } from '../i18n/LanguageContext';

interface CategorySwitcherProps {
  categories: CategoryMeta[];
  currentSlug: string;
  totalQuestions: number;
}

export default function CategorySwitcher({
  categories,
  currentSlug,
  totalQuestions
}: CategorySwitcherProps) {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  
  const isAll = currentSlug === 'all';
  
  // Find index of current category in the list
  const activeIndex = useMemo(() => {
    return categories.findIndex(c => c.slug === currentSlug);
  }, [categories, currentSlug]);

  // Default expand if active category is beyond top 16
  const [isExpanded, setIsExpanded] = useState(() => activeIndex >= 16);

  // Filtered categories based on search
  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase().trim();
    return categories.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.slug.toLowerCase().includes(q)
    );
  }, [categories, search]);

  const INITIAL_COUNT = 16;
  const isSearching = search.trim().length > 0;
  
  // Categories to display: all if searching or expanded, otherwise top 16
  const displayedCategories = useMemo(() => {
    if (isSearching || isExpanded) {
      return filteredCategories;
    }
    return filteredCategories.slice(0, INITIAL_COUNT);
  }, [filteredCategories, isSearching, isExpanded]);

  const remainingCount = Math.max(0, categories.length - INITIAL_COUNT);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--ink-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {t.category.switcherTitle} ({categories.length})
        </h4>
        {isSearching && (
          <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>
            {filteredCategories.length} {t.category.switcherResults}
          </span>
        )}
      </div>

      {/* Quick Search Input */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Search
          size={14}
          style={{
            position: 'absolute',
            left: '10px',
            color: 'var(--ink-muted)',
            pointerEvents: 'none'
          }}
        />
        <input
          id="input-category-search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t.category.switcherSearchPlaceholder}
          style={{
            width: '100%',
            padding: '7px 30px 7px 32px',
            fontSize: '0.82rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: 'var(--surface-raised)',
            color: 'var(--ink)',
            outline: 'none',
            transition: 'border-color 0.15s, box-shadow 0.15s'
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-subtle)';
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
              right: '8px',
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
            <X size={14} />
          </button>
        )}
      </div>

      {/* Pills Container */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          maxHeight: isExpanded || isSearching ? '340px' : 'auto',
          overflowY: isExpanded || isSearching ? 'auto' : 'visible',
          paddingRight: isExpanded || isSearching ? '4px' : '0'
        }}
      >
        {/* 'All' button (only show when not searching or matches 'all' / 'tất cả') */}
        {(!isSearching || 'tất cả all'.includes(search.toLowerCase())) && (
          <Link
            href="/category/all"
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontWeight: isAll ? 700 : 500,
              background: isAll ? 'var(--accent-subtle)' : 'var(--surface-raised)',
              color: isAll ? 'var(--accent)' : 'var(--ink-secondary)',
              border: `1px solid ${isAll ? 'var(--accent)' : 'var(--border)'}`,
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
              textDecoration: 'none'
            }}
          >
            {t.common.all} ({totalQuestions.toLocaleString()})
          </Link>
        )}

        {displayedCategories.map(c => {
          const isActive = currentSlug === c.slug;
          return (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: isActive ? 700 : 500,
                background: isActive ? 'var(--accent-subtle)' : 'var(--surface-raised)',
                color: isActive ? 'var(--accent)' : 'var(--ink-secondary)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none'
              }}
            >
              <span>{c.name}</span>
              <span style={{
                fontSize: '0.72rem',
                color: isActive ? 'var(--accent)' : 'var(--ink-muted)',
                opacity: 0.9
              }}>
                ({c.count})
              </span>
            </Link>
          );
        })}

        {displayedCategories.length === 0 && isSearching && (
          <div style={{
            fontSize: '0.82rem',
            color: 'var(--ink-muted)',
            padding: '12px 6px',
            width: '100%',
            textAlign: 'center'
          }}>
            {t.category.switcherNoMatch} &quot;{search}&quot;
          </div>
        )}
      </div>

      {/* Expand / Collapse Button (when not searching) */}
      {!isSearching && remainingCount > 0 && (
        <button
          id="btn-toggle-categories"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px dashed var(--border-strong)',
            background: 'transparent',
            color: 'var(--accent)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s',
            marginTop: '4px'
          }}
        >
          {isExpanded ? (
            <>
              <ChevronUp size={14} />
              <span>{t.category.switcherCollapse}</span>
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              <span>{t.category.switcherExpand.replace('{count}', remainingCount.toString())}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
