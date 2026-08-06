import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GEO_TOOLS, geoTool } from '../lib/geo-tools.ts';
import { GEO_SECTION } from '../lib/geo-section.ts';
import { checkFormulaSection, primaryOf, outputsOf } from './formula-section-checks.ts';
import { round } from '../lib/formula/num.ts';

checkFormulaSection(GEO_SECTION, 100);

const primary = (slug: string, v: Record<string, number>) => primaryOf(GEO_TOOLS, slug, v);
const outputs = (slug: string, v: Record<string, number>) => outputsOf(GEO_TOOLS, slug, v);

test('원: 반지름 10의 면적은 314.16, 둘레는 62.83', () => {
  const out = outputs('circle-area', { r: 10 });
  assert.equal(out[0].value, 314.16);
  assert.equal(out[1].value, 62.83);
});

test('원: 둘레 100에서 반지름은 15.9155', () => {
  assert.equal(primary('circle-from-circumference', { c: 100 }), 15.915);
});

test('면적으로 반지름 역산은 원 면적 계산과 왕복이 맞는다', () => {
  const area = primary('circle-area', { r: 7 });
  assert.equal(primary('circle-from-area', { area }), 7);
});

test('삼각형: 밑변 12 높이 8은 48', () => {
  assert.equal(primary('triangle-area', { base: 12, height: 8 }), 48);
});

test('헤론: 3·4·5 직각삼각형의 면적은 정확히 6', () => {
  assert.equal(primary('triangle-heron', { a: 3, b: 4, c: 5 }), 6);
});

test('헤론: 두 변의 합이 나머지보다 짧으면 삼각형이 아니라고 알린다', () => {
  const t = geoTool('triangle-heron')!;
  const v = { a: 1, b: 2, c: 10 };
  const verdict = t.verdict!(v, t.compute(v));
  assert.equal(verdict!.tone, 'bad');
  assert.equal(t.compute(v)[0].value, 0);
});

test('사다리꼴: 윗변 6 아랫변 10 높이 5는 40', () => {
  assert.equal(primary('trapezoid-area', { top: 6, bottom: 10, height: 5 }), 40);
});

test('마름모: 대각선 10과 8이면 면적 40, 한 변 6.403', () => {
  const out = outputs('rhombus-area', { d1: 10, d2: 8 });
  assert.equal(out[0].value, 40);
  assert.equal(out[1].value, 6.403);
});

test('정다각형: 한 변 10 정육각형은 259.81㎠', () => {
  assert.equal(primary('regular-polygon-area', { n: 6, side: 10 }), 259.81);
});

test('정다각형: 변이 많아지면 같은 둘레에서 면적이 커진다', () => {
  const square = primary('regular-polygon-area', { n: 4, side: 15 });
  const hexagon = primary('regular-polygon-area', { n: 6, side: 10 });
  assert.ok(hexagon > square, `${hexagon} vs ${square}`);
});

test('부채꼴: 반지름 10, 60°는 52.36㎠', () => {
  assert.equal(primary('sector-area', { r: 10, angle: 60 }), 52.36);
});

test('부채꼴 360°는 원 전체 면적과 같다', () => {
  assert.equal(primary('sector-area', { r: 10, angle: 360 }), primary('circle-area', { r: 10 }));
});

test('정육면체: 한 변 10cm는 1000㎤이고 정확히 1L', () => {
  const out = outputs('cube-volume', { a: 10 });
  assert.equal(out[0].value, 1000);
  assert.equal(out[2].value, 1);
});

test('직육면체: 30×20×15는 9000㎤, 대각선 39.05', () => {
  const out = outputs('box-volume', { l: 30, w: 20, h: 15 });
  assert.equal(out[0].value, 9000);
  assert.equal(out[2].value, 39.05);
});

test('원기둥: 반지름 5 높이 12는 942.48㎤', () => {
  assert.equal(primary('cylinder-volume', { r: 5, h: 12 }), 942.48);
});

