/**
 * 음악 이론 페이지 목록 — 표에서 만들어 낸다.
 *
 * 코드 96개(12 밑음 × 8 성질), 음계 27개, 음정 12개 = 135장. 하나하나 적지
 * 않는다. 구성음도 이름도 계산에서 나오므로 성질 하나를 더하면 12장이 같이
 * 생기고, 여덟 언어가 함께 따라온다.
 *
 * 이름의 어순은 언어마다 다르다. 영어는 "C major chord", 독일어는
 * "C-Dur-Akkord", 스페인어는 "Acorde de Do mayor"다. 한 틀로 찍으면 그 나라
 * 사람이 자기 말로 검색하는 이름과 어긋나므로 언어마다 조립 규칙을 둔다.
 */
import type { L8, Lang8 } from '../i18n/lang8.ts';
import { CHORD_QUALITIES, INTERVALS, SCALE_MODES } from './theory.ts';
import { noteName, noteSymbol, prefersFlat, slugOf, type Pc } from './notes.ts';

export type MusicKind = 'chord' | 'scale' | 'interval';

export interface MusicItem {
  slug: string;
  kind: MusicKind;
  /** 밑음. 음정은 C를 기준으로 보여 준다 */
  root: Pc;
  /** 성질·선법·음정의 id */
  id: string;
}

