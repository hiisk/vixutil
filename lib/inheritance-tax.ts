/**
 * 상속세 — 공제 셈이 세율보다 어렵다.
 *
 * ── 왜 이 파일이 생겼고, 무엇이 틀려 있었나 (2026-08-13) ──────
 * 이 셈은 `app/(ko)/calculator/inheritance-tax/page.tsx` 본문에 박혀 있었다.
 * 클라이언트 컴포넌트라 node가 불러올 수 없어 **어떤 검사도 보지 못했다.** 같은
 * 자리에서 취득세 100배 버그, 종부세 절벽 버그, 복비 경계 버그, 증여세 기납부세액
 * 누락이 나왔다. 흠이 셋 있었다.
 *
 * **(1) 세율표가 세 번째 사본이었다.**
 * 상속세와 증여세는 같은 법(상속세 및 증여세법)의 같은 세율표를 쓴다. 그런데 표가
 * 증여세 계산기 페이지, 상속세 계산기 페이지에 따로 적혀 있었다. 이제 둘 다
 * lib/gift-tax.ts의 `GIFT_BRACKETS` 하나를 가져다 쓴다 — 세율이 개정될 때 한 곳만
 * 고치면 된다.
 *
 * **(2) 금융재산공제가 20%뿐이었다.**
 *
 *   const financialDeduct = Math.min(Number(financial) * 0.2, 200_000_000);
 *
 * 실제 규칙은 계단이다 — 2천만원 이하면 **전액**, 2천만~1억이면 **2천만원**,
 * 1억을 넘으면 20%(한도 2억)다. 20%만 매기면 작은 금융재산에서 크게 어긋난다.
 *
 *   금융재산 1,000만원   공제 200만원  →  1,000만원 (전액)
 *   금융재산 5,000만원   공제 1,000만원 →  2,000만원
 *
 * 상속재산 대부분이 부동산이고 금융재산은 몇천만원인 집이 흔하다 — 가장 잦은
 * 경우에서 공제가 절반 이하로 나왔다.
 *
 * **(3) 배우자 공제가 상속재산의 50%를 법정상속분으로 잡았다.**
 *
 *   const spouseDeduct = hasSpouse ? Math.max(5억, Math.min(e * 0.5, 30억)) : 0;
 *
 * 배우자의 법정상속분은 자녀 수에 따라 달라진다 — 자녀가 하나면 60%, 둘이면 약
 * 42.9%, 셋이면 약 33.3%다. 50%는 어느 경우에도 맞지 않는다. 이 사이트에는 그
 * 값을 내는 함수가 이미 있었다(`lib/inheritance-share.ts`의
 * `spouseShareWithChildren`, 3/(3+2n)). 그것을 가져다 쓴다.
 *
 * ── 이 계산기가 판단하지 않는 것 ──────────────────────────
 * 배우자 공제는 「실제 상속받은 금액」도 한도로 걸리는데, 실제로 얼마를 받을지는
 * 협의분할로 정해진다. 그 값을 지어내지 않고 **법정상속분 기준의 한도**를 보여
 * 준다 — 실제 상속분을 넣으면 그것도 함께 물린다. 동거주택 상속공제, 가업상속공제,
 * 사전증여 합산, 세대생략 할증은 다루지 않는다.
 */

import { GIFT_BRACKETS, giftTaxOf } from './gift-tax.ts';
import { spouseShareWithChildren } from './inheritance-share.ts';

/** 상속세 세율표 — 증여세와 같은 표다. 사본을 만들지 않는다 */
export { GIFT_BRACKETS as INHERITANCE_BRACKETS } from './gift-tax.ts';

/** 기초공제(원) */
export const BASIC_DEDUCTION = 200_000_000;
/** 자녀공제 1인당(원) */
export const CHILD_DEDUCTION = 50_000_000;
/** 일괄공제(원) — 기초공제 + 인적공제와 견주어 큰 쪽을 쓴다 */
export const LUMP_DEDUCTION = 500_000_000;
/** 배우자 공제의 최소 보장액(원) */
export const SPOUSE_MIN_DEDUCTION = 500_000_000;
/** 배우자 공제 한도(원) */
export const SPOUSE_MAX_DEDUCTION = 3_000_000_000;
/** 금융재산공제 한도(원) */
export const FINANCIAL_MAX_DEDUCTION = 200_000_000;
/** 신고기한 안에 신고하면 깎아 주는 비율 */
export const SELF_REPORT_CREDIT = 0.03;

/**
 * 금융재산 상속공제 — 계단이다.
 *
 *   2천만원 이하        전액
 *   2천만~1억           2천만원
 *   1억 초과            20% (한도 2억)
 *
 * 가운데 칸이 평평한 것이 이 규칙의 핵심이다. 20%만 매기면 작은 금융재산에서
 * 공제가 절반 이하로 나온다 — 그것이 원래 틀려 있던 곳이다.
 */
