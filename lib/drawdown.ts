/**
 * 드로다운과 수중 기간 — 낙폭의 크기만큼이나 **길이**가 중요하다.
 *
 * 최대낙폭 하나만 보면 "−80%"처럼 크기만 남는다. 그런데 실제로 사람을 밀어내는 것은
 * 크기보다 지속이다. 3개월이면 버티는 −50%와 3년째 회복하지 못한 −50%는 같은 숫자이고
 * 전혀 다른 경험이다. 그래서 여기서는 세 가지를 함께 낸다.
 *
 *   maxDrawdownPct   가장 깊었던 낙폭
 *   longestDays      전고점을 회복하기까지 가장 오래 걸린 기간
 *   underwaterPct    전체 기간 중 전고점 아래에 있었던 날의 비율
 *
 * 마지막 값이 가장 자주 빠지는데, 대개 가장 놀랍다. 상승 자산도 대부분의 날을
 * 전고점 아래에서 보낸다 — 정의상 신고가는 드물기 때문이다.
 */

export interface DrawdownEpisode {
  /** 고점 인덱스 */
  peakIndex: number;
  /** 저점 인덱스 */
  troughIndex: number;
  /** 회복(전고점 재달성) 인덱스. 아직 회복 못 했으면 null */
  recoveryIndex: number | null;
  /** 낙폭(%) — 양수 */
  depthPct: number;
  /** 고점에서 저점까지 일수 */
  declineDays: number;
  /** 저점에서 회복까지 일수. 미회복이면 null */
  recoveryDays: number | null;
  /** 고점에서 회복까지 총 일수. 미회복이면 현재까지. */
  totalDays: number;
  /** 아직 회복하지 못했는가 */
  ongoing: boolean;
}

export interface DrawdownSummary {
  maxDrawdownPct: number;
  /** 가장 깊었던 구간 */
  worst: DrawdownEpisode | null;
  /** 가장 오래 걸린 구간 (고점→회복) */
  longest: DrawdownEpisode | null;
  /** 전고점 아래에서 보낸 날의 비율(%) */
  underwaterPct: number;
  /** 신고가를 찍은 날 수 */
  newHighDays: number;
  totalDays: number;
  /** 깊이 기준 상위 구간들 */
  episodes: DrawdownEpisode[];
  /** 현재 진행 중인 낙폭(%) */
  currentDrawdownPct: number;
}

/** 이보다 얕은 구간은 잡음으로 보고 목록에서 뺀다 (%) */
export const MIN_EPISODE_DEPTH_PCT = 10;

/**
 * 종가 배열에서 드로다운 구간들을 뽑는다.
 * 한 구간은 "전고점 → 저점 → 전고점 회복"이다. 회복하지 못한 마지막 구간도 포함한다.
 */
export function drawdownEpisodes(closes: number[], minDepthPct = MIN_EPISODE_DEPTH_PCT): DrawdownEpisode[] {
  const v = closes.map(c => (isFinite(c) && c > 0 ? c : NaN));
  if (v.length < 3) return [];

  const out: DrawdownEpisode[] = [];
  let peak = v[0];
  let peakIndex = 0;
  let troughIndex = -1;
  let trough = Infinity;

  for (let i = 1; i < v.length; i++) {
    const c = v[i];
    if (!isFinite(c)) continue;

    if (c >= peak) {
      // 전고점 회복 — 진행 중이던 구간을 닫는다
      if (troughIndex >= 0) {
        const depth = (1 - trough / peak) * 100;
        if (depth >= minDepthPct) {
          out.push({
            peakIndex, troughIndex, recoveryIndex: i,
            depthPct: depth,
            declineDays: troughIndex - peakIndex,
            recoveryDays: i - troughIndex,
            totalDays: i - peakIndex,
            ongoing: false,
          });
        }
        troughIndex = -1;
        trough = Infinity;
      }
      peak = c;
      peakIndex = i;
    } else if (c < trough) {
      trough = c;
      troughIndex = i;
    }
  }

  // 아직 회복하지 못한 구간
  if (troughIndex >= 0) {
    const depth = (1 - trough / peak) * 100;
    if (depth >= minDepthPct) {
      out.push({
        peakIndex, troughIndex, recoveryIndex: null,
        depthPct: depth,
        declineDays: troughIndex - peakIndex,
        recoveryDays: null,
        totalDays: v.length - 1 - peakIndex,
        ongoing: true,
      });
    }
  }

  return out;
}

/** 요약 통계 */
export function drawdownSummary(closes: number[], minDepthPct = MIN_EPISODE_DEPTH_PCT): DrawdownSummary | null {
  const v = closes.filter(c => isFinite(c) && c > 0);
  if (v.length < 3) return null;

  let peak = -Infinity;
  let maxDd = 0;
  let underwater = 0;
  let newHighs = 0;
  for (const c of v) {
    if (c >= peak) { peak = c; newHighs++; }
    else underwater++;
    const dd = (1 - c / peak) * 100;
    if (dd > maxDd) maxDd = dd;
  }

  const episodes = drawdownEpisodes(v, minDepthPct);
  const byDepth = [...episodes].sort((a, b) => b.depthPct - a.depthPct);
  const byLength = [...episodes].sort((a, b) => b.totalDays - a.totalDays);

  const last = v[v.length - 1];
  const runningPeak = Math.max(...v);
  return {
    maxDrawdownPct: maxDd,
    worst: byDepth[0] ?? null,
    longest: byLength[0] ?? null,
    underwaterPct: (underwater / v.length) * 100,
    newHighDays: newHighs,
    totalDays: v.length,
    episodes: byDepth,
    currentDrawdownPct: Math.max(0, (1 - last / runningPeak) * 100),
  };
}
