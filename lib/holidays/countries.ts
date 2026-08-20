import type { CountryDef } from './engine.ts';
import { US } from './us.ts';
import { GB } from './gb.ts';
import { DE } from './de.ts';
import { FR } from './fr.ts';
import { ES } from './es.ts';
import { BR } from './br.ts';
import { JP } from './jp.ts';

/**
 * 다루는 나라들.
 *
 * ── 왜 이 일곱인가 ─────────────────────────────────────────
 * 태양력으로만 정해지는 나라다. 음력을 쓰는 곳(한국·중국·인도·베트남)은
 * 뺐다 — 설·춘절·디왈리는 삭망 계산이나 만세력 표가 있어야 하는데, 없이
 * 지어내면 조용히 틀린 날짜를 매년 내보내게 된다. 나중에 표를 갖추면 는다.
 *
 * ── 주소 ───────────────────────────────────────────────────
 * `/holidays/us`는 그 나라 개관, `/holidays/us-2027`은 그 해 목록이다.
 * 연도를 접두어가 아니라 꼬리로 붙여 라우팅 표를 한 칸만 쓴다.
 */
export interface Country {
  code: string;
  def: CountryDef;
  /** 그 나라 말로 부르는 나라 이름 — 제목에 쓴다 */
  native: string;
  /** 그 나라 말로 «공휴일» — 「Feiertage」·「祝日」 */
  nativeWord: string;
  /** 페이지 글의 기준이 되는 말 (Intl 태그) */
  tag: string;
  en: string;
}

export const COUNTRIES: Country[] = [
  { code: 'us', def: US, native: 'United States', nativeWord: 'Federal Holidays', tag: 'en-US', en: 'United States' },
  { code: 'gb', def: GB, native: 'United Kingdom', nativeWord: 'Bank Holidays', tag: 'en-GB', en: 'United Kingdom' },
  { code: 'de', def: DE, native: 'Deutschland', nativeWord: 'Feiertage', tag: 'de-DE', en: 'Germany' },
  { code: 'fr', def: FR, native: 'France', nativeWord: 'Jours fériés', tag: 'fr-FR', en: 'France' },
  { code: 'es', def: ES, native: 'España', nativeWord: 'Días festivos', tag: 'es-ES', en: 'Spain' },
  { code: 'br', def: BR, native: 'Brasil', nativeWord: 'Feriados', tag: 'pt-BR', en: 'Brazil' },
  { code: 'jp', def: JP, native: '日本', nativeWord: '祝日', tag: 'ja-JP', en: 'Japan' },
];

/* JSX를 안 끌어오는 자리에 둔다 — 검색 색인이 route.ts를 들이면 og-template까지 딸려온다 */
export const HOLIDAY_ICON = '📅';

export const COUNTRY_BY_CODE = new Map(COUNTRIES.map(c => [c.code, c]));

/**
 * 낼 연도의 범위.
 *
 * 「2027년 공휴일」은 그 해가 오기 한참 전부터 찾는다. 앞으로 넉넉히 내고
 * 지난해도 하나 남긴다 — 「작년 며칠에 쉬었지」를 찾는 사람이 있다.
 *
 * **빌드 시점을 박지 않는다.** 상수로 두면 배포한 해가 굳어 버린다.
 */
export const YEAR_SPAN = { back: 1, ahead: 5 };

export const yearsAround = (now: number): number[] =>
  Array.from({ length: YEAR_SPAN.back + 1 + YEAR_SPAN.ahead }, (_, i) => now - YEAR_SPAN.back + i);

/** `us-2027` → `{ code: 'us', year: 2027 }`. 연도가 없으면 나라 개관 */
export function parseSlug(slug: string): { country: Country; year: number | null } | null {
  const m = /^([a-z]{2})(?:-(\d{4}))?$/.exec(slug);
  if (!m) return null;
  const country = COUNTRY_BY_CODE.get(m[1]);
  if (!country) return null;
  const year = m[2] ? Number(m[2]) : null;
  /* 아무 해나 열어 주면 주소가 무한히 늘어난다 — 색인에 쓰레기가 쌓인다 */
  if (year !== null && (year < 1990 || year > 2100)) return null;
  return { country, year };
}

export const holidaySlug = (code: string, year?: number) => (year ? `${code}-${year}` : code);
