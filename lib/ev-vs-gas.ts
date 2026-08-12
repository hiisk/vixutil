/**
 * 전기차 vs 내연차 유지비 비교 — "차값이 비싸도 유지비로 뽑을 수 있나".
 *
 * 이미 있는 계산기들은 한 쪽만 본다. /calculator/ev-charge는 한 번의 충전비를,
 * /calculator/gas-cost는 한 번의 주유비를, /calculator/car-cost는 차 한 대의 한 해
 * 유지비를 낸다. 정작 사람들이 묻는 것은 **두 차를 맞대었을 때 언제 뒤집히는가**다.
 * 그 하나를 여기서 낸다.
 *
 * ── 전비와 연비를 어떻게 맞대는가 ──────────────────────────────
 * 단위가 달라 보이지만 셈은 같다. 둘 다 "에너지 한 단위로 가는 거리"이므로
 *
 *   연간 에너지비 = 주행거리 ÷ (에너지 한 단위로 가는 거리) × 에너지 단가
 *
 * 전기차는 전비(km/kWh)와 원/kWh, 내연차는 연비(km/L)와 원/L을 넣으면 된다.
 * 그래서 두 차를 같은 모양(Powertrain)으로 받고, 셈은 lib/car-cost.ts의
 * carCost를 그대로 쓴다 — 0으로 나누지 않게 막아 둔 곳도 하나로 유지된다.
 *
 * ── 왜 아무 숫자도 박아 두지 않았는가 ──────────────────────────
 * 충전 단가는 완속이냐 급속이냐, 어느 사업자냐에 따라 몇 배로 갈리고 정책에 따라
 * 자주 바뀐다. 유가는 주마다, 주유소마다 다르다. 자동차세는 전기차가 정액으로
 * 낮지만 지방세라 부가되는 몫이 있고, 정비비는 차종과 연식에 따라 몇 배씩 벌어진다.
 * 취득 때의 감면과 보조금은 해마다·지자체마다 바뀐다. 확인 못 한 값을 기본값으로
 * 박아 두면 그 숫자가 답처럼 보이는데, 이 계산기는 답이 뒤집히는 지점을 내는
 * 계산기라 기본값 하나가 결론을 바꾼다. 그래서 전부 입력으로 받는다.
 *
 * ── 여기서 세지 않는 것 ────────────────────────────────────────
 * 보험료·주차비·통행료처럼 두 차에 비슷하게 드는 항목은 차액에서 서로 지워지므로
 * 다루지 않는다. 그래서 여기 나오는 "총비용"은 소유에 드는 돈 전부가 아니라
 * **두 차를 가르는 항목만 모은 비교용 금액**이다. 배터리 교체나 잔존가치처럼
 * 값을 매기기 어려운 것도 빠져 있다.
 */

import { carCost } from './car-cost.ts';

/** 음수·NaN·Infinity를 0으로 — 누적 총비용이 연수에 대해 늘기만 하도록 지킨다 */
const nonneg = (n: number): number => (Number.isFinite(n) && n > 0 ? n : 0);

export interface Powertrain {
  /** 차값(원). 취등록세처럼 살 때 함께 낸 돈까지 넣는다 */
  price: number;
  /**
   * 취득 때 감면·지원받는 돈(원). 전기차의 개별소비세·취득세 감면과 보조금이
   * 여기 들어간다. 내연차도 취득세를 내지만 보통 차값에 얹어 세므로 0으로 둔다.
   */
  taxCut: number;
  /** 에너지 한 단위로 가는 거리 — 전기차는 전비(km/kWh), 내연차는 연비(km/L) */
  kmPerUnit: number;
  /** 에너지 단가 — 전기차는 원/kWh, 내연차는 원/L */
  unitPrice: number;
  /** 자동차세(원/년). 전기차는 정액이라 보통 내연차보다 낮다 */
  tax: number;
  /** 정비·소모품(원/년) */
  maintenance: number;
}

export interface EvVsGasInput {
  /** 연간 주행거리(km) */
  km: number;
  /** 보유 연수 */
  years: number;
  ev: Powertrain;
  gas: Powertrain;
}

export interface SideCost {
  /** 처음에 내는 돈 = 차값 − 감면(원) */
  upfront: number;
  /** 연간 에너지비(원) */
  energy: number;
  /** 자동차세(원/년) */
  tax: number;
  /** 정비비(원/년) */
  maintenance: number;
  /** 해마다 되풀이되는 합(원/년) */
  yearly: number;
  /** 1km 가는 데 드는 에너지비(원) — 전비·연비를 같은 자로 맞댄 값 */
  energyPerKm: number;
}

