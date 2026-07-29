/**
 * 색 변환·계산의 순수 함수 모음.
 *
 * 색은 눈으로 맞다/틀리다를 판단하기 어렵다 — 대비 4.5:1이 맞는지, 색약
 * 시뮬레이션이 제대로 된 변환인지는 봐서는 알 수 없다. 그래서 계산은 전부
 * 여기 모으고 값이 알려진 예(흰-검 대비 21:1 등)로 테스트에 고정한다.
 */

export interface RGB { r: number; g: number; b: number }
export interface HSL { h: number; s: number; l: number }

const clamp = (v: number, min = 0, max = 255) => Math.min(max, Math.max(min, v));

export function hexToRgb(hex: string): RGB | null {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) h = [...h].map(c => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  return '#' + [r, g, b].map(v => Math.round(clamp(v)).toString(16).padStart(2, '0')).join('');
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const R = r / 255, G = g / 255, B = b / 255;
  const max = Math.max(R, G, B), min = Math.min(R, G, B);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === R) h = ((G - B) / d + (G < B ? 6 : 0)) / 6;
  else if (max === G) h = ((B - R) / d + 2) / 6;
  else h = ((R - G) / d + 4) / 6;

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const H = ((h % 360) + 360) % 360 / 360;
  const S = clamp(s, 0, 100) / 100;
  const L = clamp(l, 0, 100) / 100;
  if (S === 0) {
    const v = Math.round(L * 255);
    return { r: v, g: v, b: v };
  }
  const q = L < 0.5 ? L * (1 + S) : L + S - L * S;
  const p = 2 * L - q;
  const channel = (t: number) => {
    let T = t;
    if (T < 0) T += 1;
    if (T > 1) T -= 1;
    if (T < 1 / 6) return p + (q - p) * 6 * T;
    if (T < 1 / 2) return q;
    if (T < 2 / 3) return p + (q - p) * (2 / 3 - T) * 6;
    return p;
  };
  return {
    r: Math.round(channel(H + 1 / 3) * 255),
    g: Math.round(channel(H) * 255),
    b: Math.round(channel(H - 1 / 3) * 255),
  };
}

export const hexToHsl = (hex: string): HSL | null => {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsl(rgb) : null;
};
export const hslToHex = (hsl: HSL): string => rgbToHex(hslToRgb(hsl));

