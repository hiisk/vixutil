/**
 * CSS 속성 사전이 스스로 어긋나지 않는지 본다.
 *
 * 위험한 곳은 단축 관계다. margin이 margin-top을 정한다고 적어 놓고 margin-top
 * 쪽에서는 아무 말이 없으면, 어느 페이지로 들어왔느냐에 따라 다른 이야기를 하게
 * 된다. 그래서 양방향을 대조한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { CSS_PROPS, CSS_ICON, CSS_PROP_NAMES, PROP_KINDS, cssPropOf, propsOfKind } from '../lib/css/props.ts';
import { propFacts, relatedProps } from '../lib/css/facts.ts';
import { CSS_DESC, propDesc } from '../lib/css/desc.ts';
import { CSS_UI } from '../lib/css/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

test('100개가 넘는다', () => {
  assert.ok(CSS_PROPS.length >= 100, `${CSS_PROPS.length}개뿐이다`);
});

test('속성 이름이 겹치지 않고 주소로 쓸 수 있다', () => {
  assert.equal(new Set(CSS_PROP_NAMES).size, CSS_PROPS.length, '이름 중복');
  for (const p of CSS_PROPS) {
    assert.match(p.name, /^[a-z-]+$/, `주소에 못 쓰는 이름: ${p.name}`);
    assert.ok(!p.name.endsWith('-'), `${p.name}: 하이픈으로 끝난다`);
  }
});

test('단축 관계가 양방향으로 맞는다', () => {
  /*
    이 검사가 이 파일의 이유다. margin이 margin-top을 정한다고 했으면
    margin-top 쪽에서도 margin이 보여야 한다. 한쪽만 고치고 넘어가기 쉬운 자리다.
  */
  for (const p of CSS_PROPS) {
    const f = propFacts(p);
    for (const child of f.shorthandFor) {
      const c = cssPropOf(child);
      assert.ok(c, `${p.name}이 없는 속성 ${child}를 가리킨다`);
      assert.ok(propFacts(c!).partOf.includes(p.name), `${child}가 ${p.name}을 되가리키지 않는다`);
    }
    for (const parent of f.partOf) {
      assert.ok(propFacts(cssPropOf(parent)!).shorthandFor.includes(p.name), `${parent}가 ${p.name}을 안 가리킨다`);
    }
    assert.ok(!f.shorthandFor.includes(p.name), `${p.name}: 자기 자신을 가리킨다`);
  }
  assert.deepEqual(propFacts(cssPropOf('margin')!).shorthandFor, ['margin-top', 'margin-right', 'margin-bottom', 'margin-left']);
  assert.deepEqual(propFacts(cssPropOf('margin-top')!).partOf, ['margin']);
});

test('상속 표시가 알려진 사실과 맞는다', () => {
  // 상속되는 것과 안 되는 것을 섞으면 페이지가 정반대를 말하게 된다
  for (const n of [
    'color', 'font-size', 'font-family', 'line-height', 'text-align', 'visibility', 'cursor',
    'direction', 'tab-size', 'text-align-last', 'text-underline-offset', 'font-stretch',
    'empty-cells', 'orphans', 'widows',
    'line-break', 'font-feature-settings', 'text-orientation', 'font-variant',
    'forced-color-adjust', 'print-color-adjust',
  ]) {
    assert.ok(propFacts(cssPropOf(n)!).inherited, `${n}은 상속되는 속성이다`);
  }
  for (const n of [
    'margin', 'padding', 'display', 'position', 'width', 'background-color', 'border', 'opacity',
    'contain', 'content-visibility', 'inline-size', 'block-size', 'appearance',
    'rotate', 'scale', 'translate', 'columns', 'mask', 'break-after',
    'zoom', 'grid-template', 'max-inline-size', 'transform-style', 'scroll-margin',
    'mask-size', 'column-span', 'border-inline',
  ]) {
    assert.ok(!propFacts(cssPropOf(n)!).inherited, `${n}은 상속되지 않는 속성이다`);
  }
});

test('쓰는 꼴이 이름과 값에서 만들어진다', () => {
  for (const p of CSS_PROPS) {
    const f = propFacts(p);
    assert.ok(f.example.startsWith(`${p.name}: `), `${p.name}: 보기가 이름으로 시작하지 않는다`);
    assert.ok(f.example.endsWith(';'), `${p.name}: 보기가 세미콜론으로 끝나지 않는다`);
    if (p.values?.length) assert.ok(f.example.includes(p.values[0]), `${p.name}: 보기에 첫 값이 없다`);
  }
  assert.equal(propFacts(cssPropOf('display')!).example, 'display: block;');
});

