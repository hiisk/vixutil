/**
 * 전역일과 진급일.
 *
 * 계산을 화면에서 빼 둔 까닭은 검사가 붙어야 하기 때문이다. 날짜를 더하고
 * 빼는 자리는 눈으로 봐서 맞는지 알 수 없다 — 월말·윤년·하루 빼기가 겹친다.
 *
 * ── 하루를 빼는 이유 ────────────────────────────────────────────
 * **입대한 날이 복무 첫날이다.** 1월 2일에 입대한 육군은 18개월 뒤인 7월 2일이
 * 아니라 그 하루 앞인 7월 1일에 전역한다. 이 하루를 빠뜨리면 남은 날짜·진행률·
 * 진급일이 모두 하루씩 밀린다.
 */

/** 군별 복무기간(개월) */
export const BRANCHES: { key: string; label: string; months: number }[] = [
  { key: 'army', label: '육군·해병대', months: 18 },
  { key: 'navy', label: '해군', months: 20 },
  { key: 'airforce', label: '공군', months: 21 },
  { key: 'social', label: '사회복무요원', months: 21 },
];

/**
 * 정기진급 기간 — 군별로 같다.
 *
 * 그래서 복무기간이 긴 군일수록 병장으로 지내는 기간이 길다(육군 4개월,
 * 공군 7개월). 마지막 계급은 남은 기간을 채우므로 여기 적지 않는다.
 */
export const RANKS: { name: string; months: number }[] = [
  { name: '이등병', months: 2 },
  { name: '일병', months: 6 },
  { name: '상병', months: 6 },
];

/** UTC 자정에 고정한다 — 표준시가 끼면 하루가 왔다 갔다 한다 */
const utc = (d: Date): Date => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

/**
 * 달을 더한다.
 *
 * 1월 31일에 한 달을 더하면 2월 31일은 없다. 그때는 그 달의 마지막 날로
 * 내린다 — Date가 3월 3일로 넘겨 버리는 것을 막는다.
 */
export function addMonths(date: Date, months: number): Date {
  const d = utc(date);
  const day = d.getUTCDate();
  const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + months, 1));
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(day, lastDay));
  return target;
}

export const addDays = (date: Date, days: number): Date =>
  new Date(utc(date).getTime() + days * 86_400_000);

/** 입대일 + 복무기간 − 하루 */
export const dischargeDate = (enlist: Date, months: number): Date =>
  addDays(addMonths(enlist, months), -1);

export const daysBetween = (a: Date, b: Date): number =>
  Math.round((utc(b).getTime() - utc(a).getTime()) / 86_400_000);

export interface Progress {
  /** 전체 복무 일수 — 입대일과 전역일을 모두 센다 */
  total: number;
  /** 오늘까지 지난 일수 */
  done: number;
  /** 전역까지 남은 일수 */
  left: number;
  /** 진행률(%) — 0에서 100 사이로 자른다 */
  percent: number;
}

export function serviceProgress(enlist: Date, discharge: Date, today: Date): Progress {
  const total = daysBetween(enlist, discharge) + 1;
  const done = Math.min(Math.max(daysBetween(enlist, today) + 1, 0), total);
  return {
    total,
    done,
    left: daysBetween(today, discharge),
    percent: Math.round((done / total) * 1000) / 10,
  };
}

/**
 * 계급별 진급일 — 그 계급이 되는 날.
 *
 * 이등병으로 시작하므로 목록의 첫 진급은 일병이다. 마지막 계급(병장)은
 * 앞선 기간을 다 채운 다음 날이다.
 */
export function rankDates(enlist: Date, months: number): { rank: string; date: Date }[] {
  const out: { rank: string; date: Date }[] = [];
  let elapsed = 0;
  const names = ['일병', '상병', '병장'];
  for (let i = 0; i < RANKS.length; i++) {
    elapsed += RANKS[i].months;
    if (elapsed >= months) break;   // 복무가 그 전에 끝나면 그 계급은 없다
    out.push({ rank: names[i], date: addMonths(enlist, elapsed) });
  }
  return out;
}
