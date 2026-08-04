/**
 * 부호 116가지 — 글자 쉰둘과 점자 셀 예순넷.
 *
 * 두 갈래를 한 섹션에 둔 것은 묻는 것이 다르기 때문이다. 글자 쪽은 "A를 모스로
 * 어떻게 치나"이고, 셀 쪽은 "이 점 배열은 무엇인가"다. 서로 답이 겹치지 않는다.
 *
 * ── 적는 것과 계산하는 것 ───────────────────────────────
 * 모스 부호와 NATO 낱말, 점자의 점 번호는 규칙이 없어 적는다. 대신 점자 셀
 * 예순넷은 6비트에서 만들어 내고(점 여섯 자리의 켜짐/꺼짐), 유니코드 글자도
 * ⠀(U+2800)에서 그 값을 더해 얻는다. 부호의 길이·단위 시간도 계산이다.
 *
 * 모스와 NATO와 점자는 만국 공통이라 옮길 것이 없다 — 어느 나라에서도 A는
 * ·−이고 Alfa이며 점 1이다.
 */
export type CodeKind = 'letter' | 'digit' | 'punct';

export interface Char {
  /** 글자 하나 */
  char: string;
  /** 주소에 쓰는 이름 — 기호는 글자를 주소에 넣을 수 없어 이름을 둔다 */
  name: string;
  kind: CodeKind;
  /** 모스 부호 — 점과 선 */
  morse: string;
  /** NATO 음성 문자. 기호에는 없다 */
  nato?: string;
  /** 점자의 점 번호 — 125는 1·2·5번 점 */
  dots?: string;
}

const c = (char: string, name: string, kind: CodeKind, morse: string, extra: { nato?: string; dots?: string } = {}): Char =>
  ({ char, name, kind, morse, ...extra });

