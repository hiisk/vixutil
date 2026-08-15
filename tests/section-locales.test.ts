import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

import {
  LANGS, LOCALE_PATHS, CJK_LOCALES, SECTION_LOCALES, NARROWED_SECTIONS,
  alternates, localesOfSection, sectionHasLocale, localesOfPath,
} from '../lib/i18n/lang.ts';

const root = new URL('../', import.meta.url).pathname;

/**
 * 갈래를 언어에서 뺄 때 어긋나면 안 되는 네 곳.
 *
 * 라우트 파일 · 사이트맵 · hreflang · 언어 고르개. 하나라도 남으면 **조용히**
 * 깨진다 — 사이트맵이 404를 싣거나, hreflang이 없는 장을 가리키거나, 사람이
 * 언어를 바꾸다 404로 간다. 빌드도 검사도 그걸 저절로 잡아 주지 않는다.
 */

test('줄인 갈래 목록이 비어 있지 않고 열 언어보다 좁다', () => {
  assert.ok(NARROWED_SECTIONS.length > 0, '줄인 갈래가 하나도 없다');
  for (const sec of NARROWED_SECTIONS) {
    const only = localesOfSection(sec);
    assert.ok(only.length > 0, `${sec}이 어느 언어에도 안 나간다`);
    assert.ok(only.length < LOCALE_PATHS.length, `${sec}이 열 언어 전부라 줄인 뜻이 없다`);
    for (const l of only) assert.ok(LOCALE_PATHS.includes(l), `${sec}에 없는 언어 ${l}이 있다`);
  }
  /* 한국어는 어느 갈래에서도 빠지지 않는다 — 원본이 한국어로 쓰였다 */
  for (const sec of NARROWED_SECTIONS) {
    assert.ok(localesOfSection(sec).includes('ko'), `${sec}이 한국어에서 빠졌다`);
  }
});

test('안 줄인 갈래는 열 언어 전부다', () => {
  assert.deepEqual(localesOfSection('convert'), LOCALE_PATHS);
  assert.deepEqual(localesOfSection('color'), LOCALE_PATHS);
  assert.deepEqual(localesOfSection('없는갈래'), LOCALE_PATHS);
});

test('hreflang이 안 내는 언어를 가리키지 않는다', () => {
  /* 여기가 저절로 맞는 자리다 — alternates()가 표를 직접 본다 */
  for (const sec of NARROWED_SECTIONS) {
    const alt = alternates(`/${sec}/aaa`);
    const only = localesOfSection(sec);
    const listed = Object.entries(alt).filter(([k]) => k !== 'x-default').map(([, v]) => v);
    assert.equal(listed.length, only.length,
      `/${sec}: hreflang이 ${listed.length}개인데 내는 언어는 ${only.length}개다`);
    for (const l of LANGS) {
      const href = `${l.prefix}/${sec}/aaa`;
      const should = only.includes(l.locale);
      assert.equal(listed.includes(href), should,
        `/${sec}: ${l.locale}이 hreflang에 ${should ? '빠졌다' : '남아 있다'}`);
    }
    /* x-default도 안 내는 언어를 가리키면 안 된다 */
    assert.ok(listed.includes(alt['x-default']), `/${sec}: x-default가 목록 밖을 가리킨다`);
  }
  /* 안 줄인 갈래는 열 줄 그대로다 */
  const wide = alternates('/convert/cm-to-inch');
  assert.equal(Object.keys(wide).length, LANGS.length + 1);
  assert.equal(wide['x-default'], '/en/convert/cm-to-inch');
});

test('안 내기로 한 언어에 라우트 파일이 남아 있지 않다', () => {
  /*
   * 파일이 남아 있으면 사이트맵에 없는 장이 혼자 서서 색인된다 — 그 언어에서
   * 아무도 안 치는 장이므로 크롤 예산만 먹는다.
   */
  /*
   * 2026-08-15: "내는 언어에는 파일이 있어야 한다"는 반대쪽 단언을 뺐다.
   * 낱장 격자를 지운 갈래(heredity)는 **어느 언어에도 라우트 파일이 없다** —
   * 허브는 캐치올이 굽기 때문이다. 그래서 파일 유무로는 "내는가"를 알 수 없다.
   *
   * 여기서 지켜야 하는 것은 한 방향뿐이다: **안 내기로 한 언어에 파일이
   * 남아 있으면 안 된다.** 남아 있으면 사이트맵에도 hreflang에도 없는 장이
   * 혼자 서서 크롤 예산만 먹는다. 내는 쪽이 실제로 나오는지는
   * tests/fold-routes.test.ts가 등록부와 대조해 본다.
   */
  const left: string[] = [];
  for (const sec of NARROWED_SECTIONS) {
    for (const l of LANGS) {
      if (l.lang === 'ko') continue;                       // 한국어는 라우트 모양이 다르다
      if (sectionHasLocale(sec, l.locale)) continue;
      const dir = `${root}app/(${l.locale})/${l.locale}/${sec}`;
      if (existsSync(dir)) left.push(`${l.locale}/${sec}: 안 내기로 했는데 라우트 파일이 있다`);
    }
  }
  assert.deepEqual(left, [], '라우트 파일과 SECTION_LOCALES가 어긋났다');
});

