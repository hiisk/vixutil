/**
 * 이미지 도구 여섯의 계산 — 워터마크·보정·테두리·모서리·분할·파비콘.
 *
 * 캔버스를 부르는 부분은 컴포넌트에 있지만 **자리와 크기를 정하는 셈은 여기 둔다.**
 * 캔버스는 node에서 못 돌리지만 "오른쪽 아래에 여백 5%로 놓으면 좌표가 얼마인가",
 * "3×3으로 자를 때 나머지 픽셀을 어디에 주는가"는 순수한 계산이라 검사가 부를 수 있다.
 *
 * 이런 셈은 눈으로 보면 그럴듯한데 한 픽셀씩 어긋나는 일이 잦다 — 분할한 조각을
 * 도로 붙였을 때 원본과 크기가 같은지 같은 성질로 확인하는 편이 훨씬 세다.
 */

/* ────────────────────────── 워터마크 ────────────────────────── */

export type Anchor =
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'center' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export const ANCHORS: Anchor[] = [
  'top-left', 'top-center', 'top-right',
  'middle-left', 'center', 'middle-right',
  'bottom-left', 'bottom-center', 'bottom-right',
];

export interface Placed {
  x: number;
  y: number;
}

/**
 * 워터마크의 왼쪽 위 모서리 좌표.
 *
 * 여백은 **짧은 변**을 기준으로 잡는다. 긴 변으로 잡으면 세로로 긴 사진에서
 * 위아래 여백이 좌우보다 훨씬 커져 눈에 띄게 어긋난다.
 */
export function placeMark(
  boxW: number, boxH: number,
  markW: number, markH: number,
  anchor: Anchor,
  marginRatio: number,
): Placed {
  const m = Math.round(Math.min(boxW, boxH) * marginRatio);
  const [row, col] = anchor.split('-');
  const x = col === 'left' ? m : col === 'right' ? boxW - markW - m : Math.round((boxW - markW) / 2);
  const y = row === 'top' ? m : row === 'bottom' ? boxH - markH - m : Math.round((boxH - markH) / 2);
  // 워터마크가 사진보다 클 수 있다 — 그때는 밖으로 나가지 않게 0으로 붙인다
  return { x: Math.max(0, x), y: Math.max(0, y) };
}

/** 글자 크기는 사진 크기에 비례해야 한다 — 고정 픽셀이면 큰 사진에서 안 보인다 */
export function markFontSize(boxW: number, boxH: number, scale: number): number {
  return Math.max(8, Math.round(Math.min(boxW, boxH) * scale));
}

/* ────────────────────────── 보정 ────────────────────────── */

export interface Adjust {
  /** -100 ~ 100 */
  brightness: number;
  contrast: number;
  saturate: number;
  /** 0 ~ 100 */
  grayscale: number;
  sepia: number;
  blur: number;
}

export const NO_ADJUST: Adjust = { brightness: 0, contrast: 0, saturate: 0, grayscale: 0, sepia: 0, blur: 0 };

/**
 * 캔버스의 `ctx.filter` 문자열을 만든다.
 *
 * 밝기·대비·채도는 -100~100을 0~2배로 옮긴다(0이면 1배 = 그대로).
 * **기본값인 항목은 아예 안 적는다** — filter에 항목이 늘수록 느려지고,
 * "none"과 "brightness(1)"은 결과가 같으므로 적을 이유가 없다.
 */
export function filterString(a: Adjust): string {
  const parts: string[] = [];
  const pct = (v: number) => (1 + v / 100).toFixed(3).replace(/\.?0+$/, '');
  if (a.brightness !== 0) parts.push(`brightness(${pct(a.brightness)})`);
  if (a.contrast !== 0) parts.push(`contrast(${pct(a.contrast)})`);
  if (a.saturate !== 0) parts.push(`saturate(${pct(a.saturate)})`);
  if (a.grayscale > 0) parts.push(`grayscale(${a.grayscale}%)`);
  if (a.sepia > 0) parts.push(`sepia(${a.sepia}%)`);
  if (a.blur > 0) parts.push(`blur(${a.blur}px)`);
  return parts.length === 0 ? 'none' : parts.join(' ');
}

export const PRESETS: { key: string; adjust: Adjust }[] = [
  { key: 'none', adjust: NO_ADJUST },
  { key: 'mono', adjust: { ...NO_ADJUST, grayscale: 100, contrast: 8 } },
  { key: 'warm', adjust: { ...NO_ADJUST, sepia: 35, saturate: 12, brightness: 4 } },
  { key: 'cool', adjust: { ...NO_ADJUST, saturate: -18, brightness: 6, contrast: 6 } },
  { key: 'punch', adjust: { ...NO_ADJUST, saturate: 40, contrast: 22 } },
  { key: 'faded', adjust: { ...NO_ADJUST, saturate: -30, contrast: -18, brightness: 10 } },
];

/* ────────────────────────── 테두리·비율 ────────────────────────── */

export type Ratio = 'original' | '1:1' | '4:5' | '3:4' | '16:9' | '9:16';

export interface Framed {
  /** 만들 캔버스 크기 */
  canvasW: number;
  canvasH: number;
  /** 사진을 그릴 자리 */
  x: number;
  y: number;
  w: number;
  h: number;
}

const RATIO_OF: Record<Exclude<Ratio, 'original'>, number> = {
  '1:1': 1, '4:5': 4 / 5, '3:4': 3 / 4, '16:9': 16 / 9, '9:16': 9 / 16,
};

/**
 * 테두리를 두르고 정해진 비율에 맞춘 캔버스를 잡는다.
 *
 * 사진은 **줄이기만 하고 늘리지 않는다.** 늘리면 화질이 나빠지는데, 테두리를
 * 두르려고 화질을 버리는 것은 맞바꿈이 안 맞는다.
 */
