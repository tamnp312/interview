import fs from 'fs';
import path from 'path';
import { Question, CategoryMeta, CategorySummary, FilterOptions, QuestionMeta, RoleMeta } from './types';

export type { QuestionMeta, RoleMeta, CategorySummary };

interface DataCache {
  meta?: QuestionMeta[];
  categories?: CategoryMeta[];
  categorySummaries?: CategorySummary[];
  slugToId?: Record<string, number>;
  roles?: RoleMeta[];
  categoryIndex?: Map<string, QuestionMeta[]>;
  roleIndex?: Map<string, QuestionMeta[]>;
  idToMeta?: Map<number, QuestionMeta>;
  questionDetails?: Map<number, Question>;
}

// Store cache on globalThis so it survives hot-reloads and module re-evaluations in dev mode
const globalData = globalThis as unknown as {
  __luyenpv_cache?: DataCache;
};

if (!globalData.__luyenpv_cache) {
  globalData.__luyenpv_cache = {
    questionDetails: new Map<number, Question>()
  };
}

const cache = globalData.__luyenpv_cache;
const dataDir = path.join(process.cwd(), 'data');

export function loadMeta(): QuestionMeta[] {
  if (cache.meta) return cache.meta;
  const metaPath = path.join(dataDir, 'questions_meta.json');
  if (!fs.existsSync(metaPath)) return [];
  try {
    const content = fs.readFileSync(metaPath, 'utf8');
    const meta: QuestionMeta[] = JSON.parse(content);
    cache.meta = meta;

    // Build indexes for instant lookups
    const catIndex = new Map<string, QuestionMeta[]>();
    const idMap = new Map<number, QuestionMeta>();

    for (let i = 0; i < meta.length; i++) {
      const q = meta[i];
      idMap.set(q.id, q);

      if (q.catSlug) {
        const catKey = q.catSlug.toLowerCase();
        let list = catIndex.get(catKey);
        if (!list) {
          list = [];
          catIndex.set(catKey, list);
        }
        list.push(q);
      }
      if (q.category) {
        const catKey = q.category.toLowerCase();
        let list = catIndex.get(catKey);
        if (!list) {
          list = [];
          catIndex.set(catKey, list);
        }
        // Avoid duplicate pushing if catSlug === category
        if (q.catSlug?.toLowerCase() !== catKey) {
          list.push(q);
        }
      }
    }

    cache.categoryIndex = catIndex;
    cache.idToMeta = idMap;
    return cache.meta;
  } catch (e) {
    console.error('Error loading questions_meta.json:', e);
    return [];
  }
}

export function getQuestionMetaById(id: number): QuestionMeta | null {
  if (!cache.idToMeta) {
    loadMeta();
  }
  return cache.idToMeta?.get(id) || null;
}

export function loadSlugToId(): Record<string, number> {
  if (cache.slugToId) return cache.slugToId;
  const mapPath = path.join(dataDir, 'slug_to_id.json');
  if (!fs.existsSync(mapPath)) return {};
  try {
    const content = fs.readFileSync(mapPath, 'utf8');
    cache.slugToId = JSON.parse(content);
    return cache.slugToId || {};
  } catch (e) {
    return {};
  }
}

export function getAllRoles(): RoleMeta[] {
  if (cache.roles) return cache.roles;
  const rolesPath = path.join(dataDir, 'roles.json');
  if (!fs.existsSync(rolesPath)) return [];
  try {
    const content = fs.readFileSync(rolesPath, 'utf8');
    const roles: RoleMeta[] = JSON.parse(content);
    cache.roles = roles;

    // Index roles for fast question lookup
    const allMeta = loadMeta();
    const idMap = cache.idToMeta || new Map();
    const roleIdx = new Map<string, QuestionMeta[]>();

    for (const r of roles) {
      if (r.questionIds && Array.isArray(r.questionIds)) {
        const roleQuestions: QuestionMeta[] = [];
        for (const id of r.questionIds) {
          const q = idMap.get(id);
          if (q) roleQuestions.push(q);
        }
        roleIdx.set(r.slug.toLowerCase(), roleQuestions);
      }
    }
    cache.roleIndex = roleIdx;
    return cache.roles || [];
  } catch (e) {
    return [];
  }
}

export function getAllCategories(): CategoryMeta[] {
  if (cache.categories) return cache.categories;
  const catPath = path.join(dataDir, 'categories.json');
  if (!fs.existsSync(catPath)) return [];
  try {
    const content = fs.readFileSync(catPath, 'utf8');
    cache.categories = JSON.parse(content);
    return cache.categories || [];
  } catch (e) {
    return [];
  }
}