test('갈래가 빈 곳 없이 덮는다', () => {
  for (const k of PROP_KINDS) assert.ok(propsOfKind(k).length > 0, `${k} 갈래가 비었다`);
  assert.equal(
    PROP_KINDS.reduce((n, k) => n + propsOfKind(k).length, 0),
    CSS_PROPS.length,
    '갈래에 안 들어간 속성이 있다',
  );
});

test('모든 속성에 열 언어 설명이 있다', () => {
  for (const p of CSS_PROPS) {
    const row = CSS_DESC[p.name];
    assert.ok(row, `${p.name}: 설명이 없다`);
    assert.equal(row.length, 10, `${p.name}: 열 칸이 아니다`);
    for (const lang of LANG_CODES) {
      // 한국어와 일본어는 같은 뜻을 절반 길이로 적는다 — "上側の外の余白です。"가 열 자다
      const floor = DENSE.has(lang) ? 6 : 10;
      const d = propDesc(p.name, lang).trim();
      assert.ok(d.length > floor, `${p.name}/${lang}: 설명이 비었거나 너무 짧다 (${d.length}자)`);
    }
  }
  const extra = Object.keys(CSS_DESC).filter(k => !CSS_PROP_NAMES.includes(k));
  assert.deepEqual(extra, [], `데이터에 없는 속성의 설명: ${extra.join(', ')}`);
});

test('언어끼리 글자가 섞이지 않는다', () => {
  for (const p of CSS_PROPS) {
    for (const lang of LANG_CODES) {
      const d = propDesc(p.name, lang);
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(d), `${p.name}/${lang}: 한글이 섞였다`);
      if (lang !== 'ja' && lang !== 'ko') assert.ok(!/[ぁ-んァ-ヶ]/.test(d), `${p.name}/${lang}: 가나가 섞였다`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(d), `${p.name}/${lang}: 데바나가리가 섞였다`);
    }
  }
});

test('견줄 속성은 자기 자신을 빼고 관계 있는 것을 먼저 준다', () => {
  for (const p of CSS_PROPS) {
    const rel = relatedProps(p.name);
    assert.ok(rel.length > 0, `${p.name}: 견줄 것이 없다`);
    assert.ok(!rel.includes(p.name), `${p.name}: 자기 자신이 들어 있다`);
    assert.equal(new Set(rel).size, rel.length, `${p.name}: 중복`);
    const f = propFacts(p);
    if (f.shorthandFor.length) assert.equal(rel[0], f.shorthandFor[0], `${p.name}: 단축 관계가 앞에 오지 않는다`);
  }
});

test('문서 주소가 속성 이름을 담는다', () => {
  for (const p of CSS_PROPS) {
    const url = propFacts(p).docUrl;
    assert.match(url, /^https:\/\//, `${p.name}: 주소 꼴이 아니다`);
    assert.ok(url.endsWith(`/${p.name}`), `${p.name}: 주소가 속성을 가리키지 않는다`);
  }
});

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = propFacts(cssPropOf('margin')!);
  for (const lang of LANG_CODES) {
    const ui = CSS_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
      if (typeof val === 'string') assert.equal(hanProblem(lang, val), '');
    }
    assert.equal(ui.how.length, 4, `${lang}: 설명 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.propFaq(f, 'x', 'y').length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const k of PROP_KINDS) {
      assert.ok(ui.kindLabel[k], `${lang}: ${k} 이름이 없다`);
      assert.ok(ui.kindNote[k]?.length >= 10, `${lang}: ${k} 설명이 없다`);
    }
  }
});

test('FAQ가 상속되는 속성과 아닌 속성을 다르게 말한다', () => {
  for (const lang of LANG_CODES) {
    const ui = CSS_UI[lang];
    const color = ui.propFaq(propFacts(cssPropOf('color')!), 'x', 'y')[2].a;
    const margin = ui.propFaq(propFacts(cssPropOf('margin')!), 'x', 'y')[2].a;
    assert.notEqual(color, margin, `${lang}: 상속 여부에 관계없이 같은 답이 나온다`);
  }
});

test('모든 속성이 열 언어 메타를 만든다', () => {
  for (const p of CSS_PROPS) {
    for (const lang of LANG_CODES) {
      const ui = CSS_UI[lang];
      const title = ui.metaTitle(p.name);
      const desc = ui.metaDesc(p.name, propDesc(p.name, lang));
      assert.ok(title.includes(p.name), `${lang}/${p.name}: 제목에 이름이 없다`);
      assert.ok(desc.includes(p.name), `${lang}/${p.name}: 설명에 이름이 없다`);
      // 한국어와 일본어는 같은 뜻을 절반 길이로 적는다
      const floor = DENSE.has(lang) ? 25 : 40;
      assert.ok(desc.length > floor, `${lang}/${p.name}: 설명이 너무 짧다 (${desc.length}자)`);
    }
  }
});

test('CSS 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[CSS_ICON], 'palette', '이모지가 팔레트 아이콘으로 이어지지 않는다');
});
