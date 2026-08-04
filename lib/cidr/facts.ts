/**
 * 프리픽스 하나의 값 — 길이 하나에서 계산한다.
 *
 * /24는 "앞의 24비트가 망 주소"라는 뜻이고, 남은 8비트가 그 망 안의 주소가 된다.
 * 마스크도 와일드카드도 주소 개수도 거기서 곧바로 나온다.
 *
 * ── 호스트 수에서 2를 빼는 것과 빼지 않는 것 ─────────────
 * 보통 망 주소와 브로드캐스트 주소를 빼서 2^(32-n) - 2를 쓴다. 그런데 /31은
 * 그렇게 세면 0이 되어 버려서, 두 라우터를 잇는 자리에 쓰라고 RFC 3021이
 * 예외를 두었다(둘 다 쓴다). /32는 주소 하나짜리 호스트 경로다. 이 두 자리를
 * 공식에 맡기면 "쓸 수 있는 주소 -2개"라는 답이 나온다.
 */
import { PREFIXES, V4_BITS, V6_BITS, type Family, type Prefix } from './list.ts';

export interface CidrFacts {
  family: Family;
  bits: number;
  /** 총 비트 수 — v4는 32, v6는 128 */
  total: number;
  /** 호스트 자리에 남는 비트 */
  hostBits: number;
  /** 255.255.255.0 — IPv4에만 있다 */
  mask?: string;
  /** 0.0.0.255 — 마스크를 뒤집은 것. 라우터 설정에서 쓴다 */
  wildcard?: string;
  /** 16진수 마스크 — FFFFFF00 */
  maskHex?: string;
  /** 주소 개수. 2^96처럼 큰 수는 BigInt로 센다 */
  addresses: bigint;
  /** 실제로 기기에 줄 수 있는 주소 수 */
  usable: bigint;
  /** 이 대역 안에 /24가 몇 개 드는가 (v4) · /64가 몇 개 드는가 (v6) */
  subnets: bigint;
  /** 예전 분류 — /8은 A, /16은 B, /24는 C였다 */
  classful?: 'A' | 'B' | 'C';
  /** 16진수 한 자리에 딱 떨어지는 자리인가 — IPv6은 이 자리에서 끊어 적기 좋다 */
  nibble: boolean;
  /** 1이 n개 이어지고 0이 남는 비트 그림 */
  bin: string;
}

const two = BigInt(2);

/** 2의 거듭제곱 — 96비트짜리 수가 나오므로 BigInt로 센다 */
const pow2 = (n: number): bigint => two ** BigInt(n);

/** 프리픽스 길이를 점 넷 마스크로 */
export function maskOf(bits: number): string {
  return [0, 1, 2, 3]
    .map(i => {
      const left = Math.min(8, Math.max(0, bits - i * 8));
      return 256 - 2 ** (8 - left);
    })
    .join('.');
}

/** 마스크를 다시 프리픽스 길이로 — 검사가 되돌아올 때 쓴다 */
export const bitsOfMask = (mask: string): number =>
  mask.split('.').reduce((n, part) => n + (Number(part).toString(2).match(/1/g) ?? []).length, 0);

const wildcardOf = (mask: string): string => mask.split('.').map(p => 255 - Number(p)).join('.');

export function cidrFacts({ family, bits }: Prefix): CidrFacts {
  const total = family === 'v4' ? V4_BITS : V6_BITS;
  const hostBits = total - bits;
  const addresses = pow2(hostBits);
  const mask = family === 'v4' ? maskOf(bits) : undefined;

  return {
    family,
    bits,
    total,
    hostBits,
    mask,
    wildcard: mask ? wildcardOf(mask) : undefined,
    maskHex: mask
      ? mask.split('.').map(p => Number(p).toString(16).toUpperCase().padStart(2, '0')).join('')
      : undefined,
    addresses,
    // /31은 두 주소를 다 쓰고(RFC 3021), /32는 하나뿐이다. 나머지는 망과 브로드캐스트를 뺀다
    usable: family === 'v6'
      ? addresses
      : bits >= 31
        ? addresses
        : addresses - two,
    subnets: family === 'v4'
      ? (bits <= 24 ? pow2(24 - bits) : BigInt(0))
      : (bits <= 64 ? pow2(64 - bits) : BigInt(0)),
    classful: family === 'v4' && (bits === 8 || bits === 16 || bits === 24)
      ? ({ 8: 'A', 16: 'B', 24: 'C' } as const)[bits as 8 | 16 | 24]
      : undefined,
    nibble: bits % 4 === 0,
    bin: family === 'v4' ? `${'1'.repeat(bits)}${'0'.repeat(hostBits)}` : '',
  };
}

export const FAMILIES: Family[] = ['v4', 'v6'];

export const prefixesOf = (family: Family): Prefix[] => PREFIXES.filter(p => p.family === family);

/** 앞뒤 프리픽스 — 한 비트 차이가 두 배 차이다 */
export const neighbours = (p: Prefix, span = 3): Prefix[] =>
  prefixesOf(p.family).filter(o => Math.abs(o.bits - p.bits) <= span && o.bits !== p.bits);

/**
 * 프리픽스마다의 쓰임새 — 특수 대역은 항목이 아니라 여기 붙는 꼬리표다.
 *
 * 주소 자체(10.0.0.0)는 만국 공통이라 옮기지 않는다. 무엇에 쓰는 자리인지는
 * 화면 문구가 맡는다.
 */
export const BLOCKS: Record<string, string[]> = {
  'v4-8': ['10.0.0.0/8', '127.0.0.0/8'],
  'v4-10': ['100.64.0.0/10'],
  'v4-12': ['172.16.0.0/12'],
  'v4-15': ['198.18.0.0/15'],
  'v4-16': ['192.168.0.0/16', '169.254.0.0/16'],
  'v4-24': ['192.0.2.0/24', '198.51.100.0/24', '203.0.113.0/24', '192.88.99.0/24'],
  'v4-4': ['224.0.0.0/4', '240.0.0.0/4'],
  'v4-32': ['255.255.255.255/32'],
  'v6-7': ['fc00::/7'],
  'v6-10': ['fe80::/10'],
  'v6-8': ['ff00::/8'],
  'v6-16': ['2002::/16'],
  'v6-32': ['2001:db8::/32', '2001::/32'],
  'v6-96': ['::ffff:0:0/96', '64:ff9b::/96'],
  'v6-128': ['::/128', '::1/128'],
};

export const blocksOf = (p: Prefix): string[] => BLOCKS[`${p.family}-${p.bits}`] ?? [];
