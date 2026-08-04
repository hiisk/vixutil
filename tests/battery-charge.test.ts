/**
 * 충전 — 계산한 값을 다른 길로 되짚는다.
 *
 * Wh는 mAh에서 나오므로 도로 나눠 mAh가 되는지 보고, 전압 단계는 전압과
 * 전류를 곱해 충전기 와트가 나오는지 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CAPACITIES, CELLS, CHARGERS, FLIGHT, MAX_AMP, NOMINAL, PD_VOLTS, PLAIN_CABLE_AMP,
  cellOf, slugOf,
} from '../lib/battery/list.ts';
import {
  EFFICIENCY, SPR_MAX_VOLT, batteryFacts, flightOf, stepOf, stepsOf, whOf,
} from '../lib/battery/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return batteryFacts(c);
};

test('칸은 용량 20가지 × 충전기 10가지', () => {
  assert.equal(CAPACITIES.length, 20);
  assert.equal(CHARGERS.length, 10);
  assert.equal(CELLS.length, 200);
  assert.equal(new Set(CELLS.map(slugOf)).size, 200);
  assert.deepEqual([...CAPACITIES].sort((a, b) => a - b), CAPACITIES);
  assert.deepEqual([...CHARGERS].sort((a, b) => a - b), CHARGERS);
});

test('주소는 되돌아온다', () => {
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  assert.equal(slugOf({ mah: 5000, watt: 20 }), '5000-20');
  assert.equal(cellOf('5000'), undefined);
  assert.equal(cellOf('5001-20'), undefined);
});

test('Wh는 도로 나누면 mAh가 된다', () => {
  for (const mah of CAPACITIES) {
    const back = (whOf(mah) * 1000) / NOMINAL;
    // Wh를 두 자리에서 끊었으므로 그만큼은 어긋난다
    assert.ok(Math.abs(back - mah) < 3, `${mah}mAh → ${whOf(mah)}Wh → ${back}`);
  }
  // 보조배터리에 적힌 99Wh가 이 셈이다
  assert.equal(whOf(26800), 99.16);
  assert.equal(whOf(10000), 37);
  assert.equal(whOf(5000), 18.5);
});

test('시간에 충전기 출력을 도로 곱하면 에너지가 나온다', () => {
  for (const c of CELLS) {
    const f = batteryFacts(c);
    const back = (f.minutes / 60) * c.watt * EFFICIENCY;
    // 분 단위로 끊었으므로 1분치까지는 어긋난다
    assert.ok(Math.abs(back - f.wh) < (c.watt * EFFICIENCY) / 60 + 1e-9, `${f.slug}: ${back} vs ${f.wh}`);
    assert.equal(f.to80, Math.round(((f.wh / (c.watt * EFFICIENCY)) * 60) * 0.8), f.slug);
    // 충전 속도는 배터리 크기 대비 출력이다
    assert.ok(Math.abs(f.crate * f.wh - c.watt) < 0.01 * f.wh, f.slug);
  }
  // 5000mAh 휴대폰을 20W로 채우면 한 시간 남짓이다
  assert.equal(facts('5000-20').minutes, 62);
  assert.equal(facts('5000-20').to80, 49);
});

test('전압과 전류를 곱하면 충전기 와트가 나온다', () => {
  for (const watt of CHARGERS) {
    const s = stepOf(watt);
    assert.ok(PD_VOLTS.includes(s.volt), `${watt}W: ${s.volt}V는 PD 단계가 아니다`);
    assert.ok(Math.abs(s.volt * s.amp - watt) <= s.volt * 0.005, `${watt}W: ${s.volt}×${s.amp}`);
    assert.ok(s.amp <= MAX_AMP, `${watt}W: ${s.amp}A는 케이블 한계를 넘는다`);
    // 더 낮은 단계로도 됐다면 그쪽을 골랐어야 한다
    for (const v of PD_VOLTS.filter(v => v < s.volt)) {
      assert.ok(watt / v > PLAIN_CABLE_AMP, `${watt}W: ${v}V로도 ${PLAIN_CABLE_AMP}A 안에 든다`);
    }
  }
  // 20W 충전기가 5V가 아니라 9V를 쓰는 것은 5V로는 4A가 되기 때문이다
  assert.deepEqual(stepOf(20), { volt: 9, amp: 2.22 });
  assert.equal(20 / 5, 4);
  assert.deepEqual(stepOf(15), { volt: 5, amp: 3 });
  assert.deepEqual(stepOf(65), { volt: 20, amp: 3.25 });
  // 20V로 5A를 다 써도 100W가 끝이라, 140W는 확장 규격의 28V로 넘어간다
  assert.equal(SPR_MAX_VOLT * MAX_AMP, 100);
  assert.deepEqual(stepOf(140), { volt: 28, amp: 5 });
});

test('칩 없는 케이블은 60W에서 끝난다', () => {
  for (const watt of CHARGERS) {
    const f = batteryFacts({ mah: 5000, watt });
    // 20V·3A가 칩 없는 케이블의 끝이다
    assert.equal(f.needsEmarker, watt > SPR_MAX_VOLT * PLAIN_CABLE_AMP, `${watt}W`);
  }
  assert.equal(facts('5000-45').needsEmarker, false);
  assert.equal(facts('5000-65').needsEmarker, true);
});

test('충전기가 낼 수 있는 단계는 5A 안에 든다', () => {
  for (const watt of CHARGERS) {
    const steps = stepsOf(watt);
    assert.ok(steps.length > 0, `${watt}W`);
    for (const s of steps) {
      assert.ok(PD_VOLTS.includes(s.volt), `${watt}W ${s.volt}V`);
      assert.ok(s.amp <= MAX_AMP, `${watt}W ${s.volt}V ${s.amp}A`);
      // 전류를 두 자리에서 끊었으므로 전압만큼 어긋날 여지가 있다
      assert.ok(Math.abs(s.volt * s.amp - watt) <= s.volt * 0.005, `${watt}W ${s.volt}V`);
    }
    // 5A를 넘어 못 내는 단계는 빠져 있어야 한다
    const dropped = PD_VOLTS.filter(v => !steps.some(s => s.volt === v));
    for (const v of dropped) assert.ok(watt / v > MAX_AMP, `${watt}W: ${v}V가 빠진 이유가 없다`);
  }
});

test('기내 반입은 100Wh와 160Wh에서 갈린다', () => {
  assert.deepEqual(FLIGHT.map(f => f.key), ['free', 'approval', 'banned']);
  // 26800mAh 보조배터리가 흔한 것은 이 선 아래로 들어오기 때문이다
  assert.equal(facts('26800-20').flight, 'free');
  assert.ok(whOf(26800) < 100);
  // 100Wh를 넘는 가장 작은 용량을 직접 찾아 맞춰본다
  const limit = Math.ceil((100 * 1000) / NOMINAL);
  assert.equal(limit, 27028);
  assert.equal(flightOf((limit * NOMINAL) / 1000), 'approval');
  assert.equal(flightOf(((limit - 1) * NOMINAL) / 1000), 'free');
  assert.equal(facts('30000-20').flight, 'approval');
  assert.equal(facts('50000-20').flight, 'banned');
  for (const c of CELLS) {
    const f = batteryFacts(c);
    const exact = (c.mah * NOMINAL) / 1000;
    const expected = exact < 100 ? 'free' : exact < 160 ? 'approval' : 'banned';
    assert.equal(f.flight, expected, f.slug);
  }
});

test('5V로 내보내면 표기보다 줄어든다', () => {
  // 3.7V에 담긴 것을 5V로 올리면 전압 비만큼 줄고, 올리는 동안 또 샌다
  assert.equal(facts('10000-20').usable5v, 6660);
  for (const c of CELLS) {
    const f = batteryFacts(c);
    assert.ok(f.usable5v < c.mah, f.slug);
    // 5V로 내보낸 양에 5V를 곱하면 원래 에너지의 90%다
    const back = (f.usable5v * 5) / 1000;
    assert.ok(Math.abs(back - f.wh * EFFICIENCY) < 0.01, `${f.slug}: ${back} vs ${f.wh * EFFICIENCY}`);
  }
});

test('한 시간 안에 채우려면 필요한 출력', () => {
  for (const c of CELLS) {
    const f = batteryFacts(c);
    // 그 출력으로 다시 계산하면 60분 안에 들어와야 한다
    assert.ok(batteryFacts({ mah: c.mah, watt: f.hourWatt }).minutes <= 60, `${f.slug}: ${f.hourWatt}W`);
    // 1W만 낮춰도 넘긴다 — 넉넉히 잡은 값이 아니다
    if (f.hourWatt > 1) {
      const less = (f.wh / ((f.hourWatt - 1) * EFFICIENCY)) * 60;
      assert.ok(less > 60, f.slug);
    }
  }
  assert.equal(facts('5000-20').hourWatt, 21);
});

test('앞뒤 칸은 한 단계씩만 움직인다', () => {
  const f = facts('5000-20');
  assert.equal(f.faster?.slug, '5000-30');
  assert.equal(f.slower?.slug, '5000-18');
  assert.equal(f.bigger?.slug, '5500-20');
  assert.equal(f.smaller?.slug, '4500-20');
  assert.equal(facts('1500-5').slower, null);
  assert.equal(facts('1500-5').smaller, null);
  assert.equal(facts('50000-140').faster, null);
  assert.equal(facts('50000-140').bigger, null);
  for (const c of CELLS) {
    const g = batteryFacts(c);
    // 140W처럼 몇 분이면 끝나는 자리는 분으로 끊으면 같아지므로 끊기 전 값으로 견준다
    const span = (n: { mah: number; watt: number }) => whOf(n.mah) / n.watt;
    if (g.faster) assert.ok(span(g.faster) < span(c), g.slug);
    if (g.bigger) assert.ok(span(g.bigger) > span(c), g.slug);
  }
});

test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { BATTERY_UI } = await import('../lib/battery/ui.ts');
  const { KNOWN_CAPACITY, KNOWN_CHARGER } = await import('../lib/battery/list.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = batteryFacts({ mah: 5000, watt: 20 });
  for (const lang of LANG_CODES) {
    const ui = BATTERY_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f), ui.metaTitle(f), ui.metaDesc(f), ui.clock(f.minutes),
      ...ui.cellFaq(f).flatMap(q => [q.q, q.a]),
      ...CELLS.filter(c => c.mah === 30000 || c.mah === 50000).slice(0, 2).flatMap(c => ui.cellFaq(batteryFacts(c)).map(q => q.a)),
      ...FLIGHT.map(x => ui.flightName(x.key)),
      ...Object.values(KNOWN_CAPACITY).map(k => ui.capacityName(k)),
      ...Object.values(KNOWN_CHARGER).map(k => ui.chargerName(k)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('이름 붙은 열쇠가 열 언어에 다 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { BATTERY_UI } = await import('../lib/battery/ui.ts');
  const { KNOWN_CAPACITY, KNOWN_CHARGER } = await import('../lib/battery/list.ts');
  for (const lang of LANG_CODES) {
    const ui = BATTERY_UI[lang];
    const groups: [string, string[], (k: string) => string][] = [
      ['기내 반입', FLIGHT.map(f => f.key), ui.flightName],
      ['용량 이름', Object.values(KNOWN_CAPACITY), ui.capacityName],
      ['충전기 이름', Object.values(KNOWN_CHARGER), ui.chargerName],
    ];
    for (const [name, keys, fn] of groups) {
      const names = keys.map(k => fn(k));
      assert.equal(new Set(names).size, keys.length, `${lang}: ${name}이 겹친다`);
      // 열쇠를 그대로 돌려주면 번역이 빠진 것이다
      for (let i = 0; i < keys.length; i++) assert.notEqual(names[i], keys[i], `${lang}: ${name} ${keys[i]} 번역이 없다`);
    }
  }
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { BATTERY_UI } = await import('../lib/battery/ui.ts');
  const f = batteryFacts({ mah: 5000, watt: 20 });
  for (const lang of LANG_CODES) {
    const ui = BATTERY_UI[lang];
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
    // mAh가 에너지가 아니라는 것과 케이블 갈림길 — 이 표의 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.mahNote.length >= floor * 6, `${lang}: mAh 설명이 짧다`);
    assert.ok(ui.cableNote.length >= floor * 6, `${lang}: 케이블 설명이 짧다`);
  }
});

test('시간은 한 시간을 넘을 때만 시간을 말한다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { BATTERY_UI } = await import('../lib/battery/ui.ts');
  for (const lang of LANG_CODES) {
    const clock = BATTERY_UI[lang].clock;
    for (const c of CELLS) {
      const f = batteryFacts(c);
      const digits = clock(f.minutes).match(/[0-9]+/g) ?? [];
      assert.ok(digits.length >= 1 && digits.length <= 2, `${lang} ${f.slug}: ${clock(f.minutes)}`);
      if (f.minutes < 60) assert.equal(digits.length, 1, `${lang} ${f.slug}: ${clock(f.minutes)}`);
      // 분까지 말했다면 두 조각을 도로 더해 원래 분이 나와야 한다
      const back = digits.length === 2 ? Number(digits[0]) * 60 + Number(digits[1]) : Number(digits[0]);
      if (f.minutes < 60 || f.minutes % 60 !== 0) assert.equal(back, f.minutes, `${lang} ${f.slug}`);
    }
  }
  const ko = BATTERY_UI.ko.clock;
  assert.equal(ko(48), '48분');
  assert.equal(ko(62), '1시간 2분');
  assert.equal(ko(120), '2시간');
});

test('배터리 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { BATTERY_ICON } = await import('../lib/battery/list.ts');
  assert.equal(ICON_FOR[BATTERY_ICON], 'bolt', '이모지가 아이콘으로 이어지지 않는다');
});
