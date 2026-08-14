import { test } from 'node:test';
import assert from 'node:assert/strict';

import { LANG_CODES } from '../lib/i18n/lang.ts';
import { NAMED_COLORS_8, namedColor } from '../lib/color/named8.ts';
import { colorFacts } from '../lib/color/facts.ts';
import { COLOR_UI } from '../lib/color/ui.ts';
import { HEX_UI } from '../lib/color/hex-ui.ts';
import {
  HEX_COUNT, HEX_PREFIX,
  allHexShorts, expandHex, hexSlug, parseHexSlug, familyOfHex,
  nearestNamedColors, neighborHexShorts,
} from '../lib/color/hex-grid.ts';
import { hexLeafProps } from '../lib/color/hex-leaf.ts';

/**
 * hex 낱장 4,096색의 셈.
 *
 * 이 계열은 **이름 있는 색과 같은 라우트를 쓴다**. 그래서 가장 무서운 것은 두
 * 주소 공간이 겹치는 것이다 — 겹치면 어느 한쪽이 통째로 안 보인다. 그것부터 본다.
 */

test('세 자리 hex 4,096가지가 빠짐없이 나온다', () => {
  const all = allHexShorts();
  assert.equal(all.length, HEX_COUNT);
  assert.equal(all.length, 16 ** 3);
  assert.equal(new Set(all).size, HEX_COUNT, '같은 값이 두 번 있다');
  for (const s of all) assert.match(s, /^[0-9a-f]{3}$/, `${s}가 세 자리 hex가 아니다`);
  /* 끝값이 다 있다 */
  for (const s of ['000', 'fff', '00f', 'f00', '0f0']) assert.ok(all.includes(s), `${s}가 없다`);
});

test('이름 있는 색과 주소가 겹치지 않는다', () => {
  /*
   * 겹치면 같은 라우트에서 한쪽이 가려진다. 양쪽에서 본다 —
   * 이름 slug가 hex로 읽히지 않는지, hex slug가 이름으로 읽히지 않는지.
   */
  for (const c of NAMED_COLORS_8) {
    assert.equal(parseHexSlug(c.slug), null, `이름 색 ${c.slug}가 hex 주소로 읽힌다`);
  }
  for (const s of allHexShorts()) {
    assert.equal(namedColor(hexSlug(s)), undefined, `hex 주소 ${hexSlug(s)}가 이름 색으로 읽힌다`);
  }
  assert.ok(NAMED_COLORS_8.every(c => !c.slug.startsWith(HEX_PREFIX)));
});

test('주소 조각과 값이 서로의 역이다', () => {
  for (const s of allHexShorts()) assert.equal(parseHexSlug(hexSlug(s)), s);
});

test('대문자와 이상한 꼴은 거른다', () => {
  /* hex-1A2도 받으면 같은 색이 두 주소가 되어 정경로가 갈라진다 */
  for (const bad of ['hex-1A2', 'hex-1a2b', 'hex-1a', 'hex-', 'hex-xyz', 'hex-1g2',
    '1a2', 'hex1a2', 'hex--1a2', 'HEX-1a2', 'hex-1a2 ']) {
    assert.equal(parseHexSlug(bad), null, `"${bad}"가 통과했다`);
  }
  assert.equal(parseHexSlug('hex-1a2'), '1a2');
});

