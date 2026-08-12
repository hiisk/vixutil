/**
 * 내신 석차등급 — 공표된 등급별 인원과 대칭성으로 되짚는다.
 *
 * ── 이 검사가 무엇을 상대로 두나 ───────────────────────────
 * 등급 컷(4·11·23·40·60·77·89·96%)을 여기 옮겨 적으면 표가 틀렸을 때 검사도
 * 나란히 틀린다. 그래서 표를 다시 적지 않고 **표에서 따라 나오는 성질**을 상대로
 * 둔다.
 *
 *   ① 100명이면 등급별 인원이 4·7·12·17·20·17·12·7·4명이다. 널리 알려진 값이고
 *      합이 100이다. 5등급제는 10·24·32·24·10명이다.
 *   ② 그 인원이 **가운데를 기준으로 대칭이다.** 컷 표가 대칭으로 설계됐기
 *      때문이며, 한 칸만 잘못 적어도 대칭이 깨진다. 컷을 옮겨 적은 검사는
 *      이것을 잡지 못한다.
 *   ③ 등수를 1부터 끝까지 하나씩 물어 만든 등급 목록이 `gradeBands`가 내는
 *      구간표와 한 칸도 어긋나지 않는다 — 소박한 풀이와 닫힌 셈의 대조다.
 *
 * ── 소인원 과목에는 1등급이 없다 ──────────────────────────
 * 20명 과목의 4%는 0.8명이라 1등을 해도 1등급이 나오지 않는다. 실제로 그렇고,
 * 소인원 과목에서 가장 먼저 묻는 것이 이것이다. 검사가 그 사실을 못 박는다.
 *
 * ── 가중평균을 단순평균으로 바꾸면 잡힌다 ─────────────────
 * 내신 평균 등급은 **이수단위 가중평균**이다. 단순평균으로 내면 단위수가 큰
 * 과목의 무게가 사라진다. 단위수를 일부러 다르게 준 자료로 두 값이 갈리는 것을
 * 확인하고, 손으로 셈한 값을 상대로 둔다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  CUTS, SYSTEMS, averageGrade, gradeBands, gradeOfPercent, lastRankFor,
  normalCdf, rankToGrade, standing, type GradeSystem,
} from '../lib/school-rank.ts';

const ROOT = join(import.meta.dirname, '..');

test('100명이면 등급별 인원이 공표된 값과 같다', () => {
  /* 표를 다시 적지 않고 표에서 따라 나오는 인원을 상대로 둔다 */
  const counts = (total: number, system: GradeSystem) =>
    gradeBands(total, system).map(b => b.count);

  assert.deepStrictEqual(counts(100, 9), [4, 7, 12, 17, 20, 17, 12, 7, 4]);
  assert.deepStrictEqual(counts(100, 5), [10, 24, 32, 24, 10]);
});

test('등급별 인원이 가운데를 기준으로 대칭이다', () => {
  /*
   * 컷 표가 대칭으로 설계됐다 — 4↔4, 7↔7, 12↔12, 17↔17. 컷 한 칸을 잘못 적으면
   * 여기서 깨진다. 컷을 옮겨 적은 검사로는 잡을 수 없는 성질이다.
   */
  for (const system of SYSTEMS) {
    for (const total of [100, 200, 500, 1000]) {
      const c = gradeBands(total, system).map(b => b.count);
      const reversed = [...c].reverse();
      assert.deepStrictEqual(c, reversed, `${system}등급제 ${total}명에서 대칭이 깨졌다`);
      assert.equal(c.reduce((a, b) => a + b, 0), total, `${system}등급제 ${total}명: 합이 안 맞는다`);
    }
  }
});

test('등수를 하나씩 물어 만든 목록이 구간표와 맞는다', () => {
  /*
   * 소박한 풀이 — 1등부터 꼴등까지 `rankToGrade`로 등급을 받아 구간을 다시 만들고
   * `gradeBands`와 맞댄다. 두 함수는 다른 길로 셈하므로 한쪽이 틀리면 갈라진다.
   */
  for (const system of SYSTEMS) {
    for (const total of [7, 20, 33, 100, 271]) {
      const byRank = new Map<number, number[]>();
      for (let r = 1; r <= total; r++) {
        const g = rankToGrade({ rank: r, total, system })!.grade;
        (byRank.get(g) ?? byRank.set(g, []).get(g)!).push(r);
      }
      for (const band of gradeBands(total, system)) {
        const ranks = byRank.get(band.grade) ?? [];
        assert.equal(ranks.length, band.count,
          `${system}등급제 ${total}명 ${band.grade}등급: 인원이 ${ranks.length} vs ${band.count}`);
        if (band.count > 0) {
          assert.equal(ranks[0], band.from, `${total}명 ${band.grade}등급 시작 등수`);
          assert.equal(ranks[ranks.length - 1], band.to, `${total}명 ${band.grade}등급 마지막 등수`);
        }
      }
      /* 모든 학생이 어딘가에 들어가야 한다 — 마지막 컷이 100이 아니면 여기서 걸린다 */
      const placed = [...byRank.values()].reduce((a, v) => a + v.length, 0);
      assert.equal(placed, total, `${system}등급제 ${total}명 가운데 ${total - placed}명이 등급을 못 받았다`);
    }
  }
});

