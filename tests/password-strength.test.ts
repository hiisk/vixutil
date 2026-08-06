/**
 * 비밀번호 세기 — 계산을 다른 길로 되짚는다.
 *
 * 이 표의 전제는 둘이다. 한 글자가 담는 것이 log2(집합 크기)라는 것과, 뚫는
 * 시간이 경우의 수를 속도로 나눈 값이라는 것. 곱셈을 그대로 다시 하지 않고,
 * 비트가 하나 늘 때 시간이 두 배가 되는지·자릿수와 비트가 서로 맞는지 같은
 * 성질 쪽에서 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, CHARSETS, LENGTHS, RATES, SECONDS_PER_YEAR, UNIVERSE_YEARS,
  cellOf, charsetOf, slugOf,
} from '../lib/password/list.ts';
import { bitsOf, bitsPerChar, lengthFor, passwordFacts, secondsOf, timeParts } from '../lib/password/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return passwordFacts(c);
};

test('칸은 집합 10가지 × 길이 10가지', () => {
  assert.equal(CHARSETS.length, 10);
  assert.equal(LENGTHS.length, 10);
  assert.equal(CELLS.length, 100);
  assert.equal(new Set(CELLS.map(slugOf)).size, 100);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  // 두 목록 다 오름차순이다
  for (let i = 1; i < LENGTHS.length; i++) assert.ok(LENGTHS[i] > LENGTHS[i - 1]);
  for (let i = 1; i < CHARSETS.length; i++) assert.ok(CHARSETS[i].size > CHARSETS[i - 1].size, CHARSETS[i].key);
  assert.equal(cellOf('ascii-7'), undefined);
  assert.equal(cellOf('utf8-8'), undefined);
});

test('한 글자가 담는 것은 집합 크기의 로그', () => {
  // 널리 알려진 자리들 — 로그를 쓰지 않고 확인한다
  assert.equal(bitsPerChar(2), 1);
  assert.equal(bitsPerChar(16), 4);
  assert.equal(bitsPerChar(64), 6);
  // 집합이 네 배면 한 글자가 2비트를 더 담는다
  for (const size of [10, 26, 32]) {
    assert.ok(Math.abs(bitsPerChar(size * 4) - bitsPerChar(size) - 2) < 1e-12, `${size}`);
  }
  // 전체 비트는 길이에 정비례한다
  for (const set of CHARSETS) {
    assert.ok(Math.abs(bitsOf(set.size, 20) - bitsOf(set.size, 10) * 2) < 1e-12, set.key);
  }
  assert.equal(facts('base64-10').bits, 60);
  assert.equal(facts('hex-8').bits, 32);
});

test('자릿수와 비트가 서로 맞는다', () => {
  for (const c of CELLS) {
    const f = passwordFacts(c);
    // 10^자릿수와 2^비트가 같은 수를 가리킨다
    assert.ok(Math.abs(f.digits * Math.log2(10) - f.bits) < 0.2, `${f.slug} ${f.digits} ${f.bits}`);
  }
  // 아스키 12자는 10의 23제곱대다
  assert.ok(facts('ascii-12').digits > 23 && facts('ascii-12').digits < 24);
});

test('한글 음절은 한 글자가 아스키 두 글자 몫을 한다', () => {
  const hangul = charsetOf('hangul');
  const ascii = charsetOf('ascii');
  assert.ok(hangul && ascii);
  // 한 글자당 비트가 1.7배를 넘는다
  assert.ok(bitsPerChar(hangul.size) / bitsPerChar(ascii.size) > 1.7);
  // 한글 8자를 아스키로 내려면 13자로는 모자라고 14자면 넘는다
  const need = lengthFor(bitsOf(hangul.size, 8), ascii.size);
  assert.ok(need > 13 && need < 14, `${need}`);
  assert.ok(bitsOf(hangul.size, 8) > bitsOf(ascii.size, 13));
  assert.ok(bitsOf(hangul.size, 8) < bitsOf(ascii.size, 14));
  assert.equal(facts('hangul-8').asciiEquivalent, 13.7);
});

test('비트가 하나 늘면 뚫는 시간이 두 배가 된다', () => {
  for (const r of RATES) {
    for (const bits of [20, 50, 80]) {
      assert.ok(Math.abs(secondsOf(bits + 1, r.perSecond) / secondsOf(bits, r.perSecond) - 2) < 1e-9, r.key);
    }
  }
  // 열 비트면 천 배가 조금 넘는다
  assert.ok(Math.abs(secondsOf(60, 1e9) / secondsOf(50, 1e9) - 1024) < 1e-6);
  /*
   * 여기까지는 전부 비(比)라서, 평균 시도를 경우의 수의 절반으로 잡았는지는
   * 걸러지지 않는다 — 절반이 약분돼 버린다. 그래서 절대값을 한 번 못 박는다:
   * 걸린 시간에 속도를 곱하고 둘을 곱하면 경우의 수 전체가 나와야 한다.
   */
  for (const bits of [20, 40, 60]) {
    for (const r of RATES) {
      assert.ok(Math.abs((secondsOf(bits, r.perSecond) * r.perSecond * 2) / 2 ** bits - 1) < 1e-9, `${bits} ${r.key}`);
    }
  }
  // 초당 한 번씩 두드리면 20비트는 평균 2^19초가 걸린다
  assert.equal(secondsOf(20, 1), 2 ** 19);
  // 년과 초가 같은 값을 가리킨다
  for (const c of CELLS) {
    for (const k of passwordFacts(c).cracks) {
      assert.ok(Math.abs(k.years * SECONDS_PER_YEAR - k.seconds) / k.seconds < 1e-9, slugOf(c));
      assert.ok(Math.abs(k.universes * UNIVERSE_YEARS - k.years) / k.years < 1e-9, slugOf(c));
    }
  }
});

