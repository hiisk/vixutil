/**
 * 마우스 감도 — 표를 믿지 않고 물리와 밖에서 아는 값으로 되짚는다.
 *
 * 이 섹션의 숫자는 전부 두 식에서 나온다(cm/360°와 그 역인 감도). 그래서 검사도
 * 표를 옮겨 적지 않고, 식을 **다른 길**로 되짚는 쪽으로 쓴다.
 *
 *   · 밖에서 확인해 주는 자리: 소스 계열(yaw 0.022) eDPI 800의 cm/360°는 51.95cm다.
 *     400 DPI 감도 2.0도, 800 DPI 감도 1.0도 같은 값이고 널리 공표돼 있다.
 *   · 발로란트↔소스의 곱수는 널리 3.18로, 소스↔오버워치는 3.33으로 인용된다.
 *   · **왕복**: 목표 cm/360°로 감도를 구한 뒤 그 감도로 거리를 다시 내면 목표가 온다.
 *   · **불변량**: eDPI가 같으면 거리가 같다. DPI를 두 배로 하고 감도를 반으로 하면
 *     거리가 그대로다. A→B로 옮긴 뒤 B→A로 되돌리면 원래 감도가 나온다.
 *   · **다른 길**: 360°에 드는 카운트는 yaw와 감도만으로도 나오고, DPI × 인치로도
 *     나온다. 두 길이 만나야 한다.
 *
 * **저장소 밖에서 확인해 주는 값은 yaw 셋과 2.54뿐이다.** 나머지는 식과 식을 견주니,
 * 그 값이 틀리면 되짚기가 함께 틀릴 수 있다. 그래서 공표된 51.95cm와 곱수 3.18·3.33을
 * 따로 못 박아 둔다 — 상수를 잘못 바꾸면 거기서 먼저 걸린다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  CELLS, CM_TARGETS, DPIS, DPI_SLUGS, GAMES, PAIRS, POINTS, REF_DPI,
  cellOf, gameOf, gamesOf, pairSlug, pairsFrom, pointSlug, pointsOf,
} from '../lib/dpi/list.ts';
import {
  ANCHOR_CM, CM_PER_INCH, FULL_TURN, REF_CM,
  cm360, convertSens, countsPerTurn, dpiFacts, edpiFor, edpiOf, factorOf,
  factsOf, pairsTo, pointsAt, sensFor, shownSens,
} from '../lib/dpi/facts.ts';

const game = (slug: string) => {
  const g = gameOf(slug);
  assert.ok(g, `게임 ${slug}가 없다`);
  return g;
};

const facts = (slug: string) => {
  const f = factsOf(slug);
  assert.ok(f, `${slug} 칸이 없다`);
  return f;
};

const pair = (slug: string) => {
  const f = facts(slug);
  assert.equal(f.kind, 'pair', `${slug}는 쌍 칸이 아니다`);
  return f as Extract<typeof f, { kind: 'pair' }>;
};

const point = (slug: string) => {
  const f = facts(slug);
  assert.equal(f.kind, 'point', `${slug}는 낱점 칸이 아니다`);
  return f as Extract<typeof f, { kind: 'point' }>;
};

/** 상대 오차 — 자른 값끼리 견줄 때 쓴다 */
const rel = (a: number, b: number): number => Math.abs(a - b) / Math.abs(b);

