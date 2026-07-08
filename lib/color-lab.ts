/**
 * sRGB(0~255) → CIE Lab 변환. 웜/쿨(a*, b* 축)과 채도(chroma) 계산에 공통으로 쓴다.
 * 퍼스널컬러 진단과 사진 감성 분석이 이 함수를 공유한다.
 */
export function rgbToLab(r: number, g: number, b: number): { l: number; a: number; b: number } {
  const toLinear = (c: number) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const R = toLinear(r), G = toLinear(g), B = toLinear(b);
  const x = R * 0.4124 + G * 0.3576 + B * 0.1805;
  const y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  const z = R * 0.0193 + G * 0.1192 + B * 0.9505;
  const xn = 0.95047, yn = 1.0, zn = 1.08883;
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(x / xn), fy = f(y / yn), fz = f(z / zn);
  return { l: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
}