export function financialDeduction(financial: number): number {
  const f = Math.max(0, financial);
  if (f <= 20_000_000) return f;
  if (f <= 100_000_000) return 20_000_000;
  return Math.min(f * 0.2, FINANCIAL_MAX_DEDUCTION);
}

/**
 * 배우자의 법정상속분 비율.
 *
 * 자녀가 있으면 `lib/inheritance-share.ts`의 3/(3+2n)을 쓴다 — 그 파일이 상속
 * 지분 계산기의 셈이고, 같은 값을 여기 다시 적으면 한쪽만 고쳐진다. 자녀가
 * 없으면 배우자가 전부를 받는다(부모가 없을 때).
 */
export function spouseLegalShare(children: number): number {
  const n = Math.max(0, Math.floor(children));
  return n === 0 ? 1 : spouseShareWithChildren(n);
}

export interface InheritanceTaxInput {
  /** 상속재산 총액(원) */
  estate: number;
  /** 배우자가 있는가 */
  hasSpouse?: boolean;
  /** 자녀 수 */
  children?: number;
  /** 상속재산 중 금융재산(원) */
  financial?: number;
  /**
   * 배우자가 실제로 상속받는 금액(원). 0이면 법정상속분 기준으로만 한도를 본다.
   * 협의분할로 정해지는 값이라 지어내지 않는다.
   */
  spouseActual?: number;
  /** 신고기한 안에 신고하는가 */
  selfReport?: boolean;
}

export interface InheritanceTaxResult {
  estate: number;
  basicDeduction: number;
  childDeduction: number;
  /** 기초+인적 공제와 일괄공제 가운데 큰 쪽(원) */
  unifiedDeduction: number;
  /** 일괄공제가 이겼는가 — 자녀가 적으면 그렇다 */
  usedLump: boolean;
  /** 배우자의 법정상속분 비율 */
  spouseShare: number;
  /** 배우자 공제(원) */
  spouseDeduction: number;
  /** 금융재산공제(원) */
  financialDeduction: number;
  totalDeduction: number;
  taxBase: number;
  /** 산출세액(원) */
  tax: number;
  /** 신고세액공제(원) */
  reportCredit: number;
  /** 실제로 낼 세액(원) */
  payable: number;
  /** 실효세율 — 상속재산에 대한 비율 */
  effectiveRate: number;
}

export function calcInheritanceTax({
  estate,
  hasSpouse = true,
  children = 0,
  financial = 0,
  spouseActual = 0,
  selfReport = true,
}: InheritanceTaxInput): InheritanceTaxResult {
  const e = Math.max(0, estate);
  const n = Math.max(0, Math.floor(children));

  const childDeduction = n * CHILD_DEDUCTION;
  const personal = BASIC_DEDUCTION + childDeduction;
  const unifiedDeduction = Math.max(LUMP_DEDUCTION, personal);
  const usedLump = LUMP_DEDUCTION >= personal;

  const spouseShare = hasSpouse ? spouseLegalShare(n) : 0;
  /*
   * 법정상속분 기준의 한도와 30억 한도를 함께 물리고, 최소 5억을 보장한다.
   * 실제 상속분을 넣었으면 그것도 한도가 된다 — 실제로 받은 것보다 많이 공제받을
   * 수는 없기 때문이다.
   */
  const spouseCap = Math.min(e * spouseShare, SPOUSE_MAX_DEDUCTION);
  const spouseDeduction = !hasSpouse
    ? 0
    : Math.max(
        SPOUSE_MIN_DEDUCTION,
        spouseActual > 0 ? Math.min(spouseCap, spouseActual) : spouseCap,
      );

  const finDeduction = financialDeduction(financial);
  const totalDeduction = unifiedDeduction + spouseDeduction + finDeduction;

  const taxBase = Math.max(0, e - totalDeduction);
  const tax = giftTaxOf(taxBase);
  const reportCredit = selfReport ? tax * SELF_REPORT_CREDIT : 0;
  const payable = Math.max(0, tax - reportCredit);

  return {
    estate: e,
    basicDeduction: BASIC_DEDUCTION,
    childDeduction,
    unifiedDeduction,
    usedLump,
    spouseShare,
    spouseDeduction,
    financialDeduction: finDeduction,
    totalDeduction,
    taxBase,
    tax,
    reportCredit,
    payable,
    effectiveRate: e > 0 ? payable / e : 0,
  };
}

/** 세율표가 증여세와 같은 표인지 — 검사가 이것을 쓴다 */
export const SHARES_GIFT_BRACKETS = GIFT_BRACKETS;
