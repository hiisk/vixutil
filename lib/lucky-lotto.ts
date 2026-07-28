/**
 * FNV-1a 해시 기반 시드 정수. fortune-data의 seededInt와 동일한 로직을 두는 이유는,
 * 이 파일이 node --test(확장자 없는 크로스 임포트 불가)에서 단독으로 로드되어야 하기
 * 때문이다. 결정론적 시드 유틸이라 값이 어긋날 일은 없다.
 */
function seededInt(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

const LUCKY_DIRECTIONS = ['동쪽', '서쪽', '남쪽', '북쪽', '동남쪽', '서남쪽'];

/**
 * 생년월일 + 날짜를 시드로 하는 "오늘의 행운 로또 번호".
 *
 * 랜덤 뽑기 섹션의 순수 난수 로또와 달리, 사람(생년월일)마다 다르고 매일 바뀌는
 * 개인화된 번호다. 결정론적이라 같은 날 같은 사람은 같은 번호가 나온다.
 *
 * 어디까지나 재미·참고용이다. 당첨을 보장하지 않으며 과도한 구매를 권하지 않는다.
 */
export interface LuckyLotto {
  numbers: number[]; // 1~45 중 6개, 중복 없이 오름차순
  bonus: number;     // 위 6개와 겹치지 않는 보너스 번호
  direction: string; // 행운의 판매점 방향
  weekday: string;   // 행운의 요일
  timeSlot: string;  // 구매 추천 시간대
}

const WEEKDAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const TIME_SLOTS = [
  '이른 아침(6~9시)', '오전(9~12시)', '점심 무렵(12~14시)',
  '오후(14~18시)', '저녁(18~21시)', '늦은 밤(21~24시)',
];

export function ymdOf(d: Date): string {
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}

export function getLuckyLotto(y: number, m: number, d: number, ymd: string): LuckyLotto {
  const base = `lucky-lotto-${y}-${m}-${d}-${ymd}`;
  // 중복 없이 7개를 뽑아 6개 + 보너스로 나눈다.
  const picked: number[] = [];
  let salt = 0;
  while (picked.length < 7 && salt < 1000) {
    const n = (seededInt(`${base}-${salt}`) % 45) + 1;
    if (!picked.includes(n)) picked.push(n);
    salt++;
  }
  const numbers = picked.slice(0, 6).sort((a, b) => a - b);
  const bonus = picked[6];
  return {
    numbers,
    bonus,
    direction: LUCKY_DIRECTIONS[seededInt(`${base}-dir`) % LUCKY_DIRECTIONS.length],
    weekday: WEEKDAYS[seededInt(`${base}-wd`) % WEEKDAYS.length],
    timeSlot: TIME_SLOTS[seededInt(`${base}-ts`) % TIME_SLOTS.length],
  };
}

/** 한국 로또 공 색상(번호 구간별). */
export function ballColor(n: number): string {
  if (n <= 10) return '#fbc400';
  if (n <= 20) return '#69c8f2';
  if (n <= 30) return '#ff7272';
  if (n <= 40) return '#aaaaaa';
  return '#b0d840';
}
