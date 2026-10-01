const fs = require('fs');
const path = require('path');
const { scrapeQuestion } = require('./scraper_module');

async function fixFailed() {
  const failedFile = path.join(__dirname, '../data/failed_urls.json');
  const jsonlFile = path.join(__dirname, '../data/questions.jsonl');
  if (!fs.existsSync(failedFile)) return;

  const failed = JSON.parse(fs.readFileSync(failedFile, 'utf8'));
  console.log(`Retrying ${failed.length} failed URLs with fallback...`);

  const recovered = [];
  const stillFailed = [];

  for (const { url } of failed) {
    try {
      // First try standard HTML fetch
      const res = await fetch(url);
      const html = await res.text();

      // Extract JSON-LD QAPage
      let qText = '';
      let ansText = '';
      const jsonLd = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
      for (const m of jsonLd) {
        try {
          const parsed = JSON.parse(m[1]);
          if (parsed['@type'] === 'QAPage' && parsed.mainEntity) {
            qText = parsed.mainEntity.text || parsed.mainEntity.name;
            if (parsed.mainEntity.acceptedAnswer) {
              ansText = parsed.mainEntity.acceptedAnswer.text;
            }
          }
        } catch(e) {}
      }

      // Title & slug
      const slug = url.replace(/^https?:\/\/[^\/]+\/q\//, '');
      const idMatch = slug.match(/^(\d+)/);
      const id = idMatch ? parseInt(idMatch[1], 10) : 0;

      // Extract category from breadcrumbs in HTML
      const catMatch = html.match(/href="\/c\/([^"]+)"[^>]*>([^<]+)<\/a>/);
      const category = catMatch ? catMatch[2] : 'Khác';

      if (qText && ansText) {
        const qObj = {
          id,
          slug,
          url,
          category,
          subcategory: '',
          level: 'intermediate',
          question_vi: qText,
          question_en: qText,
          answer_vi: ansText,
          answer_en: '',
          references: [],
          related: []
        };
        recovered.push(qObj);
        fs.appendFileSync(jsonlFile, JSON.stringify(qObj) + '\n');
        console.log(`[RECOVERED] ${id} - ${qText.slice(0, 40)}`);
      } else {
        stillFailed.push(url);
      }
    } catch (e) {
      console.error(`Still failed ${url}:`, e.message);
      stillFailed.push(url);
    }
  }

  console.log(`Recovered: ${recovered.length}/${failed.length}`);
  if (stillFailed.length === 0) {
    fs.unlinkSync(failedFile);
    console.log('Removed failed_urls.json - 100% SUCCESS!');
  }
}

fixFailed().catch(console.error);
