/**
 * 사진에서 얼굴을 찾는 부분 — 스냅 전체가 함께 쓴다.
 *
 * ── 왜 한 번으로는 모자란가 (2026-08-20) ────────────────────
 * 전에는 어디서나 이 한 줄이었다:
 *
 *     new TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 })
 *
 * TinyFaceDetector는 사진을 inputSize 정사각형으로 줄인 뒤 그 크기에서
 * 얼굴을 찾는다. 그래서 **inputSize가 곧 「어느 정도 크기의 얼굴을 보는가」**다.
 * 512 하나만 쓰면 두 방향에서 놓친다:
 *
 *   - 얼굴이 작게 나온 사진(전신·여럿·멀리서) → 줄이는 과정에서 뭉개진다
 *   - 얼굴이 화면을 가득 채운 사진(셀카 클로즈업) → 격자보다 커서 안 걸린다
 *
 * 한 번 실패했다고 「얼굴이 없다」로 끝내면 그 두 경우가 통째로 막힌다. 실제로
 * 스냅에서 가장 흔한 실패가 이것이다. 그래서 크기를 바꿔 가며 세 번 본다.
 *
 * ── 문턱을 낮추는 순서 ──────────────────────────────────────
 * 첫 판은 지금까지와 같은 조건이다(빠르고, 대부분 여기서 끝난다). 못 찾았을
 * 때만 다음으로 넘어가고, 그때 문턱도 함께 낮춘다 — 「어렵게 찾은 얼굴」은
 * 원래 점수가 낮게 나오기 때문이다. 대신 부르는 쪽이 요구하는 최소 점수
 * (minScore)는 그대로 지키므로, 낮춘 문턱이 결과 품질을 무너뜨리지는 않는다.
 */

/*
  face-api의 실제 모듈 타입을 쓴다. 손으로 추린 구조 타입을 만들면
  detectSingleFace의 옵션 타입이 안 맞아 캐스팅으로 우기게 되는데, 그러면
  라이브러리가 판을 바꿔도 컴파일이 통과해 버린다.
*/
type FaceApi = typeof import('@vladmandic/face-api');

/**
 * 검출 결과에서 우리가 판정에 쓰는 부분.
 *
 * landmarks·expressions는 화면마다 쓰는 모양이 달라 여기서 좁히지 않는다 —
 * 부르는 쪽이 이미 자기 타입으로 캐스팅해서 쓴다.
 */
type Landmarked = Awaited<ReturnType<ReturnType<FaceApi['detectSingleFace']>['withFaceLandmarks']>>;

/** 표정 모델까지 돌린 경우에만 expressions가 붙는다 */
export type Detected = Landmarked & { expressions?: Record<string, number> };

/**
 * 큰 얼굴 → 작은 얼굴 순으로 훑는다.
 *
 * 320을 먼저 두는 까닭: 셀카가 스냅에서 가장 흔한 입력인데 그쪽이 가장 잘
 * 걸리고, 작은 입력이라 제일 빠르다. 512는 지금까지의 기본값이고, 800은
 * 얼굴이 작게 나온 사진을 위한 마지막 판이다.
 */
const PASSES = [
  { inputSize: 320, scoreThreshold: 0.5 },
  { inputSize: 512, scoreThreshold: 0.5 },
  { inputSize: 800, scoreThreshold: 0.3 },
] as const;

export interface DetectOptions {
  /**
   * 랜드마크 모델을 태울지.
   *
   * **안 받아 둔 모델을 태우면 그 판이 통째로 실패한다.** /snap/expression은
   * tinyFaceDetector와 faceExpressionNet만 받고 faceLandmark68Net은 안 받는다 —
   * 거기서 랜드마크를 요구하면 세 판이 모두 예외로 떨어져 늘 「얼굴 없음」이 된다.
   */
  landmarks?: boolean;
  /** 표정 모델까지 돌릴지 — 'landmarks+expressions'인 화면만 true */
  expressions?: boolean;
  /** 이 점수 아래는 «찾았다»로 치지 않는다. 부르는 쪽이 정한다. */
  minScore?: number;
}

/**
 * 얼굴 하나를 찾는다. 못 찾으면 undefined.
 *
 * 첫 판에서 minScore를 넘기면 바로 돌아온다 — 대부분의 사진이 여기서 끝나므로
 * 평소 속도는 전과 같다. 못 넘긴 판의 결과도 버리지 않고 들고 있다가, 세 판이
 * 다 끝나면 그중 **가장 점수가 높은 것**을 minScore에 견준다.
 */
export async function detectFace(
  faceapi: FaceApi,
  img: HTMLImageElement,
  { landmarks = true, expressions = false, minScore = 0.6 }: DetectOptions = {},
): Promise<Detected | undefined> {
  let best: Detected | undefined;

  for (const pass of PASSES) {
    let got: Detected | undefined;
    try {
      const opts = new faceapi.TinyFaceDetectorOptions(pass);
      const one = faceapi.detectSingleFace(img, opts);
      const base = landmarks ? one.withFaceLandmarks() : one;
      got = (await (expressions ? base.withFaceExpressions() : base)) as Detected | undefined;
    } catch {
      got = undefined;   // 이 판만 건너뛴다 — 다음 크기에서 걸릴 수 있다
    }
    if (!got) continue;

    if (!best || got.detection.score > best.detection.score) best = got;
    if (best.detection.score >= minScore) return best;
  }

  return best && best.detection.score >= minScore ? best : undefined;
}
