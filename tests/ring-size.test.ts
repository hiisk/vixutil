/**
 * 반지 사이즈 — 셈을 다른 길로 되짚는다.
 *
 * 이 섹션은 표를 옮겨 적지 않고 산식으로 만든다. 그러면 검사가 왕복으로 전부를
 * 되짚을 수 있다: 내주 → 미국 번호 → 내주가 제자리로 돌아오고, 내주 → 호수 →
 * 내주도 그렇다.
 *
 * ── 왕복만으로는 부족하다 ────────────────────────────────
 * 왕복은 **자기 자신과의 일관성**만 본다. 11.63을 11.0으로 바꿔도 앞으로 갔다
 * 뒤로 오는 길은 그대로 맞아떨어진다. 그래서 상수가 옳은지는 밖에서 확인해 준
 * 대응으로 못 박는다 — 일본 13호 ≈ 미국 6.5, 9호 ≈ 미국 5, EU 52 ≈ 미국 6,
 * 미국 6의 내경 16.5mm처럼 널리 인용되는 값들이다. 이 셋이 상수 셋(11.63·0.8128·
 * 40)을 모두 붙잡는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BANDS, CELLS, RING_MAX, RING_MIN, RING_STEP, RING_SLUGS, bandOf, cellOf, slugOf,
} from '../lib/ring/list.ts';
import {
  JP_OFFSET_MM, MM_PER_INCH, US_BASE_MM, US_STEP_MM,
  atBand, circumferenceOf, diameterOf, isoOf, jpCircumference, jpOf,
  nearestUsHalf, ringFacts, usCircumference, usDiameter, usOf,
} from '../lib/ring/facts.ts';

const facts = (slug: string) => {
  const mm = cellOf(slug);
  assert.ok(mm !== undefined, `${slug} 칸이 없다`);
  return ringFacts(mm);
};

test('칸이 101개이고 슬러그가 겹치지 않는다', () => {
  assert.equal(CELLS.length, 101, '내주 40.0~90.0을 0.5씩이면 101칸이다');
  assert.ok(CELLS.length > 100, '섹션 하나가 100칸을 넘어야 한다');
  assert.equal(new Set(RING_SLUGS).size, CELLS.length, '같은 슬러그가 둘이면 뒤엣것이 화면에서 사라진다');
  assert.equal(CELLS[0], RING_MIN);
  assert.equal(CELLS[CELLS.length - 1], RING_MAX);

  // 주소에 쓸 수 있는 꼴인가 — 소문자·숫자·붙임표만
  const bad = RING_SLUGS.filter(s => !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(s));
  assert.deepEqual(bad, [], '대문자나 점이 들어가면 주소에서 갈린다');
  // 규칙대로 붙었는가 — 52.0은 iso-52, 52.5는 iso-52-5
  assert.equal(slugOf(52), 'iso-52');
  assert.equal(slugOf(52.5), 'iso-52-5');
  assert.equal(slugOf(40), 'iso-40');

  // 되짚기: 슬러그에서 칸으로 돌아온다
  for (const mm of CELLS) assert.equal(cellOf(slugOf(mm)), mm, slugOf(mm));
  assert.equal(cellOf('iso-52-25'), undefined, '눈금에 없는 값이 열리면 안 된다');
  assert.equal(cellOf('iso-39'), undefined, '범위 밖이 열리면 안 된다');
  assert.equal(cellOf('iso-91'), undefined, '범위 밖이 열리면 안 된다');
  assert.equal(cellOf('52'), undefined);

  // 눈금이 실제로 0.5씩이다 — 0.5는 부동소수점에서 정확해 오차가 없어야 한다
  for (let i = 1; i < CELLS.length; i++) {
    assert.equal(CELLS[i] - CELLS[i - 1], RING_STEP, `${CELLS[i]}`);
  }
});

test('내주 → 미국 번호 → 내주가 제자리로 돌아온다', () => {
  for (const mm of CELLS) {
    const back = usCircumference(usOf(mm));
    assert.ok(Math.abs(back - mm) < 1e-9, `${mm}mm → US ${usOf(mm)} → ${back}mm`);
    // 지름 쪽으로도 같은 왕복
    assert.ok(Math.abs(usDiameter(usOf(mm)) - diameterOf(mm)) < 1e-9, `${mm}mm 지름 왕복`);
  }
});

test('내주 → 호수 → 내주가 제자리로 돌아온다', () => {
  for (const mm of CELLS) {
    assert.equal(jpCircumference(jpOf(mm)), mm, `${mm}mm`);
    // EU는 내주 그대로다 — 규칙이 코드에 남아 있는지도 본다
    assert.equal(isoOf(mm), mm, `${mm}mm`);
  }
});

test('지름 × π = 둘레 항등식', () => {
  for (const mm of CELLS) {
    assert.ok(Math.abs(circumferenceOf(diameterOf(mm)) - mm) < 1e-9, `${mm}mm`);
    const f = ringFacts(mm);
    // 화면에 적는 반올림값도 항등식에서 크게 벗어나지 않는다
    assert.ok(Math.abs(f.diameter * Math.PI - mm) < 0.02, `${mm}mm: 지름 ${f.diameter}`);
    assert.ok(Math.abs(f.inch * MM_PER_INCH - f.diameter) < 0.02, `${mm}mm: 인치 ${f.inch}`);
  }
});

test('밖에서 확인해 준 대응을 못 박는다 — 상수가 틀리면 여기가 걸린다', () => {
  /*
   * 널리 인용되는 대응만 담는다. 왕복 검사는 상수를 바꿔도 통과하므로,
   * 상수의 값을 지키는 것은 이 검사뿐이다.
   */
  // 일본 13호는 내주 53mm이고 미국 6.5쯤이다
  assert.equal(jpCircumference(13), 53);
  assert.ok(Math.abs(usOf(53) - 6.5) < 0.15, `일본 13호가 US ${usOf(53)}`);
  assert.equal(facts('iso-53').usHalf, 6.5);

  // 일본 9호는 내주 49mm이고 미국 5쯤이다
  assert.equal(jpCircumference(9), 49);
  assert.ok(Math.abs(usOf(49) - 5) < 0.15, `일본 9호가 US ${usOf(49)}`);
  assert.equal(facts('iso-49').usHalf, 5);

  // 일본 17호는 내주 57mm이고 미국 8쯤이다
  assert.ok(Math.abs(usOf(57) - 8) < 0.15, `일본 17호가 US ${usOf(57)}`);

  // EU(ISO 8653) 52는 내주 52mm이고 미국 6, 일본 12호다
  assert.equal(isoOf(52), 52);
  assert.ok(Math.abs(usOf(52) - 6) < 0.15, `EU 52가 US ${usOf(52)}`);
  assert.equal(jpOf(52), 12);

  // 미국 6의 내경은 16.5mm, 7은 17.3mm, 10은 19.8mm로 표에 실린다
  assert.ok(Math.abs(usDiameter(6) - 16.5) < 0.06, `US 6 지름 ${usDiameter(6)}`);
  assert.ok(Math.abs(usDiameter(7) - 17.3) < 0.06, `US 7 지름 ${usDiameter(7)}`);
  assert.ok(Math.abs(usDiameter(10) - 19.8) < 0.06, `US 10 지름 ${usDiameter(10)}`);
  // 미국 6의 내주는 51.9mm 언저리다 — 화면 문구가 그 값을 쓴다
  assert.ok(Math.abs(usCircumference(6) - 51.9) < 0.1, `US 6 내주 ${usCircumference(6)}`);

  // 상수 자체도 확인한다 — 0.458인치와 0.032인치를 밀리미터로 옮긴 값이다
  assert.ok(Math.abs(US_BASE_MM - 0.458 * MM_PER_INCH) < 0.01, `${US_BASE_MM}`);
  assert.equal(US_STEP_MM, 0.032 * MM_PER_INCH);
  assert.equal(JP_OFFSET_MM, 40);
  // 미국 한 사이즈는 둘레로 2.55mm쯤, 곧 0.1인치 언저리다
  assert.ok(Math.abs(US_STEP_MM * Math.PI - 2.55) < 0.01, `${US_STEP_MM * Math.PI}`);
});

