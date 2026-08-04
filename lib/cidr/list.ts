/**
 * 프리픽스 162가지 — 자료를 한 줄도 적지 않는다.
 *
 * IPv4는 /0부터 /32까지 서른셋, IPv6는 /0부터 /128까지 백스물아홉이다. 마스크도
 * 주소 개수도 쓸 수 있는 호스트 수도 전부 그 숫자 하나에서 나온다(facts.ts).
 *
 * ── 특수 대역을 항목으로 두지 않은 이유 ─────────────────
 * 10.0.0.0/8이나 fe80::/10 같은 대역은 이 사전의 항목이 아니라 **프리픽스의
 * 쓰임새**다. 따로 페이지를 만들면 주소가 `10-0-0-0-8`처럼 읽기 어려워지고,
 * 정작 "/8이 몇 개인가"를 찾는 사람과 갈라진다. 그래서 특수 대역은 허브의 표와
 * 해당 프리픽스 페이지의 설명에 넣는다.
 */
export type Family = 'v4' | 'v6';

export interface Prefix {
  family: Family;
  /** 프리픽스 길이 — /24의 24 */
  bits: number;
}

export const V4_BITS = 32;
export const V6_BITS = 128;

export const PREFIXES: Prefix[] = [
  ...Array.from({ length: V4_BITS + 1 }, (_, bits) => ({ family: 'v4' as const, bits })),
  ...Array.from({ length: V6_BITS + 1 }, (_, bits) => ({ family: 'v6' as const, bits })),
];

/** 주소는 v4-24 꼴이다 — 슬래시는 경로를 가르고, 24만으로는 어느 쪽인지 알 수 없다 */
export const slugOf = (p: Prefix): string => `${p.family}-${p.bits}`;

export const CIDR_SLUGS = PREFIXES.map(slugOf);

export const prefixOf = (slug: string): Prefix | undefined => PREFIXES.find(p => slugOf(p) === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const CIDR_ICON = '🌐';
