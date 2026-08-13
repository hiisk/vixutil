import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { HOME_UI, homeSections } from '../lib/locale-home.ts';
import { INTL_LOCALES10 } from '../lib/locales.ts';
import { appFile } from './app-path.ts';

/**
 * 홈이 모든 섹션을 걸고 있는지 본다.
 *
 * newsection을 머지했을 때 한국어 홈에 새 섹션 열셋이 통째로 빠져 있었다.
 * 목록 import(`CELLS as BED_CELLS` 등)는 들어와 있는데 카드를 안 쓴 상태라
 * **tsc도 검사도 아무것도 안 잡았다** — 안 쓰이는 import는 오류가 아니다.
 * 아홉 언어 홈은 lib/locale-home.ts가 걸고 있어서 한국어만 빠졌고,
 * 그래서 눈으로도 안 보였다.
 *
 * 홈은 사이트에서 가장 힘이 센 페이지다. 거기서 안 걸리면 그 섹션의
 * 낱장 만 장이 사이트맵에만 있는 상태가 된다
 * (→ tests/related-inbound.test.ts와 같은 문제를 섹션 단위로 겪는 것이다).
 */
const ROOT = join(import.meta.dirname, '..');

/** app/(ko) 아래의 섹션 이름 — 라우트가 있으면 섹션이 있는 것이다 */
function sectionsOnDisk(): string[] {
  const dir = appFile('app/(ko)');
  return readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith('_') && !e.name.startsWith('('))
    .map(e => e.name)
    .filter(name => {
      try {
        readFileSync(join(dir, name, 'page.tsx'), 'utf8');
        return true;
      } catch {
        return false;
      }
    });
}

/** 그 파일이 거는 경로 — import 줄은 뺀다(경로가 아니라 모듈이다) */
function hrefsIn(path: string): Set<string> {
  const src = readFileSync(path, 'utf8').replace(/^import[^\n]*\n/gm, '');
  const out = new Set<string>();
  for (const m of src.matchAll(/href:\s*'(\/[a-z0-9-]+)'/g)) out.add(m[1]);
  for (const m of src.matchAll(/href="(\/[a-z0-9-]+)"/g)) out.add(m[1]);
  return out;
}

/* 홈에 카드를 두지 않기로 한 것들 — 이유가 있어야 여기 적는다 */
const NOT_ON_HOME = new Set([
  'search',   // 도구가 아니라 기능
  'crypto',   // 늘리지 않기로 한 섹션
  /*
   * 정책·소개 네 장(2026-08-12). 도구가 아니라 문서이므로 홈의 도구 격자에
   * 카드로 끼우면 "계산기 다음에 개인정보 처리방침"이 된다. 대신 **푸터**에
   * 넣었고, 푸터는 모든 페이지에 있어 홈 카드보다 닿는 자리가 넓다 —
   * 애드센스 심사자와 크롤러도 그쪽에서 찾는다.
   * 네 장이 열 언어에 다 있는지와 푸터가 그것을 거는지는
   * tests/legal-pages.test.ts가 본다.
   */
  'about', 'contact', 'privacy', 'terms',
]);

/**
 * 아홉 언어 홈에는 있지만 한국어 홈에는 일부러 안 두는 것.
 *
 * **비어 있는 것이 정상이다.** 한국어가 이 사이트의 원본이라, 번역 홈에 있는데
 * 한국어에 없다는 것은 거의 언제나 빠뜨린 것이다.
 */
const KO_HOME_SKIP = new Set<string>([]);

test('한국어 홈이 모든 섹션을 건다', () => {
  const linked = hrefsIn(appFile('app/(ko)/page.tsx'));
  const missing = sectionsOnDisk()
    .filter(s => !NOT_ON_HOME.has(s))
    .filter(s => !linked.has(`/${s}`));
  assert.deepEqual(
    missing, [],
    `홈에 카드가 없는 섹션 ${missing.length}개 — 사이트에서 가장 힘이 센 페이지에서 안 걸린다`,
  );
});

