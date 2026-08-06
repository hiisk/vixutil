/**
 * 전선 — 계산한 값을 다른 길로 되짚는다.
 *
 * AWG 지름은 표를 베끼지 않고 식으로 낸다. 그러니 식이 맞는지도 표가 아니라
 * AWG 스스로가 가진 성질로 확인한다 — 여섯 단계마다 단면적이 네 배가 되는
 * 것, 39단계 만에 0.127mm에서 8.25mm가 되는 것.
 *
 * 견디는 전류만은 식으로 다 말할 수 없어, 널리 쓰이는 규정표를 여기에만 두고
 * 어림이 그 옆에 서는지 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  AMPS, AWGS, CELLS, DROP_LIMIT, RHO, SIZES, SQS, SYSTEMS,
  awgName, cellOf, sizeLabel, sizeSlug, slugOf,
} from '../lib/wire/list.ts';
import {
  AMP_K, AMP_P, ampacityOf, areaOf, areaOfDia, diaOf, ohmPerMetreOf, reachOf, wireFacts,
} from '../lib/wire/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return wireFacts(c);
};

test('칸은 굵기 20가지 × 전류 10가지', () => {
  assert.equal(AWGS.length, 15);
  assert.equal(SQS.length, 8);
  assert.equal(SIZES.length, 23);
  assert.equal(AMPS.length, 15);
  assert.equal(CELLS.length, 345);
  assert.equal(new Set(CELLS.map(slugOf)).size, 345);
});

test('주소는 되돌아온다', () => {
  for (const c of CELLS) {
    const back = cellOf(slugOf(c));
    assert.ok(back, slugOf(c));
    assert.equal(sizeSlug(back.size), sizeSlug(c.size));
    assert.equal(back.amp, c.amp);
  }
  assert.equal(slugOf({ size: { awg: 12, sq: null }, amp: 15 }), 'awg12-15');
  assert.equal(slugOf({ size: { awg: null, sq: 2.5 }, amp: 20 }), 'sq2-5-20');
  // 0이 넷 붙은 것이 4/0이다
  assert.equal(awgName(-3), '0000');
  assert.equal(awgName(0), '0');
  assert.equal(awgName(12), '12');
  assert.equal(cellOf('awg12'), undefined);
  assert.equal(cellOf('awg13-15'), undefined);
});

test('AWG는 표가 아니라 수열이다', () => {
  // 여섯 단계 건너면 단면적이 네 배 — 흔히 그렇게 외우지만 정확히는 92^(12/39)=4.02다
  const jump = 92 ** (12 / 39);
  assert.ok(Math.abs(jump - 4) < 0.03, String(jump));
  for (let n = -3; n <= 18; n++) {
    const ratio = areaOfDia(diaOf(n)) / areaOfDia(diaOf(n + 6));
    assert.ok(Math.abs(ratio - jump) < 1e-9, `AWG ${n} → ${n + 6}: ${ratio}`);
  }
  // 열 단계 건너면 지름이 정확히 열 배가 아니라, 서른아홉 단계에 92의 제곱근만큼 벌어진다
  assert.ok(Math.abs(diaOf(-3) / diaOf(36) - 92 ** (39 / 39)) < 1e-9);
  // 양 끝은 규격이 정한 값이다
  assert.ok(Math.abs(diaOf(36) - 0.127) < 1e-9, String(diaOf(36)));
  assert.ok(Math.abs(diaOf(-3) - 11.684) < 0.001, String(diaOf(-3)));
  // 번호가 커질수록 가늘어진다
  for (let n = -3; n < 30; n++) assert.ok(diaOf(n) > diaOf(n + 1), `AWG ${n}`);
});

test('널리 쓰이는 규정표 옆에 세워 본다', () => {
  // 미국 규정의 60도 칸 — 이 표는 여기서만 쓰고, 계산에는 넣지 않는다
  const NEC: [number, number][] = [
    [14, 15], [12, 20], [10, 30], [8, 40], [6, 55],
    [4, 70], [2, 95], [0, 125], [-1, 145], [-3, 195],
  ];
  for (const [awg, amp] of NEC) {
    const mine = ampacityOf(areaOfDia(diaOf(awg)));
    const off = Math.abs(mine - amp) / amp;
    assert.ok(off < 0.12, `AWG ${awgName(awg)}: 어림 ${mine.toFixed(1)}A vs 표 ${amp}A (${(off * 100).toFixed(0)}%)`);
    // 어림이 규정표보다 높으면 위험한 쪽으로 틀린 것이다
    assert.ok(mine <= amp * 1.01, `AWG ${awgName(awg)}: 어림이 표보다 높다`);
  }
  assert.equal(AMP_K, 9.2);
  assert.equal(AMP_P, 0.65);
});

test('저항은 길이에 비례하고 단면적에 반비례한다', () => {
  for (const s of SIZES) {
    const area = areaOf(s);
    // 두 배 굵으면 저항은 절반이다
    assert.ok(Math.abs(ohmPerMetreOf(area) * 2 - ohmPerMetreOf(area / 2)) < 1e-12, sizeLabel(s));
    assert.ok(Math.abs(ohmPerMetreOf(area) * area - RHO) < 1e-12, sizeLabel(s));
  }
  // 구리 1mm² 1미터가 0.0172Ω이다
  assert.equal(ohmPerMetreOf(1), RHO);
  // 2.5mm² 전선은 1미터에 0.00688Ω
  assert.equal(facts('sq2-5-20').ohmPerM, 0.00688);
});

test('강하는 왕복이라 길이를 두 번 센다', () => {
  for (const c of CELLS) {
    const f = wireFacts(c);
    // 강하는 왕복이므로 저항에 길이를 두 번 곱한다 — 한 번만 곱하면 절반이 된다
    const ohm = ohmPerMetreOf(areaOf(c.size));
    const exact = 2 * c.amp * ohm * 10;
    /*
     * 화면 값은 소수 둘째 자리로 반올림한 것이므로 반올림해서 견준다.
     * 전에는 "차이가 0.005 이하"로 봤는데, 정확값이 자릿수 경계에 딱 떨어지면
     * (16mm² 30A에서 0.645) 부동소수 오차 때문에 0.005를 아주 조금 넘어
     * 멀쩡한 값이 틀렸다고 나왔다. 자리를 맞춰 견주면 그 경계가 사라진다.
     */
    assert.equal(f.dropPer10m, Math.round(exact * 100) / 100, `${f.slug}: ${f.dropPer10m} vs ${exact}`);
    // 아주 굵은 선에 1A를 흘리면 둘 다 0으로 끊겨 견줄 것이 없다
    if (f.dropPer10m >= 0.02) assert.notEqual(f.dropPer10m, Math.round(c.amp * ohm * 10 * 100) / 100, `${f.slug}: 편도로 셌다`);
    // 열이 되는 몫은 전류의 제곱에 비례한다
    assert.ok(Math.abs(f.heatPerM - c.amp ** 2 * ohm) < 0.01, f.slug);
  }
  // 15A를 AWG 12로 10미터 보내면 1.56V가 사라진다
  assert.equal(facts('awg12-15').dropPer10m, 1.56);
});

