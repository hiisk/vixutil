/**
 * 강재 무게 — 계수를 믿지 않고 밀도와 π로 되짚는다.
 *
 * 이 섹션의 숫자는 전부 한 줄에서 나온다. 단위중량(kg/m) = 단면적(mm²) ÷ 10⁶ × 7850.
 * 형상마다 다른 것은 단면적 식 하나뿐이므로, 검사도 그 식을 **다른 방법으로 한 번 더
 * 세워** 맞춰 보는 쪽으로 쓴다 — 원은 반지름 꼴로, 관은 바깥에서 안쪽을 뺀 꼴로,
 * 계수는 밀도와 π로 다시 만든다.
 *
 * **밖에서 확인해 주는 줄은 아래 HAND뿐이다.** 손으로 검산할 수 있는 값을 형상마다
 * 하나씩 못 박아 두었다(6mm 강판 1m² = 47.1kg처럼). 나머지 검사는 저장소 안의 값끼리
 * 견주므로 밀도와 식이 함께 틀리면 서로 맞아떨어질 수 있다 — 그 자리를 HAND가 막는다.
 *
 * ── 규격표를 옮겨 적지 않는다는 것도 검사한다 ─────────────
 * H형강·ㄱ형강처럼 단위중량이 표로만 정해지는 형상이 들어오면 이 성질이 그 자리에서
 * 깨진다. list.ts의 EXCLUDED에 그 이름들을 남겨 두고, 어느 것도 형상 축에 없는지 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, EXCLUDED, FORMULA, HOLLOW, SHAPES, SHEET_LIKE, STOCK_M, TUBE_MAX_RATIO,
  type Cell, atShape, cellOf, sizeOf, slugOf, tubeFits,
} from '../lib/steel/list.ts';
import {
  ROUND_COEF, SHEET_COEF, SQUARE_COEF, STEEL_DENSITY,
  areaOf, innerOf, perSquareMetre, solidAreaOf, steelFacts, totalWeight, unitWeight,
} from '../lib/steel/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return steelFacts(c);
};

/** 상대오차 */
const rel = (a: number, b: number): number => Math.abs(a - b) / Math.abs(b);

/** facts.ts가 자르는 방식과 같아야 한다 — 자른 값끼리 그대로 맞추는 데 쓴다 */
const cut = (x: number, digits: number): number => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

test('칸은 일곱 형상 149개', () => {
  assert.equal(SHAPES.length, 7);
  assert.equal(CELLS.length, 149);
  assert.ok(CELLS.length > 100, '칸이 100개를 넘어야 한다');
  assert.equal(new Set(CELLS.map(slugOf)).size, 149, 'slug가 겹친다');
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));

  // 형상마다 칸이 있어야 한다 — 축을 하나 지워도 총수만 보면 안 드러난다
  for (const s of SHAPES) assert.ok(atShape(s).length >= 9, `${s}: ${atShape(s).length}칸뿐`);
  assert.equal(SHAPES.reduce((n, s) => n + atShape(s).length, 0), CELLS.length, '형상 밖의 칸이 있다');

  // slug는 형상 이름으로 시작한다 — 형상이 달라도 주소가 겹치지 않는 근거다
  for (const c of CELLS) assert.ok(slugOf(c).startsWith(c.shape), slugOf(c));
  // 소문자·숫자·하이픈만 — 소수점이 주소에 들어가면 마지막 칸이 확장자로 읽힌다
  for (const s of CELLS.map(slugOf)) assert.match(s, /^[a-z0-9-]+$/, `주소에 못 쓸 글자: ${s}`);

  assert.equal(cellOf('round'), undefined);
  assert.equal(cellOf('round-7mm'), undefined, '축에 없는 지름이 열리면 안 된다');
  assert.equal(cellOf('square-tube-50x50x9'), undefined, '거른 두께가 열리면 안 된다');
  assert.equal(cellOf('ROUND-20MM'), undefined, 'slug는 소문자 한 꼴만 열린다');
  assert.equal(cellOf('h-beam-200x100'), undefined, '표로만 정해지는 형상이 열리면 안 된다');
});

