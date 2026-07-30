/**
 * 큐브 공식 119가지 — 공식만 적는다.
 *
 * 경우 번호도, 윗면 모양도, 몇 조각이 어디로 가는지도 전부 공식에서 계산한다
 * (facts.ts). 그래서 이 표에 손으로 적히는 것은 수의 나열뿐이고, 한 수라도
 * 틀리면 아래 두 층이 깨지거나 다른 공식과 같은 경우가 되어 검사에서 걸린다.
 *
 * F2L 41가지는 손으로 적지 않았다. 다 맞춘 큐브에서 짝을 꺼내는 순서를 만들어
 * 보고 그 역순을 취한 것이라, 만들어진 방식 자체가 옳음을 보장한다.
 *
 * 공식 표기(R U R')와 경우 이름(OLL 21, T퍼뮤)은 만국 공통이라 옮길 것이 없다.
 */
export type Step = 'f2l' | 'oll' | 'pll';

export interface Alg {
  slug: string;
  step: Step;
  /** 화면에 쓰는 이름 — 옮기지 않는다 */
  label: string;
  alg: string;
}

const f2l = (n: number, alg: string): Alg => ({ slug: `f2l-${n}`, step: 'f2l', label: `F2L ${n}`, alg });
const oll = (n: number, alg: string): Alg => ({ slug: `oll-${n}`, step: 'oll', label: `OLL ${n}`, alg });
const pll = (name: string, alg: string): Alg => ({
  slug: `pll-${name.toLowerCase()}`,
  step: 'pll',
  label: `${name} perm`,
  alg,
});

/**
 * F2L 41가지 — 짝을 슬롯에 넣는 공식.
 *
 * 다 맞춘 큐브에서 "R U R'"이나 "F' U F"로 짝을 꺼내는 순서를 하나부터 셋까지
 * 이어 붙여 나올 수 있는 모양을 모두 만들고, 겹치는 것을 걸러 짧은 것만 남겼다.
 * 41가지가 나온 것은 우연이 아니다 — F2L의 경우가 정확히 41가지다.
 */
export const F2L: Alg[] = [
  f2l(1, "F' U F"),
  f2l(2, "F' U' F"),
  f2l(3, "R U R'"),
  f2l(4, "R U' R'"),
  f2l(5, "F' U F R U R'"),
  f2l(6, "F' U' F R U R'"),
  f2l(7, "F' U2 F R U R'"),
  f2l(8, "F' U2 F R U2 R'"),
  f2l(9, "R U R' F' U' F"),
  f2l(10, "R U' R' F' U' F"),
  f2l(11, "R U2 R' F' U2 F"),
  f2l(12, "F' U F U R U' R'"),
  f2l(13, "F' U F U' F' U' F"),
  f2l(14, "F' U F U2 R U R'"),
  f2l(15, "F' U' F U R U' R'"),
  f2l(16, "F' U' F U' F' U' F"),
  f2l(17, "F' U' F U2 F' U F"),
  f2l(18, "F' U2 F U F' U' F"),
  f2l(19, "F' U2 F U' F' U F"),
  f2l(20, "F' U2 F U' R U R'"),
  f2l(21, "F' U2 F U2 F' U F"),
  f2l(22, "R U R' U' F' U' F"),
  f2l(23, "R U R' U2 R U' R'"),
  f2l(24, "R U' R' U R U R'"),
  f2l(25, "R U' R' U' F' U' F"),
  f2l(26, "R U' R' U' R U R'"),
  f2l(27, "R U' R' U2 F' U' F"),
  f2l(28, "R U' R' U2 R U' R'"),
  f2l(29, "R U2 R' U F' U' F"),
  f2l(30, "R U2 R' U R U R'"),
  f2l(31, "R U2 R' U R U' R'"),
  f2l(32, "R U2 R' U' R U R'"),
  f2l(33, "R U2 R' U2 R U' R'"),
  f2l(34, "R U R' F' U F R U R'"),
  f2l(35, "R U R' F' U2 F R U R'"),
  f2l(36, "F' U F U2 F' U' F R U R'"),
  f2l(37, "R U R' U' F' U' F R U R'"),
  f2l(38, "R U' R' U2 R U R' F' U' F"),
  f2l(39, "F' U F U' R U2 R' U2 R U' R'"),
  f2l(40, "R U' R' U R U2 R' U R U' R'"),
  f2l(41, "R U' R' U' R U R' U2 R U' R'"),
];

