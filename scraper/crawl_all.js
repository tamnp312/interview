const fs = require('fs');
const path = require('path');
const { scrapeQuestion } = require('./scraper_module');

const dataDir = path.join(__dirname, '../data');
const urlsFile = path.join(dataDir, 'question_urls.json');
const jsonlFile = path.join(dataDir, 'questions.jsonl');
const failedFile = path.join(dataDir, 'failed_urls.json');

async function main() {
  if (!fs.existsSync(urlsFile)) {
    console.error('File data/question_urls.json does not exist. Run parse_sitemap.js first.');
    process.exit(1);
  }

  const allUrls = JSON.parse(fs.readFileSync(urlsFile, 'utf8'));
  console.log(`Total URLs in target list: ${allUrls.length}`);

  // Parse arguments
  const args = process.argv.slice(2);
  let limit = Infinity;
  let concurrency = 8;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--limit' && args[i + 1]) {
      limit = parseInt(args[i + 1], 10);
    }
    if (args[i] === '--concurrency' && args[i + 1]) {
      concurrency = parseInt(args[i + 1], 10);
    }
  }

  // Load already completed URLs
  const completedUrls = new Set();
  if (fs.existsSync(jsonlFile)) {
    const lines = fs.readFileSync(jsonlFile, 'utf8').split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const parsed = JSON.parse(line);
        if (parsed.url) completedUrls.add(parsed.url);
        else if (parsed.slug) completedUrls.add(`https://luyenphongvan.online/q/${parsed.slug}`);
      } catch (e) {}
    }
  }
  console.log(`Already completed: ${completedUrls.size} questions.`);

  // Filter pending URLs
  let pendingUrls = allUrls.filter(u => !completedUrls.has(u));
  if (limit !== Infinity) {
    pendingUrls = pendingUrls.slice(0, limit);
  }
  console.log(`To download: ${pendingUrls.length} questions (Concurrency: ${concurrency}).`);

  if (pendingUrls.length === 0) {
    console.log('All questions are already downloaded!');
    return;
  }

  const appendStream = fs.createWriteStream(jsonlFile, { flags: 'a', encoding: 'utf8' });
  const failedUrls = [];
  let completedCount = 0;
  let errorCount = 0;
  const startTime = Date.now();
  let currentIndex = 0;

  async function worker(workerId) {
    while (true) {
      const idx = currentIndex++;
      if (idx >= pendingUrls.length) break;

      const url = pendingUrls[idx];
      try {
        const q = await scrapeQuestion(url);
        appendStream.write(JSON.stringify(q) + '\n');
        completedCount++;
      } catch (err) {
        errorCount++;
        failedUrls.push({ url, error: err.message });
        console.error(`\n[ERROR Worker ${workerId}] Failed on ${url}: ${err.message}`);
      }

      if ((completedCount + errorCount) % 25 === 0 || (completedCount + errorCount) === pendingUrls.length) {
        const elapsedSec = (Date.now() - startTime) / 1000;
        const totalDone = completedCount + errorCount;
        const speed = (totalDone / elapsedSec).toFixed(1);
        const remaining = pendingUrls.length - totalDone;
        const etaMinutes = (remaining / (totalDone / elapsedSec) / 60).toFixed(1);
        const percent = ((completedUrls.size + totalDone) / allUrls.length * 100).toFixed(1);

        process.stdout.write(
          `\r[Progress: ${completedUrls.size + totalDone}/${allUrls.length} (${percent}%)] ` +
          `Done: ${completedCount} | Err: ${errorCount} | Speed: ${speed} q/s | ETA: ${etaMinutes}m   `
        );
      }
    }
  }

  console.log('Starting download workers...');
  const workers = [];
  for (let i = 0; i < concurrency; i++) {
    workers.push(worker(i + 1));
  }

  await Promise.all(workers);
  appendStream.end();

  console.log('\n--- Finished Crawl Run ---');
  console.log(`Success: ${completedCount}`);
  console.log(`Failed: ${errorCount}`);

  if (failedUrls.length > 0) {
    fs.writeFileSync(failedFile, JSON.stringify(failedUrls, null, 2));
    console.log(`Saved ${failedUrls.length} failed URLs to ${failedFile}`);
  }
}

main().catch(console.error);