test('저장 방식이 길이보다 크게 답을 바꾼다', () => {
  const f = facts('ascii-12');
  const rate = (key: string) => {
    const k = f.cracks.find(x => x.key === key);
    assert.ok(k, key);
    return k;
  };
  // 시간의 비는 속도의 역비다 — 곱셈을 다시 하지 않고 비로 확인한다
  const ntlm = rate('ntlm');
  const bcrypt = rate('bcrypt');
  assert.ok(Math.abs(bcrypt.seconds / ntlm.seconds - ntlm.perSecond / bcrypt.perSecond) / (ntlm.perSecond / bcrypt.perSecond) < 1e-9);
  // 그 차이가 백만 배를 넘는다
  assert.ok(bcrypt.seconds / ntlm.seconds > 1e6);
  // 같은 저장 방식에서 두 글자를 늘리는 것보다 저장 방식을 바꾸는 쪽이 크다
  const longer = facts('ascii-14').cracks.find(x => x.key === 'ntlm');
  assert.ok(longer && longer.seconds < bcrypt.seconds);
  // 속도 목록은 빠른 것부터다
  for (let i = 1; i < RATES.length; i++) assert.ok(RATES[i].perSecond < RATES[i - 1].perSecond, RATES[i].key);
});

test('길거나 넓을수록 세다', () => {
  for (const set of CHARSETS) {
    let last = -1;
    for (const length of LENGTHS) {
      const f = passwordFacts({ charset: set.key, length });
      assert.ok(f.bits > last, `${set.key}-${length}`);
      last = f.bits;
    }
  }
  for (const length of LENGTHS) {
    let last = -1;
    for (const set of CHARSETS) {
      const f = passwordFacts({ charset: set.key, length });
      assert.ok(f.bits > last, `${set.key}-${length}`);
      last = f.bits;
    }
  }
  // 앞뒤 칸은 길이만 한 단계 움직인다
  const f = facts('ascii-12');
  assert.equal(f.shorter?.length, 10);
  assert.equal(f.longer?.length, 14);
  assert.equal(facts('digit-6').shorter, null);
  assert.equal(facts('hangul-40').longer, null);
});

test('초를 읽을 자리로 옮긴다', () => {
  assert.deepEqual(timeParts(0.5), { unit: 'instant', value: 0 });
  assert.equal(timeParts(30).unit, 'second');
  assert.equal(timeParts(120).unit, 'minute');
  assert.equal(timeParts(120).value, 2);
  assert.equal(timeParts(7200).unit, 'hour');
  assert.equal(timeParts(86400 * 3).unit, 'day');
  assert.equal(timeParts(SECONDS_PER_YEAR * 5).unit, 'year');
  assert.equal(timeParts(SECONDS_PER_YEAR * 5).value, 5);
  // 백만 년을 넘으면 자릿수로 바꾼다
  assert.equal(timeParts(SECONDS_PER_YEAR * 2e6).unit, 'exp');
  assert.equal(timeParts(SECONDS_PER_YEAR * 1e20).value, 20);
  // 경계에서 단위가 겹치지 않는다 — 큰 쪽이 항상 뒤 단위다
  const order = ['instant', 'second', 'minute', 'hour', 'day', 'year', 'exp'];
  let last = -1;
  for (const s of [0.5, 30, 120, 7200, 86400 * 3, SECONDS_PER_YEAR * 5, SECONDS_PER_YEAR * 2e6]) {
    const i = order.indexOf(timeParts(s).unit);
    assert.ok(i > last, `${s}`);
    last = i;
  }
});

test('화면에 적어 둔 보기가 계산과 맞는다', () => {
  /*
   * 설명 글에 숫자를 적어 두면 식이 바뀔 때 글만 옛말이 된다. 그래서 글에
   * 적은 보기를 여기에 못 박는다 — 어긋나면 글을 고치라는 뜻이다.
   */
  const at = (slug: string, rate: string) => {
    const k = facts(slug).cracks.find(c => c.key === rate);
    assert.ok(k, `${slug} ${rate}`);
    return k;
  };
  // "아스키 여덟 글자는 NTLM이면 세 시간이 안 되고, bcrypt면 500년이 넘는다"
  assert.ok(at('ascii-8', 'ntlm').seconds < 3 * 3600);
  assert.ok(at('ascii-8', 'bcrypt').years > 500);
  // "아스키 열두 글자는 NTLM이면 2만 6천 년, bcrypt면 400억 년"
  assert.ok(Math.abs(at('ascii-12', 'ntlm').years - 26000) < 2000);
  assert.ok(Math.abs(at('ascii-12', 'bcrypt').years - 41e9) < 2e9);
  // "한 글자가 숫자만이면 3.3비트, 소문자까지면 4.7, 아스키면 6.6"
  assert.equal(facts('digit-6').perChar, 3.32);
  assert.equal(facts('lower-6').perChar, 4.7);
  assert.equal(facts('ascii-6').perChar, 6.55);
  /*
   * "소문자에서 아스키로 넓혀도 한 글자당 1.9비트" — 화면에 내는 값(소수 둘째
   * 자리까지)이 아니라 원래 값으로 재야 한다. 6.55에서 4.70을 빼면 1.85지만
   * 로그 그대로는 1.854라 소수 한 자리로 1.9가 된다.
   */
  assert.equal(Math.round((bitsPerChar(94) - bitsPerChar(26)) * 10) / 10, 1.9);
  // "한글은 한 글자가 11.2비트"
  assert.equal(facts('hangul-6').perChar, 11.2);
  // "P@ssw0rd!는 아스키 9자로 세면 59비트"
  assert.ok(Math.abs(bitsOf(94, 9) - 59) < 0.5);
});
