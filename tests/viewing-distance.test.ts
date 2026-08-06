/**
 * 시청거리 — 계산을 다른 길로 되짚는다.
 *
 * 이 표의 전제는 셋이다. 16:9에서 대각 하나가 가로세로를 정한다는 것,
 * 권장 거리가 시야각으로 정해진다는 것, 그리고 화소가 1분각보다 작게 보이면
 * 갈라 볼 수 없다는 것. 셋 다 곱셈을 되풀이하지 않고 성질 쪽에서 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, CM_PER_INCH, INCHES, RATIO_H, RATIO_W, RESOLUTIONS, SMPTE_ANGLE, THX_ANGLE,
  cellOf, resolutionOf, slugOf,
} from '../lib/viewing/list.ts';
import {
  distanceFor, heightCm, pixelLimitCm, viewingFacts, widthCm, widthShare,
} from '../lib/viewing/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return viewingFacts(c);
};

test('칸은 크기 20가지 × 해상도 5가지', () => {
  assert.equal(INCHES.length, 20);
  assert.equal(RESOLUTIONS.length, 5);
  assert.equal(CELLS.length, 100);
  assert.equal(new Set(CELLS.map(slugOf)).size, 100);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  for (let i = 1; i < INCHES.length; i++) assert.ok(INCHES[i] > INCHES[i - 1]);
  // 다섯 해상도가 모두 16:9다 — 아니면 가로세로 계산이 어긋난다
  for (const r of RESOLUTIONS) {
    assert.ok(Math.abs(r.w / r.h - RATIO_W / RATIO_H) < 1e-9, r.key);
    assert.ok(RESOLUTIONS.filter(x => x.w === r.w).length === 1, r.key);
  }
  assert.equal(cellOf('55-4k'), undefined);
  assert.equal(cellOf('56-uhd'), undefined);
});

test('대각 하나가 가로세로를 정한다', () => {
  for (const inch of INCHES) {
    const w = widthCm(inch);
    const h = heightCm(inch);
    // 피타고라스로 되돌리면 대각이 나온다
    assert.ok(Math.abs(Math.hypot(w, h) - inch * CM_PER_INCH) < 1e-9, `${inch}`);
    // 가로세로 비는 16:9다
    assert.ok(Math.abs(w / h - RATIO_W / RATIO_H) < 1e-9, `${inch}`);
  }
  // 널리 쓰이는 자리 — 55인치의 가로는 121.8cm다
  assert.equal(facts('55-uhd').width, 121.8);
  assert.equal(facts('55-uhd').height, 68.5);
  // 대각에서 가로가 차지하는 몫은 크기와 무관하다
  assert.ok(Math.abs(widthShare() - 0.8716) < 1e-4);
});

test('권장 거리는 시야각이 정한다', () => {
  // 각이 클수록 가까이 앉는다
  assert.ok(THX_ANGLE > SMPTE_ANGLE);
  for (const c of CELLS) {
    const f = viewingFacts(c);
    assert.ok(f.thx < f.smpte, f.slug);
  }
  /*
   * 두 거리의 비는 크기에도 해상도에도 매이지 않는다. 화면에 내는 값은 소수
   * 첫째 자리에서 반올림한 것이라 작은 화면에서 비가 흔들린다 — 그래서
   * 반올림 전 값으로 잰다.
   */
  const raw = (inch: number, angle: number) => distanceFor(widthCm(inch), angle);
  const ratio = raw(24, SMPTE_ANGLE) / raw(24, THX_ANGLE);
  for (const inch of INCHES) {
    assert.ok(Math.abs(raw(inch, SMPTE_ANGLE) / raw(inch, THX_ANGLE) - ratio) < 1e-9, `${inch}`);
  }
  // 그 비는 두 각의 탄젠트 비다
  const tan = (deg: number) => Math.tan((deg * Math.PI) / 360);
  assert.ok(Math.abs(ratio - tan(THX_ANGLE) / tan(SMPTE_ANGLE)) < 1e-3);
  // 거리는 화면 폭에 정비례한다
  assert.ok(Math.abs(distanceFor(200, SMPTE_ANGLE) / distanceFor(100, SMPTE_ANGLE) - 2) < 1e-9);
});

test('화소 한계는 1분각이 정한다', () => {
  for (const c of CELLS) {
    const f = viewingFacts(c);
    /*
     * 한계 거리에 화소 수를 곱하고 폭으로 나누면 늘 같은 수가 나온다 —
     * 1분각의 코탄젠트, 곧 3437.75다. 이 값이 흔들리면 눈의 분해능을
     * 잘못 잡은 것이다. 반올림 전 값으로 잰다.
     */
    const w = widthCm(c.inch);
    assert.ok(Math.abs((pixelLimitCm(w, f.pixels) * f.pixels) / w - 3437.75) < 0.01, f.slug);
  }
  // 화소가 두 배로 촘촘하면 한계 거리는 절반이다(FHD 1920 → 4K 3840)
  const w55 = widthCm(55);
  assert.ok(Math.abs(pixelLimitCm(w55, 1920) / pixelLimitCm(w55, 3840) - 2) < 1e-9);
  // 같은 해상도라면 화면이 클수록 멀리서도 화소가 보인다
  for (const r of RESOLUTIONS) {
    let last = -1;
    for (const inch of INCHES) {
      const f = viewingFacts({ inch, res: r.key });
      assert.ok(f.limit > last, `${inch}-${r.key}`);
      last = f.limit;
    }
  }
  assert.equal(facts('55-uhd').limit, 109);
});