test('칸은 게임 쌍 56 + 게임×DPI 72', () => {
  assert.equal(GAMES.length, 8);
  assert.equal(DPIS.length, 9);
  assert.equal(CM_TARGETS.length, 8);
  assert.equal(PAIRS.length, GAMES.length * (GAMES.length - 1));
  assert.equal(PAIRS.length, 56);
  assert.equal(POINTS.length, GAMES.length * DPIS.length);
  assert.equal(POINTS.length, 72);
  assert.equal(CELLS.length, 128);
  assert.ok(CELLS.length > 100, '칸이 100개를 넘어야 한다');

  assert.equal(new Set(DPI_SLUGS).size, 128, 'slug가 겹친다');
  for (const c of CELLS) assert.deepEqual(cellOf(c.slug), c, c.slug);

  // 축은 오름차순 — 이웃 잇기와 단조성 검사가 순서에 기댄다
  for (let i = 1; i < DPIS.length; i++) assert.ok(DPIS[i] > DPIS[i - 1], `DPI 축이 어긋난다: ${DPIS[i]}`);
  for (let i = 1; i < CM_TARGETS.length; i++) assert.ok(CM_TARGETS[i] > CM_TARGETS[i - 1], `거리 축이 어긋난다`);

  // 기준값이 축 안에 있어야 한다 — 밖에 있으면 대표 줄을 못 찾는다
  assert.ok(DPIS.includes(REF_DPI), `기준 DPI ${REF_DPI}가 축에 없다`);
  assert.ok(CM_TARGETS.includes(REF_CM), `대표 거리 ${REF_CM}cm가 축에 없다`);
  // 가장 많이 쓰는 눈금이 빠지면 표가 반쪽이 된다
  for (const dpi of [400, 800, 1600, 3200]) assert.ok(DPIS.includes(dpi), `${dpi} DPI가 축에 없다`);

  // 순서가 있는 쌍이다 — 반대쪽은 다른 칸이고 자기 자신은 없다
  for (const g of GAMES) {
    assert.equal(pairsFrom(g.slug).length, 7, `${g.slug}에서 나가는 쌍`);
    assert.equal(pairsTo(g.slug).length, 7, `${g.slug}로 들어오는 쌍`);
    assert.equal(pointsOf(g.slug).length, 9, `${g.slug}의 DPI 줄`);
    assert.equal(cellOf(pairSlug(g.slug, g.slug)), undefined, `${g.slug}가 자기와 짝이 됐다`);
  }
  for (const dpi of DPIS) assert.equal(pointsAt(dpi).length, 8, `${dpi} DPI 줄`);

  assert.equal(cellOf('cs2'), undefined, '게임 이름만으로는 열리지 않아야 한다');
  assert.equal(cellOf('cs2-800dpi-x'), undefined);
  assert.equal(cellOf('cs2-900dpi'), undefined, '축에 없는 DPI가 열리면 안 된다');
  assert.equal(cellOf('CS2-800DPI'), undefined, 'slug는 소문자 한 꼴만 열린다');
  assert.equal(cellOf('fortnite-to-cs2'), undefined, '목록에 없는 게임이 열리면 안 된다');
  assert.equal(pointSlug('cs2', 800), 'cs2-800dpi');
  assert.equal(pairSlug('valorant', 'cs2'), 'valorant-to-cs2');
  assert.deepEqual(gamesOf(pair('valorant-to-cs2').cell), ['valorant', 'cs2']);
  assert.deepEqual(gamesOf(point('cs2-800dpi').cell), ['cs2']);
});

test('확인하지 못한 게임은 들어 있지 않다', () => {
  /*
   * list.ts 머리말이 일부러 뺀 게임들이다. 셀을 늘리려고 상수를 지어내면 그 값을
   * 믿고 감도를 바꾼 사람의 조준이 망가진다 — 그래서 다시 들어오면 여기서 걸린다.
   * 다시 넣으려면 yaw의 근거를 list.ts에 적고 이 목록에서 빼야 한다.
   */
  const OUT = [
    'rainbow-six', 'r6', 'siege', 'fortnite', 'cod', 'call-of-duty', 'warzone',
    'battlefield', 'pubg', 'tarkov', 'rust', 'destiny2', 'halo', 'the-finals',
    'deadlock', 'minecraft', 'roblox', 'splitgate',
  ];
  const found = OUT.filter(s => gameOf(s) !== undefined);
  assert.deepEqual(found, [], `yaw를 확인하지 못한 게임이 목록에 있다: ${found.join(', ')}`);

  // 서로 다른 yaw는 셋뿐이고, 여섯이 소스 계열의 0.022를 쓴다(화면 문구가 그렇게 말한다)
  const yaws = [...new Set(GAMES.map(g => g.yaw))];
  assert.equal(yaws.length, 3, `yaw가 ${yaws.length}가지다 — 문구는 셋이라고 말한다`);
  assert.equal(GAMES.filter(g => g.yaw === 0.022).length, 6, '0.022를 쓰는 게임이 여섯이 아니다');
  for (const g of GAMES) {
    assert.ok(g.yaw > 0, `${g.slug}: yaw가 양수가 아니다`);
    assert.ok(g.name.trim() && g.short.trim(), `${g.slug}: 이름이 비었다`);
    assert.match(g.slug, /^[a-z0-9-]+$/, `${g.slug}: 주소에 쓸 수 없는 글자`);
  }
  assert.equal(new Set(GAMES.map(g => g.slug)).size, 8, '게임 slug가 겹친다');
});

