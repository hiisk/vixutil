/**
 * 비트코인 반감기 — 블록 보상이 절반이 되는 시점.
 *
 * 반감기는 **날짜가 아니라 블록 높이**로 정해진다. 210,000블록마다 일어나고,
 * 블록은 평균 10분이지만 실제로는 해시레이트에 따라 흔들린다. 그래서 날짜를
 * 고정값으로 박아둔 사이트는 시간이 지날수록 어긋난다. 여기서는 현재 블록 높이를
 * 받아 남은 블록 수를 세고, 그것을 평균 블록 시간으로 환산한다.
 *
 * 환산에 쓰는 평균 블록 시간을 10분으로 고정하지 않는 이유가 있다. 난이도 조정은
 * 2,016블록마다 이뤄지고 그 사이 실제 평균은 9~11분을 오간다. 최근 블록들의 실제
 * 간격을 쓰면 예상일이 며칠 단위로 달라지므로, 관측된 값과 이론값(10분)을 모두
 * 보여주고 어느 쪽을 봤는지 밝힌다.
 *
 * 보상 계산: 초기 50 BTC에서 반감기마다 절반. 사토시 단위 정수 나눗셈이라
 * 33번째 반감기 이후 보상은 0이 된다.
 */

/** 반감기 주기 (블록) */
export const HALVING_INTERVAL = 210_000;
/** 최초 블록 보상 (BTC) */
export const INITIAL_REWARD = 50;
/** 이론상 평균 블록 시간 (초) */
export const TARGET_BLOCK_SECONDS = 600;

export interface HalvingInfo {
  /** 현재 블록 높이 */
  height: number;
  /** 지금까지 지난 반감기 횟수 */
  epoch: number;
  /** 현재 블록 보상 (BTC) */
  reward: number;
  /** 다음 반감기 이후 보상 (BTC) */
  nextReward: number;
  /** 다음 반감기가 일어나는 블록 높이 */
  nextHeight: number;
  /** 남은 블록 수 */
  blocksRemaining: number;
  /** 현재 주기에서 진행된 비율 (%) */
  progressPct: number;
}

/** 높이 h에서의 블록 보상 (BTC). 사토시 정수 나눗셈을 그대로 따른다. */
export function rewardAt(height: number): number {
  if (!isFinite(height) || height < 0) return 0;
  const epoch = Math.floor(height / HALVING_INTERVAL);
  if (epoch >= 33) return 0; // 사토시 단위로 0이 된다
  return INITIAL_REWARD / Math.pow(2, epoch);
}

/** 현재 블록 높이에서 반감기 정보를 만든다 */
export function halvingInfo(height: number): HalvingInfo | null {
  if (!isFinite(height) || height < 0) return null;
  const epoch = Math.floor(height / HALVING_INTERVAL);
  const nextHeight = (epoch + 1) * HALVING_INTERVAL;
  const blocksRemaining = nextHeight - height;
  const intoEpoch = height - epoch * HALVING_INTERVAL;
  return {
    height,
    epoch,
    reward: rewardAt(height),
    nextReward: rewardAt(nextHeight),
    nextHeight,
    blocksRemaining,
    progressPct: (intoEpoch / HALVING_INTERVAL) * 100,
  };
}

/**
 * 남은 블록을 시간으로 환산한다.
 * @param blockSeconds 블록 하나에 걸리는 평균 초
 * @returns 예상 도달 시각 (epoch ms). 기준 시각을 인자로 받는다 — 모듈이 시계를
 *          직접 읽으면 테스트가 불가능해지고 렌더마다 값이 흔들린다.
 */
export function etaMs(blocksRemaining: number, blockSeconds: number, nowMs: number): number | null {
  if (!isFinite(blocksRemaining) || blocksRemaining < 0) return null;
  if (!isFinite(blockSeconds) || blockSeconds <= 0) return null;
  if (!isFinite(nowMs)) return null;
  return nowMs + blocksRemaining * blockSeconds * 1000;
}

/**
 * 최근 블록들의 실제 평균 간격(초).
 * timestamps는 블록 타임스탬프(초 단위, 최신순 또는 오래된 순 무관).
 * 비트코인 타임스탬프는 단조증가가 보장되지 않으므로 정렬 후 양 끝으로 잰다.
 */
export function observedBlockSeconds(timestamps: number[]): number | null {
  const t = timestamps.filter(x => isFinite(x) && x > 0).sort((a, b) => a - b);
  if (t.length < 2) return null;
  const span = t[t.length - 1] - t[0];
  if (!(span > 0)) return null;
  return span / (t.length - 1);
}

/** 남은 시간을 일·시·분으로 쪼갠다 */
export function breakdown(ms: number): { days: number; hours: number; minutes: number } | null {
  if (!isFinite(ms) || ms < 0) return null;
  const totalMinutes = Math.floor(ms / 60000);
  return {
    days: Math.floor(totalMinutes / 1440),
    hours: Math.floor((totalMinutes % 1440) / 60),
    minutes: totalMinutes % 60,
  };
}
