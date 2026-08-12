/**
 * 법정상속분 — 재산 하나를 여러 사람이 나누는 셈이라 항등식이 중심이다.
 *
 *  - **몫의 합은 언제나 1(=상속재산 전액)이다.** 상속인 구성이 무엇이든 없던
 *    재산이 생기거나 사라지면 안 된다. 아래 600가지 구성으로 못 박는다
 *  - 배우자 : 자녀는 정확히 1.5 : 1이다. 자녀 1·2·3·4명일 때 배우자 몫이
 *    3/5 · 3/7 · 3/9 · 3/11인지 손으로 셈한 값과 맞춘다
 *  - 순위가 앞을 막는다 — 자녀가 있으면 부모·형제자매 몫은 0이다. 순위를 잘못
 *    물리면 여기서 걸린다
 *  - 상속인이 아무도 없으면 몫을 지어내지 않는다. 목록은 비고 합은 0이다
 *  - 유류분은 종류별로 정해진 비율(1/2 · 1/3)을 법정상속분에 곱한 것이다.
 *    형제자매는 2024년 위헌 결정으로 0이다
 *  - 금액은 몫에 비례한다 — 재산이 두 배면 각자도 두 배, 0에서도 무너지지 않는다
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  RANK_LABEL, RESERVE_RATIO, SPOUSE_WEIGHT,
  divide, shareOfKind, spouseShareWithChildren,
  type Family,
} from '../lib/inheritance-share.ts';

/**
 * 대습 손자녀의 몫 단위는 1/3처럼 이진수로 딱 떨어지지 않는 값이 될 수 있어
 * 합이 1에서 아주 조금 벗어난다. 비율은 이 허용치 안에서 견준다.
 */
const near = (a: number, b: number, tol = 1e-12) => Math.abs(a - b) < tol;

/** 상속재산 7억 — 금액 쪽 셈을 함께 보기 위한 값 */
const ESTATE = 700_000_000;

const none: Family = { spouse: false, children: 0, parents: 0, siblings: 0, collaterals: 0 };

/** 있을 수 있는 가족 구성을 골고루 늘어놓는다 */
const FAMILIES: Family[] = [];
for (const spouse of [true, false]) {
  for (const children of [0, 1, 2, 3, 4]) {
    for (const predeceased of [[], [2], [0], [1, 3], [0, 0]]) {
      for (const parents of [0, 1, 2]) {
        for (const siblings of [0, 3]) {
          for (const collaterals of [0, 2]) {
            FAMILIES.push({ spouse, children, predeceased, parents, siblings, collaterals });
          }
        }
      }
    }
  }
}

test('몫의 합은 언제나 1이다', () => {
  /*
   * 이 파일의 중심. 어느 순위 규칙이나 가산을 잘못 고쳐도 합이 어긋나거나
   * 누군가의 몫이 음수·0·NaN이 되어 여기서 걸린다.
   */
  assert.equal(FAMILIES.length, 600);
  let withHeirs = 0;

  for (const f of FAMILIES) {
    const d = divide(f, ESTATE);
    const label = JSON.stringify(f);

    if (d.heirs.length === 0) {
      // 상속인이 없는 구성은 아래에서 따로 본다
      assert.ok(d.escheat, `${label}: 상속인이 없는데 국가귀속이 아니다`);
      assert.equal(d.totalShare, 0, label);
      continue;
    }
    withHeirs++;

    assert.ok(near(d.totalShare, 1), `${label}: 몫의 합이 ${d.totalShare}다`);
    // 금액도 재산 전액을 남김없이 나눈다
    const paid = d.heirs.reduce((s, h) => s + h.amount, 0);
    assert.ok(near(paid, ESTATE, 1e-6), `${label}: ${paid} ≠ ${ESTATE}`);

    for (const h of d.heirs) {
      assert.ok(h.share > 0 && Number.isFinite(h.share), `${label}: ${h.label}의 몫이 ${h.share}다`);
      // 몫은 단위를 단위 합계로 나눈 것이다 — 두 값이 어긋나면 어느 한쪽이 틀렸다
      assert.equal(h.share, h.unit / d.totalUnit, `${label}: ${h.label}`);
      assert.ok(near(h.amount, h.share * ESTATE, 1e-6), label);
      // 유류분은 법정상속분을 넘지 않는다
      assert.ok(h.reserve <= h.share + 1e-15, `${label}: ${h.label}의 유류분이 몫보다 크다`);
      assert.ok(near(h.reserveAmount, h.reserve * ESTATE, 1e-6), label);
    }

    // 이름이 겹치면 화면에서 두 사람이 한 줄로 뭉친다
    const labels = d.heirs.map(h => h.label);
    assert.equal(new Set(labels).size, labels.length, `${label}: 이름이 겹쳤다`);
    assert.ok(RANK_LABEL[d.rank], `${label}: ${d.rank}에 이름이 없다`);
    assert.equal(d.escheat, false, label);
  }

  /*
   * 상속인이 없는 구성은 셋뿐이다 — 아무도 없는 집에 먼저 숨진 자녀
   * (손자녀 0명)를 0개·1개·2개 얹은 경우. 나머지 597가지는 모두 상속인이
   * 있다. 걸러 내다 통째로 날린 것이 아닌지 수로 확인한다.
   */
  assert.equal(withHeirs, 597);
});

