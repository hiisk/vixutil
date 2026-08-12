/**
 * 얇은 페이지를 찾는다 — 애드센스 "가치 없는 콘텐츠" 진단용.
 *
 * ── 왜 이 도구가 있나 (2026-08-12) ─────────────────────────
 * 애드센스가 "가치 없는 콘텐츠"로 거절했다. 이 사이트는 주소가 19만 개인데
 * 그 대부분이 템플릿에서 나온 낱장이다. 어느 섹션의 낱장이 실제로 얇은지
 * **재 보지 않고는 알 수 없다** — 추측으로 고치면 엉뚱한 데를 손본다.
 *
 * 낱장은 force-dynamic이라 빌드 산출물에 HTML이 없다. 그래서 서버를 띄워
 * 실제로 받아 본다. 사이트맵에서 섹션마다 표본을 뽑아 **눈에 보이는 글자 수**를
 * 센다(스크립트·스타일·태그를 걷어낸 뒤).
 *
 * 쓰는 법:
 *   npm run build
 *   npx next start -p 4399 &
 *   node scripts/thin-pages.mjs 4399 [표본수]
 *
 * 읽는 법: 낱장의 본문 글자가 400자 아래면 얇다고 본다. 그 선은 애드센스가
 * 공표한 값이 아니라 이 도구가 정한 어림이다 — 섹션끼리 견주는 데 쓴다.
 */

const port = process.argv[2] ?? '4399';
const perSection = Number(process.argv[3] ?? 3);
const BASE = `http://localhost:${port}`;
const THIN = 400;

/** 태그·스크립트·스타일을 걷어내고 눈에 보이는 글자만 남긴다 */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 한국어 사이트맵에서 주소를 읽는다 — 구운 것을 그대로 쓴다 */
async function koUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>https:\/\/vixutil\.com\/?([^<]*)<\/loc>/g)].map(m => m[1]).filter(Boolean);
}

/**
 * 주소를 섹션으로 묶는다.
 *
 * 첫 칸이 섹션이고, 칸이 둘 이상이면 낱장이다. /calculator/salary처럼 두 칸이
 * 곧 낱장인 것과 /game/poker/xx처럼 세 칸인 것이 섞여 있으므로, 칸 수가 아니라
 * "첫 칸"으로 묶고 낱장 여부만 따로 본다.
 */
function group(urls) {
  const bySection = new Map();
  for (const u of urls) {
    const parts = u.split('/');
    const sec = parts[0];
    if (!bySection.has(sec)) bySection.set(sec, { hub: null, leaves: [] });
    const g = bySection.get(sec);
    if (parts.length === 1) g.hub = u;
    else g.leaves.push(u);
  }
  return bySection;
}

const urls = await koUrls();
const groups = group(urls);
console.log(`한국어 주소 ${urls.length.toLocaleString()}개 · 섹션 ${groups.size}개\n`);

const rows = [];
for (const [sec, g] of groups) {
  // 낱장은 고르게 뽑는다 — 앞에서만 뽑으면 한 갈래만 보게 된다
  const step = Math.max(1, Math.floor(g.leaves.length / perSection));
  const sample = [];
  for (let i = 0; i < g.leaves.length && sample.length < perSection; i += step) sample.push(g.leaves[i]);

  const lens = [];
  for (const u of sample) {
    try {
      const res = await fetch(`${BASE}/${u}`);
      if (!res.ok) { lens.push(-1); continue; }
      lens.push(visibleText(await res.text()).length);
    } catch { lens.push(-1); }
  }
  if (!lens.length) continue;
  const ok = lens.filter(n => n > 0);
  if (!ok.length) continue;
  rows.push({
    sec,
    leaves: g.leaves.length,
    min: Math.min(...ok),
    avg: Math.round(ok.reduce((a, b) => a + b, 0) / ok.length),
    sample: sample[0],
  });
}

rows.sort((a, b) => a.avg - b.avg);
console.log('섹션        낱장수   본문 최소   본문 평균   표본');
console.log('─'.repeat(78));
for (const r of rows) {
  const mark = r.avg < THIN ? ' ← 얇다' : '';
  console.log(
    `${r.sec.padEnd(12)}${String(r.leaves).padStart(6)}${String(r.min).padStart(11)}${String(r.avg).padStart(12)}   /${r.sample}${mark}`,
  );
}

