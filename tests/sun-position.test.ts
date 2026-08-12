/**
 * 태양의 자리 — 표를 믿지 않고 천문 공식으로 되짚는다.
 *
 * 이 섹션의 숫자는 전부 네 식에서 나온다. 그래서 검사도 그 식들을 밖에서 아는
 * 사실로 되짚는 쪽으로 쓴다.
 *
 *   · 적위가 0인 날에는 **어디서나 낮이 12시간**이다 — 가장 좋은 되짚기다.
 *   · 하지에 북반구 위도 φ의 정오 고도는 **90° − φ + 23.44°**다.
 *   · 적도는 계절과 무관하게 늘 12시간이다.
 *   · 같은 날 φ와 −φ의 낮 길이를 더하면 **정확히 24시간**이다(계절이 뒤집힌다).
 *   · 그림자에 tan(고도)를 곱하면 물체 높이로 돌아온다.
 *
 * **저장소 밖에서 확인해 주는 값은 자전축 기울기 23.44°뿐이다.** 나머지 검사는
 * 모두 식과 식을 견주므로, 이 값이 틀리면 되짚기가 함께 틀릴 수 있다. 그래서 널리
 * 인용되는 값(하지의 적위, 45°에서 그림자가 키와 같다)을 따로 못 박아 둔다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  CELLS, DATES, LATITUDES, LAT_MAX, LAT_MIN, LAT_STEP, MID_DAY, TURNS,
  cellOf, dateOf, slugOf,
} from '../lib/sun/list.ts';
import {
  AXIAL_TILT, DEGREES_PER_HOUR, POLE_HEIGHT,
  dayHoursOf, dayOfYear, declinationOf, halfDayAngle, hourAngleCos,
  noonAltitudeOf, polarOf, shadowOf, sunFacts,
} from '../lib/sun/facts.ts';

const rad = (d: number): number => (d * Math.PI) / 180;

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return sunFacts(c);
};

/** 그 절기의 적위 — 검사 여럿이 같은 값을 쓴다 */
const decOfTurn = (turn: string): number => {
  const t = TURNS.find(x => x.turn === turn);
  assert.ok(t, `절기 ${turn}이 없다`);
  return declinationOf(dayOfYear(t.month, t.day));
};

test('칸은 위도 14가지 × 날짜 16가지', () => {
  assert.equal(LATITUDES.length, 14);
  assert.equal(DATES.length, 16);
  assert.equal(CELLS.length, 224);
  assert.ok(CELLS.length > 100, '칸이 100개를 넘어야 한다');
  assert.equal(new Set(CELLS.map(slugOf)).size, 224, 'slug가 겹친다');
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));

  // 축은 오름차순이어야 한다 — 이웃 잇기와 단조성 검사가 순서에 기댄다
  for (let i = 1; i < LATITUDES.length; i++) assert.ok(LATITUDES[i] > LATITUDES[i - 1]);
  assert.equal(LATITUDES[0], LAT_MIN);
  assert.equal(LATITUDES[LATITUDES.length - 1], LAT_MAX);
  // 남반구는 나머지가 -0으로 나온다 — 절댓값으로 본다
  for (const lat of LATITUDES) assert.equal(Math.abs(lat % LAT_STEP), 0, `${lat}는 눈금에서 벗어난다`);
  // 적도와 백야가 생기는 줄이 축에 있어야 한다 — 없으면 되짚기가 반쪽이 된다
  for (const lat of [0, 70, -60]) assert.ok(LATITUDES.includes(lat), `위도 ${lat}가 축에 없다`);

  // 날짜는 달·날 차례이고, 절기 넷과 매달 15일 열둘이 모두 있어야 한다
  for (let i = 1; i < DATES.length; i++) {
    const a = DATES[i - 1];
    const b = DATES[i];
    assert.ok(b.month > a.month || (b.month === a.month && b.day > a.day), `${a.key} 뒤에 ${b.key}`);
  }
  assert.equal(DATES.filter(d => d.turn).length, 4, '절기가 넷이 아니다');
  assert.equal(DATES.filter(d => d.day === MID_DAY && !d.turn).length, 12, '매달 15일이 열둘이 아니다');
  for (const t of TURNS) assert.ok(dateOf(`${['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][t.month - 1]}${t.day}`), `절기 ${t.turn}이 날짜 축에 없다`);

  assert.equal(cellOf('lat40'), undefined);
  assert.equal(cellOf('lat45-jun21'), undefined, '축에 없는 위도가 열리면 안 된다');
  assert.equal(cellOf('lat40-jun22'), undefined, '축에 없는 날짜가 열리면 안 된다');
  assert.equal(cellOf('LAT40-JUN21'), undefined, 'slug는 소문자 한 꼴만 열린다');
  // 남반구도 주소가 하나로 정해져야 한다
  assert.ok(cellOf('lat-30-jun21'), '남위 30° 칸이 안 열린다');
  assert.equal(slugOf({ lat: -30, date: 'jun21' }), 'lat-30-jun21');
});

