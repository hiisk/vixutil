import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  STEMS, BRANCHES, JIJANGGAN, STEM_ELEMENTS, BRANCH_ELEMENTS,
  buildChart, getDayPillar, getSipseong, getSingang, jeolgiUtc, koreaClockToUtc,
  getHourPillar, pillarHanja, yearPillarOf, type Pillar,
} from '../lib/saju-data.ts';
import { sajuFacts } from '../lib/saju-fortune-facts.ts';

/**
 * 사주 세우기.
 *
 * 명리는 규칙이 정해져 있어서 밖에서 아는 값으로 못 박을 수 있다. 전에는 절기를
 * [2,4] 같은 고정 날짜 표로 잡았는데 — 같은 파일 안에 서로 어긋나는 표가 둘
 * 있었다(입추가 8월 7일이자 8월 8일) — 화면만 봐서는 하루 틀린 것을 알 수 없다.
 * 그래서 한국천문연구원 절기 시각과 널리 알려진 일진으로 고정한다.
 */

const kst = (utcMs: number) => new Date(utcMs + 9 * 3600000);
const hhmm = (utcMs: number) => {
  const d = kst(utcMs);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')} `
    + `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
};
const chart = (y: number, m: number, d: number, h: number | null = null, mi = 0, g: 'male' | 'female' = 'male') =>
  buildChart({ year: y, month: m, day: d, hour: h, minute: mi }, g);

test('절기 시각이 한국천문연구원 발표값과 ±10분 안에서 맞는다', () => {
  /*
   * 2025년 열두 절(節) — 월지가 바뀌는 절기다. 중기(우수·춘분…)는 월주와 무관해
   * 여기서 다루지 않는다. 값은 KASI 발표 기준 한국 표준시.
   * 낮은 정밀도 태양 위치식이라 오차가 남는다 — 몇 분인지도 함께 못 박는다.
   */
  const expected: [number, string][] = [
    [1, '2025-01-05 11:32'], [2, '2025-02-03 23:10'], [3, '2025-03-05 17:07'],
    [4, '2025-04-04 21:48'], [5, '2025-05-05 14:57'], [6, '2025-06-05 18:56'],
    [7, '2025-07-07 05:04'], [8, '2025-08-07 14:51'], [9, '2025-09-07 17:51'],
    [10, '2025-10-08 09:41'], [11, '2025-11-07 13:04'], [12, '2025-12-07 06:04'],
  ];
  for (const [month, want] of expected) {
    const got = jeolgiUtc(2025, month);
    const err = Math.abs(got - Date.parse(want.replace(' ', 'T') + ':00+09:00')) / 60000;
    assert.ok(err <= 10, `${month}월 절기: 계산 ${hhmm(got)} vs 발표 ${want} (${Math.round(err)}분 차이)`);
  }
});

test('절기는 해마다 날짜가 다르다 — 고정 표로는 못 잡는다', () => {
  /*
   * 입춘은 2월 3일에서 5일 사이를 오간다. 2021년은 2월 3일 22:59,
   * 2024년은 2월 4일 17:27이었다. "2월 4일"로 못 박으면 2021년이 통째로 틀린다.
   */
  assert.equal(kst(jeolgiUtc(2021, 2)).getUTCDate(), 3, '2021년 입춘은 2월 3일이다');
  assert.equal(kst(jeolgiUtc(2024, 2)).getUTCDate(), 4, '2024년 입춘은 2월 4일이다');
  assert.equal(kst(jeolgiUtc(2025, 2)).getUTCDate(), 3, '2025년 입춘은 2월 3일이다');

  // 스무 해를 훑어도 3~5일 밖으로 나가면 계산이 어긋난 것이다
  for (let y = 2000; y < 2040; y++) {
    const d = kst(jeolgiUtc(y, 2)).getUTCDate();
    assert.ok(d >= 3 && d <= 5, `${y}년 입춘이 2월 ${d}일로 나왔다`);
  }
});

test('일주를 밖에서 아는 일진으로 못 박는다', () => {
  /* 2000-01-01은 戊午일, 1900-01-01은 甲戌일 — 널리 인용되는 값이다 */
  assert.equal(pillarHanja(getDayPillar(2000, 1, 1)), '戊午');
  assert.equal(pillarHanja(getDayPillar(1900, 1, 1)), '甲戌');
});

test('일주는 60일마다 돌아오고 하루도 건너뛰지 않는다', () => {
  const start = Date.UTC(1985, 0, 1);
  let prev = getDayPillar(1985, 1, 1);
  for (let i = 1; i <= 400; i++) {
    const d = new Date(start + i * 86400000);
    const p = getDayPillar(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
    // 하루 지나면 천간은 +1, 지지는 +1
    assert.equal(p.stemIdx, (prev.stemIdx + 1) % 10, `${d.toISOString().slice(0, 10)} 천간이 튀었다`);
    assert.equal(p.branchIdx, (prev.branchIdx + 1) % 12, `${d.toISOString().slice(0, 10)} 지지가 튀었다`);
    prev = p;
    if (i === 60) assert.deepEqual(p, getDayPillar(1985, 1, 1), '60일 뒤 같은 일주로 돌아와야 한다');
  }
});

test('연주는 1월 1일이 아니라 입춘에 바뀐다', () => {
  /* 2025년 입춘은 2월 3일 23:10 — 그 앞은 甲辰년, 뒤는 乙巳년 */
  assert.equal(pillarHanja(chart(2025, 2, 3, 22).year), '甲辰');
  assert.equal(pillarHanja(chart(2025, 2, 3, 23, 30).year), '乙巳');
  assert.equal(pillarHanja(chart(2025, 2, 4, 9).year), '乙巳');
  // 1월생은 늘 앞 해다
  assert.equal(pillarHanja(chart(2025, 1, 20, 9).year), '甲辰');
  // 입춘 지난 뒤는 그 해 간지 — 세운과 같은 값이어야 한다
  assert.deepEqual(chart(2025, 6, 15, 12).year, yearPillarOf(2025));
});

test('월주는 초하루가 아니라 절기에 바뀐다', () => {
  /* 2025년 입하는 5월 5일 14:57 — 그 앞은 辰월, 뒤는 巳월 */
  assert.equal(BRANCHES[chart(2025, 5, 5, 9).month.branchIdx].hanja, '辰');
  assert.equal(BRANCHES[chart(2025, 5, 5, 20).month.branchIdx].hanja, '巳');
  /* 소한(1월 5일 11:32) 앞은 아직 대설의 子월이다 */
  assert.equal(BRANCHES[chart(2025, 1, 3, 9).month.branchIdx].hanja, '子');
  assert.equal(BRANCHES[chart(2025, 1, 20, 9).month.branchIdx].hanja, '丑');
});

test('월간은 두법(頭法)을 따른다 — 갑기년 병인두', () => {
  /*
   * 연간에 따라 寅월의 천간이 정해지고 거기서 한 달에 하나씩 나아간다.
   * 갑·기년 丙寅, 을·경년 戊寅, 병·신년 庚寅, 정·임년 壬寅, 무·계년 甲寅.
   */
  const 인월두: Record<string, string> = { 갑: '丙', 기: '丙', 을: '戊', 경: '戊', 병: '庚', 신: '庚', 정: '壬', 임: '壬', 무: '甲', 계: '甲' };
  for (let y = 1960; y <= 2040; y++) {
    // 3월 20일은 어느 해든 경칩이 지난 卯월이다 — 寅월에서 한 칸 뒤
    const c = chart(y, 3, 20, 12);
    assert.equal(BRANCHES[c.month.branchIdx].hanja, '卯', `${y}년 3월 20일이 卯월이 아니다`);
    const 인월간 = STEMS[(c.month.stemIdx + 9) % 10].hanja;
    assert.equal(인월간, 인월두[STEMS[c.year.stemIdx].kor], `${y}년 두법이 어긋난다`);
  }
});

test('시주는 진태양시로 뽑는다 — 서울은 표준시보다 32분 늦다', () => {
  /*
   * 한국 표준시는 동경 135도 기준이라 서울(126.98도)보다 32분 이르다.
   * 그래서 서울에서 午時는 11:00~13:00이 아니라 대략 11:32~13:32이다.
   * 표준시 13:00에 태어나면 진태양시로는 아직 12시대라 未時가 아니라 午時다.
   */
  const c = chart(1990, 5, 15, 13);
  assert.equal(BRANCHES[c.hour!.branchIdx].hanja, '午');
  assert.ok(c.solarHour!.hour === 12, `진태양시가 12시대여야 하는데 ${c.solarHour!.hour}시로 나왔다`);
  assert.ok(c.solarShiftMin < -20 && c.solarShiftMin > -45, `보정 폭이 ${c.solarShiftMin}분이다`);
  // 13:40이면 진태양시로도 13시대라 未時
  assert.equal(BRANCHES[chart(1990, 5, 15, 13, 40).hour!.branchIdx].hanja, '未');
  // 시를 모르면 시주가 없다
  assert.equal(chart(1990, 5, 15).hour, null);
});

test('시간(時干)은 시두법을 따른다 — 갑기일 갑자시', () => {
  /*
   * 일간에 따라 子時의 천간이 정해지고 두 시간마다 하나씩 나아간다.
   * 甲己日 甲子時 · 乙庚日 丙子時 · 丙辛日 戊子時 · 丁壬日 庚子時 · 戊癸日 壬子時.
   */
  const 자시두: Record<string, string> = {
    甲: '甲', 己: '甲', 乙: '丙', 庚: '丙', 丙: '戊',
    辛: '戊', 丁: '庚', 壬: '庚', 戊: '壬', 癸: '壬',
  };
  for (let ilgan = 0; ilgan < 10; ilgan++) {
    const 자시 = getHourPillar(0, ilgan);
    assert.equal(BRANCHES[자시.branchIdx].hanja, '子');
    assert.equal(STEMS[자시.stemIdx].hanja, 자시두[STEMS[ilgan].hanja], `${STEMS[ilgan].hanja}일의 자시두가 어긋난다`);
    // 시지 하나 나아갈 때마다 시간도 하나 나아간다
    for (let h = 1; h < 12; h++) {
      const cur = getHourPillar(h * 2 - 1, ilgan); // 丑時는 1시, 寅時는 3시…
      assert.equal(cur.branchIdx, h);
      assert.equal(cur.stemIdx, (자시.stemIdx + h) % 10);
    }
  }
  /* 실제 사주로 못 박는다: 1990-05-15는 庚辰일이라 丙子時에서 시작하고, 午는 여섯 칸 뒤 */
  const c = chart(1990, 5, 15, 13);
  assert.equal(pillarHanja(c.day), '庚辰');
  assert.equal(pillarHanja(c.hour!), '壬午');
});

test('서머타임과 옛 표준시를 시계 시각에서 걷어낸다', () => {
  /*
   * 1987~1988년 서머타임(시계를 1시간 앞당김)과 1954-03-21~1961-08-09의
   * 동경 127.5도 표준시(UTC+8:30)는 시주를 통째로 한 칸씩 밀어 놓는다.
   * IANA 시간대 자료(Asia/Seoul)를 읽으므로 전환 날짜를 따로 적지 않는다.
   */
  assert.equal(koreaClockToUtc(1988, 8, 15, 12, 0), Date.parse('1988-08-15T12:00:00+10:00'), '1988년 여름은 UTC+10');
  assert.equal(koreaClockToUtc(1958, 6, 10, 12, 0), Date.parse('1958-06-10T12:00:00+09:30'), '1958년 여름은 UTC+9:30');
  assert.equal(koreaClockToUtc(1990, 8, 15, 12, 0), Date.parse('1990-08-15T12:00:00+09:00'), '평시는 UTC+9');

  /* 1988-08-15 12:00은 서머타임이라 실제로는 11:00 — 진태양시로 10시대라 巳時 */
  assert.equal(BRANCHES[chart(1988, 8, 15, 12).hour!.branchIdx].hanja, '巳');
  /* 서머타임이 없던 1990년 같은 날짜·시각은 午時 */
  assert.equal(BRANCHES[chart(1990, 8, 15, 12).hour!.branchIdx].hanja, '午');
});

test('대운 방향이 남녀와 연간 음양으로 갈린다', () => {
  /* 양년생 남자·음년생 여자는 순행, 나머지는 역행 */
  for (let y = 1950; y <= 2030; y++) {
    const yang = STEMS[yearPillarOf(y).stemIdx].yinyang === '양';
    assert.equal(chart(y, 6, 15, 12, 0, 'male').daewoonDirection, yang ? 'forward' : 'backward');
    assert.equal(chart(y, 6, 15, 12, 0, 'female').daewoonDirection, yang ? 'backward' : 'forward');
  }
});

test('대운수는 절기까지의 날수를 3으로 나눈 값이다', () => {
  /*
   * 절기 사이가 30일 남짓이므로 대운수는 1~10 안이어야 한다. 순행은 다음 절까지,
   * 역행은 지난 절까지 세므로 같은 생일이라도 남녀가 다른 수를 받고,
   * 두 값을 더하면 그 절기월의 길이(약 30일)를 3으로 나눈 값 언저리가 된다.
   */
  for (let m = 1; m <= 12; m++) {
    for (const d of [2, 9, 17, 25]) {
      const f = chart(1993, m, d, 12, 0, 'male').daewoonStartAge;
      const b = chart(1993, m, d, 12, 0, 'female').daewoonStartAge;
      assert.ok(f >= 1 && f <= 10, `1993-${m}-${d} 순행 대운수가 ${f}`);
      assert.ok(b >= 1 && b <= 10, `1993-${m}-${d} 역행 대운수가 ${b}`);
      // 1993년은 계유(음)년이라 남자가 역행, 여자가 순행이다 — 위 두 값이 그 짝이다
      assert.ok(f + b >= 9 && f + b <= 12, `1993-${m}-${d}의 순·역 합이 ${f + b}`);
    }
  }
  /* 대운은 월주에서 한 칸씩 나아가거나 물러난다 */
  const c = chart(1990, 5, 15, 13);
  assert.equal(c.daewoonDirection, 'forward'); // 庚(양)년 남자
  assert.equal(c.daewoons[0].pillar.stemIdx, (c.month.stemIdx + 1) % 10);
  assert.equal(c.daewoons[0].pillar.branchIdx, (c.month.branchIdx + 1) % 12);
  assert.equal(c.daewoons.length, 10);
});

test('지장간 본기의 오행이 그 지지의 오행과 같다', () => {
  // 표를 손으로 옮기다 한 칸 밀리면 여기서 걸린다
  for (let b = 0; b < 12; b++) {
    const jjg = JIJANGGAN[b];
    assert.equal(jjg[jjg.length - 1].role, '본기', `${BRANCHES[b].hanja}의 마지막이 본기가 아니다`);
    assert.equal(STEM_ELEMENTS[jjg[jjg.length - 1].stemIdx], BRANCH_ELEMENTS[b], `${BRANCHES[b].hanja} 본기 오행이 어긋난다`);
  }
});

test('십성은 일간마다 열 가지가 두 갈래씩 나온다', () => {
  const CATS: Record<string, string> = {
    비견: '비겁', 겁재: '비겁', 식신: '식상', 상관: '식상', 편재: '재성',
    정재: '재성', 편관: '관성', 정관: '관성', 편인: '인성', 정인: '인성',
  };
  for (let ilgan = 0; ilgan < 10; ilgan++) {
    const names = Array.from({ length: 10 }, (_, s) => getSipseong(ilgan, s));
    assert.equal(new Set(names).size, 10, `일간 ${STEMS[ilgan].hanja}: 십성이 열 가지가 아니다`);
    const per: Record<string, number> = {};
    for (const n of names) per[CATS[n]] = (per[CATS[n]] ?? 0) + 1;
    assert.deepEqual(per, { 비겁: 2, 식상: 2, 재성: 2, 관성: 2, 인성: 2 }, `일간 ${STEMS[ilgan].hanja}: 갈래가 둘씩이 아니다`);
    assert.equal(getSipseong(ilgan, ilgan), '비견', '자기 자신은 비견이다');
  }
});

test('신강·신약은 월령(月令)을 가장 크게 본다', () => {
  /*
   * 같은 일간이라도 태어난 계절이 다르면 강약이 달라야 한다. 전에는 네 지지를
   * 똑같이 세어 겨울에 난 수(水) 일간과 여름에 난 수 일간이 같은 점수를 받았다.
   */
  const p = (s: number, b: number): Pillar => ({ stemIdx: s, branchIdx: b });
  const ilgan = 8; // 壬(수)
  // 천간은 셋 다 甲(식신 — 내 편이 아니다), 지지는 亥(수)로 두고 월지만 바꾼다
  const 겨울 = getSingang(ilgan, [p(0, 11), p(0, 0), p(ilgan, 11), p(0, 11)]); // 월지 子(수)
  const 여름 = getSingang(ilgan, [p(0, 11), p(0, 6), p(ilgan, 11), p(0, 11)]); // 월지 午(화)
  assert.ok(겨울.score > 여름.score, '월지만 바꿨는데 강약이 그대로다');
  assert.ok(겨울.strong && !여름.strong, `겨울 ${겨울.score} / 여름 ${여름.score}`);

  /*
   * 월지 하나가 년지+시지 둘보다 무거워야 한다. 넷을 똑같이 세면 이 부등호가
   * 뒤집힌다 — 계절을 보는 것과 안 보는 것을 가르는 자리다.
   */
  const 득령 = getSingang(ilgan, [p(ilgan, 2), p(0, 0), p(ilgan, 2), p(0, 2)]); // 월지만 수(子)
  const 실령 = getSingang(ilgan, [p(ilgan, 0), p(0, 2), p(ilgan, 2), p(0, 0)]); // 년지·시지만 수(子)
  assert.ok(득령.score > 실령.score, `득령 ${득령.score} vs 실령 ${실령.score} — 월령을 안 보고 있다`);

  // 온 사주가 내 편이면 최대, 온 사주가 남이면 최소여야 한다
  const 최강 = getSingang(ilgan, [p(ilgan, 0), p(ilgan, 0), p(ilgan, 0), p(ilgan, 0)]);
  const 최약 = getSingang(ilgan, [p(4, 6), p(4, 6), p(ilgan, 6), p(4, 6)]); // 戊土·午火로 둘러싼다
  assert.ok(최강.strong && !최약.strong);
  assert.ok(최강.score > 최약.score);
});

test('도화살·역마살은 삼합으로 정해진다 — 아무 지지나 세지 않는다', () => {
  const p = (s: number, b: number): Pillar => ({ stemIdx: s, branchIdx: b });
  const facts = (yb: number, mb: number, db: number, hb: number) =>
    sajuFacts(p(0, db), p(0, yb), p(0, mb), p(0, hb), 'male', true, { 목: 2, 화: 2, 토: 2, 금: 1, 수: 1 });

  /* 년지 午(寅午戌 화국) → 도화는 卯, 역마는 申. 일지는 寅으로 두어 겹치지 않게 한다 */
  assert.equal(facts(6, 3, 2, 2).hasPeach, true, '午년에 卯가 있으면 도화다');
  assert.equal(facts(6, 8, 2, 2).hasYongma, true, '午년에 申이 있으면 역마다');
  /* 같은 午년이라도 子·酉는 도화가 아니다 — 옛 판정은 이것도 도화로 봤다 */
  assert.equal(facts(6, 0, 2, 2).hasPeach, false, '午년의 子는 도화가 아니다');
  assert.equal(facts(6, 9, 2, 2).hasPeach, false, '午년의 酉는 도화가 아니다');
  /* 년지 子(申子辰 수국) → 도화 酉, 역마 寅 */
  assert.equal(facts(0, 9, 1, 1).hasPeach, true);
  assert.equal(facts(0, 2, 1, 1).hasYongma, true);
  assert.equal(facts(0, 3, 1, 1).hasPeach, false, '子년의 卯는 도화가 아니다');
  /* 일지 기준으로도 본다 — 년지 辰의 도화(酉)는 없고 일지 午의 도화(卯)만 있다 */
  assert.equal(facts(4, 4, 6, 3).hasPeach, true, '일지 午 기준 卯가 도화다');

  /* 지지 넷을 다 훑어도 도화가 열에 여덟이면 판정이 없는 것과 같다 */
  let peach = 0, n = 0;
  for (let y = 0; y < 12; y++) for (let m = 0; m < 12; m++) for (let d = 0; d < 12; d++) for (let h = 0; h < 12; h++) {
    n++; if (facts(y, m, d, h).hasPeach) peach++;
  }
  const rate = peach / n;
  assert.ok(rate > 0.25 && rate < 0.55, `도화 비율이 ${(rate * 100).toFixed(0)}%다 — 규칙이 무너졌다`);
});

test('같은 생일이면 성별만 달라도 명식 네 기둥은 같다', () => {
  // 성별은 대운 방향만 가른다 — 기둥까지 갈리면 계산이 새는 것이다
  for (const [y, m, d, h] of [[1975, 3, 6, 5], [2001, 8, 7, 15], [1966, 12, 7, 23]] as const) {
    const a = chart(y, m, d, h, 0, 'male');
    const b = chart(y, m, d, h, 0, 'female');
    assert.deepEqual([a.year, a.month, a.day, a.hour], [b.year, b.month, b.day, b.hour]);
  }
});
