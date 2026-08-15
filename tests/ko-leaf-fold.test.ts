/**
 * 한국어 낱장 접기가 어긋나지 않는지 본다.
 *
 * ── 2026-08-12에 왜 접었나 ─────────────────────────────────
 * Vercel 라우팅 표는 2,048개까지고 동적 라우트 하나가 두 칸을 쓴다. 941개가
 * 1,914칸을 먹어 한도까지 134칸뿐이었고, 그 전에는 2,094칸으로 넘겨 배포가
 * `Maximum number of routes exceeded`로 죽었다. 한국어 낱장 101개를 라우트
 * 둘([section]/[slug], [a]/[b]/[slug])로 접어 99개를 덜었다.
 *
 * ── 접기가 만든 새 위험 ────────────────────────────────────
 * 전에는 파일이 곧 라우트였다. 지금은 **등록부에서 한 줄이 빠지면 그 갈래 전체가
 * 조용히 404가 된다** — 파일은 lib/ko/pages에 그대로 있고, tsc도 빌드도 통과하고,
 * 사이트맵은 그 주소를 계속 내건다. lib/fold/registry.ts에서 똑같은 위험을
 * 겪었고(tests/fold-routes.test.ts) 그때와 같은 방식으로 되짚는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { KO_LEAVES, KO_DEEP_LEAVES } from '../lib/ko/registry.ts';
import { APP_DIR } from './app-path.ts';

const ROOT = join(import.meta.dirname, '..');
const PAGES = join(ROOT, 'lib', 'ko', 'pages');

const registered = new Map<string, string>([
  ...Object.keys(KO_LEAVES).map(k => [k, k.replace(/\//g, '__')] as [string, string]),
  ...Object.keys(KO_DEEP_LEAVES).map(k => [k, k.replace(/\//g, '__')] as [string, string]),
]);

test('등록부와 모듈 파일이 양쪽 다 맞는다', () => {
  const onDisk = new Set(
    readdirSync(PAGES).filter(f => f.endsWith('__slug.tsx')).map(f => f.replace(/__slug\.tsx$/, '')),
  );
  const missing = [...registered].filter(([, file]) => !onDisk.has(file)).map(([k]) => k);
  assert.deepEqual(missing, [], '등록부가 가리키는 모듈이 없다 — 그 갈래가 404가 된다');

  const orphan = [...onDisk].filter(f => ![...registered.values()].includes(f));
  assert.deepEqual(orphan, [], '등록부에 없는 모듈이다 — 아무도 부르지 않아 그 갈래가 404가 된다');
});

test('디스패처 둘이 있고 ISR로 캐시한다', () => {
  /*
   * 모듈에는 force-dynamic이 없다(라우트가 아니므로 Next가 안 본다). 그래서 그
   * 선언이 사라지면 한국어 낱장 십만 장이 한꺼번에 ISR로 돌아가 배포마다 캐시
   * 쓰기를 태운다 — 무료 티어 월 20만을 세 번 배포로 넘긴 적이 있다.
   */
  for (const p of [
    join(APP_DIR, '(ko)', '[section]', '[slug]', 'page.tsx'),
    join(APP_DIR, '(ko)', '[section]', '[slug]', '[deep]', 'page.tsx'),
  ]) {
    assert.ok(existsSync(p), `디스패처가 없다: ${p.replace(ROOT + '/', '')}`);
    const src = readFileSync(p, 'utf8');
    /*
     * 2026-08-13: force-dynamic을 걷고 ISR로 되돌렸다. force-dynamic은 요청마다
     * 원본에서 페이지를 전송해서 Hobby의 Fast Origin Transfer 10GB를 348%까지
     * 태우고 사이트를 멈췄다. 2026-08-13에 헤더로 CDN에 태우는 길을 시도했지만
     * **배포해서 재 보니 Cache-Control만은 프레임워크 것이 이겼다**(proxy.ts 머리말).
     * 그래서 낱장은 ISR이다 — revalidate와 generateStaticParams가 함께 있어야 한다.
     */
    assert.match(src, /export const revalidate = false/, `${p.replace(ROOT + '/', '')}에 revalidate = false가 없다`);
    assert.match(src, /generateStaticParams/, `${p.replace(ROOT + '/', '')}가 굽는 손잡이를 안 넘긴다`);
    assert.match(src, /generateStaticParams/, `${p.replace(ROOT + '/', '')}가 굽는 손잡이를 안 넘긴다`);
  }
});

