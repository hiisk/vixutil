import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  hexToRgb, rgbToHex, rgbToHsl, hslToRgb, hexToHsl, hslToHex, rgbToCmyk,
  luminance, contrastRatio, judgeContrast, simulateCvd, harmony, scale, mix,
  kelvinToRgb, nearestNamed,
} from '../lib/color.ts';

/**
 * 색 계산은 눈으로 검증할 수 없다 — 대비 4.5:1이 맞는지, 변환이 정확한지는
 * 봐서는 모른다. 값이 알려진 예(흰-검 21:1 등)로 고정한다.
 */
test('HEX와 RGB를 오간다', () => {
  assert.deepEqual(hexToRgb('#3b82f6'), { r: 59, g: 130, b: 246 });
  assert.deepEqual(hexToRgb('#fff'), { r: 255, g: 255, b: 255 }, '3자리 축약도 읽는다');
  assert.equal(rgbToHex({ r: 59, g: 130, b: 246 }), '#3b82f6');
  assert.equal(hexToRgb('굴러온돌'), null);
  assert.equal(hexToRgb('#12345'), null);
});

test('RGB와 HSL을 오간다', () => {
  assert.deepEqual(rgbToHsl({ r: 255, g: 0, b: 0 }), { h: 0, s: 100, l: 50 });
  assert.deepEqual(rgbToHsl({ r: 128, g: 128, b: 128 }), { h: 0, s: 0, l: 50 }, '무채색은 색상이 없다');
  assert.deepEqual(hslToRgb({ h: 0, s: 100, l: 50 }), { r: 255, g: 0, b: 0 });
  assert.deepEqual(hslToRgb({ h: 120, s: 100, l: 50 }), { r: 0, g: 255, b: 0 });
});

test('HSL 왕복이 눈에 띄게 어긋나지 않는다', () => {
  // 정수로 반올림하므로 완전히 같지는 않다. 채널당 3 이내면 사람 눈에는 같은 색이다.
  for (const hex of ['#3b82f6', '#f43f5e', '#22c55e', '#eab308']) {
    const back = hexToRgb(hslToHex(hexToHsl(hex)!))!;
    const orig = hexToRgb(hex)!;
    for (const k of ['r', 'g', 'b'] as const) {
      assert.ok(Math.abs(back[k] - orig[k]) <= 3, `${hex} ${k}: ${orig[k]} → ${back[k]}`);
    }
  }
});

test('대비비는 흰-검이 21:1로 최대다', () => {
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };
  assert.equal(Math.round(contrastRatio(white, black)), 21);
  assert.equal(contrastRatio(white, white), 1, '같은 색은 1:1');
  // 순서를 바꿔도 같은 값이어야 한다
  assert.equal(contrastRatio(white, black), contrastRatio(black, white));
});

test('접근성 기준 판정', () => {
  const white = { r: 255, g: 255, b: 255 };
  // #767676이 흰 배경에서 AA 통과의 경계로 알려져 있다
  const pass = judgeContrast(white, hexToRgb('#767676')!);
  assert.ok(pass.aaNormal, '4.5:1을 넘어야 한다');
  const large = judgeContrast(white, hexToRgb('#8a8a8a')!);
  assert.ok(!large.aaNormal, '연한 회색은 본문에 못 쓴다');
  assert.ok(large.aaLarge, '큰 글씨 기준(3:1)은 넘는다');
  const tooLight = judgeContrast(white, hexToRgb('#999999')!);
  assert.ok(!tooLight.aaLarge, '더 연하면 큰 글씨로도 못 쓴다');
});

test('휘도는 초록에 가장 크게 반응한다', () => {
  // 사람 눈이 초록을 가장 밝게 느끼므로 같은 255라도 초록이 가장 밝다
  const r = luminance({ r: 255, g: 0, b: 0 });
  const g = luminance({ r: 0, g: 255, b: 0 });
  const b = luminance({ r: 0, g: 0, b: 255 });
  assert.ok(g > r && r > b, `초록 ${g} > 빨강 ${r} > 파랑 ${b}`);
});