test('그 해의 몇 번째 날은 365일 해로 센다', () => {
  assert.equal(dayOfYear(1, 1), 1);
  assert.equal(dayOfYear(3, 20), 79);
  assert.equal(dayOfYear(6, 21), 172);
  assert.equal(dayOfYear(9, 23), 266);
  assert.equal(dayOfYear(12, 21), 355);
  assert.equal(dayOfYear(12, 31), 365);
  // 칸이 들고 다니는 값도 같은 함수에서 나와야 한다
  assert.equal(facts('lat40-jun21').n, 172);
});

test('적위는 하지에 +23.44°, 동지에 −23.44°에 닿는다', () => {
  /*
   * 자전축 기울기 23.44°가 이 섹션에서 유일하게 옮겨 적은 값이다. 그것을 22°로
   * 바꾸면 이 검사가 먼저 깨지고, 정오 고도와 낮 길이 검사가 뒤따라 깨진다.
   */
  assert.equal(AXIAL_TILT, 23.44);
  assert.ok(Math.abs(decOfTurn('junSolstice') - 23.44) < 0.01, `하지 적위 ${decOfTurn('junSolstice')}`);
  assert.ok(Math.abs(decOfTurn('decSolstice') + 23.44) < 0.01, `동지 적위 ${decOfTurn('decSolstice')}`);

  // 한 해 어디서도 기울기를 넘지 않는다
  for (let n = 1; n <= 365; n++) {
    assert.ok(Math.abs(declinationOf(n)) <= AXIAL_TILT + 1e-9, `${n}일 적위 ${declinationOf(n)}`);
  }

  /*
   * 춘분·추분에는 적위가 0 근처를 지난다 — 다만 근사식은 0을 지나는 날을 이틀쯤
   * 늦게 잡아 1° 남짓 남는다. 그 어긋남을 검사가 알고 있어야, 나중에 더 정확한
   * 식으로 바꿀 때 무엇이 달라졌는지 보인다.
   */
  for (const turn of ['marEquinox', 'sepEquinox']) {
    assert.ok(Math.abs(decOfTurn(turn)) < 1.5, `${turn} 적위 ${decOfTurn(turn)}`);
  }
});

test('적위가 0이면 어디서나 낮이 정확히 12시간이다', () => {
  /*
   * 이 섹션에서 가장 강한 되짚기다. 적위가 0이면 cos H = 0이므로 H = 90°,
   * 낮 길이는 위도와 무관하게 12시간이어야 한다. 낮 길이 식의 부호나 15° 나눗셈이
   * 틀리면 여기서 걸린다.
   */
  for (const lat of [...LATITUDES, -35, 37, 66.5]) {
    assert.ok(Math.abs(dayHoursOf(lat, 0) - 12) < 1e-9, `위도 ${lat}: ${dayHoursOf(lat, 0)}시간`);
    assert.ok(Math.abs(halfDayAngle(lat, 0) - 90) < 1e-9, `위도 ${lat} 반일호`);
    assert.ok(Math.abs(noonAltitudeOf(lat, 0) - (90 - Math.abs(lat))) < 1e-9, `위도 ${lat} 정오 고도`);
  }
});

