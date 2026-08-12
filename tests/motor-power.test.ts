/**
 * 모터 출력·토크·회전수 — 계수를 믿지 않고 2π로 되짚는다.
 *
 * 이 섹션의 숫자는 전부 한 식에서 나온다. P(W) = T(N·m) × ω(rad/s), ω = 2π n ÷ 60.
 * 그래서 검사도 그 식을 되짚는 쪽으로 쓴다 — 널리 인용되는 9550 계수를 그대로
 * 믿지 않고 60000과 2π로 만들어 맞춰 보고, 그 값이 토크를 rad/s로 직접 나눈 값과
 * 어긋나지 않는지 본다.
 *
 * **밖에서 확인해 주는 줄은 세 개다.** 마력 둘과 중력이다: 미터법 마력은 75kgf·m/s로,
 * 영국 마력은 550lb·ft/s로 정의되어 있으므로, PS_WATT는 75 × 9.80665와 같아야 하고
 * HP_WATT는 550 × 1lb·ft와 같아야 한다. 나머지 검사는 모두 저장소 안의 값끼리
 * 견주므로, 정의로 되짚는 그 세 줄이 먼저 깨져야 우리가 알아챌 수 있다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CELLS, FREQS, POLES, POWERS, SPEEDS, cellOf, slugOf, speedOf } from '../lib/motor/list.ts';
import {
  GEAR_EFF, GRAVITY, HP_WATT, LBFT_NM, PS_WATT, RATIOS, SLIP, TORQUE_COEF, VOLTS,
  classOf, currentOf, motorFacts, omegaOf, powerOf, torqueOf,
} from '../lib/motor/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return motorFacts(c);
};

/** 상대오차 */
const rel = (a: number, b: number): number => Math.abs(a - b) / Math.abs(b);

/**
 * 유효숫자 셋으로 자른 값과 견줄 때의 허용 오차.
 *
 * 화면에 나가는 값은 0.265·11.7·955처럼 세 자리로 잘려 있다. 앞자리가 1일 때
 * 상대오차가 가장 커서 0.5%까지 벌어지므로(1.005 → 1.00), 자른 값과 원래 값을
 * 견주는 자리에서는 이 값을 쓴다. 자르지 않은 함수끼리는 1e-9으로 본다.
 */
const SIG3 = 0.006;

test('칸은 출력 17가지 × 회전수 8가지', () => {
  assert.equal(POWERS.length, 17);
  assert.equal(SPEEDS.length, 8);
  assert.equal(CELLS.length, 136);
  assert.ok(CELLS.length > 100, '칸이 100개를 넘어야 한다');
  assert.equal(new Set(CELLS.map(slugOf)).size, 136, 'slug가 겹친다');
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));

  // 출력 축은 오름차순이어야 한다 — 단조성 검사가 순서에 기댄다
  for (let i = 1; i < POWERS.length; i++) assert.ok(POWERS[i] > POWERS[i - 1], `${POWERS[i]}kW`);
  // 자릿수 실수를 잡는다 — kW지 W나 마력이 아니다
  for (const kw of POWERS) assert.ok(kw >= 0.1 && kw <= 75, `${kw}kW`);
  // 규격 계열의 표지 — 이 넷이 빠지면 사람이 찾는 자리가 사라진다
  for (const kw of [0.75, 2.2, 7.5, 22]) assert.ok(POWERS.includes(kw), `${kw}kW가 축에 없다`);

  assert.equal(cellOf('2-2kw'), undefined);
  assert.equal(cellOf('2-3kw-1800rpm'), undefined, '축에 없는 출력이 열리면 안 된다');
  assert.equal(cellOf('2-2kw-1700rpm'), undefined, '축에 없는 회전수가 열리면 안 된다');
  assert.equal(cellOf('2-2KW-1800RPM'), undefined, 'slug는 소문자 한 꼴만 열린다');
  assert.equal(cellOf('2.2kw-1800rpm'), undefined, '소수점은 하이픈으로 눕힌 꼴만 열린다');
});

