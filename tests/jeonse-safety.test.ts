/**
 * 전세 보증금 안전도 — 셈을 되짚어 확인한다.
 *
 * 가장 중요한 검사는 되짚기다. "이 보증금까지는 안전하다"고 내놓은 금액을 그대로
 * 다시 넣으면 떼일 금액이 **정확히 0**이어야 하고, 거기에 1원만 얹으면 떼여야 한다.
 * 그래야 그 숫자가 협상에서 부를 수 있는 값이 된다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  GRADE_LABEL, SAFE_DEBT_RATIO, calcJeonseSafety, grade, maxSafeDeposit,
  type JeonseSafetyInput,
} from '../lib/jeonse-safety.ts';

/** 서울 아파트 시세 5억, 전세 3억, 근저당 1억 — 낙찰가율 80%, 경매비용 3% */
const base: JeonseSafetyInput = {
  marketPrice: 500_000_000,
  deposit: 300_000_000,
  seniorDebt: 100_000_000,
  auctionRatio: 80,
  auctionCostRatio: 3,
  minProtection: null,
};

test('낙찰가에서 경매비용과 선순위를 떼고 남는 것이 내 몫이다', () => {
  const r = calcJeonseSafety(base);
  // 낙찰가 = 5억 × 80% = 4억, 경매비용 3% = 1,200만, 배당재원 3억 8,800만
  assert.equal(r.auctionPrice, 400_000_000);
  assert.equal(r.auctionCost, 12_000_000);
  assert.equal(r.distributable, 388_000_000);
  // 선순위 1억을 먼저 떼면 2억 8,800만 — 보증금 3억에서 1,200만이 떼인다
  assert.equal(r.seniorPayout, 100_000_000);
  assert.equal(r.recovered, 288_000_000);
  assert.equal(r.shortfall, 12_000_000);
  assert.equal(r.grade, 'danger');
  assert.equal(GRADE_LABEL[r.grade], '위험');
});

test('되짚기 — 안전해지는 최대 보증금을 다시 넣으면 떼일 금액이 정확히 0이다', () => {
  const cases: JeonseSafetyInput[] = [];
  for (const marketPrice of [0, 90_000_000, 250_000_000, 500_000_000, 1_234_567_890]) {
    for (const seniorDebt of [0, 50_000_000, 300_000_000]) {
      for (const auctionRatio of [55, 72.5, 80, 100]) {
        for (const auctionCostRatio of [0, 1.5, 4]) {
          for (const minProtection of [
            null,
            { threshold: 165_000_000, amount: 55_000_000 },
            { threshold: 80_000_000, amount: 100_000_000 },
          ]) {
            cases.push({ marketPrice, deposit: 0, seniorDebt, auctionRatio, auctionCostRatio, minProtection });
          }
        }
      }
    }
  }

  for (const c of cases) {
    const safe = maxSafeDeposit(c);
    const label = JSON.stringify(c);
    assert.ok(Number.isInteger(safe) && safe >= 0, `원 단위 정수여야 한다: ${safe} — ${label}`);

    // 그 금액이면 한 푼도 안 떼인다
    const atSafe = calcJeonseSafety({ ...c, deposit: safe });
    assert.equal(atSafe.shortfall, 0, `안전 보증금인데 떼인다 — ${label}`);
    assert.equal(atSafe.recovered, safe, `돌려받는 돈이 보증금과 같아야 한다 — ${label}`);
    assert.notEqual(atSafe.grade, 'danger', `안전 보증금인데 위험 등급 — ${label}`);

    // 1원만 얹으면 떼인다 — 진짜 최대값이라는 뜻이다
    const over = calcJeonseSafety({ ...c, deposit: safe + 1 });
    assert.ok(over.shortfall > 0, `1원 더 얹었는데 안 떼인다 — ${label}`);
    assert.equal(over.grade, 'danger', `떼이는데 위험이 아니다 — ${label}`);

    // 계산 결과에 실린 값도 같아야 한다
    assert.equal(atSafe.safeDeposit, safe);
  }
});

test('선순위 채권이 0이면 전세가율과 부채비율이 같다', () => {
  for (const deposit of [0, 50_000_000, 300_000_000, 700_000_000]) {
    const r = calcJeonseSafety({ ...base, deposit, seniorDebt: 0 });
    assert.equal(r.jeonseRatio, r.debtRatio, `보증금 ${deposit}`);
  }
  // 선순위가 붙으면 부채비율만 올라간다
  const withDebt = calcJeonseSafety(base);
  assert.ok(Math.abs(withDebt.jeonseRatio! - 60) < 1e-9);
  assert.ok(Math.abs(withDebt.debtRatio! - 80) < 1e-9);
  assert.ok(withDebt.debtRatio! > withDebt.jeonseRatio!);
});