test('소인원 과목에는 1등급이 아예 없다', () => {
  /* 20명의 4%는 0.8명이다. 1등을 해도 1등급이 나오지 않는다 */
  assert.equal(lastRankFor(1, 20), 0, '20명 과목에 1등급이 생겼다');
  assert.equal(rankToGrade({ rank: 1, total: 20 })!.grade, 2, '20명 과목의 1등이 1등급이다');

  /* 1등급이 나오려면 4%가 1명이 되어야 한다 — 25명이다 */
  assert.equal(lastRankFor(1, 24), 0);
  assert.equal(lastRankFor(1, 25), 1);
  assert.equal(rankToGrade({ rank: 1, total: 25 })!.grade, 1);

  /* 그 사실이 구간표에 남아 있다 — 지우지 않는다 */
  const bands = gradeBands(20);
  assert.equal(bands[0].count, 0);
  assert.equal(bands[0].from, null);
  assert.equal(bands.length, CUTS[9].length, '등급 칸이 사라졌다');
});

test('동석차는 묶음의 가운데로 센다', () => {
  /*
   * 중간석차 = 석차 + (동석차 인원 − 1) / 2. 3등이 4명 동점이면 3·4·5·6등을
   * 차지하므로 가운데는 4.5등이다.
   */
  const r = rankToGrade({ rank: 3, total: 100, tied: 4 })!;
  assert.equal(r.midRank, 4.5);
  assert.equal(r.percent, 4.5);
  assert.equal(r.grade, 2, '4.5%는 4% 컷을 넘으니 2등급이다');

  /* 혼자면 석차가 그대로 중간석차다 */
  for (const rank of [1, 50, 100]) {
    assert.equal(rankToGrade({ rank, total: 100 })!.midRank, rank);
  }

  /* 동점이 늘면 등급이 좋아지지 않는다 — 가운데가 뒤로 밀리기 때문이다 */
  let prev = 0;
  for (let tied = 1; tied <= 20; tied++) {
    const g = rankToGrade({ rank: 1, total: 100, tied })!.grade;
    assert.ok(g >= prev, `동점 ${tied}명에서 등급이 좋아졌다`);
    prev = g;
  }

  /* 묶음이 정원을 넘으면 말이 안 된다 */
  assert.equal(rankToGrade({ rank: 99, total: 100, tied: 3 }), null);
  assert.equal(rankToGrade({ rank: 1, total: 0 }), null);
  assert.equal(rankToGrade({ rank: 0, total: 10 }), null);
  assert.equal(rankToGrade({ rank: 1.5, total: 10 }), null);
});

test('컷 등수의 위아래에서 등급이 정확히 갈린다', () => {
  /*
   * 4%가 정확히 나누어떨어지지 않는 인원을 훑는다. 컷에 해당하는 마지막 등수는
   * 그 등급이고, 그 다음 등수는 반드시 아래 등급이어야 한다.
   *
   * 처음에는 이 검사를 "부동소수점이 등급을 밀지 않는다"로 적었는데, 나눗셈으로
   * 되돌려도 검사가 전부 통과했다. 실제로 전수로 확인해 보니 수강자수 3,000명까지
   * 두 방식이 **한 자리도 어긋나지 않는다.** 검사가 못 잡은 것이 아니라 잡을
   * 것이 없었던 것이라, 이름과 주석을 사실에 맞게 고쳤다.
   *
   * 이 검사가 실제로 잡는 것은 경계 그 자체다 — `<=`를 `<`로 바꾸거나 lastRankFor의
   * floor를 round로 바꾸면 각각 검사 셋이 걸린다.
   */
  for (let total = 3; total <= 400; total++) {
    for (const grade of [1, 2, 3, 4]) {
      const last = lastRankFor(grade, total);
      if (last === 0) continue;
      assert.equal(rankToGrade({ rank: last, total })!.grade, grade,
        `${total}명 ${last}등이 ${grade}등급이 아니다`);
      if (last + 1 <= total) {
        assert.ok(rankToGrade({ rank: last + 1, total })!.grade > grade,
          `${total}명 ${last + 1}등이 아직 ${grade}등급이다`);
      }
    }
  }
});