test('동기속도는 120 × 주파수 ÷ 극수다', () => {
  /*
   * 회전수를 손으로 적지 않고 만드는 자리. 3000rpm에 60Hz가 붙는 식의 짝이
   * 아예 생기지 않는지를 본다 — 주파수를 50으로 바꾸면 여덟 값이 모두 따라 바뀐다.
   */
  assert.deepEqual(FREQS, [60, 50]);
  assert.deepEqual(POLES, [2, 4, 6, 8]);
  for (const s of SPEEDS) {
    assert.equal(s.rpm, (120 * s.hz) / s.poles, `${s.hz}Hz ${s.poles}극`);
    assert.equal(s.rpm, Math.round(s.rpm), `${s.hz}Hz ${s.poles}극: 회전수가 정수가 아니다`);
    assert.equal(speedOf(s.rpm), s, `${s.rpm}rpm을 되찾지 못한다`);
  }
  // 여덟 값이 서로 겹치지 않아야 회전수 하나로 주파수·극수가 정해진다
  assert.equal(new Set(SPEEDS.map(s => s.rpm)).size, 8);
  assert.deepEqual(SPEEDS.filter(s => s.hz === 60).map(s => s.rpm), [3600, 1800, 1200, 900]);
  assert.deepEqual(SPEEDS.filter(s => s.hz === 50).map(s => s.rpm), [3000, 1500, 1000, 750]);
  assert.equal(speedOf(1750), undefined, '명판 회전수는 축이 아니다 — 축은 동기속도다');

  // 같은 극수의 60Hz와 50Hz는 정확히 6대 5다
  for (const p of POLES) {
    const a = SPEEDS.find(s => s.hz === 60 && s.poles === p)!;
    const b = SPEEDS.find(s => s.hz === 50 && s.poles === p)!;
    assert.ok(Math.abs(a.rpm / b.rpm - 6 / 5) < 1e-12, `${p}극: ${a.rpm} vs ${b.rpm}`);
  }
});

test('9550 계수는 60000과 2π에서 나온다', () => {
  /*
   * 계수를 외워 적으면 자릿수가 하나 틀려도 136칸이 한꺼번에 조용히 어긋난다.
   * 그래서 코드는 계수를 만들고, 검사는 그것이 널리 인용되는 값인지 확인한다 —
   * 60000을 6000으로 잘못 적으면 954.9가 되어 이 줄에서 걸린다.
   */
  assert.ok(Math.abs(TORQUE_COEF - 60000 / (2 * Math.PI)) < 1e-9, `계수가 ${TORQUE_COEF}`);
  assert.ok(Math.abs(TORQUE_COEF - 9549.2966) < 1e-3, `계수가 ${TORQUE_COEF}`);
  // 널리 쓰는 9550은 이 값을 올려 적은 것 — 0.01% 안에서 같다
  assert.ok(rel(9550, TORQUE_COEF) < 0.0001, `9550과 ${TORQUE_COEF}가 너무 벌어졌다`);
  assert.ok(9550 > TORQUE_COEF, '9550은 올려 적은 값이어야 한다');

  for (const c of CELLS) {
    // 각속도는 회전수를 초당 라디안으로 옮긴 값이다
    const w = (2 * Math.PI * c.rpm) / 60;
    assert.ok(Math.abs(omegaOf(c.rpm) - w) < 1e-12, `${c.rpm}rpm`);
    // rad/s로 직접 나눈 값과, 계수 × kW ÷ rpm이 같아야 한다
    const byOmega = (c.kw * 1000) / w;
    const byCoef = (TORQUE_COEF * c.kw) / c.rpm;
    assert.ok(Math.abs(torqueOf(c.kw, c.rpm) - byOmega) < 1e-12, slugOf(c));
    assert.ok(rel(byCoef, byOmega) < 1e-12, `${slugOf(c)}: 계수 ${byCoef} vs rad/s ${byOmega}`);
    // 낱장이 들고 다니는 값도 같은 식에서 나와야 한다(유효숫자 셋으로 잘린 값이다)
    assert.ok(rel(motorFacts(c).torque, byOmega) < SIG3, `${slugOf(c)}: ${motorFacts(c).torque}`);
  }
});

