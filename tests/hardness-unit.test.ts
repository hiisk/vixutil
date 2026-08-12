/**
 * 물 경도 단위 — 계수표를 믿지 않고 정의로 되짚는다.
 *
 * 이 섹션의 숫자는 전부 계수 다섯 개에서 나온다. 계수를 손으로 적어 두면
 * 자릿수가 하나 틀려도 120칸이 한꺼번에 조용히 어긋나고, **계수를 그대로 믿는
 * 검사는 그 어긋남을 못 본다** — 코드와 검사가 같은 틀린 값을 보기 때문이다.
 *
 * 그래서 두 겹으로 본다.
 *   1) 코드는 계수를 정의에서 만든다(facts.ts의 PPM_PER).
 *   2) 검사는 그 정의를 한 겹 더 되짚는다 — 몰질량은 원자량에서, 그레인은
 *      1/7000파운드에서, 미국 갤런은 231세제곱인치에서.
 *
 * **밖에서 확인해 주는 줄은 아래 PUBLISHED뿐이다.** 널리 인용되는 17.848·17.118·
 * 14.254·10·100.09다. 나머지 검사는 저장소 안의 값끼리 견주므로 몰질량과 갤런이
 * 함께 틀리면 서로 맞아떨어질 수 있고, 그때 이 표가 먼저 깨진다.
 *
 * 등급은 다르다. 환산은 정의된 값이지만 **등급 경계는 우리가 고른 값**이라
 * 밖에서 맞다고 해 줄 것이 없다. 그래서 등급 쪽 검사는 "맞는 값인가"가 아니라
 * "경계가 오름차순이고 한 칸씩만 바뀌는가"를 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BAND_EDGES, GRAIN_MG, HARDNESS_SLUGS, IMP_GALLON_L, MOLAR, CELLS, UNITS, US_GALLON_L,
  WRMG_MMOL, type UnitKey, ppmOf, slugOf, unitOf,
} from '../lib/hardness/list.ts';
import {
  ANCHORS, BAND_COUNT, PPM_PER, WRMG_EDGES,
  atBand, bandOf, hardnessFacts, nearestPpm, toPpm, toUnit, valueOf, wrmgBandOf,
} from '../lib/hardness/facts.ts';

/** 단위 열쇠 전부 — 검사가 하나도 빠뜨리지 않게 목록에서 뽑는다 */
const KEYS: UnitKey[] = UNITS.map(u => u.key);

/** 상대오차 */
const rel = (a: number, b: number): number => Math.abs(a - b) / Math.abs(b);

test('칸은 ppm 눈금 120개', () => {
  assert.equal(CELLS.length, 120);
  assert.ok(CELLS.length > 100, '칸이 100개를 넘어야 한다');
  assert.equal(new Set(HARDNESS_SLUGS).size, 120, 'slug가 겹친다');
  for (const ppm of CELLS) assert.equal(ppmOf(slugOf(ppm)), ppm, slugOf(ppm));

  // 눈금은 오름차순이어야 한다 — 이웃 잇기와 등급 단조성이 순서에 기댄다
  for (let i = 1; i < CELLS.length; i++) assert.ok(CELLS[i] > CELLS[i - 1], `${CELLS[i]}ppm`);

  /*
   * 눈금 규칙 그대로: 5~500은 5씩, 525~1000은 25씩. 손으로 적은 목록이 아니라
   * 규칙에서 나온 것이라, 규칙이 깨지면 여기서 걸린다.
   */
  assert.equal(CELLS[0], 5);
  assert.equal(CELLS[CELLS.length - 1], 1000);
  for (const ppm of CELLS) {
    const step = ppm <= 500 ? 5 : 25;
    assert.equal(ppm % step, 0, `${ppm}ppm이 ${step} 눈금에 안 맞는다`);
  }
  assert.equal(CELLS.filter(p => p <= 500).length, 100, '5~500이 100칸이 아니다');
  assert.equal(CELLS.filter(p => p > 500).length, 20, '525~1000이 20칸이 아니다');

  assert.equal(ppmOf('ppm-7'), undefined, '눈금에 없는 값이 열리면 안 된다');
  assert.equal(ppmOf('ppm-1005'), undefined, '눈금 밖이 열리면 안 된다');
  assert.equal(ppmOf('150'), undefined);
  assert.equal(ppmOf('PPM-150'), undefined, 'slug는 소문자 한 꼴만 열린다');
  assert.equal(ppmOf('ppm-150.0'), undefined, '같은 값의 다른 표기가 열리면 안 된다');
});

