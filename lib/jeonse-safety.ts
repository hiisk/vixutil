/**
 * 전세 보증금 안전도 — 집이 경매로 넘어가도 내 보증금이 돌아오는가.
 *
 * 셈 자체는 뺄셈 몇 번이다. 그런데도 사람들이 못 하는 계산인 까닭은 등기부를 보고
 * "선순위 채권이 얼마인가"를 뽑아내는 일과, 경매에서 집이 시세대로 팔리지 않는다는
 * 사실을 셈에 넣는 일이 따로따로여서다. 이 계산기는 그 둘을 한 줄로 잇는다.
 *
 *   낙찰가   = 시세 × 낙찰가율
 *   배당재원 = 낙찰가 − 경매비용
 *   내가 받는 돈 = 배당재원에서 선순위 채권을 먼저 떼고 남은 것 (내 보증금 한도)
 *   떼일 금액 = 보증금 − 내가 받는 돈
 *
 * ── 낙찰가율을 왜 입력받는가 ─────────────────────────────────────
 * 경매에서 시세의 몇 %에 팔리는지는 **지역·물건 종류·그 시기의 시장**에 따라 달라진다.
 * 같은 아파트도 시장이 식으면 낙찰가율이 크게 내려간다. 하나의 숫자를 박아 두면
 * 그 숫자가 답처럼 보이므로 받아 쓴다 — lib/lease-renewal.ts의 전환율과 같은 이유다.
 * 경매비용(집행비용)도 감정·공고·인건비라 물건마다 달라 비율로 받는다.
 *
 * ── 소액임차인 최우선변제를 왜 입력받는가 ────────────────────────
 * 보증금이 일정 금액 이하인 임차인은 그중 일부를 **선순위 근저당보다 앞서** 받는다.
 * 그런데 "얼마 이하가 소액이고 얼마까지 앞서 받는가"는 지역별로 다르고 대통령령·고시로
 * 정해져 여러 번 개정돼 왔다. 계약 시점에 어느 기준이 적용되는지도 근저당 설정일에
 * 따라 갈린다. 코드에 박으면 개정될 때마다 틀린 답을 자신 있게 내놓게 되므로
 * **기준액과 우선변제액을 그대로 입력받는다.** 현행 고시를 확인해 넣어 쓴다.
 * 실제로는 주택가액의 일정 비율(현행 2분의 1) 안에서만 받는 제한이 하나 더 있고
 * 그 비율도 개정돼 왔다 — 이 계산기는 그것까지는 반영하지 않는다.
 *
 * ── 이 값은 어림이다 ────────────────────────────────────────────
 * 시세도 낙찰가율도 추정이고, 등기부에 적힌 근저당 설정액(채권최고액)은 실제 남은
 * 대출 잔액보다 크게 잡히는 것이 보통이다. 앞선 임차인·조세채권·가압류처럼 등기부
 * 을구만 봐서는 드러나지 않는 선순위도 있다. 법률·투자 조언이 아니라, 계약 전에
 * 자릿수를 가늠하는 어림 계산이다.
 */

/** 소액임차인 최우선변제 — 고시로 정해지는 두 값을 그대로 받는다 */
export interface MinProtection {
  /** 소액임차인으로 보는 보증금 기준액(원). 보증금이 이 금액 이하일 때만 적용된다 */
  threshold: number;
  /** 선순위보다 앞서 받는 금액(원) */
  amount: number;
}

export interface JeonseSafetyInput {
  /** 집 시세(원) */
  marketPrice: number;
  /** 내 보증금(원) */
  deposit: number;
  /** 나보다 앞선 채권(원) — 등기부 을구의 근저당 설정액 등 */
  seniorDebt: number;
  /** 낙찰가율(%) — 경매에서 시세의 몇 %에 팔리는가 */
  auctionRatio: number;
  /** 경매비용(낙찰가의 %) */
  auctionCostRatio: number;
  /** 소액임차인 최우선변제. 해당 안 되거나 모르면 null */
  minProtection: MinProtection | null;
}

export type Grade = 'safe' | 'caution' | 'danger';

export const GRADE_LABEL: Record<Grade, string> = {
  safe: '안전',
  caution: '주의',
  danger: '위험',
};

/**
 * '안전'으로 보는 부채비율 상한(%).
 *
 * 이 80%는 법이나 고시가 정한 선이 아니라 **이 계산기가 정한 어림 기준**이다.
 * 시세가 그만큼 떨어지거나 등기부에 안 보이는 선순위가 나와도 버티는 여유를
 * 남겨 두자는 뜻일 뿐이므로, 화면에서도 어림이라고 밝힌다.
 */
export const SAFE_DEBT_RATIO = 80;

