/**
 * 이사비 — **요금표가 없는 값**을 견적서와 맞춰 보는 계산기.
 *
 * 다른 계산기와 출발점이 다르다. 취득세는 법이 세율을 정해 두었고 수도요금은
 * 조례에 표가 있다. 이사비에는 그런 것이 **없다.** 같은 25평 포장이사가 업체와
 * 지역과 날짜에 따라 두 배로 갈리고, 금액은 결국 견적으로 정해진다.
 *
 * 그래서 이 계산은 "이사비가 얼마인가"에 답하지 않는다. 답할 수 없는 물음이다.
 * 대신 **무엇이 금액을 가르는가**를 규칙으로 두고, 업체에서 받은 단가를 넣으면
 * 항목별로 벌려 합계를 낸다. 값은 합계가 아니라 **내역**에 있다 — 견적서를 받고
 * 나서 거기 없는 줄을 짚어 낼 수 있으면 이 계산기는 할 일을 한 것이다.
 *
 * ── 무엇을 코드에 박고 무엇을 입력으로 받는가 ──────────────────────
 * lib/home-buying-cost.ts·lib/lease-renewal.ts와 같은 태도다. 확인한 값만 박고,
 * 업체·지역·날짜로 갈리는 것은 전부 입력으로 받는다. 시세를 기본값으로 넣어 두면
 * 그 숫자가 답처럼 보이고, 사람들은 견적서를 그 숫자에 맞춰 읽는다.
 *
 *   박은 것   부가세율 10%, 평↔㎡ 환산값, 이사 종류 세 가지의 **순서**
 *   받는 것   평당 단가, km당 거리 가산, 층당 계단 이용료, 사다리차 이용료,
 *             성수기 배수, 추가 항목 금액 전부
 *
 * ── 이 계산이 답하지 못하는 것 ──────────────────────────────────
 * 평수에서 짐의 양을 어림하지만, 같은 평수라도 사는 사람에 따라 짐은 크게 다르다.
 * 방 수를 평수로 바꿔 주는 표는 두지 않았다 — "원룸은 몇 평"을 우리가 정할 수는
 * 없다. 지하층·복층·엘리베이터가 있어도 짐이 못 들어가는 경우처럼 현장에서만
 * 드러나는 조건도 담지 못한다. 실측 견적을 대신하는 도구가 아니다.
 *
 * 집을 사면서 드는 돈 전체는 /calculator/home-buying-cost 쪽이다. 그 계산기는
 * 이사비를 **한 칸으로** 받는데, 그 칸에 넣을 값이 여기서 나온다.
 */

/*
 * 평↔㎡ 환산은 여기 새로 적지 않는다.
 *
 * 같은 상수가 여러 파일에 흩어지면 한쪽만 고쳐져 두 페이지가 다른 답을 낸다.
 * lib/aircon-capacity.ts가 400/121(= 3.305785㎡)을 두고 양방향 함수까지 가지고
 * 있으므로 그것을 그대로 다시 내보낸다 — 이 계산기의 평수 입력과 에어컨 용량
 * 계산기의 평수 입력은 같은 값이어야 한다.
 */
export { SQM_PER_PYEONG, pyeongToSqm, sqmToPyeong } from './aircon-capacity.ts';

/** 부가세율 — 용역 공급가액의 10% (부가가치세법 제30조) */
export const VAT_RATE = 0.1;

export type MoveType = 'basic' | 'semi' | 'packing';

/**
 * 이사 종류 — 사람 손이 얼마나 들어가는가.
 *
 * ── 이 배수는 요금표가 아니다 ───────────────────────────────────
 * 법도 고시도 아니고, 업체가 공표한 표도 아니다. **우리가 정한 순서**다
 * (lib/jeonse-safety.ts의 안전 등급 기준과 같은 성격이다). 확실한 것은
 * 부등호뿐이다 — 일반 ≤ 반포장 ≤ 포장. 사람이 더 붙고 포장재가 더 들어가니
 * 값이 내려갈 수는 없다. 그 부등호는 검사가 지킨다.
 *
 * 그래서 **평당 단가는 일반이사 기준**으로 받고, 종류 때문에 붇는 몫을
 * 내역에서 따로 보여 준다. 견적이 포장이사 금액으로 나왔다면 종류를
 * '일반이사'로 두고 그 단가를 그대로 넣는 편이 정확하다 — 배수를 한 번 더
 * 곱하면 같은 몫을 두 번 세게 된다. 화면에도 그렇게 적어 두었다.
 */