export const CHARS: Char[] = [
  c('A', 'a', 'letter', '·−', { nato: 'Alfa', dots: '1' }),
  c('B', 'b', 'letter', '−···', { nato: 'Bravo', dots: '12' }),
  c('C', 'c', 'letter', '−·−·', { nato: 'Charlie', dots: '14' }),
  c('D', 'd', 'letter', '−··', { nato: 'Delta', dots: '145' }),
  c('E', 'e', 'letter', '·', { nato: 'Echo', dots: '15' }),
  c('F', 'f', 'letter', '··−·', { nato: 'Foxtrot', dots: '124' }),
  c('G', 'g', 'letter', '−−·', { nato: 'Golf', dots: '1245' }),
  c('H', 'h', 'letter', '····', { nato: 'Hotel', dots: '125' }),
  c('I', 'i', 'letter', '··', { nato: 'India', dots: '24' }),
  c('J', 'j', 'letter', '·−−−', { nato: 'Juliett', dots: '245' }),
  c('K', 'k', 'letter', '−·−', { nato: 'Kilo', dots: '13' }),
  c('L', 'l', 'letter', '·−··', { nato: 'Lima', dots: '123' }),
  c('M', 'm', 'letter', '−−', { nato: 'Mike', dots: '134' }),
  c('N', 'n', 'letter', '−·', { nato: 'November', dots: '1345' }),
  c('O', 'o', 'letter', '−−−', { nato: 'Oscar', dots: '135' }),
  c('P', 'p', 'letter', '·−−·', { nato: 'Papa', dots: '1234' }),
  c('Q', 'q', 'letter', '−−·−', { nato: 'Quebec', dots: '12345' }),
  c('R', 'r', 'letter', '·−·', { nato: 'Romeo', dots: '1235' }),
  c('S', 's', 'letter', '···', { nato: 'Sierra', dots: '234' }),
  c('T', 't', 'letter', '−', { nato: 'Tango', dots: '2345' }),
  c('U', 'u', 'letter', '··−', { nato: 'Uniform', dots: '136' }),
  c('V', 'v', 'letter', '···−', { nato: 'Victor', dots: '1236' }),
  c('W', 'w', 'letter', '·−−', { nato: 'Whiskey', dots: '2456' }),
  c('X', 'x', 'letter', '−··−', { nato: 'X-ray', dots: '1346' }),
  c('Y', 'y', 'letter', '−·−−', { nato: 'Yankee', dots: '13456' }),
  c('Z', 'z', 'letter', '−−··', { nato: 'Zulu', dots: '1356' }),

  // 숫자의 점자는 a~j에 숫자표(⠼)를 앞세운 것이라 점 번호가 글자와 같다
  c('0', '0', 'digit', '−−−−−', { nato: 'Zero', dots: '245' }),
  c('1', '1', 'digit', '·−−−−', { nato: 'One', dots: '1' }),
  c('2', '2', 'digit', '··−−−', { nato: 'Two', dots: '12' }),
  c('3', '3', 'digit', '···−−', { nato: 'Three', dots: '14' }),
  c('4', '4', 'digit', '····−', { nato: 'Four', dots: '145' }),
  c('5', '5', 'digit', '·····', { nato: 'Five', dots: '15' }),
  c('6', '6', 'digit', '−····', { nato: 'Six', dots: '124' }),
  c('7', '7', 'digit', '−−···', { nato: 'Seven', dots: '1245' }),
  c('8', '8', 'digit', '−−−··', { nato: 'Eight', dots: '125' }),
  c('9', '9', 'digit', '−−−−·', { nato: 'Nine', dots: '24' }),

  c('.', 'period', 'punct', '·−·−·−', { dots: '256' }),
  c(',', 'comma', 'punct', '−−··−−', { dots: '2' }),
  c('?', 'question', 'punct', '··−−··', { dots: '236' }),
  c("'", 'apostrophe', 'punct', '·−−−−·', { dots: '3' }),
  c('!', 'exclamation', 'punct', '−·−·−−', { dots: '235' }),
  c('/', 'slash', 'punct', '−··−·'),
  c('(', 'paren-open', 'punct', '−·−−·', { dots: '2356' }),
  c(')', 'paren-close', 'punct', '−·−−·−', { dots: '2356' }),
  c('&', 'ampersand', 'punct', '·−···'),
  c(':', 'colon', 'punct', '−−−···', { dots: '25' }),
  c(';', 'semicolon', 'punct', '−·−·−·', { dots: '23' }),
  c('=', 'equals', 'punct', '−···−'),
  c('+', 'plus', 'punct', '·−·−·'),
  c('-', 'hyphen', 'punct', '−····−', { dots: '36' }),
  c('"', 'quote', 'punct', '·−··−·', { dots: '2356' }),
  c('@', 'at', 'punct', '·−−·−·'),
];

/** 점자 셀은 여섯 점의 켜짐/꺼짐이라 예순네 가지다 */
export const CELL_COUNT = 64;

export const CELLS: number[] = Array.from({ length: CELL_COUNT }, (_, i) => i);

export const charSlug = (x: Char): string => `char-${x.name}`;

/** 셀 주소는 점 번호를 그대로 — 빈 셀은 0이다 */
export const cellSlug = (mask: number): string => `cell-${dotsOf(mask) || '0'}`;

/** 6비트를 점 번호로 — 1번 점이 가장 낮은 비트다 */
export function dotsOf(mask: number): string {
  return [1, 2, 3, 4, 5, 6].filter(d => (mask >> (d - 1)) & 1).join('');
}

/** 점 번호를 다시 6비트로 — 검사가 되돌아올 때 쓴다 */
export const maskOfDots = (dots: string): number =>
  [...dots].reduce((m, d) => m | (1 << (Number(d) - 1)), 0);

export const CODE_SLUGS = [...CHARS.map(charSlug), ...CELLS.map(cellSlug)];

export const charOf = (slug: string): Char | undefined => CHARS.find(x => charSlug(x) === slug);

export const cellOf = (slug: string): number | undefined => CELLS.find(m => cellSlug(m) === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const CODE_ICON = '📶';