test('원뿔은 같은 밑면·높이 원기둥의 정확히 3분의 1', () => {
  const cyl = primary('cylinder-volume', { r: 5, h: 12 });
  const cone = primary('cone-volume', { r: 5, h: 12 });
  assert.ok(Math.abs(cyl / 3 - cone) < 0.01, `${cyl / 3} vs ${cone}`);
});

test('구: 반지름 10은 4188.79㎤, 표면적 1256.64㎠', () => {
  const out = outputs('sphere-volume', { r: 10 });
  assert.equal(out[0].value, 4188.79);
  assert.equal(out[1].value, 1256.64);
});

test('반구는 구의 정확히 절반', () => {
  const sphere = primary('sphere-volume', { r: 8 });
  const half = primary('hemisphere-volume', { r: 8 });
  assert.ok(Math.abs(sphere / 2 - half) < 0.01);
});

test('관: 바깥 5 안쪽 4, 길이 100의 벽 부피는 2827.43㎤', () => {
  assert.equal(primary('tube-volume', { outer: 5, inner: 4, h: 100 }), 2827.43);
});

test('피타고라스: 3과 4는 빗변 5', () => {
  assert.equal(primary('pythagoras', { a: 3, b: 4 }), 5);
});

test('피타고라스 역산: 빗변 13, 한 변 5면 나머지는 12', () => {
  assert.equal(primary('pythagoras-leg', { c: 13, a: 5 }), 12);
});

test('빗변보다 긴 변을 넣으면 잘못됐다고 알린다', () => {
  const t = geoTool('pythagoras-leg')!;
  const v = { c: 5, a: 13 };
  const verdict = t.verdict!(v, t.compute(v));
  assert.equal(verdict!.tone, 'bad');
});

test('각도: 높이 3 수평 4는 36.87°', () => {
  assert.equal(primary('right-triangle-angle', { opp: 3, adj: 4 }), 36.87);
});

test('삼각비: 30°의 sin은 0.5', () => {
  const out = outputs('trig-values', { angle: 30 });
  assert.equal(out[0].value, 0.5);
  assert.equal(out[1].value, 0.866025);
});

test('삼각비: 90°에서 tan은 정의되지 않는다고 알린다', () => {
  const t = geoTool('trig-values')!;
  const v = { angle: 90 };
  const verdict = t.verdict!(v, t.compute(v));
  assert.equal(verdict!.tone, 'warn');
});

test('코사인 법칙: 3·4·5의 최대각은 90°', () => {
  const out = outputs('cosine-rule', { a: 5, b: 3, c: 4 });
  assert.equal(out[0].value, 90);
});

test('코사인 법칙: 세 각의 합은 180°', () => {
  const out = outputs('cosine-rule', { a: 7, b: 8, c: 9 });
  const sum = out[0].value + out[1].value + out[2].value;
  assert.ok(Math.abs(sum - 180) < 0.01, String(sum));
});

test('경사도: 1:12는 8.33%이고 4.76°', () => {
  const out = outputs('slope-grade', { rise: 1, run: 12 });
  assert.equal(out[0].value, 8.33);
  assert.equal(out[1].value, 4.76);
});

test('경사도 100%는 45°다 — 90°가 아니다', () => {
  assert.equal(outputs('slope-grade', { rise: 1, run: 1 })[1].value, 45);
});

test('두 점 거리: (1,2)와 (7,10)은 정확히 10', () => {
  assert.equal(primary('distance-2d', { x1: 1, y1: 2, x2: 7, y2: 10 }), 10);
});

test('중점: (2,4)와 (8,10)의 중점은 (5,7)', () => {
  const out = outputs('midpoint', { x1: 2, y1: 4, x2: 8, y2: 10 });
  assert.equal(out[0].value, 5);
  assert.equal(out[1].value, 7);
});

test('정팔각형의 한 내각은 135°, 외각은 45°, 내각 합은 1080°', () => {
  const out = outputs('polygon-angle', { n: 8 });
  assert.equal(out[0].value, 135);
  assert.equal(out[1].value, 45);
  assert.equal(out[2].value, 1080);
});