test('배우자는 자녀의 1.5배다', () => {
  /*
   * 손으로 셈한 값. 자녀 n명이면 1.5 : 1 : … 이므로 (1.5 + n)으로 나눈다.
   *   n=1 → 1.5/2.5 = 3/5,  n=2 → 1.5/3.5 = 3/7,
   *   n=3 → 1.5/4.5 = 3/9,  n=4 → 1.5/5.5 = 3/11
   * 몫 단위가 모두 이진수로 딱 떨어져 오차가 끼지 않으므로 그대로 견준다.
   */
  assert.equal(SPOUSE_WEIGHT, 1.5);
  const expected = [3 / 5, 3 / 7, 3 / 9, 3 / 11];

  for (let n = 1; n <= 4; n++) {
    const d = divide({ ...none, spouse: true, children: n }, ESTATE);
    const spouse = d.heirs.find(h => h.kind === 'spouse')!;
    const kids = d.heirs.filter(h => h.kind === 'descendant');

    assert.equal(d.totalUnit, 1.5 + n, `자녀 ${n}명`);
    assert.equal(spouse.share, expected[n - 1], `자녀 ${n}명일 때 배우자 몫이 ${spouse.share}다`);
    assert.equal(kids.length, n);
    for (const k of kids) {
      // 자녀끼리는 균등하고, 배우자가 정확히 그 1.5배다
      assert.equal(k.share, kids[0].share, `자녀 ${n}명: 자녀끼리 안 균등하다`);
      // 나눗셈을 두 번 거치므로 마지막 자리에 오차가 남는다 — 허용치 안에서 본다
      const ratio = spouse.share / k.share;
      assert.ok(near(ratio, SPOUSE_WEIGHT), `자녀 ${n}명: 가산이 ${ratio}배다`);
    }
    // 합은 1이고 금액도 재산 전액이다
    assert.ok(near(spouse.share + kids.length * kids[0].share, 1), `자녀 ${n}명`);
    assert.ok(near(spouse.amount + kids.reduce((s, k) => s + k.amount, 0), ESTATE, 1e-6));
  }

  // 배우자 없이 자녀만 있으면 그냥 균등하다
  for (const n of [1, 2, 3, 4, 5]) {
    const d = divide({ ...none, children: n });
    assert.equal(d.totalUnit, n);
    for (const h of d.heirs) assert.equal(h.share, 1 / n, `자녀 ${n}명 균등`);
  }
});