export const MOVE_TYPES: { key: MoveType; label: string; ratio: number; note: string }[] = [
  { key: 'basic', label: '일반이사', ratio: 1, note: '싸고 푸는 것은 내가 한다 — 차와 인력만' },
  { key: 'semi', label: '반포장이사', ratio: 1.25, note: '싸는 것은 내가, 옮기고 배치는 업체' },
  { key: 'packing', label: '포장이사', ratio: 1.6, note: '싸고 옮기고 풀어 정리까지 업체' },
];

export const ratioOf = (type: MoveType): number => MOVE_TYPES.find(m => m.key === type)!.ratio;
export const labelOf = (type: MoveType): string => MOVE_TYPES.find(m => m.key === type)!.label;

/**
 * 짐을 내리는 집과 올리는 집 — 층수는 두 곳에 다 있다.
 *
 * 한쪽만 세면 절반이 빠진다. 3층에서 5층으로 가는 이사는 엘리베이터가 없는
 * 층을 두 번 겪는다.
 */
export interface Site {
  /** 층수 — 1층이면 오르내릴 층이 없다. 지하는 규칙을 지어내지 않고 1층과 같게 둔다 */
  floor: number;
  /** 엘리베이터가 있는가 */
  elevator: boolean;
  /** 사다리차를 쓰는가 — 쓰면 계단으로 지지 않는다 */
  ladder: boolean;
}

export interface MovingInput {
  /** 짐의 양 — 평수. ㎡로 알고 있으면 sqmToPyeong으로 바꿔 넣는다 */
  pyeong: number;
  /** 평당 단가 (원/평, 일반이사 기준) — 업체 견적에서 받은 값을 넣는다 */
  perPyeong: number;
  /** 이사 종류 */
  moveType: MoveType;
  /** 같은 시·군 안 이동인가 — 대개 기본료에 들어 있어 거리 가산을 붙이지 않는다 */
  sameCity: boolean;
  /** 편도 거리 (km) */
  distanceKm: number;
  /** km당 거리 가산 (원/km) — 업체마다 다르다 */
  perKm: number;
  /** 짐을 내리는 집과 올리는 집 */
  sites: Site[];
  /** 엘리베이터가 없는 집의 층당 계단 이용료 (원/층) */
  perFloorFee: number;
  /** 사다리차 1대 이용료 (원) */
  ladderFee: number;
  /**
   * 손 없는 날·주말·월말 배수 — 1이면 평상시다.
   *
   * 1 아래로는 내려가지 않는다. 깎아 주는 것은 배수가 아니라 협의 할인이다.
   */
  peakMultiplier: number;
  /** 에어컨 대수 */
  airconUnits: number;
  /** 에어컨 1대 탈부착 (원) — 배관·가스 충전이 별도인 업체가 많다 */
  airconPerUnit: number;
  /** 피아노·금고 등 특수 물품 (원) */
  specialItemFee: number;
  /** 보관이사 창고 보관료 (원) */
  storageFee: number;
  /** 폐기물 처리 (원) — 대형폐기물 스티커는 지자체가 정한다 */
  disposalFee: number;
  /** 입주 청소 (원) */
  cleaningFee: number;
  /** 세금계산서를 받는가 — 켜면 업체 몫에 부가세 10%가 붙는다 */
  vat: boolean;
  /** 협의로 깎은 금액 (원) — 부가세와 섞이지 않게 맨 끝에서 뺀다 */
  discount: number;
}

/** 화면 내역 한 줄. 할인은 음수로 들어온다 */
export interface MovingItem {
  label: string;
  amount: number;
}

export interface MovingResult {
  /** 짐 몫 = 평수 × 평당 단가 */
  volumeFee: number;
  /** 이사 종류 때문에 붇는 몫 */
  typeExtra: number;
  distanceFee: number;
  /** 계단으로 오르내리는 층수 합 — 두 집을 더한 값 */
  stairFloors: number;
  stairFee: number;
  /** 사다리차를 쓰는 집의 수 */
  ladderCount: number;
  ladderTotal: number;
  /** 업체 몫 소계 — 성수기 가산 전 */
  baseSubtotal: number;
  peakExtra: number;
  /** 업체 몫 — 부가세가 붙는 대상이 이것이다 */
  companyTotal: number;
  airconFee: number;
  specialItemFee: number;
  storageFee: number;
  disposalFee: number;
  cleaningFee: number;
  /** 별도 업체·별도 요금인 추가 항목의 합 */
  extrasTotal: number;
  vatAmount: number;
  /** 실제로 뺀 할인 — 입력이 총액보다 크면 총액까지만 깎는다 */
  discount: number;
  /** 화면에 그대로 뿌리는 내역. total은 이 값들의 합과 정확히 같다 */
  items: MovingItem[];
  /** 합계 (원) */
  total: number;
}

