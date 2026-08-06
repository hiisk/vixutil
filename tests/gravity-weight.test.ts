/**
 * 천체별 몸무게가 스스로 어긋나지 않는지 본다.
 *
 * 저울에 찍히는 값은 중력비에 비례한다. 그래서 검사는 되돌린다 — 달에서 잰 값에
 * 지구 중력을 곱하고 달 중력으로 나누면 다시 지구 몸무게가 나와야 한다.
 *
 * 힘(뉴턴)은 다른 길이다. 질량 × 중력가속도이므로, 저울 값에서 다시 힘을 내면
 * 같은 자리에서 만나야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { BODIES, EARTH_G, GRAVITY_ICON, GRAVITY_SLUGS, HEAVIEST, LIGHTEST, WEIGHTS, weightOf } from '../lib/gravity/list.ts';
import { gravityFacts, heavierThanEarth, lighterThanEarth, neighbours, newtonOf, onBody } from '../lib/gravity/facts.ts';
import { GRAVITY_UI } from '../lib/gravity/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(WEIGHTS.length >= 100, `${WEIGHTS.length}가지뿐이다`);
  assert.equal(WEIGHTS.length, HEAVIEST - LIGHTEST + 1);
  assert.equal(WEIGHTS.length, 131);
  assert.equal(new Set(GRAVITY_SLUGS).size, WEIGHTS.length, 'slug 중복');
  assert.equal(weightOf('70'), 70);
  assert.equal(weightOf('19'), undefined);
  assert.equal(weightOf('151'), undefined);
});

test('천체 목록이 지구를 기준으로 서 있다', () => {
  const earth = BODIES.find(b => b.key === 'earth');
  assert.ok(earth, '지구가 목록에 없다');
  assert.equal(earth!.g, EARTH_G, '지구 중력이 기준값과 다르다');
  assert.equal(new Set(BODIES.map(b => b.key)).size, BODIES.length, '천체가 겹친다');
  for (const b of BODIES) assert.ok(b.g > 0, `${b.key}: 중력이 0 이하다`);
  // 널리 실린 값들
  assert.ok(Math.abs(BODIES.find(b => b.key === 'moon')!.g - 1.62) < 0.01);
  assert.ok(Math.abs(BODIES.find(b => b.key === 'mars')!.g - 3.72) < 0.01);
});

test('저울 값을 되돌리면 지구 몸무게가 나온다', () => {
  for (const kg of WEIGHTS) {
    for (const b of gravityFacts(kg).bodies) {
      const back = (b.kg * EARTH_G) / b.g;
      // 소수 한 자리에서 반올림했으므로 그만큼 어긋날 수 있다
      assert.ok(Math.abs(back - kg) < 0.6, `${kg}kg ${b.key}: 되돌리면 ${back.toFixed(2)}kg가 된다`);
    }
  }
  assert.equal(onBody(70, EARTH_G), 70, '지구에서는 그대로다');
  assert.equal(onBody(60, 1.62), 9.91, '달에서는 6분의 1쯤이다');
});

test('힘과 저울 값이 같은 자리에서 만난다', () => {
  for (const kg of WEIGHTS) {
    const f = gravityFacts(kg);
    assert.equal(f.earthNewton, newtonOf(kg, EARTH_G));
    for (const b of f.bodies) {
      // 힘 = 질량 × 중력가속도. 질량은 어디서나 지구에서 잰 값 그대로다
      assert.ok(Math.abs(b.newton - kg * b.g) < 0.06, `${kg}kg ${b.key}: 힘이 어긋난다`);
      // 저울 값에 지구 중력을 곱해도 같은 힘이 나온다
      assert.ok(Math.abs(b.kg * EARTH_G - b.newton) < 6, `${kg}kg ${b.key}: 두 길이 갈렸다`);
    }
  }
  assert.ok(Math.abs(newtonOf(70, EARTH_G) - 686.5) < 0.1);
});

test('중력비가 저울 값의 비와 같다', () => {
  for (const kg of WEIGHTS) {
    for (const b of gravityFacts(kg).bodies) {
      assert.ok(Math.abs(b.ratio - b.g / EARTH_G) < 0.001, `${b.key}: 중력비가 다르다`);
      assert.ok(Math.abs(b.kg / kg - b.ratio) < 0.01, `${kg}kg ${b.key}: 저울 값의 비가 중력비와 다르다`);
    }
  }
  const moon = gravityFacts(60).bodies.find(b => b.key === 'moon')!;
  assert.ok(Math.abs(moon.ratio - 1 / 6) < 0.01, '달은 지구의 6분의 1쯤이다');
  assert.equal(gravityFacts(70).bodies.find(b => b.key === 'earth')!.ratio, 1);
});

test('무거워지면 어디서나 무거워진다', () => {
  for (const kg of WEIGHTS) {
    const f = gravityFacts(kg);
    if (f.heavier === null) continue;
    const up = gravityFacts(f.heavier);
    for (let i = 0; i < f.bodies.length; i++) {
      assert.ok(up.bodies[i].kg >= f.bodies[i].kg, `${kg}kg ${f.bodies[i].key}: 무거워졌는데 값이 줄었다`);
      assert.ok(up.bodies[i].newton > f.bodies[i].newton, `${kg}kg ${f.bodies[i].key}: 힘이 줄었다`);
    }
  }
  assert.equal(gravityFacts(LIGHTEST).lighter, null);
  assert.equal(gravityFacts(HEAVIEST).heavier, null);
});

test('지구보다 센 곳과 약한 곳을 가른다', () => {
  const heavy = heavierThanEarth();
  const light = lighterThanEarth();
  assert.deepEqual(heavy, ['sun', 'jupiter', 'saturn', 'neptune']);
  assert.equal(heavy.length + light.length + 1, BODIES.length, '지구가 어느 쪽에도 들지 않아야 한다');
  assert.ok(!heavy.includes('earth') && !light.includes('earth'));
  for (const key of heavy) {
    assert.ok(gravityFacts(70).bodies.find(b => b.key === key)!.kg > 70, `${key}: 더 무겁게 재지 않았다`);
  }
  for (const key of light) {
    assert.ok(gravityFacts(70).bodies.find(b => b.key === key)!.kg < 70, `${key}: 더 가볍게 재지 않았다`);
  }
});

test('뛰는 높이는 중력에 반비례한다', () => {
  const f = gravityFacts(70);
  // 달 중력이 지구의 6분의 1쯤이니 여섯 배쯤 뛴다
  assert.ok(f.moonJump > 50 * 5 && f.moonJump < 50 * 7, `달 점프가 ${f.moonJump}cm다`);
  // 몸무게와 무관하다 — 무거워도 가벼워도 뛰는 높이의 비는 같다
  for (const kg of WEIGHTS) assert.equal(gravityFacts(kg).moonJump, f.moonJump, `${kg}kg: 점프 높이가 몸무게에 딸려 갔다`);
});

test('이웃이 자기 자신을 뺀다', () => {
  for (const kg of WEIGHTS) {
    const list = neighbours(kg);
    assert.ok(!list.includes(kg), `${kg}kg: 이웃에 자기 자신이 있다`);
    assert.ok(list.length > 0, `${kg}kg: 이웃이 없다`);
    for (const o of list) assert.ok(o >= LIGHTEST && o <= HEAVIEST, `${kg}kg: 이웃이 구간을 벗어났다`);
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = gravityFacts(70);
  for (const lang of LANG_CODES) {
    const ui = GRAVITY_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f),
      ...ui.gravityFaq(f).flatMap(q => [q.q, q.a]),
      ...BODIES.map(b => ui.bodyName(b.key)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('천체 이름이 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    const names = BODIES.map(b => GRAVITY_UI[lang].bodyName(b.key));
    assert.equal(new Set(names).size, BODIES.length, `${lang}: 천체 이름이 겹친다`);
    for (const n of names) assert.ok(n.trim().length > 0, `${lang}: 빈 천체 이름`);
  }
  assert.equal(GRAVITY_UI.ko.bodyName('mars'), '화성');
  assert.equal(GRAVITY_UI.en.bodyName('mars'), 'Mars');
  assert.equal(GRAVITY_UI.ja.bodyName('mars'), '火星');
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = gravityFacts(70);
  for (const lang of LANG_CODES) {
    const ui = GRAVITY_UI[lang];
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
    assert.equal(ui.gravityFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 질량과 무게를 가르는 것이 이 표의 전제라 그 설명이 짧으면 안 된다
    assert.ok(ui.massNote.length >= floor * 4, `${lang}: 질량 설명이 짧다`);
  }
});

test('지구 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[GRAVITY_ICON], 'globe', '이모지가 지구 아이콘으로 이어지지 않는다');
});