test('치수가 자릿수 실수 없이 적혀 있다', () => {
  for (const c of CELLS) {
    const where = slugOf(c);
    assert.ok(Number.isInteger(c.a) && c.a > 0, `${where}: 첫 치수 ${c.a}`);
    assert.ok(c.a >= 2 && c.a <= 150, `${where}: 첫 치수가 mm 범위를 벗어났다 — ${c.a}`);
    if (c.b !== undefined) {
      assert.ok(Number.isInteger(c.b) && c.b > 0, `${where}: 둘째 치수 ${c.b}`);
      // 강판·평철은 두께 < 폭이고, 직사각 각관은 긴 변 > 짧은 변이다
      if (SHEET_LIKE.includes(c.shape)) assert.ok(c.b > c.a, `${where}: 폭이 두께보다 작다`);
      else assert.ok(c.a > c.b, `${where}: 긴 변이 짧은 변보다 작다`);
    }
    if (c.t !== undefined) {
      assert.ok(HOLLOW.includes(c.shape), `${where}: 관이 아닌데 벽 두께가 있다`);
      // 두께가 반지름에 닿으면 관이 아니라 봉이다 — 그 훨씬 안쪽이어야 한다
      assert.ok(2 * c.t < Math.min(c.a, c.b ?? c.a), `${where}: 안쪽이 남지 않는다`);
      assert.ok(tubeFits(Math.min(c.a, c.b ?? c.a), c.t), `${where}: 거르는 규칙을 어긴 칸이 들어왔다`);
    } else {
      assert.ok(!HOLLOW.includes(c.shape), `${where}: 관인데 벽 두께가 없다`);
    }
    // 길이는 강판이면 장의 길이, 나머지는 정척이다
    if (c.shape === 'plate') assert.ok(c.length > 1 && c.length < 4, `${where}: 장 길이 ${c.length}m`);
    else assert.equal(c.length, STOCK_M, `${where}: 정척이 아니다`);
  }
  // 거르는 규칙이 실제로 무언가를 걸러야 한다 — 안 걸러지면 규칙이 죽은 것이다
  assert.equal(tubeFits(20, 5), false, '20mm 관에 5t가 통과한다 — 거르는 규칙이 죽었다');
  assert.equal(tubeFits(40, 5), true);
  assert.equal(TUBE_MAX_RATIO, 8);
});

test('계수 셋은 밀도와 π에서 나온다', () => {
  /*
   * 계수를 외워 적으면 자릿수가 하나 틀려도 149칸이 한꺼번에 조용히 어긋난다.
   * 그래서 코드는 계수를 만들고, 검사는 그것이 널리 인용되는 값인지 확인한다 —
   * 밀도를 7800으로 바꾸면 7.8·0.0061261·0.0078이 되어 세 줄에서 함께 걸린다.
   */
  assert.equal(STEEL_DENSITY, 7850);
  assert.equal(SHEET_COEF, 7.85);
  assert.ok(Math.abs(ROUND_COEF - 0.006165) < 1e-6, `원형 계수가 ${ROUND_COEF}`);
  assert.equal(SQUARE_COEF, 0.00785);

  // 세 계수는 서로 관계가 정해져 있다 — 원형은 사각의 π/4배, 강판은 사각의 1000배
  assert.ok(Math.abs(ROUND_COEF / SQUARE_COEF - Math.PI / 4) < 1e-12);
  assert.ok(Math.abs(SHEET_COEF / SQUARE_COEF - 1000) < 1e-9);
  // 강판 계수는 두께 × 7.85 그대로여야 한다
  for (const t of [2, 6, 12, 25]) assert.equal(perSquareMetre(t), t * 7.85);
});

