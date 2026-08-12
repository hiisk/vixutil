/**
 * 철근 117칸 — 규격 13가지 × 길이 9가지.
 *
 * 철근 무게는 표를 외워서 아는 것이 아니라 강의 밀도에서 나온다. 공칭지름으로
 * 단면적을 구하고 밀도 7850kg/m³을 곱하면 단위중량(kg/m)이고, 거기에 길이와
 * 개수를 곱하면 총 중량이다(facts.ts). 널리 쓰이는 0.006165 계수도 외울 것이
 * 아니라 그 식에서 나온 값이다 — π/4 × 7850 ÷ 10⁶.
 *
 * ── 호칭과 공칭지름은 다른 값이다 ────────────────────────
 * D13은 이름이고 공칭지름은 12.7mm다(1/2인치에서 온 값이다). 이름의 숫자를
 * 그대로 식에 넣으면 1.042kg/m가 나와 규격값 0.995kg/m와 5% 어긋난다. 마디(리브)가
 * 도드라진 철근을 매끈한 원기둥으로 셈할 수 있는 것은, 규격이 그 무게에 맞도록
 * 공칭지름을 따로 정해 두었기 때문이다.
 *
 * ── 왜 규격 단위중량을 적어 두는가 ──────────────────────
 * 계산으로 나오는 값을 또 적는 것은 검사를 위해서다. 규격값(KS D 3504·JIS G 3112가
 * 같은 값을 쓴다)은 밖에서 확인할 수 있는 유일한 숫자이므로, 이것과 밀도로 되짚은
 * 값이 어긋나면 공칭지름이나 밀도 중 한쪽이 틀린 것이다 —
 * tests/rebar-weight.test.ts가 열세 줄 전부를 그렇게 대조한다.
 */

export interface Bar {
  /** 호칭 — D13의 13. 주소와 화면 이름이 이 숫자를 쓴다 */
  d: number;
  /** 공칭지름(mm) — 셈은 전부 이 값에서 나온다 */
  mm: number;
  /** 규격 단위중량(kg/m) — 물량 산출에 쓰는 값이자 검사의 대조 상대다 */
  kg: number;
}

/** 규격 13가지 — 국내에서 유통되는 이형철근의 호칭 전부다 */
export const BARS: Bar[] = [
  { d: 6, mm: 6.35, kg: 0.249 },
  { d: 10, mm: 9.53, kg: 0.56 },
  { d: 13, mm: 12.7, kg: 0.995 },
  { d: 16, mm: 15.9, kg: 1.56 },
  { d: 19, mm: 19.1, kg: 2.25 },
  { d: 22, mm: 22.2, kg: 3.04 },
  { d: 25, mm: 25.4, kg: 3.98 },
  { d: 29, mm: 28.6, kg: 5.04 },
  { d: 32, mm: 31.8, kg: 6.23 },
  { d: 35, mm: 34.9, kg: 7.51 },
  { d: 38, mm: 38.1, kg: 8.95 },
  { d: 41, mm: 41.3, kg: 10.5 },
  { d: 51, mm: 50.8, kg: 15.9 },
];

/**
 * 길이(m) — 두 갈래를 한 축에 담았다.
 *
 * 6·8·10·12m는 **실제로 유통되는 정척**이다(국내는 8m가 기본이고 6·10·12m도
 * 정척으로 나온다). 1~5m는 그것을 현장에서 잘라 쓰는 토막 길이다 — 스터럽·띠철근처럼
 * 짧게 쓰는 자리의 물량은 이쪽으로 센다.
 *
 * 규격 전부와 길이 전부를 곱한다. 어느 지름이든 어느 길이로도 잘려 나가므로 빼 둘
 * 조합이 없고, 두 축을 다 곱하면 117칸이 된다.
 */
export const LENGTHS: number[] = [1, 2, 3, 4, 5, 6, 8, 10, 12];

export interface Cell {
  /** 호칭 숫자 */
  d: number;
  /** 길이(m) */
  length: number;
}

export const CELLS: Cell[] = BARS.flatMap(b => LENGTHS.map(length => ({ d: b.d, length })));

/** D13 6m → d13-6m. 언어를 가리지 않는 주소다 */
export const slugOf = (c: Cell): string => `d${c.d}-${c.length}m`;

export const REBAR_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const barOf = (d: number): Bar | undefined => BARS.find(b => b.d === d);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const REBAR_ICON = '🏗️';