test('색약 시뮬레이션이 빨강과 초록의 색상 차이를 좁힌다', () => {
  /*
    대비(밝기 차이)가 아니라 색상(hue) 차이를 본다. 적록색약에서 문제가 되는 건
    두 색이 같은 계열로 뭉쳐 보이는 것이지 밝기까지 같아지는 것은 아니다.
    실제로 변환 뒤 밝기 차이는 오히려 커지기도 한다.
  */
  const hueOf = (rgb: { r: number; g: number; b: number }) => rgbToHsl(rgb).h;
  const red = hexToRgb('#ff0000')!;
  const green = hexToRgb('#00ff00')!;
  const gap = (a: number, b: number) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));

  const before = gap(hueOf(red), hueOf(green));
  assert.equal(before, 120, '원래 빨강과 초록은 120도 떨어져 있다');

  for (const type of ['protanopia', 'deuteranopia'] as const) {
    const after = gap(hueOf(simulateCvd(red, type)), hueOf(simulateCvd(green, type)));
    assert.ok(after < before, `${type}: 색상 차이가 줄어야 한다 (${before}° → ${after}°)`);
  }
});

test('전색맹 변환은 세 채널이 같아진다', () => {
  const out = simulateCvd(hexToRgb('#3b82f6')!, 'achromatopsia');
  assert.equal(out.r, out.g);
  assert.equal(out.g, out.b);
});

test('색상환 규칙대로 색을 고른다', () => {
  const base = { h: 0, s: 100, l: 50 };
  assert.deepEqual(harmony(base, 'complementary')[1].h, 180);
  assert.deepEqual(harmony(base, 'triadic').map(h => h.h), [0, 120, 240]);
  assert.equal(harmony(base, 'analogous').length, 3);
  assert.equal(harmony(base, 'monochrome').length, 5);
  // 색상은 0~359를 벗어나지 않아야 한다
  for (const kind of ['complementary', 'triadic', 'tetradic'] as const) {
    for (const c of harmony({ h: 350, s: 50, l: 50 }, kind)) {
      assert.ok(c.h >= 0 && c.h < 360, `${kind}: ${c.h}`);
    }
  }
});

test('명도 단계는 밝은 쪽에서 어두운 쪽으로 간다', () => {
  const steps = scale({ h: 217, s: 91, l: 60 });
  assert.equal(steps.length, 10);
  assert.equal(steps[0].step, 50);
  assert.equal(steps[9].step, 900);
  assert.ok(steps[0].hsl.l > steps[9].hsl.l, '앞이 더 밝아야 한다');
  // 색상과 채도는 유지돼야 같은 계열로 보인다
  assert.equal(steps[0].hsl.h, steps[9].hsl.h);
});

test('색 섞기', () => {
  const black = { r: 0, g: 0, b: 0 };
  const white = { r: 255, g: 255, b: 255 };
  assert.deepEqual(mix(black, white, 0), black);
  assert.deepEqual(mix(black, white, 1), white);
  assert.deepEqual(mix(black, white, 0.5), { r: 128, g: 128, b: 128 });
  assert.deepEqual(mix(black, white, 5), white, '범위를 벗어난 비율은 잘라낸다');
});

test('색온도는 낮을수록 붉고 높을수록 푸르다', () => {
  const warm = kelvinToRgb(2000);
  const cool = kelvinToRgb(10000);
  assert.ok(warm.r > warm.b, '2000K는 붉어야 한다');
  assert.ok(cool.b > warm.b, '높은 색온도가 더 푸르다');
  assert.equal(kelvinToRgb(500).r, kelvinToRgb(1000).r, '범위 아래는 최저값으로 자른다');
});

test('가장 가까운 이름 있는 색을 찾는다', () => {
  assert.equal(nearestNamed({ r: 255, g: 0, b: 0 }).name, 'red');
  assert.equal(nearestNamed({ r: 0, g: 0, b: 0 }).name, 'black');
  assert.equal(nearestNamed({ r: 255, g: 0, b: 0 }).distance, 0, '정확히 같으면 거리 0');
});

test('CMYK 변환', () => {
  assert.deepEqual(rgbToCmyk({ r: 0, g: 0, b: 0 }), { c: 0, m: 0, y: 0, k: 100 });
  assert.deepEqual(rgbToCmyk({ r: 255, g: 255, b: 255 }), { c: 0, m: 0, y: 0, k: 0 });
  assert.deepEqual(rgbToCmyk({ r: 255, g: 0, b: 0 }), { c: 0, m: 100, y: 100, k: 0 });
});
