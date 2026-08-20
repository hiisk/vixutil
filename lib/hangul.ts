/**
 * 한글 자모 분해·조합과 두벌식 자판 변환.
 *
 * 한글 음절은 유니코드에서 (초성 × 21 × 28) + (중성 × 28) + 종성 + 0xAC00 이라는
 * 규칙적인 자리에 놓여 있다. 그래서 문자 하나를 산술만으로 초성·중성·종성으로
 * 나눌 수 있다 — 표를 뒤질 필요가 없다.
 *
 * 한/영 변환은 이 분해 위에 자판 대응표 하나를 얹은 것이다. "안녕"을 영타로
 * 치면 dkssud가 되는 이유는 ㅇ=d, ㅏ=k, ㄴ=s… 로 키가 정해져 있기 때문이고,
 * 반대 방향은 자모를 다시 음절로 조합해야 해서 상태 기계가 필요하다.
 */

const BASE = 0xac00;
const LAST = 0xd7a3;

export const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
export const JUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
export const JONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

/** 두 자모가 합쳐지는 겹모음 — ㅗ+ㅏ=ㅘ 처럼 */
const COMPOUND_VOWEL: Record<string, string> = {
  'ㅗㅏ': 'ㅘ', 'ㅗㅐ': 'ㅙ', 'ㅗㅣ': 'ㅚ',
  'ㅜㅓ': 'ㅝ', 'ㅜㅔ': 'ㅞ', 'ㅜㅣ': 'ㅟ',
  'ㅡㅣ': 'ㅢ',
};

/** 두 자음이 합쳐지는 겹받침 — ㄹ+ㄱ=ㄺ 처럼 */
const COMPOUND_FINAL: Record<string, string> = {
  'ㄱㅅ': 'ㄳ', 'ㄴㅈ': 'ㄵ', 'ㄴㅎ': 'ㄶ',
  'ㄹㄱ': 'ㄺ', 'ㄹㅁ': 'ㄻ', 'ㄹㅂ': 'ㄼ', 'ㄹㅅ': 'ㄽ', 'ㄹㅌ': 'ㄾ', 'ㄹㅍ': 'ㄿ', 'ㄹㅎ': 'ㅀ',
  'ㅂㅅ': 'ㅄ',
};

/** 겹받침을 다시 둘로 — 뒤 글자가 시작되면 앞은 받침, 뒤는 초성이 된다 */
const SPLIT_FINAL: Record<string, [string, string]> = Object.fromEntries(
  Object.entries(COMPOUND_FINAL).map(([pair, joined]) => [joined, [pair[0], pair[1]] as [string, string]]),
);

/** 겹모음을 다시 둘로 */
const SPLIT_VOWEL: Record<string, [string, string]> = Object.fromEntries(
  Object.entries(COMPOUND_VOWEL).map(([pair, joined]) => [joined, [pair[0], pair[1]] as [string, string]]),
);

export function isSyllable(ch: string): boolean {
  const code = ch.codePointAt(0) ?? 0;
  return code >= BASE && code <= LAST;
}

export interface Parts {
  cho: string;
  jung: string;
  jong: string;
}

/** 완성된 한글 음절 하나를 초성·중성·종성으로 나눈다. */
export function splitSyllable(ch: string): Parts | null {
  if (!isSyllable(ch)) return null;
  const index = (ch.codePointAt(0) ?? 0) - BASE;
  return {
    cho: CHO[Math.floor(index / (21 * 28))],
    jung: JUNG[Math.floor(index / 28) % 21],
    jong: JONG[index % 28],
  };
}

/** 초성·중성(·종성)을 음절 하나로 합친다. 불가능하면 null. */
export function joinSyllable(cho: string, jung: string, jong = ''): string | null {
  const c = CHO.indexOf(cho);
  const v = JUNG.indexOf(jung);
  const t = JONG.indexOf(jong);
  if (c < 0 || v < 0 || t < 0) return null;
  return String.fromCodePoint(BASE + c * 21 * 28 + v * 28 + t);
}

/** 문자열 전체를 자모 배열로 편다. 한글이 아닌 문자는 그대로 남는다. */
/**
 * 앞 낱말의 받침에 맞는 조사를 붙인다 — 을/를, 은/는, 이/가, 와/과.
 *
 * 목록을 이어 붙여 문장을 만들 때 조사가 앞 낱말에 따라 갈린다. 사주 궁합에서
 * 「금·수을 갖고 있습니다」가 나왔는데, 수는 받침이 없으니 «를»이어야 했다.
 * 문장을 짜맞추는 쪽에서 하나를 못 박아 두면 값이 바뀔 때마다 틀린다.
 *
 * 받침 여부는 음절 코드의 나머지로 안다 — (code - 0xAC00) % 28 이 0이면 없다.
 */
const JOSA: Record<string, [string, string]> = {
  /* [받침 있을 때, 없을 때] */
  '을': ['을', '를'], '은': ['은', '는'], '이': ['이', '가'], '와': ['과', '와'],
};

export function josa(word: string, kind: '을' | '은' | '이' | '와'): string {
  const [withJong, without] = JOSA[kind];
  const last = word.at(-1) ?? '';
  if (!isSyllable(last)) return without;   /* 한글이 아니면 판단할 근거가 없다 */
  return (last.charCodeAt(0) - BASE) % 28 !== 0 ? withJong : without;
}

export function toJamo(text: string): string[] {
  const out: string[] = [];
  for (const ch of text) {
    const parts = splitSyllable(ch);
    if (!parts) { out.push(ch); continue; }
    out.push(parts.cho, ...spread(parts.jung, SPLIT_VOWEL));
    if (parts.jong) out.push(...spread(parts.jong, SPLIT_FINAL));
  }
  return out;
}

