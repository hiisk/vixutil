/**
 * 화면 한 장에 들어가는 값 — 해상도와 대각선에서 계산한다.
 *
 * PPI·화면비·픽셀 수·물리적 가로세로가 전부 세 숫자에서 나온다. 표를 손으로
 * 적으면 108 × 여섯 칸이고, 하나가 틀려도 그럴듯한 숫자라 아무도 못 잡는다.
 */
import { SCREENS, screen, type Screen, type ScreenKind } from './screens.ts';

export interface ScreenFacts {
  /** 계산한 PPI — 공표값과 대조해 데이터 오류를 잡는다 */
  ppi: number;
  /** 픽셀 총수 */
  pixels: number;
  megapixels: number;
  /** 가장 간단한 정수비 — 16:9 처럼 */
  ratio: string;
  /** 긴 변이 짧은 변의 몇 배인가 — 세로 화면이든 가로 화면이든 1보다 크다 */
  ratioValue: number;
  /** 사람이 부르는 이름 — 19.5:9 처럼. 흔한 비가 아니면 정수비 그대로 */
  ratioLabel: string;
  /** 화면의 물리적 가로·세로(인치) */
  widthIn: number;
  heightIn: number;
  /** 밀리미터 */
  widthMm: number;
  heightMm: number;
  /** 화면 넓이(제곱인치) */
  areaIn2: number;
  /** 세로가 더 긴가 — 휴대폰은 대개 세로다 */
  portrait: boolean;
  /** 픽셀 하나의 크기(마이크로미터) */
  pixelUm: number;
  /** 픽셀이 하나씩 안 보이기 시작하는 거리(인치) */
  retinaIn: number;
  retinaCm: number;
  /** 해상도 등급 — 4K·QHD 처럼 부르는 이름 */
  className: string;
}

/** 화면 하나에 필요한 값을 한 덩어리로 — 페이지와 카드가 같은 것을 본다 */
export interface ScreenView extends ScreenFacts {
  name: string;
  kind: ScreenKind;
  w: number;
  h: number;
  inch: number;
  year?: number;
}

