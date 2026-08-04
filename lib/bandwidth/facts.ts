/**
 * 파일 크기와 회선 속도 하나가 만드는 다운로드 시간.
 *
 * 나눗셈 한 번이면 될 것 같지만 두 군데서 어긋난다.
 *
 * 첫째는 단위다. 통신사가 파는 100Mbps의 b는 비트고, 파일 크기의 B는
 * 바이트다. 여덟 배 차이라 100Mbps 회선의 최대치는 12.5MB/s다.
 *
 * 둘째는 포장이다. 파일은 1448바이트씩 잘려 나가는데, 그 조각마다 주소와
 * 순번이 붙고 조각 사이에는 쉬는 틈이 있다. 선 위로는 1538바이트가 지나가고
 * 그중 내 파일은 1448바이트다 — 6% 가까이가 포장이다. 아래 EFFICIENCY는
 * 어림한 값이 아니라 그 바이트 수를 나눈 것이다.
 */
import { CELLS, LINKS, SPEEDS, SIZES, STREAMS, type Cell, sizeLabel, slugOf } from './list.ts';

/** 이더넷이 한 번에 싣는 IP 패킷의 최대 크기 */
const MTU = 1500;
const IP_HEADER = 20;
const TCP_HEADER = 20;
/** 타임스탬프 — 요즘 운영체제가 기본으로 켜 둔다 */
const TCP_OPTIONS = 12;
const ETH_HEADER = 14;
/** 프레임 끝의 검사 값 */
const FCS = 4;
/** 프레임을 알리는 머리와, 프레임 사이에 반드시 두는 틈 */
const PREAMBLE = 8;
const GAP = 12;

/** 한 프레임이 실어 나르는 내 파일의 몫 */
export const PAYLOAD = MTU - IP_HEADER - TCP_HEADER - TCP_OPTIONS;
/** 그 한 프레임이 선 위에서 차지하는 자리 */
export const ON_WIRE = MTU + ETH_HEADER + FCS + PREAMBLE + GAP;
/** 광고 속도 중 파일이 되는 몫 */
export const EFFICIENCY = PAYLOAD / ON_WIRE;

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 초가 작을수록 잘게 읽어야 뜻이 있다 */
const seconds = (x: number) => round(x, x < 10 ? 2 : 1);

export interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Neighbour {
  slug: string;
  mb: number;
  mbps: number;
  label: string;
}

export interface BandwidthFacts {
  cell: Cell;
  slug: string;
  /** 4.7GB 같은 읽는 이름 */
  size: string;
  /** 나눗셈만 한 시간(초) — 포장을 세지 않은 값 */
  ideal: number;
  /** 실제로 걸리는 시간(초) */
  real: number;
  /** 시·분·초로 쪼갠 실제 시간 */
  parts: TimeParts;
  /** 초당 실제로 쌓이는 양(MB/s) */
  perSecond: number;
  /** 광고 속도를 그대로 나눈 값(MB/s) — 여기까지는 못 간다 */
  peak: number;
  /** 윈도우 탐색기가 보여 줄 크기(GiB) */
  gib: number;
  /** 이 회선을 하루 종일 당겨쓰면(GB) */
  dayGb: number;
  /** 1분 안에 받으려면 필요한 속도(Mbps) */
  minuteSpeed: number;
  /** 시간이 똑같이 나오는 다른 칸들 */
  sameTime: Neighbour[];
  /** 같은 파일, 한 단계 빠른 회선 */
  faster: Neighbour | null;
  slower: Neighbour | null;
  /** 같은 회선, 한 단계 큰 파일 */
  bigger: Neighbour | null;
  smaller: Neighbour | null;
  /** 이 속도를 감당하지 못하는 구간들 */
  bottlenecks: { key: string; mbps: number }[];
  /** 이 회선으로 동시에 흘릴 수 있는 수 */
  streams: { key: string; count: number }[];
}

/** 포장을 세지 않은 시간 — 크기(MB)×8을 속도(Mbps)로 나눈다 */
export const idealOf = (mb: number, mbps: number): number => (mb * 8) / mbps;

/** 실제 시간 — 선 위를 지나는 것 중 파일은 EFFICIENCY 몫뿐이다 */
export const realOf = (mb: number, mbps: number): number => idealOf(mb, mbps) / EFFICIENCY;

/** 초를 일·시·분·초로 — 남는 초는 반올림한다 */
export const partsOf = (total: number): TimeParts => {
  const t = Math.round(total);
  return {
    days: Math.floor(t / 86400),
    hours: Math.floor(t / 3600) % 24,
    minutes: Math.floor(t / 60) % 60,
    seconds: t % 60,
  };
};

const near = (c: Cell): Neighbour => ({ slug: slugOf(c), mb: c.mb, mbps: c.mbps, label: sizeLabel(c.mb) });

const step = (list: number[], value: number, by: number): number | null => {
  const i = list.indexOf(value) + by;
  return i >= 0 && i < list.length ? list[i] : null;
};

export function bandwidthFacts(c: Cell): BandwidthFacts {
  const real = realOf(c.mb, c.mbps);
  const fasterSpeed = step(SPEEDS, c.mbps, 1);
  const slowerSpeed = step(SPEEDS, c.mbps, -1);
  const biggerSize = step(SIZES, c.mb, 1);
  const smallerSize = step(SIZES, c.mb, -1);

  return {
    cell: c,
    slug: slugOf(c),
    size: sizeLabel(c.mb),
    ideal: seconds(idealOf(c.mb, c.mbps)),
    real: seconds(real),
    parts: partsOf(real),
    perSecond: round((c.mbps / 8) * EFFICIENCY, 2),
    peak: round(c.mbps / 8, 2),
    gib: round((c.mb * 1e6) / 2 ** 30, 2),
    dayGb: round((c.mbps * EFFICIENCY * 86400) / 8 / 1000),
    minuteSpeed: Math.ceil((c.mb * 8) / 60 / EFFICIENCY),
    // 크기와 속도를 같은 배로 키우면 시간은 그대로다 — 곱셈으로 어긋남 없이 고른다
    sameTime: CELLS.filter(o => o.mb * c.mbps === c.mb * o.mbps && slugOf(o) !== slugOf(c)).map(near),
    faster: fasterSpeed === null ? null : near({ mb: c.mb, mbps: fasterSpeed }),
    slower: slowerSpeed === null ? null : near({ mb: c.mb, mbps: slowerSpeed }),
    bigger: biggerSize === null ? null : near({ mb: biggerSize, mbps: c.mbps }),
    smaller: smallerSize === null ? null : near({ mb: smallerSize, mbps: c.mbps }),
    bottlenecks: LINKS.filter(l => l.mbps < c.mbps),
    streams: STREAMS.map(s => ({ key: s.key, count: Math.floor((c.mbps * EFFICIENCY) / s.mbps) })),
  };
}

/** 같은 속도의 한 줄 — 표에 쓴다 */
export const atSpeed = (mbps: number): Cell[] => CELLS.filter(c => c.mbps === mbps);

/** 같은 크기의 한 줄 */
export const atSize = (mb: number): Cell[] => CELLS.filter(c => c.mb === mb);
