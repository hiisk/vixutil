/**
 * 케이블 대역폭 — 곱셈을 다른 길로 되짚는다.
 *
 * 이 표의 전제는 둘이다. 화면이 초당 내보내는 자료가 화소 수에 주사율과
 * 색심도를 곱한 것이라는 것, 그리고 규격이 내건 총 대역폭 가운데 화면이
 * 쓸 수 있는 몫이 부호화 비율만큼이라는 것. 두 번째는 두 수를 함께 적어
 * 두었으므로 서로가 서로를 검사한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BITS_10, BITS_8, BLANKING, CELLS, RATES, RESOLUTIONS, SPECS,
  cellOf, resolutionOf, slugOf, specOf,
} from '../lib/cable/list.ts';
import { cableFacts, passingFor, rawGbps, verdictOf } from '../lib/cable/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return cableFacts(c);
};

test('칸은 해상도 10가지 × 주사율 10가지', () => {
  assert.equal(RESOLUTIONS.length, 10);
  assert.equal(RATES.length, 10);
  assert.equal(CELLS.length, 100);
  assert.equal(new Set(CELLS.map(slugOf)).size, 100);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  for (let i = 1; i < RATES.length; i++) assert.ok(RATES[i] > RATES[i - 1]);
  // 해상도는 화소 수가 늘어나는 차례로 적혀 있다
  for (let i = 1; i < RESOLUTIONS.length; i++) {
    const a = RESOLUTIONS[i - 1];
    const b = RESOLUTIONS[i];
    assert.ok(b.w * b.h > a.w * a.h, b.key);
  }
  assert.equal(cellOf('4k-90'), undefined);
  assert.equal(cellOf('16k-60'), undefined);
});

test('규격의 두 수가 부호화 비율로 맞물린다', () => {
  assert.equal(SPECS.length, 6);
  for (const s of SPECS) {
    const [a, b] = s.encoding;
    // video ÷ total이 적어 둔 부호화 비율과 같다
    assert.ok(Math.abs(s.video / s.total - a / b) < 0.005, `${s.key} ${s.video / s.total}`);
    assert.ok(s.video < s.total, s.key);
  }
  // 널리 알려진 자리 — 8b/10b는 정확히 0.8이다
  assert.equal(specOf('hdmi20')?.video, 18 * 0.8);
  assert.equal(specOf('dp14')?.video, 32.4 * 0.8);
  // DP 1.2가 HDMI 2.0보다 대역폭이 넓다
  assert.ok(specOf('dp12')!.video > specOf('hdmi20')!.video);
});

test('초당 자료량은 화소에 주사율과 색심도를 곱한 값', () => {
  for (const c of CELLS) {
    const r = resolutionOf(c.res)!;
    const f = cableFacts(c);
    assert.equal(f.pixels, r.w * r.h, f.slug);
    /*
     * 되돌려 나누면 주사율이 나온다. 화면에 내는 값은 소수 둘째 자리에서
     * 반올림한 것이라 작은 해상도에서 어긋나므로 반올림 전 값으로 잰다.
     */
    const raw = rawGbps(r.w, r.h, c.hz, BITS_8);
    assert.ok(Math.abs((raw * 1e9) / (f.pixels * BITS_8) - c.hz) < 1e-9, f.slug);
    // 10비트는 8비트의 정확히 1.25배다
    assert.ok(Math.abs(rawGbps(r.w, r.h, c.hz, BITS_10) / raw - BITS_10 / BITS_8) < 1e-12, f.slug);
  }
  // 주사율이 두 배면 자료량도 두 배다
  assert.ok(Math.abs(rawGbps(3840, 2160, 120, BITS_8) / rawGbps(3840, 2160, 60, BITS_8) - 2) < 1e-12);
  // 널리 인용되는 자리 — 4K 60Hz 8비트는 11.9Gbps다
  assert.equal(facts('4k-60').raw8, 11.94);
  assert.equal(facts('8k-60').raw8, 47.78);
});