test('몰질량·그레인·갤런이 정의에서 되짚어진다', () => {
  /*
   * 계수의 뿌리가 이 네 값이다. 옮겨 적기가 틀리면 아래 PUBLISHED가 깨지지만,
   * 어느 값이 틀렸는지는 여기서만 드러난다.
   */
  // CaCO₃ = Ca + C + O₃, CaO = Ca + O. 원자량은 널리 쓰이는 값이다
  const ATOMIC = { ca: 40.078, c: 12.011, o: 15.999 };
  assert.ok(
    Math.abs(MOLAR.caco3 - (ATOMIC.ca + ATOMIC.c + 3 * ATOMIC.o)) < 0.01,
    `CaCO₃ 몰질량이 ${MOLAR.caco3} — 원자량 합은 ${ATOMIC.ca + ATOMIC.c + 3 * ATOMIC.o}`,
  );
  assert.ok(
    Math.abs(MOLAR.cao - (ATOMIC.ca + ATOMIC.o)) < 0.01,
    `CaO 몰질량이 ${MOLAR.cao} — 원자량 합은 ${ATOMIC.ca + ATOMIC.o}`,
  );
  // 두 몰질량의 비가 °dH를 지저분하게 만드는 자리다
  assert.ok(Math.abs(MOLAR.caco3 / MOLAR.cao - 1.7848) < 0.0005, `비가 ${MOLAR.caco3 / MOLAR.cao}`);

  // 1그레인 = 1/7000파운드, 1파운드 = 453.59237g(정의값)
  assert.ok(Math.abs(GRAIN_MG - 453.59237 / 7) < 1e-9, `그레인이 ${GRAIN_MG}mg`);
  // 미국 갤런 = 231세제곱인치, 1인치 = 2.54cm(정의값)
  assert.ok(Math.abs(US_GALLON_L - (231 * 2.54 ** 3) / 1000) < 1e-9, `미국 갤런이 ${US_GALLON_L}L`);
  // 영국 갤런은 1985년에 이 값으로 정의됐다 — 더 되짚을 것이 없다
  assert.equal(IMP_GALLON_L, 4.54609);
  // 영국 갤런이 미국 갤런보다 크다 — 두 갤런을 맞바꿔 적으면 여기서 걸린다
  assert.ok(IMP_GALLON_L > US_GALLON_L, '갤런 둘이 뒤바뀌었다');
});