test('출력 → 토크 → 출력이 왕복한다', () => {
  /*
   * 한쪽 방향만 맞는 식은 계수가 틀려도 스스로 어긋나지 않는다. 되짚어 원래 출력이
   * 나오는지 보고, 회전수를 바꿔 넣어도 왕복이 유지되는지 함께 본다.
   */
  for (const c of CELLS) {
    const t = torqueOf(c.kw, c.rpm);
    assert.ok(rel(powerOf(t, c.rpm), c.kw) < 1e-12, `${slugOf(c)}: 왕복이 ${powerOf(t, c.rpm)}`);
    // 회전수를 바꿔도 왕복은 유지된다 — 축의 여덟 값 전부로 밟는다
    for (const s of SPEEDS) {
      const t2 = torqueOf(c.kw, s.rpm);
      assert.ok(rel(powerOf(t2, s.rpm), c.kw) < 1e-12, `${slugOf(c)} → ${s.rpm}rpm`);
      // 토크 × 각속도가 곧 와트다
      assert.ok(rel(t2 * omegaOf(s.rpm), c.kw * 1000) < 1e-12, `${slugOf(c)} → ${s.rpm}rpm`);
    }
  }
  // 토크를 그대로 두고 회전수를 두 배로 하면 출력이 두 배다(같은 식의 다른 쪽 얼굴)
  assert.ok(rel(powerOf(10, 3000), powerOf(10, 1500) * 2) < 1e-12);
});

test('회전수를 두 배로 하면 토크가 절반이다', () => {
  /*
   * 같은 출력에서 토크와 회전수는 반비례다. 축에 정확히 두 배인 짝이 셋 있어
   * (3600/1800, 1800/900, 3000/1500) 그 자리에서 절반이 나오는지 그대로 볼 수 있다.
   */
  const DOUBLES: [number, number][] = [[1800, 3600], [900, 1800], [1500, 3000]];
  for (const kw of POWERS) {
    for (const [slow, fast] of DOUBLES) {
      assert.equal(fast, slow * 2, `${slow}→${fast}: 두 배가 아니다`);
      const a = torqueOf(kw, slow);
      const b = torqueOf(kw, fast);
      assert.ok(rel(b, a / 2) < 1e-12, `${kw}kW ${slow}→${fast}: ${b} vs ${a / 2}`);
    }
    /*
     * 회전수 축은 극수 순서(2·4·6·8극)라 회전수가 내려간다. 그러면 같은 출력에서
     * 토크는 반대로 올라야 한다 — 반비례가 깨지면 이 줄에서 걸린다.
     */
    for (const hz of FREQS) {
      const row = SPEEDS.filter(s => s.hz === hz);
      let prevRpm = Infinity;
      let prevTorque = 0;
      for (const s of row) {
        const t = torqueOf(kw, s.rpm);
        assert.ok(s.rpm < prevRpm, `${hz}Hz ${s.rpm}rpm: 회전수 축이 내림차순이 아니다`);
        assert.ok(t > prevTorque, `${kw}kW ${hz}Hz ${s.rpm}rpm에서 토크가 줄었다`);
        prevRpm = s.rpm;
        prevTorque = t;
      }
    }
  }
  // 출력이 두 배면 같은 회전수에서 토크도 두 배다 — 정비례 쪽도 함께 본다
  assert.ok(rel(torqueOf(15, 1800), torqueOf(7.5, 1800) * 2) < 1e-12);
});

