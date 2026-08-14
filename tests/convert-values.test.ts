import { test } from 'node:test';
import assert from 'node:assert/strict';

import { CONVERT_TOOLS, CONVERT_MAP } from '../lib/convert-tools.ts';
import {
  BASE_VALUES, VALUES_PER_PAIR, valuesFor, valueSlug, parseValueSlug,
  convertValue, invertValue, neighborValues,
} from '../lib/convert/values.ts';
import { leafFacts, tableRows, tableStep, round, roundingIsSafe } from '../lib/convert/leaf-facts.ts';

/**
 * 단위 변환 값 낱장 33,120장의 셈.
 *
 * 장수가 크다는 것은 **틀리면 크게 틀린다**는 뜻이다. 한 쌍의 식이 어긋나면
 * 스물넉 장이 한꺼번에 틀린 숫자를 내건다. 그래서 값 자체보다 **성질**로 선다 —
 * 왕복하면 제자리, 눈금은 오름차순, 표에 자기 값이 있다.
 */

test('어느 쌍이든 값이 정확히 스물넷이다', () => {
  /* 33,120 = 138쌍 × 24값 × 열 언어. 이 수가 사이트맵·검사의 기준이다 */
  assert.equal(VALUES_PER_PAIR, 24);
  for (const t of CONVERT_TOOLS) {
    const v = valuesFor(t.slug);
    assert.equal(v.length, 24, `${t.slug}의 값이 ${v.length}개다`);
    assert.equal(new Set(v).size, 24, `${t.slug}에 같은 값이 두 번 있다`);
    assert.ok(v.every(x => x > 0), `${t.slug}에 0 이하가 있다`);
    /* 오름차순이어야 이웃 감기와 표가 뜻을 갖는다 */
    for (let i = 1; i < v.length; i++) assert.ok(v[i] > v[i - 1], `${t.slug}의 값이 오름차순이 아니다`);
  }
  assert.equal(CONVERT_TOOLS.length, 138, '변환쌍이 138개가 아니다 — 장수 셈이 바뀐다');
});

test('주소 조각과 값이 서로의 역이다', () => {
  for (const t of CONVERT_TOOLS) {
    for (const v of valuesFor(t.slug)) {
      const s = valueSlug(v);
      assert.match(s, /^\d+(-\d+)?$/, `${t.slug}/${v} → "${s}"가 주소로 못 쓸 꼴이다`);
      assert.equal(parseValueSlug(s), v, `${s}를 되돌리면 ${parseValueSlug(s)}가 된다`);
    }
  }
});

test('주소 조각이 아닌 것은 거른다 — 아무 값이나 낱장이 되면 안 된다', () => {
  for (const bad of ['', 'abc', '1.5', '-5', '1e3', '007x', '1--2', '.5']) {
    assert.equal(parseValueSlug(bad), null, `"${bad}"가 값으로 통과했다`);
  }
});

test('왕복하면 제자리로 온다', () => {
  /*
   * 이 성질 하나가 factor·offset·reciprocal 세 갈래를 한꺼번에 지킨다.
   * 반비례(페이스↔시속)는 자기 자신이 역변환이라 특히 잘 깨지는 자리다.
   */
  for (const t of CONVERT_TOOLS) {
    for (const v of valuesFor(t.slug)) {
      const back = invertValue(t, convertValue(t, v));
      assert.ok(Math.abs(back - v) < Math.max(1e-6, v * 1e-9), `${t.slug}: ${v} → ${back}`);
    }
  }
});

test('온도는 오프셋이 살아 있다 — 곱셈만 하면 여기서 걸린다', () => {
  /* 0℃ = 32℉, 100℃ = 212℉. 손으로 아는 값으로 못 박는다 */
  const cf = CONVERT_MAP['celsius-fahrenheit'];
  assert.equal(round(convertValue(cf, 100), 2), 212);
  assert.equal(round(convertValue(cf, 37), 1), 98.6);
  assert.equal(round(invertValue(cf, 212), 2), 100);
});