test('평균 등급은 이수단위 가중평균이다 — 손으로 셈한 값과 맞댄다', () => {
  /*
   * 국어 4단위 2등급, 수학 4단위 3등급, 영어 4단위 1등급, 한국사 2단위 5등급.
   * Σ(등급 × 단위) = 8 + 12 + 4 + 10 = 34, 단위 합 14 → 34/14 = 2.4285714…
   * 단순평균은 (2+3+1+5)/4 = 2.75다. 둘이 갈리는 자료를 일부러 골랐다.
   */
  const subjects = [
    { name: '국어', units: 4, grade: 2, group: '국어' },
    { name: '수학', units: 4, grade: 3, group: '수학' },
    { name: '영어', units: 4, grade: 1, group: '영어' },
    { name: '한국사', units: 2, grade: 5, group: '사회' },
  ];
  const a = averageGrade(subjects)!;
  assert.equal(a.weightedSum, 34);
  assert.equal(a.units, 14);
  assert.ok(Math.abs(a.average - 34 / 14) < 1e-12);
  assert.equal(a.plainAverage, 2.75);
  assert.ok(Math.abs(a.gap - (34 / 14 - 2.75)) < 1e-12);
  assert.notEqual(a.average, a.plainAverage, '가중평균과 단순평균이 같다 — 자료를 잘못 골랐다');

  /* 단위수가 모두 같으면 두 값이 같아야 한다 — 가중이 엉뚱하게 걸리는지 본다 */
  const same = averageGrade(subjects.map(s => ({ ...s, units: 3 })))!;
  assert.ok(Math.abs(same.average - same.plainAverage) < 1e-12);
  assert.equal(same.gap, 0);
});

test('반영에서 뺀 과목은 평균에 들어가지 않는다', () => {
  const a = averageGrade([
    { units: 4, grade: 1 },
    { units: 4, grade: 9, include: false },
  ])!;
  assert.equal(a.count, 1);
  assert.equal(a.average, 1);
  assert.equal(a.excludedUnits, 4);

  /* 쓸 수 없는 과목(단위 0, 등급 없음)은 조용히 빠진다 */
  const b = averageGrade([
    { units: 0, grade: 1 },
    { units: 3, grade: 2 },
    { units: 3, grade: Number.NaN },
  ])!;
  assert.equal(b.count, 1);
  assert.equal(b.units, 3);

  assert.equal(averageGrade([]), null);
  assert.equal(averageGrade([{ units: 0, grade: 1 }]), null);
});

test('교과별 평균도 같은 가중평균이다', () => {
  const a = averageGrade([
    { units: 4, grade: 1, group: '수학' },
    { units: 2, grade: 4, group: '수학' },
    { units: 3, grade: 2, group: '영어' },
  ])!;
  const math = a.groups.find(g => g.group === '수학')!;
  assert.equal(math.units, 6);
  assert.ok(Math.abs(math.average - (1 * 4 + 4 * 2) / 6) < 1e-12);
  assert.equal(a.groups.find(g => g.group === '영어')!.average, 2);
  /* 교과별 가중합을 다시 더하면 전체와 같아야 한다 */
  const back = a.groups.reduce((s, g) => s + g.average * g.units, 0);
  assert.ok(Math.abs(back - a.weightedSum) < 1e-9);
});

test('표준정규 누적분포가 알려진 값과 맞는다', () => {
  /* 바깥에서 널리 공표된 값들이다 */
  assert.ok(Math.abs(normalCdf(0) - 0.5) < 1e-6);
  assert.ok(Math.abs(normalCdf(1) - 0.8413447) < 1e-5);
  assert.ok(Math.abs(normalCdf(1.96) - 0.9750021) < 1e-5);
  assert.ok(Math.abs(normalCdf(-1.645) - 0.05) < 1e-4);
  /* 대칭이다 */
  for (const z of [0.3, 1, 2.5]) {
    assert.ok(Math.abs(normalCdf(z) + normalCdf(-z) - 1) < 1e-6, `${z}에서 대칭이 깨졌다`);
  }
});

test('표준점수에서 어림한 등급이 백분위와 앞뒤가 맞는다', () => {
  /* 평균을 받으면 상위 50%다 */
  const mid = standing({ raw: 70, mean: 70, sd: 10 })!;
  assert.equal(mid.z, 0);
  assert.ok(Math.abs(mid.topPercent - 50) < 1e-4);
  assert.equal(mid.estimatedGrade, gradeOfPercent(50));

  /* 점수가 오르면 등급이 나빠지지 않는다 */
  let prev = 10;
  for (let raw = 30; raw <= 100; raw += 1) {
    const s = standing({ raw, mean: 65, sd: 12 })!;
    assert.ok(s.estimatedGrade <= prev, `${raw}점에서 등급이 나빠졌다`);
    prev = s.estimatedGrade;
  }
  assert.equal(standing({ raw: 80, mean: 70, sd: 0 }), null, '표준편차 0에서 값이 나왔다');
});

test('페이지에 컷 표가 되살아나지 않았다', () => {
  /*
   * 페이지는 클라이언트 컴포넌트라 node가 불러올 수 없다. 누군가 컷을 다시 적어
   * 넣어도 아무도 모르므로 원문을 읽어 본다.
   */
  const page = readFileSync(
    join(ROOT, 'app', '(ko)', 'calculator', 'school-rank', 'page.tsx'), 'utf8');
  assert.match(page, /from '@\/lib\/school-rank'/, '페이지가 lib을 안 쓴다');
  const code = page.split('\n').filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l)).join('\n');
  assert.ok(!/\b11\s*,\s*23\s*,\s*40\b/.test(code), '페이지에 컷 표가 되살아났다');
});
