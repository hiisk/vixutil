/**
 * 픽셀에서 통계를 뽑는다 — 조명·선명도·화이트밸런스가 쓴다.
 *
 * 캔버스에서 읽는 일(브라우저 API)은 컴포넌트가 하고, **계산은 여기 순수 함수로**
 * 둔다. 그래야 검사가 그림을 지어 넣고 되물을 수 있다 — 왼쪽만 밝은 그림을
 * 만들어 넣었을 때 leftLuma가 실제로 크게 나오는지, 체커보드에서 라플라시안
 * 분산이 단색보다 큰지. 컴포넌트 안에 두면 그 검사를 쓸 수 없다.
 */
import type { PixelStats } from './measures.ts';

export interface Box { x: number; y: number; width: number; height: number }

/** ITU-R BT.601 — 사람이 느끼는 밝기에 가깝다 */
export const luma = (r: number, g: number, b: number): number => 0.299 * r + 0.587 * g + 0.114 * b;

/**
 * RGBA 배열에서 통계를 뽑는다.
 *
 * 큰 사진을 한 픽셀씩 다 훑으면 느리므로 `step`만큼 건너뛴다. 통계값이라
 * 건너뛰어도 결과가 거의 같고, 4000×3000 사진에서 백 배 빨라진다.
 *
 * 다만 **건너뛰는 간격과 주기가 맞는 무늬는 통째로 사라진다.** 한 칸 걸러
 * 검고 흰 줄무늬를 step=2로 재면 전부 같은 색으로 읽혀 편차가 0이 된다.
 * 사진에서 그런 규칙적인 무늬는 드물지만, 검사용 그림을 지을 때는 걸린다.
 */
export function computeStats(
  data: ArrayLike<number>, w: number, h: number, box: Box, step = 2,
): PixelStats {
  const inBox = (x: number, y: number) =>
    x >= box.x && x < box.x + box.width && y >= box.y && y < box.y + box.height;

  let faceN = 0, faceSum = 0, backN = 0, backSum = 0, backSq = 0;
  let leftN = 0, leftSum = 0, rightN = 0, rightSum = 0;
  let topN = 0, topSum = 0, botN = 0, botSum = 0;
  let rSum = 0, gSum = 0, bSum = 0, n = 0;
  const midX = box.x + box.width / 2;
  const midY = box.y + box.height / 2;

  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const l = luma(r, g, b);
      rSum += r; gSum += g; bSum += b; n++;
      if (inBox(x, y)) {
        faceSum += l; faceN++;
        if (x < midX) { leftSum += l; leftN++; } else { rightSum += l; rightN++; }
        if (y < midY) { topSum += l; topN++; } else { botSum += l; botN++; }
      } else {
        backSum += l; backSq += l * l; backN++;
      }
    }
  }

  /*
   * 라플라시안은 얼굴 안에서만 잰다. 배경이 흐린 인물 사진(아웃포커스)에서
   * 전체를 재면 "흔들렸다"고 나오는데, 정작 얼굴은 또렷한 좋은 사진이다.
   */
  /*
   * 한 칸 안쪽에서 시작한다. 라플라시안은 상하좌우 이웃을 보므로, 테두리에서
   * 재면 이웃이 얼굴 밖 픽셀이 된다. 배경에 무늬가 있으면 그 테두리 한 줄이
   * 분산을 통째로 뒤집는다 — 실제로 체커보드 배경에서 1,721이 나왔다.
   */
  let lapSum = 0, lapSq = 0, lapN = 0;
  const x0 = Math.max(1, Math.floor(box.x) + 1);
  const y0 = Math.max(1, Math.floor(box.y) + 1);
  const x1 = Math.min(w - 1, Math.ceil(box.x + box.width) - 1);
  const y1 = Math.min(h - 1, Math.ceil(box.y + box.height) - 1);
  for (let y = y0; y < y1; y += step) {
    for (let x = x0; x < x1; x += step) {
      const at = (xx: number, yy: number) => {
        const i = (yy * w + xx) * 4;
        return luma(data[i], data[i + 1], data[i + 2]);
      };
      const v = at(x - 1, y) + at(x + 1, y) + at(x, y - 1) + at(x, y + 1) - 4 * at(x, y);
      lapSum += v; lapSq += v * v; lapN++;
    }
  }
  const lapMean = lapN ? lapSum / lapN : 0;
  const laplacianVar = lapN ? lapSq / lapN - lapMean * lapMean : 0;

  const avg = (s: number, c: number) => (c ? s / c : 0);
  const backMean = avg(backSum, backN);
  return {
    faceLuma: avg(faceSum, faceN),
    backLuma: backN ? backMean : avg(faceSum, faceN),
    leftLuma: avg(leftSum, leftN),
    rightLuma: avg(rightSum, rightN),
    topLuma: avg(topSum, topN),
    bottomLuma: avg(botSum, botN),
    laplacianVar,
    r: avg(rSum, n), g: avg(gSum, n), b: avg(bSum, n),
    backStd: backN ? Math.sqrt(Math.max(0, backSq / backN - backMean * backMean)) : 0,
  };
}