test('형상마다 단면적 식을 다른 꼴로 다시 세워도 같다', () => {
  for (const c of CELLS) {
    const where = slugOf(c);
    const a = areaOf(c);
    const inner = innerOf(c);
    switch (c.shape) {
      case 'plate':
      case 'flat':
        assert.equal(a, c.a * c.b!, where);
        break;
      case 'square':
        assert.equal(a, c.a * c.a, where);
        // 사각 계수로도 같은 단위중량이 나와야 한다
        assert.ok(Math.abs(unitWeight(c) - SQUARE_COEF * c.a ** 2) < 1e-12, where);
        break;
      case 'round': {
        // 반지름 꼴 — π/4 d²로 정리한 자리를 되짚는다
        assert.ok(Math.abs(a - Math.PI * (c.a / 2) ** 2) < 1e-12, where);
        assert.ok(Math.abs(unitWeight(c) - ROUND_COEF * c.a ** 2) < 1e-12, where);
        break;
      }
      case 'round-tube': {
        // 바깥 원에서 안쪽 원을 뺀 것과 같아야 한다
        const outer = Math.PI * (c.a / 2) ** 2;
        const hole = Math.PI * (inner.a / 2) ** 2;
        assert.ok(Math.abs(a - (outer - hole)) < 1e-9, where);
        assert.ok(Math.abs(a - ROUND_COEF * 1e6 / STEEL_DENSITY * (c.a ** 2 - inner.a ** 2)) < 1e-9, where);
        break;
      }
      case 'square-tube':
        assert.equal(a, c.a ** 2 - inner.a ** 2, where);
        // (바깥+안쪽)(바깥−안쪽)으로 인수분해해도 같다 — 곱셈 자리를 되짚는다
        assert.ok(Math.abs(a - (c.a + inner.a) * (c.a - inner.a)) < 1e-9, where);
        break;
      case 'rect-tube':
        assert.equal(a, c.a * c.b! - inner.a * inner.b!, where);
        break;
    }
    // 안쪽 치수는 양쪽으로 뺀 값이다 — 한쪽만 빼면 벽이 절반인 관이 된다
    if (c.t !== undefined) {
      assert.equal(inner.a, c.a - 2 * c.t, where);
      if (c.b !== undefined) assert.equal(inner.b, c.b - 2 * c.t, where);
      assert.ok(a < areaOf({ ...c, t: c.t / 2 }) * 2, `${where}: 두께를 반으로 줄였는데 절반 아래로 안 떨어졌다`);
    }
    /*
     * 단면적은 밀도로 단위중량이 되고, 낱장이 들고 다니는 값도 같아야 한다.
     * 여유를 상대오차로 두면 안 된다 — 가장 얇은 ⌀6 봉이 0.222kg/m라, 소수 셋에서
     * 자른 값의 상대오차가 0.2%까지 벌어져 멀쩡한 줄이 걸린다. 자른 자리가 셋이므로
     * 절대오차 0.0005가 그 자리를 정확히 재는 값이다.
     */
    const f = steelFacts(c);
    assert.ok(Math.abs(f.area - a) <= 0.005, `${where}: area ${f.area}`);
    assert.ok(Math.abs(f.unit - unitWeight(c)) <= 0.0005, `${where}: unit ${f.unit} vs ${unitWeight(c)}`);
    assert.equal(f.formula, FORMULA[c.shape], where);
  }
});