/**
 * 원 단위로 버린다 — 항목마다 먼저 버린 뒤에 더한다.
 *
 * 반대로 하면 화면에 보이는 항목들의 합과 합계가 1원씩 어긋난다. 견적서를 옆에
 * 놓고 손으로 더해 보는 화면이라 그 1원이 신뢰를 깎는다.
 */
const won = (n: number) => Math.floor(Math.max(0, n));

export function calcMovingCost(input: MovingInput): MovingResult {
  const volumeFee = won(Math.max(0, input.pyeong) * Math.max(0, input.perPyeong));

  /*
   * 가산은 (배수 − 1)을 곱하지 않고 **곱한 값에서 원값을 뺀다.**
   *
   * 1.6 − 1이 0.6이 아니라 0.6000000000000001이라서, 100만원에 곱하면
   * 600000.0000000001이 되고 반대 방향으로 어긋나는 배수에서는 599999가 나온다.
   * 배수를 먼저 곱해 버림한 뒤에 빼면 두 값이 모두 정수라 1원이 새지 않는다.
   */
  const typeExtra = won(volumeFee * ratioOf(input.moveType)) - volumeFee;

  // 같은 시·군 안이면 거리 가산을 붙이지 않는다 — km와 단가가 들어 있어도 0이다
  const distanceFee = input.sameCity
    ? 0
    : won(Math.max(0, input.distanceKm) * Math.max(0, input.perKm));

  /*
   * 엘리베이터가 없으면 층마다 붇는다. 1층은 오르내릴 층이 없으니 가산이 없고,
   * 사다리차를 쓰는 집은 계단으로 지지 않으므로 층수를 세지 않는다.
   */
  const stairFloors = input.sites.reduce(
    (sum, s) => sum + (s.elevator || s.ladder ? 0 : Math.max(0, Math.floor(s.floor) - 1)),
    0,
  );
  const stairFee = won(stairFloors * Math.max(0, input.perFloorFee));

  const ladderCount = input.sites.filter(s => s.ladder).length;
  const ladderTotal = won(ladderCount * Math.max(0, input.ladderFee));

  const baseSubtotal = volumeFee + typeExtra + distanceFee + stairFee + ladderTotal;

  /*
   * 성수기 가산을 항목마다 곱하지 않고 **한 줄로 따로 낸다.**
   *
   * 각 항목에 곱해 넣으면 "날짜 때문에 얼마를 더 내는지"가 보이지 않는다.
   * 견적을 비교하는 화면에서는 그 줄이 따로 서 있어야 날짜를 옮길지 판단할 수
   * 있다. 배수가 걸리는 것은 사람과 차가 움직이는 업체 몫뿐이고, 아래 추가
   * 항목은 별도 업체·정액 수수료라 날짜로 오르지 않는다고 보았다.
   */
  const peakExtra = won(baseSubtotal * Math.max(1, input.peakMultiplier)) - baseSubtotal;
  const companyTotal = baseSubtotal + peakExtra;

  const airconFee = won(Math.max(0, Math.floor(input.airconUnits)) * Math.max(0, input.airconPerUnit));
  const specialItemFee = won(input.specialItemFee);
  const storageFee = won(input.storageFee);
  const disposalFee = won(input.disposalFee);
  const cleaningFee = won(input.cleaningFee);
  const extrasTotal = airconFee + specialItemFee + storageFee + disposalFee + cleaningFee;

  /*
   * 부가세는 **업체 몫에만** 붙인다.
   *
   * 추가 항목은 에어컨 기사·청소업체·지자체처럼 받는 곳이 따로고, 넣는 금액이
   * 이미 부가세 포함인 경우가 많다. 대상에 넣으면 조용히 두 번 붙는다. 그쪽에서
   * 부가세를 따로 받는다면 그 금액에 포함해 적으면 된다.
   *
   * 그리고 부가세와 현금 할인은 **다른 줄**이다. "현금으로 하면 부가세 빼 준다"는
   * 말은 세금계산서를 안 받는다는 뜻이므로 그때는 부가세를 끄는 것이 맞고,
   * 협의로 깎은 금액은 아래에서 따로 뺀다. 둘을 한 줄로 합치면 무엇을 포기했는지
   * 알 수 없게 된다.
   */
  const vatAmount = input.vat ? won(companyTotal * VAT_RATE) : 0;

  // 할인이 총액보다 크면 총액까지만 — 합계가 음수로 내려가지 않게 한다
  const gross = companyTotal + extrasTotal + vatAmount;
  const discount = Math.min(won(input.discount), gross);

  // 0원인 항목까지 늘어놓으면 내역이 읽히지 않는다. 걸러도 합은 달라지지 않는다.
  const items: MovingItem[] = [
    { label: '짐 몫 (평수 × 평당 단가)', amount: volumeFee },
    { label: `${labelOf(input.moveType)} 가산`, amount: typeExtra },
    { label: '거리 가산', amount: distanceFee },
    { label: '계단 이용료', amount: stairFee },
    { label: '사다리차', amount: ladderTotal },
    { label: '손 없는 날·주말 가산', amount: peakExtra },
    { label: '에어컨 탈부착', amount: airconFee },
    { label: '피아노·금고 등 특수 물품', amount: specialItemFee },
    { label: '보관이사 보관료', amount: storageFee },
    { label: '폐기물 처리', amount: disposalFee },
    { label: '입주 청소', amount: cleaningFee },
    { label: '부가세 10%', amount: vatAmount },
    { label: '협의 할인', amount: -discount },
  ].filter(i => i.amount !== 0);

  return {
    volumeFee,
    typeExtra,
    distanceFee,
    stairFloors,
    stairFee,
    ladderCount,
    ladderTotal,
    baseSubtotal,
    peakExtra,
    companyTotal,
    airconFee,
    specialItemFee,
    storageFee,
    disposalFee,
    cleaningFee,
    extrasTotal,
    vatAmount,
    discount,
    items,
    total: items.reduce((sum, i) => sum + i.amount, 0),
  };
}

