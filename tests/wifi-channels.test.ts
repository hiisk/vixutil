/**
 * 무선랜 채널이 스스로 어긋나지 않는지 본다.
 *
 * 중심 주파수는 번호에서 식으로 냈으므로, 검사는 널리 실린 값 몇 개와 맞춘다 —
 * 1번 2412MHz, 6번 2437MHz, 36번 5180MHz. 기준점을 잘못 적으면 여기서 갈린다.
 *
 * 이 표의 핵심은 "왜 1·6·11인가"다. 그 답을 표에서 베끼지 않고 구간끼리 견주어
 * 골라내므로, 검사도 골라낸 결과가 실제로 서로 겹치지 않는지를 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { BANDS, CHANNELS, DFS_FROM, DFS_TO, WIFI_ICON, WIFI_SLUGS, channelOf, labelOf, slugOf } from '../lib/wifi/list.ts';
import { centerOf, cleanSet, inBand, neighbours, overlaps, pairOf, spanOf, wifiFacts } from '../lib/wifi/facts.ts';
import { WIFI_UI } from '../lib/wifi/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(CHANNELS.length >= 100, `${CHANNELS.length}가지뿐이다`);
  assert.equal(new Set(WIFI_SLUGS).size, CHANNELS.length, 'slug 중복');
  assert.equal(inBand('2g').length, 14);
  assert.equal(inBand('5g').length, 28);
  assert.equal(inBand('6g').length, 59);
  // 번호는 대역마다 겹치므로 대역을 앞에 붙여야 주소가 갈린다
  assert.deepEqual(channelOf('2g-1'), { band: '2g', n: 1 });
  assert.deepEqual(channelOf('6g-1'), { band: '6g', n: 1 });
  assert.notDeepEqual(channelOf('2g-1'), channelOf('6g-1'));
});

test('주소와 채널이 서로를 되돌린다', () => {
  for (const c of CHANNELS) {
    assert.deepEqual(channelOf(slugOf(c)), c, `${slugOf(c)}: 되읽으면 다른 채널이 나온다`);
  }
  assert.equal(slugOf({ band: '5g', n: 36 }), '5g-36');
  assert.equal(labelOf({ band: '5g', n: 36 }), '5GHz 36');
  assert.equal(channelOf('4g-36'), undefined, '없는 대역은 받지 않는다');
  assert.equal(channelOf('5g-37'), undefined, '없는 번호는 받지 않는다');
});

test('중심 주파수가 널리 실린 값과 맞는다', () => {
  assert.equal(centerOf({ band: '2g', n: 1 }), 2412);
  assert.equal(centerOf({ band: '2g', n: 6 }), 2437);
  assert.equal(centerOf({ band: '2g', n: 11 }), 2462);
  assert.equal(centerOf({ band: '2g', n: 14 }), 2484, '14번만 식에서 벗어난다');
  assert.equal(centerOf({ band: '5g', n: 36 }), 5180);
  assert.equal(centerOf({ band: '5g', n: 149 }), 5745);
  assert.equal(centerOf({ band: '6g', n: 1 }), 5955);
  assert.equal(centerOf({ band: '6g', n: 233 }), 7115);
  // 이웃한 번호끼리의 간격 — 2.4GHz는 5MHz, 나머지는 20MHz다.
  // 13번에서 14번으로 갈 때만 12MHz로 벌어진다(14번이 식에서 벗어난 자리다).
  for (const band of BANDS) {
    const list = inBand(band);
    for (let i = 1; i < list.length; i++) {
      const gap = centerOf(list[i]) - centerOf(list[i - 1]);
      assert.ok(gap > 0, `${band}: 주파수가 번호 순서대로 늘지 않는다`);
      // 대역 안에 비어 있는 자리가 있다 — 그 자리를 검사가 못 박아 둔다
      const JUMPS: Record<string, number> = { '2g-14': 12, '5g-100': 180, '5g-149': 25 };
      const jump = JUMPS[`${band}-${list[i].n}`];
      assert.equal(gap, jump ?? (band === '2g' ? 5 : 20), `${band}: ${list[i].n}번 앞의 간격이 ${gap}MHz다`);
    }
  }
});

test('구간이 중심에서 좌우로 반씩 벌어진다', () => {
  for (const c of CHANNELS) {
    const s = spanOf(c);
    const width = c.band === '2g' ? 22 : 20;
    assert.equal(s.to - s.from, width, `${labelOf(c)}: 폭이 ${width}MHz가 아니다`);
    assert.equal((s.from + s.to) / 2, centerOf(c), `${labelOf(c)}: 구간 가운데가 중심 주파수가 아니다`);
  }
});

test('겹침은 서로에게 똑같이 일어난다', () => {
  for (const c of CHANNELS) {
    for (const o of wifiFacts(c).overlaps) {
      assert.equal(o.band, c.band, `${labelOf(c)}: 다른 대역과 겹친다고 나왔다`);
      assert.ok(overlaps(spanOf(c), spanOf(o)), `${labelOf(c)}·${labelOf(o)}: 실제로는 겹치지 않는다`);
      // 상대 쪽에서도 나를 겹친다고 해야 한다
      assert.ok(
        wifiFacts(o).overlaps.some(x => x.n === c.n),
        `${labelOf(c)}·${labelOf(o)}: 한쪽만 겹친다고 한다`,
      );
    }
  }
});

test('겹치지 않는 2.4GHz가 1·6·11로 나온다', () => {
  const clean = cleanSet('2g');
  assert.deepEqual(clean.map(c => c.n), [1, 6, 11, 14], '14번은 일본에서만 쓰는 네 번째 자리다');
  // 고른 것들끼리 실제로 겹치지 않는지 되짚는다
  for (const a of clean) {
    for (const b of clean) {
      if (a.n === b.n) continue;
      assert.ok(!overlaps(spanOf(a), spanOf(b)), `${a.n}번과 ${b.n}번이 겹친다`);
    }
  }
  // 5·6GHz는 20MHz끼리 딱 맞물려 겹치는 짝이 없다
  for (const band of ['5g', '6g'] as const) {
    assert.equal(cleanSet(band).length, inBand(band).length, `${band}: 겹치는 채널이 있다`);
    for (const c of inBand(band)) {
      assert.equal(wifiFacts(c).overlaps.length, 0, `${labelOf(c)}: 겹치는 채널이 있다`);
    }
  }
});

test('2.4GHz에서 다섯 칸을 건너뛰어야 비켜 간다', () => {
  const ch = (n: number) => ({ band: '2g' as const, n });
  assert.ok(overlaps(spanOf(ch(1)), spanOf(ch(5))), '네 칸 차이로는 겹친다');
  assert.ok(!overlaps(spanOf(ch(1)), spanOf(ch(6))), '다섯 칸 차이면 비켜 간다');
  assert.ok(overlaps(spanOf(ch(6)), spanOf(ch(10))));
  assert.ok(!overlaps(spanOf(ch(6)), spanOf(ch(11))));
});

test('40MHz 짝이 서로를 가리킨다', () => {
  for (const c of CHANNELS) {
    const p = pairOf(c);
    if (p === null) {
      assert.ok(c.band === '2g' || wifiFacts(c).pair === null);
      continue;
    }
    assert.equal(p.band, c.band, `${labelOf(c)}: 다른 대역과 묶였다`);
    assert.equal(Math.abs(p.n - c.n), 4, `${labelOf(c)}: 이웃이 아닌 채널과 묶였다`);
    // 짝의 짝은 자기 자신이다
    assert.deepEqual(pairOf(p), c, `${labelOf(c)}·${labelOf(p)}: 짝이 서로를 가리키지 않는다`);
    // 두 채널을 합치면 40MHz가 된다
    const [a, b] = [spanOf(c), spanOf(p)];
    assert.equal(Math.max(a.to, b.to) - Math.min(a.from, b.from), 40, `${labelOf(c)}: 합쳐도 40MHz가 아니다`);
  }
  assert.deepEqual(pairOf({ band: '5g', n: 36 }), { band: '5g', n: 40 });
  assert.deepEqual(pairOf({ band: '5g', n: 149 }), { band: '5g', n: 153 });
  assert.deepEqual(pairOf({ band: '6g', n: 1 }), { band: '6g', n: 5 });
  assert.equal(pairOf({ band: '2g', n: 6 }), null, '2.4GHz에서는 40MHz를 쓰지 않는다');
});

test('DFS와 나라 제한이 정해진 구간에만 붙는다', () => {
  for (const c of CHANNELS) {
    const f = wifiFacts(c);
    assert.equal(f.dfs, c.band === '5g' && c.n >= DFS_FROM && c.n <= DFS_TO, `${labelOf(c)}: DFS 판단이 다르다`);
    assert.equal(f.restricted, c.band === '2g' && c.n >= 12, `${labelOf(c)}: 나라 제한 판단이 다르다`);
    if (c.band !== '5g') assert.equal(f.dfs, false, `${labelOf(c)}: 5GHz가 아닌데 DFS다`);
  }
  assert.equal(wifiFacts({ band: '5g', n: 48 }).dfs, false);
  assert.equal(wifiFacts({ band: '5g', n: 52 }).dfs, true);
  assert.equal(wifiFacts({ band: '5g', n: 144 }).dfs, true);
  assert.equal(wifiFacts({ band: '5g', n: 149 }).dfs, false);
  // 52~64가 넷, 100~144가 열둘이다
  assert.equal(inBand('5g').filter(c => wifiFacts(c).dfs).length, 16, 'DFS 채널 열여섯 개');
});

test('이웃이 같은 대역 안에서만 나온다', () => {
  for (const c of CHANNELS) {
    const list = neighbours(c);
    assert.ok(!list.some(o => o.n === c.n), `${labelOf(c)}: 이웃에 자기 자신이 있다`);
    for (const o of list) assert.equal(o.band, c.band, `${labelOf(c)}: 다른 대역이 이웃에 섞였다`);
    assert.ok(list.length > 0, `${labelOf(c)}: 이웃이 없다`);
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const f = wifiFacts({ band: '2g', n: 6 });
  for (const lang of LANG_CODES) {
    const ui = WIFI_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f),
      ui.desc(wifiFacts({ band: '5g', n: 100 })),
      ...ui.wifiFaq(f).flatMap(q => [q.q, q.a]),
      ...BANDS.map(b => ui.bandName(b)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('대역 이름이 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    const names = BANDS.map(b => WIFI_UI[lang].bandName(b));
    assert.equal(new Set(names).size, BANDS.length, `${lang}: 대역 이름이 겹친다`);
    for (const n of names) assert.ok(n.trim().length > 0, `${lang}: 빈 대역 이름`);
  }
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = wifiFacts({ band: '2g', n: 6 });
  for (const lang of LANG_CODES) {
    const ui = WIFI_UI[lang];
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
    assert.equal(ui.wifiFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 22MHz가 1·6·11의 근거라 열 언어 모두에 적혀 있어야 한다
    assert.ok(ui.overlapNote.includes('22'), `${lang}: 22MHz가 적혀 있지 않다`);
    // 나라마다 규칙이 다르다는 것도 빠지면 안 된다
    assert.ok(ui.caution.length >= floor * 3, `${lang}: 주의 문구가 짧다`);
  }
});

test('와이파이 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[WIFI_ICON], 'wifi', '이모지가 와이파이 아이콘으로 이어지지 않는다');
});
