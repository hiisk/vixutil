/**
 * 번역 언어가 한국어와 같은 구조화 데이터를 내는지 본다.
 *
 * 세 섹션을 아홉 언어로 넓힌 뒤에도 한국어에만 있는 것이 남아 있었다.
 * 허브에는 CollectionPage·ItemList·FAQPage가, 상세에는 FAQPage가 없었다.
 * 페이지는 멀쩡히 뜨고 title·description·canonical도 다 있어서, 눈으로도
 * 기존 검사로도 걸리지 않는다 — **한국어와 견주어야만** 빠진 것이 보인다.
 *
 * FAQ 문구까지 같을 필요는 없다. 있어야 할 종류가 있는지만 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(import.meta.dirname, '..', 'out');
const built = existsSync(OUT);

const LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

/** 그 HTML이 내는 구조화 데이터 @type 집합 */
function types(file: string): Set<string> {
  if (!existsSync(file)) return new Set();
  const html = readFileSync(file, 'utf8');
  return new Set([...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map(m => m[1]));
}

/** 허브·상세에서 한국어와 맞춰야 하는 종류. 사이트 공통(Organization 등)은 뺀다. */
const HUB_MUST = ['BreadcrumbList', 'CollectionPage', 'ItemList', 'FAQPage'];
const DETAIL_MUST = ['BreadcrumbList', 'FAQPage'];

/** 세 섹션의 상세 하나씩 — 아홉 언어가 모두 가진 슬러그다 */
const SAMPLE = { test: 'social-battery', quiz: 'world-capitals', checklist: 'moving' };

test('번역 허브가 한국어와 같은 구조화 데이터를 낸다', { skip: built ? false : 'out/ 없음' }, () => {
  const bad: string[] = [];
  for (const sec of ['test', 'quiz', 'checklist'] as const) {
    for (const lang of LANGS) {
      const t = types(join(OUT, lang, `${sec}.html`));
      if (!t.size) { bad.push(`${lang}/${sec}: 페이지 없음`); continue; }
      const missing = HUB_MUST.filter(x => !t.has(x));
      if (missing.length) bad.push(`${lang}/${sec}: ${missing.join(', ')} 없음`);
    }
  }
  assert.deepEqual(bad, [], `한국어 허브에는 있는데 번역 허브에 없다:\n  ${bad.join('\n  ')}`);
});

test('번역 상세가 한국어와 같은 구조화 데이터를 낸다', { skip: built ? false : 'out/ 없음' }, () => {
  const bad: string[] = [];
  for (const [sec, slug] of Object.entries(SAMPLE)) {
    for (const lang of LANGS) {
      const t = types(join(OUT, lang, sec, `${slug}.html`));
      if (!t.size) { bad.push(`${lang}/${sec}/${slug}: 페이지 없음`); continue; }
      const missing = DETAIL_MUST.filter(x => !t.has(x));
      if (missing.length) bad.push(`${lang}/${sec}/${slug}: ${missing.join(', ')} 없음`);
    }
  }
  assert.deepEqual(bad, [], `한국어 상세에는 있는데 번역 상세에 없다:\n  ${bad.join('\n  ')}`);
});

test('FAQ가 그 언어로 적혀 있다', { skip: built ? false : 'out/ 없음' }, () => {
  // 구조는 맞는데 한국어가 그대로 실려 있으면 없느니만 못하다
  const hangul = /[가-힣]/;
  const bad: string[] = [];
  for (const sec of ['test', 'quiz', 'checklist'] as const) {
    for (const lang of LANGS) {
      const f = join(OUT, lang, `${sec}.html`);
      if (!existsSync(f)) continue;
      const html = readFileSync(f, 'utf8');
      for (const m of html.matchAll(/"@type":"Question","name":"([^"]{0,120})/g)) {
        if (hangul.test(m[1])) bad.push(`${lang}/${sec}: ${m[1].slice(0, 30)}`);
      }
    }
  }
  assert.deepEqual(bad, [], `FAQ에 한국어가 그대로 실렸다:\n  ${bad.join('\n  ')}`);
});