test('낙찰가율이 100%면 낙찰가가 시세와 같고, 낮아지면 떼일 금액이 늘어난다', () => {
  const full = calcJeonseSafety({ ...base, auctionRatio: 100, auctionCostRatio: 0 });
  assert.equal(full.auctionPrice, base.marketPrice);
  assert.equal(full.distributable, base.marketPrice);
  // 5억에서 선순위 1억을 떼도 3억이 남으니 한 푼도 안 떼인다
  assert.equal(full.shortfall, 0);

  // 낙찰가율을 내리면 떼일 금액은 줄지 않고, 안전 보증금은 늘지 않는다 (단조성)
  let prevShortfall = -1;
  let prevSafe = Number.POSITIVE_INFINITY;
  for (const auctionRatio of [100, 95, 90, 85, 80, 70, 60, 50, 40, 30, 20, 10, 0]) {
    const r = calcJeonseSafety({ ...base, auctionRatio });
    assert.ok(r.shortfall >= prevShortfall, `낙찰가율 ${auctionRatio}%에서 떼일 금액이 줄었다`);
    assert.ok(r.safeDeposit <= prevSafe, `낙찰가율 ${auctionRatio}%에서 안전 보증금이 늘었다`);
    prevShortfall = r.shortfall;
    prevSafe = r.safeDeposit;
  }
  // 끝과 끝은 실제로 벌어져 있다 — 위 두 줄이 상수를 훑고 통과한 것이 아니다
  assert.ok(calcJeonseSafety({ ...base, auctionRatio: 30 }).shortfall > calcJeonseSafety({ ...base, auctionRatio: 95 }).shortfall);
  assert.ok(calcJeonseSafety({ ...base, auctionRatio: 30 }).safeDeposit < calcJeonseSafety({ ...base, auctionRatio: 95 }).safeDeposit);
  // 아예 안 팔리면 보증금 전액을 떼인다
  assert.equal(calcJeonseSafety({ ...base, auctionRatio: 0 }).shortfall, base.deposit);

  // 최우선변제를 켜도 단조성은 그대로다
  let prevWith = -1;
  const p = { threshold: 165_000_000, amount: 55_000_000 };
  for (const auctionRatio of [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]) {
    const r = calcJeonseSafety({ ...base, deposit: 150_000_000, auctionRatio, minProtection: p });
    assert.ok(r.shortfall >= prevWith, `최우선변제 켠 채 낙찰가율 ${auctionRatio}%에서 떼일 금액이 줄었다`);
    prevWith = r.shortfall;
  }
});

test('부채비율이 100%를 넘으면 반드시 떼인다', () => {
  // 최우선변제가 없는 보통의 전세 — 시세대로 팔려도 선순위와 보증금을 다 못 덮는다
  for (const marketPrice of [200_000_000, 400_000_000, 500_000_000]) {
    for (const deposit of [150_000_000, 300_000_000, 480_000_000]) {
      for (const seniorDebt of [100_000_000, 250_000_000]) {
        for (const auctionRatio of [40, 70, 100]) {
          const r = calcJeonseSafety({
            marketPrice, deposit, seniorDebt, auctionRatio, auctionCostRatio: 2, minProtection: null,
          });
          if (r.debtRatio !== null && r.debtRatio > 100) {
            assert.ok(r.shortfall > 0, `부채비율 ${r.debtRatio}%인데 안 떼인다`);
            // 등급 판정이 이 성질과 어긋나지 않아야 한다
            assert.equal(r.grade, 'danger');
          }
        }
      }
    }
  }

  // 부채비율 100% 초과인데 안 떼이는 경우는 하나뿐이다 — 보증금이 작아
  // 최우선변제로 전액을 선순위보다 앞서 받는 소액임차인. 그때도 '안전'은 아니다.
  const small = calcJeonseSafety({
    marketPrice: 100_000_000, deposit: 30_000_000, seniorDebt: 80_000_000,
    auctionRatio: 100, auctionCostRatio: 0,
    minProtection: { threshold: 165_000_000, amount: 55_000_000 },
  });
  assert.ok(small.debtRatio! > 100);
  assert.equal(small.shortfall, 0);
  assert.equal(small.grade, 'caution');
});

