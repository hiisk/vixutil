/**
 * 음 이름과 주파수 — 음악 이론 섹션의 바닥.
 *
 * 음을 0~11의 수(피치 클래스)로 다룬다. 코드도 음계도 음정도 "밑음에서 몇
 * 반음"으로 적히므로, 구성음을 손으로 적을 필요가 없다 — 백 페이지가 계산에서
 * 나온다. 이것이 이 섹션을 여덟 언어로 낼 수 있는 이유이기도 하다.
 *
 * 다만 음 이름은 언어마다 다르다. 독일어는 B를 H로 쓰고 B♭을 B로 쓴다(바흐가
 * BACH를 음으로 적을 수 있던 이유다). 이탈리아·스페인·포르투갈·프랑스는 Do·Ré·Mi
 * 계열을 쓰고, 힌디어에는 사·레·가(사르감)가 있다. 그래서 문자 이름과 계이름을
 * 갈라 두고 언어별로 고른다.
 */
import type { L, Lang } from '../i18n/lang.ts';

/** 0=C … 11=B */
export type Pc = number;

export const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

/** URL에 쓸 이름 — "c-sharp", "e-flat" */
export const slugOf = (name: string): string =>
  name.replace('#', '-sharp').replace('b', '-flat').toLowerCase();

/** 악보와 코드표에 적히는 만국 공통 표기 — Cmaj7의 그 C다 */
export const noteSymbol = (pc: Pc, prefer: 'sharp' | 'flat' = 'sharp'): string =>
  (prefer === 'flat' ? FLAT_NAMES : SHARP_NAMES)[((pc % 12) + 12) % 12];

/**
 * 라틴 계열 음 이름 — 스페인·포르투갈·프랑스는 음을 Do·Re·Mi로 부른다.
 *
 * "C major chord"를 스페인에서는 "acorde de Do mayor"라고 한다. 문자 이름을
 * 그대로 내면 그 나라 사람이 자기 말로 검색하는 이름과 어긋난다.
 */
const LATIN_SHARP: Record<'es' | 'pt' | 'fr', string[]> = {
  es: ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'],
  pt: ['Dó', 'Dó#', 'Ré', 'Ré#', 'Mi', 'Fá', 'Fá#', 'Sol', 'Sol#', 'Lá', 'Lá#', 'Si'],
  fr: ['Do', 'Do#', 'Ré', 'Ré#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'],
};
const LATIN_FLAT: Record<'es' | 'pt' | 'fr', string[]> = {
  es: ['Do', 'Reb', 'Re', 'Mib', 'Mi', 'Fa', 'Solb', 'Sol', 'Lab', 'La', 'Sib', 'Si'],
  pt: ['Dó', 'Réb', 'Ré', 'Mib', 'Mi', 'Fá', 'Solb', 'Sol', 'Láb', 'Lá', 'Sib', 'Si'],
  fr: ['Do', 'Réb', 'Ré', 'Mib', 'Mi', 'Fa', 'Solb', 'Sol', 'Lab', 'La', 'Sib', 'Si'],
};

/**
 * 그 언어에서 부르는 음 이름.
 *
 *  - 독일어: B를 H로, B♭을 B로 쓴다. 바흐가 자기 이름 BACH를 음으로 적을 수
 *    있었던 것이 이 표기 덕이다.
 *  - 스페인·포르투갈·프랑스: Do·Ré·Mi 계열
 *  - 한국·영어·일본·힌디: 문자 이름
 */
export function noteName(pc: Pc, lang: Lang, prefer: 'sharp' | 'flat' = 'sharp'): string {
  const i = ((pc % 12) + 12) % 12;
  if (lang === 'es' || lang === 'pt' || lang === 'fr') {
    return (prefer === 'flat' ? LATIN_FLAT : LATIN_SHARP)[lang][i];
  }
  const raw = noteSymbol(i, prefer);
  if (lang !== 'de') return raw;
  if (raw === 'B') return 'H';
  if (raw === 'Bb') return 'B';
  return raw;
}

/** 이름에서 피치 클래스로 — 데이터 정의에 쓴다 */
export function pcOf(name: string): Pc {
  const i = SHARP_NAMES.indexOf(name);
  if (i >= 0) return i;
  const j = FLAT_NAMES.indexOf(name);
  if (j >= 0) return j;
  return 0;
}

/**
 * 평균율 주파수. A4 = 440Hz를 기준으로 반음마다 2의 12제곱근을 곱한다.
 *
 * 소수 둘째 자리까지 끊는다 — 서버와 브라우저의 마지막 비트가 갈리면 화면이
 * 다시 그려질 때 값이 바뀌어 하이드레이션이 깨진다(노선도에서 이미 겪었다).
 */
export function freq(pc: Pc, octave = 4): number {
  const midi = (octave + 1) * 12 + (((pc % 12) + 12) % 12);
  const hz = 440 * Math.pow(2, (midi - 69) / 12);
  return Math.round(hz * 100) / 100;
}

/** 피아노 건반에서 검은 건반인가 */
export const isBlack = (pc: Pc): boolean => [1, 3, 6, 8, 10].includes(((pc % 12) + 12) % 12);

/**
 * 계이름 — 음계의 자리마다 붙는 이름. 언어권이 셋으로 갈린다.
 *
 *  - 문자 이름을 그대로 쓰는 곳: 영어·독일어(도레미를 계이름으로 안 쓴다)
 *  - Do·Ré·Mi 계열: 스페인·포르투갈·프랑스, 그리고 한국·일본의 도레미
 *  - 사르감: 힌디어의 사·레·가·마·파·다·니
 *  - 중국어는 계이름을 Do·Re·Mi로 적고, 음 이름은 문자 그대로 쓴다. 숫자보(简谱)로
 *    1234567을 쓰기도 하지만 그것은 계이름이 아니라 자리 번호에 가깝다.
 */
export const SOLFEGE: L<string[]> = {
  ko: ['도', '레', '미', '파', '솔', '라', '시'],
  en: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'],
  es: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
  pt: ['Dó', 'Ré', 'Mi', 'Fá', 'Sol', 'Lá', 'Si'],
  ja: ['ド', 'レ', 'ミ', 'ファ', 'ソ', 'ラ', 'シ'],
  de: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
  fr: ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
  hi: ['सा', 'रे', 'ग', 'म', 'प', 'ध', 'नि'],
  zh: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
  tw: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
};

/** 자리 번호(1~7)의 이름 */
export const degreeName = (i: number, lang: Lang): string => SOLFEGE[lang][i % 7];

/**
 * 다섯도권에서의 자리 — 조표 개수로 쓴다.
 * 양수는 올림표, 음수는 내림표의 개수다.
 */
const FIFTHS: Record<number, number> = {
  0: 0, 7: 1, 2: 2, 9: 3, 4: 4, 11: 5, 6: 6, 1: -5, 8: -4, 3: -3, 10: -2, 5: -1,
};

/** 그 장조의 조표 개수 — 올림표는 양수, 내림표는 음수 */
export const keySignature = (pc: Pc): number => FIFTHS[((pc % 12) + 12) % 12] ?? 0;

/** 조표에 내림표를 쓰는 조인가 — 음 이름을 ♭으로 적어야 한다 */
export const prefersFlat = (pc: Pc): 'sharp' | 'flat' =>
  keySignature(pc) < 0 ? 'flat' : 'sharp';
