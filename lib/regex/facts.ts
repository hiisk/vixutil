/**
 * 정규식 한 줄에서 뽑아내는 값들 — 식을 읽어서 계산한다.
 *
 * 잡는 묶음이 몇 개인지, 앞뒤가 묶여 있는지, 보기에서 실제로 무엇이 잡히는지를
 * 적어 두지 않는다. 식을 그대로 돌려 보면 나오는 값들이다.
 */
import { PATTERNS, type Pattern } from './list.ts';

export interface RegexFacts {
  slug: string;
  re: string;
  flags: string;
  /** 잡는 묶음의 수 — (?:...)는 세지 않는다 */
  groups: number;
  /** 이름 붙은 묶음들 */
  names: string[];
  /** ^로 시작하고 $로 끝나는가 — 통째로 맞는지 보는 식인가 */
  anchored: boolean;
  /** 첫 보기에서 실제로 잡히는 부분 */
  sample: string;
  /** 첫 보기에서 묶음별로 잡히는 부분 */
  captured: string[];
  /** 식의 길이 */
  length: number;
}

/** 이스케이프되지 않은 자리인지 — 앞의 역슬래시 개수가 짝수여야 한다 */
const bare = (re: string, i: number): boolean => {
  let n = 0;
  for (let j = i - 1; j >= 0 && re[j] === '\\'; j--) n++;
  return n % 2 === 0;
};

/**
 * 잡는 묶음의 수를 센다.
 *
 * new RegExp(...).exec 결과 길이로도 알 수 있지만, 맞지 않는 식에서는 알 수 없다.
 * 그래서 식을 직접 읽는다 — 이스케이프된 괄호와 (?: (?= (?! (?<= 는 빼고 센다.
 */
export function countGroups(re: string): number {
  let n = 0;
  let inClass = false;
  for (let i = 0; i < re.length; i++) {
    const c = re[i];
    if (!bare(re, i)) continue;
    if (c === '[') inClass = true;
    else if (c === ']') inClass = false;
    else if (c === '(' && !inClass) {
      // (?<name> 은 잡는 묶음이고 (?: (?= (?! (?<= (?<! 는 아니다
      const next = re.slice(i + 1);
      const special = /^\?(?::|=|!|<=|<!)/.test(next);
      if (!special) n++;
    }
  }
  return n;
}

/** 이름 붙은 묶음의 이름들 */
export const groupNames = (re: string): string[] =>
  [...re.matchAll(/\(\?<([A-Za-z_$][\w$]*)>/g)].map(m => m[1]);

export function regexFacts(x: Pattern): RegexFacts {
  const re = new RegExp(x.re, x.flags.replace('g', ''));
  const hit = re.exec(x.ok[0]);
  return {
    slug: x.slug,
    re: x.re,
    flags: x.flags,
    groups: countGroups(x.re),
    names: groupNames(x.re),
    anchored: x.re.startsWith('^') && x.re.endsWith('$'),
    sample: hit ? hit[0] : '',
    captured: hit ? hit.slice(1).map(v => v ?? '') : [],
    length: x.re.length,
  };
}

/** 보기 하나를 이 식으로 돌려 본 결과 */
export interface Trial {
  input: string;
  matched: boolean;
  /** 잡힌 부분들 — g 플래그가 없어도 여러 개를 찾아 보여 준다 */
  hits: string[];
}

export function tryPattern(x: Pattern, input: string): Trial {
  const re = new RegExp(x.re, x.flags.includes('g') ? x.flags : `${x.flags}g`);
  const hits: string[] = [];
  for (const m of input.matchAll(re)) {
    hits.push(m[0]);
    // 빈 문자열이 잡히는 식(경계, 전후 탐색)은 무한히 돌 수 있으므로 끊는다
    if (hits.length >= 20) break;
  }
  return { input, matched: hits.length > 0, hits };
}

/** 같은 갈래에서 이웃한 식들 */
export function siblingPatterns(slug: string, limit = 8): Pattern[] {
  const me = PATTERNS.find(x => x.slug === slug);
  if (!me) return [];
  const same = PATTERNS.filter(x => x.kind === me.kind);
  const i = same.findIndex(x => x.slug === slug);
  const from = Math.max(0, Math.min(i - limit / 2, same.length - limit - 1));
  return same.slice(from, from + limit + 1).filter(x => x.slug !== slug);
}