test('계수 다섯이 정의에서 나온다', () => {
  /*
   * 정의를 식으로 다시 쓴 것과 코드가 같은지 본다. 코드가 계수를 적어 두는
   * 쪽으로 바뀌면 이 줄들이 깨진다 — 그것이 이 검사의 목적이다.
   */
  assert.equal(PPM_PER.ppm, 1, 'ppm은 자기 자신이라 1이어야 한다');
  // 독일 도: 10mg/L CaO를 CaCO₃ 셈으로 옮긴다
  assert.ok(Math.abs(PPM_PER.dh - 10 * (MOLAR.caco3 / MOLAR.cao)) < 1e-12);
  // 프랑스 도: 정의가 10mg/L CaCO₃라 비가 끼지 않는다 — 딱 10이다
  assert.equal(PPM_PER.fh, 10);
  // 영국 도: CaCO₃ 1그레인 / 영국 갤런
  assert.ok(Math.abs(PPM_PER.e - GRAIN_MG / IMP_GALLON_L) < 1e-12);
  // 미국 gpg: 같은 그레인을 미국 갤런으로
  assert.ok(Math.abs(PPM_PER.gpg - GRAIN_MG / US_GALLON_L) < 1e-12);
  // mmol/L: 몰질량 그대로
  assert.equal(PPM_PER.mmol, MOLAR.caco3);

  /*
   * 두 갤런의 비가 두 그레인 단위의 비다. 그레인이 약분되므로 그레인을 틀리게
   * 적어도 이 줄은 통과한다 — 갤런만 보는 자리다.
   */
  assert.ok(Math.abs(PPM_PER.e / PPM_PER.gpg - US_GALLON_L / IMP_GALLON_L) < 1e-12);
  // 같은 "10mg/L에 1도"인데 물질이 달라 1.78배 벌어진다
  assert.ok(Math.abs(PPM_PER.dh / PPM_PER.fh - MOLAR.caco3 / MOLAR.cao) < 1e-12);

  // 모든 계수가 양수여야 한다 — 부호가 뒤집히면 환산이 조용히 음수가 된다
  for (const k of KEYS) assert.ok(PPM_PER[k] > 0, `${k} 계수가 ${PPM_PER[k]}`);
});

test('널리 인용되는 계수와 맞는다', () => {
  /*
   * 저장소 밖에서 확인해 주는 유일한 줄. 어느 자료를 펴도 같은 값이 적혀 있다.
   * 몰질량이나 갤런을 잘못 옮겨 적으면 여기가 먼저 깨진다.
   */
  const PUBLISHED: [UnitKey, number, number][] = [
    // [단위, 1단위가 몇 ppm인가, 허용 오차]
    ['dh', 17.848, 0.001],
    ['fh', 10, 0],
    ['e', 14.254, 0.001],
    ['gpg', 17.118, 0.001],
    ['mmol', 100.09, 0.001],
  ];
  for (const [key, ppm, tol] of PUBLISHED) {
    assert.ok(Math.abs(PPM_PER[key] - ppm) <= tol, `1 ${unitOf(key)?.symbol} = ${PPM_PER[key]}ppm인데 ${ppm}으로 알려져 있다`);
  }

  /*
   * 널리 도는 어림도 함께 본다 — "150ppm은 8.4°dH", "1gpg는 17.1ppm",
   * "10°dH는 178ppm"처럼 사람이 외워 쓰는 값들이다.
   */
  assert.equal(valueOf(hardnessFacts(150), 'dh'), 8.4);
  assert.equal(valueOf(hardnessFacts(150), 'fh'), 15);
  assert.equal(valueOf(hardnessFacts(150), 'gpg'), 8.76);
  assert.ok(Math.abs(toPpm(10, 'dh') - 178.5) < 0.1, `10°dH가 ${toPpm(10, 'dh')}ppm`);
  assert.ok(Math.abs(toPpm(1, 'gpg') - 17.1) < 0.05);
  assert.ok(Math.abs(toUnit(100, 'mmol') - 1) < 0.001, '100ppm은 약 1mmol/L이다');
});

test('ppm → 각 단위 → ppm이 제자리로 돌아온다', () => {
  for (const ppm of CELLS) {
    for (const key of KEYS) {
      const there = toUnit(ppm, key);
      const back = toPpm(there, key);
      assert.ok(Math.abs(back - ppm) < 1e-9, `${ppm}ppm → ${key} ${there} → ${back}ppm`);
      // 되돌림을 두 번 더 돌려도 어긋나지 않는다
      assert.ok(Math.abs(toPpm(toUnit(back, key), key) - ppm) < 1e-9, `${ppm}ppm ${key} 두 바퀴`);
    }
    /*
     * 단위끼리 곧바로 옮겨도 같아야 한다 — ppm을 거치지 않는 길이다.
     * °dH로 적힌 값을 gpg로 바꾸는 것이 실제로 사람이 하는 일이다.
     */
    for (const from of KEYS) {
      for (const to of KEYS) {
        const direct = toUnit(ppm, from) * (PPM_PER[from] / PPM_PER[to]);
        assert.ok(Math.abs(direct - toUnit(ppm, to)) < 1e-9, `${ppm}ppm ${from}→${to}`);
      }
    }
  }
  // 화면에 나가는(자리를 자른) 값으로도 그 자리 안에서 돌아온다
  for (const ppm of CELLS) {
    const f = hardnessFacts(ppm);
    for (const u of f.values) {
      const back = toPpm(u.value, u.key);
      const tol = toPpm(0.5 * 10 ** -u.digits, u.key);
      assert.ok(Math.abs(back - ppm) <= tol + 1e-9, `${ppm}ppm ${u.key} 자른 값으로 ${back}ppm`);
    }
  }
});

