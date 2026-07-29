/**
 * 텍스트 정리·변환의 순수 함수 모음.
 *
 * 화면(components/text/*)은 이 함수들을 부르기만 한다. 문자열 규칙은 눈으로
 * 검증하기 어려워서 — 특히 눈에 안 보이는 문자를 다루는 부분은 화면에서
 * 확인이 불가능하다 — 로직을 여기 모으고 테스트로 고정한다.
 */

/* ────────────────────────────────
   붙여넣기 정리
   ──────────────────────────────── */

/**
 * 눈에 보이지 않는데 글자 수에 잡히고 검색·정렬을 망치는 문자들.
 * 웹·PDF·워드에서 복사하면 거의 반드시 섞여 온다.
 */
const INVISIBLE = /[\u200B-\u200D\uFEFF\u2060\u00AD\u180E]/g;
/**
 * 공백처럼 보이지만 일반 공백이 아닌 것들 — 검색·정렬이 어긋나는 원인이다.
 * 코드포인트로 적는다. 진짜 문자를 소스에 넣으면 편집기에서 보이지 않아
 * 나중에 누가 지워도 아무도 눈치채지 못한다.
 */
const ODD_SPACE = /[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g;

export interface CleanOptions {
  invisible?: boolean;
  oddSpace?: boolean;
  collapseSpaces?: boolean;
  trimLines?: boolean;
  blankLines?: boolean;
  joinLines?: boolean;
  smartQuotes?: boolean;
  stripHtml?: boolean;
}

export const DEFAULT_CLEAN: CleanOptions = {
  invisible: true,
  oddSpace: true,
  collapseSpaces: true,
  trimLines: true,
  blankLines: true,
  joinLines: false,
  smartQuotes: false,
  stripHtml: false,
};

export interface CleanResult {
  text: string;
  /** 항목별로 몇 개를 손봤는지 — "뭐가 지워졌는지 모르겠다"를 막는다 */
  counts: Record<string, number>;
}

export function cleanText(input: string, options: CleanOptions = DEFAULT_CLEAN): CleanResult {
  let text = input;
  const counts: Record<string, number> = {};
  const count = (key: string, n: number) => { if (n > 0) counts[key] = (counts[key] ?? 0) + n; };

  if (options.stripHtml) {
    const tags = text.match(/<[^>]+>/g)?.length ?? 0;
    text = text.replace(/<[^>]+>/g, '');
    count('HTML 태그', tags);
  }
  if (options.invisible) {
    const n = text.match(INVISIBLE)?.length ?? 0;
    text = text.replace(INVISIBLE, '');
    count('보이지 않는 문자', n);
  }
  if (options.oddSpace) {
    const n = text.match(ODD_SPACE)?.length ?? 0;
    text = text.replace(ODD_SPACE, ' ');
    count('특수 공백', n);
  }
  if (options.smartQuotes) {
    const n = text.match(/[‘’“”]/g)?.length ?? 0;
    text = text.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
    count('굽은 따옴표', n);
  }
  if (options.joinLines) {
    /*
      문장 중간에서 끊긴 줄만 잇는다. 빈 줄(문단 경계)과 문장이 끝난 줄은
      그대로 둔다 — 전부 이어 붙이면 문단 구분이 사라져 오히려 읽기 어려워진다.
    */
    let joined = 0;
    text = text.replace(/([^\n.!?。！？:;])\n(?!\n)[ \t]*(?=\S)/g, (_m, keep: string) => {
      joined++;
      return `${keep} `;
    });
    count('이어 붙인 줄', joined);
  }
  if (options.collapseSpaces) {
    const n = (text.match(/[ \t]{2,}/g) ?? []).length;
    text = text.replace(/[ \t]{2,}/g, ' ');
    count('중복 공백', n);
  }
  if (options.trimLines) {
    let trimmed = 0;
    text = text
      .split('\n')
      .map(line => {
        const t = line.replace(/^[ \t]+|[ \t]+$/g, '');
        if (t !== line) trimmed++;
        return t;
      })
      .join('\n');
    count('줄 앞뒤 공백', trimmed);
  }
  if (options.blankLines) {
    const n = (text.match(/\n{3,}/g) ?? []).length;
    text = text.replace(/\n{3,}/g, '\n\n');
    count('연속 빈 줄', n);
  }

  return { text: text.trim(), counts };
}

/* ────────────────────────────────
   줄 정리
   ──────────────────────────────── */

export interface DedupeOptions {
  dedupe?: boolean;
  ignoreCase?: boolean;
  ignoreSpace?: boolean;
  removeBlank?: boolean;
  sort?: 'none' | 'asc' | 'desc';
  numbered?: boolean;
}

export interface DedupeResult {
  text: string;
  total: number;
  kept: number;
  removed: number;
}

export function dedupeLines(input: string, options: DedupeOptions = {}): DedupeResult {
  const { dedupe = true, ignoreCase = false, ignoreSpace = true, removeBlank = true, sort = 'none', numbered = false } = options;

  let lines = input.split('\n');
  const total = lines.length;

  if (removeBlank) lines = lines.filter(l => l.trim() !== '');

  if (dedupe) {
    const seen = new Set<string>();
    lines = lines.filter(line => {
      let key = line;
      if (ignoreSpace) key = key.trim().replace(/\s+/g, ' ');
      if (ignoreCase) key = key.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  if (sort !== 'none') {
    // 한국어 정렬은 코드포인트 순이 아니라 localeCompare여야 가나다순이 맞다
    lines = [...lines].sort((a, b) => a.localeCompare(b, 'ko'));
    if (sort === 'desc') lines.reverse();
  }

  if (numbered) lines = lines.map((l, i) => `${i + 1}. ${l}`);

  return { text: lines.join('\n'), total, kept: lines.length, removed: total - lines.length };
}

/* ────────────────────────────────
   대소문자·표기법
   ──────────────────────────────── */

/** 표기법 변환의 공통 전처리 — 구분자를 단어 배열로 만든다 */
function words(text: string): string[] {
  return text
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .split(/[\s_\-.]+/)
    .filter(Boolean);
}

export interface CaseResult {
  upper: string;
  lower: string;
  title: string;
  sentence: string;
  camel: string;
  pascal: string;
  snake: string;
  kebab: string;
  constant: string;
  toggle: string;
}

export function convertCase(text: string): CaseResult {
  const w = words(text);
  const lowerWords = w.map(x => x.toLowerCase());
  const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

  return {
    upper: text.toUpperCase(),
    lower: text.toLowerCase(),
    // 단어마다 첫 글자 — 한글은 대소문자가 없어 그대로 남는다
    title: text.replace(/\b[a-z]/g, m => m.toUpperCase()),
    sentence: text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, m => m.toUpperCase()),
    camel: lowerWords.map((x, i) => (i === 0 ? x : cap(x))).join(''),
    pascal: lowerWords.map(cap).join(''),
    snake: lowerWords.join('_'),
    kebab: lowerWords.join('-'),
    constant: lowerWords.join('_').toUpperCase(),
    toggle: [...text].map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join(''),
  };
}

/* ────────────────────────────────
   찾아 바꾸기
   ──────────────────────────────── */

export interface ReplaceResult {
  text: string;
  count: number;
  error?: string;
}

export function replaceAll(
  input: string,
  find: string,
  to: string,
  { caseSensitive = true, regex = false }: { caseSensitive?: boolean; regex?: boolean } = {},
): ReplaceResult {
  if (!find) return { text: input, count: 0 };

  // 정규식이 아니면 \n·\t만 실제 문자로 풀어준다. 줄바꿈을 찾는 일이 잦다.
  const pattern = regex ? find : escapeRegExp(find).replace(/\\\\n/g, '\n').replace(/\\\\t/g, '\t');

  let re: RegExp;
  try {
    re = new RegExp(pattern, caseSensitive ? 'g' : 'gi');
  } catch (e) {
    return { text: input, count: 0, error: e instanceof Error ? e.message : '정규식이 올바르지 않습니다' };
  }

  const count = (input.match(re) ?? []).length;
  const replacement = regex ? to : to.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
  return { text: input.replace(re, replacement), count };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* ────────────────────────────────
   글자수·원고지
   ──────────────────────────────── */

export interface CountResult {
  chars: number;
  charsNoSpace: number;
  bytes: number;
  words: number;
  lines: number;
  paragraphs: number;
  /** 200자 원고지 매수 */
  sheets200: number;
  /** 400자 원고지 매수 */
  sheets400: number;
}

export function countText(input: string): CountResult {
  const chars = input.length;
  const charsNoSpace = input.replace(/\s/g, '').length;
  const trimmed = input.trim();
  return {
    chars,
    charsNoSpace,
    bytes: new TextEncoder().encode(input).length,
    words: trimmed === '' ? 0 : trimmed.split(/\s+/).length,
    lines: input === '' ? 0 : input.split('\n').length,
    paragraphs: trimmed === '' ? 0 : trimmed.split(/\n\s*\n/).filter(p => p.trim()).length,
    // 원고지는 칸을 세므로 공백도 한 칸을 차지한다
    sheets200: Math.ceil(chars / 200),
    sheets400: Math.ceil(chars / 400),
  };
}
