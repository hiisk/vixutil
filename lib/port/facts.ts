/**
 * 포트 하나의 값 — 번호에서 계산한다.
 *
 * 포트 번호는 16비트 정수다. 그래서 65535에서 끝나고, 1024 아래는 유닉스에서
 * 관리자만 열 수 있으며, 49152부터는 운영체제가 임시로 골라 쓰는 자리다.
 * 이 셋이 이 섹션의 뼈대이고 전부 번호 하나에서 나온다.
 *
 * 자료에 적는 것은 "몇 번을 무엇이 쓰는가"뿐이다(list.ts).
 */
import { PORTS, REGISTERED_MAX, WELL_KNOWN_MAX, type Port, type PortGroup } from './list.ts';

export type Range = 'well-known' | 'registered' | 'dynamic';

export const rangeOf = (port: number): Range =>
  port <= WELL_KNOWN_MAX ? 'well-known' : port <= REGISTERED_MAX ? 'registered' : 'dynamic';

export interface PortFacts {
  port: number;
  name: string;
  service: string;
  group: PortGroup;
  proto: Port['proto'];
  range: Range;
  /** 유닉스에서 관리자 권한이 있어야 열 수 있는가 */
  privileged: boolean;
  hex: string;
  bin: string;
  /** 16비트에 들어가는 수라 두 바이트로 적힌다 */
  bytes: [number, number];
  /** 암호화된 짝, 또는 이쪽이 암호화된 쪽이면 평문 짝 */
  secure?: number;
  plain?: number;
  custom: boolean;
}

/** 평문 → 암호화 짝을 뒤집어 둔 표. 한쪽만 적어 두고 반대 방향은 여기서 만든다 */
const PLAIN_OF = new Map<number, number>(
  PORTS.filter(x => x.secure !== undefined).map(x => [x.secure!, x.port]),
);

export function portFacts(x: Port): PortFacts {
  return {
    port: x.port,
    name: x.name,
    service: x.service,
    group: x.group,
    proto: x.proto,
    range: rangeOf(x.port),
    privileged: x.port <= WELL_KNOWN_MAX,
    hex: x.port.toString(16).toUpperCase().padStart(4, '0'),
    bin: x.port.toString(2).padStart(16, '0'),
    bytes: [x.port >> 8, x.port & 0xff],
    secure: x.secure,
    plain: PLAIN_OF.get(x.port),
    custom: x.custom === true,
  };
}

export const GROUPS: PortGroup[] = [
  'web', 'mail', 'file', 'remote', 'db', 'name',
  'auth', 'message', 'monitor', 'network', 'dev', 'other',
];

export const portsOfGroup = (group: PortGroup): Port[] => PORTS.filter(x => x.group === group);

export const RANGES: Range[] = ['well-known', 'registered', 'dynamic'];

export const portsOfRange = (range: Range): Port[] => PORTS.filter(x => rangeOf(x.port) === range);

/** 번호가 가까운 포트들 — 목록에서 앞뒤로 몇 걸음 */
export const neighbours = (port: number, span = 3): Port[] => {
  const i = PORTS.findIndex(x => x.port === port);
  return PORTS.slice(Math.max(0, i - span), i + span + 1).filter(x => x.port !== port);
};

/** 같은 갈래의 다른 포트들 */
export const sameGroup = (x: Port): Port[] =>
  PORTS.filter(o => o.group === x.group && o.port !== x.port);
