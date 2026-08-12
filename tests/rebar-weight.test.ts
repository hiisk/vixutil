/**
 * 철근 무게 — 규격표를 믿지 않고 밀도와 π로 되짚는다.
 *
 * 이 섹션의 숫자는 전부 한 식에서 나온다. 단위중량(kg/m) = π/4 × 공칭지름² × 7850 ÷ 10⁶.
 * 그래서 검사도 그 식을 되짚는 쪽으로 쓴다 — 널리 인용되는 0.006165 계수를 그대로
 * 믿지 않고 밀도와 π로 만들어 맞춰 보고, 그 값이 KS D 3504·JIS G 3112가 공표한
 * 규격 단위중량 열세 줄과 어긋나지 않는지 본다.
 *
 * **밖에서 확인해 주는 줄은 하나뿐이다** — 아래 PUBLISHED 표다. 나머지 검사는 모두
 * 저장소 안의 값끼리 견주므로, 공칭지름과 밀도가 함께 틀리면 서로 맞아떨어질 수 있다.
 * 그 표만 규격에서 옮겨 적은 값이고, 옮겨 적기가 틀리면 되짚기 검사가 먼저 깨진다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BARS, CELLS, LENGTHS, barOf, cellOf, slugOf } from '../lib/rebar/list.ts';
import {
  LAP_DB, LOSS_RATE, STEEL_DENSITY, UNIT_COEF,
  areaOf, rebarFacts, standardUnit, totalWeight, unitWeight, withLoss,
} from '../lib/rebar/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return rebarFacts(c);
};

/** 상대오차 */
const rel = (a: number, b: number): number => Math.abs(a - b) / Math.abs(b);

test('칸은 규격 13가지 × 길이 9가지', () => {
  assert.equal(BARS.length, 13);
  assert.equal(LENGTHS.length, 9);
  assert.equal(CELLS.length, 117);
  assert.ok(CELLS.length > 100, '칸이 100개를 넘어야 한다');
  assert.equal(new Set(CELLS.map(slugOf)).size, 117, 'slug가 겹친다');
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));

  // 축은 오름차순이어야 한다 — 이웃 잇기와 단조성 검사가 순서에 기댄다
  for (let i = 1; i < LENGTHS.length; i++) assert.ok(LENGTHS[i] > LENGTHS[i - 1]);
  for (let i = 1; i < BARS.length; i++) assert.ok(BARS[i].mm > BARS[i - 1].mm, `D${BARS[i].d}`);
  // 자릿수 실수를 잡는다 — 공칭지름은 mm, 단위중량은 kg/m다
  for (const b of BARS) {
    assert.ok(b.mm > 6 && b.mm < 52, `D${b.d}: 공칭지름 ${b.mm}`);
    assert.ok(b.kg > 0.2 && b.kg < 16, `D${b.d}: 단위중량 ${b.kg}`);
    // 호칭은 공칭지름과 1mm 안에서 붙어 있다 — 자리가 밀린 줄을 잡는다
    assert.ok(Math.abs(b.d - b.mm) < 1, `D${b.d}: 호칭과 공칭지름이 ${b.mm}로 너무 벌어졌다`);
  }
  // 유통되는 정척 네 가지가 길이 축에 있어야 한다 — 이것이 빠지면 물량을 못 센다
  for (const m of [6, 8, 10, 12]) assert.ok(LENGTHS.includes(m), `정척 ${m}m가 길이 축에 없다`);

  assert.equal(cellOf('d13'), undefined);
  assert.equal(cellOf('d14-6m'), undefined, '축에 없는 규격이 열리면 안 된다');
  assert.equal(cellOf('d13-7m'), undefined, '축에 없는 길이가 열리면 안 된다');
  assert.equal(cellOf('D13-6M'), undefined, 'slug는 소문자 한 꼴만 열린다');
});

