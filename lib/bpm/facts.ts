/**
 * 템포 하나와 음표 하나가 만드는 밀리초.
 *
 * 4분음표 한 박이 60000 ÷ BPM 밀리초이고, 나머지 음표는 그 배수다.
 *
 *   길이(ms) = 60000 ÷ BPM × 박수
 *
 * 점음표는 1.5배, 셋잇단음표는 3분의 2다. 딜레이·리버브·LFO가 모두 이 한
 * 값에서 나오므로, 표를 펼쳐 두면 작업 중에 계산기를 안 꺼내도 된다.
 */
import { BEATS_PER_BAR, CELLS, NOTES, TEMPOS, type Cell, noteOf, slugOf } from './list.ts';

const round = (x: number, digits = 2): number => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface Neighbour {
  slug: string;
  bpm: number;
  note: string;
}

export interface BpmFacts {
  cell: Cell;
  slug: string;
  /** 4분음표 한 박의 길이(ms) */
  beatMs: number;
  /** 이 음표의 길이(ms) */
  ms: number;
  /** 그 길이를 주기로 보는 진동수(Hz) — LFO를 맞출 때 쓴다 */
  hz: number;
  /** 한 마디(4/4)의 길이(ms) */
  barMs: number;
  /** 이 음표가 한 마디에 몇 번 들어가는가 */
  perBar: number;
  /** 같은 템포의 다른 음표들 */
  faster: Neighbour | null;
  slower: Neighbour | null;
  /** 같은 음표의 다른 템포 */
  quicker: Neighbour | null;
  calmer: Neighbour | null;
}

/** 4분음표 한 박(ms) */
export const beatMsOf = (bpm: number): number => 60_000 / bpm;

/** 그 템포에서 박수만큼의 길이(ms) */
export const msOf = (bpm: number, beats: number): number => beatMsOf(bpm) * beats;

const step = <T,>(list: T[], i: number, by: number): T | null => {
  const j = i + by;
  return j >= 0 && j < list.length ? list[j] : null;
};

/** 음표를 짧은 것부터 늘어놓은 차례 — 이웃을 "더 짧은 음표"로 잇는다 */
const BY_LENGTH = [...NOTES].sort((a, b) => a.beats - b.beats);

export function bpmFacts(c: Cell): BpmFacts {
  if (!TEMPOS.includes(c.bpm)) throw new Error(`모르는 템포: ${c.bpm}`);
  const note = noteOf(c.note);
  if (!note) throw new Error(`모르는 음표: ${c.note}`);

  const beatMs = beatMsOf(c.bpm);
  const ms = msOf(c.bpm, note.beats);
  const ti = TEMPOS.indexOf(c.bpm);
  const ni = BY_LENGTH.findIndex(n => n.key === c.note);
  const near = (bpm: number, key: string): Neighbour => ({ slug: slugOf({ bpm, note: key }), bpm, note: key });

  return {
    cell: c,
    slug: slugOf(c),
    beatMs: round(beatMs),
    ms: round(ms),
    // 주기가 짧을수록 진동수는 높다
    hz: round(1000 / ms, 3),
    barMs: round(beatMs * BEATS_PER_BAR),
    perBar: round(BEATS_PER_BAR / note.beats, 3),
    faster: step(BY_LENGTH, ni, -1) === null ? null : near(c.bpm, (step(BY_LENGTH, ni, -1) as { key: string }).key),
    slower: step(BY_LENGTH, ni, 1) === null ? null : near(c.bpm, (step(BY_LENGTH, ni, 1) as { key: string }).key),
    quicker: step(TEMPOS, ti, 1) === null ? null : near(step(TEMPOS, ti, 1) as number, c.note),
    calmer: step(TEMPOS, ti, -1) === null ? null : near(step(TEMPOS, ti, -1) as number, c.note),
  };
}

/** 같은 템포의 한 줄 */
export const atTempo = (bpm: number): Cell[] => NOTES.map(n => ({ bpm, note: n.key }));

/** 같은 음표의 한 줄 */
export const atNote = (note: string): Cell[] => CELLS.filter(c => c.note === note);