test('PS와 HP는 다른 값이다', () => {
  /*
   * 밖에서 확인해 주는 줄. 미터법 마력은 75kgf·m/s, 영국 마력은 550lb·ft/s로
   * **정의**되어 있으므로 둘 다 정의식으로 되짚는다 — 값을 옮겨 적다 자리가
   * 틀리면 여기서 먼저 깨진다.
   */
  assert.equal(GRAVITY, 9.80665);
  assert.equal(PS_WATT, 75 * GRAVITY, `PS가 75kgf·m/s와 어긋난다: ${PS_WATT}`);
  assert.ok(Math.abs(HP_WATT - 550 * LBFT_NM) < 1e-6, `HP가 550lb·ft/s와 어긋난다: ${HP_WATT}`);
  assert.ok(Math.abs(LBFT_NM - 0.45359237 * GRAVITY * 0.3048) < 1e-12, `1lb·ft가 ${LBFT_NM}`);

  // 두 마력을 같은 값으로 적으면 이 줄에서 걸린다
  assert.notEqual(PS_WATT, HP_WATT, '두 마력이 같은 값으로 적혀 있다');
  assert.ok(HP_WATT > PS_WATT, '영국 마력이 더 커야 한다');
  assert.ok(Math.abs(HP_WATT / PS_WATT - 1.01387) < 1e-4, `비가 ${HP_WATT / PS_WATT}`);

  for (const c of CELLS) {
    const f = motorFacts(c);
    // 같은 출력을 PS로 세면 HP보다 늘 많다 — 한 마력이 더 작으니 개수가 늘어난다
    assert.ok(f.ps >= f.hp, `${f.slug}: PS ${f.ps} < HP ${f.hp}`);
    assert.ok(rel(f.ps, f.watts / PS_WATT) < SIG3, `${f.slug} PS`);
    assert.ok(rel(f.hp, f.watts / HP_WATT) < SIG3, `${f.slug} HP`);
  }
  // 널리 쓰이는 자리 — 75kW는 102PS이지만 101HP다
  const big = facts('75kw-1800rpm');
  assert.equal(big.ps, 102);
  assert.equal(big.hp, 101);
  assert.notEqual(big.ps, big.hp, '75kW에서 두 마력이 같게 나온다');
  // 3.7kW는 5마력 자리, 7.5kW는 10마력 자리다 — 규격이 마력 자리에 맞춰 놓인 흔적이다
  assert.ok(Math.abs(facts('3-7kw-1800rpm').hp - 5) < 0.05, `3.7kW가 ${facts('3-7kw-1800rpm').hp}HP`);
  assert.ok(Math.abs(facts('7-5kw-1800rpm').hp - 10) < 0.15, `7.5kW가 ${facts('7-5kw-1800rpm').hp}HP`);
});

test('kgf·m와 lb·ft는 같은 토크의 다른 옷이다', () => {
  for (const c of CELLS) {
    const f = motorFacts(c);
    assert.ok(rel(f.kgfm, f.torque / GRAVITY) < SIG3 * 2, `${f.slug} kgf·m`);
    assert.ok(rel(f.lbft, f.torque / LBFT_NM) < SIG3 * 2, `${f.slug} lb·ft`);
    // 단위를 되짚으면 N·m로 돌아온다
    assert.ok(rel(f.kgfm * GRAVITY, f.torque) < SIG3 * 2, `${f.slug} kgf·m 되짚기`);
    assert.ok(rel(f.lbft * LBFT_NM, f.torque) < SIG3 * 2, `${f.slug} lb·ft 되짚기`);
    // lb·ft 숫자가 N·m보다 커야 한다 — 1lb·ft가 1N·m보다 작으니 개수가 늘어난다
    assert.ok(f.lbft > f.kgfm, `${f.slug}: lb·ft ${f.lbft} ≤ kgf·m ${f.kgfm}`);
  }
  const f = facts('2-2kw-1800rpm');
  assert.equal(f.torque, 11.7);
  assert.equal(f.kgfm, 1.19);
  assert.equal(f.lbft, 8.61);
});

test('슬립을 보면 회전수가 줄고 토크는 그만큼 는다', () => {
  assert.ok(SLIP > 0 && SLIP < 0.1, `슬립 ${SLIP}`);
  for (const c of CELLS) {
    const f = motorFacts(c);
    assert.equal(f.fullRpm, Math.round(c.rpm * (1 - SLIP)), `${f.slug} 전부하 회전수`);
    assert.ok(f.fullRpm < c.rpm, `${f.slug}: 전부하 회전수가 동기속도보다 크다`);
    assert.ok(f.fullTorque >= f.torque, `${f.slug}: 느려졌는데 토크가 안 늘었다`);
    assert.ok(rel(f.fullTorque, torqueOf(c.kw, f.fullRpm)) < SIG3, `${f.slug} 전부하 토크`);
  }
  // 4극 60Hz의 명판은 1800이 아니라 1746rpm이다
  assert.equal(facts('2-2kw-1800rpm').fullRpm, 1746);
  assert.equal(facts('2-2kw-1500rpm').fullRpm, 1455);
});

