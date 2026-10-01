import React from 'react';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getCategorySummaries, getQuestions } from '../../../lib/data';
import CategoryClientView from './CategoryClientView';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const slug = resolvedParams.slug;
  const isAll = slug === 'all';
  const category = isAll ? null : getCategoryBySlug(slug);

  if (!isAll && !category) {
    notFound();
  }

  const currentLevel = resolvedSearchParams.level || 'all';
  const currentSubcat = resolvedSearchParams.sub || 'all';
  const currentSearch = resolvedSearchParams.q || '';
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10);

  const { questions, total, totalPages, page } = getQuestions({
    category: isAll ? undefined : slug,
    subcategory: currentSubcat !== 'all' ? currentSubcat : undefined,
    level: currentLevel !== 'all' ? currentLevel : undefined,
    search: currentSearch,
    page: currentPage,
    limit: 20
  });

  const categorySummaries = getCategorySummaries();

  return (
    <CategoryClientView
      slug={slug}
      isAll={isAll}
      category={category}
      currentLevel={currentLevel}
      currentSubcat={currentSubcat}
      currentSearch={currentSearch}
      currentPage={page}
      total={total}
      totalPages={totalPages}
      questions={questions}
      allCategories={categorySummaries}
    />
  );
}