export function frame(imgW: number, imgH: number, ratio: Ratio, borderRatio: number): Framed {
  const b = Math.round(Math.min(imgW, imgH) * borderRatio);
  const innerW = imgW;
  const innerH = imgH;

  if (ratio === 'original') {
    return { canvasW: innerW + b * 2, canvasH: innerH + b * 2, x: b, y: b, w: innerW, h: innerH };
  }

  const target = RATIO_OF[ratio];
  // 사진이 다 들어가면서 비율을 지키는 가장 작은 캔버스
  const needW = Math.max(innerW + b * 2, Math.round((innerH + b * 2) * target));
  const needH = Math.max(innerH + b * 2, Math.round((innerW + b * 2) / target));
  const canvasW = needW;
  const canvasH = Math.round(needW / target);
  const finalH = canvasH >= needH ? canvasH : needH;
  const finalW = Math.round(finalH * target);

  return {
    canvasW: finalW,
    canvasH: finalH,
    x: Math.round((finalW - innerW) / 2),
    y: Math.round((finalH - innerH) / 2),
    w: innerW,
    h: innerH,
  };
}

/* ────────────────────────── 모서리 둥글게 ────────────────────────── */

/**
 * 모서리 반지름을 픽셀로 바꾼다.
 *
 * 비율(0~50%)로 받아 짧은 변의 절반을 100%로 본다. 그래서 100%면 정확히
 * 원(정사각형일 때) 또는 알약 모양이 되고, 그보다 크게 잡을 수는 없다 —
 * 캔버스 API가 반지름이 변의 절반을 넘으면 그리지 못한다.
 */
export function cornerRadius(w: number, h: number, ratio: number): number {
  const max = Math.min(w, h) / 2;
  return Math.round(max * Math.max(0, Math.min(1, ratio)));
}

/* ────────────────────────── 분할 ────────────────────────── */

export interface Tile {
  index: number;
  row: number;
  col: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * 사진을 격자로 자른다.
 *
 * 나누어떨어지지 않을 때 **나머지 픽셀을 앞쪽 조각에 한 픽셀씩 나눠 준다.**
 * 마지막 조각에 몰아주면 그 조각만 눈에 띄게 크고, 버리면 붙였을 때 원본보다
 * 작아진다. 어느 쪽이든 인스타그램 격자에서는 티가 난다.
 */
export function splitGrid(w: number, h: number, cols: number, rows: number): Tile[] {
  const c = Math.max(1, Math.floor(cols));
  const r = Math.max(1, Math.floor(rows));
  const baseW = Math.floor(w / c);
  const baseH = Math.floor(h / r);
  const extraW = w - baseW * c;
  const extraH = h - baseH * r;

  const widths = Array.from({ length: c }, (_, i) => baseW + (i < extraW ? 1 : 0));
  const heights = Array.from({ length: r }, (_, i) => baseH + (i < extraH ? 1 : 0));

  const out: Tile[] = [];
  let y = 0;
  for (let row = 0; row < r; row++) {
    let x = 0;
    for (let col = 0; col < c; col++) {
      out.push({ index: row * c + col, row, col, x, y, w: widths[col], h: heights[row] });
      x += widths[col];
    }
    y += heights[row];
  }
  return out;
}

/* ────────────────────────── 파비콘 ────────────────────────── */

export interface IconSize {
  size: number;
  /** 어디에 쓰이는지 — 화면이 이름 대신 이걸 보여준다 */
  use: 'favicon' | 'apple' | 'android' | 'maskable';
  name: string;
}

/**
 * 만들어 줄 아이콘 크기.
 *
 * 지어낸 숫자가 아니라 각 플랫폼이 실제로 찾는 크기다 — 16·32는 브라우저 탭,
 * 180은 iOS 홈 화면(apple-touch-icon), 192·512는 안드로이드 웹 앱 매니페스트다.
 */
export const ICON_SIZES: IconSize[] = [
  { size: 16, use: 'favicon', name: 'favicon-16x16.png' },
  { size: 32, use: 'favicon', name: 'favicon-32x32.png' },
  { size: 48, use: 'favicon', name: 'favicon-48x48.png' },
  { size: 180, use: 'apple', name: 'apple-touch-icon.png' },
  { size: 192, use: 'android', name: 'android-chrome-192x192.png' },
  { size: 512, use: 'android', name: 'android-chrome-512x512.png' },
];

/**
 * 원본에서 정사각형으로 잘라 낼 자리 — 가운데를 기준으로 짧은 변에 맞춘다.
 * 아이콘은 정사각형이라, 안 자르고 늘이면 그림이 찌그러진다.
 */
export function squareCrop(w: number, h: number): { x: number; y: number; size: number } {
  const size = Math.min(w, h);
  return { x: Math.round((w - size) / 2), y: Math.round((h - size) / 2), size };
}

/** 웹 매니페스트에 넣을 조각 — 만든 파일 이름과 어긋나면 아이콘이 안 뜬다 */
export function manifestIcons(): string {
  const icons = ICON_SIZES.filter(i => i.use === 'android').map(i => ({
    src: `/${i.name}`,
    sizes: `${i.size}x${i.size}`,
    type: 'image/png',
  }));
  return JSON.stringify({ icons }, null, 2);
}

/** `<head>`에 넣을 줄 — 파일 이름이 위 목록과 같아야 한다 */
export function headTags(): string {
  return [
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">',
    '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">',
    '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
    '<link rel="manifest" href="/site.webmanifest">',
  ].join('\n');
}