test('메타 모듈이 저마다 generateStaticParams를 갖는다', () => {
  /*
   * 디스패처가 이 표를 돌며 모아 쓴다. 모듈에서 빠지면 굽는 수를 올려도 그 갈래만
   * 안 구워지고, 빌드는 오히려 빨라지므로 눈치채기 어렵다.
   *
   * 2026-08-15에 보는 파일을 *__slug.meta.tsx로 옮겼다. 클라이언트 청크를 가르려고
   * 디스패처가 뷰 모듈을 못 보게 갈랐고(tests/registry-split.test.ts), 굽는 목록도
   * 그쪽에서 나온다. 뷰 파일을 계속 보면 **아무도 안 쓰는 것을 지키게 된다.**
   */
  const bad: string[] = [];
  for (const [key, file] of registered) {
    const p = join(PAGES, `${file}__slug.meta.tsx`);
    if (!existsSync(p)) continue;
    /*
     * 내보내는 꼴이 둘이다 — 대부분은 `export function`이고, 접힌 국제 모듈을
     * 감싸는 어댑터는 `export const ... = ko.generateStaticParams`다(BMI 격자가
     * 그렇다). 요건은 "내보내는가"이므로 둘 다 받는다. 함수 선언만 찾던 검사가
     * 어댑터를 흠으로 잡아 2026-08-14에 넓혔다.
     */
    const src = readFileSync(p, 'utf8');
    if (!/export\s+(function|const)\s+generateStaticParams/.test(src)) bad.push(key);
  }
  assert.deepEqual(bad, [], 'generateStaticParams가 없는 모듈이다');
});

test('접힌 갈래가 라우트 폴더로 남아 있지 않다', () => {
  /*
   * 옮기고 폴더를 안 지우면 라우트가 그대로 살아 표를 계속 먹는다. 그리고 그쪽이
   * 디스패처보다 먼저 잡히므로 접기가 아무 효과도 없이 조용히 되돌려진다.
   */
  const left: string[] = [];
  for (const key of registered.keys()) {
    const p = join(APP_DIR, '(ko)', ...key.split('/'), '[slug]', 'page.tsx');
    if (existsSync(p)) left.push(key);
  }
  assert.deepEqual(left, [], '접었는데 라우트 파일이 남아 있다');
});

test('한 부모 아래 동적 칸 이름이 하나다', () => {
  /*
   * Next는 **같은 자리의 동적 칸 이름이 같기를 요구한다.** 세 칸 디스패처를
   * [a]/[b]/[slug]로 두었더니 형제인 [section]/[slug]와 첫 칸 이름이 달라
   * `You cannot use different slug names for the same dynamic path ('a' !== 'section')`가
   * 나고 **사이트의 모든 주소가 500**이 됐다.
   *
   * 무서운 것은 이것이 tsc도, 검사 3,007개도, `next build`도 통과한다는 점이다.
   * 2,686장을 다 굽고 나서 서버를 띄워야 드러난다. 그래서 폴더 이름만으로 잡는다.
   *
   * 규칙은 깊이가 아니라 **형제**다 — 한 폴더 안의 동적 자식들이 같은 이름을
   * 써야 한다. 처음엔 깊이별로 봤는데 가지가 갈리면 형제를 못 봐서 못 잡았다.
   */
  const bad: string[] = [];
  const walk = (dir: string) => {
    const kids = readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory());
    // [slug]·[...slug]의 이름만 모은다 — 선택 캐치올 [[...path]]는 규칙이 다르다
    const names = new Set(
      kids.map(e => /^\[(?!\[)\.{0,3}(\w+)\]$/.exec(e.name)?.[1]).filter((x): x is string => !!x),
    );
    if (names.size > 1) bad.push(`${dir.replace(ROOT + '/', '')}: ${[...names].join(' · ')}`);
    for (const e of kids) walk(join(dir, e.name));
  };
  walk(APP_DIR);
  assert.deepEqual(bad, [], '한 폴더 안에서 동적 칸 이름이 갈렸다 — 이러면 사이트 전체가 500이 된다');
});