test('최우선변제를 켜면 덜 떼이되 보증금보다 많이 받지는 않는다', () => {
  const p = { threshold: 165_000_000, amount: 55_000_000 };
  for (const deposit of [10_000_000, 90_000_000, 150_000_000, 164_000_000, 300_000_000]) {
    const off = calcJeonseSafety({ ...base, deposit, seniorDebt: 450_000_000, minProtection: null });
    const on = calcJeonseSafety({ ...base, deposit, seniorDebt: 450_000_000, minProtection: p });
    assert.ok(on.shortfall <= off.shortfall, `보증금 ${deposit}에서 최우선변제가 손해가 됐다`);
    assert.ok(on.recovered >= off.recovered);
    // 돌려받는 돈이 보증금을 넘을 수는 없다
    assert.ok(on.recovered <= deposit + 1e-9, `보증금 ${deposit}보다 많이 받았다`);
    assert.ok(on.shortfall >= 0);
    // 기준액을 넘는 보증금에는 적용되지 않는다
    if (deposit > p.threshold) assert.equal(on.priorityPayout, 0);
  }

  // 선순위가 배당재원을 다 먹는 상황에서 소액임차인만 앞서 받는다
  const squeezed = calcJeonseSafety({
    marketPrice: 300_000_000, deposit: 50_000_000, seniorDebt: 300_000_000,
    auctionRatio: 80, auctionCostRatio: 0,
    minProtection: { threshold: 165_000_000, amount: 55_000_000 },
  });
  // 우선변제액 5,500만보다 보증금이 작으니 보증금 5,000만 전액을 앞서 받는다
  assert.equal(squeezed.priorityPayout, 50_000_000);
  assert.equal(squeezed.shortfall, 0);
});

test('시세 0·보증금 0 같은 경계에서 0으로 나누지 않는다', () => {
  const zeroPrice = calcJeonseSafety({ ...base, marketPrice: 0 });
  assert.equal(zeroPrice.jeonseRatio, null);
  assert.equal(zeroPrice.debtRatio, null);
  assert.equal(zeroPrice.auctionPrice, 0);
  assert.equal(zeroPrice.distributable, 0);
  assert.equal(zeroPrice.shortfall, base.deposit);
  assert.equal(zeroPrice.safeDeposit, 0);
  assert.equal(zeroPrice.grade, 'danger');

  const zeroDeposit = calcJeonseSafety({ ...base, deposit: 0 });
  assert.equal(zeroDeposit.jeonseRatio, 0);
  assert.equal(zeroDeposit.recovered, 0);
  assert.equal(zeroDeposit.shortfall, 0);
  assert.equal(zeroDeposit.priorityPayout, 0);

  // 시세를 모르면 떼일 것이 없어도 안전이라 하지 않는다
  const both = calcJeonseSafety({ ...base, marketPrice: 0, deposit: 0 });
  assert.equal(both.shortfall, 0);
  assert.equal(both.grade, 'caution');

  // 음수·NaN이 들어와도 숫자가 깨지지 않는다
  for (const bad of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
    const r = calcJeonseSafety({
      marketPrice: bad, deposit: bad, seniorDebt: bad,
      auctionRatio: bad, auctionCostRatio: bad, minProtection: null,
    });
    for (const v of [r.auctionPrice, r.distributable, r.recovered, r.shortfall, r.safeDeposit]) {
      assert.ok(Number.isFinite(v), `유한한 값이어야 한다: ${v}`);
    }
  }

  // 경매비용이 100%를 넘게 들어와도 배당재원이 음수가 되지 않는다
  const hugeCost = calcJeonseSafety({ ...base, auctionCostRatio: 250 });
  assert.equal(hugeCost.distributable, 0);
  assert.equal(hugeCost.shortfall, base.deposit);
});

test('등급 규칙은 세 줄이다', () => {
  assert.equal(SAFE_DEBT_RATIO, 80);
  // 떼일 금액이 있으면 부채비율이 낮아도 위험
  assert.equal(grade(1, 10), 'danger');
  // 떼일 것이 없고 부채비율이 기준 이하면 안전
  assert.equal(grade(0, SAFE_DEBT_RATIO), 'safe');
  assert.equal(grade(0, 0), 'safe');
  // 기준을 넘으면 주의
  assert.equal(grade(0, SAFE_DEBT_RATIO + 0.1), 'caution');
  assert.equal(grade(0, 130), 'caution');
  // 시세를 모르면 안전이라 하지 않는다
  assert.equal(grade(0, null), 'caution');
  assert.equal(GRADE_LABEL.safe, '안전');
  assert.equal(GRADE_LABEL.caution, '주의');
  assert.equal(GRADE_LABEL.danger, '위험');
});