test('손으로 검산한 값이 형상마다 하나씩 맞는다', () => {
  /*
   * 저장소 밖에서 확인해 주는 유일한 줄. 전부 종이에 한 번 곱하면 나오는 값이다.
   *   6mm 강판 1m²   6 × 7.85                        = 47.1 kg/m²
   *   ⌀20 원형봉      0.006165 × 400                  = 2.466 kg/m
   *   25 각재         0.00785 × 625                   = 4.906 kg/m
   *   50×50×2 각관    (2500 − 46²) × 0.00785          = 3.014 kg/m
   *   50×30×2 각관    (1500 − 46 × 26) × 0.00785      = 2.386 kg/m
   *   ⌀50×2 원형관    π/4 × (2500 − 2116) × 0.00785   = 2.368 kg/m
   *   6×50 평철       300 × 0.00785                   = 2.355 kg/m
   */
  const HAND: [string, number][] = [
    ['plate-6mm-1000x2000', 47.1],
    ['flat-6x50mm', 2.355],
    ['square-25mm', 4.906],
    ['round-20mm', 2.466],
    ['round-tube-50x2', 2.368],
    ['square-tube-50x50x2', 3.014],
    ['rect-tube-50x30x2', 2.386],
  ];
  const seen = new Set<string>();
  for (const [slug, unit] of HAND) {
    const f = facts(slug);
    assert.equal(f.unit, unit, `${slug}: 단위중량이 ${f.unit}`);
    seen.add(f.shape);
  }
  // 형상 일곱을 다 밟아야 한다 — 하나를 빼먹으면 그 식은 아무도 안 본 것이 된다
  assert.deepEqual([...seen].sort(), [...SHAPES].sort(), '손 검산이 빠진 형상이 있다');

  // 두께 6mm 강판 1m²는 47.1kg — 널리 인용되는 값이고, 장 무게가 그 넓이배다
  const plate = facts('plate-6mm-1000x2000');
  assert.equal(plate.perSquareMetre, 47.1);
  assert.equal(plate.sheetArea, 2);
  assert.equal(plate.perPiece, 94.2);
  // 같은 두께의 4×8피트 장은 넓이만큼 무겁다 — m²당 무게는 그대로다
  const big = facts('plate-6mm-1219x2438');
  assert.equal(big.perSquareMetre, 47.1);
  assert.ok(Math.abs(big.perPiece - 47.1 * big.sheetArea!) < 0.05, `${big.perPiece}`);
  assert.ok(big.perPiece > plate.perPiece, '큰 장이 더 무겁지 않다');
});

test('원형관은 바깥에서 안쪽을 뺀 것이고, 두께가 반지름에 닿으면 속이 찬 봉이다', () => {
  for (const c of CELLS.filter(x => x.shape === 'round-tube')) {
    const solid = areaOf({ shape: 'round', a: c.a, length: STOCK_M });
    const hole = areaOf({ shape: 'round', a: innerOf(c).a, length: STOCK_M });
    assert.ok(Math.abs(areaOf(c) - (solid - hole)) < 1e-9, slugOf(c));
    assert.ok(areaOf(c) < solid, `${slugOf(c)}: 관이 속 찬 봉보다 무겁다`);
    assert.ok(Math.abs(solidAreaOf(c) - solid) < 1e-9, slugOf(c));
    /*
     * 중심선 둘레 × 두께 — π × (D − t) × t. 뺄셈을 인수분해하면 그대로 나오므로
     * **어림이 아니라 같은 식이다**(π/4(D² − (D−2t)²) = π/4 · 2t · (2D − 2t)).
     * 서로 다른 두 꼴이 늘 맞는지가, 뺄셈 자리가 옳게 서 있다는 증거다.
     */
    assert.ok(Math.abs(areaOf(c) - Math.PI * (c.a - c.t!) * c.t!) < 1e-9, `${slugOf(c)}: 중심선 꼴과 어긋난다`);
    // 바깥 둘레로 재면 늘 크게 나온다 — 중심선이 아니라 바깥을 쓰는 실수를 짚는다
    assert.ok(Math.PI * c.a * c.t! > areaOf(c), slugOf(c));
  }
  /*
   * 두께를 반지름까지 밀면 구멍이 0이 되어 속이 찬 봉과 같아진다. 뺄셈 자리가
   * 옳게 서 있으면 이 극단에서 저절로 맞고, 한쪽만 빼는 식이었다면 여기서 벌어진다.
   */
  for (const d of [20, 50, 100]) {
    const full = { shape: 'round-tube' as const, a: d, t: d / 2, length: STOCK_M };
    assert.ok(Math.abs(areaOf(full) - areaOf({ shape: 'round', a: d, length: STOCK_M })) < 1e-9, `⌀${d}`);
    const box = { shape: 'square-tube' as const, a: d, t: d / 2, length: STOCK_M };
    assert.equal(areaOf(box), areaOf({ shape: 'square', a: d, length: STOCK_M }), `${d}각`);
    // 한쪽만 뺀 식(바깥 − t)은 속이 찬 것보다 크게 나온다 — 2를 빠뜨린 자리다
    const oneSided = (Math.PI / 4) * (d ** 2 - (d - d / 2) ** 2);
    assert.ok(oneSided < areaOf(full), `⌀${d}: 한쪽만 빼도 같은 값이 나온다`);
  }
  // 벽이 얇아질수록 관은 가벼워진다
  for (const a of [50, 100]) {
    const walls = CELLS.filter(c => c.shape === 'square-tube' && c.a === a).map(c => c.t!).sort((x, y) => x - y);
    let prev = 0;
    for (const t of walls) {
      const u = steelFacts({ shape: 'square-tube', a, t, length: STOCK_M }).unit;
      assert.ok(u > prev, `${a}각 ${t}t에서 무게가 줄었다`);
      prev = u;
    }
  }
});