const ROOTS: Pc[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

/**
 * 그 항목의 조표를 정하는 장조 — 밑음에서 몇 반음 위인가.
 *
 * 단조 계열의 조표를 밑음의 장조로 계산하면 틀린다. D단음계는 D E F G A B♭ C인데
 * D장조(올림표 둘)를 보면 A♯이 나온다 — 나란한조인 F장조(내림표 하나)를 봐야
 * 한다. 선법도 마찬가지로 자기 나란한조가 따로 있다.
 */
const RELATIVE_MAJOR: Record<string, number> = {
  minor: 3, min7: 3, dim: 3, dorian: 10, mixolydian: 5,
};

/**
 * 마이너 계열에서 밑음을 ♯로 적을지 ♭으로 적을지.
 *
 * 나란한조를 따르면 대개 맞는다 — C♯단조(올림표 넷)와 E♭단조가 그렇게 갈린다.
 * 다만 E♭단조는 나란한조가 올림표 여섯인 G♭/F♯장조라 규칙만으로는 D♯단조가
 * 되는데, 악보에서 쓰는 이름은 E♭단조다.
 */
const MINOR_FLAT_ROOTS = [3];

/** 이 항목을 ♯로 적을지 ♭으로 적을지 — 나란한조의 조표를 따른다 */
export function accidentalOf(item: MusicItem): 'sharp' | 'flat' {
  if (item.kind === 'interval') return 'sharp';
  const shift = RELATIVE_MAJOR[item.id];
  if (shift === undefined) return prefersFlat(item.root);
  if (MINOR_FLAT_ROOTS.includes(item.root)) return 'flat';
  return prefersFlat((item.root + shift) % 12);
}

/** URL에 쓸 밑음 — 화면에 적히는 이름과 같아야 한다 */
const rootSlug = (item: { root: Pc; kind: MusicKind; id: string }): string =>
  slugOf(noteSymbol(item.root, accidentalOf(item as MusicItem)));

export const MUSIC_ITEMS: MusicItem[] = [
  ...ROOTS.flatMap(root =>
    CHORD_QUALITIES.map(q => ({
      slug: `${rootSlug({ root, kind: 'chord', id: q.id })}-${q.id}-chord`,
      kind: 'chord' as const,
      root,
      id: q.id,
    })),
  ),
  ...SCALE_MODES.flatMap(m =>
    (m.everyRoot ? ROOTS : [0]).map(root => ({
      slug: `${rootSlug({ root, kind: 'scale', id: m.id })}-${m.id}-scale`,
      kind: 'scale' as const,
      root,
      id: m.id,
    })),
  ),
  ...INTERVALS.map(iv => ({ slug: iv.slug, kind: 'interval' as const, root: 0, id: iv.slug })),
];

export const MUSIC_SLUGS = MUSIC_ITEMS.map(i => i.slug);

export const musicItem = (slug: string): MusicItem | undefined =>
  MUSIC_ITEMS.find(i => i.slug === slug);

export const chordQuality = (id: string) => CHORD_QUALITIES.find(q => q.id === id);
export const scaleMode = (id: string) => SCALE_MODES.find(m => m.id === id);
export const intervalDef = (slug: string) => INTERVALS.find(i => i.slug === slug);

/** 그 항목의 반음 간격 — 코드·음계는 밑음에서, 음정은 두 음의 거리다 */
export function stepsOf(item: MusicItem): number[] {
  if (item.kind === 'chord') return chordQuality(item.id)?.steps ?? [0];
  if (item.kind === 'scale') return scaleMode(item.id)?.steps ?? [0];
  const semis = intervalDef(item.id)?.semitones ?? 0;
  return [0, semis];
}

/** 실제로 울리는 음들 */
export const notesOf = (item: MusicItem): Pc[] =>
  stepsOf(item).map(s => (item.root + s) % 12);

/** 코드표에 적히는 만국 공통 기호 — Cmaj7, F#m7 */
export function symbolOf(item: MusicItem): string {
  const root = noteSymbol(item.root, accidentalOf(item));
  if (item.kind === 'chord') return `${root}${chordQuality(item.id)?.suffix ?? ''}`;
  if (item.kind === 'scale') return root;
  return `+${intervalDef(item.id)?.semitones ?? 0}`;
}

/** "코드"·"음계"·"음정" — 언어마다 */
export const KIND_WORD: L8<Record<MusicKind, string>> = {
  ko: { chord: '코드', scale: '음계', interval: '음정' },
  en: { chord: 'chord', scale: 'scale', interval: 'interval' },
  es: { chord: 'acorde', scale: 'escala', interval: 'intervalo' },
  pt: { chord: 'acorde', scale: 'escala', interval: 'intervalo' },
  ja: { chord: 'コード', scale: 'スケール', interval: '音程' },
  de: { chord: 'Akkord', scale: 'Tonleiter', interval: 'Intervall' },
  fr: { chord: 'accord', scale: 'gamme', interval: 'intervalle' },
  hi: { chord: 'कॉर्ड', scale: 'स्केल', interval: 'अंतराल' },
};

/**
 * 코드 이름 조립 — 어순이 언어마다 다르다.
 * 라틴 계열은 "종류 + de + 음 + 성질", 독일어는 붙임표로 잇는다.
 */
const CHORD_TITLE: L8<(root: string, quality: string) => string> = {
  ko: (r, q) => `${r} ${q} 코드`,
  en: (r, q) => `${r} ${q} chord`,
  es: (r, q) => `Acorde de ${r} ${q}`,
  pt: (r, q) => `Acorde de ${r} ${q}`,
  ja: (r, q) => `${r}${q}コード`,
  // Mollseptakkord처럼 이미 Akkord가 든 이름에 또 붙이면 "Akkord-Akkord"가 된다.
  // 합성어 안에서는 소문자로 붙으므로 대소문자를 가리지 않고 본다.
  de: (r, q) => (/akkord$/i.test(q) ? `${q} auf ${r}` : `${r}-${q}-Akkord`),
  fr: (r, q) => `Accord de ${r} ${q}`,
  hi: (r, q) => `${r} ${q} कॉर्ड`,
};

/** 음계 이름 — 선법 이름에 이미 "음계"가 들어 있어 종류 말을 덧붙이지 않는다 */
const SCALE_TITLE: L8<(root: string, mode: string) => string> = {
  ko: (r, m) => `${r} ${m}`,
  en: (r, m) => `${r} ${m}`,
  es: (r, m) => `${m} de ${r}`,
  pt: (r, m) => `${m} de ${r}`,
  ja: (r, m) => `${r}${m}`,
  // "D-natürliche Moll-Tonleiter"는 어색하다 — 독일어는 조를 뒤에 붙여 말한다
  de: (r, m) => `${m} in ${r}`,
  fr: (r, m) => `${m} de ${r}`,
  hi: (r, m) => `${r} ${m}`,
};

export function titleOf(item: MusicItem, lang: Lang8): string {
  const root = noteName(item.root, lang, accidentalOf(item));
  if (item.kind === 'chord') {
    return CHORD_TITLE[lang](root, chordQuality(item.id)?.name[lang] ?? item.id);
  }
  if (item.kind === 'scale') {
    return SCALE_TITLE[lang](root, scaleMode(item.id)?.name[lang] ?? item.id);
  }
  return intervalDef(item.id)?.name[lang] ?? item.id;
}

/** 이 항목이 어떤 소리인지 한 줄 */
export function feelOf(item: MusicItem, lang: Lang8): string {
  if (item.kind === 'chord') return chordQuality(item.id)?.feel[lang] ?? '';
  if (item.kind === 'scale') return scaleMode(item.id)?.feel[lang] ?? '';
  return intervalDef(item.id)?.ear[lang] ?? '';
}

/** 구성음을 그 언어 표기로 나열한다 — "C · E · G" */
export const noteListOf = (item: MusicItem, lang: Lang8): string[] =>
  notesOf(item).map(pc => noteName(pc, lang, accidentalOf(item)));

/** 같은 밑음의 다른 성질, 또는 같은 성질의 다른 밑음 — 아래 추천에 쓴다 */
export function relatedItems(slug: string, limit = 8): MusicItem[] {
  const me = musicItem(slug);
  if (!me) return [];
  const sameRoot = MUSIC_ITEMS.filter(i => i.root === me.root && i.slug !== slug && i.kind === me.kind);
  const sameKind = MUSIC_ITEMS.filter(i => i.id === me.id && i.slug !== slug);
  const rest = MUSIC_ITEMS.filter(i => i.slug !== slug && !sameRoot.includes(i) && !sameKind.includes(i));
  return [...sameRoot, ...sameKind, ...rest].slice(0, limit);
}

export const itemsOfKind = (kind: MusicKind): MusicItem[] =>
  MUSIC_ITEMS.filter(i => i.kind === kind);

/** 허브에서 성질별로 묶어 보여 준다 */
export const chordsByQuality = (id: string): MusicItem[] =>
  MUSIC_ITEMS.filter(i => i.kind === 'chord' && i.id === id);
