/**
 * 기초연금 — 받을 수 있는지, 얼마를 받는지.
 *
 * ── 판정의 뼈대 ─────────────────────────────────────────
 * 만 65세 이상 중 **소득인정액이 선정기준액 이하**인 사람에게 준다. 소득인정액은
 * 통장에 들어오는 돈이 아니라 재산까지 소득으로 바꿔 더한 값이다.
 *
 *   소득인정액 = 소득평가액 + 재산의 소득환산액
 *
 *   소득평가액       = 0.7 × (근로소득 − 근로소득공제) + 기타소득
 *   재산의 소득환산액 = (일반재산 − 기본재산액 + 금융재산 − 금융공제 − 부채) × 4% ÷ 12
 *                      + 고급자동차·회원권 가액
 *
 * 근로소득에 0.7을 곱하는 것은 일해서 번 돈을 덜 세어 준다는 뜻이고, 재산에
 * 연 4%를 매기는 것은 "그 재산이 이만큼 벌어 줄 것으로 본다"는 뜻이다.
 * 고급자동차와 회원권은 공제 없이 전액이 그대로 월 소득으로 잡힌다.
 *
 * ── 해마다 바뀌는 값은 안 박는다 ────────────────────────────
 * 선정기준액·기준연금액·기본재산액·근로소득공제는 모두 **해마다 고시**된다.
 * 박아 두면 내년에 조용히 틀린 답을 내놓으므로 입력으로 받는다. 기본재산액은
 * 대도시·중소도시·농어촌 세 구간으로 고시되고 그 값도 해마다 오른다.
 *
 * ── 이 계산이 답하지 못하는 것 ──────────────────────────────
 * **국민연금 연계 감액**은 여기서 내지 않는다. 국민연금을 기준연금액의 150%보다
 * 많이 받으면 기초연금이 깎이는데, 그 감액은 국민연금 급여 중 A급여 부분을
 * 따로 떼어 계산해야 하고 그 값은 공단만 안다. 그럴듯한 숫자를 지어내는 대신
 * "해당될 수 있다"고만 알린다 — 실제 결정액은 공단 조회로 확인해야 한다.
 */

/** 근로소득을 소득으로 셀 때 곱하는 비율 — 일해서 번 돈은 30%를 빼고 센다 */
export const WORK_INCOME_FACTOR = 0.7;

/** 재산을 월 소득으로 바꿀 때 쓰는 연 이율 */
export const ASSET_CONVERSION_RATE = 0.04;

/** 금융재산에서 빼 주는 금액(원) — 고시사항이라 바뀔 수 있다 */
export const FINANCIAL_DEDUCTION = 20_000_000;

/** 부부가 함께 받을 때의 감액 비율 */
export const COUPLE_REDUCTION = 0.2;

/**
 * 국민연금을 이 배수보다 많이 받으면 연계 감액 대상이 될 수 있다.
 * 기준연금액의 150%다.
 */
export const LINKAGE_THRESHOLD = 1.5;

export interface BasicPensionInput {
  /** 근로소득 월액(원) */
  workIncome: number;
  /** 사업·이자·연금 등 기타소득 월액(원) */
  otherIncome: number;
  /** 근로소득공제액(원) — 해마다 고시된다 */
  workDeduction: number;
  /** 일반재산 가액(원) — 주택·토지 등 */
  generalAsset: number;
  /** 금융재산 가액(원) */
  financialAsset: number;
  /** 부채(원) */
  debt: number;
  /** 기본재산액(원) — 사는 곳에 따라 세 구간으로 고시된다 */
  basicAssetDeduction: number;
  /** 고급자동차·회원권 가액(원) — 공제 없이 전액이 월 소득으로 잡힌다 */
  luxuryAsset: number;
  /** 선정기준액(원) — 해마다 고시된다 */
  threshold: number;
  /** 기준연금액 월액(원) — 해마다 고시된다 */
  fullAmount: number;
  /** 부부가 함께 받는가 */
  couple: boolean;
  /** 받고 있는 국민연금 월액(원) — 연계 감액 대상인지만 알린다 */
  nationalPension: number;
}

