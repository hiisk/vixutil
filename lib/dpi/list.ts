/**
 * 마우스 감도 128칸 — 게임 쌍 56 + 게임×DPI 72.
 *
 * 감도 변환은 표를 옮겨 적을 것이 아니다. 게임마다 **마우스 카운트 하나가 시야를
 * 몇 도 돌리는지**를 정하는 상수(yaw)가 하나 있고, 그 상수와 DPI·감도만 있으면
 * 360°를 돌리는 데 드는 거리, eDPI, 다른 게임의 같은 감도가 모두 따라 나온다
 * (facts.ts). 그래서 이 파일이 적는 것은 **축 셋과 상수 하나**뿐이다.
 *
 *   게임 목록과 yaw    ← 이것만이 옮겨 적은 값이다(아래에 근거를 적었다)
 *   DPI 축 아홉        ← 마우스에 실제로 있는 눈금
 *   목표 cm/360 축 여덟 ← 사람이 쓰는 범위
 *
 * 감도 값은 한 개도 적지 않는다. "발로란트 0.4"류의 표를 적어 두면 검사가 붙들
 * 것이 없고(그 표가 곧 정답이 되어 버린다), 게임이 슬라이더를 바꾸면 통째로
 * 거짓이 된다. 대신 **목표 cm/360에서 감도를 거꾸로 구한다** — 20cm를 돌리려면
 * 이 게임 이 DPI에서 감도가 얼마여야 하는가. 물리량이 축이고 감도가 답이다.
 *
 * ── yaw 값을 어디서 가져왔나, 그리고 무엇을 뺐나 ─────────────
 * yaw는 게임 엔진의 상수다. 소스 계열은 콘솔 변수 `m_yaw`의 기본값이 그대로
 * 드러나 있고(0.022), 발로란트·오버워치는 소스 계열과의 환산비가 널리 공표돼
 * 있다(발로란트는 소스의 1/3.18, 오버워치는 3.33배).
 *
 * **확신하지 못하는 값은 넣지 않았다.** 셀을 늘리려고 상수를 지어내면 그 페이지를
 * 믿고 감도를 바꾼 사람의 조준이 망가진다. 아래가 일부러 뺀 게임과 그 까닭이다.
 *
 *   레인보우 식스 시즈  감도가 **FOV에 묶여 있다.** 상수 하나로 환산되지 않는다.
 *   포트나이트          감도 표기가 백분율로 바뀌었고 축척을 확인하지 못했다.
 *   콜 오브 듀티        오버워치와 같은 축척(0.0066)이라는 말이 널리 있지만,
 *                       슬라이더가 1~20 정수인지 소수인지와 별도 배수의 관계를
 *                       확인하지 못했다.
 *   배틀필드            Uniform Soldier Aiming 계수가 끼어 계산이 갈린다.
 *   마인크래프트        감도-속도 관계가 선형이 아니다. 상수로 환산되지 않는다.
 *   PUBG·타르코프·러스트·데스티니 2·헤일로·더 파이널스·데드록
 *                       축척을 확인하지 못했다.
 *
 * 그래서 서로 다른 yaw는 셋뿐이다(0.022 · 0.07 · 0.0066). 여덟 게임 가운데 여섯이
 * 0.022를 쓰므로 그 여섯끼리는 **감도 숫자가 안 바뀐다** — 그것이 틀린 답이 아니라
 * 찾던 답이다("에이펙스 감도를 CS2에 그대로 넣어도 되나"의 답이 '된다'다).
 * 화면은 그 자리에 곱수 1을 적는 대신 같은 엔진 계열이라고 밝힌다.
 *
 * ── 128칸이 어디서 나오는가 ──────────────────────────────────
 *   게임 쌍   8 × 7 = 56   /dpi/valorant-to-cs2 — 순서가 있다(반대쪽은 다른 칸)
 *   게임×DPI  8 × 9 = 72   /dpi/valorant-800dpi — 감도↔cm/360 표
 *
 * 게임을 하나 더하면 쌍이 15칸, 낱점이 9칸 늘어난다. 늘리는 자리는 이 파일의
 * GAMES 한 줄이고, 그 줄에 적을 yaw를 **확인하지 못하면 늘리지 않는다.**
 *
 * ── 오늘을 읽지 않는다 ───────────────────────────────────────
 * 이 섹션에는 날짜가 없다. 그래도 `new Date()`를 금지하는 검사를 함께 세운 것은,
 * "지금 프로 선수 평균"처럼 시간에 매인 값을 나중에 끼워 넣지 못하게 하려는 것이다.
 * 주소가 가리키는 답은 언제 열어도 하나여야 한다.
 */

export interface Game {
  /** 주소에 쓰는 이름 — 언어를 가리지 않는다 */
  slug: string;
  /** 화면에 적는 이름. 상표라 열 언어가 같은 글자를 쓴다 */
  name: string;
  /** 좁은 자리(제목·목록)에서 쓰는 짧은 이름 */
  short: string;
  /**
   * 마우스 카운트 하나가 감도 1에서 돌리는 각(°).
   *
   * 소스·골드소스·id Tech 계열은 `m_yaw` 기본값 0.022가 그대로 드러나 있다.
   * 발로란트와 오버워치는 그 계열과의 환산비로 널리 공표된 값이다.
   */
  yaw: number;
}