test('값이 두 배면 모든 단위도 두 배, 0에서는 모두 0', () => {
  for (const key of KEYS) {
    assert.equal(toUnit(0, key), 0, `${key}: 0ppm이 0이 아니다`);
    assert.equal(toPpm(0, key), 0, `${key}: 0단위가 0ppm이 아니다`);
  }
  for (const ppm of CELLS) {
    for (const key of KEYS) {
      const one = toUnit(ppm, key);
      assert.ok(Math.abs(toUnit(ppm * 2, key) - one * 2) < 1e-9, `${ppm}ppm ${key} 두 배`);
      assert.ok(Math.abs(toUnit(ppm / 2, key) - one / 2) < 1e-9, `${ppm}ppm ${key} 절반`);
      assert.ok(Math.abs(toUnit(ppm * 10, key) - one * 10) < 1e-9, `${ppm}ppm ${key} 열 배`);
      // 더하기도 그대로 통한다 — 환산이 곱셈뿐이라는 뜻이다
      assert.ok(Math.abs(toUnit(ppm + 5, key) - (one + toUnit(5, key))) < 1e-9, `${ppm}ppm ${key} 덧셈`);
    }
    // 눈금을 따라 어느 단위로 적어도 값이 줄지 않는다
    const f = hardnessFacts(ppm);
    assert.equal(f.doublePpm, ppm * 2);
    assert.ok(Math.abs(f.halfPpm - ppm / 2) < 0.05, `${ppm}ppm 절반이 ${f.halfPpm}`);
  }
  for (let i = 1; i < CELLS.length; i++) {
    for (const key of KEYS) {
      assert.ok(toUnit(CELLS[i], key) > toUnit(CELLS[i - 1], key), `${CELLS[i]}ppm ${key}에서 값이 줄었다`);
    }
  }
});

