/**
 * 아파트 관리비 진단.
 *
 * 관리비는 "우리 집이 많이 내는 편인가"를 알기 어렵다. 단지마다 항목 구성이
 * 다르고, 고지서에는 총액과 항목만 있지 비교 기준이 없기 때문이다.
 *
 * 그래서 이 계산기는 두 가지만 한다.
 *  1) 전용면적으로 나눠 ㎡당 단가를 낸다 — 평수가 다른 집끼리 비교하려면 이게 필요하다
 *  2) 공용관리비와 개별사용료를 나눠 보여준다 — 줄일 수 있는 항목이 어느 쪽인지 갈린다
 *
 * 단가 기준선은 지역·연식·단지 규모에 따라 크게 달라져서 어떤 값도 "정답"이
 * 아니다. 공동주택관리정보시스템(K-apt)에 실제 단지별 평균이 공개돼 있으므로
 * 정확한 비교는 그쪽을 안내한다. 여기서는 우리 집 구조만 보여준다.
 */

/** 공용관리비 — 단지 전체가 나눠 내는 몫. 개인이 아껴도 잘 안 줄어든다. */
export const COMMON_KEYS = ['general', 'security', 'cleaning', 'disinfect', 'elevator', 'repair'] as const;
/** 개별사용료 — 우리 집이 쓴 만큼 낸다. 아끼면 바로 줄어든다. */
export const INDIVIDUAL_KEYS = ['heating', 'hotWater', 'electricity', 'water', 'gas'] as const;

export type CommonKey = (typeof COMMON_KEYS)[number];
export type IndividualKey = (typeof INDIVIDUAL_KEYS)[number];
export type FeeKey = CommonKey | IndividualKey;

export const FEE_LABELS: Record<FeeKey, string> = {
  general: '일반관리비',
  security: '경비비',
  cleaning: '청소비',
  disinfect: '소독비',
  elevator: '승강기유지비',
  repair: '수선유지비',
  heating: '난방비',
  hotWater: '급탕비',
  electricity: '전기료',
  water: '수도료',
  gas: '가스사용료',
};

export type FeeInput = Partial<Record<FeeKey, number>>;

export interface FeeItem {
  key: FeeKey;
  label: string;
  amount: number;
  /** 총액에서 차지하는 비율 (%) */
  share: number;
}

export interface MaintenanceResult {
  total: number;
  common: number;
  individual: number;
  /** 공용관리비 비중 (%) */
  commonShare: number;
  /** 전용면적 ㎡당 총 관리비 (원) */
  perSqm: number;
  /** 전용면적 평당 총 관리비 (원) */
  perPyeong: number;
  /** 금액이 큰 순으로 정렬된 항목 (0원 항목은 제외) */
  items: FeeItem[];
  /** 가장 큰 항목 — 줄일 여지를 볼 때 여기부터 본다 */
  top: FeeItem | null;
}

/** 1평 = 3.305785㎡ */
export const SQM_PER_PYEONG = 3.305785;

function sum(input: FeeInput, keys: readonly FeeKey[]): number {
  return keys.reduce((acc, k) => acc + Math.max(0, input[k] ?? 0), 0);
}

/**
 * @param input 항목별 금액 (원)
 * @param areaSqm 전용면적 (㎡) — 0 이하면 단가는 0으로 둔다
 */
export function calcMaintenance(input: FeeInput, areaSqm: number): MaintenanceResult {
  const common = sum(input, COMMON_KEYS);
  const individual = sum(input, INDIVIDUAL_KEYS);
  const total = common + individual;

  const items: FeeItem[] = ([...COMMON_KEYS, ...INDIVIDUAL_KEYS] as FeeKey[])
    .map(key => ({
      key,
      label: FEE_LABELS[key],
      amount: Math.max(0, input[key] ?? 0),
      share: total > 0 ? (Math.max(0, input[key] ?? 0) / total) * 100 : 0,
    }))
    .filter(it => it.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const area = areaSqm > 0 ? areaSqm : 0;

  return {
    total,
    common,
    individual,
    commonShare: total > 0 ? (common / total) * 100 : 0,
    perSqm: area > 0 ? total / area : 0,
    perPyeong: area > 0 ? total / (area / SQM_PER_PYEONG) : 0,
    items,
    top: items[0] ?? null,
  };
}

/**
 * 같은 면적 기준으로 다른 집과 비교했을 때의 차액.
 * 단가를 직접 비교하는 것이 평수가 다른 집끼리 견주는 유일한 방법이다.
 */
export function compareBySqm(perSqm: number, otherPerSqm: number, areaSqm: number): number {
  if (areaSqm <= 0) return 0;
  return (perSqm - otherPerSqm) * areaSqm;
}
