/**
 * 새 스냅테스트 열 가지의 측정식.
 *
 * 모두 **순수 함수**다 — 좌표와 몇 개의 픽셀 통계만 받는다. 화면에서 떼어 둔
 * 이유는 검사가 얼굴을 지어 넣고 되물을 수 있어야 하기 때문이다. "오른쪽으로
 * 15도 기울인 얼굴"을 만들어 넣었을 때 roll이 실제로 15가 나오는지 보는 검사는
 * 측정식이 뒤집히면 그 자리에서 깨진다. 컴포넌트 안에 두면 그럴 수 없다.
 *
 * 이 섹션의 규칙은 **재는 것은 진짜, 풀이는 재미**다. 그래서 여기서는 재기만
 * 하고 말은 붙이지 않는다. 말은 lib/snap/copy.ts가 붙인다.
 */
import { type Pt, dist, mean, clamp01, scale, closeness } from './geometry.ts';

/** 측정에 필요한 얼굴 정보 — SnapDetection에서 뽑아 넘긴다 */
export interface Face {
  jaw: Pt[];
  mouth: Pt[];
  leftEye: Pt[];
  rightEye: Pt[];
  nose: Pt[];
  leftBrow: Pt[];
  rightBrow: Pt[];
  box: { x: number; y: number; width: number; height: number };
  imageWidth: number;
  imageHeight: number;
}

const faceWidth = (f: Face) => dist(f.jaw[0], f.jaw[16]);

/**
 * 눈 뜬 정도(EAR, eye aspect ratio).
 *
 * face-api의 눈 여섯 점은 [바깥, 위1, 위2, 안쪽, 아래2, 아래1] 순이다.
 * 세로 두 쌍의 평균을 가로로 나눈다 — 널리 쓰이는 정의 그대로다.
 * 감은 눈은 0.1 안팎, 크게 뜬 눈은 0.35 언저리다.
 */
export function ear(eye: Pt[]): number {
  const w = dist(eye[0], eye[3]);
  if (w === 0) return 0;
  return (dist(eye[1], eye[5]) + dist(eye[2], eye[4])) / (2 * w);
}

/* ── 1. 고개 각도 ─────────────────────────────────────────────── */

export interface HeadPose {
  /** 좌우 기울기(도). 양수는 보는 사람 기준 시계 방향. */
  roll: number;
  /** 좌우 돌림(-1~1). 0이 정면, 양수는 얼굴이 보는 사람의 오른쪽을 향함. */
  yaw: number;
  /** 끄덕임(-1~1). 0이 정면, 양수는 턱을 든 쪽. */
  pitch: number;
}

export function headPose(f: Face): HeadPose {
  const L = mean(f.leftEye);
  const R = mean(f.rightEye);
  const roll = (Math.atan2(R.y - L.y, R.x - L.x) * 180) / Math.PI;

  /*
   * 좌우 돌림은 코끝이 두 눈 가운데에서 얼마나 벗어났는지로 본다.
   * 얼굴을 돌리면 코가 한쪽으로 밀리고, 그 밀린 양은 얼굴 너비에 비례한다.
   * 깊이 정보가 없으니 각도가 아니라 -1~1의 치우침으로만 낸다.
   */
  const eyeMid = { x: (L.x + R.x) / 2, y: (L.y + R.y) / 2 };
  const w = faceWidth(f) || 1;
  const noseTip = f.nose[6] ?? f.nose[f.nose.length - 1];
  const yaw = clamp01(Math.abs((noseTip.x - eyeMid.x) / (w * 0.25))) * Math.sign(noseTip.x - eyeMid.x);

  /*
   * 끄덕임은 "눈~코끝"과 "코끝~턱끝"의 비로 본다. 고개를 들면 아래쪽이
   * 짧아 보이고 숙이면 길어 보인다. 정면에서 대략 1:1이라 그것을 0으로 둔다.
   */
  const chin = f.jaw[8];
  const upper = Math.abs(noseTip.y - eyeMid.y) || 1;
  const lower = Math.abs(chin.y - noseTip.y) || 1;
  const pitch = clamp01(Math.abs(lower / upper - 1) / 0.6) * Math.sign(1 - lower / upper);

  return { roll, yaw, pitch };
}

