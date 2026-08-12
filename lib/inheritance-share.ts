/**
 * 법정상속분 — 유언이 없을 때 민법이 정해 둔 "누가 얼마를 받나".
 *
 * ── 상속세 계산기와 겹치지 않는다 ──────────────────────────────
 * app/(ko)/calculator/inheritance-tax는 재산 총액에서 공제를 빼고 **세금**을
 * 낸다. 여기서는 세금 이야기를 하지 않는다. 세금을 내고 남은 재산이든 내기 전
 * 재산이든, 그것을 **상속인끼리 어떤 비율로 가르는가**만 낸다. 물어보는 사람도
 * 다르다 — 세금은 "얼마를 떼이나", 이 계산은 "내 몫이 얼마인가"다.
 *
 * ── 순위가 앞을 막는다 (민법 제1000조) ────────────────────────
 *   1순위 직계비속(자녀·손자녀)
 *   2순위 직계존속(부모·조부모)
 *   3순위 형제자매
 *   4순위 4촌 이내 방계혈족
 *
 * 앞 순위가 한 사람이라도 있으면 뒤 순위는 **한 푼도 받지 못한다.** 자녀가
 * 있으면 부모와 형제자매의 몫은 0이다. 조금씩 나눠 갖는 것이 아니라 아예
 * 상속인이 아니다 — 이 계산에서 가장 많이 틀리는 자리라 검사가 여기를 본다.
 *
 * 같은 순위 안에서는 촌수가 가까운 쪽이 먼저다(제1000조 제2항). 자녀가 살아
 * 있으면 손자녀는 상속하지 않는다. 손자녀가 들어오는 길은 아래 대습상속뿐이다.
 *
 * ── 배우자는 순위 밖에 있다 (제1003조) ────────────────────────
 * 배우자는 1·2순위와 **늘 공동상속**한다. 1·2순위가 아무도 없으면 단독상속하고,
 * 이때 형제자매는 상속인이 아니다 — 배우자가 있으면 3·4순위는 열리지 않는다.
 *
 * ── 배우자는 1.5배 (제1009조 제2항) ───────────────────────────
 * 같은 순위 상속인끼리는 균등하고, 배우자만 그 몫의 5할을 더 받는다. 그래서
 * 배우자와 자녀 둘이면 1.5 : 1 : 1이 되고 **3.5로 나눈다.**
 *
 *   배우자 1.5 ÷ 3.5 = 3/7,  자녀 각 1 ÷ 3.5 = 2/7
 *
 * 여기서는 그 1.5와 1을 `unit`(몫 단위)으로 그대로 들고 있다가 합으로 나눈다.
 * 비율을 미리 소수로 접어 두지 않으므로 "3.5로 나눈다"가 화면에 그대로 보이고,
 * 검사도 `share === unit / totalUnit`으로 되짚을 수 있다.
 *
 * ── 대습상속 (제1001조) ───────────────────────────────────────
 * 자녀가 피상속인보다 먼저 숨졌으면 그 자녀(손자녀)가 **그 자녀의 몫을 그대로
 * 이어받아** 저희끼리 나눈다. 손자녀가 셋이라고 그 집 몫이 세 배가 되지 않는다 —
 * 한 사람 몫을 셋이 가른다. 그래서 대습상속인의 `unit`은 1이 아니라 1/(그 집
 * 손자녀 수)다. 손자녀를 남기지 않고 숨진 자녀는 그 몫이 사라지고 남은 상속인이
 * 나눈다 — 상속인 수에서 아예 빠진다.
 *
 * 자녀가 **전원** 먼저 숨진 경우에도 손자녀는 대습상속한다(대법원 2001. 3. 9.
 * 선고 99다13157). 손자녀끼리 균등하게 나누는 것이 아니라 집(株)별로 갈리므로,
 * 형제가 둘인 집의 손자녀는 외동인 집의 손자녀보다 적게 받는다. 이때도 1순위가
 * 열린 것이므로 부모·형제자매는 여전히 상속인이 아니다.
 *
 * 여기서 다루지 않는 대습: 먼저 숨진 자녀의 **배우자**(사위·며느리)의 대습상속
 * (제1003조 제2항)과 형제자매의 대습(조카). 넣으면 입력이 두 배로 늘어나는데
 * 검색해서 오는 사람이 묻는 것은 대개 손자녀 쪽이다.
 *
 * ── 유류분 (제1112조) ─────────────────────────────────────────
 * 유언으로 재산을 다 남에게 줘 버려도, 상속인은 최소한 이만큼은 돌려 달라고
 * 청구할 수 있다.
 *
 *   직계비속·배우자 → 법정상속분의 1/2
 *   직계존속       → 법정상속분의 1/3
 *
 * **형제자매의 유류분은 없다.** 헌법재판소가 2024. 4. 25. 민법 제1112조
 * 제4호(형제자매)를 위헌으로 결정해(2020헌가4 등) 그 조항은 즉시 효력을 잃었다.
 * 1/3을 적어 두면 형제자매만 상속인인 사람에게 "청구할 수 있다"고 없는 권리를
 * 알려 주는 셈이 되므로 0으로 둔다. 없어진 조항을 코드에 남기지 않는다.
 *
 * ── 이 계산이 답하지 않는 것 ──────────────────────────────────
 * 법률 상담이 아니라 **법이 정한 비율의 계산**이다. 실제로 받는 금액은
 * 기여분(제1008조의2), 특별수익(생전 증여를 미리 받은 몫, 제1008조),
 * 상속포기와 한정승인, 상속결격, 유언의 내용, 상속채무에 따라 달라진다.
 * 이런 것은 사정마다 다르고 다투는 일도 많아 여기서 판정하지 않는다.
 * 헌법재판소가 같은 결정에서 유류분 상실사유와 기여분 준용에 관한 부분을
 * 헌법불합치로 본 것도 여기서 반영하지 않는다 — 사안별 판단이 필요한 대목이다.
 */

