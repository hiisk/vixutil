/**
 * 고도별 값이 스스로 어긋나지 않는지 본다.
 *
 * 기압은 국제표준대기 식으로 냈으므로, 검사는 그 식을 거꾸로 푼다 — 기압에서
 * 고도를 되짚어 제자리로 오는지 본다. 지수 5.25588을 잘못 적으면 여기서 갈린다.
 *
 * 끓는점은 기압에서 나오는 값이라 기압이 낮을수록 반드시 낮아져야 하고,
 * 해수면에서는 정확히 100도가 되어야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { ALTITUDES, ALTITUDE_ICON, ALTITUDE_SLUGS, HIGHEST, LOWEST, PLACES, ROUND_ALTITUDES, STEP, altitudeOf } from '../lib/altitude/list.ts';
import { LAPSE, SEA_C, SEA_HPA, altitudeFacts, altitudeFromHpa, boilOf, hpaOf, neighbours, tempOf } from '../lib/altitude/facts.ts';
import { ALTITUDE_UI } from '../lib/altitude/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(ALTITUDES.length >= 100, `${ALTITUDES.length}가지뿐이다`);
  assert.equal(ALTITUDES.length, (HIGHEST - LOWEST) / STEP + 1);
  assert.equal(ALTITUDES.length, 101);
  assert.equal(new Set(ALTITUDE_SLUGS).size, ALTITUDES.length, 'slug 중복');
  assert.equal(altitudeOf('2250'), 2250);
  assert.equal(altitudeOf('2225'), undefined, '눈금에 없는 고도는 받지 않는다');
  assert.equal(altitudeOf('5050'), undefined);
  // 사람이 아는 자리는 모두 눈금 위에 있다
  for (const p of PLACES) assert.ok(ALTITUDES.includes(p.m), `${p.key} ${p.m}m가 눈금에 없다`);
});

test('기압에서 고도를 되짚으면 제자리로 온다', () => {
  for (const m of ALTITUDES) {
    const back = altitudeFromHpa(hpaOf(m));
    assert.ok(Math.abs(back - m) < 1, `${m}m: 되짚으면 ${back.toFixed(1)}m가 된다`);
  }
  assert.equal(hpaOf(0), SEA_HPA, '해수면은 표준 기압이다');
  // 널리 실리는 값들 — 고도 5500m 언저리에서 기압이 절반이 된다
  assert.ok(Math.abs(hpaOf(1000) - 898.7) < 0.5);
  assert.ok(Math.abs(hpaOf(3000) - 701.1) < 0.5);
  assert.ok(Math.abs(hpaOf(5000) - 540.2) < 0.5);
});

test('올라갈수록 기압도 기온도 산소도 줄어든다', () => {
  for (const m of ALTITUDES) {
    const f = altitudeFacts(m);
    if (f.higher === null) continue;
    const up = altitudeFacts(f.higher);
    assert.ok(up.hpa < f.hpa, `${m}m: 위로 갔는데 기압이 늘었다`);
    assert.ok(up.tempC < f.tempC, `${m}m: 위로 갔는데 기온이 올랐다`);
    assert.ok(up.o2hpa < f.o2hpa, `${m}m: 위로 갔는데 산소 분압이 늘었다`);
    assert.ok(up.boilC < f.boilC, `${m}m: 위로 갔는데 끓는점이 올랐다`);
    assert.ok(up.cookFactor > f.cookFactor, `${m}m: 위로 갔는데 조리 시간이 줄었다`);
  }
});

test('기온이 100m마다 0.65도씩 떨어진다', () => {
  for (const m of ALTITUDES) {
    assert.ok(Math.abs(tempOf(m) - (SEA_C - LAPSE * m)) < 0.01, `${m}m: 기온 감률이 다르다`);
  }
  assert.equal(tempOf(0), 15);
  assert.equal(tempOf(1000), 8.5, '1000m에서 6.5도 떨어진다');
  assert.equal(tempOf(2000), 2);
});

test('끓는점이 기압에서 나온다', () => {
  assert.equal(boilOf(SEA_HPA), 100, '해수면에서는 100도다');
  for (const m of ALTITUDES) {
    const f = altitudeFacts(m);
    assert.equal(f.boilC, boilOf(f.hpa), `${m}m: 끓는점이 기압에서 나오지 않았다`);
    assert.ok(f.boilC <= 100, `${m}m: 끓는점이 100도를 넘었다`);
    assert.ok(f.boilC > 75, `${m}m: 끓는점 ${f.boilC}도는 5000m 안에서 나올 수 없다`);
  }
  // 널리 실리는 값 — 2000m 언저리에서 93도, 3000m에서 90도쯤이다
  assert.ok(Math.abs(altitudeFacts(2000).boilC - 93.1) < 0.6, `2000m 끓는점 ${altitudeFacts(2000).boilC}`);
  assert.ok(Math.abs(altitudeFacts(3000).boilC - 89.9) < 0.6, `3000m 끓는점 ${altitudeFacts(3000).boilC}`);
});

test('산소는 농도가 아니라 기압이 줄어든다', () => {
  for (const m of ALTITUDES) {
    const f = altitudeFacts(m);
    // 산소 분압은 기압의 20.95%이므로, 해수면 대비 비율은 기압과 똑같다
    assert.ok(Math.abs(f.o2hpa / f.hpa - 0.2095) < 0.0005, `${m}m: 산소 비율이 20.95%가 아니다`);
    assert.equal(f.o2Percent, f.pressurePercent, `${m}m: 산소 비율과 기압 비율이 다르다`);
  }
  // 5000m에서 기압이 절반을 조금 넘는다 — 산소도 그만큼이다
  assert.ok(Math.abs(altitudeFacts(5000).o2Percent - 53.3) < 0.3);
  assert.equal(altitudeFacts(0).o2Percent, 100);
});

test('피트와 눈금이 제자리에 있다', () => {
  for (const m of ALTITUDES) {
    const f = altitudeFacts(m);
    assert.ok(Math.abs(f.ft * 0.3048 - m) < 0.5, `${m}m: 피트를 되돌리면 어긋난다`);
    assert.equal(m % STEP, 0, `${m}m: 눈금에서 벗어났다`);
    const list = neighbours(m);
    assert.ok(!list.includes(m), `${m}m: 이웃에 자기 자신이 있다`);
  }
  assert.equal(ROUND_ALTITUDES.length, 11, '500m 간격 눈금');
  assert.equal(altitudeFacts(0).lower, null);
  assert.equal(altitudeFacts(HIGHEST).higher, null);
  assert.equal(altitudeFacts(1000).ft, 3281);
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = altitudeFacts(2250);
  for (const lang of LANG_CODES) {
    const ui = ALTITUDE_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f),
      ...ui.altitudeFaq(f).flatMap(q => [q.q, q.a]),
      ...PLACES.map(p => ui.placeName(p.key)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('자리 이름이 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    const names = PLACES.map(p => ALTITUDE_UI[lang].placeName(p.key));
    assert.equal(new Set(names).size, PLACES.length, `${lang}: 자리 이름이 겹친다`);
    for (const n of names) assert.ok(n.trim().length > 0, `${lang}: 빈 자리 이름`);
  }
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = altitudeFacts(2250);
  for (const lang of LANG_CODES) {
    const ui = ALTITUDE_UI[lang];
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
    assert.equal(ui.altitudeFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 20.95%는 이 표의 핵심이라 열 언어 모두에 적혀 있어야 한다
    assert.ok(ui.oxygenNote.includes('20.95') || ui.oxygenNote.includes('20,95'), `${lang}: 산소 농도가 적혀 있지 않다`);
  }
});

test('산 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[ALTITUDE_ICON], 'mountain', '이모지가 산 아이콘으로 이어지지 않는다');
});