test('0.006165 계수는 밀도와 π에서 나온다', () => {
  /*
   * 계수를 외워 적으면 자릿수가 하나 틀려도 117칸이 한꺼번에 조용히 어긋난다.
   * 그래서 코드는 계수를 만들고, 검사는 그것이 널리 인용되는 값인지 확인한다 —
   * 밀도를 7800으로 바꾸면 0.0061261이 되어 이 줄에서 걸린다.
   */
  assert.equal(STEEL_DENSITY, 7850);
  assert.ok(Math.abs(UNIT_COEF - 0.006165) < 1e-6, `계수가 ${UNIT_COEF}`);

  for (const b of BARS) {
    // 반지름 꼴로 다시 써도 같은 값이어야 한다 — π/4 d²로 정리한 자리를 되짚는다
    const byRadius = (Math.PI * (b.mm / 2) ** 2 / 1e6) * STEEL_DENSITY;
    assert.ok(Math.abs(unitWeight(b.mm) - byRadius) < 1e-12, `D${b.d}`);
    // 계수 × 지름²으로도 같아야 한다
    assert.ok(Math.abs(unitWeight(b.mm) - UNIT_COEF * b.mm ** 2) < 1e-12, `D${b.d}`);
    // 단면적은 원의 면적이다
    assert.ok(Math.abs(areaOf(b.mm) - Math.PI * (b.mm / 2) ** 2) < 1e-12, `D${b.d}`);
  }
});

test('규격 단위중량 열세 줄이 밀도로 되짚어진다', () => {
  for (const b of BARS) {
    // 규격이 자르는 순서(단면적 유효숫자 4 → 질량 유효숫자 3)까지 따라가면 딱 맞는다
    assert.equal(standardUnit(b.mm), b.kg, `D${b.d}: 되짚으면 ${standardUnit(b.mm)}인데 ${b.kg}로 적혀 있다`);
    // 자르지 않은 값과도 0.2% 안에서 맞아야 한다 — 공칭지름이나 밀도가 틀리면 벌어진다
    assert.ok(rel(b.kg, unitWeight(b.mm)) < 0.002, `D${b.d}: ${b.kg} vs ${unitWeight(b.mm).toFixed(5)}`);
    // 낱장이 들고 다니는 되짚은 값도 같은 식에서 나와야 한다
    const f = rebarFacts({ d: b.d, length: 6 });
    assert.ok(Math.abs(f.exactUnit - unitWeight(b.mm)) <= 0.00005, `D${b.d}: exactUnit ${f.exactUnit}`);
  }
});

test('공표된 규격값과 맞는다', () => {
  /*
   * 저장소 밖에서 확인해 주는 유일한 줄. KS D 3504(JIS G 3112와 같은 값)의
   * 공칭지름과 단위중량이다 — 널리 인용되는 D13 0.995kg/m·D16 1.56kg/m가 여기 있다.
   */
  const PUBLISHED: [number, number, number][] = [
    [10, 9.53, 0.56],
    [13, 12.7, 0.995],
    [16, 15.9, 1.56],
    [19, 19.1, 2.25],
    [22, 22.2, 3.04],
    [25, 25.4, 3.98],
    [32, 31.8, 6.23],
    [51, 50.8, 15.9],
  ];
  for (const [d, mm, kg] of PUBLISHED) {
    const b = barOf(d);
    assert.ok(b, `D${d}가 목록에 없다`);
    assert.equal(b.mm, mm, `D${d} 공칭지름`);
    assert.equal(b.kg, kg, `D${d} 단위중량`);
  }
});

