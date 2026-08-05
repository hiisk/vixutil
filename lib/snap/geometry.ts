/**
 * 스냅테스트가 함께 쓰는 얼굴 기하 — 68개 랜드마크에서 나오는 순수 계산.
 *
 * 화면(컴포넌트)에서 떼어 둔 이유는 **검사가 부를 수 있어야** 해서다.
 * 눈·입·턱 좌표를 손으로 지어 넣고 "이 얼굴은 오른쪽으로 기울었는가"를
 * 되물을 수 있으면, 측정식이 뒤집혀도 그 자리에서 걸린다. 컴포넌트 안에
 * 두면 그 검사를 쓸 수 없다 — JSX라 node --test가 파일을 아예 못 읽는다.
 *
 * 68점 번호는 iBUG 300-W 규약이다(face-api가 그대로 따른다).
 *   0–16 턱선 · 17–21 왼눈썹 · 22–26 오른눈썹 · 27–35 코
 *   36–41 왼눈 · 42–47 오른눈 · 48–67 입
 * 여기서 "왼쪽"은 **보는 사람 기준**이다 — 사진 속 인물의 왼쪽이 아니다.
 */
export interface Pt { x: number; y: number }

export const dist = (a: Pt, b: Pt): number => Math.hypot(a.x - b.x, a.y - b.y);

export const mean = (pts: Pt[]): Pt => ({
  x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
  y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
});

export const clamp01 = (x: number): number => Math.max(0, Math.min(1, x));

/** 값을 [lo, hi]에서 0~1로 편다. hi 쪽이 1이다. */
export const scale = (v: number, lo: number, hi: number): number => clamp01((v - lo) / (hi - lo));

/**
 * 0에서 멀어질수록 0에 가까워지는 점수. `tol`만큼 어긋나면 0점이다.
 * "가운데에 얼마나 가까운가" 꼴의 지표가 여럿이라 한 곳에 둔다.
 */
export const closeness = (err: number, tol: number): number => clamp01(1 - Math.abs(err) / tol);
