/**
 * 큰 수 — 세 체계가 끊는 자리를 되짚는다.
 *
 * 값은 배수 × 10의 거듭제곱이므로 정확하다. 그래서 검사도 어림이 아니라
 * 자릿수와 문자열 규칙으로 선다 — 콤마를 지우면 원래 수로 돌아오는지,
 * 인도식의 그룹이 정말 3·2·2·…인지, 단위를 옮긴 값에 10의 거듭제곱을
 * 되곱하면 제자리로 오는지.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, EAST_GROUP, FACTORS, INDIAN_GROUP, INDIAN_HEAD, UNITS, WESTERN_GROUP,
  cellOf, slugOf, unitOf,
} from '../lib/bignum/list.ts';
import { amountIn, bigNumFacts, groupEvenly, groupIndian, pow10, valueOf } from '../lib/bignum/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return bigNumFacts(c);
};

test('칸은 단위 10가지 × 배수 10가지', () => {
  assert.equal(UNITS.length, 10);
  assert.equal(FACTORS.length, 10);
  assert.equal(CELLS.length, 100);
  assert.equal(new Set(CELLS.map(slugOf)).size, 100);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  // 세 체계가 모두 들어 있다
  for (const system of ['western', 'indian', 'east']) {
    assert.ok(UNITS.some(u => u.system === system), system);
  }
  for (let i = 1; i < FACTORS.length; i++) assert.ok(FACTORS[i] > FACTORS[i - 1]);
  assert.equal(cellOf('4-crore'), undefined);
  assert.equal(cellOf('1-zillion'), undefined);
});

test('값은 배수에 10의 거듭제곱을 곱한 것', () => {
  for (const c of CELLS) {
    const u = unitOf(c.unit);
    assert.ok(u, c.unit);
    const f = bigNumFacts(c);
    assert.equal(f.value, valueOf(c.factor, u.exp), f.slug);
    // 자릿수는 배수의 자릿수에 지수를 더한 값이다
    assert.equal(f.digits, String(c.factor).length + u.exp, f.slug);
    // 10의 거듭제곱으로 나누면 배수가 그대로 남는다
    assert.equal(f.value / pow10(u.exp), BigInt(c.factor), f.slug);
  }
  // 배정도 실수로는 못 세는 자리까지 정확하다
  assert.equal(facts('1000-gyeong').value.toString(), '1' + '0'.repeat(19));
  assert.equal(facts('1-crore').value, BigInt(10_000_000));
});

test('콤마를 지우면 원래 수로 돌아온다', () => {
  for (const c of CELLS) {
    const f = bigNumFacts(c);
    const raw = f.value.toString();
    for (const [name, marked] of [['서양', f.western], ['인도', f.indian], ['동아시아', f.east]] as const) {
      assert.equal(marked.replace(/,/g, ''), raw, `${f.slug} ${name}`);
    }
  }
  assert.equal(groupEvenly('1000000', WESTERN_GROUP), '1,000,000');
  assert.equal(groupEvenly('1000000', EAST_GROUP), '100,0000');
  assert.equal(groupIndian('10000000'), '1,00,00,000');
});

test('인도식은 셋을 떼고 그다음부터 둘씩 끊는다', () => {
  for (const c of CELLS) {
    const f = bigNumFacts(c);
    const parts = f.indian.split(',');
    // 맨 뒤는 늘 세 자리다(세 자리 이하인 수는 애초에 없다)
    assert.equal(parts[parts.length - 1].length, INDIAN_HEAD, f.slug);
    // 그 앞은 맨 앞을 빼고 모두 두 자리다
    for (let i = 1; i < parts.length - 1; i++) {
      assert.equal(parts[i].length, INDIAN_GROUP, `${f.slug} ${i}`);
    }
    assert.ok(parts[0].length <= INDIAN_GROUP, f.slug);
  }
  // 셋씩 끊는 쪽과 콤마 개수가 다르다 — 1 crore는 둘과 셋이다
  assert.equal(facts('1-crore').western.split(',').length - 1, 2);
  assert.equal(facts('1-crore').indian.split(',').length - 1, 3);
  assert.equal(facts('1-crore').east.split(',').length - 1, 1);
});

test('단위를 옮겨도 값은 그대로다', () => {
  for (const c of CELLS) {
    const u = unitOf(c.unit)!;
    const f = bigNumFacts(c);
    for (const a of f.amounts) {
      // 옮긴 값에 그 단위의 거듭제곱을 되곱하면 원래 값이 나온다
      const [whole, frac = ''] = a.amount.split('.');
      const scaled = BigInt(whole + frac) * pow10(Math.max(0, a.exp - frac.length));
      const back = a.exp - frac.length >= 0 ? scaled : scaled / pow10(frac.length - a.exp);
      assert.equal(back, f.value, `${f.slug} → ${a.key}`);
    }
  }
  // 널리 쓰이는 자리들 — 나눗셈 없이 소수점만 옮긴 값이다
  const crore = facts('1-crore');
  assert.equal(crore.amounts.find(a => a.key === 'eok')?.amount, '0.1');
  assert.equal(crore.amounts.find(a => a.key === 'million')?.amount, '10');
  assert.equal(facts('1-billion').amounts.find(a => a.key === 'eok')?.amount, '10');
  assert.equal(facts('1-lakh').amounts.find(a => a.key === 'man')?.amount, '10');
  assert.equal(amountIn(1, 7, 8), '0.1');
  assert.equal(amountIn(1, 12, 4), '100000000');
  /*
   * 왕복만 보면 꼬리의 0이 남아도 통과한다 — 되돌릴 때 자릿수를 맞추느라
   * 약분돼 버리기 때문이다. 그래서 적는 꼴을 따로 못 박는다.
   */
  assert.equal(amountIn(10, 7, 8), '1');
  assert.equal(amountIn(100, 5, 7), '1');
  for (const c of CELLS) {
    for (const a of bigNumFacts(c).amounts) {
      assert.ok(!a.amount.endsWith('.'), `${slugOf(c)} ${a.key} ${a.amount}`);
      assert.ok(!/\.\d*0$/.test(a.amount), `${slugOf(c)} ${a.key} ${a.amount}`);
    }
  }
});

test('같은 값을 다른 이름으로 부르는 자리를 짚는다', () => {
  // arab과 billion은 둘 다 10의 9제곱이다
  const arab = facts('1-arab');
  assert.deepEqual(arab.twins.map(t => t.key), ['billion']);
  assert.equal(facts('1-billion').twins[0].key, 'arab');
  assert.equal(arab.value, facts('1-billion').value);
  // trillion과 조도 같다
  assert.equal(facts('1-jo').value, facts('1-trillion').value);
  for (const c of CELLS) {
    const f = bigNumFacts(c);
    for (const t of f.twins) {
      assert.equal(t.exp, f.exp, f.slug);
      assert.notEqual(t.key, c.unit, f.slug);
    }
  }
});

test('배수가 커지면 값도 커진다', () => {
  for (const u of UNITS) {
    let last = BigInt(-1);
    for (const factor of FACTORS) {
      const f = bigNumFacts({ unit: u.key, factor });
      assert.ok(f.value > last, `${factor}-${u.key}`);
      last = f.value;
    }
  }
  const f = facts('10-crore');
  assert.equal(f.smaller?.factor, 5);
  assert.equal(f.larger?.factor, 20);
  assert.equal(facts('1-man').smaller, null);
  assert.equal(facts('1000-gyeong').larger, null);
});