test('자녀가 있으면 부모·형제자매는 한 푼도 못 받는다', () => {
  /*
   * 앞 순위가 뒤 순위를 막는다. 조금씩 나눠 갖는 것이 아니라 아예 상속인이
   * 아니므로 목록에 들어오지도 않는다. 순위를 잘못 물리면 여기서 걸린다.
   */
  const d = divide({ spouse: true, children: 2, parents: 2, siblings: 3, collaterals: 4 }, ESTATE);
  assert.equal(d.rank, 1);
  assert.equal(shareOfKind(d, 'ascendant'), 0, '자녀가 있는데 부모가 받았다');
  assert.equal(shareOfKind(d, 'sibling'), 0, '자녀가 있는데 형제자매가 받았다');
  assert.equal(shareOfKind(d, 'collateral'), 0);
  assert.equal(d.heirs.length, 3);
  assert.equal(shareOfKind(d, 'spouse'), 3 / 7);
  assert.ok(near(shareOfKind(d, 'descendant'), 4 / 7));

  // 부모·형제자매·방계가 몇 명이든 자녀와 배우자의 몫은 꿈쩍하지 않는다
  const bare = divide({ ...none, spouse: true, children: 2 }, ESTATE);
  for (const h of ['ascendant', 'sibling', 'collateral'] as const) {
    assert.equal(shareOfKind(d, h), 0);
  }
  assert.equal(d.totalUnit, bare.totalUnit);

  // 2순위가 열리면 3·4순위가 막히고, 3순위가 열리면 4순위가 막힌다
  const second = divide({ ...none, parents: 1, siblings: 3, collaterals: 4 }, ESTATE);
  assert.equal(second.rank, 2);
  assert.equal(second.heirs.length, 1);
  assert.equal(shareOfKind(second, 'sibling'), 0);
  assert.equal(shareOfKind(second, 'collateral'), 0);

  const third = divide({ ...none, siblings: 2, collaterals: 4 }, ESTATE);
  assert.equal(third.rank, 3);
  assert.equal(third.heirs.length, 2);
  assert.equal(shareOfKind(third, 'collateral'), 0);
});

test('순위별 경계 — 배우자 단독, 자녀 단독, 부모만, 형제자매만', () => {
  // 배우자 혼자면 전액이다
  const alone = divide({ ...none, spouse: true }, ESTATE);
  assert.equal(alone.rank, 'spouse');
  assert.equal(alone.heirs.length, 1);
  assert.equal(alone.heirs[0].share, 1);
  assert.equal(alone.heirs[0].amount, ESTATE);

  /*
   * 배우자가 있고 1·2순위가 없으면 형제자매는 상속인이 아니다. 여기를 틀려
   * "배우자와 형제자매가 나눈다"고 내는 계산기가 흔하다.
   */
  const withSiblings = divide({ ...none, spouse: true, siblings: 5, collaterals: 3 }, ESTATE);
  assert.equal(withSiblings.rank, 'spouse');
  assert.equal(withSiblings.heirs.length, 1);
  assert.equal(shareOfKind(withSiblings, 'sibling'), 0, '배우자가 있는데 형제자매가 받았다');
  assert.equal(shareOfKind(withSiblings, 'spouse'), 1);

  // 자녀 단독 — 배우자가 없으면 가산할 자리가 없다
  const kidsOnly = divide({ ...none, children: 3 }, ESTATE);
  assert.equal(kidsOnly.rank, 1);
  assert.equal(kidsOnly.totalUnit, 3);
  assert.ok(near(kidsOnly.heirs[0].share, 1 / 3));

  // 부모만 — 배우자가 있으면 1.5 : 1 : 1로 갈린다
  const parentsOnly = divide({ ...none, parents: 2 }, ESTATE);
  assert.equal(parentsOnly.rank, 2);
  assert.equal(parentsOnly.heirs[0].share, 1 / 2);
  const parentsWithSpouse = divide({ ...none, spouse: true, parents: 2 }, ESTATE);
  assert.equal(shareOfKind(parentsWithSpouse, 'spouse'), 3 / 7);
  assert.ok(near(shareOfKind(parentsWithSpouse, 'ascendant'), 4 / 7));
  // 부모가 한 분이면 1.5 : 1이라 배우자가 3/5다
  const oneParent = divide({ ...none, spouse: true, parents: 1 }, ESTATE);
  assert.equal(shareOfKind(oneParent, 'spouse'), 3 / 5);
  assert.equal(shareOfKind(oneParent, 'ascendant'), 2 / 5);

  // 형제자매만 — 균등, 가산 없음
  const siblingsOnly = divide({ ...none, siblings: 4 }, ESTATE);
  assert.equal(siblingsOnly.rank, 3);
  assert.equal(siblingsOnly.heirs[0].share, 1 / 4);
  assert.equal(siblingsOnly.heirs[0].amount, ESTATE / 4);

  // 4촌 이내 방계혈족만 남은 마지막 순위
  const collateralsOnly = divide({ ...none, collaterals: 3 }, ESTATE);
  assert.equal(collateralsOnly.rank, 4);
  assert.ok(near(shareOfKind(collateralsOnly, 'collateral'), 1));
});

