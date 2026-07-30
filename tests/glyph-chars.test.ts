/**
 * 특수문자 계산이 스스로 어긋나지 않는지 본다.
 *
 * 이 섹션의 값은 전부 글자에서 계산되므로, 계산이 맞으면 데이터도 맞다.
 * 그래서 되짚어 본다 — 코드 포인트로 글자를 되만들고, 주소 인코딩을 되풀고,
 * 엔티티에서 번호를 도로 꺼내 원래 글자와 같은지 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { GLYPHS, GLYPH_ICON, GLYPH_KINDS, GLYPH_SLUGS, glyphOf, glyphsOfKind } from '../lib/glyph/list.ts';
import { glyphFacts, relatedGlyphs } from '../lib/glyph/facts.ts';
import { GLYPH_UI } from '../lib/glyph/ui.ts';
import { LANG8_CODES } from '../lib/i18n/lang8.ts';

test('100자가 넘는다', () => {
  assert.ok(GLYPHS.length >= 100, `${GLYPHS.length}자뿐이다`);
});

test('글자와 slug이 겹치지 않는다', () => {
  assert.equal(new Set(GLYPH_SLUGS).size, GLYPHS.length, 'slug 중복');
  assert.equal(new Set(GLYPHS.map(g => g.char)).size, GLYPHS.length, '같은 글자가 두 번 있다');
  for (const g of GLYPHS) {
    assert.match(g.slug, /^[a-z0-9-]+$/, `주소에 못 쓰는 slug: ${g.slug}`);
    assert.equal([...g.char].length, 1, `${g.slug}: 글자가 하나가 아니다`);
  }
});

test('코드 포인트로 되만들면 같은 글자가 나온다', () => {
  for (const g of GLYPHS) {
    const f = glyphFacts(g);
    assert.equal(String.fromCodePoint(f.code), g.char, `${g.slug}: 코드가 어긋난다`);
    assert.equal(decodeURIComponent(f.urlEncoded), g.char, `${g.slug}: 주소 인코딩이 어긋난다`);
    // &#10084; 에서 번호를 도로 꺼내 본다
    const back = Number(f.entity.replace(/[&#;]/g, ''));
    assert.equal(back, f.code, `${g.slug}: 엔티티 번호가 어긋난다`);
  }
});

test('알려진 글자의 값이 맞는다', () => {
  // 이 값들은 어디서 찾아봐도 같아야 한다 — 계산식을 갈아엎어도 움직이지 않는 못이다
  const heart = glyphFacts(glyphOf('heavy-heart')!);
  assert.equal(heart.unicode, 'U+2764');
  assert.equal(heart.code, 10084);
  assert.equal(heart.cssEscape, '\\2764');
  assert.equal(heart.utf8Bytes, 3);

  const copy = glyphFacts(glyphOf('copyright')!);
  assert.equal(copy.unicode, 'U+00A9');
  assert.equal(copy.namedEntity, '&copy;');
  assert.equal(copy.utf8Bytes, 2, '라틴-1 보충 문자는 두 바이트다');

  const arrow = glyphFacts(glyphOf('arrow-right')!);
  assert.equal(arrow.namedEntity, '&rarr;');
  assert.equal(arrow.urlEncoded, '%E2%86%92');
});

test('이름 엔티티는 이름 꼴이어야 한다', () => {
  // 표에 숫자 꼴을 적어 두면 "이름이 있다"고 잘못 보여 준다
  for (const g of GLYPHS) {
    const named = glyphFacts(g).namedEntity;
    if (named) assert.match(named, /^&[a-zA-Z][a-zA-Z0-9]*;$/, `${g.slug}: 이름 엔티티 꼴이 아니다 — ${named}`);
  }
  assert.equal(glyphFacts(glyphOf('won')!).namedEntity, undefined, '이름이 없는 글자는 비어 있어야 한다');
});

test('CSS·자바스크립트 이스케이프가 되짚어진다', () => {
  for (const g of GLYPHS) {
    const f = glyphFacts(g);
    assert.match(f.cssEscape, /^\\[0-9A-F]{4,6}$/, `${g.slug}: CSS 이스케이프 꼴이 아니다`);
    const hex = f.cssEscape.slice(1);
    assert.equal(parseInt(hex, 16), f.code, `${g.slug}: CSS 값이 코드와 다르다`);
    // 서로게이트가 필요한 글자는 \u{...} 꼴이어야 한다
    if (f.surrogate) assert.match(f.jsEscape, /^\\u\{[0-9A-F]+\}$/, `${g.slug}: 큰 코드의 JS 이스케이프 꼴이 다르다`);
    else assert.match(f.jsEscape, /^\\u[0-9A-F]{4}$/, `${g.slug}: JS 이스케이프 꼴이 다르다`);
  }
});

test('갈래가 빈 곳 없이 덮는다', () => {
  for (const k of GLYPH_KINDS) assert.ok(glyphsOfKind(k).length > 0, `${k} 갈래가 비었다`);
  assert.equal(
    GLYPH_KINDS.reduce((n, k) => n + glyphsOfKind(k).length, 0),
    GLYPHS.length,
    '갈래에 안 들어간 글자가 있다',
  );
});

test('같은 갈래 글자는 자기 자신을 뺀다', () => {
  for (const g of GLYPHS) {
    const rel = relatedGlyphs(g.slug);
    assert.ok(!rel.some(o => o.slug === g.slug), `${g.slug}: 자기 자신이 들어 있다`);
    assert.ok(rel.every(o => o.kind === g.kind), `${g.slug}: 다른 갈래가 섞였다`);
  }
});

test('여덟 언어가 모두 채워져 있다', () => {
  const f = glyphFacts(glyphOf('black-star')!);
  for (const lang of LANG8_CODES) {
    const ui = GLYPH_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
    }
    assert.equal(ui.how.length, 4, `${lang}: 설명 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.glyphFaq(f, ui.kindLabel.star).length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const k of GLYPH_KINDS) {
      assert.ok(ui.kindLabel[k], `${lang}: ${k} 이름이 없다`);
      assert.ok(ui.kindNote[k]?.length >= 10, `${lang}: ${k} 설명이 없다`);
    }
  }
});

test('FAQ 답이 그 글자의 값을 담고 있다', () => {
  for (const slug of ['heavy-heart', 'arrow-right', 'won']) {
    const g = glyphOf(slug)!;
    const f = glyphFacts(g);
    for (const lang of LANG8_CODES) {
      const ui = GLYPH_UI[lang];
      const joined = ui.glyphFaq(f, ui.kindLabel[g.kind]).map(x => `${x.q} ${x.a}`).join(' ');
      assert.ok(joined.includes(g.char), `${lang}/${slug}: 글자가 안 들어갔다`);
      assert.ok(joined.includes(f.unicode), `${lang}/${slug}: 유니코드가 안 들어갔다`);
      assert.ok(joined.includes(f.entity), `${lang}/${slug}: 엔티티가 안 들어갔다`);
    }
  }
});

test('모든 글자가 여덟 언어 메타를 만든다', () => {
  for (const g of GLYPHS) {
    const f = glyphFacts(g);
    for (const lang of LANG8_CODES) {
      const ui = GLYPH_UI[lang];
      assert.ok(ui.metaTitle(g.char).includes(g.char), `${lang}/${g.slug}: 제목에 글자가 없다`);
      const desc = ui.metaDesc(f, ui.kindLabel[g.kind]);
      assert.ok(desc.includes(f.unicode), `${lang}/${g.slug}: 설명에 유니코드가 없다`);
      assert.ok(desc.length > 40, `${lang}/${g.slug}: 설명이 너무 짧다`);
    }
  }
});

test('힌디어 문구에 라틴 낱말이 새지 않는다', () => {
  const ui = GLYPH_UI.hi;
  const texts = [ui.hubTitle, ui.hubLead, ...ui.how, ...ui.hubFaq.map(x => `${x.q} ${x.a}`), ...Object.values(ui.kindNote)];
  for (const t of texts) {
    const stripped = t
      .replace(/&[a-z#0-9]+;/g, '')
      .replace(/content|Unicode|UTF-8|HTML|CSS|Command|Option|Control|Space|Windows|macOS/g, '');
    assert.ok(!/[A-Za-z]{5,}/.test(stripped), `힌디어에 라틴 낱말이 남았다: ${t}`);
  }
});

test('글자 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[GLYPH_ICON], 'letters', '이모지가 글자 아이콘으로 이어지지 않는다');
});
