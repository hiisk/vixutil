/**
 * 전역일 — 날짜 셈을 다른 길로 되짚는다.
 *
 * 날짜는 눈으로 봐서 맞는지 모른다. 그래서 세 방향으로 본다: 손으로 셈한
 * 값과 맞추고, 하루씩 세어 올린 값과 맞추고, 월말·윤년처럼 넘어가기 쉬운
 * 자리를 따로 짚는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BRANCHES, RANKS,
  addDays, addMonths, daysBetween, dischargeDate, rankDates, serviceProgress,
} from '../lib/discharge.ts';

const d = (s: string) => new Date(`${s}T00:00:00Z`);
const iso = (x: Date) => x.toISOString().split('T')[0];

test('군별 복무기간이 제자리에 있다', () => {
  assert.equal(BRANCHES.length, 4);
  const by = Object.fromEntries(BRANCHES.map(b => [b.key, b.months]));
  assert.equal(by.army, 18);
  assert.equal(by.navy, 20);
  assert.equal(by.airforce, 21);
  assert.equal(by.social, 21);
  // 정기진급 기간의 합이 가장 짧은 복무기간보다 짧아야 병장이 존재한다
  const sum = RANKS.reduce((n, r) => n + r.months, 0);
  assert.ok(sum < Math.min(...BRANCHES.map(b => b.months)), `진급 기간 합 ${sum}개월이 너무 길다`);
});

test('전역일은 입대일 더하기 복무기간에서 하루 앞이다', () => {
  // 손으로 셈한 값 — 2024-01-02 입대 육군은 2025-07-01 전역
  assert.equal(iso(dischargeDate(d('2024-01-02'), 18)), '2025-07-01');
  assert.equal(iso(dischargeDate(d('2024-01-01'), 18)), '2025-06-30');
  // 공군 21개월
  assert.equal(iso(dischargeDate(d('2024-03-11'), 21)), '2025-12-10');

  // 관계로도 확인한다 — 전역일 다음 날이 곧 "입대일 + 복무기간"이다
  for (const start of ['2024-01-31', '2024-02-29', '2023-12-15', '2025-05-01']) {
    for (const m of BRANCHES.map(b => b.months)) {
      const back = addDays(dischargeDate(d(start), m), 1);
      assert.equal(iso(back), iso(addMonths(d(start), m)), `${start} +${m}개월`);
    }
  }
});

test('없는 날짜로 넘어가지 않는다', () => {
  // 1월 31일 + 1개월은 3월 3일이 아니라 2월 29일(윤년)/28일이다
  assert.equal(iso(addMonths(d('2024-01-31'), 1)), '2024-02-29');
  assert.equal(iso(addMonths(d('2023-01-31'), 1)), '2023-02-28');
  assert.equal(iso(addMonths(d('2024-05-31'), 1)), '2024-06-30');
  // 윤년 2월 29일 + 12개월은 2월 28일이다
  assert.equal(iso(addMonths(d('2024-02-29'), 12)), '2025-02-28');
  // 해를 넘겨도 날짜는 그대로다
  assert.equal(iso(addMonths(d('2024-08-10'), 18)), '2026-02-10');
});

test('하루씩 세어 올린 값과 같다', () => {
  for (const start of ['2024-01-02', '2024-02-29', '2023-11-30']) {
    const from = d(start);
    for (const m of [18, 20, 21]) {
      const end = dischargeDate(from, m);
      let n = 0;
      let cur = from;
      while (iso(cur) !== iso(end)) { cur = addDays(cur, 1); n++; }
      assert.equal(daysBetween(from, end), n, `${start} +${m}개월`);
    }
  }
});

test('진행률은 입대일에 1일, 전역일에 100%다', () => {
  const start = d('2024-01-02');
  const end = dischargeDate(start, 18);

  const first = serviceProgress(start, end, start);
  assert.equal(first.done, 1, '입대한 날은 하루째다');
  assert.equal(first.left, daysBetween(start, end));

  const last = serviceProgress(start, end, end);
  assert.equal(last.done, last.total);
  assert.equal(last.percent, 100);
  assert.equal(last.left, 0);

  // 전역 뒤에도 100%를 넘지 않는다
  const after = serviceProgress(start, end, addDays(end, 30));
  assert.equal(after.done, after.total);
  assert.equal(after.percent, 100);
  assert.ok(after.left < 0, '전역 뒤에는 남은 날이 음수로 나와 화면이 가릴 수 있다');

  // 입대 전에는 0일이다
  const before = serviceProgress(start, end, addDays(start, -10));
  assert.equal(before.done, 0);

  // 전체 일수는 입대일과 전역일을 모두 센다
  assert.equal(first.total, daysBetween(start, end) + 1);
});

test('진급일은 정기진급 기간을 쌓아 올린 값이다', () => {
  const start = d('2024-01-02');
  const r = rankDates(start, 18);
  assert.deepEqual(r.map(x => x.rank), ['일병', '상병', '병장']);
  // 이등병 2개월 → 일병, +6 → 상병, +6 → 병장
  assert.equal(iso(r[0].date), '2024-03-02');
  assert.equal(iso(r[1].date), '2024-09-02');
  assert.equal(iso(r[2].date), '2025-03-02');
  // 전역일보다 앞이어야 한다
  const end = dischargeDate(start, 18);
  for (const x of r) assert.ok(daysBetween(x.date, end) > 0, `${x.rank}가 전역 뒤다`);

  /*
   * 복무가 짧으면 그만큼 계급이 줄어든다 — 지어내지 않는다.
   * 8개월이면 상병 진급일(2+6=8개월째)이 전역 **다음 날**이라 그 계급은 없다.
   * 경계가 하루 차이라, 어느 쪽으로 잡았는지 여기 못으로 박아 둔다.
   */
  assert.deepEqual(rankDates(start, 8).map(x => x.rank), ['일병']);
  assert.deepEqual(rankDates(start, 9).map(x => x.rank), ['일병', '상병']);
  assert.deepEqual(rankDates(start, 2).map(x => x.rank), []);

  // 어떤 복무기간에서도 진급일이 전역일을 넘지 않는다
  for (let m = 1; m <= 24; m++) {
    const end = dischargeDate(start, m);
    for (const x of rankDates(start, m)) {
      assert.ok(daysBetween(x.date, end) >= 0, `${m}개월: ${x.rank} 진급일이 전역 뒤다`);
    }
  }

  // 군별로 진급일은 같고 병장 기간만 달라진다
  for (const m of [18, 20, 21]) {
    const rr = rankDates(start, m);
    assert.equal(iso(rr[0].date), '2024-03-02', `${m}개월: 일병 진급일이 다르다`);
    assert.equal(iso(rr[2].date), '2025-03-02', `${m}개월: 병장 진급일이 다르다`);
  }
  // 공군이 병장으로 지내는 기간이 육군보다 길다
  const armyEnd = dischargeDate(start, 18);
  const airEnd = dischargeDate(start, 21);
  const sergeant = rankDates(start, 18)[2].date;
  assert.ok(daysBetween(sergeant, airEnd) > daysBetween(sergeant, armyEnd) + 80);
});
