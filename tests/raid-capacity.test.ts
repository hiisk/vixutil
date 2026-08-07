/**
 * RAID — 정의에서 나온 값이 널리 실린 공식·최소 장수와 맞는지 본다.
 *
 * lib/raid 는 "그룹마다 패리티 몇 장"이라는 한 줄에서 모든 레벨을 갈라낸다.
 * 여기서는 그 길을 쓰지 않고, 저장장치 문서에 레벨마다 따로 실려 있는 공식과
 * 최소 장수를 그대로 적어 두고 칸마다 대조한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, DISKS, LEVELS, MAX_DISKS, MIN_DISKS, RAID_SLUGS,
  cellOf, levelLabel, levelOf, slugOf,
} from '../lib/raid/list.ts';
import { BYTES_PER_TB, BYTES_PER_TIB, minDisksOf, raidFacts, splitsOf } from '../lib/raid/facts.ts';

/** 레벨마다 따로 실려 있는 최소 장수 — 옮겨 적은 자료다 */
const MIN_DISKS_TABLE: Record<string, number> = {
  raid0: 2, raid1: 2, raid5: 3, raid6: 4,
  raid10: 4, raid50: 6, raid60: 8, jbod: 2,
};

/**
 * 레벨마다 따로 실려 있는 용량 공식. g는 그룹 수다.
 * 값이 null이면 그 장수로는 만들 수 없다는 뜻이다.
 */
const USABLE_TABLE: Record<string, (n: number, g: number) => number | null> = {
  raid0: n => n,
  jbod: n => n,
  raid1: () => 1,
  raid5: n => (n >= 3 ? n - 1 : null),
  raid6: n => (n >= 4 ? n - 2 : null),
  raid10: n => (n >= 4 && n % 2 === 0 ? n / 2 : null),
  raid50: (n, g) => (g >= 2 ? n - g : null),
  raid60: (n, g) => (g >= 2 ? n - 2 * g : null),
};

const facts = RAID_SLUGS.map(s => raidFacts(cellOf(s)!));

test('칸이 192개이고 슬러그가 겹치지 않는다', () => {
  assert.equal(LEVELS.length, 8);
  assert.equal(DISKS.length, MAX_DISKS - MIN_DISKS + 1);
  assert.equal(DISKS.length, 24);
  assert.equal(CELLS.length, 8 * 24);
  assert.equal(new Set(RAID_SLUGS).size, CELLS.length);
  for (const slug of RAID_SLUGS) {
    const c = cellOf(slug);
    assert.ok(c, `되돌아오지 않는다: ${slug}`);
    assert.equal(slugOf(c), slug);
  }
});

test('최소 장수가 널리 실린 표와 맞는다', () => {
  for (const l of LEVELS) {
    assert.equal(minDisksOf(l), MIN_DISKS_TABLE[l.key], levelLabel(l));
  }
  // 최소보다 한 장 적으면 아무 가름도 없어야 한다
  for (const l of LEVELS) {
    const n = MIN_DISKS_TABLE[l.key] - 1;
    if (n >= MIN_DISKS) assert.deepEqual(splitsOf(l, n), [], `${levelLabel(l)} ${n}장`);
  }
});

test('쓸 수 있는 장수가 레벨별 공식과 하나도 어긋나지 않는다', () => {
  for (const f of facts) {
    const want = USABLE_TABLE[f.cell.level](f.disks, f.best?.groups ?? 0);
    if (!f.possible) {
      assert.equal(want, null, `${f.levelText} ${f.disks}장은 되어야 한다`);
      continue;
    }
    assert.equal(f.usable, want, `${f.levelText} ${f.disks}장`);
    assert.equal(f.lost, f.disks - f.usable, f.slug);
  }
});

