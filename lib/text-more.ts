/**
 * 텍스트 도구 여섯 가지의 계산 — 가리기·줄바꿈·세로쓰기·뒤집기·슬러그·표.
 *
 * 화면(components/text/*.tsx)이 아니라 여기 두는 이유는 lib/text-clean.ts와 같다:
 * **검사가 부를 수 있어야 한다.** "010-1234-5678을 가리면 뒷자리만 남는가",
 * "한글 이름 세 글자는 가운데만 가리는가"는 컴포넌트 안에 있으면 확인할 길이 없다.
 *
 * 모든 함수는 순수하다 — 같은 입력에 같은 출력이고 바깥을 건드리지 않는다.
 */

/* ────────────────────────── 개인정보 가리기 ────────────────────────── */

export interface MaskOptions {
  /** 이름 — 가운데 글자를 가린다 */
  name?: boolean;
  /** 전화번호 — 가운데 자리를 가린다 */
  phone?: boolean;
  /** 주민등록번호 — 뒤 여섯 자리를 가린다 */
  rrn?: boolean;
  /** 카드번호 — 가운데 여덟 자리를 가린다 */
  card?: boolean;
  /** 이메일 — 아이디의 뒷부분을 가린다 */
  email?: boolean;
  /** 가리는 데 쓸 글자 */
  char?: string;
}

export const DEFAULT_MASK: MaskOptions = {
  name: true, phone: true, rrn: true, card: true, email: true, char: '*',
};

export interface MaskResult {
  text: string;
  /** 종류별로 몇 개를 가렸는지 — 화면이 "전화번호 3개"처럼 보여준다 */
  counts: { name: number; phone: number; rrn: number; card: number; email: number };
}

/** 한글 이름 두~네 글자 — 앞뒤로 한글이 이어지면 이름이 아니다 */
const RE_NAME = /(?<![가-힣])[가-힣]{2,4}(?![가-힣])/g;
/** 010-1234-5678 · 01012345678 · 02-123-4567 */
const RE_PHONE = /\b(0\d{1,2})[-.\s]?(\d{3,4})[-.\s]?(\d{4})\b/g;
/** 900101-1234567 — 뒤 일곱 자리 중 첫 자리(성별)는 남긴다 */
const RE_RRN = /\b(\d{6})[-\s]?([1-4])(\d{6})\b/g;
/** 1234-5678-9012-3456 */
const RE_CARD = /\b(\d{4})[-.\s]?(\d{4})[-.\s]?(\d{4})[-.\s]?(\d{4})\b/g;
const RE_EMAIL = /\b([\w.+-]+)@([\w-]+(?:\.[\w-]+)+)\b/g;

/** 이름 뒤에 흔히 붙어 이름이 아님을 알려 주는 말 — 가리면 글이 망가진다 */
const NOT_NAME = new Set([
  '안녕하세요', '감사합니다', '고맙습니다', '수고하세요', '드림', '올림', '배상',
  '주식회사', '유한회사', '대표이사', '고객센터', '개인정보', '전화번호', '이메일',
  '주민등록', '카드번호', '계좌번호', '생년월일', '연락처', '보내기', '받는사람',
]);

function keep(s: string, head: number, tail: number, char: string): string {
  const body = s.length - head - tail;
  if (body <= 0) return s;
  return s.slice(0, head) + char.repeat(body) + (tail ? s.slice(-tail) : '');
}

