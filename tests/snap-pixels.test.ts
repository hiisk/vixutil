import { test } from 'node:test';
import assert from 'node:assert/strict';

import { computeStats, luma, type Box } from '../lib/snap/pixels.ts';
import { lighting, sharpness, whiteBalance, backdrop } from '../lib/snap/measures.ts';

/**
 * 픽셀 통계가 실제로 그 그림을 읽는지 본다.
 *
 * 그림을 지어 넣고 되묻는다 — 왼쪽만 밝게 칠한 그림에서 leftLuma가 크게
 * 나오는지, 체커보드가 단색보다 라플라시안 분산이 큰지. 통계식이 뒤집혀도
 * 화면에는 그럴듯한 숫자가 그대로 나오므로 사진을 넣어 보기 전에는 모른다.
 */
const W = 80, H = 80;
const BOX: Box = { x: 20, y: 20, width: 40, height: 40 };

/** (x,y) → [r,g,b]로 그림을 그린다 */
function draw(f: (x: number, y: number) => [number, number, number]): number[] {
  const d = new Array(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const [r, g, b] = f(x, y);
      const i = (y * W + x) * 4;
      d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255;
    }
  }
  return d;
}

const flat = (v: number) => draw(() => [v, v, v]);

test('단색 그림은 모든 밝기가 같다', () => {
  const s = computeStats(flat(140), W, H, BOX);
  for (const v of [s.faceLuma, s.backLuma, s.leftLuma, s.rightLuma, s.topLuma, s.bottomLuma])
    assert.ok(Math.abs(v - 140) < 0.5, `${v}`);
  assert.ok(s.backStd < 0.5, `단색인데 배경 편차 ${s.backStd}`);
  assert.ok(s.laplacianVar < 1, `단색인데 라플라시안 분산 ${s.laplacianVar}`);
});

test('얼굴 안 왼쪽만 밝히면 leftLuma가 커진다', () => {
  const mid = BOX.x + BOX.width / 2;
  const s = computeStats(draw((x, y) => {
    const v = x >= BOX.x && x < BOX.x + BOX.width && y >= BOX.y && y < BOX.y + BOX.height
      ? (x < mid ? 210 : 90) : 140;
    return [v, v, v];
  }), W, H, BOX);
  assert.ok(s.leftLuma > 200 && s.rightLuma < 100, `${s.leftLuma} / ${s.rightLuma}`);
  assert.equal(lighting(s).from, 'left');
});

test('얼굴 안 위쪽만 밝히면 위에서 오는 빛으로 읽는다', () => {
  const mid = BOX.y + BOX.height / 2;
  const s = computeStats(draw((x, y) => {
    const v = x >= BOX.x && x < BOX.x + BOX.width && y >= BOX.y && y < BOX.y + BOX.height
      ? (y < mid ? 215 : 85) : 140;
    return [v, v, v];
  }), W, H, BOX);
  assert.ok(s.topLuma > s.bottomLuma + 100);
  assert.equal(lighting(s).from, 'above');
});

test('배경만 밝히면 역광으로 읽는다', () => {
  const s = computeStats(draw((x, y) => {
    const inFace = x >= BOX.x && x < BOX.x + BOX.width && y >= BOX.y && y < BOX.y + BOX.height;
    const v = inFace ? 60 : 240;
    return [v, v, v];
  }), W, H, BOX);
  assert.ok(s.backLuma > s.faceLuma + 150, `${s.backLuma} vs ${s.faceLuma}`);
  assert.ok(lighting(s).backlit > 0.9);
});

test('얼굴 밖은 배경으로만 센다', () => {
  // 얼굴을 새까맣게 칠해도 배경 밝기가 흔들리면 안 된다
  const s = computeStats(draw((x, y) => {
    const inFace = x >= BOX.x && x < BOX.x + BOX.width && y >= BOX.y && y < BOX.y + BOX.height;
    return inFace ? [0, 0, 0] : [200, 200, 200];
  }), W, H, BOX);
  assert.ok(Math.abs(s.backLuma - 200) < 1, `배경에 얼굴이 섞였다: ${s.backLuma}`);
  assert.ok(s.faceLuma < 1);
});