test('춘분·추분 칸은 어느 위도에서도 12시간에 가깝다', () => {
  const equinoxes = DATES.filter(d => d.turn === 'marEquinox' || d.turn === 'sepEquinox');
  assert.equal(equinoxes.length, 2);
  for (const d of equinoxes) {
    for (const lat of LATITUDES) {
      const f = sunFacts({ lat, date: d.key });
      // 근사식이 적위를 1° 남짓 남겨 두므로 고위도에서 20분쯤 벌어진다
      assert.ok(Math.abs(f.dayHours - 12) < 0.5, `${f.slug}: ${f.dayHours}시간`);
      assert.equal(f.polar, null, `${f.slug}: 춘분·추분에 백야나 극야가 나왔다`);
    }
  }
});

test('하지에 북반구 정오 고도는 90 − φ + 23.44다', () => {
  const dec = decOfTurn('junSolstice');
  // 위도가 적위보다 큰 줄에서만 절댓값이 풀린다 — 열대(20° 이하)는 해가 북쪽으로 넘어간다
  for (const lat of LATITUDES.filter(x => x >= 30)) {
    const f = sunFacts({ lat, date: 'jun21' });
    assert.ok(Math.abs(f.noonAltitude - (90 - lat + dec)) < 0.01, `북위 ${lat}: ${f.noonAltitude}`);
    assert.ok(Math.abs(f.noonAltitude - (113.44 - lat)) < 0.02, `북위 ${lat}: 90 − φ + 23.44와 어긋난다`);
    assert.equal(f.noonSide, 'south', `북위 ${lat}: 정오에 해가 남쪽이 아니다`);
  }
  // 남반구의 동지는 그 거울이다 — 90 + φ + 23.44
  const decSouth = decOfTurn('decSolstice');
  for (const lat of LATITUDES.filter(x => x <= -30)) {
    const f = sunFacts({ lat, date: 'dec21' });
    assert.ok(Math.abs(f.noonAltitude - (90 + lat - decSouth)) < 0.01, `남위 ${-lat}: ${f.noonAltitude}`);
    assert.equal(f.noonSide, 'north', `남위 ${-lat}: 정오에 해가 북쪽이 아니다`);
  }
  // 널리 인용되는 값 — 북위 40°의 하지 정오 고도는 73.4°, 동지는 26.6°다
  assert.ok(Math.abs(facts('lat40-jun21').noonAltitude - 73.44) < 0.02);
  assert.ok(Math.abs(facts('lat40-dec21').noonAltitude - 26.56) < 0.02);
});

test('적도는 계절이 있어도 늘 12시간이다', () => {
  for (const d of DATES) {
    const f = sunFacts({ lat: 0, date: d.key });
    assert.ok(Math.abs(f.dayHours - 12) < 0.001, `적도 ${d.key}: ${f.dayHours}시간`);
    assert.equal(f.sunrise, '06:00', `적도 ${d.key} 일출`);
    assert.equal(f.sunset, '18:00', `적도 ${d.key} 일몰`);
  }
  // 그래도 정오 고도는 움직인다 — 적위만큼 기울어진다
  assert.ok(facts('lat0-mar20').noonAltitude > facts('lat0-jun21').noonAltitude, '적도의 고도가 계절을 안 따른다');
});

test('남반구는 계절이 뒤집히고, φ와 −φ의 낮을 더하면 24시간이다', () => {
  const june = decOfTurn('junSolstice');
  const december = decOfTurn('decSolstice');

  // 하지에 남위 35°의 낮은 12시간보다 짧다 — 축에 없는 위도도 식으로 물어본다
  assert.ok(dayHoursOf(-35, june) < 12, `남위 35° 하지 ${dayHoursOf(-35, june)}시간`);
  assert.ok(dayHoursOf(-35, december) > 12, `남위 35° 동지 ${dayHoursOf(-35, december)}시간`);
  assert.ok(dayHoursOf(35, june) > 12, `북위 35° 하지 ${dayHoursOf(35, june)}시간`);

  // 칸으로도 같은 말이 되어야 한다
  assert.ok(facts('lat-30-jun21').dayHours < 11, `남위 30° 하지 ${facts('lat-30-jun21').dayHours}`);
  assert.ok(facts('lat-30-dec21').dayHours > 13, `남위 30° 동지 ${facts('lat-30-dec21').dayHours}`);

  /*
   * 어느 날이든 같은 위도의 남북을 더하면 정확히 24시간이다(H(φ) + H(−φ) = 180°).
   * 백야·극야로 잘린 자리에서도 24와 0이 짝을 이뤄 성립한다 — 자르는 규칙까지
   * 맞는지 이 한 줄이 본다.
   */
  for (const d of DATES) {
    const dec = declinationOf(dayOfYear(d.month, d.day));
    for (const lat of LATITUDES) {
      const sum = dayHoursOf(lat, dec) + dayHoursOf(-lat, dec);
      assert.ok(Math.abs(sum - 24) < 1e-9, `${d.key} 위도 ${lat}: 합이 ${sum}시간`);
    }
  }
});

