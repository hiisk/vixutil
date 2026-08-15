/**
 * 월 소정근로시간 — 209시간이 어디서 나오는지 되짚는다.
 *
 * 주 단위 시간을 한 해로 펴서 열두 달로 나눈 값이므로, 거꾸로 12를 곱하고
 * 한 해 주수로 나누면 주 단위로 돌아와야 한다. 가산율은 통상시급의 배수라
 * 나눠 보면 정확히 1.5와 2가 나온다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import {
  LEGAL_WEEKLY, NIGHT_RATE, OVERTIME_RATE, WEEKS_PER_MONTH,
  commonWage, monthlyHours, monthlyHoursRounded, weeklyHolidayHours,
} from '../lib/statutory-hours.ts';

test('주 40시간이면 209시간이 나온다', () => {
  // (40 + 8) × 365 ÷ 7 ÷ 12 = 208.57…
  assert.ok(Math.abs(monthlyHours(40) - 208.5714) < 0.001);
  assert.equal(monthlyHoursRounded(40), 209);
  // 널리 쓰이는 다른 값들도 맞는다
  assert.equal(monthlyHoursRounded(20), 105);   // 주 20시간
  assert.equal(monthlyHoursRounded(15), 79);    // 주휴가 붙는 가장 짧은 주
});

test('한 달 평균 주수를 거꾸로 풀면 한 해가 나온다', () => {
  assert.ok(Math.abs(WEEKS_PER_MONTH * 12 * 7 - 365) < 1e-9);
  for (const w of [10, 15, 20, 30, 40]) {
    const back = (monthlyHours(w) * 12) / (365 / 7);
    assert.ok(Math.abs(back - (w + weeklyHolidayHours(w))) < 1e-9, `${w}시간`);
  }
});

test('주휴는 15시간부터 붙고 40시간에서 8시간이 된다', () => {
  assert.equal(weeklyHolidayHours(14.9), 0, '15시간 미만은 주휴가 없다');
  assert.equal(weeklyHolidayHours(15), (15 / 40) * 8);
  assert.equal(weeklyHolidayHours(40), 8);
  // 40시간을 넘겨도 주휴는 8시간에서 멈춘다 — 연장은 주휴를 늘리지 않는다
  assert.equal(weeklyHolidayHours(52), 8);
  assert.equal(weeklyHolidayHours(60), 8);
  // 15시간 경계에서 시간이 한 번에 뛴다 — 그 자리를 못으로 박는다
  assert.ok(monthlyHours(15) - monthlyHours(14.9) > 10);
});

test('통상시급은 월급을 소정근로시간으로 나눈 값이다', () => {
  const w = commonWage(2_090_000, LEGAL_WEEKLY);
  assert.equal(w.hoursRounded, 209);
  assert.ok(Math.abs(w.hourly - 10_000) < 1e-9, '209시간에 209만원이면 시급 1만원이다');
  // 거꾸로 곱하면 월급이 나온다
  assert.ok(Math.abs(w.hourly * w.hoursRounded - 2_090_000) < 1e-6);
});

test('가산율은 통상시급의 배수다', () => {
  const w = commonWage(2_090_000, LEGAL_WEEKLY);
  assert.ok(Math.abs(w.overtime / w.hourly - 1.5) < 1e-12);
  assert.ok(Math.abs(w.night / w.hourly - 1.5) < 1e-12);
  // 연장이면서 야간이면 두 가산이 함께 붙어 두 배다
  assert.ok(Math.abs(w.overtimeNight / w.hourly - 2) < 1e-12);
  assert.ok(Math.abs(w.overtimeNight - w.hourly * (1 + OVERTIME_RATE + NIGHT_RATE)) < 1e-9);
});

test('일하는 시간이 늘면 시급은 준다', () => {
  let prev = Infinity;
  for (const weekly of [15, 20, 30, 40]) {
    const h = commonWage(2_000_000, weekly).hourly;
    assert.ok(h < prev, `주 ${weekly}시간에서 안 줄었다`);
    prev = h;
  }
  // 0시간이면 0으로 나누지 않는다
  assert.equal(commonWage(2_000_000, 0).hourly, 0);
});

/**
 * 화면의 "주 44시간 (월 226h)" 라벨이 실제 계산과 맞는가.
 *
 * 주휴시간 식이 계산기 페이지 네 곳에 손으로 적혀 있었고, 그중 둘은 상한 없는
 * 5분의 1(주 44시간 → 주휴 8.8시간)을 써서 월 229시간을 냈다. 그런데 바로 위
 * 선택지 라벨에는 "월 226h"라고 적혀 있었다 — 같은 화면 안에서 라벨과 결과가
 * 어긋나 있었는데, 라벨은 글이고 결과는 계산이라 아무 검사도 둘을 맞춰 보지
 * 않았다.
 *
 * 페이지는 Math.round로 보여주므로 여기서도 같은 자리에서 반올림해 맞춘다.
 */
test('선택지 라벨의 월 소정근로시간이 실제 계산과 맞는다', () => {
  const files = [
    'app/(ko)/calculator/to-hourly/page.tsx',
    'app/(ko)/calculator/standard-wage/page.tsx',
  ];
  const bad: string[] = [];
  let checked = 0;
  for (const f of files) {
    const src = readFileSync(join(import.meta.dirname, '..', f), 'utf8');
    for (const m of src.matchAll(/<option value="(\d+)">[^<]*?월\s*(\d+)h/g)) {
      checked++;
      const want = Math.round(monthlyHours(Number(m[1])));
      if (want !== Number(m[2])) bad.push(`${f}: 주 ${m[1]}시간 라벨은 ${m[2]}h인데 실제는 ${want}h`);
    }
  }
  assert.deepEqual(bad, [], bad.join('\n  '));
  assert.ok(checked >= 6, `라벨을 ${checked}개만 봤다 — 정규식이 안 맞는다`);
});

/**
 * 주휴시간·월 환산을 페이지가 제 손으로 다시 적지 않는가.
 *
 * 값이 같을 때는 아무 일도 없다. 법이 바뀌거나 한쪽만 고쳐질 때 조용히 갈라지고,
 * 클라이언트 컴포넌트라 node가 못 불러오므로 계산 검사가 닿지 않는 자리다.
 */
test('계산기 페이지가 주휴시간 식을 다시 적지 않는다', () => {
  const dir = join(import.meta.dirname, '..', 'app/(ko)/calculator');
  const walk = (d: string, out: string[] = []): string[] => {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) walk(p, out);
      else if (n.endsWith('.tsx')) out.push(p);
    }
    return out;
  };
  const files = walk(dir);
  assert.ok(files.length > 100, `${files.length}개만 훑었다 — 검사가 헛돈다`);

  const bad: string[] = [];
  for (const f of files) {
    const code = readFileSync(f, 'utf8').split('\n')
      .filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l)).join('\n');
    // import만 있고 안 쓰는 경우가 있으므로 "가져다 쓴다"를 면죄부로 삼지 않는다.
    // 주휴시간을 손으로 낸 꼴 — 주당 시간의 5분의 1, 또는 40으로 나눠 8을 곱한 것
    if (/\/\s*5\b[\s\S]{0,40}365\s*\/|weeklyHours\s*\/\s*5|w\s*\/\s*5\b/.test(code)
      || /\/\s*40\s*\)?\s*\*\s*8/.test(code))
      bad.push(`/${f.slice(f.indexOf('app/'))}`);
  }
  assert.deepEqual(bad, [], `주휴시간을 직접 계산한다 — lib/statutory-hours.ts를 쓰라:\n  ${bad.join('\n  ')}`);
});
