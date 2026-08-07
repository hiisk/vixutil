import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  shuffle, fullDeck, drawCards, SUITS, RANKS,
  HANDS, judge, throwHand,
  bingoBoard, bingoLines, bingoCount,
  weightedPick, weightedPercents,
  dutyRoster, dutyCounts,
  decideYesNo, type Rng,
} from '../lib/random-more.ts';

/**
 * 뽑기 도구 여섯의 계산 검사.
 *
 * 무작위를 쓰는 코드일수록 검사가 필요하다 — 빙고판에 같은 수가 두 번 들어가거나
 * 가중치가 무시되고 있어도 몇 번 눌러서는 알 수 없다.
 *
 * 두 가지 방법을 쓴다.
 *  1. **난수를 못 박아** 결과를 정확히 짚는다(정해진 수열을 넣는다).
 *  2. **만 번을 돌려** 분포를 본다 — 확률이 실제로 가중치를 따르는지는 이렇게만 볼 수 있다.
 */

/** 정해진 수열을 돌려주는 난수 — 다 쓰면 처음으로 돌아온다 */
function fixed(seq: number[]): Rng {
  let i = 0;
  return () => seq[i++ % seq.length];
}

/** 되풀이 가능한 난수 (mulberry32) — 만 번 돌리는 검사가 매번 같은 답을 내게 한다 */
function seeded(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ────────── 섞기 ────────── */

test('섞어도 항목이 늘거나 줄지 않는다', () => {
  const src = [1, 2, 3, 4, 5, 6, 7, 8];
  const out = shuffle(src, seeded(1));
  assert.equal(out.length, src.length);
  assert.deepEqual([...out].sort((a, b) => a - b), src);
});

test('섞기가 원본을 건드리지 않는다', () => {
  const src = [1, 2, 3];
  shuffle(src, seeded(2));
  assert.deepEqual(src, [1, 2, 3]);
});

test('어느 자리에나 어느 항목이든 올 수 있다', () => {
  /*
   * 앞에서부터 섞는 잘못된 방법은 자리마다 확률이 치우친다. 만 번 돌려
   * 네 항목이 첫 자리에 오는 횟수가 고른지 본다(고르면 각 25%).
   */
  const rng = seeded(7);
  const first: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (let i = 0; i < 10000; i++) first[shuffle([1, 2, 3, 4], rng)[0]]++;
  for (const [k, n] of Object.entries(first)) {
    assert.ok(n > 2200 && n < 2800, `${k}이 첫 자리에 온 횟수 ${n} — 25%에서 너무 벗어났다`);
  }
});

/* ────────── 카드 ────────── */

test('한 벌은 52장이고 겹치는 카드가 없다', () => {
  const deck = fullDeck();
  assert.equal(deck.length, 52);
  assert.equal(new Set(deck.map(c => c.suit + c.rank)).size, 52);
  assert.equal(new Set(deck.map(c => c.suit)).size, SUITS.length);
  assert.equal(new Set(deck.map(c => c.rank)).size, RANKS.length);
});

test('빨간 카드는 하트와 다이아뿐이고 26장이다', () => {
  const deck = fullDeck();
  assert.equal(deck.filter(c => c.red).length, 26);
  for (const c of deck) assert.equal(c.red, c.suit === '♥' || c.suit === '♦', `${c.suit}${c.rank}`);
});

test('여러 장을 뽑아도 같은 카드가 두 번 나오지 않는다', () => {
  // 매번 52장에서 독립으로 뽑으면 겹친다 — 그러면 카드놀이로 못 쓴다.
  for (let seed = 1; seed <= 20; seed++) {
    const hand = drawCards(10, seeded(seed));
    assert.equal(hand.length, 10);
    assert.equal(new Set(hand.map(c => c.suit + c.rank)).size, 10, `seed ${seed}에서 겹쳤다`);
  }
});

test('52장보다 많이 달라고 해도 52장까지만 준다', () => {
  assert.equal(drawCards(100, seeded(3)).length, 52);
  assert.equal(drawCards(0, seeded(3)).length, 0);
  assert.equal(drawCards(-5, seeded(3)).length, 0);
});

/* ────────── 가위바위보 ────────── */

test('세 손이 서로 물고 물린다', () => {
  assert.equal(judge('rock', 'scissors'), 'win');
  assert.equal(judge('scissors', 'paper'), 'win');
  assert.equal(judge('paper', 'rock'), 'win');
});

test('같은 손은 비기고, 지는 쪽은 정확히 반대다', () => {
  for (const a of HANDS) {
    assert.equal(judge(a, a), 'draw');
    for (const b of HANDS) {
      if (a === b) continue;
      // a가 b를 이기면 b는 a에게 져야 한다 — 한쪽만 고치면 여기서 걸린다
      assert.equal(judge(a, b) === 'win', judge(b, a) === 'lose', `${a} vs ${b}`);
    }
  }
});

test('세 손이 고르게 나온다', () => {
  const rng = seeded(11);
  const count: Record<string, number> = { rock: 0, paper: 0, scissors: 0 };
  for (let i = 0; i < 9000; i++) count[throwHand(rng)]++;
  for (const [k, n] of Object.entries(count)) {
    assert.ok(n > 2700 && n < 3300, `${k} ${n}번 — 3분의 1에서 너무 벗어났다`);
  }
});

/* ────────── 빙고 ────────── */

test('빙고판에 같은 수가 두 번 들어가지 않는다', () => {
  /*
   * 여기가 이 도구의 핵심이다. 같은 수가 두 칸에 있으면 그 수가 불렸을 때
   * 두 칸이 함께 지워져 빙고가 빨리 나 버린다.
   */
  for (const size of [3, 4, 5, 7]) {
    for (let seed = 1; seed <= 10; seed++) {
      const b = bingoBoard(size, seeded(seed));
      const nums = b.cells.filter((c): c is number => c !== null);
      assert.equal(new Set(nums).size, nums.length, `${size}판 seed ${seed}에서 겹쳤다`);
      assert.equal(nums.length, size * size);
    }
  }
});

test('빙고판의 수는 1부터 칸 수까지 빠짐없이 들어간다', () => {
  const b = bingoBoard(5, seeded(4));
  const nums = (b.cells.filter((c): c is number => c !== null)).sort((x, y) => x - y);
  assert.deepEqual(nums, Array.from({ length: 25 }, (_, i) => i + 1));
});

test('무료 칸은 홀수 판의 한가운데에만 생긴다', () => {
  const odd = bingoBoard(5, seeded(5), true);
  assert.equal(odd.cells[12], null, '5판의 가운데가 비지 않았다');
  assert.equal(odd.cells.filter(c => c === null).length, 1);

  // 짝수 판에는 가운데가 없다 — 무료 칸을 켜도 아무 칸도 비면 안 된다
  const even = bingoBoard(4, seeded(5), true);
  assert.equal(even.cells.filter(c => c === null).length, 0);
});

test('판 크기는 3에서 9 사이로 묶인다', () => {
  assert.equal(bingoBoard(1, seeded(1)).size, 3);
  assert.equal(bingoBoard(99, seeded(1)).size, 9);
});

test('빙고 줄은 가로·세로·대각선 두 개다', () => {
  const lines = bingoLines(5);
  assert.equal(lines.length, 5 + 5 + 2);
  for (const l of lines) assert.equal(l.length, 5);
  assert.deepEqual(lines[10], [0, 6, 12, 18, 24], '↘ 대각선');
  assert.deepEqual(lines[11], [4, 8, 12, 16, 20], '↙ 대각선');
});

test('완성된 줄만 빙고로 센다', () => {
  assert.equal(bingoCount(3, new Set([0, 1, 2])), 1, '첫 가로줄');
  assert.equal(bingoCount(3, new Set([0, 1])), 0, '한 칸이 모자라면 빙고가 아니다');
  assert.equal(bingoCount(3, new Set([0, 1, 2, 3, 6])), 2, '가로 한 줄 + 세로 한 줄');
  assert.equal(bingoCount(3, new Set([0, 1, 2, 3, 4, 5, 6, 7, 8])), 8, '다 지우면 가로3+세로3+대각2');
});

/* ────────── 가중치 ────────── */

test('가중치가 0 이하인 항목은 뽑히지 않는다', () => {
  const items = [{ label: 'a', weight: 0 }, { label: 'b', weight: -3 }, { label: 'c', weight: 1 }];
  const rng = seeded(9);
  for (let i = 0; i < 500; i++) assert.equal(weightedPick(items, rng)!.label, 'c');
});

test('전부 0이면 아무것도 안 뽑는다', () => {
  assert.equal(weightedPick([{ label: 'a', weight: 0 }], seeded(1)), null);
  assert.equal(weightedPick([], seeded(1)), null);
});

test('뽑히는 비율이 가중치를 따른다', () => {
  /*
   * 이 검사가 이 함수의 전부다. 가중치를 무시하고 고르게 뽑아도 화면에서는
   * 그럴듯해 보인다 — 만 번을 돌려야 드러난다.
   * a:b:c = 1:3:6이면 각각 10% · 30% · 60%.
   */
  const items = [{ label: 'a', weight: 1 }, { label: 'b', weight: 3 }, { label: 'c', weight: 6 }];
  const rng = seeded(13);
  const count: Record<string, number> = { a: 0, b: 0, c: 0 };
  for (let i = 0; i < 10000; i++) count[weightedPick(items, rng)!.label]++;
  assert.ok(Math.abs(count.a - 1000) < 200, `a ${count.a} (기대 1000)`);
  assert.ok(Math.abs(count.b - 3000) < 300, `b ${count.b} (기대 3000)`);
  assert.ok(Math.abs(count.c - 6000) < 400, `c ${count.c} (기대 6000)`);
});

test('구간의 첫 점과 끝 점이 올바른 항목으로 간다', () => {
  const items = [{ label: 'a', weight: 1 }, { label: 'b', weight: 1 }];
  assert.equal(weightedPick(items, fixed([0]))!.label, 'a', '0은 첫 항목');
  assert.equal(weightedPick(items, fixed([0.4999]))!.label, 'a', '경계 직전은 첫 항목');
  assert.equal(weightedPick(items, fixed([0.5]))!.label, 'b', '경계는 둘째 항목');
  assert.equal(weightedPick(items, fixed([0.9999]))!.label, 'b');
});

test('보여주는 확률의 합이 정확히 100이 된다', () => {
  // 셋을 3등분하면 33.3씩이라 합이 99.9다 — 그 오차를 가장 큰 쪽에 몰아준다.
  for (const ws of [[1, 1, 1], [1, 2, 3], [7, 7, 7, 7, 7, 7], [1], [5, 1]]) {
    const p = weightedPercents(ws.map((w, i) => ({ label: String(i), weight: w })));
    const sum = Math.round(p.reduce((a, b) => a + b, 0) * 10) / 10;
    assert.equal(sum, 100, `${ws.join(':')} → ${p.join(' + ')} = ${sum}`);
  }
});

/* ────────── 당번표 ────────── */

test('한 바퀴 안에서 같은 사람이 두 번 걸리지 않는다', () => {
  const names = ['가', '나', '다', '라'];
  const roster = dutyRoster(names, 4, 1, seeded(21));
  const who = roster.flatMap(d => d.people);
  assert.equal(new Set(who).size, 4, `한 바퀴에 겹쳤다: ${who.join(', ')}`);
});

test('여러 바퀴를 돌아도 횟수가 고르다', () => {
  /*
   * 매번 독립으로 뽑으면 누구는 세 번 하고 누구는 한 번도 안 한다 —
   * 그러면 당번표로 쓸 수 없다.
   */
  const names = ['가', '나', '다', '라', '마'];
  const counts = dutyCounts(dutyRoster(names, 20, 1, seeded(22)));
  const values = names.map(n => counts[n] ?? 0);
  assert.equal(Math.max(...values) - Math.min(...values), 0, `횟수: ${values.join(', ')}`);
});

test('바퀴가 바뀔 때 같은 사람이 연달아 오지 않는다', () => {
  const names = ['가', '나', '다', '라'];
  for (let seed = 1; seed <= 30; seed++) {
    const who = dutyRoster(names, 12, 1, seeded(seed)).flatMap(d => d.people);
    for (let i = 1; i < who.length; i++) {
      assert.notEqual(who[i], who[i - 1], `seed ${seed}: ${who[i]}가 연달아 두 번 (${i}번째)`);
    }
  }
});

test('한 차례에 여러 명을 세울 수 있다', () => {
  const roster = dutyRoster(['가', '나', '다', '라', '마', '바'], 3, 2, seeded(23));
  assert.equal(roster.length, 3);
  for (const d of roster) {
    assert.equal(d.people.length, 2);
    assert.equal(new Set(d.people).size, 2, '한 차례에 같은 사람이 두 번');
  }
});

test('사람이 한 명뿐이어도 멈추지 않는다', () => {
  // 앞뒤가 겹치지 않게 바꿀 상대가 없다 — 무한 루프로 빠지기 쉬운 자리다.
  const roster = dutyRoster(['혼자'], 5, 1, seeded(24));
  assert.equal(roster.length, 5);
  assert.deepEqual(roster.map(d => d.people[0]), ['혼자', '혼자', '혼자', '혼자', '혼자']);
});

test('빈 명단이나 0차례는 빈 표를 준다', () => {
  assert.deepEqual(dutyRoster([], 5, 1, seeded(1)), []);
  assert.deepEqual(dutyRoster(['가'], 0, 1, seeded(1)), []);
  assert.deepEqual(dutyRoster(['  ', ''], 3, 1, seeded(1)), [], '공백뿐인 이름은 사람이 아니다');
});

/* ────────── 예/아니오 ────────── */

test('치우침 100이면 늘 예, 0이면 늘 아니오', () => {
  const rng = seeded(31);
  for (let i = 0; i < 200; i++) {
    assert.equal(decideYesNo(100, rng).yes, true);
    assert.equal(decideYesNo(0, rng).yes, false);
  }
});

test('치우침이 실제 확률이 된다', () => {
  const rng = seeded(33);
  let yes = 0;
  for (let i = 0; i < 10000; i++) if (decideYesNo(70, rng).yes) yes++;
  assert.ok(Math.abs(yes - 7000) < 300, `예가 ${yes}번 (기대 7000)`);
});

test('범위를 벗어난 치우침은 0~100으로 묶인다', () => {
  assert.equal(decideYesNo(-50, seeded(1)).lean, 0);
  assert.equal(decideYesNo(500, seeded(1)).lean, 100);
});
