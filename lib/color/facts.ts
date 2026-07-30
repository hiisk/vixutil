/**
 * 색 한 장에 들어가는 값 — hex 하나에서 전부 계산한다.
 *
 * 색은 눈으로 맞다/틀리다를 알기 어렵다. 대비 4.5:1이 맞는지, 보색이 정말
 * 반대편인지는 봐서는 모른다. 그래서 값은 손으로 적지 않고 lib/color.ts의
 * 순수 함수로만 만든다 — 110색 × 여덟 언어에 적어 둘 숫자가 하나도 없다.
 */
import {
  contrastRatio, harmony, hexToHsl, hexToRgb, hslToHex, judgeContrast, luminance,
  nearestNamed, rgbToCmyk, scale, simulateCvd, type RGB,
} from '../color.ts';
import { NAMED_COLORS_8, namedColor, type NamedColor } from './named8.ts';

const WHITE: RGB = { r: 255, g: 255, b: 255 };
const BLACK: RGB = { r: 0, g: 0, b: 0 };

export interface ColorFacts {
  hex: string;
  rgb: RGB;
  hsl: { h: number; s: number; l: number };
  cmyk: { c: number; m: number; y: number; k: number };
  /** 상대 밝기 0~1 — 대비 계산의 바탕 */
  lum: number;
  /** 흰 바탕·검은 바탕에 놓았을 때의 대비 */
  onWhite: number;
  onBlack: number;
  /** 이 색 위에 얹을 글자 색 — 대비가 큰 쪽 */
  textOn: 'white' | 'black';
  /** 본문 크기 글자가 WCAG AA(4.5:1)를 넘는가 */
  aaWhite: boolean;
  aaBlack: boolean;
  /** 보색·유사색·삼각색 */
  complement: string;
  analogous: string[];
  triad: string[];
  /** 명도 단계 아홉 칸 */
  shades: { step: number; hex: string }[];
  /** 색약으로 보면 어떤 색인가 */
  cvd: { protan: string; deutan: string; tritan: string };
  /** 가장 가까운 CSS 이름 색 */
  nearest: { name: string; ko: string; hex: string; distance: number };
  /**
   * 색기가 있는가 — 채도가 0이면 색상환에서 돌릴 각이 없다.
   * 검정·흰색·회색의 보색과 유사색은 모두 자기 색이 되어 보여 줄 뜻이 없다.
   */
  chromatic: boolean;
}

const round2 = (n: number) => Math.round(n * 100) / 100;
const rgbHex = (rgb: RGB) => `#${[rgb.r, rgb.g, rgb.b].map(v => v.toString(16).padStart(2, '0')).join('')}`;

export function colorFacts(hex: string): ColorFacts {
  const rgb = hexToRgb(hex) ?? BLACK;
  const hsl = hexToHsl(hex) ?? { h: 0, s: 0, l: 0 };
  const onWhite = round2(contrastRatio(rgb, WHITE));
  const onBlack = round2(contrastRatio(rgb, BLACK));
  return {
    hex: hex.toLowerCase(),
    rgb,
    hsl: { h: Math.round(hsl.h), s: Math.round(hsl.s), l: Math.round(hsl.l) },
    cmyk: rgbToCmyk(rgb),
    lum: round2(luminance(rgb)),
    onWhite,
    onBlack,
    textOn: onWhite >= onBlack ? 'white' : 'black',
    aaWhite: judgeContrast(rgb, WHITE).aaNormal,
    aaBlack: judgeContrast(rgb, BLACK).aaNormal,
    complement: hslToHex(harmony(hsl, 'complementary')[1]),
    // 기준색 자신은 뺀다 — 위의 큰 견본에 이미 있고, HSL을 거쳐 돌아오면서
    // #E2725B가 #E2715A로 미세하게 달라져 "왜 두 번 나오나" 싶은 칸이 생긴다
    analogous: harmony(hsl, 'analogous').filter((_, i) => i !== 1).map(hslToHex),
    triad: harmony(hsl, 'triadic').slice(1).map(hslToHex),
    shades: scale(hsl, 9).map(s => ({ step: s.step, hex: hslToHex(s.hsl) })),
    cvd: {
      protan: rgbHex(simulateCvd(rgb, 'protanopia')),
      deutan: rgbHex(simulateCvd(rgb, 'deuteranopia')),
      tritan: rgbHex(simulateCvd(rgb, 'tritanopia')),
    },
    nearest: nearestNamed(rgb),
    chromatic: hsl.s > 0,
  };
}

/** 색 거리로 가까운 이름 색들 — 아래 추천에 쓴다 */
export function nearbyColors(slug: string, limit = 8): NamedColor[] {
  const me = namedColor(slug);
  if (!me) return [];
  const a = hexToRgb(me.hex);
  if (!a) return [];
  // 사람 눈은 초록에 민감하다 — 가중치를 준 거리라야 "가까운 색"이 그럴듯하다
  const dist = (hex: string) => {
    const b = hexToRgb(hex);
    if (!b) return Infinity;
    return 2 * (a.r - b.r) ** 2 + 4 * (a.g - b.g) ** 2 + 3 * (a.b - b.b) ** 2;
  };
  return NAMED_COLORS_8
    .filter(c => c.slug !== slug)
    .map(c => ({ c, d: dist(c.hex) }))
    .sort((x, y) => x.d - y.d)
    .slice(0, limit)
    .map(x => x.c);
}