export function maskPersonal(input: string, options: MaskOptions = DEFAULT_MASK): MaskResult {
  const o = { ...DEFAULT_MASK, ...options };
  const c = o.char && o.char.length > 0 ? o.char[0] : '*';
  const counts = { name: 0, phone: 0, rrn: 0, card: 0, email: 0 };
  let text = input;

  /*
   * 순서가 중요하다. 주민등록번호와 카드번호는 둘 다 숫자 덩어리라, 전화번호를
   * 먼저 가리면 "900101-1234567"의 뒷부분을 전화번호로 잘못 잡는다.
   * 자릿수가 긴 것부터 처리해 더 구체적인 규칙이 먼저 이기게 한다.
   */
  if (o.rrn) {
    text = text.replace(RE_RRN, (_, front: string, sex: string, rest: string) => {
      counts.rrn++;
      return `${front}-${sex}${c.repeat(rest.length)}`;
    });
  }
  if (o.card) {
    text = text.replace(RE_CARD, (_, a: string, b: string, d: string, e: string) => {
      counts.card++;
      return `${a}-${c.repeat(4)}-${c.repeat(4)}-${e}`;
    });
  }
  if (o.phone) {
    text = text.replace(RE_PHONE, (_, a: string, b: string, d: string) => {
      counts.phone++;
      return `${a}-${c.repeat(b.length)}-${d}`;
    });
  }
  if (o.email) {
    text = text.replace(RE_EMAIL, (_, id: string, domain: string) => {
      counts.email++;
      // 아이디가 두 글자 이하면 첫 글자만 남긴다 — 전부 가리면 무엇이었는지 모른다
      const head = id.length <= 2 ? 1 : 2;
      return `${keep(id, head, 0, c)}@${domain}`;
    });
  }
  if (o.name) {
    text = text.replace(RE_NAME, m => {
      if (NOT_NAME.has(m)) return m;
      counts.name++;
      // 두 글자는 뒷글자만, 세 글자 이상은 가운데를 가린다
      return m.length === 2 ? m[0] + c : keep(m, 1, 1, c);
    });
  }
  return { text, counts };
}

/* ────────────────────────── 줄바꿈 정리 ────────────────────────── */

export type WrapMode = 'wrap' | 'unwrap';

export interface WrapOptions {
  mode: WrapMode;
  /** 한 줄에 넣을 글자 수 — wrap일 때만 쓴다 */
  width: number;
  /** 낱말 중간에서 자르지 않는다 */
  keepWords: boolean;
}

export interface WrapResult {
  text: string;
  lines: number;
  longest: number;
}

/**
 * 한 줄을 폭에 맞춰 접는다.
 *
 * 한국어는 낱말 사이 공백이 드물어서 `keepWords`를 켜도 접을 자리가 없는 줄이
 * 나온다. 그럴 때는 폭을 넘기는 대신 그냥 자른다 — 안 그러면 한 줄이 통째로
 * 남아 접은 의미가 없어진다.
 */
function wrapLine(line: string, width: number, keepWords: boolean): string[] {
  if (line.length <= width) return [line];
  const out: string[] = [];
  let rest = line;
  while (rest.length > width) {
    let cut = width;
    if (keepWords) {
      const space = rest.lastIndexOf(' ', width);
      if (space > 0) cut = space;
    }
    out.push(rest.slice(0, cut).trimEnd());
    rest = rest.slice(keepWords && rest[cut] === ' ' ? cut + 1 : cut);
  }
  if (rest) out.push(rest);
  return out;
}

export function rewrap(input: string, options: WrapOptions): WrapResult {
  const width = Math.max(1, Math.floor(options.width));
  let lines: string[];
  if (options.mode === 'unwrap') {
    /*
     * 문단은 살리고 문단 안의 줄바꿈만 편다. 빈 줄이 문단의 경계다 —
     * 이게 없으면 글 전체가 한 줄이 되어 되돌릴 수 없다.
     */
    lines = input
      .split(/\n\s*\n/)
      .map(p => p.split('\n').map(s => s.trim()).filter(Boolean).join(' '))
      .filter(Boolean);
  } else {
    lines = input.split('\n').flatMap(l => (l.trim() === '' ? [''] : wrapLine(l, width, options.keepWords)));
  }
  const text = options.mode === 'unwrap' ? lines.join('\n\n') : lines.join('\n');
  return { text, lines: lines.length, longest: lines.reduce((n, l) => Math.max(n, l.length), 0) };
}

/* ────────────────────────── 세로쓰기 ────────────────────────── */

export interface VerticalOptions {
  /** 줄 사이에 넣을 칸 수 — 세로로 읽을 때 붙어 보이지 않게 한다 */
  gap: number;
  /** 오른쪽에서 왼쪽으로 (전통 세로쓰기) */
  rightToLeft: boolean;
}

