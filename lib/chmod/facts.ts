/**
 * 권한 모드 한 가지의 값 — 세 자리 숫자에서 계산한다.
 *
 * 4는 읽기, 2는 쓰기, 1은 실행이고 더해서 한 자리에 담는다. 그래서 7은 4+2+1,
 * 5는 4+1이다. 이 규칙 하나면 rwx 표기도, ls -l이 보여 주는 줄도, 그 모드를
 * 만들어 내는 umask도 나온다.
 *
 * 파일과 디렉터리에서 실행 비트의 뜻이 다르다는 것만은 계산으로 알 수 없어
 * 화면 문구가 맡는다 — 파일에서는 "실행", 디렉터리에서는 "안으로 들어가기"다.
 */
import { MODES } from './list.ts';

export const READ = 4;
export const WRITE = 2;
export const EXEC = 1;

export type Who = 'user' | 'group' | 'other';

export const WHOS: Who[] = ['user', 'group', 'other'];

export interface Perm {
  read: boolean;
  write: boolean;
  exec: boolean;
  /** 이 자리의 8진수 값 */
  digit: number;
  /** rwx · r-x 처럼 세 칸 */
  rwx: string;
}

const permOf = (digit: number): Perm => ({
  read: (digit & READ) !== 0,
  write: (digit & WRITE) !== 0,
  exec: (digit & EXEC) !== 0,
  digit,
  rwx: `${digit & READ ? 'r' : '-'}${digit & WRITE ? 'w' : '-'}${digit & EXEC ? 'x' : '-'}`,
});

export interface ChmodFacts {
  mode: string;
  digits: [number, number, number];
  perm: Record<Who, Perm>;
  /** rwxr-xr-x — 아홉 칸 */
  symbolic: string;
  /** ls -l 첫 칸 그대로. 파일과 디렉터리가 첫 글자만 다르다 */
  lsFile: string;
  lsDir: string;
  /** chmod u=rwx,g=rx,o=rx 꼴 */
  assign: string;
  /** 아홉 비트 */
  bin: string;
  decimal: number;
  /** 이 모드로 디렉터리가 만들어지게 하려면 umask를 얼마로 둬야 하는가 */
  umaskDir: string;
  /** 파일은 666에서 깎으므로 실행 비트가 있으면 umask만으로는 낼 수 없다 */
  umaskFile?: string;
  /** 남이 고칠 수 있는가 — 이 한 가지는 크게 알려야 한다 */
  worldWritable: boolean;
  /** 소유자 말고는 아무 권한도 없는가 */
  ownerOnly: boolean;
}

export function chmodFacts(mode: string): ChmodFacts {
  const digits = mode.split('').map(Number) as [number, number, number];
  const [u, g, o] = digits;
  const perm: Record<Who, Perm> = { user: permOf(u), group: permOf(g), other: permOf(o) };
  const symbolic = `${perm.user.rwx}${perm.group.rwx}${perm.other.rwx}`;

  const part = (who: 'u' | 'g' | 'o', p: Perm) =>
    `${who}=${[p.read && 'r', p.write && 'w', p.exec && 'x'].filter(Boolean).join('')}`;

  return {
    mode,
    digits,
    perm,
    symbolic,
    lsFile: `-${symbolic}`,
    lsDir: `d${symbolic}`,
    assign: [part('u', perm.user), part('g', perm.group), part('o', perm.other)].join(','),
    bin: digits.map(d => d.toString(2).padStart(3, '0')).join(''),
    decimal: u * 64 + g * 8 + o,
    // umask는 "깎아 내는 값"이다. 디렉터리는 777에서, 파일은 666에서 깎는다
    umaskDir: digits.map(d => 7 - d).join(''),
    // 실행 비트는 666에 없으므로 파일에서는 umask로 만들어 낼 수 없다
    umaskFile: digits.every(d => (d & EXEC) === 0) ? digits.map(d => 6 - d).join('') : undefined,
    worldWritable: perm.other.write,
    ownerOnly: g === 0 && o === 0,
  };
}

/** 소유자 자리의 값으로 묶는다 — 다섯 무리가 스물다섯씩이다 */
export const modesOfOwner = (digit: number): string[] => MODES.filter(m => Number(m[0]) === digit);

/** 한 자리만 다른 모드들 — 옆칸으로 걸어가 볼 수 있게 */
export const neighbours = (mode: string): string[] =>
  MODES.filter(m => m !== mode && m.split('').filter((c, i) => c !== mode[i]).length === 1);