test('3% 안에 드는 길이는 전압에 비례한다', () => {
  for (const c of CELLS) {
    const f = wireFacts(c);
    const area = areaOf(c.size);
    for (const r of f.reach) {
      const exact = reachOf(area, c.amp, r.volt);
      assert.ok(Math.abs(r.metres - exact) <= 0.05, `${f.slug} ${r.volt}V: ${r.metres} vs ${exact}`);
      // 그 길이로 다시 강하를 계산하면 꼭 3%가 나온다
      const drop = 2 * c.amp * ohmPerMetreOf(area) * exact;
      assert.ok(Math.abs(drop / r.volt - DROP_LIMIT) < 1e-12, `${f.slug} ${r.volt}V: ${drop}`);
    }
    // 230V는 12V보다 꼭 전압 비만큼 멀리 간다 — 보여 주려고 끊기 전 값으로 견준다
    const ratio = reachOf(area, c.amp, 230) / reachOf(area, c.amp, 12);
    assert.ok(Math.abs(ratio - 230 / 12) < 1e-9, `${f.slug}: ${ratio}`);
  }
  assert.deepEqual(SYSTEMS.map(s => s.volt), [12, 24, 120, 230]);
  // 전류를 두 배로 하면 갈 수 있는 길이는 절반이다
  assert.ok(Math.abs(reachOf(2.5, 20, 230) * 2 - reachOf(2.5, 10, 230)) < 1e-9);
});