// Lightweight summary for SidebarNav to avoid sending 113KB over RSC
export function getCategorySummaries(): CategorySummary[] {
  if (cache.categorySummaries) return cache.categorySummaries;
  const cats = getAllCategories();
  cache.categorySummaries = cats.map(c => ({
    name: c.name,
    slug: c.slug,
    count: c.count
  }));
  return cache.categorySummaries;
}

export function getCategoryBySlug(slug: string): CategoryMeta | null {
  const slugLower = slug.toLowerCase();

  // Check roles first
  const roles = getAllRoles();
  const role = roles.find(r => r.slug === slug || r.slug.toLowerCase() === slugLower);
  if (role) {
    return {
      id: role.slug,
      name: role.name,
      slug: role.slug,
      count: role.count,
      subcategories: []
    };
  }

  const categories = getAllCategories();
  return categories.find(c => c.slug === slug || c.slug.toLowerCase() === slugLower) || null;
}

const rscRegex = /(?:[0-9a-f]{1,6}:T[0-9a-f]{1,6},|[0-9a-f]{1,6}:\[\[?["$]|\[\{)/i;

function cleanRsc(str: string): string {
  if (!str || typeof str !== 'string') return str;
  const match = str.match(rscRegex);
  if (match && match.index !== undefined) {
    return str.slice(0, match.index).trim();
  }
  return str.trim();
}

export function getQuestionById(id: number): Question | null {
  // Check memory cache first (instant 0ms response)
  if (cache.questionDetails?.has(id)) {
    return cache.questionDetails.get(id) || null;
  }

  const filePath = path.join(dataDir, 'questions', `${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    const q: Question = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (q) {
      if (q.answer_vi) q.answer_vi = cleanRsc(q.answer_vi);
      if (q.answer_en) q.answer_en = cleanRsc(q.answer_en);
      if (q.answer_html_vi) q.answer_html_vi = cleanRsc(q.answer_html_vi);
      if (q.answer_html_en) q.answer_html_en = cleanRsc(q.answer_html_en);

      // Cache up to 1000 questions in memory
      if (cache.questionDetails) {
        if (cache.questionDetails.size > 1000) {
          // Clear first 200 items
          const keysToDelete = Array.from(cache.questionDetails.keys()).slice(0, 200);
          for (const k of keysToDelete) cache.questionDetails.delete(k);
        }
        cache.questionDetails.set(id, q);
      }
    }
    return q;
  } catch (e) {
    return null;
  }
}

export function getQuestionBySlug(slug: string): Question | null {
  const slugMap = loadSlugToId();
  const id = slugMap[slug];
  if (id) {
    return getQuestionById(id);
  }

  // Fallback: extract id prefix if slug is like `321-title`
  const match = slug.match(/^(\d+)/);
  if (match) {
    return getQuestionById(parseInt(match[1], 10));
  }
  return null;
}

export function getQuestions(options: FilterOptions = {}): {
  questions: QuestionMeta[];
  total: number;
  page: number;
  totalPages: number;
} {
  const all = loadMeta();
  const {
    category,
    subcategory,
    level,
    search,
    page = 1,
    limit = 20
  } = options;

  let filtered = all;

  // Optimized O(1) indexed lookup when filtering by category or role
  if (category && category !== 'all') {
    const catLower = category.toLowerCase();
    
    // Check if it's a role
    if (!cache.roleIndex) {
      getAllRoles(); // Populates cache.roleIndex
    }
    const roleQuestions = cache.roleIndex?.get(catLower);

    if (roleQuestions) {
      filtered = roleQuestions;
    } else {
      // Check category index
      const catQuestions = cache.categoryIndex?.get(catLower);
      if (catQuestions) {
        filtered = catQuestions;
      } else {
        // Fallback filter
        filtered = filtered.filter(
          q => q.catSlug === category || q.category.toLowerCase() === catLower
        );
      }
    }
  }

  if (subcategory && subcategory !== 'all') {
    const subLower = subcategory.toLowerCase();
    filtered = filtered.filter(
      q => q.subcategory.toLowerCase() === subLower
    );
  }

  if (level && level !== 'all') {
    const lvlLower = level.toLowerCase();
    filtered = filtered.filter(
      q => q.level.toLowerCase() === lvlLower
    );
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      item =>
        item.question_vi.toLowerCase().includes(q) ||
        item.question_en.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.subcategory && item.subcategory.toLowerCase().includes(q))
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return {
    questions: paginated,
    total,
    page: currentPage,
    totalPages
  };
}

export function searchQuestions(query: string, limit: number = 8): QuestionMeta[] {
  if (!query || !query.trim()) return [];
  const all = loadMeta();
  const q = query.toLowerCase().trim();

  return all
    .filter(
      item =>
        item.question_vi.toLowerCase().includes(q) ||
        item.question_en.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.subcategory && item.subcategory.toLowerCase().includes(q))
    )
    .slice(0, limit);
}
