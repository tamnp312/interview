export interface Question {
  id: number;
  slug: string;
  url: string;
  category: string;
  subcategory: string;
  level: 'beginner' | 'intermediate' | 'advanced' | string;
  question_vi: string;
  question_en: string;
  answer_vi: string;
  answer_en: string;
  answer_html_vi?: string;
  answer_html_en?: string;
  references: Array<{ label: string; url: string }>;
  related: Array<{ url: string; title: string }>;
}

export interface QuestionMeta {
  id: number;
  slug: string;
  category: string;
  catSlug: string;
  subcategory: string;
  level: string;
  question_vi: string;
  question_en: string;
}

export interface RoleMeta {
  name: string;
  slug: string;
  icon: string;
  badge: string | null;
  count: number;
  questionIds: number[];
}

export interface CategoryMeta {
  id: string;
  name: string;
  slug: string;
  count: number;
  subcategories: Array<{ name: string; count: number }>;
  iconName?: string;
  description?: string;
}

export interface CategorySummary {
  name: string;
  slug: string;
  count: number;
}

export interface FilterOptions {
  category?: string;
  subcategory?: string;
  level?: string;
  search?: string;
  page?: number;
  limit?: number;
}

