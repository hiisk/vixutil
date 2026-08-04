/**
 * 지판 한 자리의 값 — 줄과 프렛에서 음과 거리로.
 *
 * 프렛 하나가 반음이다. 그래서 음 높이는 개방현에서 프렛 번호만큼 반음을 올린
 * 값이고, 주파수는 반음마다 2의 12제곱근을 곱한 평균율에서 나온다.
 *
 * 프렛의 **자리**도 같은 비율에서 나온다. 줄 길이를 2의 (n/12)제곱으로 나누면
 * n번째 프렛을 누른 뒤 남는 길이가 되므로, 너트에서 그 프렛까지는
 *
 *   거리 = 스케일 길이 × (1 − 1 ÷ 2^(n/12))
 *
 * 12프렛에서 이 값이 정확히 절반이 되는 것이 옥타브가 그 자리인 까닭이다.
 */
import { freq as pitchFreq, noteName, type Pc } from '../music/notes.ts';
import type { Lang } from '../i18n/lang.ts';
import { MAX_FRET, OPEN_MIDI, SCALES, type Spot, slugOf } from './list.ts';

const round = (x: number, digits = 2) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface Position {
  string: number;
  fret: number;
}

export interface FretFacts {
  spot: Spot;
  slug: string;
  /** MIDI 번호 — 60이 가운데 도 */
  midi: number;
  /** 피치 클래스 0~11 */
  pc: Pc;
  /** 옥타브 — C4가 가운데 도인 표기 */
  octave: number;
  hz: number;
  /** 개방현에서 몇 반음 위인가 — 프렛 번호와 같다 */
  semitones: number;
  /** 스케일 길이별로 너트에서 그 프렛까지의 거리(mm) */
  distances: { key: string; mm: number; from: number }[];
  /** 같은 음이 나는 다른 줄의 자리 */
  sameNote: Position[];
  /** 한 옥타브 위·아래가 같은 줄에 있으면 그 프렛 */
  octaveUp: number | null;
  octaveDown: number | null;
}

/** 그 자리의 MIDI 번호 — 개방현에 프렛 수만큼 반음을 더한다 */
export const midiOf = (p: Spot): number => OPEN_MIDI[p.string - 1] + p.fret;

/** 평균율 주파수 — /music의 계산을 그대로 쓴다 */
export const hzOf = (p: Spot): number => {
  const midi = midiOf(p);
  return pitchFreq(((midi % 12) + 12) % 12, Math.floor(midi / 12) - 1);
};

/** 그 언어에서 부르는 음 이름 — /music의 표를 그대로 쓴다 */
export const nameOf = (p: Spot, lang: Lang): string => noteName(midiOf(p) % 12, lang);

/**
 * 너트에서 n번째 프렛까지의 거리.
 *
 * 12프렛이 정확히 절반이고, 24프렛이 다시 그 절반이라 4분의 3 자리에 온다.
 */
export const distanceOf = (fret: number, scale: number): number =>
  round(scale * (1 - 1 / 2 ** (fret / 12)), 1);

export function fretFacts(p: Spot): FretFacts {
  const midi = midiOf(p);

  return {
    spot: p,
    slug: slugOf(p),
    midi,
    pc: ((midi % 12) + 12) % 12,
    octave: Math.floor(midi / 12) - 1,
    hz: hzOf(p),
    semitones: p.fret,
    distances: SCALES.map(s => ({
      key: s.key,
      mm: distanceOf(p.fret, s.mm),
      // 그 프렛부터 브리지까지 남는 길이 — 소리가 나는 부분이다
      from: round(s.mm - distanceOf(p.fret, s.mm), 1),
    })),
    sameNote: OPEN_MIDI.flatMap((open, i) => {
      const fret = midi - open;
      return i + 1 !== p.string && fret >= 0 && fret <= MAX_FRET ? [{ string: i + 1, fret }] : [];
    }),
    octaveUp: p.fret + 12 <= MAX_FRET ? p.fret + 12 : null,
    octaveDown: p.fret - 12 >= 0 ? p.fret - 12 : null,
  };
}

/** 한 줄의 모든 자리 */
export const alongString = (string: number): Spot[] =>
  Array.from({ length: MAX_FRET + 1 }, (_, f) => ({ string, fret: f }));

/** 한 프렛의 여섯 줄 */
export const acrossFrets = (fret: number): Spot[] =>
  OPEN_MIDI.map((_, i) => ({ string: i + 1, fret }));
