/**
 * 다운로드 시간 — 계산한 값을 다른 길로 되짚는다.
 *
 * 시간은 크기와 속도에서 나오므로, 시간에 속도를 도로 곱해 크기가 나오는지
 * 본다. 포장 몫도 어림한 숫자를 믿지 않고 바이트를 다시 세어 맞춘다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, LANDMARK, LINKS, PLAN, SIZES, SPEEDS, STREAMS, cellOf, sizeLabel, slugOf,
} from '../lib/bandwidth/list.ts';
import {
  EFFICIENCY, ON_WIRE, PAYLOAD, bandwidthFacts, idealOf, partsOf, realOf,
} from '../lib/bandwidth/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return bandwidthFacts(c);
};

test('칸은 크기 24가지 × 속도 14가지', () => {
  assert.equal(SIZES.length, 24);
  assert.equal(SPEEDS.length, 14);
  assert.equal(CELLS.length, 336);
  assert.equal(new Set(CELLS.map(slugOf)).size, 336);
  // 두 목록 다 오름차순이어야 앞뒤 칸이 뜻을 가진다
  assert.deepEqual([...SIZES].sort((a, b) => a - b), SIZES);
  assert.deepEqual([...SPEEDS].sort((a, b) => a - b), SPEEDS);
});

test('주소는 되돌아온다', () => {
  for (const c of CELLS) {
    const back = cellOf(slugOf(c));
    assert.deepEqual(back, c, slugOf(c));
  }
  assert.equal(slugOf({ mb: 4700, mbps: 1000 }), '4-7gb-1000');
  assert.equal(slugOf({ mb: 700, mbps: 5 }), '700mb-5');
  assert.equal(cellOf('4-7gb'), undefined);
  assert.equal(cellOf('9gb-100'), undefined);
});

test('포장 몫은 바이트를 세어 나온다', () => {
  // 선 위 1538바이트 중 내 파일이 아닌 것을 따로 더해 본다
  const overhead = 20 /* IP */ + 20 /* TCP */ + 12 /* 옵션 */ + 14 /* 이더넷 머리 */ + 4 /* FCS */ + 8 /* 프리앰블 */ + 12 /* 틈 */;
  assert.equal(ON_WIRE - PAYLOAD, overhead);
  assert.equal(PAYLOAD, 1448);
  assert.equal(ON_WIRE, 1538);
  assert.ok(Math.abs(EFFICIENCY - (1 - overhead / ON_WIRE)) < 1e-12);
  // 6% 남짓이 포장이다 — 어림잡던 94%와 어긋나지 않는다
  assert.ok(EFFICIENCY > 0.94 && EFFICIENCY < 0.942, String(EFFICIENCY));
});

test('시간에 속도를 도로 곱하면 크기가 나온다', () => {
  for (const c of CELLS) {
    const f = bandwidthFacts(c);
    // 이상적인 시간 × 속도 ÷ 8 = 크기(MB)
    const mb = (idealOf(c.mb, c.mbps) * c.mbps) / 8;
    assert.ok(Math.abs(mb - c.mb) < 1e-6, `${f.slug}: ${mb}`);
    // 실제 시간은 그보다 길고, 그 차이가 곧 포장 몫이다
    const back = realOf(c.mb, c.mbps) * EFFICIENCY;
    assert.ok(Math.abs(back - idealOf(c.mb, c.mbps)) < 1e-9, f.slug);
    assert.ok(f.real >= f.ideal, f.slug);
  }
});

test('100Mbps로 1GB는 85초', () => {
  const f = facts('1gb-100');
  // 8000메가비트를 100Mbps로 — 나눗셈만 하면 80초다
  assert.equal(f.ideal, 80);
  assert.equal(f.real, 85);
  assert.deepEqual(f.parts, { days: 0, hours: 0, minutes: 1, seconds: 25 });
  // 광고하는 100Mbps는 12.5MB/s지만 실제로 쌓이는 것은 11.77MB/s다
  assert.equal(f.peak, 12.5);
  assert.equal(f.perSecond, 11.77);
});

test('일·시·분·초는 다시 더하면 원래 초다', () => {
  for (const c of CELLS) {
    const f = bandwidthFacts(c);
    const p = f.parts;
    const sum = p.days * 86400 + p.hours * 3600 + p.minutes * 60 + p.seconds;
    assert.equal(sum, Math.round(realOf(c.mb, c.mbps)), f.slug);
    assert.ok(p.hours < 24 && p.minutes < 60 && p.seconds < 60, f.slug);
  }
  assert.deepEqual(partsOf(90061), { days: 1, hours: 1, minutes: 1, seconds: 1 });
});