test('아홉 언어 홈도 같은 섹션을 건다', () => {
  /*
   * 언어 홈은 lib/locale-home.ts 하나가 아홉 언어에 같은 목록을 준다.
   * 한국어 홈과 어긋나면 언어에 따라 닿을 수 있는 섹션이 달라진다.
   */
  const ko = hrefsIn(appFile('app/(ko)/page.tsx'));
  const src = readFileSync(join(ROOT, 'lib', 'locale-home.ts'), 'utf8');
  const intl = new Set([...src.matchAll(/'(\/[a-z0-9-]+)'/g)].map(m => m[1]));
  const onlyKo = [...ko].filter(h => !intl.has(h) && !NOT_ON_HOME.has(h.slice(1)));
  assert.deepEqual(
    onlyKo, [],
    `한국어 홈에만 있고 아홉 언어 홈에는 없는 섹션: ${onlyKo.join(', ')}`,
  );
});

test('아홉 언어 홈에 있는 것이 한국어 홈에도 있다 — 반대 방향', () => {
  /*
   * ── 방향이 하나뿐이라 놓친 자리 (2026-08-13) ──────────────
   * 위 검사는 「한국어 홈 ⊆ 아홉 언어 홈」만 본다. 그 반대는 아무도 안 봐서,
   * 타로 카드 허브(78장, 낱장 79장)가 아홉 언어 홈에는 있는데 **한국어 홈에만
   * 없었다.** 한국어에서는 /fortune 부모 허브를 거쳐야 닿았다.
   *
   * 첫 검사(sectionsOnDisk)도 이걸 못 잡는다 — app/(ko) **최상위 폴더만** 세기
   * 때문에 그런 하위 허브는 애초에 목록에 없다. 그래서 여기서는
   * 자료(locale-home) 쪽을 기준으로 삼아 한국어 홈을 되짚는다.
   *
   * 한국어에만 없어도 되는 것이 생기면 까닭과 함께 KO_HOME_SKIP에 적는다.
   */
  const koSrc = readFileSync(appFile('app/(ko)/page.tsx'), 'utf8').replace(/^import[^\n]*\n/gm, '');
  const routes = new Set(INTL_LOCALES10.flatMap(l => homeSections(l).map(s => s.route)));
  const missing = [...routes]
    .filter(r => !KO_HOME_SKIP.has(r))
    .filter(r => !koSrc.includes(`'${r}'`) && !koSrc.includes(`"${r}"`));
  assert.deepEqual(
    missing, [],
    `아홉 언어 홈에는 있는데 한국어 홈에 없는 섹션 ${missing.length}개 — ` +
    '한국어가 이 사이트의 원본인데 거기서만 안 걸린다',
  );
});

test('섹션 카드가 아홉 언어 홈에 다 있다', () => {
  /*
   * 위 검사는 경로 문자열이 파일에 있는지만 본다. copy에서 언어 하나가
   * 빠지면 — 라우트도 번역도 있는데 카드만 없는 상태 — 거기에 안 걸린다.
   * 중국어 두 홈이 그렇게 스물일곱 섹션을 안 걸고 있었다(2026-08-10).
   * 언어를 아직 못 채운 섹션이 생기면 이유와 함께 여기 예외로 적는다.
   */
  const partial: string[] = [];
  const routes = new Set(INTL_LOCALES10.flatMap(l => homeSections(l).map(s => s.route)));
  for (const route of routes) {
    const absent = INTL_LOCALES10.filter(l => !homeSections(l).some(s => s.route === route));
    if (absent.length) partial.push(`${route} ← ${absent.join(', ')} 카드 없음`);
  }
  assert.deepEqual(
    partial, [],
    `일부 언어 홈에만 걸린 섹션 ${partial.length}개 — 빠진 언어에서는 그 섹션 낱장 전체가 사이트맵에만 있게 된다`,
  );
});

test('홈 문구는 열 언어가 다 있다', () => {
  for (const [lang, ui] of Object.entries(HOME_UI)) {
    assert.ok(ui.metaTitle?.trim(), `${lang} metaTitle 비었음`);
    assert.ok(ui.metaDesc?.trim(), `${lang} metaDesc 비었음`);
  }
});
