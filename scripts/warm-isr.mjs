/**
 * ISR 캐시를 미리 채운다 — **유료(Pro)인 동안 한 번 돌리는 스크립트다.**
 *
 * ── 왜 있나 (2026-08-13) ──────────────────────────────────────
 * 낱장이 ISR(revalidate=false)이라 **한 장은 처음 열릴 때 딱 한 번 캐시에 쓰인다.**
 * 그 뒤로는 크롤러가 다시 와도 304·0바이트고 쓰기도 없다. 즉 값은 「캐시가
 * 차가워진 뒤 크롤러가 훑는 첫 한 바퀴」에 몰려 있다.
 *
 * 실측한 한 바퀴(주소 203,039개, 2026-08-13):
 *
 *   ISR 쓰기      203,039       ← 무료 티어 월 20만의 100%. **여기만 선에 닿는다**
 *   Origin 전송   3.3GB         (한 장 gzip 16.3KB) — 10GB의 33%
 *   활성 CPU      1.3~2.7 CPU-hr (한 장 23.5ms 실측 × Vercel 보정) — 4시간의 33~67%
 *   함수 호출     203,039       — 100만의 20%
 *
 * 나머지는 다 여유가 있고 **쓰기 하나만 한 바퀴에 한도를 다 쓴다.** 그러니 그
 * 한 바퀴를 무료로 내려간 뒤에 맞으면 그 자리에서 30일 정지다. 그래서 **아직
 * Pro인 동안 여기서 미리 한 바퀴를 태워** 캐시를 채우고 내려간다. 내려간 뒤의
 * 크롤은 이미 채워진 캐시를 만나 304로 떨어진다.
 *
 * ── 왜 HEAD인가 ───────────────────────────────────────────────
 * HEAD도 페이지를 만들어 캐시에 넣는다(실측: HEAD → x-nextjs-cache MISS,
 * 이어진 GET이 HIT). 본문을 안 받으므로 **전송이 거의 0**이다 — 3.3GB를 안 쓰고
 * 캐시만 채운다. 쓰기와 CPU는 그대로 든다(그것이 목적이다).
 *
 * ── 쓰는 법 ───────────────────────────────────────────────────
 *   node scripts/warm-isr.mjs                # 사이트맵 전부
 *   node scripts/warm-isr.mjs --limit 500    # 먼저 조금만 (Usage 재 보기용)
 *   node scripts/warm-isr.mjs --concurrency 4
 *   node scripts/warm-isr.mjs /ko /calculator  # 접두어만
 *
 * **배포 직후에 돌린다.** 배포가 캐시를 비우는지가 아직 확인되지 않았으므로,
 * 배포 → 워밍 → Usage 확인 → (한도 안이면) 다운그레이드 순서로 간다. 순서를
 * 바꾸면 채워 둔 것이 헛일이 된다.
 *
 * 진행 상황은 .warm-isr-done.txt에 쌓이고, 다시 돌리면 거기 있는 주소는 건너뛴다
 * (203,039개를 한 번에 끝낼 필요가 없다).
 */
import { appendFileSync, existsSync, readFileSync } from 'node:fs';

/* 배포된 사이트를 채우는 것이 목적이지만, 손볼 때는 `next start`에 대고 돌려 본다 */
const HOST = process.env.WARM_HOST ?? 'https://vixutil.com';
const DONE_FILE = '.warm-isr-done.txt';

const args = process.argv.slice(2);
const numArg = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? Number(args[i + 1]) : fallback;
};
const LIMIT = numArg('--limit', Infinity);
const CONCURRENCY = numArg('--concurrency', 6);
const prefixes = args.filter(a => a.startsWith('/'));

async function urlsFromSitemaps() {
  const idx = await (await fetch(`${HOST}/sitemap-index.xml`)).text();
  const parts = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const out = [];
  for (const p of parts) {
    const xml = await (await fetch(p)).text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) out.push(m[1]);
  }
  return out;
}

const done = existsSync(DONE_FILE)
  ? new Set(readFileSync(DONE_FILE, 'utf8').split('\n').filter(Boolean))
  : new Set();

const all = await urlsFromSitemaps();
const queue = all
  .filter(u => !done.has(u))
  .filter(u => !prefixes.length || prefixes.some(p => new URL(u).pathname.startsWith(p)))
  .slice(0, LIMIT === Infinity ? undefined : LIMIT);

console.log(`사이트맵 ${all.length.toLocaleString()}개 · 이미 채운 것 ${done.size.toLocaleString()}개 · 이번에 ${queue.length.toLocaleString()}개`);
if (!queue.length) process.exit(0);

const started = Date.now();
let miss = 0, hit = 0, fail = 0, n = 0;

/**
 * 한 장을 채운다. 실패는 세고 넘어간다 — 203,039장을 도는 중에 한 장 때문에
 * 멈추면 안 된다. 실패한 것은 done에 안 적히므로 다시 돌리면 또 시도한다.
 */
async function warm(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'manual' });
    const state = res.headers.get('x-vercel-cache') ?? res.headers.get('x-nextjs-cache') ?? '';
    if (res.status >= 400) { fail++; return; }
    if (/HIT/i.test(state)) hit++; else miss++;
    appendFileSync(DONE_FILE, url + '\n');
  } catch {
    fail++;
  } finally {
    if (++n % 500 === 0) {
      const rate = n / ((Date.now() - started) / 1000);
      const left = Math.round((queue.length - n) / rate / 60);
      console.log(`  ${n.toLocaleString()}/${queue.length.toLocaleString()} · 새로 채움 ${miss.toLocaleString()} · 이미 있음 ${hit.toLocaleString()} · 실패 ${fail} · ${rate.toFixed(1)}장/초 · 남은 시간 ${left}분`);
    }
  }
}

/* 동시에 CONCURRENCY장씩 — 워커마다 큐에서 하나씩 집어 간다 */
let cursor = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (cursor < queue.length) await warm(queue[cursor++]);
}));

const mins = ((Date.now() - started) / 60000).toFixed(1);
console.log(`\n끝. 새로 채움 ${miss.toLocaleString()} · 이미 있음 ${hit.toLocaleString()} · 실패 ${fail} · ${mins}분`);
console.log('이제 Vercel Usage에서 ISR 쓰기가 얼마나 늘었는지 보라 — 그 수가 다운그레이드 판단의 근거다.');