test('치수가 2배면 단면적은 4배다', () => {
  /*
   * 무게는 치수의 제곱을 따라간다. 축에 정확히 두 배인 짝이 있어 그 자리에서
   * 그대로 볼 수 있고, 관은 두께까지 함께 두 배로 키운 것이 4배가 되는지 본다.
   */
  const DOUBLE: [Cell, Cell][] = [
    [{ shape: 'square', a: 25, length: STOCK_M }, { shape: 'square', a: 50, length: STOCK_M }],
    [{ shape: 'round', a: 20, length: STOCK_M }, { shape: 'round', a: 40, length: STOCK_M }],
    [{ shape: 'round', a: 25, length: STOCK_M }, { shape: 'round', a: 50, length: STOCK_M }],
    [{ shape: 'flat', a: 3, b: 25, length: STOCK_M }, { shape: 'flat', a: 6, b: 50, length: STOCK_M }],
    [{ shape: 'round-tube', a: 25, t: 2, length: STOCK_M }, { shape: 'round-tube', a: 50, t: 4, length: STOCK_M }],
    [{ shape: 'square-tube', a: 25, t: 2, length: STOCK_M }, { shape: 'square-tube', a: 50, t: 4, length: STOCK_M }],
    [{ shape: 'rect-tube', a: 50, b: 25, t: 2, length: STOCK_M }, { shape: 'rect-tube', a: 100, b: 50, t: 4, length: STOCK_M }],
  ];
  for (const [small, big] of DOUBLE) {
    assert.ok(Math.abs(areaOf(big) / areaOf(small) - 4) < 1e-9,
      `${slugOf(small)} → ${slugOf(big)}: ${areaOf(big) / areaOf(small)}배`);
  }
  // 강판은 두께만 두 배면 두 배다 — 한 축만 늘면 제곱이 아니다
  const t6 = facts('plate-6mm-1000x2000');
  const t12 = facts('plate-12mm-1000x2000');
  assert.ok(Math.abs(t12.perPiece / t6.perPiece - 2) < 1e-9, `${t12.perPiece / t6.perPiece}배`);
  assert.equal(t12.perSquareMetre, 94.2);
});