/* ── 2. 눈 뜬 정도 ────────────────────────────────────────────── */

export interface EyeOpenness {
  left: number;
  right: number;
  /** 둘 중 작은 쪽 기준 0~1 — 한쪽만 감아도 사진은 못 쓴다 */
  score: number;
  /** 좌우가 얼마나 같은가 0~1 */
  evenness: number;
  blinked: boolean;
}

/** 감은 눈은 EAR 0.1 안팎, 또렷하게 뜬 눈은 0.3 위다 */
const EAR_SHUT = 0.13;
const EAR_WIDE = 0.32;

export function eyeOpenness(f: Face): EyeOpenness {
  const left = ear(f.leftEye);
  const right = ear(f.rightEye);
  const score = scale(Math.min(left, right), EAR_SHUT, EAR_WIDE);
  const evenness = clamp01(1 - Math.abs(left - right) / 0.12);
  return { left, right, score, evenness, blinked: Math.min(left, right) < EAR_SHUT };
}

/* ── 3. 진짜 웃음(뒤센) ───────────────────────────────────────── */

export interface RealSmile {
  /** 입이 웃는 정도 0~1 */
  mouth: number;
  /** 눈이 웃는 정도 0~1 — 웃을 때 눈이 좁아지는 양 */
  eyes: number;
  /** 모델이 준 happy 확률 0~1 (없으면 -1) */
  happy: number;
  /** 뒤센 지수 0~1. 입만 웃으면 낮다. */
  score: number;
}

/**
 * 입꼬리가 입 중심보다 위로 올라간 정도.
 * face-api 입 좌표에서 48이 왼쪽 꼬리, 54가 오른쪽 꼬리, 51/57이 위·아래 중앙이다.
 */
export function smileCurve(mouth: Pt[]): number {
  const w = dist(mouth[0], mouth[6]) || 1;
  const cornerY = (mouth[0].y + mouth[6].y) / 2;
  const centerY = (mouth[3].y + mouth[9].y) / 2;
  return scale((centerY - cornerY) / w, -0.02, 0.16);
}

export function realSmile(f: Face, happy = -1): RealSmile {
  const mouthScore = smileCurve(f.mouth);
  /*
   * 진짜 웃음은 눈둘레근이 함께 움직여 눈이 좁아진다(뒤센 미소). 무표정에서
   * 이미 좁은 눈과 가리기 위해, 눈 좁아짐을 **입이 웃을 때만** 점수로 친다.
   * 입이 안 웃는데 눈만 좁으면 그냥 눈이 작거나 찡그린 것이다.
   */
  const openness = (ear(f.leftEye) + ear(f.rightEye)) / 2;
  const narrowed = clamp01((EAR_WIDE - openness) / (EAR_WIDE - 0.16));
  const eyes = narrowed * mouthScore;
  const score = clamp01(mouthScore * 0.5 + eyes * 0.5);
  return { mouth: mouthScore, eyes, happy, score };
}

/* ── 4. 증명사진 적합도 ───────────────────────────────────────── */

export interface IdPhotoCheck {
  key: string;
  /** 0~1, 1이 규격에 맞음 */
  score: number;
  /** 사람이 읽을 실측값 */
  value: number;
}

export interface IdPhoto {
  checks: IdPhotoCheck[];
  score: number;
  worst: string;
}

/*
 * 여권 사진 규격(외교부·ICAO)에서 숫자로 확인할 수 있는 것만 골랐다.
 *  - 얼굴(정수리~턱)이 사진 세로의 70~80%
 *  - 얼굴이 좌우 가운데
 *  - 눈이 사진 위에서 30~50% 사이
 *  - 고개가 기울지 않을 것
 *  - 눈을 뜨고 있을 것
 * 배경·표정·그림자 규정은 숫자로 못 재므로 여기서 다루지 않는다.
 */