test('밖에서 아는 값 — 소스 계열 eDPI 800은 51.95cm/360°', () => {
  /*
   * 이 섹션에서 저장소 밖이 확인해 주는 자리다. 2.54나 360이나 yaw 0.022를 바꾸면
   * 이 검사가 먼저 깨지고, 왕복·불변량 검사가 뒤따라 깨진다.
   */
  assert.equal(CM_PER_INCH, 2.54);
  assert.equal(FULL_TURN, 360);
  assert.equal(game('cs2').yaw, 0.022);

  assert.ok(Math.abs(cm360(0.022, 2, 400) - 51.9545) < 0.001, `400 DPI 감도 2.0: ${cm360(0.022, 2, 400)}`);
  assert.ok(Math.abs(cm360(0.022, 1, 800) - 51.9545) < 0.001, `800 DPI 감도 1.0: ${cm360(0.022, 1, 800)}`);
  assert.equal(ANCHOR_CM, 51.95);

  /*
   * eDPI 1600이면 그 절반, 400이면 두 배다. 견주는 상대는 51.9545가 아니라 식이 낸
   * 값이다 — 자리를 자른 51.9545와 견주면 자른 오차 2e-5가 그대로 남는다.
   */
  const anchor = cm360(0.022, 1, 800);
  assert.ok(Math.abs(cm360(0.022, 2, 800) - anchor / 2) < 1e-9);
  assert.ok(Math.abs(cm360(0.022, 0.5, 800) - anchor * 2) < 1e-9);

  // 인치로 재도 같은 거리다 — 2.54를 다른 자리에서 한 번 더 본다
  assert.ok(Math.abs(cm360(0.022, 1, 800) / CM_PER_INCH - 20.4545) < 0.001, '20.45인치가 아니다');
});

test('널리 인용되는 곱수 — 발로란트↔소스 3.18, 소스↔오버워치 3.33', () => {
  const source = game('cs2');
  const valorant = game('valorant');
  const overwatch = game('overwatch2');

  /*
   * 발로란트의 yaw를 0.07로 못 박았으므로 곱수는 0.07 ÷ 0.022 = 3.1818…이다.
   * 흔히 인용되는 3.18은 그 값을 소수 둘로 자른 것이다 — 어긋남이 0.6% 안임을
   * 검사가 알고 있어야, 나중에 yaw를 더 정확한 값으로 바꿀 때 무엇이 달라졌는지 보인다.
   */
  const vToSource = factorOf(valorant, source);
  assert.ok(Math.abs(vToSource - 3.1818) < 0.001, `발로란트→소스 ${vToSource}`);
  assert.ok(rel(vToSource, 3.18) < 0.006, `널리 인용되는 3.18과 ${(rel(vToSource, 3.18) * 100).toFixed(2)}% 어긋난다`);

  const sourceToV = factorOf(source, valorant);
  assert.ok(rel(sourceToV, 1 / 3.18) < 0.006, `소스→발로란트 ${sourceToV}`);

  const sourceToOw = factorOf(source, overwatch);
  assert.ok(Math.abs(sourceToOw - 3.3333) < 0.001, `소스→오버워치 ${sourceToOw}`);
  assert.ok(rel(sourceToOw, 3.33) < 0.002, `널리 인용되는 3.33과 어긋난다`);
  assert.equal(factorOf(overwatch, source), 0.3, '오버워치→소스가 정확히 0.3이 아니다');

  // 같은 계열끼리는 정확히 1 — 감도 숫자가 안 바뀐다
  for (const a of GAMES) {
    for (const b of GAMES) {
      if (a.slug === b.slug) continue;
      if (a.yaw !== b.yaw) continue;
      assert.equal(factorOf(a, b), 1, `${a.slug}→${b.slug}`);
      assert.equal(pair(pairSlug(a.slug, b.slug)).same, true, `${a.slug}→${b.slug}: same이 아니다`);
    }
  }
  // 오버워치 감도 5는 소스 감도 1.5다 — 곱수를 감도에 실제로 태워 본다
  assert.ok(Math.abs(convertSens(overwatch, source, 5) - 1.5) < 1e-9);
});

