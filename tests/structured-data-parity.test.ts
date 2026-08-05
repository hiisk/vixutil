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
import { builtHtml, isBuilt } from './app-path.ts';

/*
 * 전에는 out/을 봤다. ISR로 바꾸면서 out/이 없어졌는데 조건을 안 고쳐서
 * 이 파일의 두 검사가 말없이 건너뛰고 있었다. 지금은 .next/server/app을 본다.
 */
const built = isBuilt();

const LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

/** 그 HTML이 내는 구조화 데이터 @type 집합 */
function types(file: string | null): Set<string> {
  if (!file || !existsSync(file)) return new Set();
  const html = readFileSync(file, 'utf8');
  return new Set([...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map(m => m[1]));
}

/** 허브·상세에서 한국어와 맞춰야 하는 종류. 사이트 공통(Organization 등)은 뺀다. */
const HUB_MUST = ['BreadcrumbList', 'CollectionPage', 'ItemList', 'FAQPage'];
const DETAIL_MUST = ['BreadcrumbList', 'FAQPage'];

/** 세 섹션의 상세 하나씩 — 아홉 언어가 모두 가진 슬러그다 */
const SAMPLE = { test: 'social-battery', quiz: 'world-capitals', checklist: 'moving' };

test('번역 허브가 한국어와 같은 구조화 데이터를 낸다', { skip: built ? false : '빌드 산출물 없음' }, () => {
  const bad: string[] = [];
  for (const sec of ['test', 'quiz', 'checklist'] as const) {
    for (const lang of LANGS) {
      const t = types(builtHtml(`/${lang}/${sec}`));
      if (!t.size) { bad.push(`${lang}/${sec}: 페이지 없음`); continue; }
      const missing = HUB_MUST.filter(x => !t.has(x));
      if (missing.length) bad.push(`${lang}/${sec}: ${missing.join(', ')} 없음`);
    }
  }
  assert.deepEqual(bad, [], `한국어 허브에는 있는데 번역 허브에 없다:\n  ${bad.join('\n  ')}`);
});

test('번역 상세가 한국어와 같은 구조화 데이터를 낸다', { skip: built ? false : '빌드 산출물 없음' }, () => {
  /*
   * 낱장은 PRERENDER_PER_ROUTE가 0이라 빌드가 안 굽는다. 그래서 구워진 것만
   * 보는데, 하나도 없으면 **아무것도 안 보고 초록이 된다** — 그 상태를 그냥
   * 두면 이 검사는 있으나 마나다. 그래서 한 장도 못 봤으면 대놓고 알린다.
   * 낱장까지 보려면 PRERENDER_PER_ROUTE=5 npm run build 로 구운 뒤 돌린다.
   */
  const bad: string[] = [];
  let skipped = 0;
  for (const [sec, slug] of Object.entries(SAMPLE)) {
    for (const lang of LANGS) {
      const t = types(builtHtml(`/${lang}/${sec}/${slug}`));
      // 낱장은 ISR이라 대개 안 구워진다 — 없는 것과 틀린 것을 가른다
      if (!t.size) { skipped++; continue; }
      const missing = DETAIL_MUST.filter(x => !t.has(x));
      if (missing.length) bad.push(`${lang}/${sec}/${slug}: ${missing.join(', ')} 없음`);
    }
  }
  assert.deepEqual(bad, [], `한국어 상세에는 있는데 번역 상세에 없다:\n  ${bad.join('\n  ')}`);
  const total = Object.keys(SAMPLE).length * LANGS.length;
  assert.notEqual(skipped, total, `낱장이 한 장도 안 구워져 아무것도 못 봤다 — PRERENDER_PER_ROUTE=5로 빌드하면 돈다`);
});

test('FAQ가 그 언어로 적혀 있다', { skip: built ? false : '빌드 산출물 없음' }, () => {
  // 구조는 맞는데 한국어가 그대로 실려 있으면 없느니만 못하다
  const hangul = /[가-힣]/;
  const bad: string[] = [];
  let seen = 0;
  for (const sec of ['test', 'quiz', 'checklist'] as const) {
    for (const lang of LANGS) {
      const f = builtHtml(`/${lang}/${sec}`);
      if (!f) continue;
      seen++;
      const html = readFileSync(f, 'utf8');
      for (const m of html.matchAll(/"@type":"Question","name":"([^"]{0,120})/g)) {
        if (hangul.test(m[1])) bad.push(`${lang}/${sec}: ${m[1].slice(0, 30)}`);
      }
    }
  }
  assert.deepEqual(bad, [], `FAQ에 한국어가 그대로 실렸다:\n  ${bad.join('\n  ')}`);
  assert.ok(seen > 20, `허브를 ${seen}장밖에 못 읽었다 — 아무것도 안 보고 통과할 뻔했다`);
});
