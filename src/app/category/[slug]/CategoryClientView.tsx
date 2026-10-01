'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Layers, Search, ArrowLeft, ChevronDown } from 'lucide-react';
import SidebarNav from '../../../components/SidebarNav';
import QuestionListView from '../../../components/QuestionListView';
import Pagination from '../../../components/Pagination';
import TechLogo from '../../../components/TechLogo';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { CategoryMeta, CategorySummary, RoleMeta, QuestionMeta } from '../../../lib/types';

interface CategoryClientViewProps {
  slug: string;
  isAll: boolean;
  category: CategoryMeta | null;
  currentLevel: string;
  currentSubcat: string;
  currentSearch: string;
  currentPage: number;
  total: number;
  totalPages: number;
  questions: QuestionMeta[];
  allCategories: (CategoryMeta | CategorySummary)[];
  allRoles?: RoleMeta[];
}

export default function CategoryClientView({
  slug,
  isAll,
  category,
  currentLevel,
  currentSubcat,
  currentSearch,
  currentPage,
  total,
  totalPages,
  questions,
  allCategories,
  allRoles = []
}: CategoryClientViewProps) {
  const { t } = useLanguage();
  const [isSubcatsExpanded, setIsSubcatsExpanded] = useState(false);

  // Create filter query helper
  const makeFilterUrl = (overrides: Record<string, string>) => {
    const p = new URLSearchParams();
    if (currentLevel !== 'all') p.set('level', currentLevel);
    if (currentSubcat !== 'all') p.set('sub', currentSubcat);
    if (currentSearch) p.set('q', currentSearch);

    for (const [k, v] of Object.entries(overrides)) {
      if (v === 'all' || !v) p.delete(k);
      else p.set(k, v);
    }
    p.delete('page'); // Reset page on filter change
    const qs = p.toString();
    return `/category/${slug}${qs ? `?${qs}` : ''}`;
  };

  const displayName = isAll
    ? t.category.allTitle
    : `${t.category.categoryTitlePrefix} ${category?.name || slug}`;

  const displayDesc = isAll
    ? t.category.allDesc
    : `${t.category.categoryTitlePrefix} ${category?.name || slug} ${t.category.catDescSuffix}`;

  const levelOptions = [
    { id: 'all', label: t.common.all },
    { id: 'beginner', label: t.common.beginner },
    { id: 'intermediate', label: t.common.intermediate },
    { id: 'advanced', label: t.common.advanced }
  ];

  return (
    <div className="cat-page-container">
      {/* Top Breadcrumb & Title */}
      <div className="cat-page-header">
        <div className="cat-breadcrumb">
          <Link href="/" className="cat-breadcrumb-link">
            <ArrowLeft size={15} /> {t.category.homeBreadcrumb}
          </Link>
          <span className="cat-breadcrumb-sep">/</span>
          <span className="cat-breadcrumb-curr">
            {isAll ? t.common.all : (category?.name || slug)}
          </span>
        </div>

        <div className="cat-title-row">
          <div className="cat-title-left">
            <div className="cat-title-heading-wrap">
              {!isAll && <TechLogo slug={slug} name={displayName} size={30} />}
              <h1 className="cat-page-h1">{displayName}</h1>
              <span className="cat-count-badge">
                {total} {t.category.questionsBadge}
              </span>
            </div>

            <p className="cat-desc-text">
              {displayDesc}
            </p>
          </div>

          <Link
            href={`/category/${slug}/flashcards`}
            className="cat-flashcard-link"
          >
            <Layers size={18} color="var(--accent)" />
            <span>{t.category.flashcardsBtn} {isAll ? '' : category?.name}</span>
          </Link>
        </div>
      </div>

      {/* Main Layout: Responsive Two-Column on Desktop, Single-Column on Mobile */}
      <div className="cat-layout">
        {/* Sidebar Navigation */}
        <SidebarNav
          currentSlug={slug}
          categories={allCategories}
          roles={allRoles}
        />

        {/* Main Content Area */}
        <div className="cat-main-content">
          {/* Controls: Level & Subcategories filter */}
          <div className="cat-filter-card">
            {/* Level selector & Search bar */}
            <div className="cat-filter-top">
              <div className="cat-level-row">
                <span className="cat-level-label">{t.category.levelLabel}</span>
                <div className="cat-level-pills">
                  {levelOptions.map(lvl => (
                    <Link
                      key={lvl.id}
                      href={makeFilterUrl({ level: lvl.id })}
                      className={`cat-level-pill ${currentLevel === lvl.id ? 'active' : ''}`}
                    >
                      {lvl.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* In-page search */}
              <form
                method="GET"
                action={`/category/${slug}`}
                className="cat-search-form"
              >
                {currentLevel !== 'all' && <input type="hidden" name="level" value={currentLevel} />}
                {currentSubcat !== 'all' && <input type="hidden" name="sub" value={currentSubcat} />}
                <Search
                  size={14}
                  className="cat-search-icon"
                />
                <input
                  type="text"
                  name="q"
                  defaultValue={currentSearch}
                  placeholder={t.category.searchPlaceholder}
                  className="cat-search-input"
                />
              </form>
            </div>

            {/* Subcategories (if available for category) */}
            {category && category.subcategories && category.subcategories.length > 0 && (
              <div className="cat-subcat-wrap">
                <div className="cat-subcat-header">
                  <span className="cat-subcat-label">
                    {t.category.subcatLabel}
                    <span className="cat-subcat-count">({category.subcategories.length})</span>
                  </span>
                  {category.subcategories.length > 6 && (
                    <button
                      type="button"
                      onClick={() => setIsSubcatsExpanded(!isSubcatsExpanded)}
                      className="cat-subcat-toggle-btn"
                      aria-label={isSubcatsExpanded ? t.common.collapse : t.common.seeAll}
                    >
                      <span>{isSubcatsExpanded ? t.common.collapse : `${t.common.seeAll} (${category.subcategories.length})`}</span>
                      <ChevronDown
                        size={13}
                        style={{
                          transform: isSubcatsExpanded ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s ease'
                        }}
                      />
                    </button>
                  )}
                </div>
                <div className={`cat-subcat-pills ${isSubcatsExpanded ? 'expanded' : ''}`}>
                  <Link
                    href={makeFilterUrl({ sub: 'all' })}
                    className={`cat-subcat-pill ${currentSubcat === 'all' ? 'active' : ''}`}
                  >
                    {t.common.all} ({category.count})
                  </Link>
                  {category.subcategories.map((sub: any) => (
                    <Link
                      key={sub.name}
                      href={makeFilterUrl({ sub: sub.name })}
                      className={`cat-subcat-pill ${currentSubcat === sub.name ? 'active' : ''}`}
                    >
                      {sub.name} ({sub.count})
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Question List or Empty State */}
          {questions.length === 0 ? (
            <div className="cat-empty-state">
              <BookOpen size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--ink)', fontSize: '1.15rem', marginBottom: '6px' }}>
                {t.category.emptyTitle}
              </h3>
              <p style={{ fontSize: '0.9rem' }}>
                {t.category.emptyDesc}
              </p>
              <Link
                href={`/category/${slug}`}
                className="cat-clear-filter-btn"
              >
                {t.category.clearFilter}
              </Link>
            </div>
          ) : (
            <>
              {/* Question Rows */}
              <QuestionListView
                questions={questions}
                currentPage={currentPage}
                limit={20}
              />

              {/* Pagination */}
              <div style={{ marginTop: '20px' }}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  baseUrl={`/category/${slug}`}
                  searchParams={{
                    level: currentLevel !== 'all' ? currentLevel : undefined,
                    sub: currentSubcat !== 'all' ? currentSubcat : undefined,
                    q: currentSearch || undefined
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