test('SMPTE 자리에서 FHD는 딱 문턱에 선다', () => {
  /*
   * 권장 거리도 화소 한계도 화면 폭에 정비례하므로, 둘의 비는 화면 크기와
   * 무관하게 일정하다. FHD에서 그 비가 1에 아주 가깝다 — SMPTE가 드는
   * 자리에 앉으면 FHD 화소가 보일락 말락 한다는 뜻이다.
   */
  const ratios = INCHES.map(inch => {
    const w = widthCm(inch);
    return distanceFor(w, SMPTE_ANGLE) / pixelLimitCm(w, 1920);
  });
  for (const r of ratios) assert.ok(Math.abs(r - ratios[0]) < 1e-9, `${r}`);
  assert.ok(Math.abs(ratios[0] - 1.042) < 0.01, `${ratios[0]}`);
  // THX가 드는 더 가까운 자리라면 FHD 화소가 보인다
  const thx = viewingFacts({ inch: 55, res: 'fhd' });
  assert.ok(thx.thx < thx.limit);
});

test('해상도가 값을 하는 거리를 낸다', () => {
  const below = (key: string) => RESOLUTIONS[RESOLUTIONS.findIndex(r => r.key === key) - 1];
  for (const c of CELLS) {
    const f = viewingFacts(c);
    const b = below(c.res);
    if (!b) {
      // 가장 낮은 단계는 견줄 아래가 없다
      assert.equal(f.worth, null, f.slug);
      assert.equal(f.smpteWorth, true, f.slug);
      continue;
    }
    assert.ok(f.worth !== null, f.slug);
    // 값을 하는 거리는 아래 단계의 화소 한계다 — 반올림 전 값과 견준다
    assert.ok(Math.abs(f.worth - pixelLimitCm(widthCm(c.inch), b.w)) <= 0.05, f.slug);
    // 아래 단계가 성길수록 그 거리는 멀다 — 늘 이 해상도의 한계보다 멀다
    assert.ok(f.worth > f.limit, f.slug);
    assert.equal(f.smpteWorth, f.smpte <= f.worth, f.slug);
    assert.equal(f.thxWorth, f.thx <= f.worth, f.slug);
  }
  // 55인치 4K는 SMPTE 자리에서는 QHD와 갈리지 않고, THX 자리에서도 아직이다
  assert.equal(facts('55-uhd').smpteWorth, false);
  assert.equal(facts('55-uhd').worth, 163.5);
  // 27인치 QHD는 THX 자리라면 FHD와 갈린다
  assert.equal(facts('27-qhd').thxWorth, true);
});

test('PPI는 화소를 인치로 나눈 값', () => {
  for (const c of CELLS) {
    const f = viewingFacts(c);
    // 되돌려 곱하면 가로 화소가 나온다 — PPI는 소수 첫째 자리에서 반올림했다
    const inches = c.inch * widthShare();
    assert.ok(Math.abs(f.ppi * inches - f.pixels) <= inches * 0.05 + 1e-9, f.slug);
  }
  // 앞뒤 칸은 크기만 한 단계 움직인다
  const f = facts('55-uhd');
  assert.equal(f.smaller?.inch, 50);
  assert.equal(f.bigger?.inch, 58);
  assert.equal(facts('24-hd').smaller, null);
  assert.equal(facts('100-8k').bigger, null);
  for (const c of CELLS) {
    const g = viewingFacts(c);
    if (g.bigger) assert.equal(g.bigger.res, c.res, g.slug);
  }
});

test('화면에 적어 둔 보기가 계산과 맞는다', () => {
  /*
   * 설명 글에 숫자를 적어 두면 식이 바뀔 때 글만 옛말이 된다. 글에 적은
   * 보기를 여기 못 박아, 어긋나면 글을 고치라고 알린다.
   */
  // "55인치는 가로 121.8cm·세로 68.5cm"
  assert.equal(facts('55-uhd').width, 121.8);
  assert.equal(facts('55-uhd').height, 68.5);
  // "가로는 대각의 0.8716배, 세로는 0.4903배"
  assert.ok(Math.abs(widthShare() - 0.8716) < 5e-5);
  assert.ok(Math.abs((widthShare() * RATIO_H) / RATIO_W - 0.4903) < 5e-5);
  // "55인치면 SMPTE 227cm, THX 167cm"
  assert.equal(Math.round(facts('55-uhd').smpte), 227);
  assert.equal(Math.round(facts('55-uhd').thx), 167);
  // "두 거리의 비는 1.36으로 일정하다"
  assert.equal(Math.round((facts('55-uhd').smpte / facts('55-uhd').thx) * 100) / 100, 1.36);
  // "55인치라면 4K는 109cm, FHD는 218cm"
  assert.equal(facts('55-uhd').limit, 109);
  assert.equal(facts('55-fhd').limit, 218);
  // "98인치 8K도 화소 한계가 97cm"
  assert.equal(Math.round(facts('98-8k').limit), 97);
});