/** 인쇄용 CMYK(단순 변환). 실제 인쇄 색은 잉크·용지에 따라 달라진다. */
export function rgbToCmyk({ r, g, b }: RGB): { c: number; m: number; y: number; k: number } {
  const R = r / 255, G = g / 255, B = b / 255;
  const k = 1 - Math.max(R, G, B);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - R - k) / (1 - k)) * 100),
    m: Math.round(((1 - G - k) / (1 - k)) * 100),
    y: Math.round(((1 - B - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

/* ────────────────────────────────
   대비 — 접근성
   ──────────────────────────────── */

/** WCAG 상대 휘도. 눈이 초록을 가장 밝게 느끼므로 채널마다 가중치가 다르다. */
export function luminance({ r, g, b }: RGB): number {
  const f = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/** 두 색의 대비비(1~21). 흰색과 검은색이 21:1로 최대다. */
export function contrastRatio(a: RGB, b: RGB): number {
  const la = luminance(a), lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export interface ContrastVerdict {
  ratio: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
}

export function judgeContrast(a: RGB, b: RGB): ContrastVerdict {
  const ratio = contrastRatio(a, b);
  return {
    ratio: Math.round(ratio * 100) / 100,
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaaNormal: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  };
}

/* ────────────────────────────────
   색약 시뮬레이션
   ──────────────────────────────── */

/**
 * Brettel–Viénot 계열의 근사 행렬. 실제 색각은 사람마다 정도가 달라
 * 이 결과가 그 사람이 보는 그대로는 아니지만, "이 조합이 구분되는가"를
 * 가늠하는 데는 충분하다.
 */
const CVD_MATRIX = {
  protanopia: [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758],
  deuteranopia: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
  tritanopia: [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525],
  achromatopsia: [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114],
} as const;

export type CvdType = keyof typeof CVD_MATRIX;

export const CVD_LABEL: Record<CvdType, string> = {
  protanopia: '적색맹 (P형)',
  deuteranopia: '녹색맹 (D형)',
  tritanopia: '청색맹 (T형)',
  achromatopsia: '전색맹 (흑백)',
};

export function simulateCvd(rgb: RGB, type: CvdType): RGB {
  const m = CVD_MATRIX[type];
  return {
    r: Math.round(clamp(rgb.r * m[0] + rgb.g * m[1] + rgb.b * m[2])),
    g: Math.round(clamp(rgb.r * m[3] + rgb.g * m[4] + rgb.b * m[5])),
    b: Math.round(clamp(rgb.r * m[6] + rgb.g * m[7] + rgb.b * m[8])),
  };
}

/* ────────────────────────────────
   조화·변형
   ──────────────────────────────── */

export type Harmony = 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'monochrome';

export const HARMONY_LABEL: Record<Harmony, string> = {
  complementary: '보색 (반대편)',
  analogous: '유사색 (이웃)',
  triadic: '삼각 배색',
  tetradic: '사각 배색',
  monochrome: '단색 명도 변화',
};

/** 색상환에서 규칙에 따라 색을 고른다. */
export function harmony(base: HSL, kind: Harmony): HSL[] {
  const rotate = (deg: number): HSL => ({ ...base, h: (base.h + deg + 360) % 360 });
  switch (kind) {
    case 'complementary': return [base, rotate(180)];
    case 'analogous': return [rotate(-30), base, rotate(30)];
    case 'triadic': return [base, rotate(120), rotate(240)];
    case 'tetradic': return [base, rotate(90), rotate(180), rotate(270)];
    case 'monochrome':
      return [20, 35, 50, 65, 80].map(l => ({ ...base, l }));
  }
}

/** 흰색(틴트)과 검은색(셰이드) 쪽으로 단계를 만든다 — 디자인 시스템의 50~900 */
export function scale(base: HSL, steps = 10): { step: number; hsl: HSL }[] {
  return Array.from({ length: steps }, (_, i) => {
    const l = 95 - (i * 90) / (steps - 1);
    return { step: i === 0 ? 50 : i * 100, hsl: { ...base, l: Math.round(l) } };
  });
}

/** 두 색 사이를 RGB 공간에서 섞는다. ratio 0이면 a, 1이면 b. */
export function mix(a: RGB, b: RGB, ratio: number): RGB {
  const t = Math.min(1, Math.max(0, ratio));
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

/* ────────────────────────────────
   색온도
   ──────────────────────────────── */

/**
 * 켈빈 → RGB (Tanner Helland 근사식).
 * 1000K는 촛불처럼 붉고, 6500K가 한낮 햇빛, 그 위로는 푸르스름해진다.
 */
export function kelvinToRgb(kelvin: number): RGB {
  const t = Math.min(40000, Math.max(1000, kelvin)) / 100;

  const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const g = t <= 66
    ? 99.4708025861 * Math.log(t) - 161.1195681661
    : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const b = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;

  return { r: Math.round(clamp(r)), g: Math.round(clamp(g)), b: Math.round(clamp(b)) };
}

/* ────────────────────────────────
   이름 있는 색
   ──────────────────────────────── */

/** CSS 기본 색 이름 중 자주 쓰는 것들 — 가장 가까운 이름을 찾는 데 쓴다 */
export const NAMED_COLORS: { name: string; ko: string; hex: string }[] = [
  { name: 'black', ko: '검정', hex: '#000000' },
  { name: 'white', ko: '흰색', hex: '#ffffff' },
  { name: 'gray', ko: '회색', hex: '#808080' },
  { name: 'silver', ko: '은색', hex: '#c0c0c0' },
  { name: 'red', ko: '빨강', hex: '#ff0000' },
  { name: 'maroon', ko: '진홍', hex: '#800000' },
  { name: 'crimson', ko: '진분홍빨강', hex: '#dc143c' },
  { name: 'tomato', ko: '토마토', hex: '#ff6347' },
  { name: 'coral', ko: '산호', hex: '#ff7f50' },
  { name: 'orange', ko: '주황', hex: '#ffa500' },
  { name: 'gold', ko: '금색', hex: '#ffd700' },
  { name: 'yellow', ko: '노랑', hex: '#ffff00' },
  { name: 'olive', ko: '올리브', hex: '#808000' },
  { name: 'lime', ko: '연두', hex: '#00ff00' },
  { name: 'green', ko: '초록', hex: '#008000' },
  { name: 'seagreen', ko: '바다초록', hex: '#2e8b57' },
  { name: 'teal', ko: '청록', hex: '#008080' },
  { name: 'cyan', ko: '하늘청록', hex: '#00ffff' },
  { name: 'skyblue', ko: '하늘색', hex: '#87ceeb' },
  { name: 'blue', ko: '파랑', hex: '#0000ff' },
  { name: 'navy', ko: '남색', hex: '#000080' },
  { name: 'indigo', ko: '인디고', hex: '#4b0082' },
  { name: 'purple', ko: '보라', hex: '#800080' },
  { name: 'violet', ko: '연보라', hex: '#ee82ee' },
  { name: 'magenta', ko: '자홍', hex: '#ff00ff' },
  { name: 'pink', ko: '분홍', hex: '#ffc0cb' },
  { name: 'brown', ko: '갈색', hex: '#a52a2a' },
  { name: 'chocolate', ko: '초콜릿', hex: '#d2691e' },
  { name: 'tan', ko: '베이지', hex: '#d2b48c' },
  { name: 'beige', ko: '아이보리', hex: '#f5f5dc' },
];

/** 가장 가까운 이름 있는 색을 RGB 거리로 찾는다. */
export function nearestNamed(rgb: RGB): { name: string; ko: string; hex: string; distance: number } {
  let best = { ...NAMED_COLORS[0], distance: Infinity };
  for (const c of NAMED_COLORS) {
    const t = hexToRgb(c.hex)!;
    const d = Math.hypot(t.r - rgb.r, t.g - rgb.g, t.b - rgb.b);
    if (d < best.distance) best = { ...c, distance: Math.round(d) };
  }
  return best;
}

export const rgbString = ({ r, g, b }: RGB) => `rgb(${r}, ${g}, ${b})`;
export const hslString = ({ h, s, l }: HSL) => `hsl(${h}, ${s}%, ${l}%)`;