test('위도 대칭 — 적위가 0이면 φ와 −φ의 낮 길이가 같다', () => {
  for (const lat of LATITUDES.filter(x => x > 0)) {
    assert.equal(dayHoursOf(lat, 0), dayHoursOf(-lat, 0), `위도 ${lat}`);
    assert.equal(noonAltitudeOf(lat, 0), noonAltitudeOf(-lat, 0), `위도 ${lat} 정오 고도`);
  }
  // 춘분 칸에서도 20분 안에서 같다 — 남는 차이는 근사식이 적위를 0으로 두지 않아서다
  for (const lat of LATITUDES.filter(x => x > 0 && LATITUDES.includes(-x))) {
    const a = sunFacts({ lat, date: 'mar20' }).dayHours;
    const b = sunFacts({ lat: -lat, date: 'mar20' }).dayHours;
    assert.ok(Math.abs(a - b) < 0.7, `위도 ±${lat}: ${a} vs ${b}`);
  }
});

test('백야와 극야가 실제로 나타나고, 그때 시각을 지어내지 않는다', () => {
  const polars = CELLS.map(sunFacts).filter(f => f.polar);
  assert.ok(polars.length > 0, '고위도에서 백야도 극야도 안 나온다 — 자르는 규칙이 죽었다');
  assert.equal(facts('lat70-jun21').polar, 'midnightSun', '북위 70° 하지가 백야가 아니다');
  assert.equal(facts('lat70-dec21').polar, 'polarNight', '북위 70° 동지가 극야가 아니다');
  // 남위 60°는 남극권 앞이라 백야도 극야도 없어야 한다
  assert.equal(facts('lat-60-dec21').polar, null, '남위 60°에 백야가 나왔다');

  for (const f of polars) {
    assert.equal(f.sunrise, null, `${f.slug}: 백야·극야에 일출 시각을 냈다`);
    assert.equal(f.sunset, null, `${f.slug}: 백야·극야에 일몰 시각을 냈다`);
    if (f.polar === 'midnightSun') {
      assert.equal(f.dayHours, 24, `${f.slug}: 백야인데 낮이 24시간이 아니다`);
      assert.ok(f.noonAltitude > 0, `${f.slug}: 백야인데 정오에 해가 지평선 아래다`);
      // 해가 지지 않는 조건은 |φ + δ| ≥ 90이다 — 식과 다른 길로 되짚는다
      assert.ok(Math.abs(f.cell.lat + f.declination) >= 90 - 0.02, `${f.slug}: 백야 조건과 어긋난다`);
    } else {
      assert.equal(f.dayHours, 0, `${f.slug}: 극야인데 낮이 0시간이 아니다`);
      assert.ok(f.noonAltitude <= 0, `${f.slug}: 극야인데 정오 고도가 양수다`);
      assert.equal(f.shadow, null, `${f.slug}: 극야인데 그림자 길이를 냈다`);
      // 해가 뜨지 않는 조건은 |φ − δ| ≥ 90이다
      assert.ok(Math.abs(f.cell.lat - f.declination) >= 90 - 0.02, `${f.slug}: 극야 조건과 어긋난다`);
    }
  }

  // 백야·극야가 아닌 칸은 시각을 낸다 — 정오를 가운데 두고 앞뒤가 같다
  for (const c of CELLS) {
    const f = sunFacts(c);
    if (f.polar) continue;
    assert.match(f.sunrise!, /^\d\d:\d\d$/, `${f.slug} 일출 꼴`);
    assert.match(f.sunset!, /^\d\d:\d\d$/, `${f.slug} 일몰 꼴`);
    const toH = (t: string) => Number(t.slice(0, 2)) + Number(t.slice(3)) / 60;
    // 시각은 분까지, 낮 길이는 소수 둘까지 자른 값이라 2분 안에서 맞으면 된다
    assert.ok(Math.abs(toH(f.sunrise!) + toH(f.sunset!) - 24) < 0.034, `${f.slug}: 정오 대칭이 아니다`);
    assert.ok(Math.abs(toH(f.sunset!) - toH(f.sunrise!) - f.dayHours) < 0.034, `${f.slug}: 일몰 − 일출이 낮 길이와 다르다`);
    assert.ok(f.dayHours > 0 && f.dayHours < 24, `${f.slug}: 낮 길이 ${f.dayHours}`);
  }

  // 극야·백야는 |cos H|가 1을 넘는 자리와 정확히 같은 자리다
  for (const c of CELLS) {
    const f = sunFacts(c);
    const c1 = hourAngleCos(c.lat, declinationOf(f.n));
    assert.equal(f.polar, polarOf(c.lat, declinationOf(f.n)), f.slug);
    assert.equal(Math.abs(c1) >= 1, f.polar !== null, `${f.slug}: cos H ${c1}인데 상태가 ${f.polar}`);
  }
});

