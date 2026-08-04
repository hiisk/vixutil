/**
 * 타이어 치수가 스스로 어긋나지 않는지 본다.
 *
 * 규격 문자열만 적어 두고 나머지는 계산하므로, 검사는 그 문자열을 **다시
 * 읽어서** 같은 값에 닿는지 본다. 205/55R16을 정규식으로 뜯어 폭·편평비·휠을
 * 꺼내고, 거기서 외경을 손으로 계산해 facts가 낸 값과 맞춘다.
 *
 * 둘레와 1km 회전수는 서로를 되돌린다 — 회전수 × 둘레가 1,000,000mm면 맞다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { RIMS, TIRES, TIRE_ICON, TIRE_SLUGS, labelOf, slugOf, tireOf } from '../lib/tire/list.ts';
import { diameterOf, extremes, gapOf, sameRim, sameShape, sidewallOf, speedoOf, tireFacts } from '../lib/tire/facts.ts';
import { TIRE_UI } from '../lib/tire/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(TIRES.length >= 100, `${TIRES.length}가지뿐이다`);
  assert.equal(new Set(TIRE_SLUGS).size, TIRES.length, 'slug 중복');
  assert.equal(new Set(TIRES.map(labelOf)).size, TIRES.length, '규격 중복');
  assert.deepEqual(RIMS, [13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
});

test('주소와 규격이 서로를 되돌린다', () => {
  for (const t of TIRES) {
    const slug = slugOf(t);
    assert.deepEqual(tireOf(slug), t, `${slug}: 되읽으면 다른 규격이 나온다`);
    assert.match(labelOf(t), /^[0-9]{3}\/[0-9]{2}R[0-9]{2}$/, `${labelOf(t)}: 적는 꼴이 다르다`);
  }
  assert.equal(slugOf({ width: 205, aspect: 55, rim: 16 }), '205-55r16');
  assert.equal(labelOf({ width: 205, aspect: 55, rim: 16 }), '205/55R16');
  assert.equal(tireOf('205/55R16'), undefined, '사람이 적는 꼴은 주소가 아니다');
  assert.equal(tireOf('999-99r99'), undefined, '없는 규격은 받지 않는다');
});

test('규격 문자열을 다시 읽어 계산해도 같은 외경이 나온다', () => {
  for (const t of TIRES) {
    const m = /^([0-9]{3})\/([0-9]{2})R([0-9]{2})$/.exec(labelOf(t));
    assert.ok(m, `${labelOf(t)}: 읽히지 않는다`);
    const [, w, a, r] = m!.map(Number);
    // 사이드월 = 폭 × 편평비, 외경 = 휠(인치→mm) + 사이드월 두 번
    const sidewall = (w * a) / 100;
    const diameter = r * 25.4 + sidewall * 2;
    assert.equal(sidewallOf(t), Math.round(sidewall * 100) / 100, `${labelOf(t)}: 사이드월이 다르다`);
    assert.ok(Math.abs(diameterOf(t) - diameter) < 0.06, `${labelOf(t)}: 외경이 ${diameterOf(t)} vs ${diameter}`);
  }
  // 손으로 아는 값 몇 개
  assert.equal(sidewallOf({ width: 205, aspect: 55, rim: 16 }), 112.75);
  assert.equal(diameterOf({ width: 205, aspect: 55, rim: 16 }), 631.9);
  assert.equal(diameterOf({ width: 225, aspect: 45, rim: 17 }), 634.3);
});

test('둘레와 1km 회전수가 서로를 되돌린다', () => {
  for (const t of TIRES) {
    const f = tireFacts(t);
    assert.ok(Math.abs(f.circumference - Math.PI * f.diameter) < 0.06, `${f.label}: 둘레가 다르다`);
    // 회전수 × 둘레 = 1km = 1,000,000mm
    assert.ok(Math.abs(f.revsPerKm * f.circumference - 1_000_000) < 200, `${f.label}: 회전수 × 둘레가 ${f.revsPerKm * f.circumference}`);
    assert.ok(Math.abs(f.diameterInch * 25.4 - f.diameter) < 0.3, `${f.label}: 인치 외경이 다르다`);
    assert.equal(f.rimMm, Math.round(t.rim * 25.4 * 10) / 10, `${f.label}: 휠 지름(mm)이 다르다`);
  }
});

test('외경이 있을 법한 범위에 든다', () => {
  for (const t of TIRES) {
    const d = diameterOf(t);
    assert.ok(d > 500 && d < 850, `${labelOf(t)}: 외경 ${d}mm는 승용차 타이어가 아니다`);
    assert.ok(t.width >= 155 && t.width <= 325, `${labelOf(t)}: 폭이 이상하다`);
    assert.ok(t.aspect >= 25 && t.aspect <= 80, `${labelOf(t)}: 편평비가 이상하다`);
  }
  const { biggest, smallest } = extremes();
  assert.equal(labelOf(smallest), '165/65R13');
  assert.equal(labelOf(biggest), '285/45R22');
  assert.ok(diameterOf(biggest) > diameterOf(smallest));
});

test('외경 차이는 순서를 바꿔도 같다', () => {
  const sample = TIRES.filter((_, i) => i % 7 === 0);
  for (const a of sample) {
    for (const b of sample) {
      assert.equal(gapOf(a, b), gapOf(b, a), `${labelOf(a)}·${labelOf(b)}: 순서를 바꾸니 값이 다르다`);
      if (slugOf(a) === slugOf(b)) assert.equal(gapOf(a, b), 0, '자기 자신과의 차이는 0이다');
    }
  }
});

test('대체 규격은 외경이 3% 안에 든다', () => {
  for (const t of TIRES) {
    const f = tireFacts(t);
    for (const alt of f.alternatives) {
      assert.ok(gapOf(t, alt.tire) <= 0.03, `${f.label} → ${alt.label}: ${(gapOf(t, alt.tire) * 100).toFixed(2)}% 벌어졌다`);
      assert.notEqual(alt.slug, f.slug, `${f.label}: 자기 자신이 대체 후보에 있다`);
      // 새 규격이 크면 속도계가 실제보다 느리게 읽힌다 — 부호가 지름 차이와 같아야 한다
      const bigger = alt.diameter > f.diameter;
      if (Math.abs(alt.speedo) > 0.01) {
        assert.equal(alt.speedo > 0, bigger, `${f.label} → ${alt.label}: 부호가 지름과 반대다`);
      }
      assert.equal(alt.speedo, speedoOf(t, alt.tire));
    }
    assert.ok(f.alternatives.length <= 12, `${f.label}: 대체 후보가 너무 많다`);
  }
  // 흔한 짝 하나 — 205/55R16과 225/45R17은 서로 바꿔 끼우는 조합이다
  const a = { width: 205, aspect: 55, rim: 16 };
  const b = { width: 225, aspect: 45, rim: 17 };
  assert.ok(gapOf(a, b) <= 0.03, '이 둘은 실제로 호환된다');
  assert.ok(tireFacts(a).alternatives.some(x => x.label === '225/45R17'));
});

test('같은 휠·같은 편평비 목록이 자기를 빼고 나온다', () => {
  for (const t of TIRES) {
    for (const o of sameRim(t)) {
      assert.equal(o.rim, t.rim, `${labelOf(t)}: 다른 휠이 섞였다`);
      assert.notEqual(slugOf(o), slugOf(t), `${labelOf(t)}: 자기 자신이 있다`);
    }
    for (const o of sameShape(t)) {
      assert.equal(o.rim, t.rim);
      assert.equal(o.aspect, t.aspect, `${labelOf(t)}: 편평비가 다른 것이 섞였다`);
      assert.notEqual(o.width, t.width, `${labelOf(t)}: 폭이 같은 것이 섞였다`);
    }
  }
  assert.deepEqual(
    sameShape({ width: 205, aspect: 55, rim: 16 }).map(labelOf),
    ['195/55R16', '215/55R16', '225/55R16'],
  );
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = tireFacts({ width: 205, aspect: 55, rim: 16 });
  for (const lang of LANG_CODES) {
    const ui = TIRE_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f),
      ...ui.tireFaq(f).flatMap(q => [q.q, q.a]),
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
  const f = tireFacts({ width: 205, aspect: 55, rim: 16 });
  for (const lang of LANG_CODES) {
    const ui = TIRE_UI[lang];
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
    assert.equal(ui.tireFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 3%는 이 섹션의 기준선이라 열 언어 모두에 적혀 있어야 한다
    assert.ok(ui.altNote.includes('3%'), `${lang}: 대체 기준이 적혀 있지 않다`);
  }
});

test('타이어 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[TIRE_ICON], 'tire', '이모지가 타이어 아이콘으로 이어지지 않는다');
});