test('감속기는 회전수를 1/i로, 토크를 i×η배로 만든다', () => {
  assert.deepEqual(RATIOS, [3, 5, 10, 20]);
  assert.ok(GEAR_EFF > 0.5 && GEAR_EFF < 1, `효율 ${GEAR_EFF}`);
  for (const c of CELLS) {
    const f = motorFacts(c);
    assert.equal(f.gears.length, RATIOS.length, `${f.slug} 감속비 수`);
    for (const g of f.gears) {
      // 회전수는 정확히 1/i — 되짚어 곱하면 들어온 회전수다
      assert.ok(Math.abs(g.rpm * g.ratio - c.rpm) < 0.05 * g.ratio, `${f.slug} i=${g.ratio}: ${g.rpm}`);
      assert.ok(g.rpm < c.rpm, `${f.slug} i=${g.ratio}: 회전수가 안 줄었다`);
      // 토크는 i × η배 — 효율을 안 곱하면 이 줄이 걸린다
      assert.ok(rel(g.torque, f.torque * g.ratio * GEAR_EFF) < SIG3 * 2, `${f.slug} i=${g.ratio}: ${g.torque}`);
      assert.ok(g.torque < f.torque * g.ratio, `${f.slug} i=${g.ratio}: 효율이 안 곱해졌다`);
      /*
       * 되짚기 — 출력축의 토크와 회전수로 출력을 다시 만들면 들어온 출력의 η배다.
       * 감속기는 힘을 만들지 못하므로 출력이 늘어나면 안 된다.
       */
      const outKw = powerOf(g.torque, g.rpm);
      assert.ok(rel(outKw, c.kw * GEAR_EFF) < SIG3 * 2, `${f.slug} i=${g.ratio}: 출력이 ${outKw}kW`);
      assert.ok(outKw < c.kw, `${f.slug} i=${g.ratio}: 감속기가 출력을 늘렸다`);
    }
  }
  // 2.2kW 1800rpm에 10:1을 걸면 180rpm에 111N·m다
  const g = facts('2-2kw-1800rpm').gears[2];
  assert.equal(g.ratio, 10);
  assert.equal(g.rpm, 180);
  assert.ok(Math.abs(g.torque - 111) < 1, `${g.torque}N·m`);
});

test('회전수 0에서 0으로 나누지 않는다', () => {
  /*
   * 0으로 나누면 Infinity가 조용히 화면까지 흘러간다. 정지한 모터의 토크는 이 식이
   * 답할 물음이 아니므로(기동토크는 별개의 값이다) 던져서 멈춘다.
   */
  assert.throws(() => torqueOf(2.2, 0), /회전수가 0 이하다/);
  assert.throws(() => torqueOf(2.2, -1800), /회전수가 0 이하다/);
  assert.throws(() => motorFacts({ kw: 2.2, rpm: 0 }), /모르는 회전수/);
  // 되짚는 쪽은 0에서도 나누지 않는다 — 곱셈이므로 출력이 0이 된다
  assert.equal(powerOf(11.7, 0), 0);
  assert.ok(Number.isFinite(omegaOf(0)));
});

test('3상 전류는 √3 · 전압 · 역률 · 효율로 되짚어진다', () => {
  for (const c of CELLS) {
    const f = motorFacts(c);
    const { pf, eff } = classOf(c.kw);
    assert.equal(f.pf, pf, `${f.slug} 역률`);
    assert.equal(f.eff, eff, `${f.slug} 효율`);
    assert.ok(pf > 0.5 && pf <= 1, `${f.slug}: 역률 ${pf}`);
    assert.ok(eff > 0.5 && eff <= 1, `${f.slug}: 효율 ${eff}`);
    assert.deepEqual(f.currents.map(x => x.volt), VOLTS[f.speed.hz], `${f.slug} 전압 목록`);

    let prev = Infinity;
    for (const cur of f.currents) {
      // 되짚기 — 전류에 √3 × 전압 × 역률 × 효율을 곱하면 정격 출력이다
      const back = cur.amp * Math.sqrt(3) * cur.volt * pf * eff;
      assert.ok(rel(back, f.watts) < SIG3, `${f.slug} ${cur.volt}V: 되짚으면 ${back}W`);
      assert.ok(rel(cur.amp, currentOf(c.kw, cur.volt, pf, eff)) < SIG3, `${f.slug} ${cur.volt}V`);
      // 전압이 오르면 전류는 내린다 — 전압 목록이 오름차순이라 이 줄이 성립한다
      assert.ok(cur.amp < prev, `${f.slug} ${cur.volt}V: 전압이 올랐는데 전류가 안 줄었다`);
      prev = cur.amp;
    }
  }
  // 단상 식(√3 없음)을 잘못 쓰면 √3배 크게 나온다 — 그 자리를 못 박는다
  const single = (kw: number, v: number, pf: number, eff: number) => (kw * 1000) / (v * pf * eff);
  assert.ok(rel(single(2.2, 380, 0.82, 0.85), currentOf(2.2, 380, 0.82, 0.85) * Math.sqrt(3)) < 1e-12);

  // 널리 쓰이는 자리 — 2.2kW 380V는 5A 남짓이고, 220V로 내리면 1.7배가 된다
  const f = facts('2-2kw-1800rpm');
  assert.equal(f.currents[1].volt, 380);
  assert.ok(Math.abs(f.currents[1].amp - 4.8) < 0.2, `${f.currents[1].amp}A`);
  assert.ok(Math.abs(f.currents[0].amp / f.currents[1].amp - 380 / 220) < 0.01);
  // 75kW 400V는 135A쯤이다
  assert.ok(Math.abs(facts('75kw-1500rpm').currents[1].amp - 135) < 3);
});