test('그림자에 tan(고도)를 곱하면 물체 높이로 돌아온다', () => {
  assert.equal(POLE_HEIGHT, 1);
  // 고도 45°에서 그림자는 키와 같고, 30°에서는 1.732배다 — 밖에서 아는 값이다
  assert.ok(Math.abs(shadowOf(1, 45)! - 1) < 1e-9);
  assert.ok(Math.abs(shadowOf(1, 30)! - Math.sqrt(3)) < 1e-9);
  assert.equal(shadowOf(1, 0), null, '고도 0에서 그림자 길이를 냈다');
  assert.equal(shadowOf(1, -5), null, '해가 지평선 아래인데 그림자 길이를 냈다');
  // 높이를 두 배로 하면 그림자도 두 배다
  assert.ok(Math.abs(shadowOf(2, 40)! - 2 * shadowOf(1, 40)!) < 1e-9);

  for (const c of CELLS) {
    const f = sunFacts(c);
    if (f.shadow === null) {
      assert.ok(f.noonAltitude <= 0, `${f.slug}: 해가 떠 있는데 그림자가 없다`);
      continue;
    }
    /*
     * 왕복 두 번. 먼저 자르지 않은 값으로 — 식이 맞으면 여기서 딱 1m로 돌아온다.
     * 그다음 화면에 찍히는 값으로. 뒤쪽은 2% 안으로 본다: 해가 천정에 가까우면
     * (남위 10°의 10월 15일은 고도 89.6°다) 탄젠트가 급해서, 고도를 소수 두
     * 자리로 자른 것만으로 1%가 움직인다. 자르는 자리를 늘리는 대신 그 폭을
     * 검사가 알고 있게 둔다.
     */
    const exactAlt = noonAltitudeOf(c.lat, declinationOf(f.n));
    const exactBack = shadowOf(POLE_HEIGHT, exactAlt)! * Math.tan(rad(exactAlt));
    assert.ok(Math.abs(exactBack - POLE_HEIGHT) < 1e-12, `${f.slug}: 식이 되짚어지지 않는다`);
    const back = f.shadow * Math.tan(rad(f.noonAltitude));
    assert.ok(Math.abs(back - POLE_HEIGHT) < 0.02, `${f.slug}: 되짚으면 ${back}m다`);
    assert.ok(f.shadow > 0, `${f.slug}: 그림자 ${f.shadow}`);
  }

  // 고도가 낮으면 그림자가 급히 길어진다 — 같은 위도에서 여름과 겨울을 견준다
  assert.ok(facts('lat50-dec21').shadow! > facts('lat50-jun21').shadow! * 5, '겨울 그림자가 여름과 비슷하게 나온다');
});