/**
 * 견적서에서 빠지기 쉬운 항목.
 *
 * 이사비 다툼은 대개 "그건 견적에 없던 겁니다"에서 시작한다. 금액이 아니라
 * **줄이 빠진 것**이 문제다. 그래서 이 목록을 화면에 두었다 — 견적서를 받고
 * 여기 있는 줄이 그 종이에 있는지 하나씩 짚어 보는 것이 이 페이지의 쓸모다.
 */
export const OFTEN_MISSED: { label: string; why: string }[] = [
  { label: '사다리차·계단 이용료', why: '엘리베이터가 없거나 짐이 안 들어가면 그날 현장에서 붙는다. 가장 자주 빠지는 줄이다' },
  { label: '엘리베이터 사용료', why: '업체가 아니라 관리사무소에 낸다. 예약도 따로 해야 하고 못 하면 이사가 밀린다' },
  { label: '에어컨 탈부착', why: '이삿짐 업체 일이 아닌 경우가 많다. 배관 교체와 가스 충전은 또 별도다' },
  { label: '폐기물 처리', why: '버리고 갈 가구·가전은 대형폐기물 스티커를 사야 한다. 업체가 실어 가 주면 그 값이 붙는다' },
  { label: '보관이사 보관료와 재배송비', why: '날짜가 안 맞아 짐을 창고에 두면 보관료에 두 번째 운송비까지 든다' },
  { label: '입주 청소', why: '이사 전날 빈집에서 해야 값이 싸다. 짐이 들어간 뒤에는 할 수 있는 범위가 줄어든다' },
  { label: '부가세', why: '견적 금액이 부가세 별도인지 포함인지 먼저 물어야 한다. 10%면 작은 금액이 아니다' },
  { label: '주차·통행료·톨게이트', why: '주차할 곳이 없어 길을 막아야 하는 집은 그 값도 계산에 들어간다' },
  { label: '가구 해체·조립', why: '붙박이장·시스템 침대·러닝머신은 분해가 필요하고 별도로 받는 곳이 있다' },
  { label: '인터넷·정수기 이전 설치', why: '이삿짐과 무관하게 통신사·렌털사에서 따로 청구한다' },
];