test('반비례 쌍은 나눗셈이다', () => {
  /* 분/km 5분 → 시속 12km. 곱셈으로 두면 60이 나온다 */
  const p = CONVERT_MAP['pace-kmh'];
  assert.ok(p.reciprocal, 'pace-kmh가 반비례가 아니다');
  assert.equal(round(convertValue(p, 5), 3), 12);
  assert.equal(round(convertValue(p, 6), 3), 10);
});

test('대표적인 변환값을 손으로 못 박는다', () => {
  /*
   * 함수를 돌려 답을 베끼면 검사가 함수를 따라간다. 밖에서 아는 값을 적는다.
   *   70kg = 154.324 lb · 180cm = 70.866 inch · 100km = 62.137 mile
   */
  assert.equal(round(convertValue(CONVERT_MAP['kg-lb'], 70), 3), 154.324);
  assert.equal(round(convertValue(CONVERT_MAP['cm-inch'], 180), 3), 70.866);
  assert.equal(round(convertValue(CONVERT_MAP['km-mile'], 100), 3), 62.137);
});

test('주변값 표는 스무 줄이고 자기 값을 담는다', () => {
  /*
   * 자기 값이 표에 없으면 읽는 사람이 자기 줄을 못 찾는다. 0 아래를 버리다가
   * 빠뜨리기 쉬운 자리라(1 근처) 값마다 확인한다.
   */
  for (const t of CONVERT_TOOLS) {
    for (const v of valuesFor(t.slug)) {
      const rows = tableRows(v);
      assert.equal(rows.length, 20, `${t.slug}/${v}: ${rows.length}줄`);
      assert.ok(rows.includes(v), `${t.slug}/${v}: 표에 자기 값이 없다 (${rows.slice(0, 4).join(',')}…)`);
      assert.ok(rows.every(x => x > 0), `${t.slug}/${v}: 표에 0 이하가 있다`);
      for (let i = 1; i < rows.length; i++) assert.ok(rows[i] > rows[i - 1], `${t.slug}/${v}: 표가 오름차순이 아니다`);
    }
  }
});

test('눈금 폭이 v/10 이하의 가장 큰 어림수다', () => {
  /*
   * 규칙 자체를 검사한다 — 값 몇 개를 외워 두면 규칙을 바꿀 때 검사가 따라오지 않는다.
   * 어림수는 1·2·5 × 10ⁿ이다(사람이 표를 훑을 때 걸리는 수가 그 셋이다).
   */
  const nice = (x: number) => {
    const m = 10 ** Math.floor(Math.log10(x));
    return [5, 2, 1].map(k => k * m).find(c => c <= x + Number.EPSILON) ?? m;
  };
  for (const v of [1, 2, 5.5, 37, 70, 250, 1000]) {
    const step = tableStep(v);
    assert.equal(step, nice(v / 10), `${v}의 눈금`);
    assert.ok(step <= v / 10 + Number.EPSILON, `${v}: 눈금이 v/10보다 크다 — 표가 값을 벗어난다`);
    assert.ok(step * 20 >= v, `${v}: 눈금이 너무 잘아 스무 줄이 값 근처에 다 붙는다`);
  }
  /* 자릿수를 따라 커진다 */
  assert.ok(tableStep(1000) > tableStep(70) && tableStep(70) > tableStep(1));
});

test('이웃 값은 자기를 빼고 원형으로 감는다 — 아무도 안 가리키는 값이 없다', () => {
  /*
   * 앞에서 N개를 자르면 뒤쪽 값이 들어오는 링크 0이 된다. 이 저장소가 여러 번
   * 겪은 병이라 여기서도 **결과로** 센다.
   */
  for (const t of CONVERT_TOOLS) {
    const vals = valuesFor(t.slug);
    const inbound = new Map(vals.map(v => [v, 0]));
    for (const v of vals) {
      const ns = neighborValues(t.slug, v);
      assert.ok(!ns.includes(v), `${t.slug}/${v}가 자기 자신을 이웃으로 든다`);
      for (const n of ns) inbound.set(n, (inbound.get(n) ?? 0) + 1);
    }
    const orphans = [...inbound].filter(([, n]) => n === 0).map(([v]) => v);
    assert.deepEqual(orphans, [], `${t.slug}에 아무도 안 가리키는 값 ${orphans.length}개`);
  }
});

