/**
 * 퍼스널컬러 측정 — 볼 픽셀을 실제로 읽어 웜/쿨·선명도·명도를 낸다.
 *
 * 한국어 페이지 안에만 있던 계산을 여기로 옮겨, 세 언어가 같은 사진에서
 * 같은 값을 내도록 한 곳에 둔다. 이 파일에는 문구가 없다 — 계산만 있다.
 */
import { rgbToLab } from './color-lab';

export interface Pt { x: number; y: number }

export interface PersonalColorRatios {
  warmthRatio: number;
  clarityRatio: number;
  valueRatio: number;
}

const clampUnit = (x: number) => Math.max(0, Math.min(1, x));

function samplePatchPixels(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, maxW: number, maxH: number) {
  const half = size / 2;
  const x = Math.max(0, Math.min(maxW - size, cx - half));
  const y = Math.max(0, Math.min(maxH - size, cy - half));
  const w = Math.max(1, Math.min(size, maxW - x));
  const h = Math.max(1, Math.min(size, maxH - y));
  const { data } = ctx.getImageData(x, y, w, h);
  const rs: number[] = [], gs: number[] = [], bs: number[] = [];
  for (let i = 0; i < data.length; i += 4) {
    rs.push(data[i]); gs.push(data[i + 1]); bs.push(data[i + 2]);
  }
  return { rs, gs, bs };
}

function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * 사진 전체를 작게 축소해 평균 RGB를 구한다.
 *
 * 실내 백열등처럼 사진 전체에 색이 낀 조명 아래에서는 볼 색도 그 색으로
 * 물들어서, 실제로는 쿨톤인 피부가 웜 조명 때문에 웜톤으로 잘못 측정된다
 * (그 반대도 마찬가지). "사진 전체 평균은 대체로 무채색에 가깝다"는
 * 그레이월드 가정으로 조명 색을 추정해 볼 색에서 역보정한다.
 */
function estimateSceneAverage(img: HTMLImageElement): { r: number; g: number; b: number } {
  const longSide = Math.max(img.naturalWidth, img.naturalHeight);
  const scale = Math.min(1, 100 / longSide);
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { r: 128, g: 128, b: 128 };
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);
  let r = 0, g = 0, b = 0;
  const n = data.length / 4;
  for (let i = 0; i < data.length; i += 4) { r += data[i]; g += data[i + 1]; b += data[i + 2]; }
  return { r: r / n, g: g / n, b: b / n };
}

/** 그레이월드 가정으로 추정한 조명색으로 표본 색에서 색캐스트를 역보정한다. */
function whiteBalance(sample: { r: number; g: number; b: number }, sceneAvg: { r: number; g: number; b: number }) {
  const gray = (sceneAvg.r + sceneAvg.g + sceneAvg.b) / 3;
  const c = (v: number) => Math.max(0, Math.min(255, v));
  return {
    r: c(sample.r * (gray / Math.max(1, sceneAvg.r))),
    g: c(sample.g * (gray / Math.max(1, sceneAvg.g))),
    b: c(sample.b * (gray / Math.max(1, sceneAvg.b))),
  };
}

export interface CheekLandmarks {
  jaw: Pt[];
  nose: Pt[];
  leftEye: Pt[];
  rightEye: Pt[];
}

/**
 * 볼 부위(눈 아래 · 턱선 안쪽) 픽셀을 샘플링해 세 지수를 계산한다.
 * 68포인트 랜드마크에는 피부색을 직접 알려주는 좌표가 없으므로 눈·코·턱선
 * 좌표로 안전한 볼 영역을 추정한다. 좌우 패치를 합쳐 채널별 중앙값을 쓰는데,
 * 평균보다 안경 반사·잔머리·잡티 같은 이상치에 덜 흔들린다.
 */
export function measurePersonalColor(img: HTMLImageElement, lm: CheekLandmarks): PersonalColorRatios {
  const { jaw, nose, leftEye, rightEye } = lm;
  const noseBottomY = Math.max(...nose.map(p => p.y));
  const faceWidth = Math.max(...jaw.map(p => p.x)) - Math.min(...jaw.map(p => p.x));

  const cheekCenter = (eye: Pt[], jawPt: Pt): Pt => {
    const eyeBottom = Math.max(...eye.map(p => p.y));
    const eyeCenterX = eye.reduce((s, p) => s + p.x, 0) / eye.length;
    return { x: (eyeCenterX + jawPt.x) / 2, y: (Math.max(eyeBottom, noseBottomY) + jawPt.y) / 2 };
  };

  const leftCheek = cheekCenter(leftEye, jaw[2]);
  const rightCheek = cheekCenter(rightEye, jaw[14]);

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { warmthRatio: 0.5, clarityRatio: 0.5, valueRatio: 0.5 };
  ctx.drawImage(img, 0, 0);

  const patchSize = Math.max(6, faceWidth * 0.12);
  const left = samplePatchPixels(ctx, leftCheek.x, leftCheek.y, patchSize, canvas.width, canvas.height);
  const right = samplePatchPixels(ctx, rightCheek.x, rightCheek.y, patchSize, canvas.width, canvas.height);
  const rawCheek = {
    r: median([...left.rs, ...right.rs]),
    g: median([...left.gs, ...right.gs]),
    b: median([...left.bs, ...right.bs]),
  };

  const { r, g, b } = whiteBalance(rawCheek, estimateSceneAverage(img));
  const lab = rgbToLab(r, g, b);

  // 웜/쿨: b*(노랑↔파랑)가 a*(빨강↔초록)보다 크면 웜, 반대면 쿨
  const warmthRatio = clampUnit(0.5 + (lab.b - lab.a) / 60);
  // 선명도: Lab 채도가 높을수록 클리어(봄·겨울)
  const clarityRatio = clampUnit((Math.hypot(lab.a, lab.b) - 10) / 35);
  // 명도: L*이 높을수록 라이트
  const valueRatio = clampUnit((lab.l - 30) / 55);

  return { warmthRatio, clarityRatio, valueRatio };
}
