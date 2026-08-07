/**
 * 도시 사이 거리 — 좌표에서 낸 값이 공표된 항공 거리와 맞는지 본다.
 *
 * lib/flight 은 좌표 두 쌍에서 하버사인으로 거리를 낸다. 여기서는 그 길을
 * 쓰지 않고, 항공 거리 계산기들이 공표하는 구간 거리를 그대로 적어 두고
 * 맞춰 본다. 좌표가 도심이고 저쪽은 공항이라 2%까지 벌어질 수 있다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CELLS, COORDS, FLIGHT_CITIES, FLIGHT_SLUGS, cellOf, cityOf, coordOf, slugOf } from '../lib/flight/list.ts';
import {
  CITY_COUNT, COMPASS, EARTH_RADIUS_KM, MAX_DISTANCE_KM, SUMMER_AT, WINTER_AT,
  bearingDeg, compassOf, distanceKm, flightFacts, hoursOf, offsetMinutes,
} from '../lib/flight/facts.ts';

/** 공표된 구간 거리(km) — 옮겨 적은 자료라 계산과 겹치지 않는다 */
const PUBLISHED_KM: [string, string, number][] = [
  ['seoul', 'newyork', 11077],
  ['london', 'newyork', 5570],
  ['seoul', 'tokyo', 1160],
  ['london', 'paris', 344],
  ['sydney', 'auckland', 2158],
  ['seoul', 'losangeles', 9600],
  ['singapore', 'london', 10850],
];

const facts = FLIGHT_SLUGS.map(s => flightFacts(cellOf(s)!));

test('칸이 342개이고 슬러그가 겹치지 않는다', () => {
  assert.equal(CITY_COUNT, 19);
  assert.equal(FLIGHT_CITIES.length, 19);
  assert.equal(CELLS.length, 19 * 18);
  assert.equal(new Set(FLIGHT_SLUGS).size, CELLS.length);
  for (const slug of FLIGHT_SLUGS) {
    const c = cellOf(slug);
    assert.ok(c, `되돌아오지 않는다: ${slug}`);
    assert.equal(slugOf(c), slug);
    assert.notEqual(c.from, c.to, '자기 자신으로 가는 칸은 없다');
  }
  // 좌표를 적어 둔 도시가 cities.ts의 도시와 짝이 맞아야 한다
  for (const c of FLIGHT_CITIES) assert.ok(coordOf(c.id), `좌표가 없다: ${c.id}`);
  for (const id of Object.keys(COORDS)) assert.ok(cityOf(id), `cities.ts에 없다: ${id}`);
});

test('좌표가 지구 위에 있다', () => {
  for (const [id, p] of Object.entries(COORDS)) {
    assert.ok(p.lat >= -90 && p.lat <= 90, id);
    assert.ok(p.lon >= -180 && p.lon <= 180, id);
  }
  // 남반구 셋과 서반구 넷이 실제로 음수여야 한다
  assert.deepEqual(
    Object.entries(COORDS).filter(([, p]) => p.lat < 0).map(([id]) => id).sort(),
    ['auckland', 'saopaulo', 'sydney'],
  );
  assert.deepEqual(
    Object.entries(COORDS).filter(([, p]) => p.lon < 0).map(([id]) => id).sort(),
    ['chicago', 'london', 'losangeles', 'newyork', 'saopaulo'],
  );
});

test('거리가 공표된 항공 거리와 2% 안에서 맞는다', () => {
  for (const [a, b, want] of PUBLISHED_KM) {
    const got = distanceKm(coordOf(a)!, coordOf(b)!);
    const off = Math.abs(got - want) / want;
    assert.ok(off < 0.02, `${a}–${b}: ${Math.round(got)}km vs 공표 ${want}km (${(off * 100).toFixed(1)}% 차이)`);
  }
});

test('거리가 방향에 상관없고 삼각부등식을 지킨다', () => {
  for (const f of facts) {
    const back = flightFacts(cellOf(f.reverseSlug)!);
    assert.equal(back.km, f.km, `${f.slug} ↔ ${f.reverseSlug}`);
    assert.equal(back.miles, f.miles, f.slug);
  }
  // 서울을 거쳐 가면 곧장 가는 것보다 짧을 수 없다
  for (const a of FLIGHT_CITIES) {
    for (const b of FLIGHT_CITIES) {
      if (a.id === b.id) continue;
      const direct = distanceKm(coordOf(a.id)!, coordOf(b.id)!);
      const via = distanceKm(coordOf(a.id)!, coordOf('seoul')!) + distanceKm(coordOf('seoul')!, coordOf(b.id)!);
      assert.ok(via >= direct - 1e-6, `${a.id} → ${b.id}`);
    }
  }
});

