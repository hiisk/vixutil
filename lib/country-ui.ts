/**
 * 나라 정보 화면의 3언어 문구와 섹션 설정.
 */
import type { Lang } from './formula/terms.ts';
import { COUNTRIES, COUNTRY_REGIONS } from './country-tools.ts';
import type { Country } from './country/types.ts';

export const COUNTRY_UI = {
  ko: {
    home: '홈',
    section: '나라 정보',
    hubTitle: '나라별 여행 정보',
    hubLead: '시차·전압·플러그·국가번호·입국 조건을 나라별로 한 장에',
    hubNotice: '🧭 비자와 입국 조건은 자주 바뀝니다. 출발 전 공관 공지를 확인하세요.',
    footNote: '비자·입국 조건은 정책에 따라 수시로 바뀌므로 반드시 해당 국가 공관의 최신 공지를 확인하세요. 전압과 플러그는 숙소에 따라 다를 수 있습니다.',
    metaTitle: '나라별 여행 정보 — 시차·전압·플러그·국가번호 100개국',
    metaDesc:
      '일본·베트남·프랑스·미국·아이슬란드·케냐 등 100개국의 시차와 현재 시각, 전압과 플러그 타입, 국제전화 국가번호, 통행 방향, 긴급 전화, 입국 조건을 한 장에 모았습니다.',
    capital: '수도',
    languages: '공용어',
    currency: '통화',
    timezone: '표준시',
    nowLocal: '현재 시각',
    koreaGap: '한국과의 시차',
    dial: '국가번호',
    volt: '전압',
    plug: '플러그',
    drive: '통행 방향',
    driveLeft: '좌측통행',
    driveRight: '우측통행',
    emergency: '긴급 전화',
    tld: '도메인',
    visaTitle: '입국·비자',
    tipTitle: '알아두면 좋은 것',
    related: '같은 지역의 나라',
    dstYes: '서머타임 적용',
    dstNo: '서머타임 없음',
    sameTime: '시차 없음',
    ahead: (h: string) => `한국보다 ${h}시간 빠름`,
    behind: (h: string) => `한국보다 ${h}시간 느림`,
    faq1: (n: string) => `${n}과 한국의 시차는 몇 시간인가요?`,
    faq2: (n: string) => `${n}에서 한국 전자제품을 쓸 수 있나요?`,
    faq3: (n: string) => `${n}에 갈 때 비자가 필요한가요?`,
  },
  en: {
    home: 'Home',
    section: 'Country Guide',
    hubTitle: 'Country Travel Facts',
    hubLead: 'Time difference, voltage, plugs, dialling codes and entry rules, one page per country',
    hubNotice: '🧭 Visa and entry rules change often — check the official notice before you fly.',
    footNote: 'Visa and entry requirements change with policy, so always confirm the latest official notice for your destination. Voltage and plug types can vary by building.',
    metaTitle: 'Country Travel Facts — Time Zones, Voltage & Plugs for 100 Countries',
    metaDesc:
      'Time difference and current local time, voltage and plug types, international dialling codes, which side they drive on, emergency numbers and entry rules for 100 countries including Japan, Vietnam, France, Iceland and Kenya.',
    capital: 'Capital',
    languages: 'Languages',
    currency: 'Currency',
    timezone: 'Standard time',
    nowLocal: 'Local time now',
    koreaGap: 'Difference from Korea',
    dial: 'Dialling code',
    volt: 'Voltage',
    plug: 'Plug type',
    drive: 'Driving side',
    driveLeft: 'Left-hand traffic',
    driveRight: 'Right-hand traffic',
    emergency: 'Emergency',
    tld: 'Domain',
    visaTitle: 'Entry & visa',
    tipTitle: 'Worth knowing',
    related: 'Countries in the same region',
    dstYes: 'Observes daylight saving',
    dstNo: 'No daylight saving',
    sameTime: 'Same time as Korea',
    ahead: (h: string) => `${h} hours ahead of Korea`,
    behind: (h: string) => `${h} hours behind Korea`,
    faq1: (n: string) => `What is the time difference between ${n} and Korea?`,
    faq2: (n: string) => `Will Korean electronics work in ${n}?`,
    faq3: (n: string) => `Do I need a visa for ${n}?`,
  },
} as const;

export const COUNTRY_REGION_LABEL: Record<Lang, Record<string, string>> = {
  ko: {
    '동아시아': '동아시아', '동남아시아': '동남아시아', '서·남아시아': '서·남아시아',
    '유럽': '유럽', '미주': '미주', '오세아니아·아프리카': '오세아니아·아프리카',
  },
  en: {
    '동아시아': 'East Asia', '동남아시아': 'Southeast Asia', '서·남아시아': 'West & South Asia',
    '유럽': 'Europe', '미주': 'Americas', '오세아니아·아프리카': 'Oceania & Africa',
  },
};

export const COUNTRY_SECTION = {
  key: 'country',
  countries: COUNTRIES,
  regions: COUNTRY_REGIONS,
  accent: 'sky' as const,
  grad: 'from-sky-500 to-cyan-600',
  hoverBorder: 'hover:border-sky-300',
  textAccent: 'text-sky-600',
  hoverText: 'group-hover:text-sky-700',
  linkHover: 'hover:text-sky-600',
  ogFrom: '#0ea5e9',
  ogTo: '#0891b2',
};

/** 시차를 사람이 읽는 문장으로 — 30분·45분 단위 나라가 있어 소수를 그대로 못 쓴다 */
export function gapText(c: Country, lang: Lang): string {
  const ui = COUNTRY_UI[lang];
  const diff = c.utc - 9;
  if (diff === 0) return ui.sameTime;
  const abs = Math.abs(diff);
  const label = Number.isInteger(abs) ? String(abs) : abs.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  return diff > 0 ? ui.ahead(label) : ui.behind(label);
}

/** UTC+9:30처럼 표기 — 소수 오프셋을 시:분으로 바꾼다 */
export function utcLabel(utc: number): string {
  // 진짜 마이너스 기호(U+2212)가 보기 좋지만 OG 이미지의 동적 폰트가 이 글자를 받지 못한다
  const sign = utc < 0 ? '-' : '+';
  const abs = Math.abs(utc);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}`;
}

export function countryFaq(c: Country, lang: Lang) {
  const ui = COUNTRY_UI[lang];
  const t = c[lang];
  return [
    { q: ui.faq1(t.name), a: `${gapText(c, lang)} (${utcLabel(c.utc)}). ${c.dst ? ui.dstYes : ui.dstNo}.` },
    { q: ui.faq2(t.name), a: `${ui.volt} ${c.volt} / ${c.hz}, ${ui.plug} ${c.plug}.` },
    { q: ui.faq3(t.name), a: t.visa },
  ];
}

export function countryAlternates(slug?: string) {
  const path = slug ? `/country/${slug}` : '/country';
  return { 'ko': path, 'en': `/en${path}`, 'x-default': `/en${path}` };
}