test('패리티 레벨은 전체에서 패리티 × 그룹 수를 뺀 것이다', () => {
  for (const f of facts) {
    if (!f.best || f.level.mirror) continue;
    assert.equal(f.usable, f.disks - f.level.parity * f.best.groups, f.slug);
    assert.equal(f.best.groups * f.best.perGroup, f.disks, f.slug);
  }
  // 같은 장수에서 RAID 0 → 5 → 6이 한 장씩 줄어든다
  for (const n of DISKS.filter(x => x >= 4)) {
    const z = raidFacts(cellOf(`raid0-${n}`)!).usable;
    const five = raidFacts(cellOf(`raid5-${n}`)!).usable;
    const six = raidFacts(cellOf(`raid6-${n}`)!).usable;
    assert.equal(five, z - 1, `${n}장`);
    assert.equal(six, five - 1, `${n}장`);
  }
});

test('겹치지 않는 레벨은 그룹이 언제나 하나다', () => {
  // RAID 5를 두 그룹으로 가르면 그건 RAID 50이다 — 갈래가 늘어나면 안 된다
  for (const f of facts) {
    if (f.level.minGroups !== 1 || !f.best) continue;
    assert.equal(f.best.groups, 1, f.slug);
    assert.deepEqual(f.others, [], f.slug);
  }
});

test('RAID 50·60은 같은 크기 그룹으로만 갈라진다', () => {
  for (const f of facts) {
    if (f.level.minGroups < 2 || f.level.mirror) continue;
    for (const s of [f.best!, ...f.others].filter(Boolean)) {
      assert.equal(f.disks % s.groups, 0, f.slug);
      assert.ok(s.groups >= 2, f.slug);
      assert.ok(s.perGroup >= f.level.minPerGroup, f.slug);
    }
  }
  // 일곱 장은 소수라 두 그룹으로 못 가른다
  assert.equal(raidFacts(cellOf('raid50-7')!).possible, false);
  assert.equal(raidFacts(cellOf('raid50-7')!).reason, 'no-even-split');
  assert.equal(raidFacts(cellOf('raid50-6')!).possible, true);
  assert.equal(raidFacts(cellOf('raid50-6')!).usable, 4);
  // 아홉 장은 세 그룹으로 갈라진다
  const nine = raidFacts(cellOf('raid50-9')!);
  assert.equal(nine.best!.groups, 3);
  assert.equal(nine.best!.perGroup, 3);
  assert.equal(nine.usable, 6);
});

test('그룹을 적게 두면 용량이 늘고 많이 두면 고장을 더 견딘다', () => {
  for (const f of facts) {
    if (!f.best) continue;
    const all = [f.best, ...f.others];
    for (let i = 0; i + 1 < all.length; i++) {
      assert.ok(all[i].usable >= all[i + 1].usable, `${f.slug} — 앞이 용량이 크거나 같아야 한다`);
      assert.ok(all[i].groups <= all[i + 1].groups, `${f.slug} — 그룹이 늘수록 뒤로 가야 한다`);
      // 용량으로 잃는 만큼 견디는 고장이 는다
      assert.ok(all[i].bestCase <= all[i + 1].bestCase, `${f.slug} — 뒤가 더 견뎌야 한다`);
    }
  }

  // RAID 50 열두 장 — 두·세·네 그룹으로 갈라지고 10·9·8장분이 남는다
  const twelve = raidFacts(cellOf('raid50-12')!);
  assert.deepEqual([twelve.best!, ...twelve.others].map(s => [s.groups, s.usable, s.bestCase]), [
    [2, 10, 2], [3, 9, 3], [4, 8, 4],
  ]);

  // RAID 60 스물네 장 — 그룹을 여섯으로 늘리면 절반만 남고 열둘까지 견딘다
  const two4 = raidFacts(cellOf('raid60-24')!);
  assert.deepEqual([two4.best!, ...two4.others].map(s => [s.groups, s.usable, s.bestCase]), [
    [2, 20, 4], [3, 18, 6], [4, 16, 8], [6, 12, 12],
  ]);
});

