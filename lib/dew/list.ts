/**
 * 이슬점 189칸 — 기온 21가지 × 습도 9가지.
 *
 * 이슬점도, 절대습도도, 불쾌지수도 기온과 상대습도 둘에서 계산된다(facts.ts).
 * 적는 것은 두 구간과 간격뿐이다.
 *
 * 기온 0~40도로 잡은 것은 사람이 지내는 범위이고, 습도 20~100%는 사막에서
 * 장마철까지를 담는다. 상대습도는 100%를 넘을 수 없어 거기서 끊긴다.
 */
export const COLDEST = 0;
export const WARMEST = 40;
export const TEMP_STEP = 2;

export const DRIEST = 10;
export const WETTEST = 100;
export const RH_STEP = 10;

export const TEMPS: number[] = Array.from(
  { length: (WARMEST - COLDEST) / TEMP_STEP + 1 },
  (_, i) => COLDEST + i * TEMP_STEP,
);

export const HUMIDS: number[] = Array.from(
  { length: (WETTEST - DRIEST) / RH_STEP + 1 },
  (_, i) => DRIEST + i * RH_STEP,
);

export interface Cell {
  /** 기온(℃) */
  t: number;
  /** 상대습도(%) */
  rh: number;
}

export const CELLS: Cell[] = TEMPS.flatMap(t => HUMIDS.map(rh => ({ t, rh })));

/** 기온 26도·습도 70% → 26-70 */
export const slugOf = (c: Cell): string => `${c.t}-${c.rh}`;

export const DEW_SLUGS = CELLS.map(slugOf);

export const cellOf = (slug: string): Cell | undefined => {
  const m = /^([0-9]{1,2})-([0-9]{2,3})$/.exec(slug);
  if (!m) return undefined;
  return CELLS.find(c => c.t === Number(m[1]) && c.rh === Number(m[2]));
};

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const DEW_ICON = '💧';

/**
 * 이슬점으로 가르는 여름밤의 느낌 — 널리 쓰이는 눈금이다.
 *
 * 상대습도보다 이슬점이 몸으로 느끼는 눅눅함에 가깝다. 기온이 오르내려도
 * 이슬점은 하루 사이에 잘 변하지 않기 때문이다.
 */
export const COMFORT: { below: number; key: string }[] = [
  { below: 10, key: 'dry' },
  { below: 16, key: 'pleasant' },
  { below: 20, key: 'sticky' },
  { below: 24, key: 'muggy' },
  { below: 100, key: 'oppressive' },
];