test('상속인이 아무도 없으면 몫을 지어내지 않는다', () => {
  /*
   * 목록은 비고 합은 0이다. 1/0을 내거나 "전액을 누군가에게" 몰아 주지 않는다.
   * 상속재산은 국가에 귀속된다(제1058조) — escheat로 알린다.
   */
  const empty = divide(none, ESTATE);
  assert.equal(empty.rank, 'none');
  assert.deepEqual(empty.heirs, []);
  assert.equal(empty.totalShare, 0);
  assert.equal(empty.totalUnit, 0);
  assert.equal(empty.escheat, true);
  assert.equal(empty.estate, ESTATE);
  assert.equal(RANK_LABEL.none, '상속인 없음');

  // 손자녀를 남기지 않고 숨진 자녀만 있으면 대습할 사람이 없다 — 역시 상속인이 없다
  const noGrandchildren = divide({ ...none, predeceased: [0, 0, 0] }, ESTATE);
  assert.equal(noGrandchildren.escheat, true);
  assert.deepEqual(noGrandchildren.heirs, []);

  // 사람 수를 0으로만 채워 넣어도 마찬가지다 — 조용히 누군가를 만들지 않는다
  const zeros = divide({ spouse: false, children: 0, predeceased: [], parents: 0, siblings: 0, collaterals: 0 }, 0);
  assert.equal(zeros.escheat, true);
  for (const [k, v] of Object.entries(zeros)) {
    if (typeof v === 'number') assert.ok(Number.isFinite(v), `${k}가 ${v}다`);
  }
});

test('대습상속 — 먼저 숨진 자녀의 몫을 그 자녀들이 나눈다', () => {
  /*
   * 배우자 + 살아 있는 자녀 1명 + 먼저 숨진 자녀 1명(손자녀 2명).
   * 몫 단위는 배우자 1.5, 살아 있는 자녀 1, 손자녀 각 0.5 → 합 3.5.
   *   배우자 1.5/3.5 = 3/7, 자녀 1/3.5 = 2/7, 손자녀 각 0.5/3.5 = 1/7
   * 손자녀가 둘이라고 그 집 몫이 두 배가 되지 않는다는 것이 핵심이다.
   */
  const d = divide({ ...none, spouse: true, children: 1, predeceased: [2] }, ESTATE);
  assert.equal(d.rank, 1);
  assert.equal(d.totalUnit, 3.5);
  assert.equal(d.heirs.length, 4);
  assert.equal(shareOfKind(d, 'spouse'), 3 / 7);
  const kid = d.heirs.find(h => h.label === '자녀 1')!;
  const grands = d.heirs.filter(h => h.substituted);
  assert.equal(kid.share, 2 / 7);
  assert.equal(grands.length, 2);
  for (const g of grands) assert.equal(g.share, 1 / 7, '손자녀가 자녀 몫을 그대로 받아 갔다');
  assert.ok(near(d.totalShare, 1));

  // 그 집 손자녀가 몇 명이든 집 몫은 자녀 한 명분이다
  for (const size of [1, 2, 3, 5, 8]) {
    const r = divide({ ...none, spouse: true, children: 1, predeceased: [size] }, ESTATE);
    const branch = r.heirs.filter(h => h.substituted);
    assert.equal(branch.length, size, `손자녀 ${size}명`);
    // 1/3처럼 딱 떨어지지 않는 단위가 섞이므로 합은 허용치 안에서 본다
    assert.ok(near(r.totalUnit, 3.5), `손자녀 ${size}명인데 단위 합이 ${r.totalUnit}이다`);
    assert.ok(
      near(branch.reduce((s, h) => s + h.share, 0), 2 / 7),
      `손자녀 ${size}명: 집 몫이 자녀 한 명분이 아니다`,
    );
  }

  // 손자녀를 남기지 않은 자녀는 상속인 수에서 빠진다 — 남은 사람끼리 나눈다
  const dropped = divide({ ...none, children: 2, predeceased: [0] }, ESTATE);
  const plain = divide({ ...none, children: 2 }, ESTATE);
  assert.equal(dropped.totalUnit, plain.totalUnit);
  assert.equal(dropped.heirs.length, 2);
  assert.equal(dropped.heirs[0].share, 1 / 2);

  /*
   * 자녀가 전원 먼저 숨져도 1순위는 열려 있다 — 부모·형제자매는 여전히
   * 상속인이 아니다. 손자녀끼리 균등이 아니라 집(株)별로 갈린다.
   */
  const allGone = divide({ spouse: false, children: 0, predeceased: [1, 2], parents: 2, siblings: 3, collaterals: 1 }, ESTATE);
  assert.equal(allGone.rank, 1);
  assert.equal(shareOfKind(allGone, 'ascendant'), 0, '자녀가 전원 숨졌다고 부모에게 넘겼다');
  assert.equal(shareOfKind(allGone, 'sibling'), 0);
  assert.equal(allGone.heirs.length, 3);
  assert.equal(allGone.heirs[0].share, 1 / 2, '외동인 집의 손자녀가 절반을 못 받았다');
  assert.equal(allGone.heirs[1].share, 1 / 4);
  assert.equal(allGone.heirs[2].share, 1 / 4);
  assert.ok(near(allGone.totalShare, 1));
});