test('시간이 같은 칸은 크기와 속도가 같은 배다', () => {
  const f = facts('1gb-100');
  // 1GB를 100Mbps로 받는 시간은 10GB를 1000Mbps로 받는 시간과 같다
  assert.ok(f.sameTime.some(n => n.slug === '10gb-1000'), f.sameTime.map(n => n.slug).join(','));
  for (const n of f.sameTime) {
    assert.equal(realOf(n.mb, n.mbps).toFixed(6), realOf(1000, 100).toFixed(6), n.slug);
    assert.notEqual(n.slug, f.slug);
  }
  // 아무 칸이나 잡아도 같은 시간인 것만 들어 있어야 한다
  for (const c of CELLS) {
    const g = bandwidthFacts(c);
    const mine = g.ideal;
    for (const n of g.sameTime) assert.equal(bandwidthFacts({ mb: n.mb, mbps: n.mbps }).ideal, mine, `${g.slug} ↔ ${n.slug}`);
  }
});

test('윈도우가 보여 주는 크기는 더 작다', () => {
  // 4.7GB DVD는 탐색기에서 4.38GB로 보인다 — 같은 파일, 다른 자
  assert.equal(facts('4-7gb-100').gib, 4.38);
  assert.equal(facts('1gb-100').gib, 0.93);
  assert.equal(facts('100gb-100').gib, 93.13);
  for (const c of CELLS) {
    const f = bandwidthFacts(c);
    assert.ok(f.gib < c.mb / 1000 + 1e-9, f.slug);
  }
});

test('앞뒤 칸은 한 단계씩만 움직인다', () => {
  const f = facts('4-7gb-100');
  assert.equal(f.faster?.slug, '4-7gb-200');
  assert.equal(f.slower?.slug, '4-7gb-50');
  assert.equal(f.bigger?.slug, '6gb-100');
  assert.equal(f.smaller?.slug, '3gb-100');
  // 목록 끝에서는 한쪽이 비어야 한다
  assert.equal(facts('10mb-5').slower, null);
  assert.equal(facts('10mb-5').smaller, null);
  assert.equal(facts('150gb-10000').faster, null);
  assert.equal(facts('150gb-10000').bigger, null);
  // 빠른 회선은 반드시 더 짧게 걸린다
  for (const c of CELLS) {
    const g = bandwidthFacts(c);
    if (g.faster) assert.ok(realOf(g.faster.mb, g.faster.mbps) < realOf(c.mb, c.mbps), g.slug);
    if (g.bigger) assert.ok(realOf(g.bigger.mb, g.bigger.mbps) > realOf(c.mb, c.mbps), g.slug);
  }
});

test('1분 안에 받으려면 필요한 속도', () => {
  for (const c of CELLS) {
    const f = bandwidthFacts(c);
    // 그 속도로 다시 계산하면 60초 안에 들어와야 한다
    assert.ok(realOf(c.mb, f.minuteSpeed) <= 60 + 1e-9, `${f.slug}: ${f.minuteSpeed}Mbps → ${realOf(c.mb, f.minuteSpeed)}초`);
    // 1Mbps만 낮춰도 넘긴다 — 넉넉히 잡은 값이 아니다
    if (f.minuteSpeed > 1) assert.ok(realOf(c.mb, f.minuteSpeed - 1) > 60, f.slug);
  }
  assert.equal(facts('1gb-100').minuteSpeed, 142);
});

test('회선보다 좁은 구간이 병목이다', () => {
  // 기가 회선은 Wi-Fi 5(866Mbps)로 다 받아낼 수 없다
  assert.deepEqual(facts('1gb-1000').bottlenecks.map(b => b.key), ['wifi4', 'usb2', 'wifi5']);
  // 500Mbps까지는 Wi-Fi 5로 충분하다
  assert.deepEqual(facts('1gb-500').bottlenecks.map(b => b.key), ['wifi4', 'usb2']);
  assert.deepEqual(facts('1gb-100').bottlenecks, []);
  for (const c of CELLS) {
    const f = bandwidthFacts(c);
    for (const l of LINKS) {
      assert.equal(f.bottlenecks.includes(l), l.mbps < c.mbps, `${f.slug} ${l.key}`);
    }
  }
  assert.deepEqual([...LINKS].sort((a, b) => a.mbps - b.mbps), LINKS);
});

test('동시에 흘릴 수 있는 수', () => {
  const uhd = STREAMS.find(s => s.key === 'uhd');
  assert.ok(uhd);
  // 100Mbps면 4K 세 편 — 광고 속도로는 네 편처럼 보이지만 포장 몫이 빠진다
  assert.equal(Math.floor(100 / uhd.mbps), 4);
  assert.equal(facts('1gb-100').streams.find(s => s.key === 'uhd')?.count, 3);
  for (const c of CELLS) {
    const f = bandwidthFacts(c);
    for (const s of f.streams) {
      const need = STREAMS.find(x => x.key === s.key)!.mbps;
      assert.ok(need * s.count <= c.mbps, `${f.slug} ${s.key}`);
    }
  }
});