test('내주가 커지면 지름·미국 번호·호수가 함께 커진다', () => {
  for (let i = 1; i < CELLS.length; i++) {
    const a = ringFacts(CELLS[i - 1]);
    const b = ringFacts(CELLS[i]);
    assert.ok(b.diameter > a.diameter, `${a.mm} → ${b.mm} 지름`);
    assert.ok(b.us > a.us, `${a.mm} → ${b.mm} US`);
    assert.ok(b.jp > a.jp, `${a.mm} → ${b.mm} 호수`);
    assert.ok(b.iso > a.iso, `${a.mm} → ${b.mm} EU`);
    assert.ok(b.usHalf >= a.usHalf, `${a.mm} → ${b.mm} 반 사이즈가 뒷걸음질했다`);
    assert.ok(b.jpWhole >= a.jpWhole, `${a.mm} → ${b.mm} 정수 호수가 뒷걸음질했다`);
  }
});

test('부르는 눈금은 계산값에서 반 눈금 안에 있다', () => {
  for (const mm of CELLS) {
    const f = ringFacts(mm);
    // 반 사이즈로 반올림했으니 계산값과 0.25 이상 벌어지면 안 된다
    assert.ok(Math.abs(f.us - f.usHalf) <= 0.25 + 1e-9, `${mm}mm: ${f.us} vs ${f.usHalf}`);
    /*
     * 반 사이즈는 **자르지 않은** 계산값에서 고른다. 화면에 적는 f.us는 소수 둘째
     * 자리로 자른 값이라, 41mm처럼 1.7479가 1.75로 잘리면 반올림이 반대쪽으로
     * 넘어간다(1.5가 아니라 2가 된다). 자른 값으로 다시 고르지 않는 것을 여기서 지킨다.
     */
    assert.equal(f.usHalf, nearestUsHalf(usOf(mm)), `${mm}mm`);
    assert.equal(f.usHalf * 2, Math.round(f.usHalf * 2), `${mm}mm: 반 사이즈 눈금이 아니다`);
    // 그 반 사이즈의 내주와의 차이도 미국 반 사이즈 하나(1.28mm)의 절반 안이다
    assert.ok(Math.abs(f.usGap) <= (US_STEP_MM * Math.PI) / 4 + 0.01, `${mm}mm: ${f.usGap}mm`);
    /*
     * 호수는 내주에서 40을 뺀 값이므로 0.5 눈금 위에서 정수 아니면 딱 반이다.
     * 반인 칸은 정수로 반올림하면 0.5만큼 움직인다 — 반 사이즈처럼 0.25로 두면
     * 41.5·42.5 같은 칸이 모두 걸린다.
     */
    assert.ok(Math.abs(f.jp - f.jpWhole) <= 0.5 + 1e-9, `${mm}mm: ${f.jp} vs ${f.jpWhole}`);
    assert.ok(Math.abs(f.jpWholeMm - mm) <= 0.5 + 1e-9, `${mm}mm: ${f.jpWholeMm}mm`);
    assert.ok(Number.isInteger(f.jpWhole), `${mm}mm: 정수 호수가 ${f.jpWhole}`);
  }
});