test('다른 계열의 짝은 단면적이 가장 가깝다', () => {
  for (const c of CELLS) {
    const f = wireFacts(c);
    assert.ok(f.twin, f.slug);
    // 다른 계열 전체를 훑어 가장 가까운 것을 다시 골라 맞춰본다
    const other = SIZES.filter(s => (s.awg === null) !== (c.size.awg === null));
    const best = other.reduce((a, b) => (Math.abs(areaOf(b) - areaOf(c.size)) < Math.abs(areaOf(a) - areaOf(c.size)) ? b : a));
    assert.equal(f.twin.slug, sizeSlug(best), f.slug);
  }
  // 2.5mm²에 가장 가까운 AWG는 14번(2.08mm²)이다
  assert.equal(facts('sq2-5-20').twin?.label, 'AWG 14');
  assert.equal(facts('awg12-15').twin?.label, '4mm²');
});

test('앞뒤 칸은 한 단계씩만 움직인다', () => {
  const f = facts('awg12-15');
  assert.equal(f.thicker?.label, 'AWG 10');
  assert.equal(f.thinner?.label, 'AWG 14');
  assert.equal(f.more, 20);
  assert.equal(f.less, 10);
  assert.equal(facts('awg0000-1').thicker, null);
  assert.equal(facts('awg0000-1').less, null);
  assert.equal(facts('awg24-125').thinner, null);
  assert.equal(facts('awg24-125').more, null);
  // 굵어질수록 저항이 낮아진다
  for (const c of CELLS) {
    const g = wireFacts(c);
    if (g.thicker) assert.ok(g.thicker.area > g.area, g.slug);
    if (g.thinner) assert.ok(g.thinner.area < g.area, g.slug);
  }
});

test('견딜 수 있는지 가르는 자리', () => {
  for (const c of CELLS) {
    const f = wireFacts(c);
    assert.equal(f.fits, c.amp <= ampacityOf(areaOf(c.size)), f.slug);
  }
  // AWG 12는 20A까지, 그 위는 무리다
  assert.equal(facts('awg12-20').fits, true);
  assert.equal(facts('awg12-30').fits, false);
  // 2.5mm²는 미국 기준으로 보면 15A까지다
  assert.equal(facts('sq2-5-15').fits, true);
  assert.equal(facts('sq2-5-20').fits, false);
});

test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { WIRE_UI } = await import('../lib/wire/ui.ts');
  const { KNOWN } = await import('../lib/wire/list.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = wireFacts({ size: { awg: 12, sq: null }, amp: 15 });
  const tight = wireFacts({ size: { awg: 24, sq: null }, amp: 125 });
  for (const lang of LANG_CODES) {
    const ui = WIRE_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f), ui.metaTitle(f), ui.metaDesc(f),
      ...ui.cellFaq(f).flatMap(q => [q.q, q.a]),
      ...ui.cellFaq(tight).flatMap(q => [q.q, q.a]),
      ...SYSTEMS.map(s => ui.systemName(s.key)),
      ...Object.values(KNOWN).map(k => ui.knownName(k)),
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
  const { WIRE_UI } = await import('../lib/wire/ui.ts');
  const { KNOWN } = await import('../lib/wire/list.ts');
  for (const lang of LANG_CODES) {
    const ui = WIRE_UI[lang];
    const groups: [string, string[], (k: string) => string][] = [
      ['전압', SYSTEMS.map(s => s.key), ui.systemName],
      ['쓰임', [...new Set(Object.values(KNOWN))], ui.knownName],
    ];
    for (const [name, keys, fn] of groups) {
      const names = keys.map(k => fn(k));
      assert.equal(new Set(names).size, keys.length, `${lang}: ${name} 이름이 겹친다`);
      for (let i = 0; i < keys.length; i++) assert.notEqual(names[i], keys[i], `${lang}: ${name} ${keys[i]} 번역이 없다`);
    }
  }
  // 이름 붙인 굵기는 실제로 있는 굵기여야 한다
  for (const key of Object.keys(KNOWN)) {
    assert.ok(SIZES.some(s => sizeSlug(s) === key), `${key}는 목록에 없는 굵기다`);
  }
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { WIRE_UI } = await import('../lib/wire/ui.ts');
  const f = wireFacts({ size: { awg: 12, sq: null }, amp: 15 });
  for (const lang of LANG_CODES) {
    const ui = WIRE_UI[lang];
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
    // AWG가 수열이라는 것과 왕복이라는 것 — 이 표의 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.awgNote.length >= floor * 6, `${lang}: AWG 설명이 짧다`);
    assert.ok(ui.roundNote.length >= floor * 6, `${lang}: 왕복 설명이 짧다`);
  }
});

test('콘센트 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { WIRE_ICON } = await import('../lib/wire/list.ts');
  assert.equal(ICON_FOR[WIRE_ICON], 'plug', '이모지가 아이콘으로 이어지지 않는다');
});