/**
 * 가로로 쓴 글을 세로로 세운다.
 *
 * 여러 줄이면 줄마다 한 세로줄이 되고, 글자 수가 다르면 짧은 줄의 아랫부분이
 * 빈다. 그 빈자리를 공백으로 채워야 세로 정렬이 어긋나지 않는다.
 */
export function toVertical(input: string, options: VerticalOptions): string {
  const cols = input.split('\n').map(l => [...l]).filter(c => c.length > 0);
  if (cols.length === 0) return '';
  const ordered = options.rightToLeft ? [...cols].reverse() : cols;
  const height = ordered.reduce((n, c) => Math.max(n, c.length), 0);
  const pad = ' '.repeat(Math.max(0, Math.floor(options.gap)));
  const rows: string[] = [];
  for (let y = 0; y < height; y++) {
    rows.push(ordered.map(c => c[y] ?? ' ').join(pad).trimEnd());
  }
  return rows.join('\n');
}

/* ────────────────────────── 뒤집기 ────────────────────────── */

export type ReverseUnit = 'char' | 'word' | 'line';

/**
 * 글자 단위 뒤집기는 `split('')`으로 하면 안 된다 — 이모지와 결합 문자가
 * 쪼개져 깨진다. `[...s]`는 코드포인트 단위라 이모지 하나를 하나로 센다.
 */
export function reverseText(input: string, unit: ReverseUnit): string {
  if (unit === 'line') return input.split('\n').reverse().join('\n');
  return input
    .split('\n')
    .map(line => (unit === 'char' ? [...line].reverse().join('') : line.split(/(\s+)/).reverse().join('')))
    .join('\n');
}

/* ────────────────────────── 슬러그 ────────────────────────── */

/** 한글 자모를 로마자로 — 주소에 쓸 것이라 표기법보다 짧고 헷갈리지 않는 쪽을 골랐다 */
const CHO = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
const JUNG = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];
const JONG = ['', 'k', 'k', 'k', 'n', 'n', 'n', 't', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'm', 'p', 'p', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't'];

export function romanizeForSlug(text: string): string {
  let out = '';
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const n = code - 0xac00;
      out += CHO[Math.floor(n / 588)] + JUNG[Math.floor((n % 588) / 28)] + JONG[n % 28];
    } else {
      out += ch;
    }
  }
  return out;
}

export interface SlugOptions {
  /** 낱말을 잇는 글자 */
  separator: string;
  /** 소문자로 내린다 */
  lower: boolean;
  /** 한글을 로마자로 옮긴다 — 끄면 한글이 그대로 남는다(주소창에서 %가 된다) */
  romanize: boolean;
  /** 최대 길이 — 0이면 자르지 않는다 */
  maxLength: number;
}

export const DEFAULT_SLUG: SlugOptions = { separator: '-', lower: true, romanize: true, maxLength: 0 };

export function toSlug(input: string, options: SlugOptions = DEFAULT_SLUG): string {
  const o = { ...DEFAULT_SLUG, ...options };
  const sep = o.separator === '_' ? '_' : '-';
  let s = o.romanize ? romanizeForSlug(input) : input;
  /*
   * 발음 부호를 떼어 낸다 — café를 cafe로.
   * NFD는 한글도 자모로 쪼갠다("한" → ㅎㅏㄴ). 떼어 낸 뒤 **반드시 NFC로 되돌려야**
   * 로마자 변환을 껐을 때 한글이 자모가 풀린 채로 남지 않는다.
   */
  s = s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
  if (o.lower) s = s.toLowerCase();
  s = s.replace(/[^\p{L}\p{N}]+/gu, sep);
  s = s.replace(new RegExp(`\\${sep}{2,}`, 'g'), sep).replace(new RegExp(`^\\${sep}|\\${sep}$`, 'g'), '');
  if (o.maxLength > 0 && s.length > o.maxLength) {
    s = s.slice(0, o.maxLength);
    // 자른 자리가 낱말 중간이면 그 낱말을 통째로 버린다
    const last = s.lastIndexOf(sep);
    if (last > 0) s = s.slice(0, last);
  }
  return s;
}

