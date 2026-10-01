const fs = require('fs');

async function testCategory() {
  const res = await fetch('https://luyenphongvan.online/c/react');
  const html = await res.text();
  
  // Extract Title and Meta Description
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/);
  console.log('Title:', titleMatch ? titleMatch[1] : '');
  console.log('Desc:', descMatch ? descMatch[1] : '');

  // Extract JSON-LD CollectionPage
  const jsonLdMatches = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  for (const m of jsonLdMatches) {
    try {
      const obj = JSON.parse(m[1]);
      if (obj['@type'] === 'CollectionPage') {
        console.log('CollectionPage name:', obj.name);
        console.log('CollectionPage numberOfItems:', obj.mainEntity?.numberOfItems);
      }
    } catch(e) {}
  }
}

testCategory().catch(console.error);