test('사이트맵이 줄인 갈래를 그 언어로 안 낸다', () => {
  /*
   * app/sitemap.ts는 @/ 별칭이라 node가 못 부른다. 원본을 읽어 **거르는 코드가
   * 실제로 있는지** 본다 — 없으면 사이트맵이 404를 싣는다.
   */
  const src = readFileSync(`${root}app/sitemap.ts`, 'utf8');
  for (const sec of NARROWED_SECTIONS) {
    assert.ok(src.includes(`sectionHasLocale('${sec}'`),
      `사이트맵이 ${sec}을 안 거른다 — 안 내는 언어의 주소가 목록에 실린다`);
  }
});

test('언어 고르개와 아래 링크가 안 내는 언어를 안 건다', () => {
  /* 남아 있으면 사람이 언어를 바꾸다 404로 간다 */
  const bad: string[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = `${dir}/${e.name}`;
      if (e.isDirectory()) { walk(p); continue; }
      if (!e.name.endsWith('.tsx')) continue;
      const src = readFileSync(p, 'utf8');
      const sec = NARROWED_SECTIONS.find(s => new RegExp(`route=\\{?["\`]/${s}`).test(src));
      if (!sec) continue;
      if (/available=\{LOCALE_PATHS\}/.test(src)) bad.push(`${p.replace(root, '')}: 언어 고르개가 열 언어다`);
      if (/LANGS\.filter\(l => l\.lang !== lang\)\.map/.test(src)) bad.push(`${p.replace(root, '')}: 아래 링크가 열 언어다`);
    }
  };
  walk(`${root}components`);
  assert.deepEqual(bad, [], '줄인 갈래인데 언어 목록을 안 좁혔다');
});

test('캐치올이 안 내는 언어의 허브를 안 굽는다', () => {
  /*
   * 낱장은 라우트 파일이 없어 저절로 404지만 **허브는 캐치올이 굽는다**.
   * 거기를 안 막으면 /es/hanja가 살아남는다.
   */
  const src = readFileSync(`${root}lib/fold/resolve.tsx`, 'utf8');
  assert.ok(src.includes('sectionHasLocale'), '캐치올이 갈래 언어를 안 본다');
  assert.ok(/staticKeysFor/.test(src), '굽는 목록을 안 거른다');
  const page = readFileSync(`${root}app/(es)/es/[[...path]]/page.tsx`, 'utf8');
  assert.ok(page.includes('staticKeysFor'), '스페인어 캐치올이 안 걸러진 목록을 쓴다');
  assert.ok(!page.includes('STATIC_ROUTE_KEYS'), '스페인어 캐치올이 아직 전체 목록을 쓴다');
});

test('한자 문화권 넷이 실제로 그 넷이다', () => {
  assert.deepEqual([...CJK_LOCALES].sort(), ['ja', 'ko', 'zh-hans', 'zh-hant']);
  /* 2026-08-15: 연호·다다미·혈액형 유전 갈래를 통째로 지웠다 — 한자만 남았다 */
  for (const sec of ['hanja']) {
    assert.deepEqual(SECTION_LOCALES[sec], CJK_LOCALES, `${sec}이 한자 문화권이 아니다`);
    assert.ok(!sectionHasLocale(sec, 'en'), `${sec}이 영어로 나간다`);
    assert.ok(!sectionHasLocale(sec, 'hi'), `${sec}이 힌디어로 나간다`);
    assert.ok(sectionHasLocale(sec, 'ja'), `${sec}이 일본어에서 빠졌다`);
  }
});

test('경로에서 갈래를 제대로 뗀다', () => {
  assert.deepEqual(localesOfPath('/hanja/aaa'), CJK_LOCALES);
  assert.deepEqual(localesOfPath('/hanja'), CJK_LOCALES);
  assert.deepEqual(localesOfPath('hanja/aaa'), CJK_LOCALES);
  assert.deepEqual(localesOfPath('/convert/cm-to-inch'), LOCALE_PATHS);
  /* 이름이 겹치는 갈래를 잘못 집으면 안 된다 */
  assert.deepEqual(localesOfPath('/hanjanews/x'), LOCALE_PATHS);
});