/** 배우자 가산 — 같은 순위 상속인 몫의 1.5배 (제1009조 제2항) */
export const SPOUSE_WEIGHT = 1.5;

export type HeirKind = 'spouse' | 'descendant' | 'ascendant' | 'sibling' | 'collateral';

/**
 * 상속이 어느 순위에서 열렸는가.
 *
 * 숫자는 민법의 순위 그대로다. `'spouse'`는 1·2순위가 없어 배우자가 단독상속하는
 * 경우인데, 배우자는 순위표 밖에 있으므로 숫자를 붙일 자리가 없다. `'none'`은
 * 상속인이 아무도 없는 경우다.
 */
export type OpenedRank = 1 | 2 | 'spouse' | 3 | 4 | 'none';

export const RANK_LABEL: Record<OpenedRank, string> = {
  1: '1순위 · 직계비속',
  2: '2순위 · 직계존속',
  spouse: '배우자 단독상속',
  3: '3순위 · 형제자매',
  4: '4순위 · 4촌 이내 방계혈족',
  none: '상속인 없음',
};

/**
 * 유류분 — 법정상속분에 곱하는 비율.
 *
 * 형제자매가 0인 까닭은 위쪽 주석에 적었다(2024년 위헌 결정). 4촌 이내
 * 방계혈족은 애초에 유류분권자가 아니다 — 제1112조가 부르지 않는다.
 */
export const RESERVE_RATIO: Record<HeirKind, number> = {
  descendant: 1 / 2,
  spouse: 1 / 2,
  ascendant: 1 / 3,
  sibling: 0,
  collateral: 0,
};

export interface Family {
  /** 배우자가 있는가 */
  spouse: boolean;
  /** 살아 있는 자녀 수 */
  children: number;
  /**
   * 먼저 숨진 자녀들이 각각 남긴 자녀(손자녀) 수.
   *
   * 배열 한 칸이 먼저 숨진 자녀 한 명이다. `[2, 0, 1]`이면 세 명이 먼저
   * 숨졌고 첫째는 손자녀 둘, 둘째는 없고, 셋째는 하나를 남겼다는 뜻이다.
   * 0인 칸은 대습할 사람이 없어 상속인 수에서 빠진다.
   */
  predeceased?: number[];
  /** 살아 있는 직계존속(부모·조부모) 수 */
  parents: number;
  /** 형제자매 수 */
  siblings: number;
  /** 4촌 이내 방계혈족 수 */
  collaterals: number;
}

export interface Heir {
  kind: HeirKind;
  /** 화면에 그대로 쓰는 이름. 같은 결과 안에서 겹치지 않는다 */
  label: string;
  /** 몫 단위 — 배우자 1.5, 같은 순위 상속인 1, 대습 손자녀는 1÷그 집 인원 */
  unit: number;
  /** 법정상속분(0~1) = unit ÷ 단위 합계 */
  share: number;
  /** 상속재산에서 받을 금액(원) */
  amount: number;
  /** 이 상속인에게 적용되는 유류분 비율(1/2 · 1/3 · 0) */
  reserveRatio: number;
  /** 유류분(0~1) = 법정상속분 × 유류분 비율 */
  reserve: number;
  /** 유류분에 해당하는 금액(원) */
  reserveAmount: number;
  /** 대습상속인인가 — 먼저 숨진 자녀를 대신해 들어온 손자녀 */
  substituted: boolean;
}

export interface Division {
  /** 상속이 열린 순위 */
  rank: OpenedRank;
  /** 실제 상속인들. 순위에 막힌 사람은 애초에 들어오지 않는다 */
  heirs: Heir[];
  /** 몫 단위의 합 — 배우자와 자녀 둘이면 3.5 */
  totalUnit: number;
  /** 몫의 합. 상속인이 있으면 1, 없으면 0 */
  totalShare: number;
  /** 상속인이 아무도 없어 국가에 귀속되는가 (제1058조) */
  escheat: boolean;
  /** 실제로 나눈 상속재산(원) */
  estate: number;
}