test('세 자리를 여섯 자리로 늘리는 규칙이 CSS와 같다', () => {
  /* 밖에서 아는 값으로 못 박는다 — 각 자리를 두 번 쓴다 */
  assert.equal(expandHex('1a2'), '#11aa22');
  assert.equal(expandHex('fff'), '#ffffff');
  assert.equal(expandHex('000'), '#000000');
  assert.equal(expandHex('f00'), '#ff0000');
  assert.equal(expandHex('abc'), '#aabbcc');
  for (const s of allHexShorts()) assert.match(expandHex(s), /^#[0-9a-f]{6}$/);
});

test('4,096색이 서로 다른 색이다', () => {
  assert.equal(new Set(allHexShorts().map(expandHex)).size, HEX_COUNT, '같은 색이 두 번 나온다');
});

test('계열이 알 만한 색에서 맞다', () => {
  /* 함수를 돌려 답을 베끼지 않는다 — 눈으로 아는 색으로 선다 */
  assert.equal(familyOfHex('#ff0000'), 'red');
  assert.equal(familyOfHex('#00ff00'), 'green');
  assert.equal(familyOfHex('#0000ff'), 'blue');
  assert.equal(familyOfHex('#ffff00'), 'yellow');
  assert.equal(familyOfHex('#000000'), 'neutral');
  assert.equal(familyOfHex('#ffffff'), 'neutral');
  assert.equal(familyOfHex('#888888'), 'neutral');
  /* 어두운 주황은 사람 눈에 갈색이다 */
  assert.equal(familyOfHex('#663300'), 'brown');
});

test('계열 이름이 열 언어에 다 있다', () => {
  /* 계열 말은 COLOR_UI를 그대로 쓴다 — 한 언어라도 빠지면 그 언어에서 빈칸이 된다 */
  for (const lang of LANG_CODES) {
    for (const s of ['000', 'f00', '0f0', '00f', 'fc0', '808', '630']) {
      const label = COLOR_UI[lang].familyLabel[familyOfHex(expandHex(s))];
      assert.ok(label && label.length > 0, `${lang}에 ${s}의 계열 이름이 없다`);
    }
  }
});

test('이웃 여섯이 세 채널을 다 건드린다 — 안 그러면 격자가 끊긴다', () => {
  /*
   * 빨강·초록만 이으면 4,096칸이 파랑 값에 따라 열여섯 덩어리로 끊겨
   * 크롤러가 한 덩어리만 보고 만다. 채널마다 위아래 하나씩 나오는지 본다.
   */
  const n = neighborHexShorts('1a2');
  assert.equal(n.length, 6);
  assert.equal(new Set(n).size, 6, '같은 이웃이 두 번 있다');
  for (let ch = 0; ch < 3; ch++) {
    const changed = n.filter(x => x[ch] !== '1a2'[ch]);
    assert.equal(changed.length, 2, `${ch}번째 자리가 위아래로 안 움직인다`);
  }
});

test('이웃이 끝에서 반대쪽으로 감긴다', () => {
  assert.ok(neighborHexShorts('000').includes('f00'), '0에서 아래로 못 감긴다');
  assert.ok(neighborHexShorts('fff').includes('0ff'), 'f에서 위로 못 감긴다');
  for (const s of allHexShorts()) {
    for (const x of neighborHexShorts(s)) {
      assert.match(x, /^[0-9a-f]{3}$/, `${s}의 이웃 ${x}가 목록 밖이다`);
      assert.notEqual(x, s, `${s}가 자기 자신을 이웃으로 든다`);
    }
  }
});

test('4,096칸 모두 들어오는 링크가 여섯이다 — 고아가 없다', () => {
  const inbound = new Map<string, number>(allHexShorts().map(s => [s, 0]));
  for (const s of allHexShorts()) {
    for (const x of neighborHexShorts(s)) inbound.set(x, inbound.get(x)! + 1);
  }
  const wrong = [...inbound].filter(([, n]) => n !== 6);
  assert.deepEqual(wrong, [], `들어오는 링크가 여섯이 아닌 칸 ${wrong.length}개`);
});

test('이웃 관계가 대칭이다 — 서로를 가리킨다', () => {
  for (const s of ['000', 'fff', '1a2', '7f8']) {
    for (const x of neighborHexShorts(s)) {
      assert.ok(neighborHexShorts(x).includes(s), `${s}→${x}는 있는데 ${x}→${s}가 없다`);
    }
  }
});

test('가장 가까운 이름 색이 실제로 가장 가깝다', () => {
  /* 이름 있는 색 자신을 넣으면 자기가 1등이어야 한다 */
  for (const c of NAMED_COLORS_8.slice(0, 20)) {
    const short = c.hex.slice(1).split('').filter((_, i) => i % 2 === 0).join('');
    const near = nearestNamedColors(short, 3);
    assert.equal(near.length, 3);
    assert.ok(near.every(n => NAMED_COLORS_8.includes(n)), '목록 밖의 색이 섞였다');
  }
  /* 순검정에 가장 가까운 이름 색은 검정 계열이어야 한다 */
  const black = nearestNamedColors('000', 1)[0];
  assert.ok(colorFacts(black.hex).lum < 0.1, `#000의 가장 가까운 색이 ${black.hex}로 밝다`);
  const white = nearestNamedColors('fff', 1)[0];
  assert.ok(colorFacts(white.hex).lum > 0.8, `#fff의 가장 가까운 색이 ${white.hex}로 어둡다`);
});

test('낱장 props가 열 언어에서 다 채워진다', () => {
  for (const lang of LANG_CODES) {
    const p = hexLeafProps('1a2', lang);
    assert.equal(p.color.slug, 'hex-1a2');
    assert.equal(p.color.hex, '#11aa22');
    assert.ok(p.lead.length > 20, `${lang}: 머리글이 비었다`);
    assert.ok(!/undefined|\[object/.test(p.lead), `${lang}: 머리글에 undefined가 있다`);
    assert.equal(p.faq.length, 3, `${lang}: FAQ가 셋이 아니다`);
    for (const q of p.faq) {
      assert.ok(q.q.length > 5 && q.a.length > 30, `${lang}: FAQ가 비었다 — ${q.q}`);
      assert.ok(!/undefined/.test(q.q + q.a), `${lang}: FAQ에 undefined가 있다`);
    }
    /* 이름 있는 색 넷 + 이웃 hex 여섯 */
    assert.equal(p.nearby.length, 10, `${lang}: 가까운 색이 열이 아니다`);
    assert.ok(p.nearby.some(n => n.slug.startsWith(HEX_PREFIX)), '이웃 hex가 없다');
    assert.ok(p.nearby.some(n => !n.slug.startsWith(HEX_PREFIX)), '이름 있는 색이 없다');
    for (const n of p.nearby) assert.ok(n.name[lang], `${lang}: ${n.slug}의 이름이 비었다`);
  }
});

test('열 언어의 문구가 서로 다르다 — 폴백으로 영어가 새지 않는다', () => {
  /*
   * 이 저장소는 번역 폴백이 미번역을 가린 적이 있다(country·hanja). 사전 열쇠를
   * 직접 세는 대신, 같은 색의 열 언어 머리글이 열 가지로 다른지 본다.
   */
  const leads = LANG_CODES.map(l => hexLeafProps('1a2', l).lead);
  assert.equal(new Set(leads).size, LANG_CODES.length,
    `열 언어 머리글이 ${new Set(leads).size}가지뿐이다 — 어느 언어가 다른 언어를 그대로 쓴다`);
  const faqs = LANG_CODES.map(l => hexLeafProps('1a2', l).faq[0].q);
  assert.equal(new Set(faqs).size, LANG_CODES.length, 'FAQ 첫 물음이 언어마다 다르지 않다');
});

test('HEX_UI에 열 언어가 다 있다', () => {
  for (const lang of LANG_CODES) {
    assert.ok(HEX_UI[lang], `${lang}이 HEX_UI에 없다`);
    assert.ok(HEX_UI[lang].section.length > 0, `${lang}의 갈래 이름이 비었다`);
  }
  assert.equal(Object.keys(HEX_UI).length, LANG_CODES.length);
});

test('낱장마다 본문이 다르다', () => {
  /* 4,096색의 값이 겹치면 같은 페이지가 여러 주소로 서는 것이다 */
  const seen = new Map<string, string>();
  for (const s of allHexShorts()) {
    const f = colorFacts(expandHex(s));
    const body = [f.hex, f.rgb.r, f.rgb.g, f.rgb.b, f.onWhite, f.complement].join('|');
    assert.equal(seen.get(body), undefined, `${s}와 ${seen.get(body)}의 본문이 같다`);
    seen.set(body, s);
  }
});

test('오늘 날짜에 기대지 않는다', () => {
  assert.deepEqual(hexLeafProps('1a2', 'ko'), hexLeafProps('1a2', 'ko'));
});