test('하늘은 한 시간에 15°를 돈다', () => {
  assert.equal(DEGREES_PER_HOUR, 15);
  for (const c of CELLS) {
    const f = sunFacts(c);
    const want = (2 * f.hourAngle) / 15;
    assert.ok(Math.abs(f.dayHours - want) < 0.006, `${f.slug}: ${f.dayHours} vs ${want}`);
    /*
     * 시·분으로 가른 값도 같은 길이여야 한다. 견주는 상대는 자리를 자른 dayHours가
     * 아니라 자르지 않은 값이다 — 둘을 견주면 서로 다른 자리에서 자른 오차가 겹쳐
     * 반 분 차이로도 걸린다.
     */
    const exact = dayHoursOf(c.lat, declinationOf(f.n));
    const parts = f.dayHourPart + f.dayMinutePart / 60;
    assert.ok(Math.abs(parts - exact) < 0.009, `${f.slug}: ${parts}시간으로 갈렸다`);
    assert.ok(f.dayMinutePart >= 0 && f.dayMinutePart < 60, `${f.slug}: ${f.dayMinutePart}분`);
  }
});

test('이웃 링크가 모든 칸에 들어온다', () => {
  /*
   * 앞에서 여섯을 잘라 오면 줄의 앞쪽만 서로 가리키고 뒤쪽 칸은 들어오는 링크가
   * 0이 된다 — 사이트맵에는 있고 아무도 안 가리키는 낱장이다. lib/related-window.ts가
   * 자기 자리 다음부터 원형으로 감으므로 224칸이 정확히 같은 수만큼 가리켜진다.
   */
  const deg = new Map<string, number>(CELLS.map(c => [slugOf(c), 0]));
  for (const c of CELLS) {
    const f = sunFacts(c);
    assert.equal(f.neighbours.length, 6, `${f.slug}: 이웃이 여섯이 아니다`);
    assert.equal(new Set(f.neighbours.map(x => x.slug)).size, 6, `${f.slug}: 이웃이 겹친다`);
    for (const x of f.neighbours) {
      assert.notEqual(x.slug, f.slug, `${f.slug}: 자기를 가리킨다`);
      assert.ok(cellOf(x.slug), `${f.slug} → ${x.slug}: 없는 칸을 가리킨다`);
      deg.set(x.slug, deg.get(x.slug)! + 1);
    }
    // 절반은 같은 위도, 절반은 같은 날짜여야 한다
    assert.equal(f.neighbours.filter(x => x.lat === c.lat).length, 3, f.slug);
    assert.equal(f.neighbours.filter(x => x.date === c.date).length, 3, f.slug);
  }
  const counts = [...deg.values()];
  assert.equal(Math.min(...counts), 6, '들어오는 링크가 여섯보다 적은 칸이 있다');
  assert.equal(Math.max(...counts), 6, '들어오는 링크가 여섯보다 많은 칸이 있다');
});

test('축에 없는 값을 넣으면 조용히 답하지 않는다', () => {
  assert.throws(() => sunFacts({ lat: 45, date: 'jun21' }), /모르는 위도/);
  assert.throws(() => sunFacts({ lat: 40, date: 'jun22' }), /모르는 날짜/);
});

test('오늘 날짜를 읽지 않는다', () => {
  /*
   * `new Date()`나 `Date.now()`가 한 줄이라도 들어가면 페이지가 날마다 바뀐다.
   * 그러면 검사가 붙들 값이 없고, 캐시된 낱장은 다음 날 거짓이 된다. 눈으로는
   * 알 수 없는 종류의 고장이라 소스를 직접 훑는다.
   */
  const dir = join(import.meta.dirname, '..', 'lib', 'sun');
  const files = readdirSync(dir).filter(f => f.endsWith('.ts'));
  assert.ok(files.length >= 4, `lib/sun에 파일이 ${files.length}개뿐이다`);
  for (const f of files) {
    /* 주석은 걷어낸다 — 머리말이 "new Date()를 쓰지 않는다"고 적고 있어 그대로 걸린다 */
    const code = readFileSync(join(dir, f), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');
    assert.ok(!/new Date\s*\(/.test(code), `${f}: new Date()를 쓴다 — 날짜가 축이어야 한다`);
    assert.ok(!/Date\.now\s*\(/.test(code), `${f}: Date.now()를 쓴다 — 날짜가 축이어야 한다`);
  }
});