test('등급 경계가 오름차순이고 경계에서 한 칸씩만 바뀐다', () => {
  assert.equal(BAND_COUNT, BAND_EDGES.length + 1);
  assert.equal(BAND_COUNT, 4);
  for (let i = 1; i < BAND_EDGES.length; i++) {
    assert.ok(BAND_EDGES[i] > BAND_EDGES[i - 1], `경계 ${BAND_EDGES[i]}가 앞보다 작다`);
  }
  for (let i = 1; i < WRMG_MMOL.length; i++) {
    assert.ok(WRMG_MMOL[i] > WRMG_MMOL[i - 1], `WRMG 경계 ${WRMG_MMOL[i]}가 앞보다 작다`);
  }

  // 경계 바로 위에서 정확히 한 칸 오른다 — 경계값 자신은 아래 등급이다
  BAND_EDGES.forEach((edge, i) => {
    assert.equal(bandOf(edge), i, `${edge}ppm이 아래 등급에 안 들어간다`);
    assert.equal(bandOf(edge + 0.001), i + 1, `${edge}ppm 위에서 등급이 한 칸 오르지 않는다`);
  });
  WRMG_MMOL.forEach((mmol, i) => {
    assert.equal(wrmgBandOf(toPpm(mmol, 'mmol')), i, `WRMG ${mmol}mmol/L이 아래 등급에 안 들어간다`);
    assert.equal(wrmgBandOf(toPpm(mmol, 'mmol') + 0.001), i + 1, `WRMG ${mmol}mmol/L 위에서 한 칸 오르지 않는다`);
  });

  // 눈금을 따라 등급은 줄지 않고, 한 번에 두 칸 뛰지도 않는다
  let prev = 0;
  for (const ppm of CELLS) {
    const b = bandOf(ppm);
    assert.ok(b >= prev, `${ppm}ppm에서 등급이 내려갔다`);
    assert.ok(b - prev <= 1, `${ppm}ppm에서 등급이 두 칸 뛰었다`);
    assert.ok(b >= 0 && b < BAND_COUNT, `${ppm}ppm 등급이 ${b}`);
    prev = b;
  }
  // 등급 넷이 모두 칸을 갖는다 — 비면 화면에 빈 줄이 생긴다
  for (let b = 0; b < BAND_COUNT; b++) assert.ok(atBand(b).length > 0, `등급 ${b}이 비었다`);
  assert.equal(atBand(0).length + atBand(1).length + atBand(2).length + atBand(3).length, CELLS.length);

  /*
   * WRMG 경계를 되짚은 값 — 그 법이 8.4·14°dH로 적어 둔 자리다.
   * 밖에서 확인해 주는 값이라, 계수가 틀리면 여기서도 걸린다.
   */
  assert.deepEqual(WRMG_EDGES.map(e => e.ppm), [150.1, 250.2]);
  assert.ok(Math.abs(WRMG_EDGES[0].dh - 8.4) < 0.02, `WRMG 아래 경계가 ${WRMG_EDGES[0].dh}°dH`);
  assert.ok(Math.abs(WRMG_EDGES[1].dh - 14) < 0.03, `WRMG 위 경계가 ${WRMG_EDGES[1].dh}°dH`);

  /*
   * 두 기준이 실제로 다른 답을 낸다. 150ppm은 이 표에서 "경수"(2)이고 WRMG로는
   * "연수"(0)다 — 이 어긋남이 이 섹션이 열 언어로 밝히는 요지이므로, 사라지면
   * 화면의 설명이 거짓이 된다.
   */
  assert.equal(bandOf(150), 2);
  assert.equal(wrmgBandOf(150), 0);
  assert.notEqual(bandOf(150), wrmgBandOf(150), '두 기준이 같은 답을 내면 설명이 거짓이 된다');
});

test('되짚기 색인이 실제 칸을 가리킨다', () => {
  assert.equal(ANCHORS.length, 30, '단위 다섯 × 어림수 여섯이 아니다');
  for (const a of ANCHORS) {
    assert.notEqual(a.key, 'ppm', 'ppm은 축 자신이라 색인에 있으면 안 된다');
    assert.ok(unitOf(a.key), `${a.key}가 단위 목록에 없다`);
    assert.equal(ppmOf(a.slug), a.ppm, `${a.slug}가 없는 칸이다`);
    // 그 단위의 값을 ppm으로 옮긴 값과 가리키는 칸이 가장 가까운 짝이어야 한다
    assert.ok(Math.abs(a.exact - toPpm(a.value, a.key)) < 0.1, `${a.value}${a.key} 되짚기`);
    assert.equal(a.ppm, nearestPpm(toPpm(a.value, a.key)), `${a.value}${a.key}가 가장 가까운 칸이 아니다`);
    assert.ok(a.value > 0);
  }
  // 단위마다 여섯씩, 값은 오름차순이고 겹치지 않는다
  for (const key of KEYS.filter(k => k !== 'ppm')) {
    const mine = ANCHORS.filter(a => a.key === key);
    assert.equal(mine.length, 6, `${key} 어림수가 여섯이 아니다`);
    for (let i = 1; i < mine.length; i++) assert.ok(mine[i].value > mine[i - 1].value, `${key} 어림수 순서`);
    assert.equal(new Set(mine.map(a => a.value)).size, 6, `${key} 어림수가 겹친다`);
  }
});