export function screenView(slug: string): ScreenView | null {
  const sc = screen(slug);
  if (!sc) return null;
  return { ...screenFacts(sc), name: sc.name, kind: sc.kind, w: sc.w, h: sc.h, inch: sc.inch, year: sc.year };
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;

export function screenFacts(sc: Screen): ScreenFacts {
  const diagPx = Math.sqrt(sc.w ** 2 + sc.h ** 2);
  const ppi = diagPx / sc.inch;
  const g = gcd(sc.w, sc.h);
  const widthIn = sc.w / ppi;
  const heightIn = sc.h / ppi;
  return {
    ppi: Math.round(ppi),
    pixels: sc.w * sc.h,
    megapixels: r1((sc.w * sc.h) / 1e6),
    // 1920×1080은 16:9로 줄지만 2532×1170처럼 안 떨어지는 것도 있다
    ratio: `${sc.w / g}:${sc.h / g}`,
    // 세로 화면에서 w/h를 그대로 쓰면 0.46이 나와 아무도 못 읽는다. 긴 변 기준으로 둔다
    ratioValue: r2(Math.max(sc.w, sc.h) / Math.min(sc.w, sc.h)),
    // 201:437은 정확하지만 아무 뜻이 없다. 19.5:9라 불러 줘야 알아본다
    ratioLabel: commonRatio(r2(sc.w / sc.h)) ?? `${sc.w / g}:${sc.h / g}`,
    widthIn: r2(widthIn),
    heightIn: r2(heightIn),
    widthMm: r1(widthIn * 25.4),
    heightMm: r1(heightIn * 25.4),
    areaIn2: r1(widthIn * heightIn),
    portrait: sc.h > sc.w,
    // 픽셀 하나의 한 변 — 1인치를 ppi로 나눈 뒤 마이크로미터로
    pixelUm: r1(25400 / ppi),
    retinaIn: r1(retinaDistanceIn(ppi)),
    retinaCm: r1(retinaDistanceIn(ppi) * 2.54),
    className: resolutionClass(sc.w, sc.h),
  };
}

/**
 * 화면비를 사람이 부르는 이름으로.
 *
 * 2532:1170을 그대로 보여 주면 아무 뜻이 없다. 흔히 쓰는 비에 가까우면 그 이름을
 * 함께 준다 — 16:9 화면과 19.5:9 화면은 손에 쥐면 완전히 다르다.
 */
export function commonRatio(ratioValue: number): string | null {
  const named: [number, string][] = [
    [1, '1:1'], [4 / 3, '4:3'], [3 / 2, '3:2'], [16 / 10, '16:10'], [16 / 9, '16:9'],
    [18 / 9, '18:9'], [19.5 / 9, '19.5:9'], [20 / 9, '20:9'], [21 / 9, '21:9'], [32 / 9, '32:9'],
  ];
  // 가로가 긴 쪽으로 맞춰 견준다 — 세로 화면은 뒤집어야 같은 비가 된다
  const v = ratioValue < 1 ? 1 / ratioValue : ratioValue;

  /*
    가장 먼저 걸리는 것이 아니라 가장 가까운 것을 고른다. 3440×1440은 21:9로 팔리지만
    실제로는 2.389라 21:9(2.333)와 2.4% 어긋난다. 그 정도를 받아 주려고 허용치를 넓히면
    이번에는 2.222(20:9)가 19.5:9(2.167)에 먼저 걸려 버린다. 둘 다 담으려면 순서가 아니라
    거리로 골라야 한다.
  */
  let best: string | null = null;
  let bestErr = 0.03;
  for (const [target, label] of named) {
    const err = Math.abs(v - target) / target;
    if (err < bestErr) { best = label; bestErr = err; }
  }
  return best;
}

/** 같은 갈래에서 화면 크기가 가까운 것들 — 견주기 좋게 */
export function similarScreens(slug: string, limit = 8): Screen[] {
  const me = SCREENS.find(s => s.slug === slug);
  if (!me) return [];
  const gap = (x: Screen) => Math.abs(x.inch - me.inch);
  const same = SCREENS.filter(s => s.slug !== slug && s.kind === me.kind).sort((a, b) => gap(a) - gap(b));
  const other = SCREENS.filter(s => s.slug !== slug && s.kind !== me.kind).sort((a, b) => gap(a) - gap(b));
  return [...same, ...other].slice(0, limit);
}

/**
 * 픽셀이 하나씩 구분되지 않기 시작하는 거리.
 *
 * 사람 눈이 갈라 보는 한계가 대략 1각분(1/60도)이다. 픽셀 하나가 그보다 작게
 * 보이는 거리부터는 아무리 좋은 눈도 격자를 못 찾는다. 1각분의 탄젠트가
 * 1/3438이므로 거리 = 픽셀 크기 × 3438이고, 픽셀 크기가 1/ppi이니 3438/ppi다.
 *
 * 460ppi 휴대폰은 19cm, 68ppi 65인치 TV는 1.3m — 왜 TV가 더 낮은 밀도로도
 * 충분한지가 이 한 줄에 들어 있다.
 */
export function retinaDistanceIn(ppi: number): number {
  return 3438 / ppi;
}

/**
 * 해상도를 부르는 이름.
 *
 * 가로로 긴 화면은 긴 변으로 부른다 — 3840이면 4K다. 그런데 세로로 긴 휴대폰은
 * 관행이 다르다. 1206×2622를 긴 변으로 부르면 "QHD"가 되는데 아무도 그렇게
 * 부르지 않는다. 폭이 1080이면 FHD+, 1440이면 QHD+로 짧은 변을 기준 삼는다.
 *
 * 그래서 16:9보다 길쭉한 화면만 짧은 변으로, 나머지는 긴 변으로 잰다.
 * 태블릿은 세로로 들어도 4:3이라 긴 변 쪽으로 간다.
 */
export function resolutionClass(w: number, h: number): string {
  const long = Math.max(w, h);
  const short = Math.min(w, h);

  // 16:9보다 길쭉하면 휴대폰 이름 규칙을 쓴다
  if (long / short > 1.79) {
    for (const [px, label] of [[1440, 'QHD+'], [1200, '1.5K'], [1080, 'FHD+'], [720, 'HD+']] as [number, string][]) {
      if (short >= px) return label;
    }
  }

  const table: [number, string][] = [
    [7680, '8K UHD'], [5120, '5K'], [4096, 'DCI 4K'], [3840, '4K UHD'], [3440, 'UWQHD'],
    [3200, 'QHD+'], [3024, '3K'], [2880, '2.8K'], [2560, 'QHD'], [2256, '2.2K'],
    [1920, 'Full HD'], [1600, 'HD+'], [1280, 'HD'], [1024, 'XGA'], [800, 'SVGA'], [640, 'VGA'],
  ];
  for (const [px, label] of table) if (long >= px) return label;
  return `${w}\u00d7${h}`;
}
