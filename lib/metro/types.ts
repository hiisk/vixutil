/**
 * 지하철 노선 역 이름 맞추기 — 데이터 형태.
 *
 * 역 이름은 현지 표기 그대로 둔다. 서울 2호선을 영어 화면에서 풀어도 답은
 * "강남"이고, 런던 Victoria line을 한국어 화면에서 풀어도 답은 "Oxford Circus"다.
 * 실제로 그 도시에서 부르는 이름을 맞추는 것이 이 게임의 내용이기 때문이고,
 * 역 이름 삼천 개를 여덟 언어로 옮기다 생기는 오역을 피할 수 있기 때문이다.
 *
 * 대신 도시·나라·노선 이름과 화면 문구는 여덟 언어로 둔다. 도시와 나라 이름은
 * cities.ts에 한 번만 적고 노선은 열쇠만 참조한다 — 서울 노선 열 개에 같은 말을
 * 여덟 벌씩 열 번 쓰지 않기 위해서다. 번호가 붙은 노선 이름도 lang.ts의 규칙으로
 * 만들어 낸다.
 *
 * 노선도 좌표는 실제 위치가 아니라 도식(런던식 45도 격자)이다. shape 문자열에
 * 방향을 적어 두면 좌표는 계산해서 만든다 — 역마다 x·y를 손으로 적으면
 * 백 노선에 삼천 쌍을 적어야 하고, 역 하나를 끼워 넣을 때 전부 밀어야 한다.
 */
import { numberedLine, type L8, type MetroLang } from './lang.ts';
import { CITIES } from './cities.ts';

export interface MetroStation {
  /** 현지 표기 — 이것이 정답이다 */
  name: string;
  /** 로마자 표기. 한글·한자·가나·데바나가리 노선에서 함께 정답으로 받는다 */
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

/** 노선 하나에 붙는 읽을 거리 */
export interface MetroCopy {
  /** 이 노선이 어떤 노선인지 두세 문장 */
  intro: string;
  /** 풀 때 도움이 되는 한 가지 */
  hint: string;
}

/**
 * 번호가 아닌 노선 이름.
 *
 * 어느 언어에서나 같게 부르는 이름(U2, L3)은 문자열 하나로 끝낸다.
 * 언어마다 다른 이름(야마노테선 / Yamanote Line / 山手線)은 언어별로 적는다.
 */
export type LineLabel = string | Partial<L8<string>>;

export interface MetroLine {
  slug: string;
  /** 도시를 묶는 열쇠 — cities.ts의 키. 허브에서 도시별로 모은다 */
  city: string;
  /** 노선 색 — 실제 노선색을 쓴다 */
  color: string;
  /** 순환선인가 */
  loop?: boolean;
  /** 번호로 부르는 노선의 번호 — "2"를 넣으면 언어마다 2호선·Line 2·Línea 2가 된다 */
  num?: string;
  /** 번호가 아닌 이름을 쓸 때 */
  label?: LineLabel;
  /** 노선 모양 — 방향 문자의 나열 */
  shape: Dir[];
  stations: MetroStation[];
  /** 여덟 언어의 소개와 힌트 */
  text: L8<MetroCopy>;
}

export const lineCopy = (l: MetroLine, lang: MetroLang): MetroCopy => l.text[lang];

/** 노선 이름 — 번호면 규칙으로 만들고, 아니면 적어 둔 이름에서 고른다 */
export function lineName(line: MetroLine, lang: MetroLang): string {
  if (line.num) return numberedLine(line.num, lang);
  const l = line.label;
  if (!l) return line.slug;
  if (typeof l === 'string') return l;
  return l[lang] ?? l.en ?? line.slug;
}

export const cityName = (city: string, lang: MetroLang): string =>
  CITIES[city]?.name[lang] ?? city;

export const countryName = (city: string, lang: MetroLang): string =>
  CITIES[city]?.country[lang] ?? '';

/** 국기 이모지 — 카드 아이콘으로도 쓴다 */
export const lineIcon = (line: MetroLine): string => CITIES[line.city]?.icon ?? '🚇';

/** "서울 2호선" / "Seoul Line 2" — 제목과 공유 카드에 쓴다 */
export const lineTitle = (line: MetroLine, lang: MetroLang): string =>
  `${cityName(line.city, lang)} ${lineName(line, lang)}`;

/** 수도가 아닌 도시의 노선인가 */
export const isSecondCity = (line: MetroLine): boolean =>
  Boolean(CITIES[line.city]?.secondCity);

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
 * 공백·하이픈·가운뎃점·슬래시를 지우고 소문자로 내린다. 역 이름에는 표기 차이가
 * 많다 — "Oxford Circus"와 "oxfordcircus", "신촌"과 "신 촌", 시카고의
 * "Clark/Lake"와 "Clark Lake"가 모두 같은 답이어야 한다.
 *
 * 라틴 문자의 덧표시와 독일어 ß도 지운다. Châtelet를 Chatelet로,
 * Kurfürstenstraße를 Kurfuerstenstrasse나 Kurfurstenstrasse로 치는 사람이
 * 실제로 대부분이고, 그 키를 못 넣는 자판도 많다. 데바나가리·가나의 모음
 * 기호는 남긴다 — 그것을 지우면 다른 역이 같은 이름이 된다.
 */
export const normalize = (s: string): string =>
  s
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/([a-z])\p{Mn}+/gu, '$1')
    .replace(/[\s·'’`.\-_()[\]/]/g, '');

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