test('어떤 두 점도 지구 둘레의 절반보다 멀 수 없다', () => {
  assert.equal(Math.round(MAX_DISTANCE_KM), 20015);
  for (const f of facts) {
    assert.ok(f.km > 0, f.slug);
    assert.ok(f.km <= MAX_DISTANCE_KM, f.slug);
    assert.ok(f.share > 0 && f.share <= 100, f.slug);
  }
  // 같은 점끼리는 0이고, 정확히 반대편은 지구 둘레의 절반이다
  assert.equal(distanceKm({ lat: 0, lon: 0 }, { lat: 0, lon: 0 }), 0);
  assert.ok(Math.abs(distanceKm({ lat: 0, lon: 0 }, { lat: 0, lon: 180 }) - MAX_DISTANCE_KM) < 1e-6);
  // 적도 한 바퀴의 4분의 1
  assert.ok(Math.abs(distanceKm({ lat: 0, lon: 0 }, { lat: 90, lon: 0 }) - MAX_DISTANCE_KM / 2) < 1e-6);
  assert.equal(EARTH_RADIUS_KM, 6371);
});

test('서울에서 뉴욕은 동쪽이 아니라 북쪽으로 떠난다', () => {
  // 평평한 지도에서는 오른쪽으로 가야 할 것 같지만 대권은 북극 쪽을 지난다
  const f = flightFacts(cellOf('seoul-to-newyork')!);
  assert.ok(f.bearing < 45 || f.bearing > 315, `방위 ${f.bearing}도`);
  assert.ok(['N', 'NNE', 'NE', 'NNW', 'NW'].includes(f.compass), f.compass);

  // 같은 위도를 서로 반대로 갈 때는 방위가 정확히 동·서다
  assert.equal(Math.round(bearingDeg({ lat: 0, lon: 0 }, { lat: 0, lon: 10 })), 90);
  assert.equal(Math.round(bearingDeg({ lat: 0, lon: 0 }, { lat: 0, lon: -10 })), 270);
  assert.equal(Math.round(bearingDeg({ lat: 0, lon: 0 }, { lat: 10, lon: 0 })), 0);
  assert.equal(compassOf(0), 'N');
  assert.equal(compassOf(90), 'E');
  assert.equal(compassOf(180), 'S');
  assert.equal(compassOf(270), 'W');
  assert.equal(COMPASS.length, 16);
});

test('방위를 벡터로 따로 구해도 같은 값이 나온다', () => {
  // 적도 위에서만 맞춰 보면 위도 보정이 빠져도 통과한다.
  // 여기서는 삼각함수 공식 대신 3차원 벡터로 접선면을 잡아 따로 구한다.
  const R = (d: number) => (d * Math.PI) / 180;
  const byVector = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) => {
    const unit = (p: { lat: number; lon: number }) => [
      Math.cos(R(p.lat)) * Math.cos(R(p.lon)),
      Math.cos(R(p.lat)) * Math.sin(R(p.lon)),
      Math.sin(R(p.lat)),
    ];
    const [ax, ay, az] = unit(a);
    const [bx, by, bz] = unit(b);
    const dot = ax * bx + ay * by + az * bz;
    // b에서 a 방향 성분을 걷어내면 a의 접선면에 놓인 방향만 남는다
    const d = [bx - dot * ax, by - dot * ay, bz - dot * az];
    const east = [-Math.sin(R(a.lon)), Math.cos(R(a.lon)), 0];
    const north = [
      -Math.sin(R(a.lat)) * Math.cos(R(a.lon)),
      -Math.sin(R(a.lat)) * Math.sin(R(a.lon)),
      Math.cos(R(a.lat)),
    ];
    const de = d[0] * east[0] + d[1] * east[1] + d[2] * east[2];
    const dn = d[0] * north[0] + d[1] * north[1] + d[2] * north[2];
    return ((Math.atan2(de, dn) * 180) / Math.PI + 360) % 360;
  };

  for (const f of facts) {
    const want = byVector(coordOf(f.fromId)!, coordOf(f.toId)!);
    const got = bearingDeg(coordOf(f.fromId)!, coordOf(f.toId)!);
    const gap = Math.abs(((want - got + 540) % 360) - 180);
    assert.ok(gap < 0.001, `${f.slug}: 공식 ${got.toFixed(3)}도 vs 벡터 ${want.toFixed(3)}도`);
  }

  // 같은 위도를 동쪽으로 가도 대권은 극 쪽으로 휜다 — 정동(90도)이 아니다
  const high = bearingDeg({ lat: 60, lon: 0 }, { lat: 60, lon: 10 });
  assert.ok(high < 90 && high > 80, `${high}도`);
  assert.ok(Math.abs(high - byVector({ lat: 60, lon: 0 }, { lat: 60, lon: 10 })) < 0.001);
});

