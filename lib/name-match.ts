/**
 * 이름 궁합 — 한글 이름의 획수를 번갈아 늘어놓고 이웃끼리 더해 나가며
 * 두 자리가 남을 때까지 줄이는, 학창시절에 공책 귀퉁이에서 하던 그 방식이다.
 *
 * 획수 기준이 사이트마다 다르다는 점은 짚어둘 필요가 있다. ㄱ을 1획으로 세는
 * 표도 있고 2획으로 세는 표도 있어서, 같은 이름이라도 어디서 계산하느냐에 따라
 * 숫자가 달라진다. 여기서는 아래 표를 쓰고, 페이지에서도 그 사실을 밝힌다.
 * 어느 표가 "맞다"고 주장할 근거는 없다.
 */

const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

/** 겹받침은 낱자 획수의 합으로 센다 */
const COMPOUND: Record<string, string[]> = {
  'ㄳ': ['ㄱ','ㅅ'], 'ㄵ': ['ㄴ','ㅈ'], 'ㄶ': ['ㄴ','ㅎ'],
  'ㄺ': ['ㄹ','ㄱ'], 'ㄻ': ['ㄹ','ㅁ'], 'ㄼ': ['ㄹ','ㅂ'],
  'ㄽ': ['ㄹ','ㅅ'], 'ㄾ': ['ㄹ','ㅌ'], 'ㄿ': ['ㄹ','ㅍ'], 'ㅀ': ['ㄹ','ㅎ'],
  'ㅄ': ['ㅂ','ㅅ'],
};

const STROKES: Record<string, number> = {
  // 자음
  'ㄱ': 2, 'ㄲ': 4, 'ㄴ': 2, 'ㄷ': 3, 'ㄸ': 6, 'ㄹ': 5, 'ㅁ': 4,
  'ㅂ': 4, 'ㅃ': 8, 'ㅅ': 2, 'ㅆ': 4, 'ㅇ': 1, 'ㅈ': 3, 'ㅉ': 6,
  'ㅊ': 4, 'ㅋ': 3, 'ㅌ': 4, 'ㅍ': 4, 'ㅎ': 3,
  // 모음
  'ㅏ': 2, 'ㅐ': 3, 'ㅑ': 3, 'ㅒ': 4, 'ㅓ': 2, 'ㅔ': 3, 'ㅕ': 3,
  'ㅖ': 4, 'ㅗ': 2, 'ㅘ': 4, 'ㅙ': 5, 'ㅚ': 3, 'ㅛ': 3, 'ㅜ': 2,
  'ㅝ': 4, 'ㅞ': 5, 'ㅟ': 3, 'ㅠ': 3, 'ㅡ': 1, 'ㅢ': 2, 'ㅣ': 1,
};

function jamoStrokes(jamo: string): number {
  if (COMPOUND[jamo]) return COMPOUND[jamo].reduce((s, j) => s + STROKES[j], 0);
  return STROKES[jamo] ?? 0;
}

const HANGUL_START = 0xac00;
const HANGUL_END = 0xd7a3;

export function isHangulSyllable(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return code >= HANGUL_START && code <= HANGUL_END;
}

/** 한 글자의 획수 — 초성·중성·종성 획수의 합 */
export function charStrokes(ch: string): number {
  if (!isHangulSyllable(ch)) return 0;
  const code = ch.charCodeAt(0) - HANGUL_START;
  const cho = CHO[Math.floor(code / 588)];
  const jung = JUNG[Math.floor((code % 588) / 28)];
  const jong = JONG[code % 28];
  return jamoStrokes(cho) + jamoStrokes(jung) + (jong ? jamoStrokes(jong) : 0);
}

/** 공백·기호를 걷어내고 한글 음절만 남긴다 */
export function normalizeName(name: string): string {
  return [...name].filter(isHangulSyllable).join('');
}

