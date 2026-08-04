/**
 * 나사 치수가 스스로 어긋나지 않는지 본다.
 *
 * 계수 0.6495 같은 것은 외운 숫자가 아니라 기본 삼각형 높이 H에서 나온 몫이다.
 * 그래서 검사는 반대로 간다 — 계산된 지름과 외경의 차이를 H로 나누면 0.75,
 * 1.25, 17/12가 다시 나와야 한다. 계수를 잘못 적으면 그 자리에서 드러난다.
 *
 * 공표된 표와도 맞춰 본다. M8×1.25의 유효지름 7.188과 응력단면적 36.6mm²는
 * ISO 표에 실린 값이라, 공식이 맞다면 계산이 그 값에 닿아야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { DIAMETERS, SCREWS, SCREW_ICON, SCREW_SLUGS, labelOf, screwOf, slugOf } from '../lib/screw/list.ts';
import { H, coarseOnly, fineOnly, minorFemaleOf, minorMaleOf, pitchDiaOf, screwFacts, stressAreaOf } from '../lib/screw/facts.ts';
import { SCREW_UI } from '../lib/screw/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(SCREWS.length >= 100, `${SCREWS.length}가지뿐이다`);
  assert.equal(new Set(SCREW_SLUGS).size, SCREWS.length, 'slug 중복');
  assert.equal(new Set(SCREWS.map(labelOf)).size, SCREWS.length, '규격 중복');
  // 지름마다 보통 나사가 정확히 하나씩이다
  assert.equal(coarseOnly().length, DIAMETERS.length, '보통 나사가 지름 수와 다르다');
  assert.equal(coarseOnly().length + fineOnly().length, SCREWS.length);
});

test('주소와 규격이 서로를 되돌린다', () => {
  for (const s of SCREWS) {
    assert.deepEqual(screwOf(slugOf(s)), s, `${slugOf(s)}: 되읽으면 다른 나사가 나온다`);
    assert.ok(!slugOf(s).includes('.'), `${slugOf(s)}: 주소에 점이 들어갔다`);
  }
  assert.equal(slugOf({ d: 8, p: 1.25, coarse: true }), 'm8x1-25');
  assert.equal(slugOf({ d: 1.6, p: 0.35, coarse: true }), 'm1-6x0-35');
  assert.equal(labelOf({ d: 8, p: 1.25, coarse: true }), 'M8×1.25');
  assert.equal(screwOf('m8x3'), undefined, '팔지 않는 짝은 받지 않는다');
});

test('지름들이 H를 정해진 몫만큼 깎아 낸 값이다', () => {
  for (const s of SCREWS) {
    const h = H(s.p);
    // 외경에서 깎인 길이가 H의 정해진 몫과 같다 — 지름을 소수 셋째 자리에서
    // 반올림하므로 0.0005mm까지는 어긋날 수 있다
    assert.ok(Math.abs(s.d - pitchDiaOf(s) - 0.75 * h) < 0.0006, `${labelOf(s)}: 유효지름 몫이 0.75H가 아니다`);
    assert.ok(Math.abs(s.d - minorFemaleOf(s) - 1.25 * h) < 0.0006, `${labelOf(s)}: 암나사 골 몫이 1.25H가 아니다`);
    assert.ok(Math.abs(s.d - minorMaleOf(s) - (17 / 12) * h) < 0.0006, `${labelOf(s)}: 수나사 골 몫이 17/12 H가 아니다`);
    // H = (√3 ÷ 2) × 피치
    assert.ok(Math.abs(h - 0.8660254 * s.p) < 1e-6, `${labelOf(s)}: H가 다르다`);
  }
});

test('지름이 굵기 순서대로 놓인다', () => {
  for (const s of SCREWS) {
    const f = screwFacts(s);
    assert.ok(f.minorMale < f.minorFemale, `${f.label}: 수나사 골이 암나사 골보다 굵다`);
    assert.ok(f.minorFemale < f.pitchDia, `${f.label}: 암나사 골이 유효지름보다 굵다`);
    assert.ok(f.pitchDia < s.d, `${f.label}: 유효지름이 외경보다 굵다`);
    assert.ok(f.minorMale > 0, `${f.label}: 골지름이 사라졌다`);
    // 탭 드릴은 암나사 골지름보다 굵고 외경보다 가늘다 — 그래야 탭이 들어간다
    assert.ok(f.tapDrill > f.minorFemale && f.tapDrill < s.d, `${f.label}: 탭 드릴 ${f.tapDrill}이 범위를 벗어났다`);
  }
});

test('공표된 표의 값과 맞는다', () => {
  // ISO 261·898-1에 실린 값들 — 공식이 맞다면 여기에 닿는다
  assert.equal(pitchDiaOf({ d: 8, p: 1.25, coarse: true }), 7.188);
  assert.equal(minorMaleOf({ d: 8, p: 1.25, coarse: true }), 6.466);
  assert.equal(pitchDiaOf({ d: 6, p: 1, coarse: true }), 5.35);
  assert.equal(pitchDiaOf({ d: 10, p: 1.5, coarse: true }), 9.026);
  assert.equal(pitchDiaOf({ d: 12, p: 1.75, coarse: true }), 10.863);
  assert.equal(minorMaleOf({ d: 12, p: 1.75, coarse: true }), 9.853);
  assert.ok(Math.abs(stressAreaOf({ d: 8, p: 1.25, coarse: true }) - 36.6) < 0.05, 'M8 응력단면적 36.6mm²');
  assert.ok(Math.abs(stressAreaOf({ d: 10, p: 1.5, coarse: true }) - 58.0) < 0.05, 'M10 응력단면적 58.0mm²');
  assert.ok(Math.abs(stressAreaOf({ d: 12, p: 1.75, coarse: true }) - 84.3) < 0.05, 'M12 응력단면적 84.3mm²');
  assert.ok(Math.abs(stressAreaOf({ d: 6, p: 1, coarse: true }) - 20.1) < 0.05, 'M6 응력단면적 20.1mm²');
});

test('응력단면적이 골 원면적과 외경 원면적 사이에 든다', () => {
  const area = (d: number) => (Math.PI / 4) * d * d;
  for (const s of SCREWS) {
    const f = screwFacts(s);
    assert.ok(f.stressArea > area(f.minorMale), `${f.label}: 골 원면적보다 작다`);
    assert.ok(f.stressArea < area(s.d), `${f.label}: 외경 원면적보다 크다`);
  }
});

test('피치와 1인치당 산 수가 서로를 되돌린다', () => {
  for (const s of SCREWS) {
    const f = screwFacts(s);
    assert.ok(Math.abs(f.tpi * s.p - 25.4) / 25.4 < 0.005, `${f.label}: ${f.tpi} × ${s.p}가 25.4가 아니다`);
  }
  assert.equal(screwFacts({ d: 6, p: 1, coarse: true }).tpi, 25.4, '피치 1mm는 1인치에 25.4산');
  assert.equal(screwFacts({ d: 1.6, p: 0.2, coarse: false }).tpi, 127, '피치 0.2mm는 127산');
});

test('같은 외경에서 피치가 굵을수록 골지름이 가늘다', () => {
  for (const d of DIAMETERS) {
    const same = SCREWS.filter(s => s.d === d).sort((a, b) => a.p - b.p);
    for (let i = 1; i < same.length; i++) {
      assert.ok(
        minorMaleOf(same[i]) < minorMaleOf(same[i - 1]),
        `M${d}: 피치 ${same[i].p}이 ${same[i - 1].p}보다 골지름이 굵다`,
      );
    }
    // 보통 나사는 그 지름에서 가장 굵은 피치다
    const coarse = same.find(s => s.coarse)!;
    assert.equal(coarse.p, Math.max(...same.map(s => s.p)), `M${d}: 보통 나사가 가장 굵은 피치가 아니다`);
  }
});

test('형제와 이웃이 자기를 뺀다', () => {
  for (const s of SCREWS) {
    const f = screwFacts(s);
    for (const o of f.siblings) {
      assert.equal(o.d, s.d, `${f.label}: 다른 외경이 섞였다`);
      assert.notEqual(o.p, s.p, `${f.label}: 자기 자신이 있다`);
    }
    for (const o of f.neighbours) {
      assert.notEqual(o.d, s.d, `${f.label}: 이웃에 같은 외경이 있다`);
      assert.ok(o.coarse, `${f.label}: 이웃이 보통 나사가 아니다`);
    }
    assert.ok(f.neighbours.length >= 1, `${f.label}: 이웃이 없다`);
  }
  assert.deepEqual(screwFacts({ d: 8, p: 1.25, coarse: true }).siblings.map(labelOf), ['M8×1', 'M8×0.75']);
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = screwFacts({ d: 8, p: 1.25, coarse: true });
  for (const lang of LANG_CODES) {
    const ui = SCREW_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f),
      ...ui.screwFaq(f).flatMap(q => [q.q, q.a]),
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
  const f = screwFacts({ d: 8, p: 1.25, coarse: true });
  for (const lang of LANG_CODES) {
    const ui = SCREW_UI[lang];
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
    assert.equal(ui.screwFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 60도는 이 표 전체의 전제라 열 언어 모두에 적혀 있어야 한다
    assert.ok(ui.threadNote.includes('60'), `${lang}: 나사산 각이 적혀 있지 않다`);
  }
});

test('나사 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[SCREW_ICON], 'tools', '이모지가 공구 아이콘으로 이어지지 않는다');
});