test('한계에 가까우면 통과라고 잘라 말하지 않는다', () => {
  assert.equal(BLANKING, 0.05);
  // 한계보다 크면 안 되고, 95% 안쪽이면 지나가고, 그 사이는 아슬아슬하다
  assert.equal(verdictOf(10, 9), 'fail');
  assert.equal(verdictOf(9.9, 10), 'tight');
  assert.equal(verdictOf(9, 10), 'pass');
  assert.equal(verdictOf(10, 10), 'tight');
  for (const c of CELLS) {
    const f = cableFacts(c);
    for (const s of f.specs) {
      const want = f.raw8 > s.video ? 'fail' : f.raw8 > s.video * 0.95 ? 'tight' : 'pass';
      assert.equal(s.verdict, want, `${f.slug} ${s.key}`);
      // 쓰임새는 자료량을 한계로 나눈 백분율이다
      assert.ok(Math.abs(s.used - (f.raw8 / s.video) * 100) < 0.1, `${f.slug} ${s.key}`);
      assert.equal(s.verdict === 'fail', s.used > 100, `${f.slug} ${s.key}`);
    }
  }
});

test('4K 120Hz는 HDMI 2.0으로 안 된다', () => {
  const at = (slug: string, spec: string) => {
    const s = facts(slug).specs.find(x => x.key === spec);
    assert.ok(s, `${slug} ${spec}`);
    return s;
  };
  // 60Hz까지는 지나간다
  assert.equal(at('4k-60', 'hdmi20').verdict, 'pass');
  // 120Hz에서는 넘어선다
  assert.equal(at('4k-120', 'hdmi20').verdict, 'fail');
  assert.equal(at('4k-120', 'hdmi21').verdict, 'pass');
  assert.equal(at('4k-120', 'dp14').verdict, 'pass');
  // 8K 60Hz는 가장 넓은 규격 하나만 남는다
  assert.equal(facts('8k-60').lowest, 'dp21');
  assert.equal(at('8k-60', 'hdmi21').verdict, 'fail');
  // 가장 낮은 규격은 대역폭이 좁은 것부터 고른 결과다
  for (const c of CELLS) {
    const f = cableFacts(c);
    const passing = f.specs.filter(s => s.verdict !== 'fail');
    if (!passing.length) {
      assert.equal(f.lowest, null, f.slug);
      continue;
    }
    const cheapest = passing.reduce((a, b) => (a.video <= b.video ? a : b));
    assert.equal(f.lowest, cheapest.key, f.slug);
  }
});

test('무거워질수록 남는 규격이 줄어든다', () => {
  for (const r of RESOLUTIONS) {
    let last = Infinity;
    for (const hz of RATES) {
      const f = cableFacts({ res: r.key, hz });
      const ok = f.specs.filter(s => s.verdict !== 'fail').length;
      assert.ok(ok <= last, `${r.key}-${hz}`);
      last = ok;
    }
  }
  // 지나가는 칸의 수도 대역폭 차례를 따른다
  const counts = [...SPECS].sort((a, b) => a.video - b.video).map(s => passingFor(s.key).length);
  for (let i = 1; i < counts.length; i++) assert.ok(counts[i] >= counts[i - 1], `${i}`);
  assert.equal(passingFor('nope').length, 0);
});

test('앞뒤 칸은 주사율 한 단계씩만 움직인다', () => {
  const f = facts('4k-120');
  assert.equal(f.slower?.hz, 100);
  assert.equal(f.faster?.hz, 144);
  assert.equal(facts('4k-24').slower, null);
  assert.equal(facts('4k-360').faster, null);
  for (const c of CELLS) {
    const g = cableFacts(c);
    if (g.faster) {
      assert.equal(g.faster.res, c.res, g.slug);
      assert.ok(facts(g.faster.slug).raw8 > g.raw8, g.slug);
    }
  }
});