test('왕복 — 목표 거리로 구한 감도가 그 거리를 다시 낸다', () => {
  /*
   * 이 섹션에서 가장 강한 되짚기다. sensFor와 cm360은 서로의 역이므로, 자르지 않은
   * 값으로는 딱 맞아야 한다. 화면에 찍는 자른 값(유효숫자 넷)은 0.05% 안이다 —
   * 그 폭을 검사가 알고 있으면, 자르는 자리를 줄일 때 무엇이 나빠지는지 보인다.
   */
  for (const g of GAMES) {
    for (const dpi of DPIS) {
      for (const cm of CM_TARGETS) {
        const exact = sensFor(g.yaw, dpi, cm);
        assert.ok(Math.abs(cm360(g.yaw, exact, dpi) - cm) < 1e-9, `${g.slug} ${dpi} ${cm}: 왕복이 깨졌다`);
        assert.ok(exact > 0, `${g.slug} ${dpi} ${cm}: 감도가 양수가 아니다`);

        const shown = shownSens(g.yaw, dpi, cm);
        assert.ok(rel(cm360(g.yaw, shown, dpi), cm) < 0.0005, `${g.slug} ${dpi} ${cm}: 자른 감도로 ${cm360(g.yaw, shown, dpi)}`);
      }
    }
  }

  // 칸이 들고 다니는 값도 같은 왕복을 지켜야 한다
  for (const c of POINTS) {
    const f = dpiFacts(c);
    assert.equal(f.kind, 'point');
    if (f.kind !== 'point') continue;
    assert.equal(f.rows.length, CM_TARGETS.length, `${f.slug}: 줄 수가 다르다`);
    for (const r of f.rows) {
      assert.ok(rel(cm360(f.game.yaw, r.sens, f.dpi), r.cm) < 0.0005, `${f.slug} ${r.cm}cm: ${r.sens}`);
      assert.ok(Math.abs(r.inch - r.cm / CM_PER_INCH) < 0.005, `${f.slug} ${r.cm}cm: 인치가 ${r.inch}`);
    }
  }
});

test('360°에 드는 카운트가 두 길에서 같은 값으로 만난다', () => {
  /*
   * 카운트는 yaw와 감도만으로 나오고(360 ÷ (yaw × 감도)), DPI × 인치로도 나온다.
   * 두 길이 만나는 것은 "DPI가 1인치당 카운트"라는 정의가 식에 제대로 들어갔다는
   * 뜻이다 — 2.54를 엉뚱한 자리에 곱하면 여기서 갈라진다.
   */
  for (const c of POINTS) {
    const f = dpiFacts(c);
    if (f.kind !== 'point') continue;
    for (const cm of CM_TARGETS) {
      const sens = sensFor(f.game.yaw, f.dpi, cm);
      const byAngle = countsPerTurn(f.game.yaw, sens);
      const byDistance = (f.dpi * cm) / CM_PER_INCH;
      assert.ok(rel(byAngle, byDistance) < 1e-12, `${f.slug} ${cm}cm: ${byAngle} vs ${byDistance}`);
    }
    // 화면에 찍는 카운트도 그 두 길 안에 있어야 한다
    assert.ok(rel(f.pick.counts, (f.dpi * REF_CM) / CM_PER_INCH) < 0.001, `${f.slug}: 카운트 ${f.pick.counts}`);
    assert.ok(Number.isInteger(f.pick.counts), `${f.slug}: 카운트가 정수가 아니다`);
  }
  // 감도 1의 소스 계열은 한 바퀴에 16363.6 카운트다 — 360 ÷ 0.022를 밖에서 한 번 더
  assert.ok(Math.abs(countsPerTurn(0.022, 1) - 360 / 0.022) < 1e-9);
});