/**
 * 두 이름을 한 글자씩 번갈아 배치한다. 길이가 다르면 짧은 쪽이 먼저 소진되고
 * 남은 글자가 뒤에 붙는다 — 세 글자와 두 글자 이름을 섞는 흔한 경우다.
 */
export function interleave(a: string, b: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (i < a.length) out.push(a[i]);
    if (i < b.length) out.push(b[i]);
  }
  return out;
}

export interface MatchResult {
  score: number;
  nameA: string;
  nameB: string;
  /** 줄여나간 각 단계 — 화면에 삼각형으로 그린다 */
  steps: number[][];
}

/**
 * 이웃한 두 수를 더해 10으로 나눈 나머지를 다음 줄에 적는 과정을
 * 두 자리가 남을 때까지 반복한다. 그 두 자리가 그대로 퍼센트가 된다.
 */
export function reduceStrokes(strokes: number[]): number[][] {
  const steps: number[][] = [strokes];
  let cur = strokes;
  while (cur.length > 2) {
    const next: number[] = [];
    for (let i = 0; i < cur.length - 1; i++) next.push((cur[i] + cur[i + 1]) % 10);
    steps.push(next);
    cur = next;
  }
  return steps;
}

/** 이름 두 개로 궁합 점수(0~99)를 낸다. 한글 음절이 각각 한 자 이상 있어야 한다. */
export function matchNames(rawA: string, rawB: string): MatchResult | null {
  const a = normalizeName(rawA);
  const b = normalizeName(rawB);
  if (!a || !b) return null;

  const strokes = interleave(a, b).map(charStrokes);
  // 두 글자뿐이면 줄일 것이 없으니 그대로 두 자리가 된다.
  const steps = reduceStrokes(strokes);
  const [tens, ones] = steps[steps.length - 1];

  return { score: tens * 10 + ones, nameA: a, nameB: b, steps };
}

export interface Verdict {
  min: number;
  label: string;
  emoji: string;
  comment: string;
}

export const VERDICTS: Verdict[] = [
  {
    min: 90, label: '천생연분', emoji: '💞',
    comment: '숫자만 보면 더 바랄 게 없는 결과입니다. 다만 이 점수가 높아서 잘 맞는 게 아니라, 잘 맞는 사이라서 이런 결과도 재미있게 보이는 것입니다.',
  },
  {
    min: 75, label: '아주 좋은 궁합', emoji: '💕',
    comment: '서로 편하게 지낼 수 있는 조합으로 나왔습니다. 실제로 편한지는 같이 보낸 시간이 이미 알려주고 있을 겁니다.',
  },
  {
    min: 60, label: '무난한 궁합', emoji: '😊',
    comment: '나쁘지 않은 점수입니다. 대부분의 관계가 이 언저리에 모이는데, 그만큼 이 숫자로 갈리는 건 거의 없다는 뜻이기도 합니다.',
  },
  {
    min: 40, label: '노력이 필요한 궁합', emoji: '🙂',
    comment: '점수는 중간쯤입니다. 이름 획수가 관계에 대해 알려줄 수 있는 건 사실 아무것도 없으니, 낮게 나왔다고 마음 쓸 일은 아닙니다.',
  },
  {
    min: 20, label: '조금 아쉬운 궁합', emoji: '😅',
    comment: '숫자가 낮게 나왔습니다. 이름은 대부분 태어나기 전에 정해진 것이고 관계는 그 뒤에 만들어가는 것이니, 결과를 진지하게 받아들이지 마세요.',
  },
  {
    min: 0, label: '숫자는 낮지만', emoji: '🍀',
    comment: '가장 낮은 구간이 나왔습니다. 이 계산은 획수를 더하고 나머지를 취하는 산수일 뿐이라 관계의 좋고 나쁨과는 무관합니다. 웃고 넘기는 용도입니다.',
  },
];

export function verdictFor(score: number): Verdict {
  return VERDICTS.find(v => score >= v.min)!;
}
