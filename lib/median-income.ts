/**
 * 기준 중위소득 — 복지 지원 자격이 걸려 있는 그 숫자.
 *
 * ── 중위소득은 평균이 아니다 ────────────────────────────────
 * 모든 가구를 소득 순으로 줄 세웠을 때 **정확히 가운데 서 있는 가구**의 소득이다.
 * 평균은 위쪽 소수의 큰 소득이 끌어올리지만 가운데 값은 그 영향을 받지 않는다.
 * 그래서 "보통 가구의 형편"을 나타내는 값으로 복지 기준에 쓴다.
 *
 * ── 급여마다 "몇 %"가 자격을 정한다 ──────────────────────────
 * 국민기초생활보장의 네 급여는 모두 **기준 중위소득의 몇 % 이하**로 대상을 고른다.
 *
 *   생계급여 32% · 의료급여 40% · 주거급여 48% · 교육급여 50%
 *
 * 이 퍼센트는 법령·고시로 정해지고 금액처럼 해마다 바뀌지는 않아 규칙으로 둔다.
 * 다만 바뀔 때 코드를 고치지 않아도 되게 인자로 갈아 끼울 수 있게 했다.
 *
 * ── 금액은 코드에 박지 않는다 ───────────────────────────────
 * 기준 중위소득 금액은 해마다 중앙생활보장위원회가 정해 고시한다. 게다가
 * **가구원 수별 금액이 서로 정비례가 아니다** — 2인 가구는 1인의 두 배가 아니고,
 * 가구원이 한 명 늘 때 붙는 폭도 일정하지 않다. 1인 기준액에 배수를 곱해 나머지를
 * 지어내면 그럴듯하게 틀린 표가 나온다. 그래서 **가구원 수별 금액을 각각 받는다.**
 *
 * ── 소득인정액은 기초연금과 기준이 다르다 ─────────────────────
 * 이름이 같고 뼈대도 같다.
 *
 *   소득인정액 = 소득평가액 + 재산의 소득환산액
 *
 * 그러나 **환산율과 공제가 제도마다 다르다.** 기초연금(lib/basic-pension.ts)은
 * 재산에 연 4%를 매겨 12로 나누는 한 가지 비율을 쓰는데, 국민기초생활보장은
 * 주거용재산·일반재산·금융재산·자동차에 각각 다른 월 환산율을 고시로 쓴다.
 * 같은 집과 같은 예금으로 두 제도의 소득인정액이 다르게 나온다는 뜻이다.
 * 여기서 그 환산을 대신 해 주면 남의 제도 숫자를 이 제도의 답처럼 내놓게 되므로,
 * **소득평가액과 재산의 소득환산액을 각각 받아 더하기만 한다.**
 *
 * ── 이 계산이 답하지 못하는 것 ──────────────────────────────
 * 차액을 주는 것은 **생계급여뿐**이다. 의료급여는 진료비 본인부담 체계로,
 * 주거급여는 지역별 기준임대료와 자기부담분으로 따로 셈하고, 교육급여는 정액으로
 * 준다. 부양의무자 기준·근로능력 판정·자동차 보유 같은 별도 요건도 여기서 보지
 * 않는다. 이 계산은 **소득 기준 한 가지만** 본다 — 실제 결정은 주민센터와
 * 복지로 신청으로 정해진다.
 */

export interface BenefitRule {
  /** 급여 이름 */
  label: string;
  /** 기준 중위소득의 몇 %가 선정기준인가 */
  percent: number;
  /** 기준액과 소득인정액의 차액을 주는 급여인가 — 생계급여만 그렇다 */
  supplemental: boolean;
}

/**
 * 급여별 선정기준 — 법령·고시가 정한 퍼센트.
 *
 * 낮은 % 순으로 둔다. 아래쪽 급여에 해당하는 가구는 위쪽 급여에도 대개
 * 해당하므로, 이 순서가 곧 "어디까지 받는가"의 순서다.
 */
export const BENEFIT_RULES: readonly BenefitRule[] = [
  { label: '생계급여', percent: 32, supplemental: true },
  { label: '의료급여', percent: 40, supplemental: false },
  { label: '주거급여', percent: 48, supplemental: false },
  { label: '교육급여', percent: 50, supplemental: false },
];