test('미러는 RAID 1이 한 장분, RAID 10이 절반이다', () => {
  for (const n of DISKS) {
    const one = raidFacts(cellOf(`raid1-${n}`)!);
    assert.equal(one.usable, 1, `${n}장`);
    assert.equal(one.best!.tolerates, n - 1, `${n}장`);

    const ten = raidFacts(cellOf(`raid10-${n}`)!);
    if (n < 4 || n % 2 === 1) {
      assert.equal(ten.possible, false, `${n}장`);
      assert.equal(ten.reason, n < 4 ? 'too-few' : 'odd', `${n}장`);
    } else {
      assert.equal(ten.usable, n / 2, `${n}장`);
      assert.equal(ten.best!.tolerates, 1, `${n}장`);
      assert.equal(ten.best!.bestCase, n / 2, `${n}장`);
    }
  }
});

test('패리티가 없으면 한 장도 못 견딘다', () => {
  for (const f of facts) {
    if (!f.best) continue;
    if (f.level.parity === 0 && !f.level.mirror) {
      assert.equal(f.best.tolerates, 0, f.slug);
      assert.equal(f.usable, f.disks, f.slug);
      assert.equal(f.efficiency, 100, f.slug);
    } else {
      assert.ok(f.best.tolerates >= 1, f.slug);
    }
  }
  // JBOD는 배열이 깨져도 나머지 장의 자료가 남는다는 것만 RAID 0과 다르다
  assert.equal(levelOf('jbod')!.independent, true);
  assert.equal(levelOf('raid0')!.independent, undefined);
  assert.equal(raidFacts(cellOf('jbod-8')!).usable, raidFacts(cellOf('raid0-8')!).usable);
});

test('안 되는 칸이 38개이고 저마다 까닭이 붙는다', () => {
  const bad = facts.filter(f => !f.possible);
  assert.equal(bad.length, 38);
  for (const f of bad) {
    assert.ok(f.reason, f.slug);
    assert.equal(f.usable, 0, f.slug);
    assert.equal(f.best, null, f.slug);
  }
  // 까닭별로 세면 장수 부족 15, 홀수 11, 못 가름 12다
  const by = (r: string) => bad.filter(f => f.reason === r).length;
  assert.equal(by('too-few'), 15);
  assert.equal(by('odd'), 11);
  assert.equal(by('no-even-split'), 12);
  // 못 가르는 자리는 전부 RAID 50·60이고 장수가 소수이거나 큰 약수가 없다
  for (const f of bad.filter(f => f.reason === 'no-even-split')) {
    assert.ok(f.level.minGroups >= 2, f.slug);
    assert.ok(f.disks >= f.minDisks, f.slug);
  }
  assert.equal(by('too-few') + by('odd') + by('no-even-split'), bad.length);
});

test('겉면의 TB와 운영체제가 세는 TiB가 다르다', () => {
  assert.equal(BYTES_PER_TB, 1e12);
  assert.equal(BYTES_PER_TIB, 1024 ** 4);

  // 4TB 넉 장 RAID 5 = 12TB인데 운영체제에는 10.91TiB로 보인다
  const f = raidFacts(cellOf('raid5-4')!);
  const row = f.sizes.find(s => s.size === 4)!;
  assert.equal(row.tb, 12);
  assert.equal(row.tib, 10.91);
  assert.equal(row.lostTb, 4);

  for (const g of facts) {
    for (const s of g.sizes) {
      assert.equal(s.tb, g.usable * s.size, g.slug);
      assert.ok(s.tib <= s.tb, `${g.slug} — TiB가 TB보다 크면 안 된다`);
      // 1TB는 정확히 1e12 ÷ 2^40 TiB다
      assert.ok(Math.abs(s.tib - (s.tb * 1e12) / 1024 ** 4) < 0.005, g.slug);
    }
  }
});

test('이웃 칸이 실제로 있는 슬러그다', () => {
  for (const f of facts) {
    for (const n of [f.fewer, f.more]) {
      if (n === null) continue;
      assert.ok(cellOf(n), `${f.slug} 의 이웃이 없다: ${n}`);
    }
  }
  assert.equal(raidFacts(cellOf(`raid5-${MIN_DISKS}`)!).fewer, null);
  assert.equal(raidFacts(cellOf(`raid5-${MAX_DISKS}`)!).more, null);
});
