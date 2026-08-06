/**
 * 정지거리가 스스로 어긋나지 않는지 본다.
 *
 * 제동거리는 v² ÷ (2μg)로 냈으므로, 검사는 그 식을 거꾸로 푼다 — 제동거리에
 * 2μg를 곱해 제곱근을 씌우면 다시 그 초속이 나와야 한다.
 *
 * 이 표가 말하려는 것은 "속도가 두 배면 제동거리는 네 배"다. 그래서 절반
 * 속도의 제동거리와 견주어 네 배가 되는지도 141가지 전부에서 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { FASTEST, LIMITS, REACTION_SEC, SLOWEST, SPEEDS, STOP_ICON, STOP_SLUGS, SURFACES, speedOf } from '../lib/stop/list.ts';
import { ROUND_SPEEDS, brakingOf, msOf, neighbours, reactionOf, stopFacts } from '../lib/stop/facts.ts';
import { STOP_UI } from '../lib/stop/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(SPEEDS.length >= 100, `${SPEEDS.length}가지뿐이다`);
  assert.equal(SPEEDS.length, FASTEST - SLOWEST + 1);
  assert.equal(SPEEDS.length, 171);
  assert.equal(new Set(STOP_SLUGS).size, SPEEDS.length, 'slug 중복');
  assert.equal(speedOf('60'), 60);
  assert.equal(speedOf('9'), undefined);
  assert.equal(speedOf('181'), undefined);
  // 제한속도로 흔한 값이 모두 표 안에 있다
  for (const v of LIMITS) assert.ok(SPEEDS.includes(v), `${v}km/h가 표에 없다`);
});

test('초속을 되돌리면 그 시속이 된다', () => {
  for (const v of SPEEDS) {
    const ms = msOf(v);
    assert.ok(Math.abs((ms * 3600) / 1000 - v) < 0.01, `${v}km/h: 되돌리면 ${(ms * 3600) / 1000}이다`);
    // 공주거리는 초속 × 반응시간이다
    assert.ok(Math.abs(reactionOf(v) - ms * REACTION_SEC) < 0.06, `${v}km/h: 공주거리가 어긋난다`);
  }
  assert.equal(msOf(36), 10, '시속 36km는 초속 10m');
  assert.equal(msOf(100), 27.778);
});

test('제동거리를 식으로 되돌리면 그 속도가 나온다', () => {
  for (const v of SPEEDS) {
    for (const s of SURFACES) {
      const d = brakingOf(v, s.mu);
      // d = v² ÷ (2μg) 이므로 v = √(2μg·d)
      const back = Math.sqrt(2 * s.mu * 9.81 * d);
      assert.ok(Math.abs((back * 3600) / 1000 - v) < 0.3, `${v}km/h ${s.key}: 되돌리면 ${(back * 3600) / 1000}이다`);
      assert.ok(d > 0, `${v}km/h ${s.key}: 제동거리가 0 이하다`);
    }
  }
  // 교재에 실리는 값 언저리인지 — 100km/h 마른 노면은 50m쯤이다
  assert.ok(Math.abs(brakingOf(100, 0.8) - 49.2) < 0.2);
  assert.ok(Math.abs(brakingOf(50, 0.8) - 12.3) < 0.2);
});

test('속도가 두 배면 제동거리는 네 배다', () => {
  for (const v of SPEEDS) {
    const f = stopFacts(v);
    if (f.halfBraking === null) continue;
    const half = Math.round(v / 2);
    // 반올림한 절반이라 정확히 두 배는 아니다 — 비율로 견준다
    const expected = f.surfaces[0].braking * (half / v) ** 2;
    assert.ok(Math.abs(f.halfBraking - expected) < 0.3, `${v}km/h: 절반 속도의 제동거리가 ${f.halfBraking}인데 ${expected.toFixed(1)}이어야 한다`);
  }
  // 40과 80을 곧장 견준다
  assert.ok(Math.abs(brakingOf(80, 0.8) / brakingOf(40, 0.8) - 4) < 0.02, '두 배 속도에 네 배 제동거리');
  assert.ok(Math.abs(brakingOf(120, 0.5) / brakingOf(60, 0.5) - 4) < 0.02);
});

test('노면이 미끄러울수록 멀리 간다', () => {
  for (const v of SPEEDS) {
    const f = stopFacts(v);
    assert.equal(f.surfaces.length, SURFACES.length);
    for (let i = 1; i < f.surfaces.length; i++) {
      assert.ok(f.surfaces[i].mu < f.surfaces[i - 1].mu, `${v}km/h: 마찰계수 순서가 뒤집혔다`);
      assert.ok(f.surfaces[i].braking > f.surfaces[i - 1].braking, `${v}km/h: ${f.surfaces[i].key}가 더 짧게 나왔다`);
    }
    for (const s of f.surfaces) {
      // 총 정지거리는 공주 + 제동이다
      assert.ok(Math.abs(s.total - (f.reaction + s.braking)) < 0.11, `${v}km/h ${s.key}: 합이 다르다`);
      assert.ok(s.total > s.braking, `${v}km/h ${s.key}: 공주거리가 빠졌다`);
      assert.ok(Math.abs(s.cars - s.total / 4.5) < 0.06, `${v}km/h ${s.key}: 차 대수가 어긋난다`);
    }
    assert.equal(f.dryTotal, f.surfaces[0].total);
  }
});

test('빠를수록 모든 거리가 길어진다', () => {
  for (const v of SPEEDS) {
    const f = stopFacts(v);
    if (f.faster === null) continue;
    const n = stopFacts(f.faster);
    assert.ok(n.reaction >= f.reaction, `${v}km/h: 공주거리가 줄었다`);
    assert.ok(n.ms > f.ms, `${v}km/h: 초속이 줄었다`);
    for (let i = 0; i < f.surfaces.length; i++) {
      assert.ok(n.surfaces[i].braking > f.surfaces[i].braking, `${v}km/h: ${f.surfaces[i].key} 제동거리가 줄었다`);
    }
  }
  assert.equal(stopFacts(SLOWEST).slower, null);
  assert.equal(stopFacts(FASTEST).faster, null);
});

test('눈금과 이웃이 제자리에 있다', () => {
  assert.deepEqual(ROUND_SPEEDS, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180]);
  for (const v of SPEEDS) {
    const list = neighbours(v);
    assert.ok(!list.includes(v), `${v}km/h: 이웃에 자기 자신이 있다`);
    assert.ok(list.length > 0, `${v}km/h: 이웃이 없다`);
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = stopFacts(60);
  for (const lang of LANG_CODES) {
    const ui = STOP_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f),
      ...ui.stopFaq(f).flatMap(q => [q.q, q.a]),
      ...SURFACES.map(s => ui.surfaceName(s.key)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('노면 이름이 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    const names = SURFACES.map(s => STOP_UI[lang].surfaceName(s.key));
    assert.equal(new Set(names).size, SURFACES.length, `${lang}: 노면 이름이 겹친다`);
    for (const n of names) assert.ok(n.trim().length > 0, `${lang}: 빈 노면 이름`);
  }
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = stopFacts(60);
  for (const lang of LANG_CODES) {
    const ui = STOP_UI[lang];
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
    assert.equal(ui.stopFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 이 표가 어림이라는 것은 열 언어 모두에 적혀 있어야 한다
    assert.ok(ui.caution.length >= floor * 3, `${lang}: 주의 문구가 짧다`);
  }
});

test('자동차 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.ok(ICON_FOR[STOP_ICON], '이모지가 아이콘으로 이어지지 않는다');
});