const thin = rows.filter(r => r.avg < THIN);
const thinPages = thin.reduce((n, r) => n + r.leaves, 0);
console.log('\n' + '─'.repeat(78));
console.log(`${THIN}자 아래인 섹션 ${thin.length}개 · 그 낱장 합계 ${thinPages.toLocaleString()}장`);
if (thin.length) console.log('  ' + thin.map(r => r.sec).join(' '));

/*
 * ── 형제끼리 얼마나 같은가 (2026-08-12에 더함) ──────────────────
 * 위 표로 알게 된 것: **얇은 페이지는 없다.** 가장 짧은 것도 1,100자를 넘는다.
 * 그러면 애드센스가 "가치 없는 콘텐츠"라고 한 것은 글이 짧아서가 아니다.
 *
 * 남는 것은 **원본성**이다. 같은 틀에서 숫자만 바꿔 찍으면 글자 수는 넉넉해도
 * 형제 페이지끼리 문장이 거의 같다. 그것을 재려면 두 형제의 낱말을 맞대야 한다.
 *
 * 재는 법: 같은 섹션의 두 낱장에서 공백으로 끊은 낱말을 뽑아 자카드 비율을 낸다.
 * 0.95를 넘으면 "숫자만 다른 페이지"에 가깝다고 본다 — 그 선은 이 도구가 정한
 * 어림이고, 섹션끼리 견주는 데 쓴다.
 */
const dupRows = [];
for (const [sec, g] of groups) {
  if (g.leaves.length < 2) continue;
  /*
   * 짝을 셋 잡아 평균을 낸다.
   *
   * 처음엔 첫 칸과 가운데 칸 하나만 봤는데, 그 둘이 **구조가 같은 질문**이면
   * 섹션 전체가 그런 것처럼 나온다. heredity에서 실제로 그랬다 — 고쳐서 구조가
   * 다른 칸끼리는 81%로 내려갔는데도 그 한 짝만 96%였다.
   */
  const n = g.leaves.length;
  const pairs = [
    [g.leaves[0], g.leaves[Math.floor(n / 2)]],
    [g.leaves[Math.floor(n / 4)], g.leaves[Math.floor((n * 3) / 4)]],
    [g.leaves[Math.floor(n / 3)], g.leaves[n - 1]],
  ].filter(([x, y]) => x && y && x !== y);
  try {
    const scores = [];
    for (const [x, y] of pairs) {
      const [tx, ty] = await Promise.all([
        fetch(`${BASE}/${x}`).then(r => r.text()),
        fetch(`${BASE}/${y}`).then(r => r.text()),
      ]);
      const wx = new Set(visibleText(tx).split(' ').filter(Boolean));
      const wy = new Set(visibleText(ty).split(' ').filter(Boolean));
      let both = 0;
      for (const w of wx) if (wy.has(w)) both++;
      const union = wx.size + wy.size - both;
      scores.push(union ? both / union : 1);
    }
    if (!scores.length) continue;
    const avg = scores.reduce((p, q) => p + q, 0) / scores.length;
    dupRows.push({
      sec, leaves: n, same: avg,
      a: pairs[0][0], b: pairs[0][1],
      worst: Math.max(...scores), best: Math.min(...scores),
    });
  } catch { /* 못 받은 것은 건너뛴다 */ }
}
dupRows.sort((x, y) => y.same - x.same);
console.log('\n형제끼리 같은 낱말 비율 (높을수록 숫자만 다른 페이지)');
console.log('섹션        낱장수   평균     최악     최선   표본 한 짝');
console.log('─'.repeat(78));
for (const r of dupRows.slice(0, 20)) {
  console.log(
    `${r.sec.padEnd(12)}${String(r.leaves).padStart(6)}${(r.same * 100).toFixed(1).padStart(8)}%` +
    `${(r.worst * 100).toFixed(1).padStart(9)}%${(r.best * 100).toFixed(1).padStart(9)}%   /${r.a} · /${r.b}`,
  );
}
const risky = dupRows.filter(r => r.same >= 0.95);
console.log(`\n95% 이상 겹치는 섹션 ${risky.length}개 · 그 낱장 합계 ${risky.reduce((n, r) => n + r.leaves, 0).toLocaleString()}장`);
if (risky.length) console.log('  ' + risky.map(r => `${r.sec}(${(r.same * 100).toFixed(0)}%)`).join(' '));
