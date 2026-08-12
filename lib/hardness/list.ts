/**
 * 물 경도 120칸 — ppm 눈금 하나.
 *
 * 같은 물을 나라마다 다른 단위로 적는다. 독일 제품은 °dH로, 미국 제품은 gpg로,
 * 프랑스는 °fH로 적어서 같은 수돗물을 두고 숫자가 열 배 넘게 달라 보인다 —
 * 150ppm은 8.4°dH이고 8.76gpg이며 15°fH다. 서로 정해진 비율이라 표가 아니라
 * 계수 몇 개이고, 그 계수는 전부 정의에서 나온다(facts.ts).
 *
 * ── 왜 slug가 ppm 하나인가 ──────────────────────────────
 * 단위를 축으로 두는 것도 생각했다. `dh-10`·`gpg-8`처럼 각 단위 기준의 칸을
 * 함께 내면 "10°dH가 몇 ppm인가"로 찾아오는 사람이 바로 닿기 때문이다.
 * 그런데 다른 단위는 모두 ppm의 **정해진 배수**라, 그렇게 내면 같은 물을 두
 * 주소가 가리키게 된다:
 *
 *   fh-15  = 150ppm      → ppm-150과 **완전히 같은 물**(°fH는 ppm의 1/10이다)
 *   dh-7   = 124.93ppm   → ppm-125과 0.07ppm 차이. 재는 오차보다 작다
 *   dh-14  = 249.87ppm   → ppm-250과 0.13ppm 차이
 *
 * 0.07ppm은 어떤 수질검사도 가리지 못하는 차이다. 주소만 둘이 되고 들어오는
 * 링크가 갈리며 내용은 같다. 그래서 **축은 ppm 하나로 두고, 한 칸에서 여섯
 * 단위를 모두 보여 준다.**
 *
 * 단위로 찾아오는 사람은 허브의 되짚기 색인이 받는다 — 각 단위의 어림수마다
 * (5·10·15°dH, 3·5·10gpg …) 그 값에 가장 가까운 ppm 칸으로 링크를 건다.
 * 주소를 늘리지 않고 들어오는 길만 늘리는 쪽이다.
 *
 * ── 눈금을 어떻게 골랐나 ────────────────────────────────
 * 5ppm부터 500ppm까지 5씩(100칸), 그 위는 1000ppm까지 25씩(20칸)이다.
 *
 * 아래쪽을 촘촘히 두는 이유는 등급 경계가 다 그쪽에 있어서다 — 흔히 쓰는
 * 구간이 60·120·180ppm이고 독일 WRMG의 경계도 150·250ppm이다. 사람이 자기
 * 수질보고서의 숫자로 찾아오는 자리도 대개 500ppm 아래다. 500 위는 "매우
 * 경수"라는 답이 한 칸 건너 같아서 25씩으로도 충분하다.
 *
 * 두 구간 모두 5의 배수라 어느 값에서도 눈금이 규칙이다. 100 + 20 = 120칸.
 */

/**
 * 몰질량(g/mol) — 계수가 여기서 나온다.
 *
 * 널리 공표된 값을 적고, 원자량에서 되짚는 것은 검사가 한다
 * (Ca 40.078 + C 12.011 + O 15.999×3 = 100.086 → 100.09).
 * 옮겨 적기가 틀리면 tests/hardness-unit.test.ts가 그 자리에서 걸린다.
 */
export const MOLAR = {
  /** 탄산칼슘 — ppm(mg/L as CaCO₃)의 기준 물질이다 */
  caco3: 100.09,
  /** 산화칼슘 — 독일 도의 정의가 이것으로 되어 있다(1°dH = 10mg/L CaO) */
  cao: 56.08,
} as const;

/** 그레인(mg) — 1/7000파운드다. 453.59237g ÷ 7000 = 64.79891mg */
export const GRAIN_MG = 64.79891;

