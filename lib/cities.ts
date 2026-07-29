/**
 * 세계 시계·시차 계산에 쓰는 도시 목록.
 *
 * 시차를 숫자로 저장하지 않고 IANA 시간대 이름(Asia/Seoul)만 둔다. 서머타임은
 * 나라마다 시작·종료일이 다르고 해마다 바뀌는데, 브라우저의 Intl이 그 규칙을
 * 이미 알고 있다. 직접 +9 같은 숫자를 적으면 3월과 11월에 반드시 틀린다.
 */
export interface City {
  id: string;
  city: string;
  country: string;
  zone: string;
  flag: string;
}

export const CITIES: City[] = [
  { id: 'seoul', city: '서울', country: '대한민국', zone: 'Asia/Seoul', flag: '🇰🇷' },
  { id: 'tokyo', city: '도쿄', country: '일본', zone: 'Asia/Tokyo', flag: '🇯🇵' },
  { id: 'beijing', city: '베이징', country: '중국', zone: 'Asia/Shanghai', flag: '🇨🇳' },
  { id: 'hongkong', city: '홍콩', country: '홍콩', zone: 'Asia/Hong_Kong', flag: '🇭🇰' },
  { id: 'singapore', city: '싱가포르', country: '싱가포르', zone: 'Asia/Singapore', flag: '🇸🇬' },
  { id: 'bangkok', city: '방콕', country: '태국', zone: 'Asia/Bangkok', flag: '🇹🇭' },
  { id: 'hanoi', city: '하노이', country: '베트남', zone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' },
  { id: 'delhi', city: '뉴델리', country: '인도', zone: 'Asia/Kolkata', flag: '🇮🇳' },
  { id: 'dubai', city: '두바이', country: 'UAE', zone: 'Asia/Dubai', flag: '🇦🇪' },
  { id: 'moscow', city: '모스크바', country: '러시아', zone: 'Europe/Moscow', flag: '🇷🇺' },
  { id: 'london', city: '런던', country: '영국', zone: 'Europe/London', flag: '🇬🇧' },
  { id: 'paris', city: '파리', country: '프랑스', zone: 'Europe/Paris', flag: '🇫🇷' },
  { id: 'berlin', city: '베를린', country: '독일', zone: 'Europe/Berlin', flag: '🇩🇪' },
  { id: 'newyork', city: '뉴욕', country: '미국', zone: 'America/New_York', flag: '🇺🇸' },
  { id: 'chicago', city: '시카고', country: '미국', zone: 'America/Chicago', flag: '🇺🇸' },
  { id: 'losangeles', city: 'LA', country: '미국', zone: 'America/Los_Angeles', flag: '🇺🇸' },
  { id: 'saopaulo', city: '상파울루', country: '브라질', zone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { id: 'sydney', city: '시드니', country: '호주', zone: 'Australia/Sydney', flag: '🇦🇺' },
  { id: 'auckland', city: '오클랜드', country: '뉴질랜드', zone: 'Pacific/Auckland', flag: '🇳🇿' },
];

export const DEFAULT_CITY_IDS = ['seoul', 'newyork', 'london', 'tokyo', 'losangeles'];

export const findCity = (id: string) => CITIES.find(c => c.id === id);

/** 그 시간대의 현재 시:분:초 */
export function timeIn(zone: string, at: number): string {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: zone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).format(at);
}

/** 그 시간대의 날짜(월/일 요일) */
export function dateIn(zone: string, at: number): string {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: zone, month: 'long', day: 'numeric', weekday: 'short',
  }).format(at);
}

/** 그 시간대의 시(0~23) — 업무 시간인지 판단하는 데 쓴다 */
export function hourIn(zone: string, at: number): number {
  return Number(
    new Intl.DateTimeFormat('en-US', { timeZone: zone, hour: '2-digit', hour12: false }).format(at),
  ) % 24;
}

/** 기준 시간대 대비 시차(시간). 서머타임이 반영된 실제 차이다. */
export function offsetHours(zone: string, base: string, at: number): number {
  const read = (z: string) =>
    new Date(new Date(at).toLocaleString('en-US', { timeZone: z })).getTime();
  return Math.round(((read(zone) - read(base)) / 3600000) * 10) / 10;
}

export type DayPart = 'night' | 'morning' | 'work' | 'evening';

/** 연락해도 되는 시간인지 — 색으로 구분하려고 나눈다 */
export function dayPart(hour: number): DayPart {
  if (hour < 6) return 'night';
  if (hour < 9) return 'morning';
  if (hour < 18) return 'work';
  if (hour < 23) return 'evening';
  return 'night';
}

export const DAY_PART_LABEL: Record<DayPart, string> = {
  night: '한밤중',
  morning: '이른 아침',
  work: '업무 시간',
  evening: '저녁',
};
