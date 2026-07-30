/**
 * 주파수 한 장에 들어가는 값 — 헤르츠 숫자 하나에서 계산한다.
 *
 * 파장은 소리 속도를 나누면 되고, 음이름은 440Hz를 기준으로 로그를 취하면 나온다.
 * 배음은 정수배다. 손으로 적을 것이 하나도 없다.
 */
import { FREQS, freqRange, type Freq, type FreqTag } from './freqs.ts';

/** 20°C 마른 공기에서의 소리 속도(m/s) — 파장은 전부 이 값에서 나온다 */
export const SPEED_OF_SOUND = 343;

/** 사람이 듣는다고 보는 범위 */
export const AUDIBLE_MIN = 20;
export const AUDIBLE_MAX = 20000;

export interface FreqFacts {
  hz: number;
  tags: FreqTag[];
  range: ReturnType<typeof freqRange>;
  /** 공기 중 파장(미터) */
  wavelengthM: number;
  /** 파장을 사람이 재는 단위로 — 17.2m, 34cm, 1.7cm 처럼 */
  wavelengthLabel: string;
  /** 한 번 진동하는 데 걸리는 시간(밀리초) */
  periodMs: number;
  periodLabel: string;
  /** 가장 가까운 음이름 — C4·A4 처럼 */
  note: string;
  /** 그 음에서 몇 센트 벗어났는가. 100센트가 반음 하나다 */
  cents: number;
  /** 딱 맞는 음인가 — ±2센트 안이면 사람 귀로는 같은 음이다 */
  onPitch: boolean;
  /** 가청 범위 안인가 */
  audible: boolean;
  /** 배음 몇 개 — 2배·3배·4배 */
  harmonics: number[];
  /** 한 옥타브 아래·위 */
  octaveDown: number;
  octaveUp: number;
}

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * 440Hz를 A4로 두고 가장 가까운 음이름을 찾는다.
 *
 * 반음 하나가 2의 12제곱근 배다. 440에서 몇 반음 떨어졌는지 로그로 재고,
 * 반올림한 자리가 음이름, 남은 소수가 센트 차이가 된다.
 */
export function nearestNote(hz: number): { note: string; cents: number } {
  const semis = 12 * Math.log2(hz / 440);
  const rounded = Math.round(semis);
  // -0이 나오면 화면에 "-0센트"로 찍힌다. 0으로 접어 준다
  const cents = Math.round((semis - rounded) * 100) || 0;
  // A4가 기준이므로 MIDI 번호로 옮겨서 옥타브를 센다
  const midi = rounded + 69;
  const name = NOTE_NAMES[((midi % 12) + 12) % 12];
  const octave = Math.floor(midi / 12) - 1;
  return { note: `${name}${octave}`, cents };
}

const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;
// 파장은 17미터에서 0.014미터까지 걸친다. 소수 둘째 자리에서 끊으면 고음 쪽이 뭉개진다
const r4 = (n: number) => Math.round(n * 10000) / 10000;

/** 파장은 17미터에서 1.7센티까지 천 배 넘게 벌어진다 — 단위를 바꿔 줘야 읽힌다 */
function lengthLabel(m: number): string {
  if (m >= 1) return `${r2(m)} m`;
  if (m >= 0.01) return `${r1(m * 100)} cm`;
  return `${r1(m * 1000)} mm`;
}

/** 주기도 마찬가지다 — 50밀리초에서 40마이크로초까지 */
function timeLabel(ms: number): string {
  if (ms >= 1) return `${r2(ms)} ms`;
  return `${r1(ms * 1000)} µs`;
}

export function freqFacts(f: Freq): FreqFacts {
  const { hz } = f;
  const wavelengthM = SPEED_OF_SOUND / hz;
  const periodMs = 1000 / hz;
  const { note, cents } = nearestNote(hz);
  return {
    hz,
    tags: f.tags,
    range: freqRange(hz),
    wavelengthM: r4(wavelengthM),
    wavelengthLabel: lengthLabel(wavelengthM),
    periodMs: r4(periodMs),
    periodLabel: timeLabel(periodMs),
    note,
    cents,
    // ±2센트는 사람이 못 가른다. 조율기도 그쯤에서 초록불이 켜진다
    onPitch: Math.abs(cents) <= 2,
    audible: hz >= AUDIBLE_MIN && hz <= AUDIBLE_MAX,
    harmonics: [2, 3, 4].map(n => Math.round(hz * n * 100) / 100),
    octaveDown: Math.round((hz / 2) * 100) / 100,
    octaveUp: Math.round(hz * 2 * 100) / 100,
  };
}

/** 값이 가까운 주파수들 — 견주기 좋게. 로그로 재야 20Hz와 20000Hz가 같은 잣대가 된다 */
export function nearbyFreqs(hz: number, limit = 8): Freq[] {
  return FREQS.filter(x => x.hz !== hz)
    .sort((a, b) => Math.abs(Math.log2(a.hz / hz)) - Math.abs(Math.log2(b.hz / hz)))
    .slice(0, limit)
    .sort((a, b) => a.hz - b.hz);
}

/**
 * 전화 버튼음은 두 주파수가 겹쳐서 난다.
 *
 * 가로 네 줄(697·770·852·941)과 세로 네 줄(1209·1336·1477·1633)이 격자를 이루고,
 * 그 교차점 하나가 버튼 하나다. 어느 버튼에 쓰이는지는 격자에서 바로 나온다.
 */
const DTMF_ROWS = [697, 770, 852, 941];
const DTMF_COLS = [1209, 1336, 1477, 1633];
const DTMF_KEYS = [
  ['1', '2', '3', 'A'],
  ['4', '5', '6', 'B'],
  ['7', '8', '9', 'C'],
  ['*', '0', '#', 'D'],
];

export function dtmfKeys(hz: number): string[] {
  const row = DTMF_ROWS.indexOf(hz);
  if (row >= 0) return DTMF_KEYS[row];
  const col = DTMF_COLS.indexOf(hz);
  if (col >= 0) return DTMF_KEYS.map(r => r[col]);
  return [];
}