function spread(jamo: string, table: Record<string, [string, string]>): string[] {
  const pair = table[jamo];
  return pair ? [pair[0], pair[1]] : [jamo];
}

/* ────────────────────────────────
   두벌식 자판
   ──────────────────────────────── */

/** 영문 키 → 자모 (shift 포함) */
export const KEY_TO_JAMO: Record<string, string> = {
  q: 'ㅂ', w: 'ㅈ', e: 'ㄷ', r: 'ㄱ', t: 'ㅅ', y: 'ㅛ', u: 'ㅕ', i: 'ㅑ', o: 'ㅐ', p: 'ㅔ',
  a: 'ㅁ', s: 'ㄴ', d: 'ㅇ', f: 'ㄹ', g: 'ㅎ', h: 'ㅗ', j: 'ㅓ', k: 'ㅏ', l: 'ㅣ',
  z: 'ㅋ', x: 'ㅌ', c: 'ㅊ', v: 'ㅍ', b: 'ㅠ', n: 'ㅜ', m: 'ㅡ',
  Q: 'ㅃ', W: 'ㅉ', E: 'ㄸ', R: 'ㄲ', T: 'ㅆ', O: 'ㅒ', P: 'ㅖ',
  // 나머지 대문자는 소문자와 같은 자모를 낸다
  A: 'ㅁ', S: 'ㄴ', D: 'ㅇ', F: 'ㄹ', G: 'ㅎ', H: 'ㅗ', J: 'ㅓ', K: 'ㅏ', L: 'ㅣ',
  Z: 'ㅋ', X: 'ㅌ', C: 'ㅊ', V: 'ㅍ', B: 'ㅠ', N: 'ㅜ', M: 'ㅡ',
  Y: 'ㅛ', U: 'ㅕ', I: 'ㅑ',
};

/** 자모 → 영문 키. 된소리는 shift 조합이라 대문자로 돌려준다. */
export const JAMO_TO_KEY: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  // 소문자를 먼저 넣어야 대문자 별칭(A→ㅁ 등)이 덮어쓰지 않는다
  for (const key of 'qwertyuiopasdfghjklzxcvbnm') map[KEY_TO_JAMO[key]] = key;
  for (const key of 'QWERTOP') map[KEY_TO_JAMO[key]] = key;
  return map;
})();

/** 한글 → 영타. "안녕" → "dkssud" */
export function koToEn(text: string): string {
  let out = '';
  for (const jamo of toJamo(text)) {
    out += JAMO_TO_KEY[jamo] ?? jamo;
  }
  return out;
}

/**
 * 영타 → 한글. "dkssud" → "안녕"
 *
 * 자모를 하나씩 받아 음절을 쌓는 상태 기계다. 어려운 건 종성 판정이다 —
 * "안" 다음에 ㄴ이 오면 그게 "안"의 받침인지 다음 글자의 초성인지, 그 뒤에
 * 모음이 오는지를 봐야 알 수 있다. 그래서 받침으로 일단 붙였다가 다음이
 * 모음이면 떼어서 넘긴다(도로 내어주기).
 */
export function enToKo(text: string): string {
  let out = '';
  let cho = '', jung = '', jong = '';

  const flush = () => {
    if (!cho && !jung && !jong) return;
    if (cho && jung) {
      out += joinSyllable(cho, jung, jong) ?? cho + jung + jong;
    } else {
      out += cho + jung + jong;
    }
    cho = jung = jong = '';
  };

  for (const ch of text) {
    const jamo = KEY_TO_JAMO[ch];
    if (!jamo) { flush(); out += ch; continue; }

    const isVowel = JUNG.includes(jamo);

    if (isVowel) {
      if (jong) {
        // 받침인 줄 알았던 자음이 사실은 다음 글자의 초성이었다
        const split = SPLIT_FINAL[jong];
        const moved = split ? split[1] : jong;
        jong = split ? split[0] : '';
        flush();
        cho = moved;
        jung = jamo;
        continue;
      }
      if (jung) {
        const merged = COMPOUND_VOWEL[jung + jamo];
        if (merged) { jung = merged; continue; }
        flush();
        jung = jamo;
        continue;
      }
      jung = jamo;
      continue;
    }

    // 자음
    if (!cho && !jung) { cho = jamo; continue; }
    if (cho && !jung) { flush(); cho = jamo; continue; }
    if (!jong) {
      if (JONG.includes(jamo)) { jong = jamo; continue; }
      flush();
      cho = jamo;
      continue;
    }
    const merged = COMPOUND_FINAL[jong + jamo];
    if (merged) { jong = merged; continue; }
    flush();
    cho = jamo;
  }

  flush();
  return out;
}

/**
 * 어느 방향으로 잘못 쳤는지 짐작한다.
 *
 * 한글이 한 글자라도 있으면 "한글로 쳐야 할 걸 한글로 쳤다"가 아니라 "영문을
 * 한글 자판으로 친 결과"일 가능성이 높다 — 그 반대도 마찬가지다. 글자 수로 센다.
 */
export function guessDirection(text: string): 'ko-to-en' | 'en-to-ko' {
  let hangul = 0;
  let latin = 0;
  for (const ch of text) {
    if (isSyllable(ch) || CHO.includes(ch) || JUNG.includes(ch)) hangul++;
    else if (/[a-zA-Z]/.test(ch)) latin++;
  }
  return hangul >= latin ? 'ko-to-en' : 'en-to-ko';
}

/** 초성만 뽑는다. "안녕하세요" → "ㅇㄴㅎㅅㅇ" */
export function initials(text: string, keepOther = true): string {
  let out = '';
  for (const ch of text) {
    const parts = splitSyllable(ch);
    if (parts) out += parts.cho;
    else if (keepOther) out += ch;
  }
  return out;
}