test('유류분은 법정상속분의 1/2 또는 1/3이다', () => {
  // 비율 자체를 먼저 못 박는다
  assert.equal(RESERVE_RATIO.descendant, 1 / 2);
  assert.equal(RESERVE_RATIO.spouse, 1 / 2);
  assert.equal(RESERVE_RATIO.ascendant, 1 / 3);
  /*
   * 형제자매는 0이다. 헌법재판소가 2024. 4. 25. 민법 제1112조 제4호를
   * 위헌으로 결정해 그 조항이 효력을 잃었다. 1/3로 되돌리면 없는 권리를
   * 알려 주는 셈이 되므로 여기서 막는다.
   */
  assert.equal(RESERVE_RATIO.sibling, 0);
  assert.equal(RESERVE_RATIO.collateral, 0);

  // 배우자 + 자녀 2명: 배우자 3/7의 절반 3/14, 자녀 각 2/7의 절반 1/7
  const first = divide({ ...none, spouse: true, children: 2 }, ESTATE);
  assert.equal(first.heirs.find(h => h.kind === 'spouse')!.reserve, 3 / 14);
  for (const k of first.heirs.filter(h => h.kind === 'descendant')) {
    assert.equal(k.reserve, 1 / 7);
    assert.ok(near(k.reserveAmount, ESTATE / 7, 1e-6));
  }
  // 1순위와 배우자는 모두 1/2이라 유류분 총합이 상속재산의 절반이다
  assert.ok(near(first.heirs.reduce((s, h) => s + h.reserve, 0), 1 / 2));

  // 직계존속은 1/3 — 부모 두 분만 있으면 각 1/2의 1/3인 1/6
  const second = divide({ ...none, parents: 2 }, ESTATE);
  for (const p of second.heirs) assert.equal(p.reserve, (1 / 2) * (1 / 3));
  // 배우자와 함께면 배우자는 3/7의 1/2, 부모는 2/7의 1/3로 비율이 갈린다
  const mixed = divide({ ...none, spouse: true, parents: 2 }, ESTATE);
  assert.equal(mixed.heirs.find(h => h.kind === 'spouse')!.reserve, (3 / 7) / 2);
  assert.ok(near(mixed.heirs.find(h => h.kind === 'ascendant')!.reserve, (2 / 7) / 3));

  // 형제자매만 상속인이면 유류분은 0이다 — 상속분은 있어도 청구할 몫이 없다
  const third = divide({ ...none, siblings: 3 }, ESTATE);
  for (const s of third.heirs) {
    assert.equal(s.share, 1 / 3);
    assert.equal(s.reserve, 0, '형제자매에게 없는 유류분을 줬다');
    assert.equal(s.reserveAmount, 0);
  }

  // 어느 구성이든 유류분은 몫에 비율을 곱한 것이고 몫을 넘지 않는다
  for (const f of FAMILIES) {
    for (const h of divide(f, ESTATE).heirs) {
      assert.equal(h.reserve, h.share * RESERVE_RATIO[h.kind], `${h.label} @ ${JSON.stringify(f)}`);
      assert.ok(h.reserve <= h.share + 1e-15);
    }
  }
});