test('하루 종일 당기면 쌓이는 양', () => {
  // 기가 회선을 24시간 꽉 채우면 10테라바이트가 넘는다
  assert.equal(facts('1gb-1000').dayGb, 10168);
  assert.equal(facts('1gb-5').dayGb, 50.8);
  for (const c of CELLS) {
    const f = bandwidthFacts(c);
    // 하루치를 이 파일 크기로 나눈 수만큼 받을 수 있어야 한다
    const copies = (f.dayGb * 1000) / c.mb;
    // dayGb는 보여 주려고 한 자리에서 끊은 값이라 그만큼은 어긋난다
    assert.ok(Math.abs(copies - 86400 / realOf(c.mb, c.mbps)) < copies * 0.002, f.slug);
  }
});

test('크기 이름은 1000MB에서 GB로 바뀐다', () => {
  assert.equal(sizeLabel(700), '700MB');
  assert.equal(sizeLabel(1000), '1GB');
  assert.equal(sizeLabel(1500), '1.5GB');
  assert.equal(sizeLabel(4700), '4.7GB');
  assert.equal(sizeLabel(150000), '150GB');
  for (const mb of SIZES) assert.match(sizeLabel(mb), /^[0-9]+(\.[0-9])?(MB|GB)$/);
});

test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { BANDWIDTH_UI } = await import('../lib/bandwidth/ui.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = bandwidthFacts({ mb: 1000, mbps: 100 });
  for (const lang of LANG_CODES) {
    const ui = BANDWIDTH_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f), ui.metaTitle(f), ui.metaDesc(f), ui.time(f),
      ...ui.cellFaq(f).flatMap(q => [q.q, q.a]),
      ...LINKS.map(l => ui.linkName(l.key)),
      ...STREAMS.map(s => ui.streamName(s.key)),
      ...Object.values(LANDMARK).map(k => ui.landmarkName(k)),
      ...Object.values(PLAN).map(k => ui.planName(k)),
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
  const { BANDWIDTH_UI } = await import('../lib/bandwidth/ui.ts');
  for (const lang of LANG_CODES) {
    const ui = BANDWIDTH_UI[lang];
    for (const [name, keys] of [
      ['링크', LINKS.map(l => l.key)],
      ['스트림', STREAMS.map(s => s.key)],
      ['크기 이름', Object.values(LANDMARK)],
      ['속도 이름', Object.values(PLAN)],
    ] as [string, string[]][]) {
      const fn = { 링크: ui.linkName, 스트림: ui.streamName, '크기 이름': ui.landmarkName, '속도 이름': ui.planName }[name]!;
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
  const { BANDWIDTH_UI } = await import('../lib/bandwidth/ui.ts');
  const f = bandwidthFacts({ mb: 1000, mbps: 100 });
  for (const lang of LANG_CODES) {
    const ui = BANDWIDTH_UI[lang];
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
    // 비트와 바이트, 포장 몫 — 이 표의 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.unitNote.length >= floor * 6, `${lang}: 단위 설명이 짧다`);
    assert.ok(ui.overheadNote.length >= floor * 6, `${lang}: 포장 설명이 짧다`);
  }
});

test('시간은 큰 단위 둘까지만 말한다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { BANDWIDTH_UI } = await import('../lib/bandwidth/ui.ts');
  for (const lang of LANG_CODES) {
    const time = BANDWIDTH_UI[lang].time;
    for (const c of CELLS) {
      const f = bandwidthFacts(c);
      const digits = time(f).match(/[0-9]+(\.[0-9]+)?/g) ?? [];
      assert.ok(digits.length >= 1 && digits.length <= 2, `${lang} ${f.slug}: ${time(f)}`);
      // 1분이 안 되면 초 하나로만 말한다
      if (f.real < 60) assert.equal(digits.length, 1, `${lang} ${f.slug}: ${time(f)}`);
    }
  }
  const ko = BANDWIDTH_UI.ko.time;
  assert.equal(ko(bandwidthFacts({ mb: 1000, mbps: 100 })), '1분 25초');
  assert.equal(ko(bandwidthFacts({ mb: 150000, mbps: 5 })), '2일 22시간');
  assert.equal(ko(bandwidthFacts({ mb: 10, mbps: 2500 })), '0.03초');
});

test('내림 화살표는 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { BANDWIDTH_ICON } = await import('../lib/bandwidth/list.ts');
  assert.equal(ICON_FOR[BANDWIDTH_ICON], 'arrowDown', '이모지가 아이콘으로 이어지지 않는다');
});
