import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { CALC_INTL_SLUGS, calcCopy } from '../lib/calc-l10n/index.ts';
import { CALC_SHELL } from '../lib/calc-l10n/shell.ts';
import { ALL_LOCALES10 } from '../lib/locales.ts';

const ROOT = join(import.meta.dirname, '..');
const LANGS = ALL_LOCALES10.filter(l => l !== 'ko');

/**
 * 계산기 하나를 다국어로 내려면 네 군데를 손대야 한다.
 *
 *   1. lib/calc-l10n/<슬러그>.ts       — 아홉 언어 문구
 *   2. lib/calc-l10n/index.ts          — TABLES에 등록
 *   3. components/calc/CalcIntlPage.tsx — TOOLS에 계산 컴포넌트 등록
 *   4. app/calculator/<슬러그>/layout.tsx — 한국어 쪽 hreflang
 *
 * 넷 중 하나만 빠져도 조용히 어긋난다. 3번을 빼먹으면 페이지가 notFound로
 * 떨어지고, 4번을 빼먹으면 한국어가 번역판을 안 가리켜 hreflang 짝이 깨진다.
 * 둘 다 화면을 열어 보기 전에는 모른다.
 *
 * 슬러그 목록을 여기 적지 않는다 — CALC_INTL_SLUGS를 돌린다. 적어 두면 계산기를
 * 더할 때 검사만 옛 목록으로 남아, 새로 더한 것이 검사 밖에 놓인다.
 */

test('아홉 언어가 모두 문구를 갖는다', () => {
  const bad: string[] = [];
  for (const slug of CALC_INTL_SLUGS)
    for (const lang of LANGS)
      if (!calcCopy(lang, slug)) bad.push(`${slug}/${lang}`);
  assert.deepStrictEqual(bad, []);
});

test('문구에 빈 칸이 없다', () => {
  const bad: string[] = [];
  for (const slug of CALC_INTL_SLUGS) {
    for (const lang of LANGS) {
      const c = calcCopy(lang, slug)!;
      if (!c.title.trim()) bad.push(`${slug}/${lang}: title`);
      if (!c.desc.trim()) bad.push(`${slug}/${lang}: desc`);
      if (!c.short.trim()) bad.push(`${slug}/${lang}: short`);
      if (!c.intro.length) bad.push(`${slug}/${lang}: intro`);
      if (!c.faq.length) bad.push(`${slug}/${lang}: faq`);
      for (const s of c.intro) if (!s.h.trim() || !s.p.trim()) bad.push(`${slug}/${lang}: intro 빈 칸`);
      for (const q of c.faq) if (!q.q.trim() || !q.a.trim()) bad.push(`${slug}/${lang}: faq 빈 칸`);
    }
  }
  assert.deepStrictEqual(bad, []);
});

test('번역문에 한글이 섞여 있지 않다', () => {
  /*
   * 옮기다 만 문장이 그대로 남는 일이 실제로 잦다. 아홉 언어 어디에도 한글이
   * 나올 이유가 없으므로, 한 글자라도 있으면 덜 옮긴 것이다.
   */
  const HANGUL = /[가-힣]/;
  const bad: string[] = [];
  for (const slug of CALC_INTL_SLUGS) {
    for (const lang of LANGS) {
      const c = calcCopy(lang, slug)!;
      const all = [c.title, c.desc, c.short,
        ...c.intro.flatMap(s => [s.h, s.p]),
        ...c.faq.flatMap(q => [q.q, q.a]),
        ...Object.values(c.ui)].join(' ');
      if (HANGUL.test(all)) bad.push(`${slug}/${lang}`);
    }
  }
  assert.deepStrictEqual(bad, []);
});

test('계산 컴포넌트가 등록돼 있다', () => {
  const src = readFileSync(join(ROOT, 'components/calc/CalcIntlPage.tsx'), 'utf8');
  const registered = new Set([...src.matchAll(/^\s*'([^']+)':\s*\w+,$/gm)].map(m => m[1]));
  const missing = CALC_INTL_SLUGS.filter(s => !registered.has(s));
  assert.deepStrictEqual(missing, [], 'CalcIntlPage의 TOOLS에 없다 — 열면 notFound가 된다');
});

test('한국어에 같은 슬러그가 있고 hreflang을 되받는다', () => {
  const bad: string[] = [];
  for (const slug of CALC_INTL_SLUGS) {
    const dir = join(ROOT, 'app/calculator', slug);
    if (!existsSync(join(dir, 'page.tsx'))) { bad.push(`${slug}: 한국어 페이지 없음`); continue; }
    const layout = join(dir, 'layout.tsx');
    if (!existsSync(layout)) { bad.push(`${slug}: layout.tsx 없음 — hreflang을 낼 곳이 없다`); continue; }
    const src = readFileSync(layout, 'utf8');
    // import만 남고 alternates에서 빠져도 통과하지 않도록 실제 쓰임을 본다
    if (!/languages:\s*alternateLanguages10\(/.test(src))
      bad.push(`${slug}: 한국어가 번역판을 안 가리킨다`);
  }
  assert.deepStrictEqual(bad, []);
});

test('한국어 페이지에 언어 버튼이 있다', () => {
  const bad = CALC_INTL_SLUGS.filter(slug => {
    const f = join(ROOT, 'app/calculator', slug, 'page.tsx');
    return existsSync(f) && !readFileSync(f, 'utf8').includes('<LangPicker');
  });
  assert.deepStrictEqual(bad, [], '번역판이 있는데 한국어에서 건너갈 길이 없다');
});

test('껍데기 문구가 아홉 언어를 다 갖는다', () => {
  for (const lang of LANGS) {
    const ui = CALC_SHELL[lang];
    assert.ok(ui, `${lang} 없음`);
    for (const [k, v] of Object.entries(ui)) assert.ok(v.trim(), `${lang}.${k}가 비었다`);
  }
});

test('검사가 헛돌지 않는다', () => {
  // 목록이 비면 위 검사들이 전부 통과해 버린다
  assert.ok(CALC_INTL_SLUGS.length > 0, '다국어 계산기가 하나도 없다');
});