/** 사람 수는 음수도 소수도 될 수 없다 — 지저분한 입력을 조용히 통과시키지 않는다 */
const count = (n: number): number => Math.max(0, Math.floor(n || 0));

export function divide(family: Family, estate: number = 0): Division {
  const money = Math.max(0, estate || 0);
  const children = count(family.children);
  const parents = count(family.parents);
  const siblings = count(family.siblings);
  const collaterals = count(family.collaterals);

  /*
   * 손자녀를 남기지 않고 숨진 자녀는 여기서 걸러 낸다. 대습할 사람이 없으면
   * 그 집은 상속인이 없는 것이고, 0으로 남겨 두면 1÷0으로 몫 단위가
   * Infinity가 된다.
   */
  const branches = (family.predeceased ?? []).map(count).filter(n => n > 0);

  const seed: { kind: HeirKind; label: string; unit: number; substituted?: boolean }[] = [];
  const spouseSeed = { kind: 'spouse' as HeirKind, label: '배우자', unit: SPOUSE_WEIGHT };
  let rank: OpenedRank;

  if (children > 0 || branches.length > 0) {
    /* 1순위 — 배우자를 앞에 둔다. 화면에서 제일 먼저 찾는 줄이다 */
    rank = 1;
    if (family.spouse) seed.push(spouseSeed);
    for (let i = 1; i <= children; i++) {
      seed.push({ kind: 'descendant', label: `자녀 ${i}`, unit: 1 });
    }
    branches.forEach((size, b) => {
      for (let j = 1; j <= size; j++) {
        // 그 집 몫은 자녀 한 명분(1)이고, 그것을 size명이 나눈다
        seed.push({
          kind: 'descendant',
          label: `손자녀 ${b + 1}-${j}`,
          unit: 1 / size,
          substituted: true,
        });
      }
    });
  } else if (parents > 0) {
    rank = 2;
    if (family.spouse) seed.push(spouseSeed);
    for (let i = 1; i <= parents; i++) {
      seed.push({ kind: 'ascendant', label: `직계존속 ${i}`, unit: 1 });
    }
  } else if (family.spouse) {
    /*
     * 1·2순위가 없으면 배우자 단독이다. 형제자매가 몇 명이든 상속인이 아니다.
     * 혼자라 1.5 가산은 결과에 영향이 없지만(어차피 전액), 가산을 조건부로
     * 붙였다 떼면 규칙이 두 갈래가 된다 — 그대로 둔다.
     */
    rank = 'spouse';
    seed.push(spouseSeed);
  } else if (siblings > 0) {
    rank = 3;
    for (let i = 1; i <= siblings; i++) {
      seed.push({ kind: 'sibling', label: `형제자매 ${i}`, unit: 1 });
    }
  } else if (collaterals > 0) {
    rank = 4;
    for (let i = 1; i <= collaterals; i++) {
      seed.push({ kind: 'collateral', label: `방계혈족 ${i}`, unit: 1 });
    }
  } else {
    /*
     * 아무도 없다. 몫을 지어내지 않는다 — 상속인 목록은 비고 합은 0이다.
     * 상속재산은 (특별연고자 분여 절차를 거쳐) 국가에 귀속된다(제1058조).
     */
    rank = 'none';
  }

  const totalUnit = seed.reduce((s, h) => s + h.unit, 0);
  const heirs: Heir[] = seed.map(h => {
    const share = h.unit / totalUnit;
    const reserveRatio = RESERVE_RATIO[h.kind];
    const reserve = share * reserveRatio;
    return {
      kind: h.kind,
      label: h.label,
      unit: h.unit,
      share,
      amount: share * money,
      reserveRatio,
      reserve,
      reserveAmount: reserve * money,
      substituted: h.substituted ?? false,
    };
  });

  return {
    rank,
    heirs,
    totalUnit,
    totalShare: heirs.reduce((s, h) => s + h.share, 0),
    escheat: rank === 'none',
    estate: money,
  };
}

/**
 * 종류별 몫의 합.
 *
 * 순위에 막힌 사람은 목록에 없으니 0이 나온다. 화면에서 "부모 몫 0원"을
 * 보여 주려고 쓰고, 검사에서도 순위가 제대로 앞을 막았는지 여기로 본다.
 */
export const shareOfKind = (d: Division, kind: HeirKind): number =>
  d.heirs.filter(h => h.kind === kind).reduce((s, h) => s + h.share, 0);

/**
 * 배우자와 자녀 n명만 있을 때 배우자의 몫 — 식을 풀어 둔 것.
 *
 *   1.5 ÷ (1.5 + n) = 3 ÷ (3 + 2n)
 *
 * n = 1 → 3/5, 2 → 3/7, 3 → 3/9, 4 → 3/11. 자녀가 없으면(n = 0) 3/3 = 1이
 * 되어 배우자 단독상속과 저절로 맞는다. 금액 쪽 셈을 이 식으로 되짚으면
 * 어느 한쪽을 잘못 고쳤을 때 둘이 어긋나 걸린다.
 */
export const spouseShareWithChildren = (n: number): number => 3 / (3 + 2 * count(n));