export function idPhoto(f: Face): IdPhoto {
  const faceRatio = f.box.height / (f.imageHeight || 1);
  const centerX = (f.box.x + f.box.width / 2) / (f.imageWidth || 1);
  const eyeY = (mean(f.leftEye).y + mean(f.rightEye).y) / 2 / (f.imageHeight || 1);
  const { roll } = headPose(f);
  const eyes = eyeOpenness(f);

  const checks: IdPhotoCheck[] = [
    { key: 'faceSize', score: closeness(faceRatio - 0.75, 0.22), value: faceRatio },
    { key: 'centered', score: closeness(centerX - 0.5, 0.12), value: centerX },
    { key: 'eyeLine', score: closeness(eyeY - 0.4, 0.16), value: eyeY },
    { key: 'level', score: closeness(roll, 12), value: roll },
    { key: 'eyesOpen', score: eyes.score, value: Math.min(eyes.left, eyes.right) },
  ];
  const score = checks.reduce((s, c) => s + c.score, 0) / checks.length;
  const worst = checks.reduce((a, b) => (b.score < a.score ? b : a)).key;
  return { checks, score, worst };
}

/* ── 5. 인물 구도 ─────────────────────────────────────────────── */

export interface Framing {
  /** 머리 위 여백이 사진 세로에서 차지하는 몫 */
  headroom: number;
  /** 얼굴 중심이 삼분할 선(1/3·1/2·2/3)에 얼마나 가까운가 0~1 */
  thirds: number;
  /** 얼굴이 화면에서 차지하는 몫 */
  size: number;
  score: number;
}

export function framing(f: Face): Framing {
  const H = f.imageHeight || 1;
  const W = f.imageWidth || 1;
  const headroom = clamp01(f.box.y / H);
  const cx = (f.box.x + f.box.width / 2) / W;
  /*
   * 삼분할은 "가장 가까운 선"까지의 거리로 본다. 가운데(0.5)도 인물 사진에서는
   * 정석이므로 셋 다 만점으로 친다 — 삼분할만 옳다고 말하면 증명사진 같은
   * 정중앙 구도를 틀렸다고 하게 된다.
   */
  const lines = [1 / 3, 0.5, 2 / 3];
  const thirds = Math.max(...lines.map(l => closeness(cx - l, 0.12)));
  const size = clamp01((f.box.width * f.box.height) / (W * H));
  /* 머리 위 여백은 사진 세로의 5~20%가 편안하다 */
  const headScore = closeness(headroom - 0.12, 0.14);
  return { headroom, thirds, size, score: (headScore + thirds) / 2 };
}

/* ── 6. 촬영 거리 ─────────────────────────────────────────────── */

/** 성인 머리 너비의 대표값(mm). 개인차가 있어 어림이라는 것을 화면에 적는다. */
export const HEAD_WIDTH_MM = 145;

export interface ShootDistance {
  /** 어림한 거리(cm) */
  cm: number;
  /** 얼굴이 가로에서 차지하는 몫 */
  fill: number;
  /** 가까이서 찍어 코가 커 보이는 정도 0~1 */
  distortion: number;
}

/**
 * 얼굴 너비가 화면에서 차지하는 몫과 렌즈 화각으로 거리를 어림한다.
 *
 *   화면 가로가 담는 실제 폭 = 머리너비 / 차지하는 몫
 *   거리 = 그 폭 / (2 · tan(화각/2))
 *
 * 화각은 사진에 안 적혀 있으므로 넘겨받는다(스마트폰 주카메라는 대략 70도).
 * 머리 너비도 사람마다 다르다 — 그래서 이것은 측정이 아니라 **어림**이고,
 * 화면에도 그렇게 적는다.
 */