export interface CumRow {
  /** 몇 년째 */
  year: number;
  /** 그때까지 전기차에 들어간 돈(원) */
  ev: number;
  /** 그때까지 내연차에 들어간 돈(원) */
  gas: number;
  /** 내연차 − 전기차. 양수면 전기차가 앞선 상태 */
  diff: number;
}

export interface EvVsGasResult {
  ev: SideCost;
  gas: SideCost;
  /** 전기차의 초기 추가 부담 = 전기차 upfront − 내연차 upfront. 음수면 전기차가 더 싸다 */
  upfrontGap: number;
  /** 전기차가 해마다 아끼는 돈 = 내연차 yearly − 전기차 yearly. 음수면 오히려 더 든다 */
  yearlySaving: number;
  /** 차값 차이를 유지비 차이로 회수하는 연수. 못 회수하면 null (breakevenYears 참고) */
  breakevenYears: number | null;
  /** 보유 연수별 누적 총비용 (1년째부터 years년째까지) */
  table: CumRow[];
  /** 보유 기간이 끝났을 때의 차액(원). 양수면 그때까지 전기차가 이득 */
  netAtEnd: number;
}

/** 한 쪽의 처음 비용과 해마다 드는 돈 */
export function sideCost(km: number, p: Powertrain): SideCost {
  const distance = nonneg(km);
  const kmPerUnit = nonneg(p.kmPerUnit);
  const unitPrice = nonneg(p.unitPrice);
  const tax = nonneg(p.tax);
  const maintenance = nonneg(p.maintenance);

  // 에너지비·연간 합계는 lib/car-cost.ts에 이미 있는 셈을 쓴다.
  // 보험료·주차비는 두 차에서 서로 지워지므로 0으로 넣는다.
  const c = carCost({
    km: distance,
    kmpl: kmPerUnit,
    fuelPrice: unitPrice,
    tax,
    insurance: 0,
    maintenance,
    parking: 0,
  });

  return {
    upfront: nonneg(p.price) - nonneg(p.taxCut),
    energy: c.fuel,
    tax: c.tax,
    maintenance: c.maintenance,
    yearly: c.yearly,
    energyPerKm: kmPerUnit > 0 ? unitPrice / kmPerUnit : 0,
  };
}

/**
 * 그 해까지 들어간 누적 총비용(원).
 *
 * 처음에 낸 돈에 해마다 드는 돈을 연수만큼 더한다. years에 소수를 넣어도 되게
 * 둔 것은 손익분기 연수(보통 소수)에서 두 쪽이 정말 같아지는지 되짚기 위해서다.
 */
export const cumulativeCost = (s: SideCost, years: number): number =>
  s.upfront + s.yearly * nonneg(years);

/**
 * 차값 차이를 유지비 차이로 회수하는 연수.
 *
 *   회수 연수 = (전기차 초기 추가 부담) ÷ (해마다 아끼는 돈)
 *
 * 정의를 여기서 못 박는다:
 *  - 초기 추가 부담이 0 이하면 **0**이다. 회수할 차값 차이가 없다 —
 *    전기차가 처음부터 싸거나 같으므로 기다릴 필요가 없다.
 *  - 해마다 아끼는 돈이 0 이하면 **null**이다. 유지비까지 더 드니 두 선은
 *    영원히 만나지 않는다. 이때 억지로 숫자를 내면 없는 손익분기를 지어내는 셈이다.
 *
 * 반올림하지 않는다 — 이 값을 cumulativeCost에 넣으면 두 쪽이 같아져야 한다.
 */
export function breakevenYears(ev: SideCost, gas: SideCost): number | null {
  const upfrontGap = ev.upfront - gas.upfront;
  const yearlySaving = gas.yearly - ev.yearly;
  if (upfrontGap <= 0) return 0;
  if (yearlySaving <= 0) return null;
  return upfrontGap / yearlySaving;
}

export function compareEvVsGas(input: EvVsGasInput): EvVsGasResult {
  const ev = sideCost(input.km, input.ev);
  const gas = sideCost(input.km, input.gas);
  const years = Math.floor(nonneg(input.years));

  const table: CumRow[] = [];
  for (let y = 1; y <= years; y++) {
    const e = cumulativeCost(ev, y);
    const g = cumulativeCost(gas, y);
    table.push({ year: y, ev: e, gas: g, diff: g - e });
  }

  return {
    ev,
    gas,
    upfrontGap: ev.upfront - gas.upfront,
    yearlySaving: gas.yearly - ev.yearly,
    breakevenYears: breakevenYears(ev, gas),
    table,
    netAtEnd: cumulativeCost(gas, years) - cumulativeCost(ev, years),
  };
}
