/**
 * IndexNow — 빙에 "이 주소들이 새로 생겼다/바뀌었다"를 알린다.
 *
 * 빙(과 Yandex 등)은 IndexNow 규약을 받는다. 사이트 루트에 키 파일을 두고
 * (public/<키>.txt) 바뀐 주소 목록을 POST하면, 크롤러가 다시 올 때까지
 * 기다리지 않고 그 주소들을 곧장 가져간다. 구글은 이 규약을 안 쓴다 —
 * 구글 쪽은 사이트맵과 시간이 답이다.
 *
 * 쓰는 법: 배포가 끝난 뒤에
 *   node scripts/indexnow.mjs                # 사이트맵 전체를 알린다
 *   node scripts/indexnow.mjs /gear /bpm     # 특정 접두어만 알린다
 *
 * 한 번에 1만 개까지 받으므로 묶어서 보낸다. 과금도 한도도 없는 규약이다.
 */
const KEY = 'b28a8586b8359f11cbab660f1c22e8d8';
const HOST = 'vixutil.com';

const prefixes = process.argv.slice(2);

async function urlsFromSitemaps() {
  const idx = await (await fetch(`https://${HOST}/sitemap-index.xml`)).text();
  const chunks = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const out = [];
  for (const c of chunks) {
    const xml = await (await fetch(c)).text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) out.push(m[1]);
  }
  return out;
}

const all = await urlsFromSitemaps();
const urls = prefixes.length
  ? all.filter(u => prefixes.some(p => new URL(u).pathname === p || new URL(u).pathname.startsWith(p.endsWith('/') ? p : p + '/')))
  : all;
console.log(`알릴 주소 ${urls.length}개 (전체 ${all.length}개)`);

for (let i = 0; i < urls.length; i += 10_000) {
  const batch = urls.slice(i, i + 10_000);
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, urlList: batch }),
  });
  console.log(`  ${i + 1}–${i + batch.length}: ${res.status} ${res.statusText}`);
  if (!res.ok) console.log('  ', await res.text());
}