test('재산이 두 배면 각자도 두 배이고, 0에서도 무너지지 않는다', () => {
  const f: Family = { spouse: true, children: 2, predeceased: [3], parents: 2, siblings: 1, collaterals: 1 };
  const one = divide(f, 500_000_000);
  const two = divide(f, 1_000_000_000);

  for (let i = 0; i < one.heirs.length; i++) {
    // 몫은 재산과 무관하다
    assert.equal(one.heirs[i].share, two.heirs[i].share);
    assert.ok(near(two.heirs[i].amount, one.heirs[i].amount * 2, 1e-6), one.heirs[i].label);
    assert.ok(near(two.heirs[i].reserveAmount, one.heirs[i].reserveAmount * 2, 1e-6));
  }

  // 재산이 0이면 금액은 모두 0이지만 몫은 그대로 나온다 — 비율만 보러 오는 사람이 있다
  const zero = divide(f, 0);
  assert.equal(zero.estate, 0);
  assert.ok(near(zero.totalShare, 1));
  for (const h of zero.heirs) {
    assert.equal(h.amount, 0);
    assert.equal(h.reserveAmount, 0);
    assert.ok(h.share > 0, `${h.label}의 몫이 0이 됐다`);
  }
  // 금액을 안 넘겨도 0으로 본다
  assert.equal(divide(f).estate, 0);
  // 음수 재산은 0으로 자른다 — 마이너스 상속액을 나눠 보여 주지 않는다
  assert.equal(divide(f, -100_000_000).estate, 0);
});

test('식으로 되짚는다 — 배우자 몫은 3/(3+2n)이다', () => {
  /*
   * 금액 쪽 셈과 풀어 놓은 식이 어긋나면 어느 한쪽이 틀렸다.
   * n=0이면 3/3=1이 되어 배우자 단독상속과 저절로 맞는다.
   */
  for (let n = 0; n <= 6; n++) {
    const d = divide({ ...none, spouse: true, children: n }, ESTATE);
    assert.ok(
      near(shareOfKind(d, 'spouse'), spouseShareWithChildren(n)),
      `자녀 ${n}명에서 어긋났다`,
    );
    // 자녀 쪽은 남은 몫을 균등하게 나눈 것이다
    if (n > 0) {
      assert.ok(near(shareOfKind(d, 'descendant'), 1 - spouseShareWithChildren(n)), `자녀 ${n}명`);
      assert.ok(near(d.heirs[1].share, (1 - spouseShareWithChildren(n)) / n));
    }
  }
  assert.equal(spouseShareWithChildren(0), 1);
  assert.equal(spouseShareWithChildren(2), 3 / 7);
  // 자녀가 늘면 배우자 몫은 줄기만 한다
  let prev = 2;
  for (let n = 0; n <= 10; n++) {
    const s = spouseShareWithChildren(n);
    assert.ok(s < prev, `자녀 ${n}명에서 안 줄었다`);
    prev = s;
  }
});

test('지저분한 입력을 조용히 통과시키지 않는다', () => {
  // 음수와 소수는 사람 수가 될 수 없다 — 자른다
  assert.equal(divide({ ...none, children: -3 }).escheat, true);
  assert.equal(divide({ ...none, children: 2.7 }).heirs.length, 2);
  assert.equal(divide({ ...none, parents: -1, siblings: 2 }).rank, 3);
  // 손자녀 수가 음수인 집은 대습할 사람이 없는 것과 같다
  const negative = divide({ ...none, children: 1, predeceased: [-2, 1] }, ESTATE);
  assert.equal(negative.totalUnit, 2);
  assert.equal(negative.heirs.length, 2);
  assert.ok(near(negative.totalShare, 1));
  // predeceased를 아예 안 넘겨도 된다
  assert.equal(divide({ spouse: true, children: 1, parents: 0, siblings: 0, collaterals: 0 }).heirs.length, 2);
});