/**
 * 여덟 게임 — yaw를 확인한 것만 담는다. 뺀 게임과 까닭은 이 파일 머리말에 있다.
 *
 * 0.022는 퀘이크에서 온 값이다. 소스 엔진이 그것을 물려받고, 소스로 만든
 * 타이탄폴과 그 엔진을 쓴 에이펙스까지 같은 값을 쓴다 — 그래서 이 여섯은
 * 감도 숫자를 그대로 옮겨도 같은 거리를 돈다.
 */
export const GAMES: Game[] = [
  { slug: 'cs2', name: 'Counter-Strike 2', short: 'CS2', yaw: 0.022 },
  { slug: 'csgo', name: 'CS:GO', short: 'CS:GO', yaw: 0.022 },
  { slug: 'valorant', name: 'VALORANT', short: 'VALORANT', yaw: 0.07 },
  { slug: 'apex', name: 'Apex Legends', short: 'Apex', yaw: 0.022 },
  { slug: 'overwatch2', name: 'Overwatch 2', short: 'OW2', yaw: 0.0066 },
  { slug: 'tf2', name: 'Team Fortress 2', short: 'TF2', yaw: 0.022 },
  { slug: 'titanfall2', name: 'Titanfall 2', short: 'Titanfall 2', yaw: 0.022 },
  { slug: 'quake-live', name: 'Quake Live', short: 'Quake', yaw: 0.022 },
];

/**
 * DPI 축 아홉 — 마우스 소프트웨어에 실제로 있는 눈금이다.
 *
 * 400·800·1600·3200은 센서가 곧바로 내는 값이라 게이머가 가장 많이 쓰고,
 * 500·1000·1200·2000·2400은 그 사이를 메운다. 6400 이상을 안 넣은 것은 그
 * 자리에서 감도가 0.0x대로 내려가 슬라이더 눈금보다 잘아지기 때문이다.
 */
export const DPIS: number[] = [400, 500, 800, 1000, 1200, 1600, 2000, 2400, 3200];

/**
 * 목표 cm/360 축 여덟 — 360°를 돌리는 데 마우스를 미는 거리(cm).
 *
 * 게임과 무관한 **물리량**이라 이것을 축으로 둔다. 20cm는 손목만 쓰는 빠른 쪽,
 * 60cm는 팔로 미는 느린 쪽이고 FPS를 하는 사람은 거의 이 안에 있다. 감도는
 * 이 축에서 거꾸로 계산되므로, 어느 게임의 감도도 손으로 적지 않는다.
 */
export const CM_TARGETS: number[] = [20, 25, 30, 35, 40, 45, 50, 60];

/** 쌍 칸의 보기표가 기준으로 삼는 DPI — 가장 많이 쓰는 값이다 */
export const REF_DPI = 800;

export type Kind = 'pair' | 'point';

/** 게임 A의 감도를 게임 B로 옮기는 칸 */
export interface PairCell {
  kind: 'pair';
  slug: string;
  from: string;
  to: string;
}

/** 게임 하나와 DPI 하나 — 감도↔cm/360 표가 되는 칸 */
export interface PointCell {
  kind: 'point';
  slug: string;
  game: string;
  dpi: number;
}

export type Cell = PairCell | PointCell;

/** valorant → cs2는 valorant-to-cs2. 반대 방향은 다른 칸이다 */
export const pairSlug = (from: string, to: string): string => `${from}-to-${to}`;

/** 발로란트 800 DPI는 valorant-800dpi */
export const pointSlug = (game: string, dpi: number): string => `${game}-${dpi}dpi`;

/** 순서가 있는 쌍 — 곱수가 서로 역수라 두 칸이 다른 답을 낸다 */
export const PAIRS: PairCell[] = GAMES.flatMap(a =>
  GAMES.filter(b => b.slug !== a.slug).map(b => ({
    kind: 'pair' as const,
    slug: pairSlug(a.slug, b.slug),
    from: a.slug,
    to: b.slug,
  })),
);

export const POINTS: PointCell[] = GAMES.flatMap(g =>
  DPIS.map(dpi => ({ kind: 'point' as const, slug: pointSlug(g.slug, dpi), game: g.slug, dpi })),
);

export const CELLS: Cell[] = [...PAIRS, ...POINTS];

export const DPI_SLUGS: string[] = CELLS.map(c => c.slug);

const BY_SLUG = new Map(CELLS.map(c => [c.slug, c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

const GAME_BY_SLUG = new Map(GAMES.map(g => [g.slug, g]));

export const gameOf = (slug: string): Game | undefined => GAME_BY_SLUG.get(slug);

/** 그 칸이 다루는 게임들 — 쌍은 둘, 낱점은 하나다 */
export const gamesOf = (c: Cell): string[] => (c.kind === 'pair' ? [c.from, c.to] : [c.game]);

/** 그 게임에서 나가는 쌍 — 허브가 게임마다 한 줄로 낸다 */
export const pairsFrom = (game: string): PairCell[] => PAIRS.filter(c => c.from === game);

/** 그 게임의 DPI 줄 */
export const pointsOf = (game: string): PointCell[] => POINTS.filter(c => c.game === game);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const DPI_ICON = '🖱️';