export function shootDistance(f: Face, fovDeg = 70): ShootDistance {
  const fill = clamp01(faceWidth(f) / (f.imageWidth || 1));
  const frameMm = HEAD_WIDTH_MM / Math.max(fill, 0.01);
  const cm = frameMm / (2 * Math.tan((fovDeg * Math.PI) / 360)) / 10;
  /* 50cm 안쪽이면 원근 왜곡이 눈에 띄기 시작한다 */
  const distortion = clamp01((80 - cm) / 60);
  return { cm, fill, distortion };
}

/* ── 7~10. 픽셀에서 나오는 것들 ───────────────────────────────── */

/**
 * 픽셀 통계 — 컴포넌트가 캔버스에서 뽑아 넘긴다.
 * 이미지 자체를 넘기면 검사가 못 부른다(브라우저 API가 필요하다).
 */
export interface PixelStats {
  /** 얼굴 영역의 평균 밝기 0~255 */
  faceLuma: number;
  /** 배경(얼굴 밖) 평균 밝기 0~255 */
  backLuma: number;
  /** 얼굴 왼쪽 절반·오른쪽 절반 평균 밝기 */
  leftLuma: number;
  rightLuma: number;
  /** 얼굴 위·아래 절반 평균 밝기 */
  topLuma: number;
  bottomLuma: number;
  /** 얼굴 영역 라플라시안 분산 — 초점·흔들림 */
  laplacianVar: number;
  /** 화면 전체 R·G·B 평균 */
  r: number;
  g: number;
  b: number;
  /** 배경이 얼마나 고른가 — 밝기 표준편차 */
  backStd: number;
}

export interface Lighting {
  /** 좌우 밝기차 0~1 (0이 고름) */
  sideDiff: number;
  /** 위아래 밝기차 0~1 */
  topDiff: number;
  /** 역광 정도 0~1 — 배경이 얼굴보다 밝은 정도 */
  backlit: number;
  /** 얼굴이 너무 어둡거나 날아갔는가 0~1 (1이 알맞음) */
  exposure: number;
  score: number;
  /** 빛이 어디서 오는가 */
  from: 'left' | 'right' | 'above' | 'below' | 'even';
}

export function lighting(p: PixelStats): Lighting {
  const sideDiff = clamp01(Math.abs(p.leftLuma - p.rightLuma) / 60);
  const topDiff = clamp01(Math.abs(p.topLuma - p.bottomLuma) / 60);
  const backlit = clamp01((p.backLuma - p.faceLuma) / 80);
  /* 얼굴 평균 밝기는 110~180이 알맞다 — 그보다 낮으면 어둡고 높으면 날아간다 */
  const exposure = closeness(p.faceLuma - 145, 75);
  const from =
    sideDiff < 0.25 && topDiff < 0.25 ? 'even'
      : sideDiff >= topDiff ? (p.leftLuma > p.rightLuma ? 'left' : 'right')
        : (p.topLuma > p.bottomLuma ? 'above' : 'below');
  const score = clamp01((1 - sideDiff) * 0.3 + (1 - topDiff) * 0.2 + (1 - backlit) * 0.2 + exposure * 0.3);
  return { sideDiff, topDiff, backlit, exposure, score, from };
}

export interface Sharpness {
  /** 0~1, 1이 또렷함 */
  score: number;
  variance: number;
  blurry: boolean;
}

/**
 * 라플라시안 분산은 초점·흔들림을 재는 흔한 방법이다. 또렷한 사진은 이웃
 * 픽셀 차이가 크고, 흐린 사진은 작다. 절대값은 이미지 크기와 대비에 따라
 * 달라지므로 넓은 구간으로 편다.
 */
export function sharpness(p: PixelStats): Sharpness {
  const score = scale(Math.log10(Math.max(p.laplacianVar, 1)), 1.2, 3);
  return { score, variance: p.laplacianVar, blurry: score < 0.35 };
}