/** OLL 57가지 — 윗면을 한 색으로 맞추는 공식 */
export const OLL: Alg[] = [
  oll(1, "R U2 R2 F R F' U2 R' F R F'"),
  oll(2, "F R U R' U' F' f R U R' U' f'"),
  oll(3, "f R U R' U' f' U' F R U R' U' F'"),
  oll(4, "f R U R' U' f' U F R U R' U' F'"),
  oll(5, "r' U2 R U R' U r"),
  oll(6, "r U2 R' U' R U' r'"),
  oll(7, "r U R' U R U2 r'"),
  oll(8, "r' U' R U' R' U2 r"),
  oll(9, "R U R' U' R' F R2 U R' U' F'"),
  oll(10, "R U R' U R' F R F' R U2 R'"),
  oll(11, "r U R' U R' F R F' R U2 r'"),
  oll(12, "M' R' U' R U' R' U2 R U' R r'"),
  oll(13, "F U R U' R2 F' R U R U' R'"),
  oll(14, "R' F R U R' F' R F U' F'"),
  oll(15, "l' U' l L' U' L U l' U l"),
  oll(16, "r U r' R U R' U' r U' r'"),
  oll(17, "R U R' U R' F R F' U2 R' F R F'"),
  oll(18, "R U2 R2 F R F' U2 M' U R U' r'"),
  oll(19, "M U R U R' U' M' R' F R F'"),
  oll(20, "r U R' U' M2 U R U' R' U' M'"),
  oll(21, "R U2 R' U' R U R' U' R U' R'"),
  oll(22, "R U2 R2 U' R2 U' R2 U2 R"),
  oll(23, "R2 D' R U2 R' D R U2 R"),
  oll(24, "r U R' U' r' F R F'"),
  oll(25, "F' r U R' U' r' F R"),
  oll(26, "R U2 R' U' R U' R'"),
  oll(27, "R U R' U R U2 R'"),
  oll(28, "r U R' U' r' R U R U' R'"),
  oll(29, "R U R' U' R U' R' F' U' F R U R'"),
  oll(30, "F R' F R2 U' R' U' R U R' F2"),
  oll(31, "R' U' F U R U' R' F' R"),
  oll(32, "S R U R' U' R' F R f'"),
  oll(33, "R U R' U' R' F R F'"),
  oll(34, "R U R2 U' R' F R U R U' F'"),
  oll(35, "R U2 R2 F R F' R U2 R'"),
  oll(36, "L' U' L U' L' U L U L F' L' F"),
  oll(37, "F R' F' R U R U' R'"),
  oll(38, "R U R' U R U' R' U' R' F R F'"),
  oll(39, "L F' L' U' L U F U' L'"),
  oll(40, "R' F R U R' U' F' U R"),
  oll(41, "R U R' U R U2 R' F R U R' U' F'"),
  oll(42, "R' U' R U' R' U2 R F R U R' U' F'"),
  oll(43, "F' U' L' U L F"),
  oll(44, "F U R U' R' F'"),
  oll(45, "F R U R' U' F'"),
  oll(46, "R' U' R' F R F' U R"),
  oll(47, "R' U' R' F R F' R' F R F' U R"),
  oll(48, "F R U R' U' R U R' U' F'"),
  oll(49, "r U' r2 U r2 U r2 U' r"),
  oll(50, "r' U r2 U' r2 U' r2 U r'"),
  oll(51, "F U R U' R' U R U' R' F'"),
  oll(52, "R U R' U R U' B U' B' R'"),
  oll(53, "l' U2 L U L' U' L U L' U l"),
  oll(54, "r U2 R' U' R U R' U' R U' r'"),
  oll(55, "R U2 R2 U' R U' R' U2 F R F'"),
  oll(56, "r U r' U R U' R' U R U' R' r U' r'"),
  oll(57, "R U R' U' M' U R U' r'"),
];

/** PLL 21가지 — 마지막 층 조각을 제자리로 보내는 공식 */
export const PLL: Alg[] = [
  pll('Aa', "x R' U R' D2 R U' R' D2 R2"),
  pll('Ab', "x R2 D2 R U R' D2 R U' R"),
  pll('E', "x' R U' R' D R U R' D' R U R' D R U' R' D'"),
  pll('F', "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R"),
  pll('Ga', "R2 U R' U R' U' R U' R2 U' D R' U R D'"),
  pll('Gb', "R' U' R U D' R2 U R' U R U' R U' R2 D"),
  pll('Gc', "R2 U' R U' R U R' U R2 U D' R U' R' D"),
  pll('Gd', "R U R' U' D R2 U' R U' R' U R' U R2 D'"),
  pll('H', 'M2 U M2 U2 M2 U M2'),
  pll('Ja', "R' U L' U2 R U' R' U2 R L"),
  pll('Jb', "R U R' F' R U R' U' R' F R2 U' R' U'"),
  pll('Na', "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'"),
  pll('Nb', "R' U R U' R' F' U' F R U R' F R' F' R U' R"),
  pll('Ra', "R U' R' U' R U R D R' U' R D' R' U2 R'"),
  pll('Rb', "R' U2 R U2 R' F R U R' U' R' F' R2 U'"),
  pll('T', "R U R' U' R' F R2 U' R' U' R U R' F'"),
  pll('Ua', "M2 U M U2 M' U M2"),
  pll('Ub', "M2 U' M U2 M' U' M2"),
  pll('V', "R' U R' U' y R' F' R2 U' R' U R' F R F"),
  pll('Y', "F R U' R' U' R U R' F' R U R' U' R' F R F'"),
  pll('Z', "M' U M2 U M2 U M' U2 M2"),
];

export const ALGS: Alg[] = [...F2L, ...OLL, ...PLL];

export const ALG_SLUGS = ALGS.map(a => a.slug);

export const algOf = (slug: string): Alg | undefined => ALGS.find(a => a.slug === slug);

export const algsOfStep = (step: Step): Alg[] => ALGS.filter(a => a.step === step);

export const STEPS: Step[] = ['f2l', 'oll', 'pll'];

/** 목록과 공유 카드가 같은 그림을 쓴다 — 이 이모지가 퍼즐 아이콘으로 그려진다 */
export const CUBE_ICON = '🧩';
