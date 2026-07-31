/**
 * 시작 핸드 자료가 조합과 어긋나지 않는지 본다.
 *
 * 이 섹션은 항목을 한 줄도 적지 않는다 — 169가지가 두 겹 반복문에서 나오고,
 * 확률은 조합으로 센다. 그래서 검사가 실제로 실패할 수 있다: 조합 수를 다 더하면
 * 1,326이 되어야 하고, 받을 확률을 다 더하면 100%가 되어야 한다. 세는 곳이
 * 한 군데라도 틀리면 이 합이 어긋난다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { HANDS, RANKS, handOf, labelOf } from '../lib/poker/list.ts';
import {
  FLOPS, TOTAL_DEALS, chenScore, choose, combosOf, handFacts, kindCounts,
  rankedSlugs, tierCounts, tierOf,
} from '../lib/poker/facts.ts';
import { POKER_UI, fill, numFmt } from '../lib/poker/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';

test('조합을 세는 함수가 맞다', () => {
  assert.equal(choose(52, 2), 1326);
  assert.equal(choose(50, 3), 19600);
  assert.equal(choose(48, 3), 17296);
  assert.equal(choose(44, 3), 13244);
  assert.equal(choose(11, 3), 165);
  assert.equal(choose(5, 0), 1);
  assert.equal(choose(3, 5), 0);
});

test('핸드가 169가지이고 갈래가 13·78·78이다', () => {
  assert.equal(HANDS.length, 169);
  const k = kindCounts();
  assert.deepEqual(k, { pair: 13, suited: 78, offsuit: 78 });
  // 78은 서로 다른 두 순위를 고르는 가짓수다
  assert.equal(k.suited, choose(13, 2));
});

test('조합을 다 더하면 1,326가지다', () => {
  const total = HANDS.reduce((n, h) => n + combosOf(h), 0);
  assert.equal(total, TOTAL_DEALS);
  assert.equal(total, 1326);
});

test('받을 확률을 다 더하면 100%다', () => {
  const total = HANDS.reduce((n, h) => n + handFacts(h).dealtPct, 0);
  assert.ok(Math.abs(total - 100) < 1e-9, `${total}%가 됐다`);
});

test('slug이 겹치지 않고 주소로 쓸 수 있다', () => {
  const seen = new Set<string>();
  for (const h of HANDS) {
    assert.match(h.slug, /^[2-9tjqka]{2}[so]?$/, `주소에 못 쓰는 slug: ${h.slug}`);
    assert.ok(!seen.has(h.slug), `slug 중복: ${h.slug}`);
    seen.add(h.slug);
    assert.equal(handOf(h.slug)?.slug, h.slug);
    // 표기는 높은 순위가 앞이다
    assert.ok(h.high >= h.low, `${h.slug}: 순위가 뒤집혔다`);
    assert.equal(labelOf(h)[0], RANKS[h.high]);
  }
});

test('첸 점수가 알려진 값과 같다', () => {
  const want: Record<string, number> = {
    aa: 20, kk: 16, qq: 14, jj: 12, tt: 10, 22: 5,
    aks: 12, ako: 10, aqs: 11, jts: 9, '54s': 6,
    '72o': -1, '32o': 3,
  };
  for (const [slug, score] of Object.entries(want)) {
    assert.equal(chenScore(handOf(slug)!), score, `${slug}의 점수`);
  }
  // 페어는 최소 5점이다 — 22가 그 바닥을 밟는다
  assert.equal(chenScore(handOf('22')!), 5);
});

test('플롭 확률이 조합과 맞는다', () => {
  const set = handFacts(handOf('aa')!).flop.find(x => x.key === 'set')!;
  const quads = handFacts(handOf('aa')!).flop.find(x => x.key === 'quads')!;
  const pair = handFacts(handOf('ako')!).flop.find(x => x.key === 'pair')!;
  const draw = handFacts(handOf('aks')!).flop.find(x => x.key === 'flushDraw')!;
  const flush = handFacts(handOf('aks')!).flop.find(x => x.key === 'flush')!;

  // 닫힌 식으로 다시 세어 맞춘다 — 두 길이 같은 값을 내야 한다
  assert.ok(Math.abs(set.pct - ((FLOPS - choose(48, 3)) / FLOPS) * 100) < 1e-9);
  assert.ok(Math.abs(pair.pct - ((FLOPS - choose(44, 3)) / FLOPS) * 100) < 1e-9);
  assert.ok(Math.abs(draw.pct - ((choose(11, 2) * 39) / FLOPS) * 100) < 1e-9);
  assert.ok(Math.abs(flush.pct - (choose(11, 3) / FLOPS) * 100) < 1e-9);

  // 널리 알려진 값과도 맞는지 — 자릿수가 어긋나면 여기서 걸린다
  assert.equal(set.pct.toFixed(2), '11.76');
  assert.equal(quads.pct.toFixed(2), '0.24');
  assert.equal(pair.pct.toFixed(2), '32.43');
  assert.equal(draw.pct.toFixed(2), '10.94');
  assert.equal(flush.pct.toFixed(2), '0.84');
});

test('페어에는 플러시 값이, 오프수트에는 셋 값이 붙지 않는다', () => {
  for (const h of HANDS) {
    const keys = handFacts(h).flop.map(x => x.key);
    if (h.kind === 'pair') {
      assert.ok(keys.includes('set'), `${h.slug}: 셋 확률이 없다`);
      assert.ok(!keys.includes('flushDraw'), `${h.slug}: 페어에 플러시 드로가 붙었다`);
    } else {
      assert.ok(keys.includes('pair'), `${h.slug}: 짝 확률이 없다`);
      assert.ok(!keys.includes('set'), `${h.slug}: 페어가 아닌데 셋 확률이 붙었다`);
      assert.equal(keys.includes('flushDraw'), h.kind === 'suited', `${h.slug}: 플러시 확률이 갈래와 어긋난다`);
    }
    for (const x of handFacts(h).flop) {
      assert.ok(x.pct >= 0 && x.pct <= 100, `${h.slug}.${x.key}: 확률이 범위를 벗어났다 (${x.pct})`);
    }
  }
});

test('순위가 1부터 169까지 한 번씩이다', () => {
  const ranks = HANDS.map(h => handFacts(h).rank).sort((a, b) => a - b);
  assert.deepEqual(ranks, Array.from({ length: 169 }, (_, i) => i + 1));
  assert.equal(rankedSlugs()[0], 'aa', '1위가 AA가 아니다');
  assert.equal(handFacts(handOf('aa')!).rank, 1);
  // 점수가 높으면 순위가 앞이다
  for (const a of HANDS) {
    for (const b of HANDS) {
      const fa = handFacts(a);
      const fb = handFacts(b);
      if (fa.score > fb.score) assert.ok(fa.rank < fb.rank, `${fa.label}(${fa.score})가 ${fb.label}(${fb.score})보다 뒤에 있다`);
    }
  }
});

test('등급을 다 더하면 169가지다', () => {
  const t = tierCounts();
  assert.equal(Object.values(t).reduce((a, b) => a + b, 0), 169);
  assert.equal(tierOf(20), 'premium');
  assert.equal(tierOf(9), 'strong');
  assert.equal(tierOf(6), 'playable');
  assert.equal(tierOf(4), 'marginal');
  assert.equal(tierOf(-1), 'weak');
});

test('가까운 핸드가 자기 자신을 가리키지 않는다', () => {
  for (const h of HANDS) {
    const f = handFacts(h);
    assert.ok(!f.siblings.includes(h.slug), `${h.slug}: 자기 자신이 들어 있다`);
    for (const kin of f.siblings) assert.ok(handOf(kin), `${h.slug}: 없는 핸드 ${kin}`);
    // 수티드와 오프수트는 서로를 가리킨다
    if (h.kind === 'suited') assert.ok(f.siblings.includes(`${h.slug.slice(0, 2)}o`), `${h.slug}: 오프수트 짝이 없다`);
    if (h.kind === 'offsuit') assert.ok(f.siblings.includes(`${h.slug.slice(0, 2)}s`), `${h.slug}: 수티드 짝이 없다`);
  }
});

test('화면 문구가 열 언어에 모두 있다', () => {
  const keys = Object.keys(POKER_UI.ko);
  for (const lang of LANG_CODES) {
    const ui = POKER_UI[lang] as unknown as Record<string, unknown>;
    assert.deepEqual(Object.keys(ui).sort(), keys.sort(), `${lang}: 열쇠가 다르다`);
    for (const [key, value] of Object.entries(ui)) {
      if (typeof value === 'string') assert.ok(value.trim().length > 0, `${lang}.${key}가 비었다`);
      else for (const [k2, v2] of Object.entries(value as Record<string, string>)) {
        assert.ok(v2.trim().length > 0, `${lang}.${key}.${k2}가 비었다`);
      }
    }
  }
});

test('문장의 빈자리가 모두 채워진다', () => {
  const k = kindCounts();
  for (const lang of LANG_CODES) {
    const ui = POKER_UI[lang];
    const filled = [
      fill(ui.hubTitle, { n: 169 }),
      fill(ui.hubLead, { n: 169 }),
      fill(ui.hubMetaTitle, { n: 169 }),
      fill(ui.hubMetaDesc, { n: 169 }),
      fill(ui.metaTitle, { name: 'AKs' }),
      fill(ui.metaDesc, { name: 'AKs', combos: 4, oneIn: '331.5', score: 12 }),
      fill(ui.combosOf, { n: 4 }),
      fill(ui.oneIn, { n: '331.5' }),
      fill(ui.rankValue, { n: 5, total: 169 }),
      fill(ui.gapValue, { n: 0 }),
      fill(ui.hq1, { n: 169 }),
      fill(ui.ha1, { n: 169, pair: k.pair, suited: k.suited, offsuit: k.offsuit }),
      fill(ui.ha3, { draw: '10.94', flush: '0.84' }),
      fill(ui.q1, { name: 'AKs' }),
      fill(ui.a1, { combos: 4, pct: '0.302', oneIn: '331.5' }),
      fill(ui.a3, { score: 12, rank: 5, n: 169, tier: ui.tier.premium }),
    ];
    for (const text of filled) assert.ok(!text.includes('{'), `${lang}: 채워지지 않은 자리 — ${text}`);
  }
});

test('숫자를 그 언어의 형식으로 적는다', () => {
  // 독일어·프랑스어·스페인어는 소수점이 쉼표다. 본문과 표가 따로 놀면 같은 값이
  // 두 모양으로 보인다 — 앞선 섹션에서 실제로 그랬다.
  assert.equal(numFmt('en', 10.9439), '10.94');
  assert.equal(numFmt('de', 10.9439), '10,94');
  assert.equal(numFmt('fr', 10.9439).replace(/ | /g, ' '), '10,94');
  assert.equal(numFmt('ko', 0.302, 3), '0.302');
  assert.equal(numFmt('pt', 0.302, 3), '0,302');
});