test('체커보드는 단색보다 훨씬 또렷하다', () => {
  const checker = computeStats(draw((x, y) => {
    const v = (x + y) % 2 === 0 ? 255 : 0;
    return [v, v, v];
  }), W, H, BOX, 1);
  const plain = computeStats(flat(140), W, H, BOX, 1);
  assert.ok(checker.laplacianVar > plain.laplacianVar * 100, `${checker.laplacianVar} vs ${plain.laplacianVar}`);
  assert.ok(!sharpness(checker).blurry);
  assert.ok(sharpness(plain).blurry, '단색인데 흐리다고 안 한다');
});

test('라플라시안은 얼굴 안에서만 잰다', () => {
  /*
   * 배경만 자글자글하고 얼굴은 단색인 그림. 전체를 재면 또렷하다고 나오지만
   * 정작 얼굴은 흐린 사진이다 — 아웃포커스 인물 사진이 그 반대 경우다.
   */
  const s = computeStats(draw((x, y) => {
    const inFace = x >= BOX.x && x < BOX.x + BOX.width && y >= BOX.y && y < BOX.y + BOX.height;
    const v = inFace ? 140 : ((x + y) % 2 === 0 ? 255 : 0);
    return [v, v, v];
  }), W, H, BOX, 1);
  assert.ok(s.laplacianVar < 500, `배경 무늬가 섞여 들어왔다: ${s.laplacianVar}`);
});

test('색 치우침을 그대로 읽는다', () => {
  const warm = computeStats(draw(() => [200, 140, 80]), W, H, BOX);
  assert.equal(whiteBalance(warm).cast, 'warm');
  const cool = computeStats(draw(() => [80, 140, 200]), W, H, BOX);
  assert.equal(whiteBalance(cool).cast, 'cool');
  const grey = computeStats(flat(140), W, H, BOX);
  assert.equal(whiteBalance(grey).cast, 'neutral');
});

test('배경이 얼룩덜룩하면 편차가 커진다', () => {
  const noisy = computeStats(draw((x, y) => {
    const inFace = x >= BOX.x && x < BOX.x + BOX.width && y >= BOX.y && y < BOX.y + BOX.height;
    // 건너뛰는 간격(2)과 주기가 겹치지 않게 두 칸짜리 격자로 만든다 —
    // x%2로 만들면 step=2에서 전부 같은 색으로 읽혀 편차가 0이 된다
    const v = inFace ? 140 : ((Math.floor(x / 2) + Math.floor(y / 2)) % 2 === 0 ? 30 : 230);
    return [v, v, v];
  }), W, H, BOX);
  const clean = computeStats(draw((x, y) => {
    const inFace = x >= BOX.x && x < BOX.x + BOX.width && y >= BOX.y && y < BOX.y + BOX.height;
    return inFace ? [140, 140, 140] : [230, 230, 230];
  }), W, H, BOX);
  assert.ok(noisy.backStd > 80, `${noisy.backStd}`);
  assert.ok(clean.backStd < 1);
  assert.ok(backdrop(clean).evenness > backdrop(noisy).evenness + 0.5);
});

test('건너뛰며 재도 값이 거의 같다', () => {
  // step은 속도 때문이지 결과를 바꾸려는 것이 아니다
  const g = draw((x, y) => { const v = 60 + ((x * 3 + y * 5) % 120); return [v, v, v]; });
  const fine = computeStats(g, W, H, BOX, 1);
  const fast = computeStats(g, W, H, BOX, 4);
  assert.ok(Math.abs(fine.faceLuma - fast.faceLuma) < 12, `${fine.faceLuma} vs ${fast.faceLuma}`);
  assert.ok(Math.abs(fine.r - fast.r) < 12);
});

test('밝기식이 초록에 가장 크게 반응한다', () => {
  // BT.601 — 사람 눈이 초록에 가장 민감하다. 계수를 뒤섞으면 여기서 걸린다
  assert.ok(luma(0, 255, 0) > luma(255, 0, 0), '초록이 빨강보다 어둡다');
  assert.ok(luma(255, 0, 0) > luma(0, 0, 255), '빨강이 파랑보다 어둡다');
  assert.ok(Math.abs(luma(255, 255, 255) - 255) < 0.01, '흰색이 255가 아니다');
});