test('호칭 숫자를 지름으로 넣으면 어긋난다', () => {
  /*
   * D13은 이름이고 공칭지름은 12.7mm다. 이름을 그대로 넣으면 1.042kg/m가 나와
   * 규격값 0.995kg/m보다 5% 가까이 무겁다 — 화면이 두 값을 나란히 보여 주는 근거다.
   */
  const f = facts('d13-6m');
  assert.equal(f.bar.mm, 12.7);
  assert.equal(f.nameUnit, 1.042);
  assert.ok(rel(f.nameUnit, f.unit) > 0.04, `D13 차이가 ${rel(f.nameUnit, f.unit)}`);

  for (const b of BARS) {
    const g = rebarFacts({ d: b.d, length: 6 });
    assert.notEqual(g.nameUnit, g.unit, `D${b.d}: 호칭을 넣어도 같은 값이 나온다`);
    assert.ok(rel(g.nameUnit, g.unit) > 0.004, `D${b.d}: 차이가 ${rel(g.nameUnit, g.unit)}`);
  }
});

test('총중량은 단위중량 × 길이 × 개수다', () => {
  for (const c of CELLS) {
    const f = rebarFacts(c);
    const raw = f.unit * c.length;
    assert.ok(Math.abs(f.perBar - raw) <= 0.0005, `${f.slug}: ${f.perBar} vs ${raw}`);
    assert.ok(Math.abs(f.perTen - raw * 10) <= 0.005, `${f.slug} 10가닥`);
    assert.ok(Math.abs(f.perHundred - raw * 100) <= 0.005, `${f.slug} 100가닥`);
    assert.ok(Math.abs(totalWeight(f.unit, c.length, 100) - raw * 100) < 1e-9, f.slug);
    assert.ok(Math.abs(f.tonsPerHundred - raw * 100 / 1000) <= 0.00005, `${f.slug} 톤`);
    // 1톤에 몇 가닥 — 넘치지 않고, 한 가닥 더 넣으면 넘어야 한다
    assert.ok(f.barsPerTon * raw <= 1000, `${f.slug}: ${f.barsPerTon}가닥이 1톤을 넘는다`);
    assert.ok((f.barsPerTon + 1) * raw > 1000, `${f.slug}: 한 가닥 더 들어간다`);
  }
  // 널리 쓰이는 값 — D13 6m 한 가닥은 5.97kg이고 1톤에 167가닥이다
  const f = facts('d13-6m');
  assert.equal(f.perBar, 5.97);
  assert.equal(f.perHundred, 597);
  assert.equal(f.barsPerTon, 167);
});

test('길이가 늘면 무게가 정비례한다', () => {
  for (const b of BARS) {
    const one = totalWeight(b.kg, 1, 1);
    for (const m of LENGTHS) {
      const at = rebarFacts({ d: b.d, length: m });
      assert.ok(rel(at.unit * m, one * m) < 1e-12, `D${b.d} ${m}m`);
      assert.ok(Math.abs(at.perBar - one * m) <= 0.0005, `D${b.d} ${m}m: ${at.perBar}`);
    }
    // 길이 축을 따라 무게가 줄지 않는다
    let prev = 0;
    for (const m of LENGTHS) {
      const w = rebarFacts({ d: b.d, length: m }).perBar;
      assert.ok(w > prev, `D${b.d} ${m}m에서 무게가 줄었다`);
      prev = w;
    }
  }
  // 12m는 1m의 열두 배다
  assert.ok(Math.abs(facts('d16-12m').perBar - facts('d16-1m').perBar * 12) < 0.01);
});

test('지름이 크면 무거워지고, 2배면 4배다', () => {
  for (let i = 1; i < BARS.length; i++) {
    assert.ok(BARS[i].kg > BARS[i - 1].kg, `D${BARS[i].d}가 D${BARS[i - 1].d}보다 가볍다`);
    assert.ok(unitWeight(BARS[i].mm) > unitWeight(BARS[i - 1].mm), `D${BARS[i].d}`);
  }
  /*
   * 무게는 지름의 제곱을 따라간다. 공칭지름이 정확히 두 배인 짝이 넷 있어(1/4·1/2인치,
   * 1/2·1인치, 5/8·1¼인치, 1·2인치) 그 자리에서 4배가 나오는지 그대로 볼 수 있다.
   */
  const DOUBLES: [number, number][] = [[6, 13], [13, 25], [16, 32], [25, 51]];
  for (const [small, big] of DOUBLES) {
    const a = barOf(small)!;
    const b = barOf(big)!;
    assert.ok(Math.abs(b.mm - a.mm * 2) < 1e-9, `D${small}→D${big}: 지름이 두 배가 아니다`);
    assert.ok(Math.abs(unitWeight(b.mm) / unitWeight(a.mm) - 4) < 1e-9, `D${small}→D${big}`);
    // 규격이 유효숫자로 자른 값끼리도 1% 안에서 4배다
    assert.ok(Math.abs(b.kg / a.kg - 4) < 0.04, `D${small}→D${big}: ${b.kg / a.kg}`);
  }
});

