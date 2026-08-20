/**
 * 건강보험 피부양자 자격 — 2026년 기준.
 *
 * ── 왜 계산기가 되나 ───────────────────────────────────────
 * 「피부양자에서 빠졌다」는 통보는 대개 갑자기 온다. 기준이 셋(소득·재산·부양
 * 요건)이고 **하나만 넘어도 탈락**인데, 세 기준의 단위가 서로 달라(연 소득 원,
 * 재산세 과세표준 원, 관계) 머릿속으로 맞춰 보기 어렵기 때문이다.
 *
 * 여기서는 셋을 한 번에 대 보고, 걸린 항목이 있으면 **무엇이 얼마나 넘었는지**를
 * 말해 준다. 탈락하면 지역가입자가 되므로 그쪽 계산기로 넘겨준다.
 *
 * ── 숫자의 출처와 유효기간 ─────────────────────────────────
 * 소득 2,000만 원, 재산 5.4억(과세표준), 사업소득 500만 원은 2022년 9월
 * 2단계 개편에서 정해져 유지되고 있는 값이다. 재산 기준은 9억이 아니라
 * **재산세 과세표준** 5.4억이다 — 시가와 헷갈리기 쉬운 자리라 화면에 적는다.
 *
 * 기준은 해마다 바뀔 수 있다. 바뀌면 이 파일의 상수만 고치면 된다.
 */

/** 2026년 기준값 — 바뀌면 여기만 고친다 */
export const HID_LIMITS = {
  /** 합산소득 연 2,000만 원 초과 시 탈락 */
  incomeWon: 20_000_000,
  /** 재산세 과세표준 5.4억 초과 시 탈락 */
  propertyWon: 540_000_000,
  /**
   * 과세표준 3.6억~5.4억 구간은 소득이 연 1,000만 원을 넘으면 탈락한다
   * — 재산만으로는 안 걸리고 둘을 함께 보는 구간이다.
   */
  propertyMidWon: 360_000_000,
  midIncomeWon: 10_000_000,
  /** 사업자등록이 있으면 사업소득 1원만 있어도 탈락 */
  bizRegisteredIncomeWon: 0,
  /** 사업자등록이 없으면 사업소득 연 500만 원까지 허용 */
  bizUnregisteredWon: 5_000_000,
} as const;

export interface HidInput {
  /** 사업소득을 뺀 합산소득(이자·배당·근로·연금·기타), 연 원 */
  otherIncomeWon: number;
  /** 사업소득, 연 원 */
  bizIncomeWon: number;
  /** 사업자등록이 있는가 */
  bizRegistered: boolean;
  /** 재산세 과세표준, 원 */
  propertyWon: number;
}

export interface HidCheck {
  id: 'income' | 'biz' | 'property' | 'propertyMid';
  /** 이 항목에서 걸렸는가 */
  failed: boolean;
  /** 넘은 금액(원). 안 걸렸으면 0 */
  overWon: number;
}

export interface HidResult {
  eligible: boolean;
  checks: HidCheck[];
  /** 합산소득 — 사업소득까지 더한 값 */
  totalIncomeWon: number;
}

export function checkDependent(i: HidInput): HidResult | null {
  const { otherIncomeWon, bizIncomeWon, bizRegistered, propertyWon } = i;
  if ([otherIncomeWon, bizIncomeWon, propertyWon].some(n => !Number.isFinite(n) || n < 0)) return null;

  const totalIncomeWon = otherIncomeWon + bizIncomeWon;

  /* 사업소득은 사업자등록 유무로 문턱이 완전히 달라진다 — 등록이 있으면 0원이다 */
  const bizLimit = bizRegistered ? HID_LIMITS.bizRegisteredIncomeWon : HID_LIMITS.bizUnregisteredWon;

  const checks: HidCheck[] = [
    {
      id: 'income',
      failed: totalIncomeWon > HID_LIMITS.incomeWon,
      overWon: Math.max(0, totalIncomeWon - HID_LIMITS.incomeWon),
    },
    {
      id: 'biz',
      failed: bizIncomeWon > bizLimit,
      overWon: Math.max(0, bizIncomeWon - bizLimit),
    },
    {
      id: 'property',
      failed: propertyWon > HID_LIMITS.propertyWon,
      overWon: Math.max(0, propertyWon - HID_LIMITS.propertyWon),
    },
    {
      /* 3.6억~5.4억 구간 — 재산만으로는 안 걸리지만 소득 1,000만을 넘으면 걸린다 */
      id: 'propertyMid',
      failed: propertyWon > HID_LIMITS.propertyMidWon
        && propertyWon <= HID_LIMITS.propertyWon
        && totalIncomeWon > HID_LIMITS.midIncomeWon,
      overWon: 0,
    },
  ];

  return { eligible: !checks.some(c => c.failed), checks, totalIncomeWon };
}
