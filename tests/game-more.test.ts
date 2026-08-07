import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  STROOP_KEYS, STROOP_HEX, stroopTrial, stroopCorrect,
  dotRound, dotScore,
  nBackRun, nBackScore,
  rotate90, mirror, isRotation, rotationPuzzle,
  beatScore, peripheralTarget, type Rng,
} from '../lib/game-more.ts';

/**
 * 두뇌 게임 여섯의 계산 검사.
 *
 * 게임에서 눈으로 못 잡는 것은 **난이도 곡선과 채점**이다. 단계가 올라도
 * 안 어려워지거나, 찍어도 절반을 맞히거나, 정답이 늘 같은 자리에 있어도
 * 몇 판 해서는 모른다. 그래서 여기서 잰다.
 */

function seeded(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ────────── 스트룹 ────────── */

test('모든 색에 실제 색값이 있다', () => {
  for (const k of STROOP_KEYS) assert.match(STROOP_HEX[k], /^#[0-9a-f]{6}$/i, k);
});

test('보기에 정답이 반드시 들어 있고 겹치지 않는다', () => {
  const rng = seeded(1);
  for (let i = 0; i < 500; i++) {
    const t = stroopTrial(rng);
    assert.ok(t.options.includes(t.ink), '정답이 보기에 없다');
    assert.equal(new Set(t.options).size, t.options.length, '보기가 겹친다');
    assert.equal(t.options.length, 4);
  }
});

test('정답이 특정 자리에 몰리지 않는다', () => {
  // 정답이 늘 첫 자리면 문제를 안 보고도 맞힌다.
  const rng = seeded(2);
  const at = [0, 0, 0, 0];
  for (let i = 0; i < 4000; i++) {
    const t = stroopTrial(rng);
    at[t.options.indexOf(t.ink)]++;
  }
  for (const [i, n] of at.entries()) {
    assert.ok(n > 800 && n < 1200, `${i}번 자리 ${n}번 — 25%에서 너무 벗어났다`);
  }
});

test('낱말과 잉크가 같은 문제가 섞여 있다', () => {
  /*
   * 전부 어긋나 있으면 "낱말을 무시하라"가 아니라 "낱말의 반대를 고르라"가 되어
   * 오히려 쉬워진다. 30%로 잡았으니 그 근처여야 한다.
   */
  const rng = seeded(3);
  let same = 0;
  for (let i = 0; i < 5000; i++) if (stroopTrial(rng, 0.3).congruent) same++;
  assert.ok(same > 1300 && same < 1700, `같은 문제가 ${same}/5000`);
});

test('congruent가 실제로 낱말 == 잉크를 뜻한다', () => {
  const rng = seeded(4);
  for (let i = 0; i < 500; i++) {
    const t = stroopTrial(rng);
    assert.equal(t.congruent, t.word === t.ink, `${t.word} / ${t.ink}`);
  }
});

test('정답 판정은 잉크 색을 따른다', () => {
  const t = stroopTrial(seeded(5));
  assert.equal(stroopCorrect(t, t.ink), true);
  if (!t.congruent) assert.equal(stroopCorrect(t, t.word), false, '낱말을 골랐는데 맞다고 했다');
});

/* ────────── 개수 어림 ────────── */

test('단계가 오르면 개수는 늘고 시간은 준다', () => {
  const rng = seeded(6);
  const a = dotRound(1, rng);
  const b = dotRound(10, rng);
  const c = dotRound(25, rng);
  assert.ok(a.count < b.count && b.count < c.count, `개수 ${a.count} → ${b.count} → ${c.count}`);
  assert.ok(a.showMs > b.showMs && b.showMs > c.showMs, `시간 ${a.showMs} → ${b.showMs} → ${c.showMs}`);
});

test('보이는 시간이 사람이 못 볼 만큼 짧아지지 않는다', () => {
  const rng = seeded(7);
  for (let lv = 1; lv <= 200; lv++) assert.ok(dotRound(lv, rng).showMs >= 320, `${lv}단계`);
});

test('점 좌표가 화면 안에 들어간다', () => {
  const r = dotRound(8, seeded(8));
  assert.equal(r.dots.length, r.count);
  for (const d of r.dots) {
    assert.ok(d.x >= 0 && d.x <= 1 && d.y >= 0 && d.y <= 1, `${d.x}, ${d.y}`);
  }
});

test('정확히 맞히면 100, 멀수록 0으로 간다', () => {
  assert.equal(dotScore(20, 20), 100);
  assert.ok(dotScore(20, 21) > dotScore(20, 24));
  assert.equal(dotScore(20, 0), 0);
  assert.equal(dotScore(0, 5), 0, '정답이 0이면 0점');
});

test('오차를 정답 대비 비율로 잰다', () => {
  /*
   * 절대 오차로 재면 쉰 개에서 둘 틀린 것이 다섯 개에서 둘 틀린 것과 같은
   * 점수를 받아 뒷단계가 지나치게 후해진다.
   */
  assert.ok(dotScore(50, 52) > dotScore(5, 7), '큰 수에서 2 틀린 게 더 나아야 한다');
  assert.equal(dotScore(10, 11), dotScore(50, 55), '같은 비율이면 같은 점수');
});

/* ────────── 엔백 ────────── */

test('일치가 실제로 n칸 앞과 같다', () => {
  const rng = seeded(9);
  const run = nBackRun(60, 2, rng);
  for (let i = run.n; i < run.items.length; i++) {
    assert.equal(run.matches[i], run.items[i] === run.items[i - run.n], `${i}번째`);
  }
});

test('처음 n개는 일치가 아니다', () => {
  const run = nBackRun(20, 3, seeded(10));
  for (let i = 0; i < run.n; i++) assert.equal(run.matches[i], false, `${i}번째`);
});

test('일치가 충분히 자주 나온다', () => {
  /*
   * 순수한 난수로 두면 같은 자리가 나올 확률이 1/9뿐이라 한 판에 한두 번이고,
   * 그러면 "아니오"만 눌러도 높은 점수가 나온다.
   */
  const run = nBackRun(2000, 2, seeded(11), 0.3);
  const rate = run.matches.filter(Boolean).length / (run.items.length - run.n);
  assert.ok(rate > 0.24 && rate < 0.36, `일치 비율 ${(rate * 100).toFixed(1)}%`);
});

test('일치 비율이 우연 때문에 올라가지 않는다', () => {
  // 일부러 맞춘 것이 아닌데 우연히 같으면 비켜 주어야 한다.
  const run = nBackRun(3000, 1, seeded(12), 0);
  assert.equal(run.matches.filter(Boolean).length, 0);
  for (let i = 1; i < run.items.length; i++) {
    assert.notEqual(run.items[i], run.items[i - 1], `${i}번째가 우연히 같다`);
  }
});

test('전부 누르면 점수가 높지 않다', () => {
  /*
   * 오답을 안 빼면 "전부 누르기"가 최적 전략이 되어 게임이 성립하지 않는다.
   */
  const run = nBackRun(100, 2, seeded(13), 0.3);
  const all = new Set(run.items.map((_, i) => i));
  const s = nBackScore(run, all);
  assert.equal(s.miss, 0, '전부 눌렀으니 놓친 것은 없다');
  assert.ok(s.falseAlarm > 0, '잘못 누른 것이 있어야 한다');
  assert.ok(s.score < 40, `전부 눌러서 ${s.score}점 — 너무 높다`);
});

test('완벽하게 하면 100점', () => {
  const run = nBackRun(80, 2, seeded(14), 0.3);
  const perfect = new Set(run.matches.map((m, i) => (m ? i : -1)).filter(i => i >= 0));
  const s = nBackScore(run, perfect);
  assert.equal(s.score, 100);
  assert.equal(s.miss, 0);
  assert.equal(s.falseAlarm, 0);
});

test('아무것도 안 누르면 0점', () => {
  const run = nBackRun(80, 2, seeded(15), 0.3);
  assert.equal(nBackScore(run, new Set()).score, 0);
});

/* ────────── 도형 회전 ────────── */

test('네 번 돌리면 제자리로 온다', () => {
  const s = [0, 1, 4, 7];
  let cur = s;
  for (let i = 0; i < 4; i++) cur = rotate90(cur);
  assert.deepEqual(cur, s);
});

test('90도 회전이 실제 좌표를 옮긴다', () => {
  // 왼쪽 위(0) → 오른쪽 위(2) → 오른쪽 아래(8) → 왼쪽 아래(6)
  assert.deepEqual(rotate90([0]), [2]);
  assert.deepEqual(rotate90([2]), [8]);
  assert.deepEqual(rotate90([8]), [6]);
  assert.deepEqual(rotate90([6]), [0]);
  assert.deepEqual(rotate90([4]), [4], '가운데는 그대로');
});

test('회전한 도형은 회전으로 같아진다', () => {
  const s = [0, 1, 5, 8];
  for (let k = 1; k <= 3; k++) {
    let r = s;
    for (let i = 0; i < k; i++) r = rotate90(r);
    assert.equal(isRotation(s, r), true, `${k}번 돌린 것`);
  }
});

test('두 번 뒤집으면 제자리로 온다', () => {
  const s = [0, 3, 4, 8];
  assert.deepEqual(mirror(mirror(s)), s);
});

test('만든 문제의 정답이 실제로 맞다', () => {
  /*
   * 여기가 이 게임의 전부다. "다르다"고 낸 문제가 실은 돌려서 같아지면
   * 정답이 틀린 게임이 된다 — 사람은 자기가 틀렸다고 생각할 뿐이다.
   */
  for (let seed = 1; seed <= 300; seed++) {
    for (const lv of [1, 5, 12]) {
      const p = rotationPuzzle(lv, seeded(seed * 31 + lv));
      assert.equal(isRotation(p.left, p.right), p.isSame,
        `seed ${seed} lv ${lv}: isSame=${p.isSame}인데 실제로는 ${!p.isSame}`);
    }
  }
});

test('두 도형의 칸 수가 같다', () => {
  // 칸 수가 다르면 돌려 볼 필요도 없이 답이 보인다.
  for (let seed = 1; seed <= 100; seed++) {
    const p = rotationPuzzle(6, seeded(seed));
    assert.equal(p.left.length, p.right.length, `seed ${seed}`);
  }
});

test('단계가 오르면 칸이 늘어난다', () => {
  assert.ok(rotationPuzzle(1, seeded(1)).left.length < rotationPuzzle(15, seeded(1)).left.length);
});

test('같다와 다르다가 고르게 섞인다', () => {
  let same = 0;
  for (let seed = 1; seed <= 1000; seed++) if (rotationPuzzle(5, seeded(seed)).isSame) same++;
  assert.ok(same > 400 && same < 600, `"같다"가 ${same}/1000`);
});

/* ────────── 박자 ────────── */

test('정확히 맞추면 100점', () => {
  const taps = [1000, 1500, 2000, 2500];
  assert.equal(beatScore(taps, 500, 500).score, 100);
});

test('일정하게 늦어도 조금만 감점한다', () => {
  // 늘 같은 만큼 늦는 것은 박자 감각의 문제가 아니라 반응 시간의 문제다.
  const steady = beatScore([1060, 1560, 2060, 2560], 500, 500);
  assert.equal(steady.stdev, 0);
  assert.ok(steady.score > 70, `일정하게 60ms 늦어서 ${steady.score}점`);
});

test('들쭉날쭉하면 같은 평균이라도 더 깎인다', () => {
  /*
   * 평균만 보면 늘 60씩 늦는 사람과 한 번은 120 빠르고 한 번은 늦는 사람이
   * 같은 점수를 받는데, 박자 감각은 뒤쪽이 훨씬 나쁘다.
   */
  const steady = beatScore([1060, 1560, 2060, 2560], 500, 500);
  const jumpy = beatScore([940, 1620, 1940, 2620], 500, 500);
  assert.ok(jumpy.stdev > steady.stdev);
  assert.ok(jumpy.score < steady.score, `고른 ${steady.score} vs 들쭉날쭉 ${jumpy.score}`);
});

test('25ms까지는 감점하지 않는다', () => {
  assert.equal(beatScore([1020, 1520, 2020, 2520], 500, 500).score, 100);
});

test('점수가 0 아래로 내려가지 않는다', () => {
  const wild = beatScore([3000, 1000, 5000, 1200], 500, 500);
  assert.ok(wild.score >= 0 && wild.score <= 100, `${wild.score}점`);
});

test('한 번도 안 누르면 0점', () => {
  assert.equal(beatScore([], 500, 500).score, 0);
});

/* ────────── 주변시야 ────────── */

test('표적이 가운데에 뜨지 않는다', () => {
  // 가운데에 뜨면 정면으로 보게 되어 주변시야를 재는 것이 아니게 된다.
  const rng = seeded(41);
  for (let i = 0; i < 2000; i++) {
    const t = peripheralTarget(1, rng);
    assert.ok(t.radius >= 0.34, `가운데에 너무 가깝다: ${t.radius.toFixed(3)}`);
    assert.ok(t.radius <= 1, `화면 밖이다: ${t.radius.toFixed(3)}`);
    assert.ok(Math.abs(Math.hypot(t.x, t.y) - t.radius) < 1e-9, '좌표와 반지름이 안 맞는다');
  }
});

test('단계가 오르면 표적이 바깥으로 간다', () => {
  const rng = seeded(42);
  const mean = (lv: number) => {
    let s = 0;
    for (let i = 0; i < 1000; i++) s += peripheralTarget(lv, rng).radius;
    return s / 1000;
  };
  const a = mean(1);
  const b = mean(12);
  assert.ok(b > a + 0.05, `1단계 ${a.toFixed(3)} → 12단계 ${b.toFixed(3)}`);
});

test('표적이 사방에 고르게 나온다', () => {
  // 각도가 한쪽으로 치우치면 그쪽만 보게 된다.
  const rng = seeded(43);
  const quad = [0, 0, 0, 0];
  for (let i = 0; i < 4000; i++) {
    const t = peripheralTarget(5, rng);
    quad[(t.x >= 0 ? 0 : 1) + (t.y >= 0 ? 0 : 2)]++;
  }
  for (const [i, n] of quad.entries()) {
    assert.ok(n > 800 && n < 1200, `${i}사분면 ${n}번`);
  }
});