test('주파수가 바뀌면 같은 모터의 토크가 6대 5로 바뀐다', () => {
  for (const c of CELLS) {
    const f = motorFacts(c);
    // 짝은 같은 출력·같은 극수의 다른 주파수여야 한다
    assert.notEqual(f.pair.hz, f.speed.hz, `${f.slug}: 짝이 같은 주파수다`);
    const pairCell = cellOf(f.pair.slug);
    assert.ok(pairCell, `${f.slug} → ${f.pair.slug}: 없는 칸을 가리킨다`);
    assert.equal(pairCell.kw, c.kw, `${f.slug}: 짝의 출력이 다르다`);
    assert.equal(speedOf(pairCell.rpm)!.poles, f.speed.poles, `${f.slug}: 짝의 극수가 다르다`);
    // 회전수가 6대 5면 토크는 5대 6이다
    assert.ok(rel(f.pair.torque * f.pair.rpm, f.torque * c.rpm) < SIG3 * 2, `${f.slug}: 곱이 안 맞는다`);
    // 짝의 짝은 자기 자신이다
    assert.equal(motorFacts(pairCell).pair.slug, f.slug, `${f.slug}: 짝이 되돌아오지 않는다`);
  }
  const a = facts('2-2kw-1800rpm');
  assert.equal(a.pair.rpm, 1500);
  assert.equal(a.pair.hz, 50);
  assert.ok(a.pair.torque > a.torque, '느린 50Hz 쪽 토크가 더 커야 한다');
  assert.ok(Math.abs(a.pair.torque / a.torque - 6 / 5) < 0.01, `${a.pair.torque / a.torque}`);
});

test('이웃 링크가 모든 칸에 들어온다', () => {
  /*
   * 앞에서 N개를 잘라 오면 줄의 앞쪽만 서로 가리키고 뒤쪽 칸은 들어오는 링크가 0이
   * 된다 — 사이트맵에는 있고 아무도 안 가리키는 낱장이다. lib/related-window.ts가
   * 자기 자리 다음부터 감으므로 136칸이 정확히 같은 수만큼 가리켜진다.
   */
  const deg = new Map<string, number>(CELLS.map(c => [slugOf(c), 0]));
  for (const c of CELLS) {
    const f = motorFacts(c);
    assert.equal(f.neighbours.length, 6, `${f.slug}: 이웃이 여섯이 아니다`);
    assert.equal(new Set(f.neighbours.map(n => n.slug)).size, 6, `${f.slug}: 이웃이 겹친다`);
    for (const n of f.neighbours) {
      assert.notEqual(n.slug, f.slug, `${f.slug}: 자기를 가리킨다`);
      assert.ok(cellOf(n.slug), `${f.slug} → ${n.slug}: 없는 칸을 가리킨다`);
      deg.set(n.slug, deg.get(n.slug)! + 1);
    }
  }
  const counts = [...deg.values()];
  assert.equal(Math.min(...counts), 6, '들어오는 링크가 여섯보다 적은 칸이 있다');
  assert.equal(Math.max(...counts), 6, '들어오는 링크가 여섯보다 많은 칸이 있다');
});

test('축에 없는 값을 넣으면 조용히 답하지 않는다', () => {
  assert.throws(() => motorFacts({ kw: 2.3, rpm: 1800 }), /모르는 출력/);
  assert.throws(() => motorFacts({ kw: 2.2, rpm: 1750 }), /모르는 회전수/);
});