test('불변량 — eDPI가 같으면 거리도 같다', () => {
  for (const g of GAMES) {
    for (const cm of CM_TARGETS) {
      /*
       * eDPI는 DPI가 식에서 빠지므로 목표 거리 하나에 한 값이다. 이것을 DPI 축
       * 전체에서 확인하는 것이 "DPI를 두 배로 하고 감도를 반으로" 불변량의 본체다.
       */
      const want = edpiFor(g.yaw, cm);
      for (const dpi of DPIS) {
        const sens = sensFor(g.yaw, dpi, cm);
        assert.ok(rel(edpiOf(dpi, sens), want) < 1e-12, `${g.slug} ${dpi} ${cm}cm: eDPI ${edpiOf(dpi, sens)} vs ${want}`);
      }

      // DPI를 두 배로 하고 감도를 반으로 하면 거리가 그대로다 — 축 밖의 값으로도 묻는다
      for (const dpi of [...DPIS, 1300, 5000]) {
        const sens = sensFor(g.yaw, dpi, cm);
        assert.ok(Math.abs(cm360(g.yaw, sens / 2, dpi * 2) - cm) < 1e-9, `${g.slug} ${dpi}→${dpi * 2}`);
        assert.ok(Math.abs(cm360(g.yaw, sens * 4, dpi / 4) - cm) < 1e-9, `${g.slug} ${dpi}→${dpi / 4}`);
      }
    }
  }

  // eDPI가 같은 서로 다른 (DPI, 감도) 짝이 정말 같은 거리를 돈다
  assert.ok(Math.abs(cm360(0.022, 1, 800) - cm360(0.022, 0.5, 1600)) < 1e-9);
  assert.ok(Math.abs(cm360(0.022, 1, 800) - cm360(0.022, 4, 200)) < 1e-9);

  // 그러나 게임을 건너면 같은 eDPI가 다른 거리다 — 화면이 밝히는 사실이다
  const a = cm360(0.022, 1, 800);
  const b = cm360(0.07, 1, 800);
  assert.ok(rel(a / b, 0.07 / 0.022) < 1e-12, 'eDPI가 같아도 거리 비는 yaw 비다');
  assert.ok(a > b * 3, '발로란트 eDPI 800이 소스 계열보다 세 배 넘게 빠르지 않다');
});

test('불변량 — A→B로 옮긴 뒤 되돌리면 원래 감도가 나온다', () => {
  for (const a of GAMES) {
    for (const b of GAMES) {
      if (a.slug === b.slug) continue;
      for (const sens of [0.1, 0.35, 1, 2.5, 17]) {
        const moved = convertSens(a, b, sens);
        assert.ok(Math.abs(convertSens(b, a, moved) - sens) < 1e-12, `${a.slug}→${b.slug}→${a.slug}: ${sens}`);
        // 옮긴 감도는 어느 DPI에서도 같은 거리를 돈다 — 곱수가 DPI와 무관하다는 말
        for (const dpi of DPIS) {
          assert.ok(rel(cm360(b.yaw, moved, dpi), cm360(a.yaw, sens, dpi)) < 1e-12, `${a.slug}→${b.slug} ${dpi}`);
        }
      }
      // 두 곱수가 서로 역수다
      assert.ok(Math.abs(factorOf(a, b) * factorOf(b, a) - 1) < 1e-12, `${a.slug}↔${b.slug}`);
    }
  }

  // 칸이 화면에 내는 자른 곱수도 역수 관계 안에 있어야 한다
  for (const c of PAIRS) {
    const f = dpiFacts(c);
    if (f.kind !== 'pair') continue;
    assert.ok(rel(f.factor * f.back, 1) < 0.0005, `${f.slug}: ${f.factor} × ${f.back}`);
    assert.equal(dpiFacts(cellOf(f.reverse)!).slug, pairSlug(c.to, c.from), `${f.slug}: 반대 칸이 다르다`);
    const back = dpiFacts(cellOf(f.reverse)!);
    if (back.kind === 'pair') assert.ok(rel(back.factor, f.back) < 1e-12, `${f.slug}: 반대 칸의 곱수가 다르다`);
  }
});

