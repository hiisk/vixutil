/**
 * 노출값 — 로그로 낸 EV와 눈금을 세어 낸 EV가 맞는지 본다.
 *
 * lib/exposure 는 EV를 눈금 번호의 덧셈으로 낸다. 여기서는 그 길을 쓰지 않고
 * 로그 정의(EV = log2(N²/t))로 되짚고, 새겨진 숫자가 반올림이라서 생기는
 * 어긋남이 얼마인지까지 못으로 박는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  APERTURES, BASE_ISO, CELLS, EXPOSURE_SLUGS, SHUTTERS,
  cellOf, secondsOf, shutterLabel, slugOf,
} from '../lib/exposure/list.ts';
import { evAtIso, evOf, evStops, exposureFacts, lightOf } from '../lib/exposure/facts.ts';

const facts = EXPOSURE_SLUGS.map(s => exposureFacts(cellOf(s)!));

test('칸이 209개이고 슬러그가 겹치지 않는다', () => {
  assert.equal(APERTURES.length, 11);
  assert.equal(SHUTTERS.length, 19);
  assert.equal(CELLS.length, 11 * 19);
  assert.equal(new Set(EXPOSURE_SLUGS).size, CELLS.length);
  for (const slug of EXPOSURE_SLUGS) {
    const c = cellOf(slug);
    assert.ok(c, `되돌아오지 않는다: ${slug}`);
    assert.equal(slugOf(c), slug);
  }
});

test('EV 0은 f/1.0에서 1초다', () => {
  const f = exposureFacts(cellOf('f1-1s')!);
  assert.equal(f.ev, 0);
  assert.equal(f.evPrinted, 0);
  assert.equal(f.seconds, 1);
  // 정의 쪽에서도 0이 나와야 한다
  assert.equal(evOf(1, 1), 0);
});

test('눈금을 한 칸 옮기면 EV가 정확히 1 움직인다', () => {
  for (let i = 0; i + 1 < APERTURES.length; i++) {
    for (let j = 0; j < SHUTTERS.length; j++) {
      assert.equal(evStops(i + 1, j) - evStops(i, j), 1, `조리개 ${APERTURES[i]} → ${APERTURES[i + 1]}`);
    }
  }
  for (let j = 0; j + 1 < SHUTTERS.length; j++) {
    // 목록은 빠른 셔터부터 적혀 있으므로 뒤로 갈수록 EV가 내려간다
    assert.equal(evStops(0, j) - evStops(0, j + 1), 1, `셔터 ${shutterLabel(SHUTTERS[j])}`);
  }
});

test('로그로 낸 EV가 눈금을 세어 낸 EV와 1/5스톱 안에서 맞는다', () => {
  for (const f of facts) {
    const byLog = evOf(f.aperture, f.seconds);
    assert.ok(
      Math.abs(byLog - f.ev) < 0.2,
      `${f.slug}: 로그 ${byLog.toFixed(3)} vs 눈금 ${f.ev}`,
    );
    // 어긋남은 두 축의 어긋남을 더한 것이어야 한다
    assert.ok(Math.abs(f.drift - (f.apertureDrift + f.shutterDrift)) < 1e-9, f.slug);
  }
});

test('눈금과 정확히 맞는 조리개는 여섯 개뿐이다', () => {
  const exact = APERTURES.filter(n => Number.isInteger(2 * Math.log2(n)));
  assert.deepEqual(exact, [1, 2, 4, 8, 16, 32]);
  // f/1.4·2.8·5.6은 √2 계열을 깎은 것이고, f/11·22는 더 많이 깎았다
  const f11 = exposureFacts(cellOf('f11-1s')!);
  assert.equal(f11.apertureDrift, -0.081);
  const f14 = exposureFacts(cellOf('f1-4-1s')!);
  assert.equal(f14.apertureDrift, -0.029);
});

test('눈금과 정확히 맞는 셔터는 일곱 개뿐이다', () => {
  const exact = SHUTTERS.filter(s => Number.isInteger(Math.log2(1 / secondsOf(s))));
  assert.deepEqual(exact.map(shutterLabel), ['1/8', '1/4', '1/2', '1"', '2"', '4"', '8"']);
  // 여섯 조리개 × 일곱 셔터 = 정확히 맞는 칸 마흔둘
  assert.equal(exact.length * 6, 42);
  // 1/60초는 사실 1/64초 자리, 1/125초는 1/128초 자리다
  assert.equal(exposureFacts(cellOf('f1-1-60')!).shutterDrift, -0.093);
  assert.equal(exposureFacts(cellOf('f1-1-125')!).shutterDrift, -0.034);
});

test('어긋남이 가장 큰 칸이 f/11·f/22와 느린 1/60 계열에서 만난다', () => {
  const worst = facts.reduce((a, b) => (Math.abs(b.drift) > Math.abs(a.drift) ? b : a));
  assert.equal(Math.abs(worst.drift), 0.174);
  const names = facts.filter(f => Math.abs(f.drift) === 0.174).map(f => f.slug).sort();
  assert.deepEqual(names, [
    'f11-1-15', 'f11-1-30', 'f11-1-60',
    'f22-1-15', 'f22-1-30', 'f22-1-60',
  ]);
  // 정확히 맞는 칸도 있다 — 두 축이 다 깎이지 않은 자리다
  assert.equal(facts.filter(f => f.exact).length, 42);
});

test('같은 EV의 칸들이 표의 대각선을 이룬다', () => {
  for (const f of facts) {
    for (const e of f.equivalents) {
      const other = exposureFacts(cellOf(e.slug)!);
      assert.equal(other.ev, f.ev, `${f.slug} ↔ ${e.slug}`);
      // 조리개를 한 칸 조였으면 셔터도 정확히 한 칸 느려야 한다
      const di = APERTURES.indexOf(other.aperture) - APERTURES.indexOf(f.aperture);
      const dj = other.cell.shutter - f.cell.shutter;
      assert.equal(di, dj, `${f.slug} ↔ ${e.slug} 는 대각선이 아니다`);
    }
    assert.ok(!f.equivalents.some(e => e.slug === f.slug), f.slug);
  }
  // 대각선의 길이는 자리마다 다르다 — 가장 긴 줄이 열한 칸이다
  const longest = Math.max(...facts.map(f => f.equivalents.length + 1));
  assert.equal(longest, 11);
});

test('EV마다 칸 수가 대각선의 길이와 같다', () => {
  const byEv = new Map<number, number>();
  for (const f of facts) byEv.set(f.ev, (byEv.get(f.ev) ?? 0) + 1);
  // EV는 −5(f/1·30초)부터 23(f/32·1/8000)까지 스물아홉 가지다
  assert.equal(byEv.size, 29);
  assert.equal(Math.min(...byEv.keys()), -5);
  assert.equal(Math.max(...byEv.keys()), 23);
  for (const f of facts) assert.equal(byEv.get(f.ev), f.equivalents.length + 1, f.slug);
  assert.equal([...byEv.values()].reduce((a, b) => a + b, 0), CELLS.length);
});

test('감도를 두 배로 올리면 EV가 정확히 1 오른다', () => {
  for (const f of facts) {
    const rows = f.isoRows;
    assert.equal(rows.find(r => r.iso === BASE_ISO)!.ev, f.ev);
    for (let k = 0; k + 1 < rows.length; k++) {
      assert.equal(rows[k + 1].ev - rows[k].ev, 1, `${f.slug} ISO ${rows[k].iso}`);
    }
  }
  assert.equal(evAtIso(10, 400), 12);
  assert.equal(evAtIso(10, 50), 9);
});

test('맑은 날 f/16 규칙이 EV 15에 떨어진다', () => {
  const sunny = facts.filter(f => f.sunny16);
  assert.equal(sunny.length, 1);
  const f = sunny[0];
  assert.equal(f.apertureText, 'f/16');
  assert.equal(f.shutterText, '1/125');
  assert.equal(f.ev, 15);
  assert.equal(f.light, 'sunny');
  // ISO 100에서 셔터를 감도 분의 1로 두라는 규칙 그대로다
  assert.ok(Math.abs(f.seconds - 1 / BASE_ISO) < 1 / 100);
});

test('문장에 넣는 셔터 표기에는 따옴표가 붙지 않는다', () => {
  // 눈금 표기는 1"이지만 뒤에 '초'를 붙이면 1"초가 되어 단위가 겹친다
  const oneSec = exposureFacts(cellOf('f1-1s')!);
  assert.equal(oneSec.shutterText, '1"');
  assert.equal(oneSec.shutterProse, '1');
  const fast = exposureFacts(cellOf('f1-1-125')!);
  assert.equal(fast.shutterText, '1/125');
  assert.equal(fast.shutterProse, '1/125');
  for (const f of facts) {
    assert.ok(!f.shutterProse.includes('"'), f.slug);
    assert.equal(f.shutterProse.includes('/'), f.shutter.den !== 1, f.slug);
  }
});

test('EV가 가리키는 빛이 널리 쓰이는 기준점을 따른다', () => {
  assert.equal(lightOf(15), 'sunny');
  assert.equal(lightOf(13), 'cloudy');
  assert.equal(lightOf(10), 'shade');
  assert.equal(lightOf(7), 'indoor');
  // 사이 값은 가까운 쪽으로 읽는다
  assert.equal(lightOf(14), 'hazy');
  assert.equal(lightOf(11), 'overcast');
  // 범위 밖은 양 끝으로 떨어진다
  assert.equal(lightOf(30), 'snow');
  assert.equal(lightOf(-20), 'night');
});