test('겹침이음은 지름의 40배, 발주는 로스만큼 크다', () => {
  assert.equal(LAP_DB, 40);
  assert.ok(LOSS_RATE >= 0.03 && LOSS_RATE <= 0.05, `로스율 ${LOSS_RATE}`);
  for (const c of CELLS) {
    const f = rebarFacts(c);
    assert.ok(Math.abs(f.lapMetres - 40 * f.bar.mm / 1000) < 1e-9, `${f.slug} 이음 길이`);
    assert.ok(f.lapMetres > 0.2 && f.lapMetres < 2.1, `${f.slug}: 이음 ${f.lapMetres}m`);
    assert.ok(Math.abs(f.lapWeight - f.lapMetres * f.unit) < 0.001, `${f.slug} 이음 무게`);
    const want = withLoss(f.unit * c.length * 100);
    assert.ok(Math.abs(f.orderPerHundred - want) <= 0.005, `${f.slug}: ${f.orderPerHundred} vs ${want}`);
    assert.ok(f.orderPerHundred > f.perHundred, `${f.slug}: 발주가 순 무게보다 크지 않다`);
  }
  // D13의 이음 한 곳은 0.508m다
  assert.equal(facts('d13-6m').lapMetres, 0.508);
});

test('이웃 링크가 모든 칸에 들어온다', () => {
  /*
   * 앞에서 N개를 잘라 오면 줄의 앞쪽만 서로 가리키고 뒤쪽 칸은 들어오는 링크가 0이
   * 된다 — 사이트맵에는 있고 아무도 안 가리키는 낱장이다. 자기 자리 다음부터 감으면
   * 117칸이 정확히 같은 수만큼 가리켜진다.
   */
  const deg = new Map<string, number>(CELLS.map(c => [slugOf(c), 0]));
  for (const c of CELLS) {
    const f = rebarFacts(c);
    assert.equal(f.neighbours.length, 6, `${f.slug}: 이웃이 여섯이 아니다`);
    assert.equal(new Set(f.neighbours.map(n => n.slug)).size, 6, `${f.slug}: 이웃이 겹친다`);
    for (const n of f.neighbours) {
      assert.notEqual(n.slug, f.slug, `${f.slug}: 자기를 가리킨다`);
      assert.ok(cellOf(n.slug), `${f.slug} → ${n.slug}: 없는 칸을 가리킨다`);
      deg.set(n.slug, deg.get(n.slug)! + 1);
    }
    // 절반은 같은 규격, 절반은 같은 길이여야 한다
    assert.equal(f.neighbours.filter(n => n.d === c.d).length, 3, f.slug);
    assert.equal(f.neighbours.filter(n => n.length === c.length).length, 3, f.slug);
  }
  const counts = [...deg.values()];
  assert.equal(Math.min(...counts), 6, '들어오는 링크가 여섯보다 적은 칸이 있다');
  assert.equal(Math.max(...counts), 6, '들어오는 링크가 여섯보다 많은 칸이 있다');
});

test('축에 없는 값을 넣으면 조용히 답하지 않는다', () => {
  assert.throws(() => rebarFacts({ d: 14, length: 6 }), /모르는 규격/);
  assert.throws(() => rebarFacts({ d: 13, length: 7 }), /모르는 길이/);
});