test('180°는 π라디안', () => {
  assert.equal(primary('degree-radian', { d: 180 }), 3.141593);
});

test('호의 길이: 반지름 20, 90°는 31.416', () => {
  assert.equal(primary('arc-length', { r: 20, angle: 90 }), 31.416);
});

test('현: 중심각 180°면 지름과 같다', () => {
  assert.equal(primary('chord-length', { r: 20, angle: 180 }), 40);
});

test('현은 항상 호보다 짧다', () => {
  const out = outputs('chord-length', { r: 20, angle: 120 });
  assert.ok(out[0].value < out[1].value, `${out[0].value} vs ${out[1].value}`);
});

test('바퀴: 지름 66cm로 1000바퀴면 2073.45m', () => {
  assert.equal(primary('wheel-rotation', { d: 66, turns: 1000 }), 2073.45);
});

test('원환: 바깥 10 안쪽 6의 면적은 201.062㎠', () => {
  assert.equal(primary('ring-area', { outer: 10, inner: 6 }), 201.062);
});

test('방 면적: 4.2×3.4m는 14.28㎡이고 4.32평', () => {
  const out = outputs('room-area', { l: 4.2, w: 3.4 });
  assert.equal(out[0].value, 14.28);
  assert.equal(out[1].value, 4.32);
});

test('페인트: 40㎡를 2번 칠하고 1L에 10㎡면 8L', () => {
  assert.equal(primary('wall-paint', { area: 40, coats: 2, coverage: 10 }), 8);
});

test('타일: 20㎡에 60cm 타일, 여유 10%면 62장', () => {
  const out = outputs('tile-count', { area: 20, size: 60, extra: 10 });
  assert.equal(out[1].value, 56);
  assert.equal(out[0].value, 62);
});

test('콘크리트: 5×3m 두께 10cm는 1.5㎥, 3600kg', () => {
  const out = outputs('concrete-volume', { l: 5, w: 3, t: 10 });
  assert.equal(out[0].value, 1.5);
  assert.equal(out[2].value, 3600);
});

test('물탱크: 지름 60cm 높이 100cm는 282.74L', () => {
  assert.equal(primary('water-tank', { d: 60, h: 100 }), 282.74);
});

test('어항: 60×30×36cm는 64.8L이고 물만 64.8kg', () => {
  const out = outputs('aquarium-weight', { l: 60, w: 30, h: 36 });
  assert.equal(out[0].value, 64.8);
  assert.equal(out[1].value, 64.8);
});

test('피자: 45cm 한 판이 30cm 두 판보다 크다', () => {
  const t = geoTool('pizza-compare')!;
  const v = { a: 45, b: 30, n: 2 };
  assert.ok(t.compute(v)[0].value > 1);
  assert.ok(t.verdict!(v, t.compute(v))!.ko.includes('45cm'));
});

test('TV: 55인치 16:9는 가로 121.8cm 세로 68.5cm', () => {
  const out = outputs('tv-size', { inch: 55, w: 16, h: 9 });
  assert.equal(out[0].value, 121.8);
  assert.equal(out[1].value, 68.5);
});

test('A4는 210×297mm, A0는 841×1189mm', () => {
  const a4 = outputs('paper-size', { n: 4 });
  assert.equal(a4[0].value, 297);
  assert.equal(a4[1].value, 210);
  const a0 = outputs('paper-size', { n: 0 });
  assert.equal(a0[0].value, 1189);
  assert.equal(a0[1].value, 841);
});

test('계단: 총 280cm를 18cm씩이면 16단, 실제 단높이 17.5cm', () => {
  const out = outputs('stair-steps', { total: 280, riser: 18, tread: 26 });
  assert.equal(out[0].value, 16);
  assert.equal(out[1].value, 17.5);
});

test('계단: 2×단높이+단너비가 편안한 범위면 좋다고 알린다', () => {
  const t = geoTool('stair-steps')!;
  const v = { total: 280, riser: 18, tread: 26 };
  assert.equal(t.verdict!(v, t.compute(v))!.tone, 'good');
});