export interface BasicPensionResult {
  /** 소득평가액(월, 원) */
  incomeValue: number;
  /** 재산의 소득환산액(월, 원) */
  assetValue: number;
  /** 소득인정액(월, 원) */
  recognized: number;
  /** 선정기준액까지 남은 금액(원). 음수면 초과한 것이다 */
  headroom: number;
  /** 선정기준액 이하인가 */
  eligible: boolean;
  /** 부부 감액을 적용한 금액(원) */
  afterCouple: number;
  /** 소득역전방지 감액분(원) */
  reverseCut: number;
  /** 연계 감액을 빼고 본 예상 월 수령액(원) */
  monthly: number;
  /** 국민연금 연계 감액 대상이 될 수 있는가 */
  linkageRisk: boolean;
}

export function calcBasicPension(input: BasicPensionInput): BasicPensionResult {
  const work = Math.max(0, input.workIncome - Math.max(0, input.workDeduction));
  const incomeValue = WORK_INCOME_FACTOR * work + Math.max(0, input.otherIncome);

  /*
   * 공제는 재산에서 빼되 0 아래로는 내려가지 않는다. 부채가 재산보다 많아도
   * 환산액이 음수가 되어 다른 소득을 지워 주지는 않는다.
   */
  const netAsset = Math.max(
    0,
    Math.max(0, input.generalAsset) - Math.max(0, input.basicAssetDeduction)
      + Math.max(0, Math.max(0, input.financialAsset) - FINANCIAL_DEDUCTION)
      - Math.max(0, input.debt),
  );
  const assetValue = (netAsset * ASSET_CONVERSION_RATE) / 12 + Math.max(0, input.luxuryAsset);

  const recognized = incomeValue + assetValue;
  const threshold = Math.max(0, input.threshold);
  const headroom = threshold - recognized;
  const eligible = recognized <= threshold;

  const full = Math.max(0, input.fullAmount);
  const afterCouple = input.couple ? full * (1 - COUPLE_REDUCTION) : full;

  /*
   * 소득역전방지 감액 — 기초연금을 받고 나서 소득인정액을 넘지 않도록 깎는다.
   * 받는 사람과 못 받는 사람의 형편이 뒤집히지 않게 하려는 장치다.
   */
  const reverseCut = eligible ? Math.max(0, afterCouple - headroom) : 0;
  const monthly = eligible ? Math.max(0, afterCouple - reverseCut) : 0;

  return {
    incomeValue,
    assetValue,
    recognized,
    headroom,
    eligible,
    afterCouple,
    reverseCut,
    monthly,
    linkageRisk: eligible && input.nationalPension > full * LINKAGE_THRESHOLD,
  };
}

/**
 * 재산이 얼마여야 선정기준액을 넘지 않는가 — 환산식을 뒤집는다.
 *
 * "집값이 얼마까지면 받을 수 있나"가 실제로 가장 많이 묻는 질문이다.
 * 소득이 정해져 있으면 남은 여유를 재산으로 환산해 되짚을 수 있다.
 *
 *   남은 여유(월) = 순재산 × 4% ÷ 12  →  순재산 = 남은 여유 × 12 ÷ 4%
 */
export function maxAssetFor(input: BasicPensionInput): number {
  const r = calcBasicPension({ ...input, generalAsset: 0, financialAsset: 0, debt: 0, luxuryAsset: 0 });
  const room = Math.max(0, input.threshold - r.recognized);
  const net = (room * 12) / ASSET_CONVERSION_RATE;
  // 기본재산액은 그대로 빼 주므로 그만큼 더 가질 수 있다
  return net + Math.max(0, input.basicAssetDeduction);
}