/**
 * 가구원 수별 고시액에서 우리 가구의 기준 중위소득을 고른다.
 *
 * 마지막 칸은 "그 인원 **이상**"이다 — 7인까지 받았으면 8인 가구도 7인 칸을 쓴다.
 * 배수로 늘려 짐작하지 않는다.
 */
export function medianFor(medianBySize: readonly number[], size: number): number {
  if (medianBySize.length === 0) return 0;
  const i = Math.min(Math.max(1, Math.floor(size)), medianBySize.length) - 1;
  return Math.max(0, medianBySize[i]);
}

/** 내 소득이 기준 중위소득의 몇 %인가 — 사람들이 실제로 알고 싶은 것 */
export const percentOfMedian = (income: number, median: number): number =>
  median <= 0 ? 0 : (income / median) * 100;

/** 기준 중위소득의 몇 %가 얼마인가 — 위 식을 뒤집은 것이다 */
export const amountOfMedian = (percent: number, median: number): number =>
  (median * percent) / 100;

/**
 * 차액 지급액 — 기준액에서 소득인정액을 뺀 만큼 준다.
 *
 * 생계급여가 이 모양이다. 정액을 주는 것이 아니라 **모자란 만큼을 채워 준다.**
 * 그래서 소득이 한 푼도 없으면 기준액 전액이 나오고, 소득이 기준액에 닿으면
 * 선정은 되어도 받는 돈은 0이 된다. 음수로 내려가지 않는다.
 */
export const supplementAmount = (threshold: number, recognized: number): number =>
  Math.max(0, threshold - recognized);

export interface MedianIncomeInput {
  /**
   * 가구원 수별 기준 중위소득 월액(원) — [1인, 2인, …, 7인 이상].
   * 해마다 고시되고 서로 정비례가 아니라, 각 칸을 그 해 고시표에서 그대로 옮긴다.
   */
  medianBySize: readonly number[];
  /** 가구원 수 */
  size: number;
  /** 소득평가액 월액(원) */
  incomeValue: number;
  /** 재산의 소득환산액 월액(원) — 기초생활보장 기준으로 환산한 값 */
  assetValue: number;
}

export interface BenefitLine extends BenefitRule {
  /** 선정기준액(월, 원) */
  threshold: number;
  /** 소득인정액이 기준액 이하인가 */
  eligible: boolean;
  /** 기준액까지 남은 금액(원). 음수면 초과한 것이다 */
  headroom: number;
  /** 차액 지급 급여의 예상 월 지급액(원). 차액 지급이 아니거나 탈락이면 0 */
  monthly: number;
}

export interface MedianIncomeResult {
  /** 우리 가구의 기준 중위소득 100%(월, 원) */
  median: number;
  /** 소득인정액(월, 원) */
  recognized: number;
  /** 소득인정액이 기준 중위소득의 몇 %인가 */
  percent: number;
  /** 급여별 판정 — 낮은 % 순 */
  lines: BenefitLine[];
  /** 해당하는 급여 이름 */
  eligible: string[];
  /** 생계급여 예상 월 지급액(원) */
  livelihood: number;
}

export function calcMedianIncome(
  input: MedianIncomeInput,
  rules: readonly BenefitRule[] = BENEFIT_RULES,
): MedianIncomeResult {
  const median = medianFor(input.medianBySize, input.size);
  const recognized = Math.max(0, input.incomeValue) + Math.max(0, input.assetValue);

  const lines = rules.map(rule => {
    const threshold = amountOfMedian(rule.percent, median);
    /*
     * 고시 문언이 "기준 중위소득의 32% 이하"이므로 경계값은 들어온다. 1원을
     * 넘으면 그 급여만 떨어지고 그보다 기준이 높은 급여는 그대로 남는다.
     */
    const eligible = recognized <= threshold;
    return {
      ...rule,
      threshold,
      eligible,
      headroom: threshold - recognized,
      monthly: rule.supplemental && eligible ? supplementAmount(threshold, recognized) : 0,
    };
  });

  return {
    median,
    recognized,
    percent: percentOfMedian(recognized, median),
    lines,
    eligible: lines.filter(l => l.eligible).map(l => l.label),
    livelihood: lines.find(l => l.supplemental)?.monthly ?? 0,
  };
}
