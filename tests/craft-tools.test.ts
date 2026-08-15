import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CRAFT_TOOLS, craftTool, CRAFT_CATEGORIES } from '../lib/craft-tools.ts';
import { CRAFT_SECTION } from '../lib/craft-section.ts';
import { checkFormulaSection, primaryOf, outputsOf, checkEngineLabels } from './formula-section-checks.ts';

/**
 * 공예 섹션.
 *
 * 겹치지 않게 두는 선이 이 섹션의 존재 이유다 — 부피·면적 자체는 /geometry에,
 * 희석·배합은 /rate의 농도·배합에 이미 있다. 그래서 아래에 그 두 섹션과 슬러그가
 * 겹치지 않는지 보는 검사를 둔다. 겹치면 같은 도구가 주소 둘을 갖고, 예전에
 * 계산기와 /rate 사이에서 그렇게 65건이 잡혔다.
 */
checkFormulaSection(CRAFT_SECTION, 40);
checkEngineLabels(CRAFT_SECTION);

const primary = (slug: string, v: Record<string, number>) => primaryOf(CRAFT_TOOLS, slug, v);
const outputs = (slug: string, v: Record<string, number>) => outputsOf(CRAFT_TOOLS, slug, v);

test('여섯 분류가 모두 도구를 갖는다', () => {
  const empty = CRAFT_CATEGORIES.filter(c => !CRAFT_TOOLS.some(t => t.category === c));
  assert.deepEqual(empty, [], '분류만 있고 도구가 없으면 허브에 빈 제목이 남는다');
});

test('분류에 없는 이름을 쓴 도구가 없다', () => {
  const bad = CRAFT_TOOLS.filter(t => !CRAFT_CATEGORIES.includes(t.category as typeof CRAFT_CATEGORIES[number]));
  assert.deepEqual(bad.map(t => `${t.slug}: ${t.category}`), [], '허브의 어느 갈래에도 안 들어가 화면에서 사라진다');
});

test('다른 섹션과 슬러그가 겹치지 않는다', async () => {
  /*
   * /geometry에는 이미 페인트·타일·콘크리트가, /rate에는 희석이 있다.
   * 같은 슬러그를 여기 또 만들면 한 도구가 주소 둘을 갖는다.
   */
  const { GEO_TOOLS } = await import('../lib/geo-tools.ts');
  const { RATE_TOOLS } = await import('../lib/rate-tools.ts');
  const { BODY_TOOLS } = await import('../lib/body-tools.ts');
  const taken = new Set([...GEO_TOOLS, ...RATE_TOOLS, ...BODY_TOOLS].map(t => t.slug));
  const clash = CRAFT_TOOLS.map(t => t.slug).filter(s => taken.has(s));
  assert.deepEqual(clash, [], '이미 다른 섹션에 있는 슬러그다');
});

test('실 소요량: 50×60cm는 10cm 조각 12g 기준 360g', () => {
  // 3000㎠ ÷ 100㎠ × 12g
  assert.equal(primary('yarn-needed', { w: 50, h: 60, sw: 100, sg: 12 }), 360);
});

test('볼 개수는 여유를 얹은 뒤 올린다', () => {
  // 900m + 15% = 1035m ÷ 200m = 5.175 → 6볼. 올린 뒤 여유를 더하면 5볼로 잘못 나온다
  assert.equal(primary('yarn-skeins', { need: 900, ball: 200, spare: 15 }), 6);
});

test('게이지 보정은 폭을 지킨다', () => {
  // 도안 22코로 110코(50cm)를, 내가 20코로 뜨면 100코여야 50cm가 된다
  const out = outputs('gauge-convert', { pg: 22, mg: 20, sts: 110 });
  assert.equal(out[0].value, 100);
  assert.equal(out[1].value, 50);
});

test('코 수와 폭은 왕복이 맞는다', () => {
  const sts = primary('gauge-stitches', { g: 20, w: 45 });
  assert.equal(sts, 90);
  assert.equal(primary('gauge-convert', { pg: 20, mg: 20, sts }), 90);
});

test('왁스 무게는 채우는 비율만큼만 든다', () => {
  // 200ml × 90% × 0.9 = 162g
  assert.equal(primary('wax-weight', { vol: 200, fill: 90, d: 0.9 }), 162);
});

test('향 비율은 왁스 기준이고 역산과 왕복이 맞는다', () => {
  const fo = primary('fragrance-load', { wax: 500, pct: 8 });
  assert.equal(fo, 40);
  assert.equal(primary('fragrance-percent', { wax: 500, fo }), 8);
});

test('연소 시간은 무게를 소모율로 나눈 값이다', () => {
  assert.equal(primary('candle-burn-time', { wax: 180, rate: 7 }), 25.7);
});

test('WPI가 클수록 실이 가늘다 — 굵기 번호가 작아진다', () => {
  const thin = primary('wpi-weight', { wpi: 18 });
  const thick = primary('wpi-weight', { wpi: 7 });
  assert.ok(thin < thick, `가는 실 ${thin} < 굵은 실 ${thick}`);
});

test('소매 줄임은 한 번에 두 코가 줄어든다', () => {
  // 72 → 48은 24코, 줄임 12회. 120단 ÷ 12 = 10단마다
  const out = outputs('sleeve-decrease', { start: 72, end: 48, rows: 120 });
  assert.equal(out[0].value, 10);
  assert.equal(out[1].value, 12);
});

test('모자는 머리보다 작게 시작한다', () => {
  const out = outputs('hat-cast-on', { head: 56, ease: 10, g: 20 });
  assert.ok(out[1].value < 56, '음수 여유를 뺀 둘레여야 한다');
  assert.equal(out[0].value, Math.round(56 * 0.9 * 2));
});

test('모든 도구를 슬러그로 찾을 수 있다', () => {
  for (const t of CRAFT_TOOLS) assert.ok(craftTool(t.slug), `${t.slug} 못 찾음`);
});
