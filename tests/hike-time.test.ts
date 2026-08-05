/**
 * 등산 시간 — 계산한 값을 다른 길로 되짚는다.
 *
 * 네이스미스의 규칙은 두 줄뿐이라, 그 둘에서 따라 나오는 것들을 확인한다 —
 * 등가 거리를 평지 속도로 걸으면 원래 시간이 나오는지, 오름 1미터가 평지
 * 8.33미터라는 비가 상수 둘에서 실제로 나오는지.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ASCENTS, ASCENT_MH, CELLS, DESCENT_M, DESCENT_MIN, DISTANCES, FLAT_KMH, GRADES, STEEP_DEG,
  cellOf, slugOf,
} from '../lib/hike/list.ts';
import { downMinutesOf, flatPerMetre, gradeOf, hikeFacts, slopeOf, upMinutesOf } from '../lib/hike/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return hikeFacts(c);
};

test('칸은 거리 15가지 × 오름 10가지', () => {
  assert.equal(DISTANCES.length, 15);
  assert.equal(ASCENTS.length, 10);
  assert.equal(CELLS.length, 150);
  assert.equal(new Set(CELLS.map(slugOf)).size, 150);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  assert.deepEqual([...DISTANCES].sort((a, b) => a - b), DISTANCES);
  assert.deepEqual([...ASCENTS].sort((a, b) => a - b), ASCENTS);
  assert.equal(cellOf('10'), undefined);
  assert.equal(cellOf('11-500'), undefined);
});

test('네이스미스는 두 줄이다', () => {
  // 평지 5킬로미터에 한 시간, 오름 600미터에 한 시간
  assert.equal(upMinutesOf(5, 0), 60);
  assert.equal(upMinutesOf(0, 600), 60);
  assert.equal(upMinutesOf(5, 600), 120);
  for (const c of CELLS) {
    const f = hikeFacts(c);
    const exact = (c.km / FLAT_KMH) * 60 + (c.up / ASCENT_MH) * 60;
    assert.ok(Math.abs(f.upMinutes - exact) <= 0.5, `${f.slug}: ${f.upMinutes} vs ${exact}`);
  }
  // 10킬로미터에 500미터를 올리면 2시간 50분이다
  assert.equal(facts('10-500').upMinutes, 170);
});

test('오름 1미터가 평지 몇 미터인지가 따라 나온다', () => {
  // 600미터를 오르는 시간이 5킬로미터를 걷는 시간과 같으므로 8.33미터다
  const ratio = (FLAT_KMH * 1000) / ASCENT_MH;
  assert.ok(Math.abs(flatPerMetre() - ratio) < 1e-9);
  assert.ok(Math.abs(ratio - 8.33) < 0.01, String(ratio));
  for (const c of CELLS) {
    const f = hikeFacts(c);
    // 등가 거리를 평지 속도로 걸으면 원래 오름 시간이 나온다
    const back = (f.equivalent / FLAT_KMH) * 60;
    assert.ok(Math.abs(back - f.upMinutes) <= 0.5, `${f.slug}: ${back} vs ${f.upMinutes}`);
  }
  // 오름 600미터는 평지 5킬로미터와 같은 자리다
  assert.equal(hikeFacts({ km: 5, up: 0 }).equivalent, 5);
  assert.ok(Math.abs(hikeFacts({ km: 1, up: 600 }).equivalent - 6) < 0.01);
});

test('평균 경사는 오름을 거리로 나눈 각이다', () => {
  // 1킬로미터에 1000미터를 오르면 45도다
  assert.ok(Math.abs(slopeOf(1, 1000) - 45) < 1e-9);
  assert.equal(slopeOf(10, 0), 0);
  for (const c of CELLS) {
    const f = hikeFacts(c);
    // 탄젠트를 도로 취하면 오름이 나온다 — 각은 보여 주려고 한 자리에서
    // 끊었으므로, 되짚을 때는 끊기 전 각을 쓴다
    const exact = slopeOf(c.km, c.up);
    const back = Math.tan((exact * Math.PI) / 180) * c.km * 1000;
    assert.ok(Math.abs(back - c.up) < 1e-6, `${f.slug}: ${back} vs ${c.up}`);
    assert.ok(Math.abs(f.slope - exact) <= 0.05, `${f.slug}: ${f.slope} vs ${exact}`);
    assert.equal(f.steep, slopeOf(c.km, c.up) > STEEP_DEG, f.slug);
  }
});

test('하산 보정은 12도에서 부호가 바뀐다', () => {
  for (const c of CELLS) {
    const f = hikeFacts(c);
    const flat = (c.km / FLAT_KMH) * 60;
    const fix = (c.up / DESCENT_M) * DESCENT_MIN;
    if (f.steep) {
      // 가파르면 조심하느라 오히려 더 걸린다
      assert.ok(Math.abs(f.downMinutes - (flat + fix)) <= 0.5, f.slug);
      assert.ok(f.downMinutes > flat || c.up === 0, f.slug);
    } else {
      // 완만하면 빨라지되, 걷는 시간의 절반 아래로는 안 내려간다
      assert.ok(Math.abs(f.downMinutes - Math.max(flat / 2, flat - fix)) <= 0.5, f.slug);
      assert.ok(f.downMinutes >= flat / 2 - 0.5, f.slug);
    }
    // 왕복은 오름과 하산을 더한 것 — 각각 분으로 끊었으므로 1분까지는 어긋난다
    assert.ok(Math.abs(f.roundMinutes - (f.upMinutes + f.downMinutes)) <= 1, f.slug);
  }
  assert.equal(DESCENT_M, 300);
  assert.equal(DESCENT_MIN, 10);
  // 평지만 걸으면 오르는 시간과 내려오는 시간이 같다
  assert.equal(facts('20-0').upMinutes, facts('20-0').downMinutes);
  // 3킬로미터에 1200미터는 21.8도라 가파른 쪽이다
  assert.equal(facts('3-1200').steep, true);
  assert.equal(facts('10-500').steep, false);
});

test('평균 속도는 거리를 시간으로 나눈 것', () => {
  for (const c of CELLS) {
    const f = hikeFacts(c);
    const back = f.speed * (upMinutesOf(c.km, c.up) / 60);
    assert.ok(Math.abs(back - c.km) <= Math.max(c.km * 0.01, 0.05), `${f.slug}: ${back} vs ${c.km}`);
    // 오름이 없으면 평지 속도 그대로다
    if (c.up === 0) assert.equal(f.speed, FLAT_KMH, f.slug);
    // 오름이 붙으면 반드시 느려진다
    if (c.up > 0) assert.ok(f.speed < FLAT_KMH, f.slug);
  }
});

test('코스의 무게는 등가 거리로 가른다', () => {
  assert.deepEqual(GRADES.map(g => g.key), ['easy', 'moderate', 'hard', 'severe']);
  assert.equal(gradeOf(7.9), 'easy');
  assert.equal(gradeOf(8), 'moderate');
  assert.equal(gradeOf(15), 'hard');
  assert.equal(gradeOf(25), 'severe');
  for (const c of CELLS) {
    const f = hikeFacts(c);
    const exact = c.km + (c.up * flatPerMetre()) / 1000;
    assert.equal(f.grade, gradeOf(exact), f.slug);
  }
});

test('앞뒤 칸은 한 단계씩만 움직인다', () => {
  const f = facts('10-500');
  assert.equal(f.longer?.km, 12);
  assert.equal(f.shorter?.km, 8);
  assert.equal(f.higher?.up, 700);
  assert.equal(f.lower?.up, 300);
  assert.equal(facts('1-0').shorter, null);
  assert.equal(facts('1-0').lower, null);
  assert.equal(facts('25-2000').longer, null);
  assert.equal(facts('25-2000').higher, null);
  for (const c of CELLS) {
    const g = hikeFacts(c);
    if (g.longer) assert.ok(hikeFacts(cellOf(g.longer.slug)!).upMinutes > g.upMinutes, g.slug);
    if (g.higher) assert.ok(hikeFacts(cellOf(g.higher.slug)!).upMinutes > g.upMinutes, g.slug);
  }
});

test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { HIKE_UI } = await import('../lib/hike/ui.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const shown = [hikeFacts({ km: 10, up: 500 }), hikeFacts({ km: 1, up: 0 }), hikeFacts({ km: 3, up: 1200 })];
  for (const lang of LANG_CODES) {
    const ui = HIKE_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...shown.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f), ui.clock(f.upMinutes), ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
      ...GRADES.map(g => ui.gradeName(g.key)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('시간은 한 시간을 넘을 때만 시간을 말한다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { HIKE_UI } = await import('../lib/hike/ui.ts');
  for (const lang of LANG_CODES) {
    const clock = HIKE_UI[lang].clock;
    for (const c of CELLS) {
      const f = hikeFacts(c);
      const digits = clock(f.upMinutes).match(/[0-9]+/g) ?? [];
      assert.ok(digits.length >= 1 && digits.length <= 2, `${lang} ${f.slug}: ${clock(f.upMinutes)}`);
      if (f.upMinutes < 60) assert.equal(digits.length, 1, `${lang} ${f.slug}`);
      // 두 조각으로 말했다면 도로 더해 원래 분이 나온다
      const back = digits.length === 2 ? Number(digits[0]) * 60 + Number(digits[1]) : Number(digits[0]);
      if (f.upMinutes < 60 || f.upMinutes % 60 !== 0) assert.equal(back, f.upMinutes, `${lang} ${f.slug}`);
    }
  }
  const ko = HIKE_UI.ko.clock;
  assert.equal(ko(170), '2시간 50분');
  assert.equal(ko(45), '45분');
  assert.equal(ko(120), '2시간');
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { HIKE_UI } = await import('../lib/hike/ui.ts');
  const f = hikeFacts({ km: 10, up: 500 });
  for (const lang of LANG_CODES) {
    const ui = HIKE_UI[lang];
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
    assert.equal(ui.cellFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    const grades = GRADES.map(g => ui.gradeName(g.key));
    assert.equal(new Set(grades).size, GRADES.length, `${lang}: 무게 이름이 겹친다`);
    // 규칙 두 줄과 등가 거리 — 이 표의 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.ruleNote.length >= floor * 6, `${lang}: 규칙 설명이 짧다`);
    assert.ok(ui.equalNote.length >= floor * 6, `${lang}: 등가 거리 설명이 짧다`);
  }
});

test('산 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { HIKE_ICON } = await import('../lib/hike/list.ts');
  assert.equal(ICON_FOR[HIKE_ICON], 'mountain', '이모지가 아이콘으로 이어지지 않는다');
});
