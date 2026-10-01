const fs = require('fs');
const path = require('path');

const questionsDir = path.join(__dirname, '../data/questions');
if (!fs.existsSync(questionsDir)) {
  console.log('No questions directory found!');
  process.exit(1);
}

const files = fs.readdirSync(questionsDir).filter(f => f.endsWith('.json'));
console.log(`Found ${files.length} individual question files in data/questions/`);

const rscRegex = /(?:[0-9a-f]{1,6}:T[0-9a-f]{1,6},|[0-9a-f]{1,6}:\[\[?["$]|\[\{)/i;

function clean(str) {
  if (!str || typeof str !== 'string') return str;
  const match = str.match(rscRegex);
  if (match && match.index !== undefined) {
    return str.slice(0, match.index).trim();
  }
  return str.trim();
}

let cleanedCount = 0;

for (const file of files) {
  const p = path.join(questionsDir, file);
  try {
    const raw = fs.readFileSync(p, 'utf8');
    const q = JSON.parse(raw);

    const origVi = q.answer_vi;
    const origEn = q.answer_en;
    const origHtmlVi = q.answer_html_vi;
    const origHtmlEn = q.answer_html_en;

    q.answer_vi = clean(q.answer_vi);
    q.answer_en = clean(q.answer_en);
    q.answer_html_vi = clean(q.answer_html_vi);
    q.answer_html_en = clean(q.answer_html_en);

    if (
      q.answer_vi !== origVi ||
      q.answer_en !== origEn ||
      q.answer_html_vi !== origHtmlVi ||
      q.answer_html_en !== origHtmlEn
    ) {
      fs.writeFileSync(p, JSON.stringify(q));
      cleanedCount++;
    }
  } catch (e) {
    console.error(`Error processing ${file}:`, e.message);
  }
}

console.log(`Successfully cleaned ${cleanedCount} individual question files in data/questions/!`);
