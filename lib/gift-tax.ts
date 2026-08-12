/**
 * 증여세 — 10년 합산과 기납부세액 공제.
 *
 * ── 왜 이 파일이 생겼고, 무엇이 틀려 있었나 (2026-08-13) ──────
 * 이 셈은 `app/(ko)/calculator/gift-tax/page.tsx` 본문에 박혀 있었다. 클라이언트
 * 컴포넌트라 node가 불러올 수 없어 **어떤 검사도 그 파일을 보지 못했다.** 같은
 * 자리에서 취득세 100배 버그, 종부세 절벽 버그, 복비 경계 버그가 나왔다.
 *
 * **10년 내 사전증여를 합산하면서 이미 낸 세금을 공제하지 않았다.**
 *
 *   const totalGift = a + priorAmount;
 *   const taxBase = Math.max(0, totalGift - deduction);
 *   const tax = calcGiftTax(taxBase);          // ← 여기서 끝났다
 *
 * 법은 10년 안의 증여를 합쳐 세액을 낸 뒤 **먼저 낸 증여에 대한 세액을 공제**한다.
 * 그 공제가 없으면 사전증여분의 세금을 두 번 내는 셈이 된다.
 *
 *   3억을 받았고 10년 안에 3억을 미리 받았다면
 *     합산 6억 → 공제 5천만 → 과세표준 5.5억 → 세액 1억 500만원
 *     먼저 낸 증여의 세액 4,000만원을 공제해야 하므로 이번 세액은 6,500만원
 *   그런데 화면에는 1억 500만원이 나왔다 — 4,000만원 과다다.
 *
 * 사전증여 칸이 화면에 있어서 사람들이 실제로 그 값을 넣는다. 넣는 순간 틀렸다.
 *
 * ── 누진공제 방식은 그대로 두었다 ─────────────────────────
 * 세액을 `과세표준 × 세율 − 누진공제액`으로 내는 방식은 초과누진과 **정확히 같은
 * 값**을 낸다(누진공제액이 맞을 때만). 그 표는 옳게 적혀 있었고, 경계에서도 두
 * 구간이 같은 값을 낸다 — 그래서 여기에는 종부세 같은 절벽이 없다. 검사가 그
 * 사실을 초과누진으로 직접 되짚어 지킨다.
 *
 * ── 해마다·개정마다 바뀐다 ────────────────────────────────
 * 증여재산공제액과 세율표는 개정된다. 혼인·출산 공제는 2024년에 새로 생겼다.
 * lib/yearly-values.ts에 등록해 새해마다 훑게 했다.
 */

/** 세율 구간 — [과세표준 상한, 세율, 누진공제액] */
export const GIFT_BRACKETS: { limit: number; rate: number; deduct: number }[] = [
  { limit: 100_000_000, rate: 0.1, deduct: 0 },
  { limit: 500_000_000, rate: 0.2, deduct: 10_000_000 },
  { limit: 1_000_000_000, rate: 0.3, deduct: 60_000_000 },
  { limit: 3_000_000_000, rate: 0.4, deduct: 160_000_000 },
  { limit: Infinity, rate: 0.5, deduct: 460_000_000 },
];

export type Relation = 'spouse' | 'parent-adult' | 'parent-minor' | 'child' | 'other-kin' | 'other';

/** 증여재산공제액(원) — 10년 동안 이 금액까지 공제된다 */
export const RELATION_DEDUCTION: Record<Relation, number> = {
  'spouse': 600_000_000,
  'parent-adult': 50_000_000,
  'parent-minor': 20_000_000,
  'child': 50_000_000,
  'other-kin': 10_000_000,
  'other': 0,
};

export const RELATION_LABEL: Record<Relation, string> = {
  'spouse': '배우자',
  'parent-adult': '직계존속 → 성인 자녀',
  'parent-minor': '직계존속 → 미성년 자녀',
  'child': '직계비속 → 부모',
  'other-kin': '기타 친족 (6촌 이내 혈족 등)',
  'other': '타인',
};

/**
 * 혼인·출산 증여재산 공제 한도(원).
 *
 * 직계존속에게서 받을 때 혼인신고일 전후 또는 자녀 출생일부터 일정 기간 안이면
 * 이 금액까지 더 공제된다. **둘을 합쳐 이 한도다** — 혼인으로 다 쓰면 출산으로
 * 또 받을 수 없다.
 *
 * 기간 요건(전후 몇 년인가)과 대상 범위는 확신하지 못해 코드에 넣지 않았다.
 * 화면에서 쓸지 말지를 받고, 금액도 고칠 수 있게 두었다.
 */