/** 영국 갤런(L) — 1985년에 이 값으로 정의됐다. 영국 도(°e)가 이것을 쓴다 */
export const IMP_GALLON_L = 4.54609;

/** 미국 갤런(L) — 231세제곱인치다. 231 × 2.54³ ÷ 1000 = 3.785411784 */
export const US_GALLON_L = 3.785411784;

/**
 * 독일 WRMG(세제법)가 그은 경도 구간의 경계(mmol/L).
 *
 * **등급 경계는 기준마다 다르다**는 것을 말로만 하지 않으려고 두었다. 이 법은
 * 1.5와 2.5mmol/L에 선을 긋고 그것을 8.4·14°dH로 적는데, 계수로 되짚으면
 * 150.1·250.2ppm이다 — 우리가 쓰는 60·120·180ppm과 아예 다른 자리다.
 */
export const WRMG_MMOL: number[] = [1.5, 2.5];

/**
 * 흔히 쓰는 등급 경계(ppm) — 넷으로 가른다.
 *
 * 미국 지질조사국(USGS)이 쓰는 구간이고 정수기·연수기 설명에서 가장 널리
 * 인용된다. **이것은 우리가 고른 어림이다** — 위의 WRMG처럼 다른 자리에 선을
 * 긋는 기준이 여럿이라, 경계 근처 값이라면 "연수냐 경수냐"를 이 표로 판정하지
 * 말고 쓰려는 제품의 기준을 봐야 한다. 화면이 열 언어로 그렇게 밝힌다.
 */
export const BAND_EDGES: number[] = [60, 120, 180];

export type UnitKey = 'ppm' | 'dh' | 'fh' | 'e' | 'gpg' | 'mmol';

export interface Unit {
  key: UnitKey;
  /** 화면과 주소에 쓰는 기호 — 열 언어가 그대로 쓴다 */
  symbol: string;
  /** 화면에 남길 소수 자리 */
  digits: number;
}

/**
 * 단위 여섯. ppm이 기준이고 나머지는 정의된 비율로 환산된다.
 *
 * 자리 수는 값이 헛되게 정밀해 보이지 않을 만큼만 남긴다 — ppm은 정수,
 * mmol/L은 1보다 작은 값이 흔해 셋이다.
 */
export const UNITS: Unit[] = [
  { key: 'ppm', symbol: 'ppm', digits: 0 },
  { key: 'dh', symbol: '°dH', digits: 2 },
  { key: 'fh', symbol: '°fH', digits: 1 },
  { key: 'e', symbol: '°e', digits: 2 },
  { key: 'gpg', symbol: 'gpg', digits: 2 },
  { key: 'mmol', symbol: 'mmol/L', digits: 3 },
];

export const unitOf = (key: string): Unit | undefined => UNITS.find(u => u.key === key);

/** 눈금 — 5~500은 5씩, 525~1000은 25씩 */
const scale = (): number[] => {
  const out: number[] = [];
  for (let v = 5; v <= 500; v += 5) out.push(v);
  for (let v = 525; v <= 1000; v += 25) out.push(v);
  return out;
};

/**
 * ppm 눈금 120칸.
 *
 * 이름이 PPMS가 아니라 CELLS인 것은 형제 섹션과 맞추려는 것이다 — 사이트맵과
 * 검색 색인이 `CELLS as HARDNESS_CELLS`로 받아 가고, 값 눈금 하나를 축으로 쓰는
 * /ring도 같은 이름의 number[]다. 배선하는 쪽이 섹션마다 다른 이름을 외울 일이 없다.
 */
export const CELLS: number[] = scale();

/** 150ppm → ppm-150. 언어를 안 가리는 주소다 */
export const slugOf = (ppm: number): string => `ppm-${ppm}`;

export const HARDNESS_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(ppm => [slugOf(ppm), ppm]));

export const ppmOf = (slug: string): number | undefined => BY_SLUG.get(slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const HARDNESS_ICON = '🚰';