test('지붕: 바닥 100㎡에 경사 30%면 104.4㎡', () => {
  assert.equal(primary('roof-area', { floor: 100, slope: 30 }), 104.4);
});

test('목재: 90×90mm 3.6m 10개는 0.2916㎥', () => {
  assert.equal(primary('lumber-volume', { w: 90, h: 90, len: 3.6, count: 10 }), 0.2916);
});

/*
 * ───────── 셋째 묶음 14종 ─────────
 *
 * 기대값은 도구를 돌려 얻은 것이 아니라, 이미 아는 도형으로 되돌려 확인한 것들이다.
 * 안쪽 반지름을 0으로 둔 고리 부채꼴은 그냥 원이고, 위아래 반지름이 같은 원뿔대는
 * 원기둥이고, 배가 안 부른 통은 원기둥이다 — 새 공식이 옛 공식과 만나야 맞는 것이다.
 */

test('점과 직선: y = 0 위의 (0,5)는 거리 5이고 수선의 발이 원점이다', () => {
  const out = outputs('line-point-distance', { x1: 0, y1: 5, m: 0, b: 0 });
  assert.equal(out[0].value, 5);
  assert.equal(out[1].value, 0);
  assert.equal(out[2].value, 0);
});

test('점과 직선: y = 2x + 1 위의 (6,8)은 거리 √5, 수선의 발 (4,9)', () => {
  const out = outputs('line-point-distance', { x1: 6, y1: 8, m: 2, b: 1 });
  assert.equal(out[0].value, round(Math.sqrt(5), 4));
  assert.equal(out[1].value, 4);
  assert.equal(out[2].value, 9);
});

test('점과 직선: 직선 위의 점이면 거리가 0이다', () => {
  assert.equal(primary('line-point-distance', { x1: 3, y1: 7, m: 2, b: 1 }), 0);
});

test('두 직선: y = x와 y = −x + 4는 (2,2)에서 직각으로 만난다', () => {
  const out = outputs('line-intersection', { mA: 1, bA: 0, mB: -1, bB: 4 });
  assert.equal(out[0].value, 2);
  assert.equal(out[1].value, 2);
  assert.equal(out[2].value, 90);
});

test('두 직선: 기울기가 같으면 평행이라 교점이 없다', () => {
  const out = outputs('line-intersection', { mA: 2, bA: 1, mB: 2, bB: 9 });
  assert.equal(out[0].value, 0);
  assert.equal(out[2].value, 0);
});

test('좌표 사각형: 한 변 10인 정사각형은 넓이 100, 둘레 40, 대각선 14.1421', () => {
  const out = outputs('quad-area-coords', { x1: 0, y1: 0, x2: 10, y2: 0, x3: 10, y3: 10, x4: 0, y4: 10 });
  assert.equal(out[0].value, 100);
  assert.equal(out[1].value, 40);
  assert.equal(out[2].value, round(Math.hypot(10, 10), 4));
  assert.equal(out[3].value, round(Math.hypot(10, 10), 4));
});

test('좌표 사각형: 꼭짓점을 대각선으로 엇갈려 적으면 넓이가 작아진다', () => {
  const right = primary('quad-area-coords', { x1: 0, y1: 0, x2: 10, y2: 0, x3: 10, y3: 10, x4: 0, y4: 10 });
  const crossed = primary('quad-area-coords', { x1: 0, y1: 0, x2: 10, y2: 10, x3: 10, y3: 0, x4: 0, y4: 10 });
  assert.ok(crossed < right, `${crossed} vs ${right}`);
});

test('황금비: 100은 61.803과 38.197로 갈리고 둘의 합이 원래 길이다', () => {
  const out = outputs('golden-ratio', { len: 100 });
  assert.equal(out[0].value, 61.803);
  assert.equal(out[1].value, 38.197);
  assert.equal(round(out[0].value + out[1].value, 3), 100);
});

test('황금비: 전체와 긴 쪽의 비가 긴 쪽과 짧은 쪽의 비와 같다', () => {
  const out = outputs('golden-ratio', { len: 250 });
  assert.equal(round(250 / out[0].value, 4), round(out[0].value / out[1].value, 4));
});