test('이웃 링크가 모든 칸에 들어온다', () => {
  /*
   * 앞에서 N개를 잘라 오면 줄의 앞쪽만 서로 가리키고 뒤쪽 칸은 들어오는 링크가
   * 0이 된다 — 사이트맵에는 있고 아무도 안 가리키는 낱장이다. lib/related-window.ts가
   * 자기 자리 다음부터 원형으로 감으므로 120칸이 정확히 같은 수만큼 가리켜진다.
   */
  const deg = new Map<string, number>(CELLS.map(ppm => [slugOf(ppm), 0]));
  for (const ppm of CELLS) {
    const f = hardnessFacts(ppm);
    assert.equal(f.neighbours.length, 6, `${f.slug}: 이웃이 여섯이 아니다`);
    assert.equal(new Set(f.neighbours).size, 6, `${f.slug}: 이웃이 겹친다`);
    for (const s of f.neighbours) {
      assert.notEqual(s, f.slug, `${f.slug}: 자기를 가리킨다`);
      assert.ok(ppmOf(s) !== undefined, `${f.slug} → ${s}: 없는 칸을 가리킨다`);
      deg.set(s, deg.get(s)! + 1);
    }
  }
  const counts = [...deg.values()];
  assert.equal(Math.min(...counts), 6, '들어오는 링크가 여섯보다 적은 칸이 있다');
  assert.equal(Math.max(...counts), 6, '들어오는 링크가 여섯보다 많은 칸이 있다');
});

test('한 칸이 여섯 단위를 자리까지 자른 값으로 들고 있다', () => {
  for (const ppm of CELLS) {
    const f = hardnessFacts(ppm);
    assert.equal(f.ppm, ppm);
    assert.equal(f.slug, slugOf(ppm));
    assert.equal(f.values.length, UNITS.length);
    assert.deepEqual(f.values.map(u => u.key), KEYS, `${f.slug}: 단위 순서가 다르다`);
    for (const u of f.values) {
      assert.equal(u.symbol, unitOf(u.key)?.symbol, `${f.slug} ${u.key} 기호`);
      const want = toUnit(ppm, u.key);
      const k = 10 ** u.digits;
      assert.equal(u.value, Math.round(want * k) / k, `${f.slug} ${u.key}: ${u.value} vs ${want}`);
      assert.ok(u.value > 0, `${f.slug} ${u.key}가 0으로 잘렸다`);
      /*
       * 자리를 자르는 것이 값을 망가뜨리지 않는지 — digits를 하나 줄이면 작은 칸에서
       * 먼저 드러난다(5ppm의 mmol/L는 0.04995라 자리가 둘이면 0.05가 아니라 0.05로도
       * 못 남는다). 1% 안이면 화면의 값과 셈의 값이 같은 물을 말한다.
       */
      assert.ok(rel(u.value, want) < 0.01, `${f.slug} ${u.key}: 자르면서 ${u.value}로 어긋났다(${want})`);
    }
    // ppm 열은 자기 자신이라 잘려도 그대로여야 한다
    assert.equal(valueOf(f, 'ppm'), ppm, `${f.slug}: ppm 열이 자기 값과 다르다`);
    // 같은 물인데 °fH가 ppm보다 크거나 mmol/L가 ppm보다 크면 계수가 뒤집힌 것이다
    assert.ok(valueOf(f, 'fh') < ppm, `${f.slug}: °fH가 ppm보다 크다`);
    assert.ok(valueOf(f, 'dh') < valueOf(f, 'fh'), `${f.slug}: °dH가 °fH보다 크다`);
    assert.ok(valueOf(f, 'mmol') < valueOf(f, 'dh'), `${f.slug}: mmol/L가 °dH보다 크다`);
  }
});

test('눈금에 없는 값을 넣으면 조용히 답하지 않는다', () => {
  assert.throws(() => hardnessFacts(7), /눈금에 없는 경도/);
  assert.throws(() => hardnessFacts(0), /눈금에 없는 경도/);
  assert.throws(() => hardnessFacts(1500), /눈금에 없는 경도/);
  assert.throws(() => hardnessFacts(-5), /눈금에 없는 경도/);
});