test('한 개 무게는 단위중량 × 길이이고, 길이에 정비례한다', () => {
  /*
   * 대조 상대는 **자르지 않은 값**이다. 화면에 나가는 f.unit은 소수 셋에서 잘렸으니
   * 그것에 6을 곱하면 오차도 여섯 배가 되어, 자릿수 실수와 자르기를 못 가린다.
   */
  for (const c of CELLS) {
    const f = steelFacts(c);
    const exact = unitWeight(c);
    const piece = exact * c.length;
    /*
     * 자른 값끼리 그대로 맞춘다. 여유를 두면 그 여유를 얼마로 잡을지가 또 문제가
     * 되고(2.355 × 6은 소수 셋에서 딱 반올림 경계에 떨어진다), 무엇보다 자르는
     * 자리를 바꿔도 검사가 통과해 버린다.
     */
    assert.equal(f.perPiece, cut(piece, 2), `${f.slug}: ${f.perPiece} vs ${piece}`);
    assert.equal(f.perTen, cut(piece * 10, 2), `${f.slug} 10개`);
    assert.equal(f.perHundred, cut(piece * 100, 2), `${f.slug} 100개`);
    assert.ok(Math.abs(totalWeight(exact, c.length, 100) - piece * 100) < 1e-9, f.slug);
    assert.equal(f.tonsPerHundred, cut(piece * 100 / 1000, 3), `${f.slug} 톤`);
    // 1톤에 몇 개 — 넘치지 않고, 한 개 더 넣으면 넘어야 한다
    assert.ok(f.piecesPerTon * piece <= 1000, `${f.slug}: ${f.piecesPerTon}개가 1톤을 넘는다`);
    assert.ok((f.piecesPerTon + 1) * piece > 1000, `${f.slug}: 한 개 더 들어간다`);
    // 길이를 두 배로 늘리면 무게도 두 배다 — 제곱이 끼어들면 안 된다
    assert.ok(Math.abs(totalWeight(exact, c.length * 2, 1) - piece * 2) < 1e-9, f.slug);
  }
  // 정척 6m 봉 하나 — ⌀20은 14.8kg이고 1톤에 67개다
  const bar = facts('round-20mm');
  assert.equal(bar.length, 6);
  assert.equal(bar.perPiece, 14.8);
  assert.equal(bar.piecesPerTon, 67);
});

test('속을 비운 만큼 가벼워진 값이 맞는다', () => {
  for (const c of CELLS) {
    const f = steelFacts(c);
    if (!HOLLOW.includes(c.shape)) {
      assert.equal(f.hollowSaving, undefined, `${f.slug}: 관이 아닌데 절감이 있다`);
      assert.equal(f.inner, undefined, `${f.slug}: 관이 아닌데 안쪽 치수가 있다`);
      continue;
    }
    assert.ok(f.solidArea! > f.area, `${f.slug}: 속 찬 것이 더 가볍다`);
    const want = (1 - areaOf(c) / solidAreaOf(c)) * 100;
    assert.ok(Math.abs(f.hollowSaving! - want) <= 0.05, `${f.slug}: ${f.hollowSaving} vs ${want}`);
    assert.ok(f.hollowSaving! > 30 && f.hollowSaving! < 96, `${f.slug}: 절감 ${f.hollowSaving}%`);
    assert.ok(Math.abs(f.solidUnit! - solidAreaOf(c) * STEEL_DENSITY / 1e6) <= 0.001, f.slug);
  }
  // ⌀50 × 2 관은 같은 지름 봉의 15% 남짓이다
  const tube = facts('round-tube-50x2');
  const solid = facts('round-50mm');
  assert.equal(tube.hollowSaving, 84.6);
  assert.ok(Math.abs(tube.solidUnit! - solid.unit) <= 0.001, `${tube.solidUnit} vs ${solid.unit}`);
});

test('강판·평철만 m²당 무게를 갖는다', () => {
  for (const c of CELLS) {
    const f = steelFacts(c);
    if (SHEET_LIKE.includes(c.shape)) {
      assert.ok(Math.abs(f.perSquareMetre! - c.a * 7.85) < 1e-9, `${f.slug}: ${f.perSquareMetre}`);
      // 폭 × m²당 무게가 단위중량이다 — 두 값이 서로 되짚는다
      assert.ok(rel(f.unit, (c.b! / 1000) * f.perSquareMetre!) < 0.001, f.slug);
    } else {
      assert.equal(f.perSquareMetre, undefined, `${f.slug}: 두께가 없는데 m²당 무게가 있다`);
    }
    assert.equal(f.sheetArea === undefined, c.shape !== 'plate', f.slug);
  }
});