export interface JeonseSafetyResult {
  /** 낙찰가 = 시세 × 낙찰가율 */
  auctionPrice: number;
  /** 경매비용 */
  auctionCost: number;
  /** 배당에 쓰이는 돈 = 낙찰가 − 경매비용 */
  distributable: number;
  /** 최우선변제로 선순위보다 앞서 받는 금액 */
  priorityPayout: number;
  /** 선순위 채권이 가져가는 금액 */
  seniorPayout: number;
  /** 순위대로 받는 내 몫 (최우선변제분 제외) */
  ordinaryPayout: number;
  /** 내가 돌려받는 총액 = 최우선변제분 + 순위대로 받는 몫 */
  recovered: number;
  /** 떼일 금액 = 보증금 − 돌려받는 총액 */
  shortfall: number;
  /** 전세가율(%) = 보증금 ÷ 시세. 시세를 모르면 null */
  jeonseRatio: number | null;
  /** 부채비율(%) = (선순위 채권 + 보증금) ÷ 시세. 시세를 모르면 null */
  debtRatio: number | null;
  grade: Grade;
  /** 떼일 금액이 0이 되는 최대 보증금(원) — 깎아 달라고 할 때 부를 숫자 */
  safeDeposit: number;
}

const nn = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

/** 낙찰가에서 경매비용을 뗀 배당재원 — 보증금과 무관하게 정해진다 */
function distributableOf(input: JeonseSafetyInput): { auctionPrice: number; auctionCost: number; distributable: number } {
  const auctionPrice = nn(input.marketPrice) * (nn(input.auctionRatio) / 100);
  const auctionCost = Math.min(auctionPrice, auctionPrice * (nn(input.auctionCostRatio) / 100));
  return { auctionPrice, auctionCost, distributable: auctionPrice - auctionCost };
}

export function calcJeonseSafety(input: JeonseSafetyInput): JeonseSafetyResult {
  const price = nn(input.marketPrice);
  const deposit = nn(input.deposit);
  const senior = nn(input.seniorDebt);
  const { auctionPrice, auctionCost, distributable } = distributableOf(input);

  // 소액임차인이면 선순위보다 먼저 받는다. 보증금과 배당재원을 넘을 수는 없다.
  const p = input.minProtection;
  const priorityPayout =
    p && deposit > 0 && deposit <= nn(p.threshold)
      ? Math.min(nn(p.amount), deposit, distributable)
      : 0;

  // 남은 돈에서 선순위가 먼저 받고, 그다음이 내 순위다.
  const afterPriority = distributable - priorityPayout;
  const seniorPayout = Math.min(senior, afterPriority);
  const ordinaryPayout = Math.min(deposit - priorityPayout, afterPriority - seniorPayout);

  const recovered = priorityPayout + ordinaryPayout;
  const shortfall = deposit - recovered;

  // 시세가 0이면 두 비율은 정의되지 않는다 — 0으로 나누지 않고 null을 낸다.
  const jeonseRatio = price > 0 ? (deposit / price) * 100 : null;
  const debtRatio = price > 0 ? ((senior + deposit) / price) * 100 : null;

  return {
    auctionPrice,
    auctionCost,
    distributable,
    priorityPayout,
    seniorPayout,
    ordinaryPayout,
    recovered,
    shortfall,
    jeonseRatio,
    debtRatio,
    grade: grade(shortfall, debtRatio),
    safeDeposit: maxSafeDeposit(input),
  };
}

/**
 * 안전 등급 — 규칙은 이 세 줄이 전부다.
 *
 *   떼일 금액이 있으면            → 위험
 *   떼일 것은 없지만 부채비율이 높으면 → 주의
 *   둘 다 아니면                  → 안전
 *
 * 시세를 모르면(부채비율 null) 여유가 얼마인지 알 수 없으므로 안전이라 하지 않는다.
 * 부채비율이 100%를 넘으면 시세대로 팔려도 선순위와 내 보증금을 다 못 덮으니
 * 보통은 첫 줄에서 위험으로 걸린다. 예외는 보증금이 작아 최우선변제로 전액을 앞서
 * 받는 경우인데, 그때도 부채비율이 높아 '주의'까지만 간다.
 */
export function grade(shortfall: number, debtRatio: number | null): Grade {
  if (shortfall > 0) return 'danger';
  if (debtRatio === null) return 'caution';
  return debtRatio <= SAFE_DEBT_RATIO ? 'safe' : 'caution';
}

/**
 * 보증금을 얼마까지 낮추면 떼일 금액이 0이 되는가 — 협상에 쓰는 숫자다.
 *
 * 배당재원은 보증금과 무관하게 정해지므로 되짚기가 된다.
 *   ① 최우선변제를 빼고 보면, 선순위를 떼고 남는 돈까지가 안전하다 → 배당재원 − 선순위
 *   ② 소액임차인이면 기준액·우선변제액·배당재원 중 가장 작은 금액까지는
 *      선순위보다 앞서 전액을 받으므로 그 자체로 안전하다
 * 두 조건이 모두 "보증금이 얼마 이하"의 꼴이라 큰 쪽이 답이다.
 *
 * 원 단위로 내림해 답을 낸다 — 내림한 값은 반드시 안전하고, 1원만 더 얹으면 떼인다.
 */
export function maxSafeDeposit(input: JeonseSafetyInput): number {
  const { distributable } = distributableOf(input);
  const withoutProtection = distributable - nn(input.seniorDebt);
  const p = input.minProtection;
  const withProtection = p ? Math.min(nn(p.threshold), nn(p.amount), distributable) : 0;
  return Math.floor(Math.max(0, withoutProtection, withProtection));
}