test('값이 다르면 본문이 다르다 — 같은 문장에 숫자만 바뀌면 색인이 안 된다', () => {
  /*
   * P0-6의 핵심 검사다. 낱장 네 덩이(결과·역방향·주변값 표·어림)를 이어 붙인
   * 것이 값마다 달라야 한다. 표를 상수로 바꾸거나 어림 문장을 고정하면 여기서 깨진다.
   */
  for (const slug of ['kg-lb', 'cm-inch', 'celsius-fahrenheit', 'pace-kmh']) {
    const t = CONVERT_MAP[slug];
    const seen = new Map<string, number>();
    for (const v of valuesFor(slug)) {
      const f = leafFacts(t, v);
      const body = [
        f.result, f.inverse, f.rounded, f.roundedError, f.roundTrip,
        roundingIsSafe(f) ? 'safe' : 'rough',
        f.table.map(r => r.join(':')).join(','),
        f.otherPairs.map(o => `${o.slug}=${o.result}`).join(','),
        f.neighbors.join(','),
      ].join('|');
      const prev = seen.get(body);
      assert.equal(prev, undefined, `${slug}: ${v}와 ${prev}의 본문이 같다`);
      seen.set(body, v);
    }
  }
});

test('어림 판정이 값에 따라 갈린다 — 고정 문장이면 이 검사가 깨진다', () => {
  /*
   * 70kg = 154.324lb는 154로 말해도 0.2%다. 1kg = 2.205lb를 2라고 하면 9%다.
   * 같은 쌍 안에서도 값에 따라 답이 달라야 "그 값에 대한 문장"이 된다.
   */
  const kg = CONVERT_MAP['kg-lb'];
  assert.ok(roundingIsSafe(leafFacts(kg, 70)), '70kg는 어림해도 되는데 아니라고 한다');
  assert.ok(!roundingIsSafe(leafFacts(kg, 1)), '1kg를 어림해도 된다고 한다');
  /* 한 쌍 안에서 두 판정이 다 나와야 한다 */
  const judged = new Set(valuesFor('kg-lb').map(v => roundingIsSafe(leafFacts(kg, v))));
  assert.equal(judged.size, 2, '어림 판정이 한쪽으로만 나온다 — 문장이 값을 안 본다');
});

test('같은 값 다른 단위는 왼쪽 단위가 같은 쌍만 든다', () => {
  /* 70cm 옆에 70m를 놓으면 다른 이야기가 된다 — 왼쪽 단위가 같아야 같은 70이다 */
  for (const slug of ['kg-lb', 'cm-inch', 'l-gallon']) {
    const t = CONVERT_MAP[slug];
    if (!t) continue;
    for (const o of leafFacts(t, 10).otherPairs) {
      assert.equal(CONVERT_MAP[o.slug].from, t.from, `${slug}의 이웃 ${o.slug}가 다른 단위에서 시작한다`);
      assert.notEqual(o.slug, slug, `${slug}가 자기 자신을 든다`);
    }
  }
});

test('BASE_VALUES가 128쌍을 덮는다 — 눈금을 따로 둔 것은 아홉뿐이다', () => {
  const custom = CONVERT_TOOLS.filter(t => valuesFor(t.slug) !== BASE_VALUES);
  assert.equal(custom.length, 9, `눈금을 따로 둔 쌍이 ${custom.length}개다 — 온도 넷·페이스 둘·BPM·연비 둘이어야 한다`);
  for (const t of custom) {
    assert.ok(
      t.offset !== undefined || t.reciprocal,
      `${t.slug}은 오프셋도 반비례도 아닌데 눈금을 따로 뒀다 — 까닭을 주석에 적어라`,
    );
  }
});
