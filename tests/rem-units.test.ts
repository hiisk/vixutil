/**
 * CSS 단위 환산이 스스로 어긋나지 않는지 본다.
 *
 * CSS가 못 박아 둔 것은 세 줄이다 — 1in = 96px, 1pt = 1/72in, 1pc = 12pt.
 * 그래서 검사는 그 정의로 되돌린다. pt를 인치로 되돌려 96을 곱하면 다시 그
 * 픽셀이 나와야 하고, 밀리미터는 인치의 25.4배여야 한다.
 *
 * rem은 루트 글자 크기(16px)에 대한 배수라, 곱해서 되돌리면 픽셀이 된다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { MAX_PX, PIXELS, PX_ICON, PX_SLUGS, ROOT_PX, pxOf } from '../lib/rem/list.ts';
import { COMMON, neighbours, ptOf, pxFacts, remOf, wholePts, wholeRems } from '../lib/rem/facts.ts';
import { PX_UI } from '../lib/rem/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(PIXELS.length >= 100, `${PIXELS.length}가지뿐이다`);
  assert.equal(PIXELS.length, MAX_PX);
  assert.equal(new Set(PX_SLUGS).size, PIXELS.length, 'slug 중복');
  assert.equal(pxOf('16'), 16);
  assert.equal(pxOf('016'), undefined, '앞에 0이 붙은 주소는 받지 않는다');
  assert.equal(pxOf('145'), undefined);
});

test('rem을 되돌리면 그 픽셀이 나온다', () => {
  for (const px of PIXELS) {
    const f = pxFacts(px);
    assert.ok(Math.abs(f.rem * ROOT_PX - px) < 0.001, `${px}px: ${f.rem}rem을 되돌리면 ${f.rem * ROOT_PX}이다`);
    // 백분율은 rem의 100배다
    assert.ok(Math.abs(f.percent - f.rem * 100) < 0.01, `${px}px: %와 rem이 어긋난다`);
  }
  assert.equal(remOf(16), 1, '기본 글자 크기가 1rem이다');
  assert.equal(remOf(8), 0.5);
  assert.equal(remOf(24), 1.5);
  assert.equal(pxFacts(16).percent, 100);
});

test('pt를 인치로 되돌려 96을 곱하면 그 픽셀이다', () => {
  for (const px of PIXELS) {
    const f = pxFacts(px);
    // 1pt = 1/72인치, 1인치 = 96px
    assert.ok(Math.abs((f.pt / 72) * 96 - px) < 0.001, `${px}px: ${f.pt}pt를 되돌리면 어긋난다`);
    assert.ok(Math.abs(f.pc * 12 - f.pt) < 0.001, `${px}px: 1pc가 12pt가 아니다`);
    assert.ok(Math.abs(f.inch * 96 - px) < 0.002, `${px}px: 인치를 되돌리면 어긋난다`);
  }
  assert.equal(ptOf(16), 12, '16px은 12pt다');
  assert.equal(ptOf(12), 9);
  assert.equal(ptOf(96), 72, '1인치는 72pt다');
});

test('밀리미터와 센티미터가 인치에서 나온다', () => {
  for (const px of PIXELS) {
    const f = pxFacts(px);
    assert.ok(Math.abs(f.mm - f.inch * 25.4) < 0.01, `${px}px: mm가 인치의 25.4배가 아니다`);
    assert.ok(Math.abs(f.cm * 10 - f.mm) < 0.01, `${px}px: cm와 mm가 어긋난다`);
  }
  assert.equal(pxFacts(96).inch, 1, '96px이 1인치다');
  assert.equal(pxFacts(96).mm, 25.4);
});

test('값이 픽셀과 함께 커진다', () => {
  for (const px of PIXELS) {
    const f = pxFacts(px);
    if (f.next === null) continue;
    const n = pxFacts(f.next);
    for (const key of ['rem', 'pt', 'pc', 'inch', 'mm', 'cm', 'percent'] as const) {
      assert.ok(n[key] > f[key], `${px}px → ${f.next}px: ${key}가 커지지 않았다`);
    }
  }
});

test('딱 떨어지는 값을 가른다', () => {
  assert.deepEqual(wholeRems(), [16, 32, 48, 64, 80, 96, 112, 128, 144]);
  for (const px of wholeRems()) {
    assert.ok(Number.isInteger(pxFacts(px).rem), `${px}px: rem이 정수가 아니다`);
    assert.equal(px % ROOT_PX, 0);
  }
  // pt가 정수인 픽셀은 4의 배수다 — 4px = 3pt이기 때문이다
  for (const px of wholePts()) assert.equal(px % 4, 0, `${px}px: 4의 배수가 아닌데 pt가 정수다`);
  assert.equal(wholePts().length, Math.floor(MAX_PX / 4));
  for (const px of PIXELS) {
    assert.equal(pxFacts(px).wholeRem, wholeRems().includes(px), `${px}px: rem 판단이 다르다`);
    assert.equal(pxFacts(px).wholePt, wholePts().includes(px), `${px}px: pt 판단이 다르다`);
  }
});

test('흔히 쓰는 값이 모두 목록 안에 있다', () => {
  for (const px of COMMON) assert.ok(PIXELS.includes(px), `${px}px가 목록에 없다`);
  assert.equal(new Set(COMMON).size, COMMON.length, '겹친 값이 있다');
  for (const px of PIXELS) {
    const list = neighbours(px);
    assert.ok(!list.includes(px), `${px}px: 이웃에 자기 자신이 있다`);
  }
  assert.equal(pxFacts(1).prev, null);
  assert.equal(pxFacts(MAX_PX).next, null);
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = pxFacts(16);
  for (const lang of LANG_CODES) {
    const ui = PX_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f),
      ui.desc(pxFacts(14)),
      ...ui.pxFaq(f).flatMap(q => [q.q, q.a]),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = pxFacts(16);
  for (const lang of LANG_CODES) {
    const ui = PX_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 질문이 다섯이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.pxFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 96은 이 표 전체의 전제라 열 언어 모두에 적혀 있어야 한다
    assert.ok(ui.absoluteNote.includes('96'), `${lang}: 1인치 = 96px가 적혀 있지 않다`);
  }
});

test('자 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.ok(ICON_FOR[PX_ICON], '이모지가 아이콘으로 이어지지 않는다');
});