test('쌍 표의 두 감도가 같은 거리를 돈다', () => {
  for (const c of PAIRS) {
    const f = dpiFacts(c);
    if (f.kind !== 'pair') continue;
    assert.equal(f.dpi, REF_DPI, `${f.slug}: 기준 DPI가 다르다`);
    assert.equal(f.rows.length, CM_TARGETS.length);
    for (const r of f.rows) {
      const left = cm360(f.from.yaw, r.from, f.dpi);
      const right = cm360(f.to.yaw, r.to, f.dpi);
      assert.ok(rel(left, r.cm) < 0.0005, `${f.slug} ${r.cm}cm: ${f.from.slug} 쪽이 ${left}`);
      assert.ok(rel(right, r.cm) < 0.0005, `${f.slug} ${r.cm}cm: ${f.to.slug} 쪽이 ${right}`);
      /*
       * 곱수를 태워도 같은 값이 나와야 한다 — 표와 곱수가 어긋나면 여기서 걸린다.
       * 폭이 위보다 넓은 것은 양쪽 감도를 **따로** 유효숫자 넷으로 잘랐기 때문이다.
       * 한쪽이 올라가고 다른 쪽이 내려가면 두 오차가 겹쳐 0.1%까지 벌어진다
       * (cs2→overwatch2의 45cm 줄이 그 자리다). 자르지 않은 왕복은 위에서 이미 봤다.
       */
      assert.ok(rel(r.from * factorOf(f.from, f.to), r.to) < 0.002, `${f.slug} ${r.cm}cm: 곱수와 표가 어긋난다`);
      // eDPI는 게임마다 다르고, 같은 계열이면 같다
      assert.equal(r.fromEdpi === r.toEdpi, f.same, `${f.slug} ${r.cm}cm: eDPI ${r.fromEdpi}/${r.toEdpi}`);
    }
    assert.equal(f.pick.cm, REF_CM, `${f.slug}: 대표 줄이 ${f.pick.cm}cm다`);
  }
});

test('감도는 거리와 DPI를 따라 단조롭게 내려간다', () => {
  for (const c of POINTS) {
    const f = dpiFacts(c);
    if (f.kind !== 'point') continue;
    for (let i = 1; i < f.rows.length; i++) {
      assert.ok(f.rows[i].sens < f.rows[i - 1].sens, `${f.slug}: ${f.rows[i].cm}cm 감도가 더 크다`);
      assert.ok(f.rows[i].edpi < f.rows[i - 1].edpi, `${f.slug}: ${f.rows[i].cm}cm eDPI가 더 크다`);
      assert.ok(f.rows[i].inch > f.rows[i - 1].inch, `${f.slug}: 인치가 안 늘어난다`);
    }
    // DPI 줄도 마찬가지 — 같은 거리를 유지하려면 DPI가 오를 때 감도가 내려간다
    assert.equal(f.dpiRows.length, DPIS.length);
    for (let i = 1; i < f.dpiRows.length; i++) {
      assert.ok(f.dpiRows[i].sens < f.dpiRows[i - 1].sens, `${f.slug}: ${f.dpiRows[i].dpi} DPI 감도가 더 크다`);
    }
    assert.equal(f.dpiRows.filter(r => r.here).length, 1, `${f.slug}: 지금 칸 표시가 하나가 아니다`);
    const mine = f.dpiRows.find(r => r.here)!;
    assert.equal(mine.dpi, f.dpi);
    assert.equal(mine.sens, f.pick.sens, `${f.slug}: DPI 줄과 대표 줄의 감도가 다르다`);
  }

  // yaw가 작은 게임은 같은 거리에 감도가 커야 한다 — 오버워치가 소스 계열보다 크다
  assert.ok(sensFor(0.0066, 800, 30) > sensFor(0.022, 800, 30));
  assert.ok(sensFor(0.022, 800, 30) > sensFor(0.07, 800, 30));
});

