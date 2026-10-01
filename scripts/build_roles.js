const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function buildRolesData() {
  const jsonlPath = path.join(__dirname, '../data/questions.jsonl');
  const fileStream = fs.createReadStream(jsonlPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const roleDefs = [
    {
      name: 'Frontend',
      slug: 'frontend-essentials',
      icon: 'Monitor',
      badge: null,
      targetCount: 107,
      tagKeyword: 'fe-essential',
      urlKeyword: '/c/frontend-essentials',
      relatedCats: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js']
    },
    {
      name: 'Backend',
      slug: 'backend-essentials',
      icon: 'Server',
      badge: null,
      targetCount: 104,
      tagKeyword: 'be-essential',
      urlKeyword: '/c/backend-essentials',
      relatedCats: ['Node.js', 'Java', 'Python', 'Golang', 'Spring Boot', 'Database', 'Backend & API']
    },
    {
      name: 'Mobile',
      slug: 'mobile-essentials',
      icon: 'Smartphone',
      badge: 'NEW',
      targetCount: 74,
      tagKeyword: 'mobile-essential',
      urlKeyword: '/c/mobile-essentials',
      relatedCats: ['Flutter', 'React Native', 'Android']
    },
    {
      name: 'DevOps & Cloud',
      slug: 'devops-essentials',
      icon: 'Cloud',
      badge: null,
      targetCount: 76,
      tagKeyword: 'devops-essential',
      urlKeyword: '/c/devops-essentials',
      relatedCats: ['Docker & Kubernetes', 'CI/CD', 'AWS & Cloud', 'Terraform & IaC', 'Git']
    },
    {
      name: 'AI',
      slug: 'ai-engineering',
      icon: 'Cpu',
      badge: null,
      targetCount: 134,
      tagKeyword: 'ai-engineering',
      urlKeyword: '/c/ai-engineering',
      relatedCats: ['AI Engineering', 'Machine Learning', 'Deep Learning']
    },
    {
      name: 'Database',
      slug: 'database-essentials',
      icon: 'Database',
      badge: null,
      targetCount: 161,
      tagKeyword: 'db-essential',
      urlKeyword: '/c/database-essentials',
      relatedCats: ['Database', 'PostgreSQL', 'MongoDB', 'Redis', 'Database Design']
    },
    {
      name: 'Business Analyst (BA)',
      slug: 'business-analyst',
      icon: 'FileText',
      badge: 'NEW',
      targetCount: 57,
      tagKeyword: 'business-analyst',
      urlKeyword: '/c/business-analyst',
      relatedCats: ['Business Analyst']
    },
    {
      name: 'Data Engineer',
      slug: 'data-engineering',
      icon: 'TrendingUp',
      badge: 'NEW',
      targetCount: 62,
      tagKeyword: 'data-engineering',
      urlKeyword: '/c/data-engineering',
      relatedCats: ['Data Engineering', 'Database', 'Kafka', 'Elasticsearch']
    },
    {
      name: 'Product & Project Manager',
      slug: 'product-management',
      icon: 'BarChart3',
      badge: 'NEW',
      targetCount: 63,
      tagKeyword: 'product-management',
      urlKeyword: '/c/product-management',
      relatedCats: ['Product Management', 'Career & Non-Tech']
    }
  ];

  const allQuestions = [];
  for await (const line of rl) {
    if (!line.trim()) continue;
    allQuestions.push(JSON.parse(line));
  }

  console.log(`Loaded ${allQuestions.length} questions from jsonl.`);

  const rolesResult = roleDefs.map(def => {
    const selectedIds = new Set();

    // 1. Direct match by html/tag
    allQuestions.forEach(q => {
      const html = q.answer_html_vi || '';
      if (html.includes(def.urlKeyword) || html.includes(def.tagKeyword) || q.category === def.name) {
        selectedIds.add(q.id);
      }
    });

    // 2. If below targetCount, fill with top questions from relatedCats
    if (selectedIds.size < def.targetCount) {
      for (const catName of def.relatedCats) {
        const catQs = allQuestions.filter(q => q.category === catName && !selectedIds.has(q.id));
        for (const q of catQs) {
          selectedIds.add(q.id);
          if (selectedIds.size >= def.targetCount) break;
        }
        if (selectedIds.size >= def.targetCount) break;
      }
    }

    const idList = Array.from(selectedIds);
    console.log(`${def.name} (${def.slug}): collected ${idList.length} questions (target: ${def.targetCount})`);

    return {
      name: def.name,
      slug: def.slug,
      icon: def.icon,
      badge: def.badge,
      count: idList.length,
      questionIds: idList
    };
  });

  const outPath = path.join(__dirname, '../data/roles.json');
  fs.writeFileSync(outPath, JSON.stringify(rolesResult, null, 2));
  console.log(`Saved roles.json to ${outPath}!`);
}

buildRolesData().catch(console.error);
