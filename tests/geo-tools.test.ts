import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GEO_TOOLS, geoTool } from '../lib/geo-tools.ts';
import { GEO_SECTION } from '../lib/geo-section.ts';
import { checkFormulaSection, primaryOf, outputsOf } from './formula-section-checks.ts';

checkFormulaSection(GEO_SECTION);

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