/* ────────────────────────── 표 만들기 ────────────────────────── */

export type TableFormat = 'markdown' | 'csv' | 'tsv' | 'html';
export type TableInput = 'auto' | 'tab' | 'comma' | 'space';

export interface TableOptions {
  input: TableInput;
  format: TableFormat;
  /** 첫 줄을 제목 줄로 본다 */
  header: boolean;
  /** 마크다운에서 칸 너비를 맞춰 소스도 표처럼 보이게 한다 */
  align: boolean;
}

export interface TableResult {
  text: string;
  rows: number;
  cols: number;
}

/** 어떤 글자로 나뉘어 있는지 스스로 알아본다 — 줄마다 개수가 고른 쪽이 이긴다 */
export function detectDelimiter(lines: string[]): TableInput {
  const score = (re: RegExp) => {
    const counts = lines.map(l => l.split(re).length);
    if (counts.some(n => n < 2)) return -1;
    const first = counts[0];
    return counts.every(n => n === first) ? first : 0;
  };
  const tab = score(/\t/);
  const comma = score(/,/);
  const space = score(/ {2,}/);
  if (tab > 0) return 'tab';
  if (comma > 0) return 'comma';
  if (space > 0) return 'space';
  return 'tab';
}

const SPLIT: Record<Exclude<TableInput, 'auto'>, RegExp> = {
  tab: /\t/, comma: /\s*,\s*/, space: / {2,}/,
};

/** 마크다운 표에서 칸 구분자로 쓰이는 세로줄은 그대로 두면 표가 깨진다 */
const esc = (s: string) => s.replace(/\|/g, '\\|');

export function makeTable(input: string, options: TableOptions): TableResult {
  const lines = input.split('\n').map(l => l.trimEnd()).filter(l => l.trim() !== '');
  if (lines.length === 0) return { text: '', rows: 0, cols: 0 };

  const kind = options.input === 'auto' ? detectDelimiter(lines) : options.input;
  const grid = lines.map(l => l.split(SPLIT[kind as Exclude<TableInput, 'auto'>]).map(c => c.trim()));
  const cols = grid.reduce((n, r) => Math.max(n, r.length), 0);
  // 줄마다 칸 수가 다르면 짧은 줄을 빈칸으로 채운다 — 안 그러면 표가 어긋난다
  for (const row of grid) while (row.length < cols) row.push('');

  let text: string;
  if (options.format === 'csv' || options.format === 'tsv') {
    const j = options.format === 'tsv' ? '\t' : ',';
    text = grid
      .map(r => r.map(c => (options.format === 'csv' && /[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c)).join(j))
      .join('\n');
  } else if (options.format === 'html') {
    const cell = (c: string, th: boolean) => `    <${th ? 'th' : 'td'}>${c}</${th ? 'th' : 'td'}>`;
    const body = grid.map((r, i) =>
      `  <tr>\n${r.map(c => cell(c, options.header && i === 0)).join('\n')}\n  </tr>`).join('\n');
    text = `<table>\n${body}\n</table>`;
  } else {
    const width = Array.from({ length: cols }, (_, i) =>
      options.align ? grid.reduce((n, r) => Math.max(n, esc(r[i]).length), 3) : 0);
    const pad = (c: string, i: number) => (options.align ? esc(c).padEnd(width[i]) : esc(c));
    const head = options.header ? grid[0] : Array.from({ length: cols }, (_, i) => `열${i + 1}`);
    const rest = options.header ? grid.slice(1) : grid;
    const rule = width.map(w => '-'.repeat(Math.max(3, w)));
    text = [
      `| ${head.map(pad).join(' | ')} |`,
      `| ${rule.join(' | ')} |`,
      ...rest.map(r => `| ${r.map(pad).join(' | ')} |`),
    ].join('\n');
  }
  return { text, rows: grid.length, cols };
}
