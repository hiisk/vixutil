/**
 * ASCII 한 자의 값 — 번호 하나에서 계산한다.
 *
 * 이 표가 예쁜 이유는 아무렇게나 늘어놓은 표가 아니어서다. 대문자와 소문자는
 * 정확히 32(비트 하나) 차이고, 숫자는 0x30부터라 아래 네 비트가 곧 그 숫자이며,
 * Ctrl 조합은 글자에서 위쪽 세 비트를 지운 값이다. 그래서 여기서는 그 규칙을
 * 그대로 적고, 표를 베끼지 않는다.
 *
 * 규칙을 적어 두면 검사가 규칙끼리 맞물리는지 볼 수 있다 — Ctrl+I가 왜 탭인지가
 * 계산에서 나오면, 그 계산이 어긋나는 순간 검사가 걸린다.
 */
import { CONTROLS, TABLE_ROWS, controlOf } from './list.ts';

export type Kind = 'control' | 'space' | 'digit' | 'upper' | 'lower' | 'punct';

/** 대문자와 소문자를 가르는 비트 — 32(0x20)이다 */
export const CASE_BIT = 0x20;

/**
 * 이름이 붙은 HTML 엔티티 — ASCII 안에서는 다섯 자뿐이다.
 *
 * 숫자 엔티티(&#38;)는 코드에서 그대로 나오지만 이름에는 규칙이 없다.
 */
const NAMED: Record<number, string> = {
  34: '&quot;', 38: '&amp;', 39: '&apos;', 60: '&lt;', 62: '&gt;',
};

/**
 * 역슬래시 이스케이프 — C와 자바스크립트가 같은 표를 쓴다.
 *
 * \e(27)만 표준 C에는 없고 GCC·셸·정규식에서 쓰인다. 함께 싣되 그 사정을
 * 화면에 적는다.
 */
const ESCAPES: Record<number, string> = {
  0: '\\0', 7: '\\a', 8: '\\b', 9: '\\t', 10: '\\n', 11: '\\v', 12: '\\f',
  13: '\\r', 27: '\\e', 34: '\\"', 39: "\\'", 92: '\\\\',
};

export const kindOf = (code: number): Kind => {
  if (code < 32 || code === 127) return 'control';
  if (code === 32) return 'space';
  if (code >= 48 && code <= 57) return 'digit';
  if (code >= 65 && code <= 90) return 'upper';
  if (code >= 97 && code <= 122) return 'lower';
  return 'punct';
};

export const KINDS: Kind[] = ['control', 'space', 'digit', 'upper', 'lower', 'punct'];

const hex2 = (n: number) => n.toString(16).toUpperCase().padStart(2, '0');

/**
 * 화면에 적는 이름 — 눈에 보이지 않는 글자는 약칭으로 바꾼다.
 *
 * 32(공백)를 그대로 내보내면 제목이 "ASCII 32 — the   character"가 되어
 * 글자가 빠진 것처럼 보인다. 옛 코드표들이 이 칸에 SP라고 적는 이유가 그것이다.
 */
const labelOf = (code: number, char: string): string =>
  controlOf(code)?.abbr ?? (code === 32 ? 'SP' : char);

export interface AsciiFacts {
  code: number;
  /** 화면에 적는 이름 — 제어문자는 약칭, 공백은 SP */
  label: string;
  /** 실제 글자. 제어문자에서는 화면에 내보내지 않는다 */
  char: string;
  kind: Kind;
  printable: boolean;
  hex: string;
  oct: string;
  /** 일곱 자리 — ASCII는 7비트다 */
  bin: string;
  /** &#65; */
  entity: string;
  /** &amp; 같은 이름 — 다섯 자뿐이다 */
  namedEntity?: string;
  /** 주소에 넣을 때 */
  urlEncoded: string;
  /** CSS content: "\41" */
  cssEscape: string;
  /** \n 처럼 짧게 쓰는 꼴 — 있는 것만 */
  escape?: string;
  /** Ctrl 조합 — 제어문자에만 뜻이 있다 */
  ctrl?: string;
  /** 이 글자를 Ctrl과 함께 누르면 나오는 제어문자 — 글자 쪽에서 본 짝 */
  ctrlOf?: number;
  /** 대소문자 짝 */
  pair?: number;
  /** 숫자 글자가 나타내는 값 */
  digitValue?: number;
  /** 표에서의 자리 — 세로 열여섯, 가로 여덟 */
  cell: { row: number; col: number };
}

export function asciiFacts(code: number): AsciiFacts {
  const kind = kindOf(code);
  const char = String.fromCharCode(code);
  const printable = kind !== 'control';

  return {
    code,
    label: labelOf(code, char),
    char,
    kind,
    printable,
    hex: hex2(code),
    oct: code.toString(8).padStart(3, '0'),
    bin: code.toString(2).padStart(7, '0'),
    entity: `&#${code};`,
    namedEntity: NAMED[code],
    urlEncoded: encodeURIComponent(char) === char ? char : encodeURIComponent(char),
    cssEscape: `\\${code.toString(16).toUpperCase()}`,
    escape: ESCAPES[code],
    // Ctrl은 위 세 비트를 지운다. 그래서 ^@가 0이고 ^[가 27이다
    ctrl: code < 32 ? `^${String.fromCharCode(code + 64)}` : code === 127 ? '^?' : undefined,
    ctrlOf: kind === 'upper' || kind === 'lower' ? code & 0x1f : undefined,
    pair: kind === 'upper' ? code + CASE_BIT : kind === 'lower' ? code - CASE_BIT : undefined,
    digitValue: kind === 'digit' ? code - 48 : undefined,
    cell: { row: code % TABLE_ROWS, col: Math.floor(code / TABLE_ROWS) },
  };
}

export const codesOfKind = (kind: Kind): number[] =>
  Array.from({ length: 128 }, (_, i) => i).filter(c => kindOf(c) === kind);

/** 같은 갈래에서 앞뒤로 몇 자 */
export const neighbours = (code: number, span = 3): number[] =>
  Array.from({ length: 128 }, (_, i) => i).filter(c => Math.abs(c - code) <= span && c !== code);

/** 제어문자 갈래별 목록 — 표를 다시 적지 않고 걸러 낸다 */
export const controlsOfGroup = (group: string) => CONTROLS.filter(x => x.group === group);
