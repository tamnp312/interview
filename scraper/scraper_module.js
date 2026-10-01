const fs = require('fs');
const path = require('path');

function resolveAnswer(text, val) {
  if (!val) return '';
  if (!val.startsWith('$')) {
    return val;
  }

  const cleanId = val.slice(1);
  const regex = new RegExp(`(?:^|[^a-zA-Z0-9_-])${cleanId}:T([0-9a-fA-F]+),`);
  const match = text.match(regex);
  if (!match) return '';

  const hexLen = match[1];
  const byteLen = parseInt(hexLen, 16);
  const startIdx = match.index + match[0].length;
  
  const candidate = text.slice(startIdx);
  const nextChunkMatch = candidate.match(/[\n.][0-9a-fA-F]+:[A-Za-z0-9_$[\]]/);
  if (nextChunkMatch) {
    return candidate.slice(0, nextChunkMatch.index).trim();
  }
  return candidate.slice(0, byteLen).trim();
}

async function fetchWithRetry(url, maxRetries = 3) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const res = await fetch(url, {
        headers: {
          'RSC': '1',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'Accept': 'text/x-component, text/plain, */*'
        }
      });
      if (res.status === 429) {
        console.warn(`[Rate Limited] Waiting 5s for ${url}...`);
        await new Promise(r => setTimeout(r, 5000));
        attempt++;
        continue;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return await res.text();
    } catch (err) {
      attempt++;
      if (attempt >= maxRetries) throw err;
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
}

async function scrapeQuestion(url) {
  const text = await fetchWithRetry(url);

  const itemIdx = text.indexOf('"item":');
  if (itemIdx === -1) {
    throw new Error(`No "item": found in ${url}`);
  }

  const afterItem = text.slice(itemIdx + 7);
  let depth = 0;
  let itemStr = '';
  for (let i = 0; i < afterItem.length; i++) {
    if (afterItem[i] === '{') depth++;
    else if (afterItem[i] === '}') {
      depth--;
      if (depth === 0) {
        itemStr = afterItem.slice(0, i + 1);
        break;
      }
    }
  }

  const item = JSON.parse(itemStr);
  const answerVi = resolveAnswer(text, item.a);
  const answerEn = resolveAnswer(text, item.a_en);

  const htmlMatch = text.slice(itemIdx).match(/"answerHtml":\s*"([^"]+)"/);
  const htmlEnMatch = text.slice(itemIdx).match(/"answerHtmlEn":\s*"([^"]+)"/);
  const answerHtmlVi = htmlMatch ? resolveAnswer(text, htmlMatch[1]) : '';
  const answerHtmlEn = htmlEnMatch ? resolveAnswer(text, htmlEnMatch[1]) : '';

  const relatedQuestions = [];
  const relatedMatches = [...text.matchAll(/"className":"qd-side-related-item"[^}]*?"href":"(\/q\/[^"]+)"[^}]*?"children":"([^"]+)"/g)];
  for (const rm of relatedMatches) {
    relatedQuestions.push({ url: rm[1], title: rm[2] });
  }

  return {
    id: item.id,
    slug: url.replace(/^https?:\/\/[^\/]+\/q\//, ''),
    url: url,
    category: item.category || '',
    subcategory: item.subcategory || '',
    level: item.level || 'beginner',
    question_vi: item.q || '',
    question_en: item.q_en || '',
    answer_vi: answerVi,
    answer_en: answerEn,
    answer_html_vi: answerHtmlVi,
    answer_html_en: answerHtmlEn,
    references: item.references || [],
    related: relatedQuestions
  };
}

module.exports = {
  scrapeQuestion
};
