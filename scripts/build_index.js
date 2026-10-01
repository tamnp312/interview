const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Import categoryToSlug logic
function categoryToSlug(name) {
  const norm = name.toLowerCase().trim();
  const map = {
    'html': 'html',
    'css': 'css',
    'javascript': 'javascript',
    'typescript': 'typescript',
    'react': 'react',
    'next.js': 'nextjs',
    'nextjs': 'nextjs',
    'vue.js': 'vuejs',
    'vuejs': 'vuejs',
    'angular': 'angular',
    'node.js': 'nodejs',
    'nodejs': 'nodejs',
    'nestjs': 'nestjs',
    'python': 'python',
    'fastapi': 'fastapi',
    'django': 'django',
    'golang': 'golang',
    'go': 'golang',
    'java': 'java',
    'spring boot': 'spring-spring-boot',
    'spring & spring boot': 'spring-spring-boot',
    'c#': 'csharp',
    'c# / .net': 'csharp',
    '.net': 'csharp',
    'php': 'php',
    'laravel': 'laravel',
    'ruby': 'ruby',
    'ruby on rails': 'rails',
    'rails': 'rails',
    'c++': 'cpp',
    'react native': 'react-native',
    'flutter': 'flutter',
    'android & kotlin': 'android',
    'android': 'android',
    'kotlin': 'android',
    'sql': 'sql',
    'postgresql': 'postgresql',
    'mongodb': 'mongodb',
    'redis': 'redis',
    'elasticsearch': 'elasticsearch',
    'kafka': 'kafka',
    'rabbitmq': 'rabbitmq',
    'graphql': 'graphql',
    'docker & kubernetes': 'docker',
    'docker': 'docker',
    'kubernetes': 'kubernetes',
    'ci/cd': 'cicd',
    'aws & cloud': 'aws-cloud',
    'cloud computing': 'aws-cloud',
    'system design': 'system-design',
    'design patterns': 'design-patterns',
    'ai engineering': 'ai-engineering',
    'machine learning': 'machine-learning',
    'git': 'git',
    'security': 'security',
    'testing': 'testing',
    'qa & testing': 'qa-testing',
    'qa & kiểm thử': 'qa-testing',
    'business analyst': 'business-analyst',
    'product management': 'product-management',
    'linux & os': 'os',
    'hệ điều hành & os': 'os',
    'mạng máy tính & network': 'network-http',
    'network & http': 'network-http',
    'phỏng vấn & ứng xử': 'phong-van',
    'dsa': 'dsa',
    'thuật toán & ctdl': 'dsa',
    'iq & tư duy logic': 'iq-logic'
  };
  if (map[norm]) return map[norm];
  return norm.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

async function buildIndex() {
  const dataDir = path.join(__dirname, '../data');
  const jsonlFile = path.join(dataDir, 'questions.jsonl');
  const questionsDir = path.join(dataDir, 'questions');

  if (!fs.existsSync(questionsDir)) {
    fs.mkdirSync(questionsDir, { recursive: true });
  }

  console.log('Reading questions.jsonl and building index...');

  const fileStream = fs.createReadStream(jsonlFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const metadataList = [];
  const catMap = new Map();
  const slugToIdMap = {};
  let count = 0;

  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const q = JSON.parse(line);
      count++;

      // Save individual question file for fast O(1) detail lookup
      fs.writeFileSync(path.join(questionsDir, `${q.id}.json`), JSON.stringify(q));
      slugToIdMap[q.slug] = q.id;

      // Extract lightweight metadata for listing & search
      metadataList.push({
        id: q.id,
        slug: q.slug,
        category: q.category,
        catSlug: categoryToSlug(q.category),
        subcategory: q.subcategory,
        level: q.level,
        question_vi: q.question_vi,
        question_en: q.question_en
      });

      // Aggregate categories
      const catName = q.category || 'Khác';
      if (!catMap.has(catName)) {
        catMap.set(catName, {
          name: catName,
          slug: categoryToSlug(catName),
          subcats: new Map(),
          count: 0
        });
      }
      const c = catMap.get(catName);
      c.count++;
      if (q.subcategory) {
        c.subcats.set(q.subcategory, (c.subcats.get(q.subcategory) || 0) + 1);
      }
    } catch (e) {
      console.error('Error line:', e.message);
    }
  }

  // Sort metadata by id
  metadataList.sort((a, b) => a.id - b.id);

  // Format categories
  const categories = Array.from(catMap.values()).map(c => ({
    name: c.name,
    slug: c.slug,
    count: c.count,
    subcategories: Array.from(c.subcats.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  })).sort((a, b) => b.count - a.count);

  fs.writeFileSync(path.join(dataDir, 'questions_meta.json'), JSON.stringify(metadataList));
  fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2));
  fs.writeFileSync(path.join(dataDir, 'slug_to_id.json'), JSON.stringify(slugToIdMap));

  console.log(`Index built successfully! Processed ${count} questions.`);
  console.log(`Categories count: ${categories.length}`);
  console.log(`questions_meta.json size: ${(fs.statSync(path.join(dataDir, 'questions_meta.json')).size / 1024 / 1024).toFixed(2)} MB`);
}

buildIndex().catch(console.error);
