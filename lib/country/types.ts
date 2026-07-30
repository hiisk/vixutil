/**
 * 나라 정보의 공통 형태.
 *
 * 인구·GDP처럼 매년 바뀌는 숫자를 잔뜩 넣으면 이 페이지는 만든 날부터 낡는다.
 * 그래서 여행 준비에 실제로 필요하고 잘 바뀌지 않는 것들 — 전압과 플러그,
 * 국가번호, 시차, 운전 방향, 통화 — 을 중심에 두고, 변동이 잦은 비자는
 * 값 대신 "확인하라"는 문구를 항상 함께 낸다.
 */
import type { Lang } from '../formula/terms.ts';

export interface CountryText {
  /** 나라 이름 */
  name: string;
  /** 수도 이름 */
  capital: string;
  /** 공용어 */
  languages: string;
  /** 통화 이름 */
  currency: string;
  /** 두세 문장 소개 */
  intro: string;
  /** 여행자가 알면 도움이 되는 한 가지 */
  tip: string;
  /** 한국 여권 기준 입국 조건 */
  visa: string;
  /** 긴급 전화 — "경찰"처럼 설명이 붙어 언어별로 둔다 */
  emergency: string;
}

export interface Country {
  slug: string;
  /** ISO 3166-1 alpha-2 */
  code: string;
  /** 국기 이모지 — 카드 아이콘으로 쓴다 */
  icon: string;
  region: string;
  /** 표준시 UTC 오프셋(시간). 나라가 여러 시간대면 대표 도시 기준 */
  utc: number;
  /** IANA 시간대 — 현재 시각은 이걸로 계산한다. 숫자 오프셋만 쓰면 서머타임에 한 시간 틀린다 */
  tz: string;
  /** 서머타임을 쓰는가 */
  dst: boolean;
  /** 국제전화 국가번호 */
  dial: string;
  /** 전압 */
  volt: string;
  /** 주파수 */
  hz: string;
  /** 플러그 타입 */
  plug: string;
  /** 운전석 기준 통행 방향 */
  drive: 'left' | 'right';
  /** 통화 ISO 코드 */
  currencyCode: string;
  /** 최상위 도메인 */
  tld: string;
  ko: CountryText;
  en: CountryText;
}

export const countryText = (c: Country, lang: Lang): CountryText => c[lang];

/** 한국(UTC+9)과의 시차 — 음수면 한국보다 느리다 */
export const koreaOffset = (c: Country): number => c.utc - 9;
