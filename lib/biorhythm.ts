/**
 * 바이오리듬 — 출생일로부터의 경과일을 주기 사인파에 넣어 계산한다.
 *
 * 신체 23일·감성 28일·지성 33일 주기는 20세기 초에 제안된 이래 그대로 굳어진
 * 값이고, 이 주기가 실제로 컨디션을 예측한다는 근거는 없다. 다만 계산 자체는
 * 완전히 결정론적이라 "오늘의 운세"처럼 임의로 뽑는 것과 달리 누가 계산해도
 * 같은 값이 나온다. 페이지에서 이 점을 분명히 밝힌다.
 */

export interface Cycle {
  key: 'physical' | 'emotional' | 'intellectual';
  label: string;
  period: number;
  emoji: string;
  desc: string;
}

export const CYCLES: Cycle[] = [
  { key: 'physical',     label: '신체 리듬', period: 23, emoji: '💪', desc: '체력·지구력·활동성' },
  { key: 'emotional',    label: '감성 리듬', period: 28, emoji: '💗', desc: '기분·예민함·창의성' },
  { key: 'intellectual', label: '지성 리듬', period: 33, emoji: '🧠', desc: '집중력·판단력·기억력' },
];

export type CycleKey = Cycle['key'];
export type Phase = 'high' | 'low' | 'critical';

export interface CycleState {
  key: CycleKey;
  /** -100 ~ 100 */
  percent: number;
  phase: Phase;
  /** 오늘 이후 가장 가까운 위험일까지 남은 일수 (오늘이 위험일이면 0) */
  daysToCritical: number;
}

export interface BiorhythmResult {
  days: number;
  cycles: CycleState[];
  /** 세 리듬 평균 (-100 ~ 100) */
  average: number;
}

const MS_PER_DAY = 86_400_000;

/**
 * 두 날짜 사이의 일수. 시각·시간대·서머타임에 흔들리지 않도록 UTC 자정 기준으로 센다.
 * 로컬 Date를 그대로 빼면 DST 전환일에 하루가 어긋난다.
 */
export function daysBetween(from: Date, to: Date): number {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b - a) / MS_PER_DAY);
}

/** 경과일 d에서의 주기값 (-1 ~ 1) */
export function cycleValue(days: number, period: number): number {
  return Math.sin((2 * Math.PI * days) / period);
}

/**
 * 위험일 = 사인 곡선이 0을 지나는 날.
 *
 * 주기가 23·33처럼 홀수라 정확한 교차점이 날짜 사이에 떨어지는 경우가 많다.
 * 그래서 "오늘 값이 0에 가깝다"가 아니라 "오늘과 내일 사이에 부호가 바뀐다"로
 * 정의한다. 이러면 임의의 임계값을 정하지 않아도 되고, 주기당 정확히 두 번씩만
 * 나온다.
 */
export function isCritical(days: number, period: number): boolean {
  const today = cycleValue(days, period);
  if (today === 0) return true;
  return Math.sign(today) !== Math.sign(cycleValue(days + 1, period));
}

function nextCritical(days: number, period: number): number {
  // 주기 하나를 넘겨 찾을 일은 없다 — 위험일은 주기마다 두 번 온다.
  for (let i = 0; i <= period; i++) {
    if (isCritical(days + i, period)) return i;
  }
  return -1;
}

export function phaseOf(days: number, period: number): Phase {
  if (isCritical(days, period)) return 'critical';
  return cycleValue(days, period) > 0 ? 'high' : 'low';
}

export const PHASE_LABEL: Record<Phase, string> = {
  high: '고조기',
  low: '저조기',
  critical: '위험일',
};

/**
 * 출생일과 기준일로 세 리듬의 오늘 상태를 낸다.
 * 기준일이 출생일보다 앞서면 days가 음수가 되는데, 사인파는 음수에서도 정의되므로
 * 계산은 되지만 의미가 없다. 호출부에서 막고, 여기서는 0으로 눌러 둔다.
 */
export function getBiorhythm(birth: Date, target: Date = new Date()): BiorhythmResult {
  const days = Math.max(0, daysBetween(birth, target));

  const cycles = CYCLES.map<CycleState>(c => ({
    key: c.key,
    percent: Math.round(cycleValue(days, c.period) * 100),
    phase: phaseOf(days, c.period),
    daysToCritical: nextCritical(days, c.period),
  }));

  const average = Math.round(cycles.reduce((s, c) => s + c.percent, 0) / cycles.length);

  return { days, cycles, average };
}

export interface ChartPoint {
  offset: number;
  date: Date;
  physical: number;
  emotional: number;
  intellectual: number;
}

/** 오늘을 가운데 두고 앞뒤로 span일씩 뽑은 그래프용 시계열 */
export function getChartSeries(birth: Date, target: Date = new Date(), span = 15): ChartPoint[] {
  const base = Math.max(0, daysBetween(birth, target));
  const points: ChartPoint[] = [];

  for (let offset = -span; offset <= span; offset++) {
    const d = base + offset;
    const date = new Date(target.getFullYear(), target.getMonth(), target.getDate() + offset);
    points.push({
      offset,
      date,
      physical: cycleValue(d, 23),
      emotional: cycleValue(d, 28),
      intellectual: cycleValue(d, 33),
    });
  }
  return points;
}

/** 세 리듬 평균으로 한 줄 총평 */
export function overallComment(result: BiorhythmResult): string {
  const criticals = result.cycles.filter(c => c.phase === 'critical');

  if (criticals.length >= 2) {
    const names = criticals.map(c => CYCLES.find(x => x.key === c.key)!.label).join('·');
    return `${names}이 동시에 위험일입니다. 컨디션 기복이 클 수 있으니 무리한 일정은 미루고 평소 하던 대로 움직이세요.`;
  }
  if (criticals.length === 1) {
    const label = CYCLES.find(x => x.key === criticals[0].key)!.label;
    return `${label}이 전환점에 있습니다. 이 리듬과 관련된 일은 컨디션을 살펴가며 진행하는 편이 좋습니다.`;
  }
  if (result.average >= 60) return '세 리듬이 모두 높은 편입니다. 미뤄둔 일을 시작하기 좋은 날입니다.';
  if (result.average >= 20) return '전반적으로 안정적인 흐름입니다. 평소 페이스를 유지하세요.';
  if (result.average >= -20) return '리듬이 중간에 걸쳐 있습니다. 컨디션에 따라 일정을 조절해보세요.';
  if (result.average >= -60) return '다소 가라앉는 시기입니다. 새로 벌이기보다 정리하고 쉬는 쪽이 낫습니다.';
  return '세 리듬이 모두 낮습니다. 충분히 쉬고 중요한 결정은 며칠 미뤄보세요.';
}
