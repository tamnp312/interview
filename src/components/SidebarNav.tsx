'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Layers, Sparkles, ChevronDown, Filter } from 'lucide-react';
import TechLogo from './TechLogo';
import { CategoryMeta, CategorySummary, RoleMeta } from '../lib/types';
import { useLanguage } from '../i18n/LanguageContext';

interface SidebarNavProps {
  currentSlug: string;
  categories: (CategoryMeta | CategorySummary)[];
  roles?: RoleMeta[];
}

interface NavItem {
  name: string;
  slug: string;
  count: number;
  isNew?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export default function SidebarNav({ currentSlug, categories, roles }: SidebarNavProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('');
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  // Map category counts dynamically from actual categories data
  const catCountMap = useMemo(() => {
    const map = new Map<string, number>();
    categories.forEach(c => {
      map.set(c.slug.toLowerCase(), c.count);
      map.set(c.name.toLowerCase(), c.count);
    });
    return map;
  }, [categories]);

  // Construct structured groups matching the reference layout
  const navGroups: NavGroup[] = useMemo(() => {
    return [
      {
        title: t.category.groupRoles,
        items: [
          { name: 'Frontend', slug: 'frontend-essentials', count: 107 },
          { name: 'Backend', slug: 'backend-essentials', count: 104 },
          { name: 'Mobile', slug: 'mobile-essentials', count: 74, isNew: true },
          { name: 'DevOps & Cloud', slug: 'devops-essentials', count: 76 },
          { name: 'AI', slug: 'ai-engineering', count: 134 },
          { name: 'Database', slug: 'database-essentials', count: 161 },
          { name: 'Business Analyst (BA)', slug: 'business-analyst', count: 57, isNew: true },
          { name: 'Data Engineer', slug: 'data-engineering', count: 62, isNew: true },
          { name: 'Product & Project Manager', slug: 'product-management', count: 63, isNew: true }
        ]
      },
      {
        title: t.category.groupFrontend,
        items: [
          { name: 'HTML', slug: 'html', count: catCountMap.get('html') || 78 },
          { name: 'CSS', slug: 'css', count: catCountMap.get('css') || 119 },
          { name: 'JavaScript', slug: 'javascript', count: catCountMap.get('javascript') || 119 },
          { name: 'TypeScript', slug: 'typescript', count: catCountMap.get('typescript') || 81 },
          { name: 'React', slug: 'react', count: catCountMap.get('react') || 61 },
          { name: 'Next.js', slug: 'nextjs', count: catCountMap.get('nextjs') || 55 },
          { name: 'Vue.js', slug: 'vuejs', count: catCountMap.get('vuejs') || 52 },
          { name: 'Angular', slug: 'angular', count: catCountMap.get('angular') || 38 },
          { name: 'State Management', slug: 'state-management', count: catCountMap.get('state-management') || 41 },
          { name: 'Micro-Frontend', slug: 'micro-frontend', count: catCountMap.get('micro-frontend') || 28 },
          { name: 'Testing', slug: 'testing', count: catCountMap.get('testing') || 30 },
          { name: 'Build Tools', slug: 'build-tools', count: catCountMap.get('build-tools') || 29 },
          { name: 'Performance', slug: 'performance', count: catCountMap.get('performance') || 32 },
          { name: 'SEO', slug: 'seo', count: catCountMap.get('seo') || 25 }
        ]
      },
      {
        title: t.category.groupBackend,
        items: [
          { name: 'Node.js', slug: 'nodejs', count: catCountMap.get('nodejs') || 51 },
          { name: 'NestJS', slug: 'nestjs', count: catCountMap.get('nestjs') || 49 },
          { name: 'Java', slug: 'java', count: catCountMap.get('java') || 89 },
          { name: 'Spring Boot', slug: 'spring-spring-boot', count: catCountMap.get('spring-spring-boot') || 97 },
          { name: 'Golang', slug: 'golang', count: catCountMap.get('golang') || 63 },
          { name: 'Python', slug: 'python', count: catCountMap.get('python') || 74 },
          { name: 'Django', slug: 'django', count: catCountMap.get('django') || 52 },
          { name: 'FastAPI', slug: 'fastapi', count: catCountMap.get('fastapi') || 52 },
          { name: 'C# / .NET', slug: 'csharp', count: catCountMap.get('csharp') || 62 },
          { name: 'PHP / Laravel', slug: 'laravel', count: catCountMap.get('laravel') || 59 },
          { name: 'Backend & API', slug: 'backend-api', count: catCountMap.get('backend-api') || 45 },
          { name: 'GraphQL', slug: 'graphql', count: catCountMap.get('graphql') || 37 },
          { name: 'Kafka', slug: 'kafka', count: catCountMap.get('kafka') || 42 },
          { name: 'RabbitMQ', slug: 'rabbitmq', count: catCountMap.get('rabbitmq') || 34 }
        ]
      },
      {
        title: t.category.groupDatabase,
        items: [
          { name: 'SQL', slug: 'nosql', count: catCountMap.get('nosql') || 53 },
          { name: 'PostgreSQL', slug: 'postgresql', count: catCountMap.get('postgresql') || 49 },
          { name: 'MongoDB', slug: 'mongodb', count: catCountMap.get('mongodb') || 46 },
          { name: 'Redis', slug: 'redis', count: catCountMap.get('redis') || 47 },
          { name: 'Elasticsearch', slug: 'elasticsearch', count: catCountMap.get('elasticsearch') || 38 },
          { name: 'Database Design', slug: 'database-design', count: catCountMap.get('database-design') || 40 },
          { name: 'Database', slug: 'database', count: catCountMap.get('database') || 45 }
        ]
      },
      {
        title: t.category.groupDevops,
        items: [
          { name: 'Docker & Kubernetes', slug: 'docker', count: catCountMap.get('docker') || 53 },
          { name: 'CI/CD', slug: 'cicd', count: catCountMap.get('cicd') || 45 },
          { name: 'AWS & Cloud', slug: 'aws-cloud', count: catCountMap.get('aws-cloud') || 56 },
          { name: 'Terraform & IaC', slug: 'terraform-iac', count: catCountMap.get('terraform-iac') || 36 },
          { name: 'Git', slug: 'git', count: catCountMap.get('git') || 38 },
          { name: 'Security', slug: 'security', count: catCountMap.get('security') || 49 },
          { name: 'Network', slug: 'network', count: catCountMap.get('network') || 36 }
        ]
      },
      {
        title: t.category.groupSystemDesign,
        items: [
          { name: 'System Design', slug: 'system-design', count: catCountMap.get('system-design') || 63 },
          { name: 'Design Patterns', slug: 'design-patterns', count: catCountMap.get('design-patterns') || 47 },
          { name: 'Code Quality', slug: 'code-quality', count: catCountMap.get('code-quality') || 42 }
        ]
      },
      {
        title: t.category.groupMobile,
        items: [
          { name: 'Flutter', slug: 'flutter', count: catCountMap.get('flutter') || 54 },
          { name: 'React Native', slug: 'react-native', count: catCountMap.get('react-native') || 51 },
          { name: 'Android (Kotlin)', slug: 'android', count: catCountMap.get('android') || 47 }
        ]
      },
      {
        title: t.category.groupAi,
        items: [
          { name: 'AI Engineering', slug: 'ai-engineering', count: catCountMap.get('ai-engineering') || 55 },
          { name: 'Machine Learning', slug: 'machine-learning', count: catCountMap.get('machine-learning') || 48 },
          { name: 'Data Engineering', slug: 'data-engineering', count: catCountMap.get('data-engineering') || 45 },
          { name: 'QA / Testing', slug: 'testing', count: catCountMap.get('testing') || 52 },
          { name: 'DSA', slug: 'dsa', count: catCountMap.get('dsa') || 40 }
        ]
      },
      {
        title: t.category.groupGeneral,
        items: [
          { name: 'Career & Behavioral', slug: 'career-non-tech', count: catCountMap.get('career-non-tech') || 68 },
          { name: 'Coding Interview', slug: 'coding-interview', count: catCountMap.get('coding-interview') || 45 },
          { name: 'Operating System', slug: 'operating-system', count: catCountMap.get('operating-system') || 40 }
        ]
      }
    ];
  }, [catCountMap, t]);

  // Current active item lookup
  const currentItem = useMemo(() => {
    if (currentSlug === 'all') {
      return { name: t.category.allTitle, slug: 'all', count: 4452 };
    }
    for (const g of navGroups) {
      const match = g.items.find(i => i.slug === currentSlug);
      if (match) return match;
    }
    const cat = categories.find(c => c.slug === currentSlug);
    if (cat) return { name: cat.name, slug: cat.slug, count: cat.count };
    return { name: currentSlug, slug: currentSlug, count: 0 };
  }, [navGroups, categories, currentSlug, t]);

  // Quick horizontal swipe chips for popular categories
  const quickPillTopics = useMemo(() => [
    { name: t.common.all, slug: 'all' },
    { name: 'Frontend', slug: 'frontend-essentials' },
    { name: 'Backend', slug: 'backend-essentials' },
    { name: 'HTML', slug: 'html' },
    { name: 'CSS', slug: 'css' },
    { name: 'JavaScript', slug: 'javascript' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'React', slug: 'react' },
    { name: 'Next.js', slug: 'nextjs' },
    { name: 'Node.js', slug: 'nodejs' },
    { name: 'Golang', slug: 'golang' },
    { name: 'Python', slug: 'python' },
    { name: 'Database', slug: 'database-essentials' },
    { name: 'Docker', slug: 'docker' },
    { name: 'DevOps', slug: 'devops-essentials' },
    { name: 'Mobile', slug: 'mobile-essentials' },
    { name: 'AI', slug: 'ai-engineering' }
  ], [t]);

  // Filter items in modal or sidebar
  const filteredGroups = useMemo(() => {
    if (!filter.trim()) return navGroups;
    const q = filter.toLowerCase().trim();
    return navGroups
      .map(group => ({
        ...group,
        items: group.items.filter(item => item.name.toLowerCase().includes(q))
      }))
      .filter(group => group.items.length > 0);
  }, [navGroups, filter]);

  // Lock scroll when mobile modal is open
  useEffect(() => {
    if (isMobileModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileModalOpen]);

  // Common Nav list renderer
  const renderNavList = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {filteredGroups.map(group => (
        <div key={group.title}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: 'var(--ink-muted)',
              textTransform: 'uppercase',
              padding: '0 10px 8px',
              borderBottom: '1px solid var(--border)',
              marginBottom: '6px'
            }}
          >
            {group.title}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {group.items.map(item => {
              const isActive = currentSlug === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={`/category/${item.slug}`}
                  prefetch={true}
                  onClick={() => setIsMobileModalOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: isActive ? 'var(--accent-subtle)' : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--ink)',
                    borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.86rem',
                    transition: 'all 0.12s ease',
                    textDecoration: 'none'
                  }}
                  className="sidebar-item-link"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                    <TechLogo name={item.name} slug={item.slug} size={18} />
                    <span
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '0.85rem'
                      }}
                    >
                      {item.name}
                    </span>
                    {item.isNew && (
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: 800,
                          padding: '1px 5px',
                          borderRadius: '3px',
                          background: 'rgba(56, 189, 248, 0.2)',
                          color: '#38bdf8',
                          lineHeight: '1.2',
                          letterSpacing: '0.04em'
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: isActive ? 'var(--accent)' : 'var(--ink-muted)',
                      padding: '1px 6px',
                      borderRadius: '999px',
                      background: isActive ? 'transparent' : 'var(--surface-raised)',
                      minWidth: '28px',
                      textAlign: 'right'
                    }}
                  >
                    {item.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {filteredGroups.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px 10px', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
          {t.category.sidebarNoTopics}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* 1. Desktop Sticky Sidebar (Visible >= 1024px) */}
      <aside className="custom-sidebar-nav sidebar-desktop-only">
        {/* Search box */}
        <div style={{ position: 'relative', margin: '0 4px' }}>
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--ink-muted)',
              pointerEvents: 'none'
            }}
          />
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder={t.category.sidebarSearchPlaceholder}
            style={{
              width: '100%',
              padding: '7px 28px 7px 30px',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              background: 'var(--surface-raised)',
              color: 'var(--ink)',
              outline: 'none'
            }}
          />
          {filter && (
            <button
              onClick={() => setFilter('')}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--ink-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Desktop Navigation Groups */}
        {renderNavList()}
      </aside>

      {/* 2. Mobile Category Selector & Horizontal Swipe Pills (Visible < 1024px) */}
      <div className="sidebar-mobile-only">
        {/* Active Category Bar & Switcher Button */}
        <div className="mobile-cat-banner">
          <div className="mobile-cat-banner-left">
            <TechLogo name={currentItem.name} slug={currentItem.slug} size={22} />
            <div className="mobile-cat-banner-title">
              <strong>{currentItem.name}</strong>
              {currentItem.count > 0 && <span>({currentItem.count} {t.category.questionsBadge})</span>}
            </div>
          </div>
          <button
            onClick={() => setIsMobileModalOpen(true)}
            className="mobile-cat-switch-btn"
          >
            <Filter size={14} />
            <span>{t.category.sidebarMobileBtn}</span>
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Horizontal Scrollable Quick Category Pills */}
        <div className="mobile-quick-pills-wrap">
          <div className="mobile-quick-pills">
            {quickPillTopics.map(tItem => {
              const isSelected = currentSlug === tItem.slug;
              return (
                <Link
                  key={tItem.slug}
                  href={`/category/${tItem.slug}`}
                  prefetch={true}
                  className={`mobile-pill-item ${isSelected ? 'active' : ''}`}
                >
                  <TechLogo name={tItem.name} slug={tItem.slug} size={15} />
                  <span>{tItem.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Mobile Category Bottom Sheet Modal */}
      {isMobileModalOpen && (
        <div
          className="mobile-cat-modal-overlay"
          onClick={() => setIsMobileModalOpen(false)}
        >
          <div
            className="mobile-cat-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="mobile-cat-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={18} color="var(--accent)" />
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
                  {t.category.sidebarTitle}
                </h3>
              </div>
              <button
                onClick={() => setIsMobileModalOpen(false)}
                className="btn-icon"
                style={{ width: '32px', height: '32px' }}
                aria-label={t.common.close}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Search Box */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ position: 'relative' }}>
                <Search
                  size={15}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--ink-muted)',
                    pointerEvents: 'none'
                  }}
                />
                <input
                  type="text"
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  placeholder={t.category.sidebarModalSearchPlaceholder}
                  style={{
                    width: '100%',
                    padding: '8px 32px 8px 36px',
                    fontSize: '0.88rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    background: 'var(--surface-raised)',
                    color: 'var(--ink)',
                    outline: 'none'
                  }}
                  autoFocus
                />
                {filter && (
                  <button
                    onClick={() => setFilter('')}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--ink-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Modal List */}
            <div className="mobile-cat-modal-list">
              {renderNavList()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
