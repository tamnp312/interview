const fs = require('fs');
const path = require('path');

async function getSitemapUrls() {
  console.log('Fetching sitemap.xml...');
  const res = await fetch('https://luyenphongvan.online/sitemap.xml');
  const xml = await res.text();

  const urlMatches = [...xml.matchAll(/<loc>(https:\/\/luyenphongvan\.online\/[^<]+)<\/loc>/g)];
  console.log(`Total URLs found in sitemap: ${urlMatches.length}`);

  const questionUrls = [];
  const categoryUrls = [];
  const otherUrls = [];

  for (const m of urlMatches) {
    const u = m[1].trim();
    if (u.includes('/q/')) {
      questionUrls.push(u);
    } else if (u.includes('/c/')) {
      categoryUrls.push(u);
    } else {
      otherUrls.push(u);
    }
  }

  console.log(`Question URLs: ${questionUrls.length}`);
  console.log(`Category URLs: ${categoryUrls.length}`);
  console.log(`Other URLs: ${otherUrls.length}`);

  const outDir = path.join(__dirname, '../data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outDir, 'question_urls.json'), JSON.stringify(questionUrls, null, 2));
  fs.writeFileSync(path.join(outDir, 'category_urls.json'), JSON.stringify(categoryUrls, null, 2));
  fs.writeFileSync(path.join(outDir, 'other_urls.json'), JSON.stringify(otherUrls, null, 2));

  console.log('Saved URL lists to data/ directory!');
}

getSitemapUrls().catch(console.error);
