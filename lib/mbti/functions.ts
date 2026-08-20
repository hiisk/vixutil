/**
 * 인지기능 — 네 글자에서 규칙으로 나온다.
 *
 * ── 왜 이것을 내는가 ───────────────────────────────────────
 * 「INFP 특징」을 찾는 사람이 만나는 글은 대개 별명과 형용사 몇 줄이다.
 * 정작 유형을 가르는 뼈대인 «기능 순서»는 잘 안 나오고, 나와도 표를 손으로
 * 적어 두어 틀린 곳이 섞인다. 여기서는 규칙으로 푼다 — 열여섯 벌을 적을 일이
 * 없고, 틀리면 검사가 잡는다.
 *
 * ── 규칙 ───────────────────────────────────────────────────
 * 1. 끝 글자가 J면 «판단»기능(T/F)이 밖을 향하고, P면 «인식»기능(S/N)이
 *    밖을 향한다.
 * 2. 첫 글자가 E면 밖을 향한 쪽이 주기능, I면 안을 향한 쪽이 주기능이다.
 * 3. 3차기능은 부기능과 «짝이 되는 기능»에 «반대 방향»이다.
 * 4. 열등기능은 주기능과 짝이 되는 기능에 반대 방향이다.
 *
 * 예) INFP — P라 N이 밖으로(Ne), F는 안으로(Fi). I라 안쪽이 주기능이므로
 *     Fi가 주, Ne가 부. 3차는 Ne의 짝 S에 반대 방향이라 Si, 열등은 Fi의 짝 T에
 *     반대 방향이라 Te. → Fi Ne Si Te
 */

export type Letter = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
export type FnCode = 'Se' | 'Si' | 'Ne' | 'Ni' | 'Te' | 'Ti' | 'Fe' | 'Fi';

/** 짝이 되는 기능 — 인식끼리, 판단끼리 */
const OPPOSITE: Record<'S' | 'N' | 'T' | 'F', 'S' | 'N' | 'T' | 'F'> = {
  S: 'N', N: 'S', T: 'F', F: 'T',
};

const flip = (d: 'e' | 'i') => (d === 'e' ? 'i' : 'e');
const fn = (base: string, dir: 'e' | 'i') => `${base}${dir}` as FnCode;

/** 네 글자 → 기능 넷 (주·부·3차·열등) */
export function functionStack(type: string): [FnCode, FnCode, FnCode, FnCode] {
  const [e, ns, tf, jp] = type.split('') as ['E' | 'I', 'S' | 'N', 'T' | 'F', 'J' | 'P'];

  /* 1. 밖을 향하는 것이 무엇인가 */
  const perceivingDir: 'e' | 'i' = jp === 'P' ? 'e' : 'i';
  const judgingDir: 'e' | 'i' = jp === 'J' ? 'e' : 'i';
  const perceiving = fn(ns, perceivingDir);
  const judging = fn(tf, judgingDir);

  /* 2. E면 밖을 향한 것이 주기능 */
  const outward = perceivingDir === 'e' ? perceiving : judging;
  const inward = perceivingDir === 'e' ? judging : perceiving;
  const dom = e === 'E' ? outward : inward;
  const aux = e === 'E' ? inward : outward;

  /* 3·4. 짝이 되는 기능에 반대 방향 */
  const pairOf = (f: FnCode): FnCode =>
    fn(OPPOSITE[f[0] as 'S' | 'N' | 'T' | 'F'], flip(f[1] as 'e' | 'i'));

  return [dom, aux, pairOf(aux), pairOf(dom)];
}

export interface FnInfo {
  code: FnCode;
  /** 한국어 이름 — 「외향 직관」 */
  name: string;
  /** 한 줄로 무엇을 하는 기능인가 */
  what: string;
  /** 그 기능이 셀 때 겉으로 드러나는 모습 */
  looks: string;
}

export const FUNCTIONS: Record<FnCode, FnInfo> = {
  Se: { code: 'Se', name: '외향 감각',
    what: '지금 이 자리에서 들어오는 것을 그대로 받는다',
    looks: '몸이 먼저 움직이고, 분위기와 변화를 빨리 알아챈다' },
  Si: { code: 'Si', name: '내향 감각',
    what: '겪어 본 것을 몸에 쌓아 두고 지금과 견준다',
    looks: '늘 하던 방식이 편하고, 달라진 것을 금세 짚어낸다' },
  Ne: { code: 'Ne', name: '외향 직관',
    what: '하나에서 갈래를 친다 — 될 법한 것을 여럿 벌인다',
    looks: '말이 옆으로 새고, 아이디어가 끊이지 않는다' },
  Ni: { code: 'Ni', name: '내향 직관',
    what: '흩어진 것을 하나로 모아 «결국 이렇게 된다»를 본다',
    looks: '설명은 못 해도 결론이 먼저 서 있다' },
  Te: { code: 'Te', name: '외향 사고',
    what: '밖의 일을 굴러가게 짜맞춘다 — 순서·기준·마감',
    looks: '결론부터 말하고, 안 되는 방식을 바로 잘라낸다' },
  Ti: { code: 'Ti', name: '내향 사고',
    what: '제 안의 틀이 맞아떨어지는지 따진다',
    looks: '말의 앞뒤가 안 맞으면 못 넘어가고, 정확한 낱말을 고른다' },
  Fe: { code: 'Fe', name: '외향 감정',
    what: '자리의 공기를 읽고 맞춘다 — 우리가 어떤가',
    looks: '분위기를 챙기고, 남의 기분을 먼저 알아본다' },
  Fi: { code: 'Fi', name: '내향 감정',
    what: '제 안의 «이건 아니다»를 기준으로 삼는다',
    looks: '겉으론 조용해도 안에서 선이 분명하고, 그 선을 넘으면 물러서지 않는다' },
};

/** 자리마다 뜻이 다르다 — 같은 기능도 열등 자리면 다르게 읽는다 */
export const SLOT = [
  { key: 'dom', label: '주기능', hint: '가장 오래, 가장 편하게 쓰는 것. 나라고 느끼는 자리' },
  { key: 'aux', label: '부기능', hint: '주기능을 받치는 것. 어른이 되며 자라는 자리' },
  { key: 'tertiary', label: '3차기능', hint: '늦게 자란다. 잘 쓰면 여유, 못 쓰면 도피처' },
  { key: 'inferior', label: '열등기능', hint: '가장 서툰 것. 지치면 이쪽이 거칠게 튀어나온다' },
] as const;