test('고리 부채꼴: 안쪽 반지름 0에 360°면 그냥 원이다', () => {
  const ring = primary('ring-sector-area', { R: 10, r: 0, angle: 360 });
  assert.equal(ring, primary('circle-area', { r: 10 }));
});

test('고리 부채꼴: 20과 12에 90°면 201.06㎠, 둘레 66.27cm', () => {
  const out = outputs('ring-sector-area', { R: 20, r: 12, angle: 90 });
  assert.equal(out[0].value, 201.06);
  assert.equal(out[2].value, 66.27);
});

test('두 원 겹침: 중심이 같고 반지름이 같으면 완전히 겹친다', () => {
  const out = outputs('two-circles-overlap', { r1: 10, r2: 10, d: 0 });
  assert.equal(out[0].value, primary('circle-area', { r: 10 }));
  assert.equal(out[1].value, 100);
});

test('두 원 겹침: 중심 거리가 반지름 합보다 크면 0이다', () => {
  assert.equal(primary('two-circles-overlap', { r1: 10, r2: 8, d: 18.1 }), 0);
});

test('두 원 겹침: 멀어질수록 겹친 넓이가 줄어든다', () => {
  const near = primary('two-circles-overlap', { r1: 10, r2: 8, d: 5 });
  const far = primary('two-circles-overlap', { r1: 10, r2: 8, d: 15 });
  assert.ok(near > far, `${near} vs ${far}`);
});

test('감긴 롤: 심지가 없고 두께 0.02cm면 회전 수가 지름의 절반÷두께다', () => {
  const out = outputs('spiral-roll-length', { D: 12, d: 0, t: 0.02 });
  assert.equal(out[1].value, 300);
});

test('감긴 롤: 두께가 절반이면 길이가 두 배가 된다', () => {
  const thick = primary('spiral-roll-length', { D: 12, d: 4, t: 0.02 });
  const thin = primary('spiral-roll-length', { D: 12, d: 4, t: 0.01 });
  // 표시 자리(0.01m)에서 견준다 — 정확히 두 배지만 각각 반올림한 뒤라 비가 1.9998이 된다
  assert.ok(Math.abs(thin - thick * 2) <= 0.02, `${thin} vs ${thick} × 2`);
});

test('원뿔 전개도: 높이가 0이면 납작한 원이라 360°다', () => {
  const out = outputs('cone-unroll-angle', { r: 10, h: 0 });
  assert.equal(out[0].value, 360);
  assert.equal(out[1].value, 10);
});

test('원뿔 전개도: 반지름 10 높이 24면 모선 26, 각도 138.46°', () => {
  const out = outputs('cone-unroll-angle', { r: 10, h: 24 });
  assert.equal(out[1].value, 26);
  assert.equal(out[0].value, 138.46);
});

test('원뿔대 겉넓이: 위아래 반지름이 같으면 원기둥과 같다', () => {
  const out = outputs('frustum-surface', { R: 10, r: 10, h: 20 });
  assert.equal(out[2].value, 20);
  assert.equal(out[1].value, round(Math.PI * 20 * 20, 2));
});

test('원뿔대 겉넓이: 모선은 높이가 아니라 반지름 차와 높이의 빗변이다', () => {
  // 위아래가 같은 경우만 보면 모선과 높이를 구별하지 못한다 — 벌어진 통으로 본다
  const out = outputs('frustum-surface', { R: 12, r: 8, h: 15 });
  assert.equal(out[2].value, round(Math.hypot(4, 15), 3));
  assert.ok(out[2].value > 15, `모선 ${out[2].value}가 높이 15보다 짧다`);
  assert.equal(out[1].value, round(Math.PI * 20 * Math.hypot(4, 15), 2));
});

test('통 부피: 배가 안 부르면 원기둥 부피와 같다', () => {
  const barrel = primary('barrel-volume', { D: 40, d: 40, h: 100 });
  assert.equal(barrel, round((Math.PI * 20 * 20 * 100) / 1000, 2));
});