test('표로만 정해지는 형상은 들어오지 않는다', () => {
  /*
   * 이 섹션이 정직해지는 조건이다. H형강·ㄱ형강 같은 형상은 필렛과 테이퍼가
   * 무게를 좌우하고 그 치수가 호칭에 없어, 넣으려면 규격표를 옮겨 적어야 한다.
   * 옮겨 적으면 한 칸이 틀려도 되짚을 상대가 없어져 이 파일의 모든 검사가
   * 무력해진다 — 그래서 이름을 남겨 두고 축에 없는지 본다.
   */
  assert.ok(EXCLUDED.length >= 6, `빼기로 한 형상이 ${EXCLUDED.length}개뿐`);
  for (const name of EXCLUDED) {
    assert.ok(!(SHAPES as string[]).includes(name), `${name}이 형상 축에 들어왔다`);
    assert.ok(!CELLS.some(c => slugOf(c).startsWith(name)), `${name} 칸이 있다`);
  }
  // 남은 형상은 전부 순수 기하다 — 식에 표에서 옮긴 상수가 끼어 있으면 안 된다
  for (const s of SHAPES) {
    assert.match(FORMULA[s], /^[a-zA-Z0-9π/×+−()² -]+$/, `${s}: 식에 못 쓸 글자 — ${FORMULA[s]}`);
    assert.ok(!/\d\.\d/.test(FORMULA[s]), `${s}: 식에 옮겨 적은 계수가 있다 — ${FORMULA[s]}`);
  }
  // 치수 표기는 숫자와 기호뿐이라 언어를 안 가린다
  for (const c of CELLS) assert.match(sizeOf(c), /^[⌀0-9 ×]+$/, sizeOf(c));
});

test('이웃 링크가 모든 칸에 들어온다', () => {
  /*
   * 앞에서 여섯 개를 잘라 오면 줄의 앞쪽만 서로 가리키고 뒤쪽 칸은 들어오는
   * 링크가 0이 된다 — 사이트맵에는 있고 아무도 안 가리키는 낱장이다. 고르는
   * 방법은 lib/related-window.ts가 갖고 있고, 여기서는 그 결과를 센다.
   */
  const deg = new Map<string, number>(CELLS.map(c => [slugOf(c), 0]));
  for (const c of CELLS) {
    const f = steelFacts(c);
    assert.equal(f.neighbours.length, 6, `${f.slug}: 이웃이 여섯이 아니다`);
    assert.equal(new Set(f.neighbours.map(slugOf)).size, 6, `${f.slug}: 이웃이 겹친다`);
    for (const n of f.neighbours) {
      assert.notEqual(slugOf(n), f.slug, `${f.slug}: 자기를 가리킨다`);
      assert.ok(cellOf(slugOf(n)), `${f.slug} → ${slugOf(n)}: 없는 칸을 가리킨다`);
      deg.set(slugOf(n), deg.get(slugOf(n))! + 1);
    }
    // 같은 형상을 먼저 채운다 — 주제가 흐려지지 않게 하려는 것이다
    assert.ok(f.neighbours.filter(n => n.shape === c.shape).length >= 5, `${f.slug}: 같은 형상이 모자라다`);
    // 마지막 한 칸은 다른 형상에 남긴다 — 형상 사이에 길이 하나씩 난다
    assert.ok(f.neighbours.some(n => n.shape !== c.shape), `${f.slug}: 형상 밖으로 나가는 길이 없다`);
  }
  const counts = [...deg.values()];
  assert.ok(Math.min(...counts) >= 1, `들어오는 링크가 0인 칸이 있다: ${[...deg].filter(([, n]) => n === 0).map(([k]) => k).slice(0, 3)}`);
  assert.equal(counts.reduce((a, b) => a + b, 0), CELLS.length * 6, '나가는 링크와 들어오는 링크의 합이 다르다');
});

test('축에 없는 값을 넣으면 조용히 답하지 않는다', () => {
  assert.throws(() => steelFacts({ shape: 'round', a: 7, length: STOCK_M }), /모르는 칸/);
  assert.throws(() => steelFacts({ shape: 'square-tube', a: 20, t: 5, length: STOCK_M }), /모르는 칸/);
  assert.throws(() => steelFacts({ shape: 'plate', a: 6, b: 1000, length: 3 }), /모르는 칸/);
});
