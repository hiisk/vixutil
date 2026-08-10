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
]);

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