test('비행시간이 범위로 나오고 순풍 쪽이 짧다', () => {
  for (const f of facts) {
    assert.ok(f.fastMinutes < f.slowMinutes, f.slug);
    assert.ok(f.fastMinutes > 0, f.slug);
    // 되짚을 때는 반올림한 km가 아니라 좌표에서 다시 잰 거리를 쓴다.
    // 방콕–하노이처럼 짧은 구간은 분 단위 반올림만으로도 속도가 크게 흔들린다.
    const raw = distanceKm(coordOf(f.fromId)!, coordOf(f.toId)!);
    assert.equal(f.fastMinutes, Math.round((raw / 920) * 60) + 30, `${f.slug} 순풍`);
    assert.equal(f.slowMinutes, Math.round((raw / 820) * 60) + 30, `${f.slug} 맞바람`);
  }
  // 서울–뉴욕은 열두 시간 언저리다
  const f = flightFacts(cellOf('seoul-to-newyork')!);
  const [h] = hoursOf(f.fastMinutes);
  assert.ok(h >= 12 && h <= 13, `${h}시간`);
  assert.deepEqual(hoursOf(125), [2, 5]);
  assert.deepEqual(hoursOf(60), [1, 0]);
});

test('시차가 방향에 따라 부호가 뒤집힌다', () => {
  for (const f of facts) {
    const back = flightFacts(cellOf(f.reverseSlug)!);
    // 0을 뒤집으면 -0이 되는데 strict 비교는 그 둘을 다르게 본다 — 합이 0인지로 본다
    assert.equal(back.winterShift + f.winterShift, 0, f.slug);
    assert.equal(back.summerShift + f.summerShift, 0, f.slug);
    assert.equal(Math.abs(back.winterShift), Math.abs(f.winterShift), f.slug);
    assert.equal(back.shiftVaries, f.shiftVaries, f.slug);
  }
});

test('서머타임 때문에 시차가 반년마다 바뀐다', () => {
  // 서울은 서머타임이 없고 뉴욕은 있다 — 그래서 시차가 14시간과 13시간을 오간다
  assert.equal(offsetMinutes('Asia/Seoul', WINTER_AT), 540);
  assert.equal(offsetMinutes('Asia/Seoul', SUMMER_AT), 540);
  assert.equal(offsetMinutes('America/New_York', WINTER_AT), -300);
  assert.equal(offsetMinutes('America/New_York', SUMMER_AT), -240);

  const f = flightFacts(cellOf('seoul-to-newyork')!);
  assert.equal(f.winterShift, -840);
  assert.equal(f.summerShift, -780);
  assert.equal(f.shiftVaries, true);

  // 서울–도쿄는 둘 다 서머타임이 없어 언제나 같다
  const t = flightFacts(cellOf('seoul-to-tokyo')!);
  assert.equal(t.winterShift, 0);
  assert.equal(t.shiftVaries, false);

  // 서머타임을 쓰는 도시가 실제로 여럿 있어야 이 검사가 뜻이 있다
  const varying = facts.filter(f => f.shiftVaries).length;
  assert.ok(varying > 100, `서머타임이 걸리는 칸이 ${varying}개뿐이다`);
});

test('도착 시각이 하루를 넘길 수 있다', () => {
  for (const f of facts) {
    assert.equal(f.arrivals.length, 3);
    for (const a of f.arrivals) {
      assert.match(a.arriveText, /^\d{2}:\d{2}$/, f.slug);
      const [h, m] = a.arriveText.split(':').map(Number);
      assert.ok(h >= 0 && h <= 23, f.slug);
      assert.ok(m >= 0 && m <= 59, f.slug);
      // 도착 시각을 되짚으면 출발 + 비행시간 + 시차가 나와야 한다
      const total = a.departHour * 60 + f.fastMinutes + f.winterShift;
      assert.equal(a.dayShift, Math.floor(total / 1440), f.slug);
      assert.equal(h * 60 + m, ((total % 1440) + 1440) % 1440, f.slug);
    }
  }
  // 서울 밤 10시에 떠나면 뉴욕에는 같은 날 아침에 닿는다 — 날짜선을 거슬러서다
  const night = flightFacts(cellOf('seoul-to-newyork')!).arrivals.find(a => a.departHour === 22)!;
  assert.equal(night.dayShift, 0);
  // 거꾸로 뉴욕에서 서울로 가면 날짜가 이틀 넘어간다 — 열세 시간을 날고 열네 시간을 더한다
  const back = flightFacts(cellOf('newyork-to-seoul')!).arrivals.find(a => a.departHour === 22)!;
  assert.equal(back.dayShift, 2);
  // 날짜가 하나도 안 넘어가는 칸과 이틀 넘어가는 칸이 둘 다 있어야 한다
  const shifts = new Set(facts.flatMap(f => f.arrivals.map(a => a.dayShift)));
  assert.ok(shifts.has(0) && shifts.has(1) && shifts.has(2), [...shifts].join(','));
  assert.ok(shifts.has(-1), '날짜선을 넘어 하루 앞서 닿는 칸도 있어야 한다');
});

test('되돌아가는 칸이 실제로 있는 슬러그다', () => {
  for (const f of facts) {
    assert.ok(cellOf(f.reverseSlug), `${f.slug} 의 반대 칸이 없다`);
    assert.equal(flightFacts(cellOf(f.reverseSlug)!).reverseSlug, f.slug);
  }
});
