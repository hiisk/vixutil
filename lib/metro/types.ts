/**
 * 지하철 노선 역 이름 맞추기 — 데이터 형태.
 *
 * 역 이름은 현지 표기 그대로 둔다. 서울 2호선을 영어 화면에서 풀어도 답은
 * "강남"이고, 런던 Central line을 한국어 화면에서 풀어도 답은 "Oxford Circus"다.
 * 실제로 그 도시에서 부르는 이름을 맞추는 것이 이 게임의 내용이기 때문이고,
 * 역 이름 삼천 개를 세 언어로 옮기다 생기는 오역을 피할 수 있기 때문이다.
 *
 * 대신 도시 이름·노선 이름·화면 문구는 세 언어로 둔다. 로마자를 함께 정답으로
 * 받아 그 문자를 못 넣는 환경에서도 풀 수 있게 한다.
 *
 * 노선도 좌표는 실제 위치가 아니라 도식(런던식 45도 격자)이다. shape 문자열에
 * 방향을 적어 두면 좌표는 계산해서 만든다 — 역마다 x·y를 손으로 적으면
 * 백 노선에 삼천 쌍을 적어야 하고, 역 하나를 끼워 넣을 때 전부 밀어야 한다.
 */
import type { Lang } from '../formula/terms.ts';

export interface MetroStation {
  /** 현지 표기 — 이것이 정답이다 */
  name: string;
  /** 로마자 표기. 한글·한자·키릴 노선에서 함께 정답으로 받는다 */
  roman?: string;
  /** 또 하나의 통용 표기 — 홍콩처럼 영문명과 한자명을 함께 쓰는 곳 */
  alt?: string;
  /** 기점·주요 환승역 표시 — 노선도에서 크게 그린다 */
  mark?: 'terminus' | 'transfer';
}

/**
 * 노선이 꺾이는 방향의 나열. 한 글자가 역 사이 한 구간이다.
 * 역 수보다 하나 적게 적으면 되고, 짧으면 마지막 방향을 되풀이한다.
 */
export type Dir = 'E' | 'W' | 'N' | 'S' | 'NE' | 'NW' | 'SE' | 'SW';

export interface MetroText {
  /** 도시 이름 */
  city: string;
  /** 노선 이름 */
  line: string;
  /** 나라 이름 */
  country: string;
  /** 이 노선이 어떤 노선인지 두세 문장 */
  intro: string;
  /** 풀 때 도움이 되는 한 가지 */
  hint: string;
}

export interface MetroLine {
  slug: string;
  /** 도시를 묶는 열쇠 — 허브에서 도시별로 모은다 */
  city: string;
  /** 국기 이모지. 카드 아이콘으로도 쓴다 */
  icon: string;
  /** 노선 색 — 실제 노선색을 쓴다 */
  color: string;
  /** 순환선인가 */
  loop?: boolean;
  /** 노선 모양 — 방향 문자의 나열 */
  shape: Dir[];
  stations: MetroStation[];
  ko: MetroText;
  en: MetroText;
  zh: MetroText;
}

export const metroText = (l: MetroLine, lang: Lang): MetroText => l[lang];

/** 방향 한 글자를 좌표 변화로 */
const STEP: Record<Dir, [number, number]> = {
  E: [1, 0], W: [-1, 0], N: [0, -1], S: [0, 1],
  NE: [0.72, -0.72], NW: [-0.72, -0.72], SE: [0.72, 0.72], SW: [-0.72, 0.72],
};

/**
 * shape에서 역마다 좌표를 만든다.
 *
 * 첫 역을 원점에 놓고 방향대로 한 칸씩 나아간다. shape가 역 수보다 짧으면
 * 마지막 방향을 이어 쓴다 — 노선을 늘릴 때 shape를 다시 안 적어도 된다.
 */
export function layout(line: MetroLine): { x: number; y: number }[] {
  // 좌표를 세 자리로 끊는다.
  //
  // Math.cos·sin의 마지막 비트가 Node와 브라우저에서 다르게 나온다. 그대로 쓰면
  // 서버가 그린 path의 d와 클라이언트가 계산한 d가 99.00680096345818 대
  // 99.00680096345819로 갈려 하이드레이션이 깨진다(실제로 그랬다).
  const fix = (n: number) => Math.round(n * 1000) / 1000;

  // 순환선은 타원에 고르게 늘어놓는다. 방향 문자로 닫힌 고리를 손으로 그리면
  // 시작점 근처에서 두 역이 같은 격자점에 겹쳐 하나가 가려진다.
  if (line.loop) {
    const n = line.stations.length;
    const r = Math.max(3, n / (2 * Math.PI)) * 1.6;
    return line.stations.map((_, i) => {
      const th = (i / n) * Math.PI * 2 - Math.PI / 2;
      return { x: fix(Math.cos(th) * r * 1.35), y: fix(Math.sin(th) * r) };
    });
  }
  const pts: { x: number; y: number }[] = [{ x: 0, y: 0 }];
  for (let i = 1; i < line.stations.length; i++) {
    const dir = line.shape[i - 1] ?? line.shape[line.shape.length - 1] ?? 'E';
    const [dx, dy] = STEP[dir];
    const prev = pts[i - 1];
    pts.push({ x: fix(prev.x + dx), y: fix(prev.y + dy) });
  }
  return pts;
}

/**
 * 정답 비교용으로 다듬는다.
 *
 * 공백·하이픈·가운뎃점을 지우고 소문자로 내린다. 역 이름에는 표기 차이가
 * 많다 — "Oxford Circus"와 "oxfordcircus", "신촌"과 "신 촌"이 모두 같은
 * 답이어야 한다.
 */
export const normalize = (s: string): string =>
  s.toLowerCase().replace(/[\s·'’`.\-_()[\]]/g, '');

/** 입력이 그 역의 답인가 — 현지 표기와 로마자를 모두 받는다 */
export function matches(input: string, st: MetroStation): boolean {
  const v = normalize(input);
  if (v.length === 0) return false;
  if (v === normalize(st.name)) return true;
  if (st.roman && v === normalize(st.roman)) return true;
  if (st.alt && v === normalize(st.alt)) return true;
  // 괄호 안의 별칭도 답으로 받는다 — "총신대입구(이수)"에서 "이수"
  const alias = st.name.match(/[（(]([^）)]+)[）)]/);
  if (alias && v === normalize(alias[1])) return true;
  const bare = st.name.replace(/[（(][^）)]*[）)]/g, '');
  if (normalize(bare) === v) return true;
  return false;
}

/** 아직 못 맞힌 역 가운데 이 입력에 해당하는 것의 자리 — 없으면 −1 */
export function findStation(input: string, line: MetroLine, solved: boolean[]): number {
  for (let i = 0; i < line.stations.length; i++) {
    if (solved[i]) continue;
    if (matches(input, line.stations[i])) return i;
  }
  return -1;
}

/** 첫 글자 힌트 — 한 글자만 보여준다 */
export const firstChar = (st: MetroStation): string => [...st.name][0] ?? '';

/** 글자 수 힌트. 공백은 세지 않는다 */
export const charCount = (st: MetroStation): number => [...st.name.replace(/\s/g, '')].length;