export const MARRIAGE_BIRTH_DEDUCTION = 100_000_000;

/** 신고기한 안에 신고하면 산출세액에서 깎아 주는 비율 */
export const SELF_REPORT_CREDIT = 0.03;

/** 사전증여를 합산하는 기간(년) */
export const AGGREGATION_YEARS = 10;

/**
 * 과세표준에 대한 산출세액 — 누진공제 방식.
 *
 * 경계에서 두 구간이 같은 값을 내므로 `<=`로 찾아도 어긋나지 않는다. 그 사실은
 * 누진공제액이 맞을 때만 참이고, 검사가 초과누진으로 되짚어 지킨다.
 */
export function giftTaxOf(taxBase: number): number {
  if (taxBase <= 0) return 0;
  const b = GIFT_BRACKETS.find(br => taxBase <= br.limit)!;
  return Math.max(0, taxBase * b.rate - b.deduct);
}

export interface GiftTaxInput {
  /** 이번에 받은 금액(원) */
  amount: number;
  relation: Relation;
  /** 10년 안에 같은 사람에게서 미리 받은 금액(원) */
  priorAmount?: number;
  /** 혼인·출산 공제를 쓰는가 */
  marriageBirth?: boolean;
  /** 혼인·출산 공제 한도(원). 안 넘기면 지금 값 */
  marriageBirthLimit?: number;
  /** 신고기한 안에 신고하는가 */
  selfReport?: boolean;
}

export interface GiftTaxResult {
  /** 합산 증여재산(원) */
  totalGift: number;
  /** 증여재산공제 합계(원) */
  deduction: number;
  /** 관계별 공제(원) */
  relationDeduction: number;
  /** 혼인·출산 공제(원) */
  marriageBirthDeduction: number;
  /** 합산 과세표준(원) */
  taxBase: number;
  /** 합산 산출세액(원) */
  grossTax: number;
  /** 사전증여분의 세액 — 이번 세액에서 공제한다(원) */
  priorTaxCredit: number;
  /** 이번 증여의 산출세액(원) */
  tax: number;
  /** 신고세액공제(원) */
  reportCredit: number;
  /** 실제로 낼 세액(원) */
  payable: number;
  /** 실효세율 — 이번에 받은 금액에 대한 비율 */
  effectiveRate: number;
}

/**
 * 증여세.
 *
 * 사전증여가 있으면 **합쳐 세액을 낸 뒤 먼저 낸 몫을 공제한다.** 사전증여분의
 * 세액은 그 증여만 있었을 때의 세액으로 센다 — 같은 공제를 그쪽에도 한 번
 * 적용해야 하므로 이 함수를 다시 부르지 않고 같은 셈을 직접 쓴다.
 */
export function calcGiftTax({
  amount,
  relation,
  priorAmount = 0,
  marriageBirth = false,
  marriageBirthLimit = MARRIAGE_BIRTH_DEDUCTION,
  selfReport = true,
}: GiftTaxInput): GiftTaxResult {
  const now = Math.max(0, amount);
  const prior = Math.max(0, priorAmount);
  const totalGift = now + prior;

  const relationDeduction = RELATION_DEDUCTION[relation];
  const marriageBirthDeduction = marriageBirth ? Math.max(0, marriageBirthLimit) : 0;
  const deduction = relationDeduction + marriageBirthDeduction;

  const taxBase = Math.max(0, totalGift - deduction);
  const grossTax = giftTaxOf(taxBase);

  /*
   * 사전증여분의 세액 — 그 증여만 있었을 때 냈을 세액이다. 공제는 10년에 한 번
   * 쓰는 것이므로 그쪽에도 같은 공제를 적용한다. 그래서 두 셈의 공제가 겹치고,
   * 차액이 이번 증여에 대한 세액으로 남는다.
   */
  const priorTaxCredit = giftTaxOf(Math.max(0, prior - deduction));
  const tax = Math.max(0, grossTax - priorTaxCredit);

  const reportCredit = selfReport ? tax * SELF_REPORT_CREDIT : 0;
  const payable = Math.max(0, tax - reportCredit);

  return {
    totalGift,
    deduction,
    relationDeduction,
    marriageBirthDeduction,
    taxBase,
    grossTax,
    priorTaxCredit,
    tax,
    reportCredit,
    payable,
    effectiveRate: now > 0 ? payable / now : 0,
  };
}