export interface WhiteBalance {
  /** 파랑(-1)에서 주황(+1)으로의 치우침 */
  temp: number;
  /** 초록(-1)에서 자주(+1)로의 치우침 */
  tint: number;
  /** 0~1, 1이 중립 */
  score: number;
  cast: 'warm' | 'cool' | 'green' | 'magenta' | 'neutral';
}

/**
 * 회색세계 가정 — 화면 전체 평균이 회색이어야 한다고 보고, R과 B가 얼마나
 * 어긋났는지로 색온도를, G가 얼마나 튀는지로 색조를 본다.
 *
 * 노을·단풍처럼 실제로 한쪽 색이 많은 사진은 치우쳤다고 나온다. 그것이 이
 * 가정의 한계라 화면에 적는다.
 */
export function whiteBalance(p: PixelStats): WhiteBalance {
  const avg = (p.r + p.g + p.b) / 3 || 1;
  const temp = clamp01(Math.abs(p.r - p.b) / (avg * 0.5)) * Math.sign(p.r - p.b);
  const tint = clamp01(Math.abs((p.r + p.b) / 2 - p.g) / (avg * 0.35)) * Math.sign((p.r + p.b) / 2 - p.g);
  const score = clamp01(1 - (Math.abs(temp) * 0.6 + Math.abs(tint) * 0.4));
  const cast =
    Math.abs(temp) < 0.2 && Math.abs(tint) < 0.2 ? 'neutral'
      : Math.abs(temp) >= Math.abs(tint) ? (temp > 0 ? 'warm' : 'cool')
        : (tint > 0 ? 'magenta' : 'green');
  return { temp, tint, score, cast };
}

export interface Backdrop {
  /** 배경이 고른 정도 0~1 */
  evenness: number;
  /** 얼굴과 배경의 밝기 차 0~1 — 인물이 배경에서 얼마나 떨어져 보이는가 */
  separation: number;
  score: number;
}

/** 증명사진·프로필에서 배경이 깔끔한지 — 표준편차가 작을수록 고르다 */
export function backdrop(p: PixelStats): Backdrop {
  const evenness = clamp01(1 - p.backStd / 60);
  const separation = clamp01(Math.abs(p.faceLuma - p.backLuma) / 70);
  return { evenness, separation, score: clamp01(evenness * 0.65 + separation * 0.35) };
}

/* ── 좌우 합성 얼굴 ───────────────────────────────────────────── */

export interface MirrorFace {
  /** 얼굴 중심선의 x — 이 선을 축으로 좌우를 뒤집어 붙인다 */
  axis: number;
  /** 중심선에서 왼쪽·오른쪽 폭 */
  leftWidth: number;
  rightWidth: number;
  /** 좌우 폭이 얼마나 같은가 0~1 */
  balance: number;
}

/**
 * 좌우 합성은 재는 것이 아니라 **보여 주는 것**이다. 중심선만 정하면
 * 화면이 왼쪽 반쪽을 뒤집어 붙인 얼굴과 오른쪽 반쪽으로 만든 얼굴을 그린다.
 *
 * 중심선은 콧대(27)와 코끝(30) 사이를 쓴다 — 눈·입은 표정에 따라 움직이지만
 * 콧대는 거의 안 움직여서 축으로 삼기에 가장 안정적이다.
 */
export function mirrorFace(f: Face): MirrorFace {
  const bridge = f.nose[0];
  const tip = f.nose[6] ?? f.nose[f.nose.length - 1];
  const axis = (bridge.x + tip.x) / 2;
  const leftWidth = Math.abs(axis - f.jaw[0].x);
  const rightWidth = Math.abs(f.jaw[16].x - axis);
  const wide = Math.max(leftWidth, rightWidth) || 1;
  return { axis, leftWidth, rightWidth, balance: clamp01(Math.min(leftWidth, rightWidth) / wide) };
}
