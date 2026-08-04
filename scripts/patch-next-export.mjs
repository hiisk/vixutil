/**
 * Next의 정적 내보내기 복사 단계를 동시성 제한이 있는 것으로 바꾼다.
 *
 * ── 왜 ────────────────────────────────────────────────────────────
 * next build가 "Generating static pages ✓"를 찍은 **직후**, Next는 렌더 결과를
 * out/으로 옮긴다. 그 코드가 이렇게 생겼다(next/dist/export/index.js).
 *
 *     await Promise.all(Object.keys(prerenderManifest.routes).map(async (route) => {
 *         ... mkdir · copyFile(html) · copyFile(.txt) ...
 *         await Promise.all(segmentPaths.map(... copyFile ...))   // 한 장에 아홉 개
 *     }))
 *
 * 라우트 수만큼 클로저를 한꺼번에 만들고, 그 안의 fs 호출이 전부 libuv 큐에
 * 쌓인다. 이 사이트는 라우트가 10만이고 한 장에 파일이 열 개꼴이라 백만 개가
 * 동시에 뜬다. Vercel 컨테이너에서 그 순간 exit 137(커널 OOM)로 죽었다 —
 * 생성이 끝난 뒤 아무 로그도 없이 21초 만에 죽는 자리가 정확히 여기다.
 *
 * 페이지를 줄이지 않고 고칠 수 있는 자리라서 여기를 고른다. 복사는 디스크가
 * 병목이라 동시에 예순넷을 넘겨도 빨라지지 않는다 — 메모리만 쓴다.
 *
 * ── 어떻게 ────────────────────────────────────────────────────────
 * `.map(async r => {…})`를 `.map(r => async () => {…})`로 바꿔 **함수 목록**을
 * 만들고, Promise.all 대신 정해진 수만큼만 돌리는 __runPool로 넘긴다. 괄호 수가
 * 그대로라 뒤쪽 코드는 한 글자도 안 건드린다.
 *
 * 두 번 돌려도 안전하고, Next가 그 자리를 고쳐 앵커가 안 맞으면 **멈춘다** —
 * 조용히 안 고치고 넘어가면 다음 빌드에서 같은 자리에서 다시 죽는다.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const FILE = require.resolve('next/dist/export/index.js');
/** 이미 고쳐졌는지는 **호출 자리**로 판단한다 — 헬퍼만 남아 있는 반쪽 상태를
 *  "다 됐다"로 착각하면, 앵커가 어긋난 채로 조용히 넘어간다. */
const MARK = '__runPool(Object.keys(prerenderManifest.routes)';

/** 동시에 복사할 라우트 수 — 환경변수로 조절할 수 있게 둔다 */
const LIMIT = process.env.NEXT_EXPORT_COPY_CONCURRENCY || '64';

const ANCHOR =
  'await Promise.all(Object.keys(prerenderManifest.routes).map(async (unnormalizedRoute)=>{';
const REPLACEMENT =
  'await __runPool(Object.keys(prerenderManifest.routes).map((unnormalizedRoute)=>async ()=>{';

const HELPER = `
// ── vixutil 패치: scripts/patch-next-export.mjs ──
// 라우트를 한꺼번에 열지 않고 정해진 수만큼만 돌린다. 자세한 이유는 그 파일에.
async function __runPool(tasks) {
    const limit = Math.max(1, Number(process.env.NEXT_EXPORT_COPY_CONCURRENCY) || ${LIMIT});
    let next = 0;
    const runners = Array.from({ length: Math.min(limit, tasks.length) }, async () => {
        while (next < tasks.length) await tasks[next++]();
    });
    await Promise.all(runners);
}
`;

const src = readFileSync(FILE, 'utf8');

if (src.includes(MARK)) {
  console.log('next export 패치: 이미 되어 있다');
  process.exit(0);
}

if (!src.includes(ANCHOR)) {
  console.error(
    'next export 패치를 넣을 자리를 못 찾았다.\n' +
      `  파일: ${FILE}\n` +
      '  Next가 그 부분을 고쳤을 수 있다. scripts/patch-next-export.mjs의 ANCHOR를\n' +
      '  현재 코드에 맞춰 다시 잡거나, 이미 고쳐졌다면 이 스크립트를 지운다.',
  );
  process.exit(1);
}

// 헬퍼는 파일 맨 앞(첫 줄의 "use strict" 뒤)에 둔다
const head = src.startsWith('"use strict";') ? '"use strict";' : '';
const body = src.slice(head.length);
writeFileSync(FILE, head + HELPER + body.replace(ANCHOR, REPLACEMENT));
console.log(`next export 패치: 복사 동시성을 ${LIMIT}으로 묶었다`);
