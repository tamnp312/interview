const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/questions.jsonl');
const backupPath = path.join(__dirname, '../data/questions.jsonl.bak');

console.log('Reading questions.jsonl...');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n').filter(Boolean);

// Create backup first
if (!fs.existsSync(backupPath)) {
  fs.writeFileSync(backupPath, content);
  console.log('Created backup at questions.jsonl.bak');
}

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
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  const q = JSON.parse(lines[i]);
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
    cleanedCount++;
  }

  newLines.push(JSON.stringify(q));
}

fs.writeFileSync(filePath, newLines.join('\n') + '\n');
console.log(`Successfully cleaned ${cleanedCount} questions!`);

// Verify
let remainingCorrupted = 0;
for (const line of newLines) {
  const q = JSON.parse(line);
  if (
    rscRegex.test(q.answer_vi || '') ||
    rscRegex.test(q.answer_en || '')
  ) {
    remainingCorrupted++;
  }
}
console.log(`Remaining corrupted in answer_vi/answer_en: ${remainingCorrupted}`);