test('통 부피: 배가 부를수록 더 들어간다', () => {
  const bulged = primary('barrel-volume', { D: 60, d: 50, h: 90 });
  const straight = primary('barrel-volume', { D: 50, d: 50, h: 90 });
  assert.ok(bulged > straight, `${bulged} vs ${straight}`);
});

test('눕힌 탱크: 가득 차면 원기둥 부피이고 100%다', () => {
  const out = outputs('horizontal-tank-volume', { D: 100, L: 200, h: 100 });
  assert.equal(out[0].value, round((Math.PI * 50 * 50 * 200) / 1000, 2));
  assert.equal(out[1].value, 100);
});

test('눕힌 탱크: 절반 높이면 정확히 절반이다', () => {
  const out = outputs('horizontal-tank-volume', { D: 100, L: 200, h: 50 });
  assert.equal(out[1].value, 50);
});

test('눕힌 탱크: 높이가 절반보다 낮으면 잔량은 그 비율보다 훨씬 적다', () => {
  // 활꼴이라 아래쪽이 좁다 — 30%를 채워도 30%가 안 남는다
  const out = outputs('horizontal-tank-volume', { D: 100, L: 200, h: 30 });
  assert.ok(out[1].value < 30, `${out[1].value}%`);
});

test('마이터: 네모 45°, 육각 30°, 팔각 22.5°', () => {
  assert.equal(primary('miter-angle', { n: 4, side: 50 }), 45);
  assert.equal(primary('miter-angle', { n: 6, side: 50 }), 30);
  assert.equal(primary('miter-angle', { n: 8, side: 50 }), 22.5);
});

test('마이터: 톱 각도의 두 배와 한 내각을 더하면 180°다', () => {
  // 톱은 외각의 절반을 자른다 — 내각의 절반이 아니다. 네모에서만 두 값이 45°로 같다
  for (const n of [3, 4, 5, 6, 8, 12]) {
    const out = outputs('miter-angle', { n, side: 40 });
    assert.equal(round(out[0].value * 2 + out[1].value, 2), 180, `${n}각형`);
  }
  assert.equal(outputs('miter-angle', { n: 5, side: 40 })[2].value, 200);
});

test('경사로: 높이 30cm에 1:4면 수평 120cm, 빗변 123.7cm, 25%', () => {
  const out = outputs('ramp-length', { rise: 30, n: 4 });
  assert.equal(out[1].value, 120);
  assert.equal(out[0].value, round(Math.hypot(30, 120), 1));
  assert.equal(out[2].value, 25);
});

test('경사로: 1:12면 완만하다고, 1:6이면 가파르다고 알린다', () => {
  const t = geoTool('ramp-length')!;
  const gentle = { rise: 15, n: 12 };
  const steep = { rise: 15, n: 6 };
  assert.equal(t.verdict!(gentle, t.compute(gentle))!.tone, 'good');
  assert.equal(t.verdict!(steep, t.compute(steep))!.tone, 'bad');
});

test('위경도: 같은 자리면 거리가 0이다', () => {
  assert.equal(primary('earth-distance', { lat1: 37.5665, lon1: 126.978, lat2: 37.5665, lon2: 126.978 }), 0);
});

test('위경도: 적도에서 경도 90°는 지구 둘레의 1/4이다', () => {
  const quarter = primary('earth-distance', { lat1: 0, lon1: 0, lat2: 0, lon2: 90 });
  assert.equal(quarter, round((Math.PI / 2) * 6371, 2));
});

test('위경도: 서울에서 부산은 325km 남짓이고 남동쪽을 향한다', () => {
  const out = outputs('earth-distance', { lat1: 37.5665, lon1: 126.978, lat2: 35.1796, lon2: 129.0756 });
  assert.ok(Math.abs(out[0].value - 325) < 3, `${out[0].value}km`);
  assert.ok(out[1].value > 90 && out[1].value < 180, `방위각 ${out[1].value}°`);
});