test('구간이 칸을 빠짐없이 한 번씩 나눠 갖는다', () => {
  assert.equal(BANDS.length, 4);
  for (const mm of CELLS) {
    const b = bandOf(mm);
    assert.ok(b >= 0, `${mm}mm이 어느 구간에도 안 든다 — 화면에서 묶음이 사라진다`);
  }
  const total = BANDS.reduce((n, _, i) => n + atBand(i).length, 0);
  assert.equal(total, CELLS.length, '구간을 합치면 칸 수와 같아야 한다');
  for (let i = 0; i < BANDS.length; i++) assert.ok(atBand(i).length > 0, `${i}번 구간이 비었다`);
  // 경계가 겹치지 않는다
  for (let i = 1; i < BANDS.length; i++) assert.ok(BANDS[i].from > BANDS[i - 1].to, `${i}번 구간이 겹친다`);

  // 구간의 뜻이 실제 값과 맞는가 — 흔한 구간은 미국 3.5~10, 마지막은 엄지 쪽이다
  assert.ok(ringFacts(BANDS[1].from).us > 3, `흔한 구간이 US ${ringFacts(BANDS[1].from).us}에서 시작한다`);
  assert.ok(ringFacts(BANDS[1].to).us < 10, `흔한 구간이 US ${ringFacts(BANDS[1].to).us}에서 끝난다`);
  assert.ok(ringFacts(BANDS[3].from).us > 16, `마지막 구간이 US ${ringFacts(BANDS[3].from).us}에서 시작한다`);
});

test('이웃이 모든 칸에 들어온다 — 들어오는 링크가 0인 칸이 없다', () => {
  /*
   * "목록의 앞에서 여섯 개"로 고르면 일곱째부터 들어오는 링크가 0이 된다.
   * 자기 다음부터 원형으로 감으면 101칸이 정확히 여섯 번씩 가리켜진다.
   */
  const inbound = new Map(RING_SLUGS.map(s => [s, 0]));
  for (const mm of CELLS) {
    const f = ringFacts(mm);
    assert.equal(f.neighbours.length, 6, `${mm}mm의 이웃이 여섯이 아니다`);
    assert.ok(!f.neighbours.includes(f.slug), `${mm}mm이 자기를 가리킨다`);
    assert.equal(new Set(f.neighbours).size, 6, `${mm}mm의 이웃에 같은 것이 둘 있다`);
    for (const s of f.neighbours) {
      assert.ok(inbound.has(s), `${mm}mm이 없는 칸 ${s}를 가리킨다`);
      inbound.set(s, inbound.get(s)! + 1);
    }
  }
  const orphans = [...inbound].filter(([, n]) => n === 0).map(([s]) => s);
  assert.deepEqual(orphans, [], '아무도 안 가리키는 칸이 있다 — 사이트맵에만 있는 낱장이 된다');
  const counts = new Set([...inbound.values()]);
  assert.deepEqual([...counts], [6], '원형으로 감으면 모든 칸이 똑같이 여섯 번 가리켜진다');
});

test('아래위 한 눈금은 끝에서만 비어 있다', () => {
  const first = ringFacts(CELLS[0]);
  const last = ringFacts(CELLS[CELLS.length - 1]);
  assert.equal(first.prev, null);
  assert.equal(last.next, null);
  for (const mm of CELLS) {
    const f = ringFacts(mm);
    if (f.prev) assert.equal(cellOf(f.prev), mm - RING_STEP, `${mm}mm의 아래 칸`);
    if (f.next) assert.equal(cellOf(f.next), mm + RING_STEP, `${mm}mm의 위 칸`);
  }
});

test('목록에 없는 내주를 넣으면 조용히 답하지 않는다', () => {
  assert.throws(() => ringFacts(52.25), /목록에 없는 내주/);
  assert.throws(() => ringFacts(39), /목록에 없는 내주/);
  assert.throws(() => ringFacts(91), /목록에 없는 내주/);
});
