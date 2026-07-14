import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeOne, makeBatch } from '../lib/generate.ts';
import type { Generator } from '../lib/types.ts';
import { GENERATORS_A } from '../lib/generator-data-a.ts';
import { GENERATORS_B } from '../lib/generator-data-b.ts';
import { GENERATORS_C } from '../lib/generator-data-c.ts';
import { GENERATORS_D } from '../lib/generator-data-d.ts';
import { GENERATORS_E } from '../lib/generator-data-e.ts';
import { GENERATORS_F } from '../lib/generator-data-f.ts';
import { GENERATORS_G } from '../lib/generator-data-g.ts';
import { GENERATORS_H } from '../lib/generator-data-h.ts';

const ALL: Generator[] = [
  ...GENERATORS_A, ...GENERATORS_B, ...GENERATORS_C, ...GENERATORS_D,
  ...GENERATORS_E, ...GENERATORS_F, ...GENERATORS_G, ...GENERATORS_H,
];

const base = { slug: 's', title: 't', desc: 'd', icon: '🎲', category: '랜덤' };

const lotto: Generator = { ...base, type: 'sample', min: 1, max: 45, count: 6, separator: ', ' };

test('sample: 로또는 1~45에서 중복 없이 6개를 뽑는다', () => {
  for (let i = 0; i < 300; i++) {
    const nums = makeOne(lotto).split(', ').map(Number);
    assert.equal(nums.length, 6, '6개가 아니다');
    assert.equal(new Set(nums).size, 6, `중복 발생: ${nums.join(',')}`);
    for (const n of nums) {
      assert.ok(Number.isInteger(n) && n >= 1 && n <= 45, `범위 이탈: ${n}`);
    }
  }
});

test('sample: 결과가 오름차순으로 정렬된다', () => {
  for (let i = 0; i < 100; i++) {
    const nums = makeOne(lotto).split(', ').map(Number);
    const sorted = [...nums].sort((a, b) => a - b);
    assert.deepEqual(nums, sorted, `정렬되지 않음: ${nums.join(',')}`);
  }
});

test('sample: 범위 전체를 고르게 쓴다', () => {
  // 특정 숫자만 계속 나오면 추첨기로서 쓸모가 없다.
  const seen = new Set<number>();
  for (let i = 0; i < 500; i++) {
    for (const n of makeOne(lotto).split(', ').map(Number)) seen.add(n);
  }
  assert.equal(seen.size, 45, `45개 중 ${seen.size}개만 등장했다`);
});

test('sample: count가 범위보다 크면 범위 크기로 제한된다', () => {
  const g: Generator = { ...base, type: 'sample', min: 1, max: 3, count: 10, separator: ',' };
  const nums = makeOne(g).split(',').map(Number);
  assert.equal(nums.length, 3);
  assert.deepEqual(nums, [1, 2, 3]);
});

test('sample: 기본값은 로또 규격(1~45, 6개)이다', () => {
  const g: Generator = { ...base, type: 'sample' };
  const nums = makeOne(g).split(', ').map(Number);
  assert.equal(nums.length, 6);
  assert.ok(nums.every(n => n >= 1 && n <= 45));
});

test('number: min~max 범위를 벗어나지 않는다', () => {
  const g: Generator = { ...base, type: 'number', min: 5, max: 7 };
  for (let i = 0; i < 200; i++) {
    const n = Number(makeOne(g));
    assert.ok(n >= 5 && n <= 7, `범위 이탈: ${n}`);
  }
});

test('combine: 각 풀에서 하나씩 뽑아 이어붙인다', () => {
  const g: Generator = { ...base, type: 'combine', pools: [['A', 'B'], ['1', '2']], separator: '-' };
  for (let i = 0; i < 50; i++) {
    assert.match(makeOne(g), /^[AB]-[12]$/);
  }
});

test('pick: 항목 중 하나를 고른다', () => {
  const g: Generator = { ...base, type: 'pick', items: ['가', '나', '다'] };
  for (let i = 0; i < 50; i++) {
    assert.ok(['가', '나', '다'].includes(makeOne(g)));
  }
});

test('password: 길이를 지키고 문자 종류를 섞는다', () => {
  const g: Generator = { ...base, type: 'password', count: 16 };
  for (let i = 0; i < 50; i++) {
    const p = makeOne(g);
    assert.equal(p.length, 16);
    assert.match(p, /[A-Z]/, '대문자 없음');
    assert.match(p, /[2-9]/, '숫자 없음');
    assert.match(p, /[!@#$%&*]/, '특수문자 없음');
    assert.doesNotMatch(p, /[Il1O0]/, '헷갈리는 문자가 포함됐다');
  }
});

test('makeBatch: 중복 없는 결과를 모은다', () => {
  const results = makeBatch(lotto);
  assert.equal(results.length, 5);
  assert.equal(new Set(results).size, 5, '배치 안에 같은 조합이 있다');
});

test('makeBatch: 경우의 수가 적으면 그만큼만 낸다', () => {
  // 무한 루프에 빠지지 않고 가능한 만큼만 돌려줘야 한다.
  const g: Generator = { ...base, type: 'pick', items: ['하나', '둘'] };
  const results = makeBatch(g);
  assert.ok(results.length <= 2, `가능한 경우보다 많이 냈다: ${results.length}`);
  assert.equal(new Set(results).size, results.length);
});

test('실제 제너레이터가 전부 결과를 낸다', () => {
  // 데이터가 타입과 안 맞으면(예: combine인데 pools 없음) 조용히 빈 문자열이 나온다.
  // 페이지는 멀쩡히 뜨고 버튼만 눌러도 아무것도 안 나오는 상태가 된다.
  assert.ok(ALL.length > 100, `제너레이터가 ${ALL.length}개뿐 — 수집이 깨졌다`);

  const broken: string[] = [];
  for (const g of ALL) {
    const results = makeBatch(g);
    if (results.length === 0 || results.some(r => !r.trim())) broken.push(g.slug);
  }
  assert.deepEqual(broken, [], `결과가 안 나오는 제너레이터: ${broken.join(', ')}`);
});

test('제너레이터 데이터가 타입에 맞는 필드를 갖는다', () => {
  const bad: string[] = [];
  for (const g of ALL) {
    if (g.type === 'combine' && !g.pools?.length) bad.push(`${g.slug}: combine인데 pools 없음`);
    if (g.type === 'pick' && !g.items?.length) bad.push(`${g.slug}: pick인데 items 없음`);
    if (g.type === 'sample' && (g.min ?? 1) > (g.max ?? 45)) bad.push(`${g.slug}: sample인데 min > max`);
    if (g.type === 'combine' && g.pools?.some(p => p.length === 0)) bad.push(`${g.slug}: 빈 pool이 있음`);
  }
  assert.deepEqual(bad, [], `데이터 문제:\n  ${bad.join('\n  ')}`);
});

test('제너레이터 slug가 중복되지 않는다', () => {
  const slugs = ALL.map(g => g.slug);
  const dup = [...new Set(slugs.filter((s, i) => slugs.indexOf(s) !== i))];
  assert.deepEqual(dup, [], `중복 slug: ${dup.join(', ')}`);
});

test('데이터가 비어 있어도 터지지 않는다', () => {
  assert.equal(makeOne({ ...base, type: 'combine' }), '');
  assert.equal(makeOne({ ...base, type: 'pick', items: [] }), '');
  assert.deepEqual(makeBatch({ ...base, type: 'pick', items: [] }), []);
});