test('이웃 링크가 128칸에 고르게 들어온다', () => {
  /*
   * 앞에서 여섯을 잘라 오면 줄의 앞쪽만 서로 가리키고 뒤쪽 칸은 들어오는 링크가
   * 0이 된다 — 사이트맵에는 있고 아무도 안 가리키는 낱장이다. facts.ts가
   * lib/related-window.ts로 자기 자리 다음부터 원형으로 감으므로 정확히 같은
   * 수만큼 가리켜진다. 갈래를 섞지 않는 것도 여기서 본다.
   */
  const deg = new Map<string, number>(CELLS.map(c => [c.slug, 0]));
  for (const c of CELLS) {
    const f = dpiFacts(c);
    assert.equal(f.neighbours.length, 6, `${f.slug}: 이웃이 여섯이 아니다`);
    assert.equal(new Set(f.neighbours.map(x => x.slug)).size, 6, `${f.slug}: 이웃이 겹친다`);
    for (const x of f.neighbours) {
      assert.notEqual(x.slug, f.slug, `${f.slug}: 자기를 가리킨다`);
      assert.ok(cellOf(x.slug), `${f.slug} → ${x.slug}: 없는 칸을 가리킨다`);
      assert.equal(x.kind, c.kind, `${f.slug} → ${x.slug}: 갈래가 섞였다`);
      deg.set(x.slug, deg.get(x.slug)! + 1);
    }
    if (c.kind === 'pair') {
      assert.equal(f.neighbours.filter(x => x.kind === 'pair' && x.from === c.from).length, 3, f.slug);
      assert.equal(f.neighbours.filter(x => x.kind === 'pair' && x.to === c.to).length, 3, f.slug);
    } else {
      assert.equal(f.neighbours.filter(x => x.kind === 'point' && x.game === c.game).length, 3, f.slug);
      assert.equal(f.neighbours.filter(x => x.kind === 'point' && x.dpi === c.dpi).length, 3, f.slug);
    }
  }
  const counts = [...deg.values()];
  assert.equal(Math.min(...counts), 6, '들어오는 링크가 여섯보다 적은 칸이 있다');
  assert.equal(Math.max(...counts), 6, '들어오는 링크가 여섯보다 많은 칸이 있다');
});

test('허브가 128칸을 빠짐없이 낸다', () => {
  /*
   * 허브는 게임마다 두 줄(나가는 쌍 일곱 · DPI 아홉)을 낸다. 그 합이 128이 아니면
   * 사이트맵에만 있고 화면에서 닿을 수 없는 낱장이 생긴다.
   */
  const shown = new Set<string>();
  for (const g of GAMES) {
    for (const c of pairsFrom(g.slug)) shown.add(c.slug);
    for (const c of pointsOf(g.slug)) shown.add(c.slug);
  }
  assert.equal(shown.size, CELLS.length, `허브가 ${shown.size}칸만 낸다`);
  for (const c of CELLS) assert.ok(shown.has(c.slug), `허브에 ${c.slug}가 없다`);
});

test('축에 없는 값을 넣으면 조용히 답하지 않는다', () => {
  assert.throws(() => dpiFacts({ kind: 'point', slug: 'x', game: 'fortnite', dpi: 800 }), /모르는 게임/);
  assert.throws(() => dpiFacts({ kind: 'point', slug: 'x', game: 'cs2', dpi: 900 }), /모르는 DPI/);
  assert.throws(() => dpiFacts({ kind: 'pair', slug: 'x', from: 'cs2', to: 'fortnite' }), /모르는 게임/);
  assert.equal(factsOf('nope-800dpi'), undefined);
});

test('오늘 날짜를 읽지 않는다', () => {
  /*
   * `new Date()`나 `Date.now()`가 한 줄이라도 들어가면 페이지가 날마다 바뀐다.
   * 그러면 검사가 붙들 값이 없고, 캐시된 낱장은 다음 날 거짓이 된다. "지금 프로
   * 선수 평균"처럼 시간에 매인 값을 나중에 끼워 넣지 못하게 소스를 직접 훑는다.
   */
  const dir = join(import.meta.dirname, '..', 'lib', 'dpi');
  const files = readdirSync(dir).filter(f => f.endsWith('.ts'));
  assert.ok(files.length >= 4, `lib/dpi에 파일이 ${files.length}개뿐이다`);
  for (const f of files) {
    /* 주석은 걷어낸다 — 머리말이 규칙을 적고 있어 그대로 걸린다 */
    const code = readFileSync(join(dir, f), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');
    assert.ok(!/new Date\s*\(/.test(code), `${f}: new Date()를 쓴다`);
    assert.ok(!/Date\.now\s*\(/.test(code), `${f}: Date.now()를 쓴다`);
  }
});
