/**
 * 한 언어의 운세 문구 전부.
 *
 * ── 왜 영어판 파일을 복제하지 않는가 ─────────────────────
 * fortune-en.ts는 id·이모지·hex·달 번호까지 한 벌 다 갖고 있다. 그대로 여덟 벌을
 * 만들면 같은 이모지와 같은 hex가 아홉 군데에 흩어지고, 색 하나를 바꾸면 아홉 곳을
 * 고쳐야 한다. 그래서 언어와 무관한 것(id·이모지·hex·기간·주기 일수)은
 * [[lib/fortune-l10n/index.ts]]의 뼈대에 한 번만 두고, 여기서는 사람이 읽는
 * 문장만 받는다.
 *
 * ── 배열 길이 ─────────────────────────────────────────
 * pick()이 시드를 길이로 나눈 나머지로 고르므로 길이는 언어마다 달라도 된다.
 * 실제로 한국어는 50/44/44/45/45, 영어는 30/24/22/21/21이다. 다만 짧으면 같은
 * 문장이 자주 돌아오므로 영어와 같은 길이에 맞춘다.
 *
 * Partial이 아니라 Record다 — 한 언어라도 빠지면 tsc가 잡는다.
 */

export type ZodiacId =
  | 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo'
  | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export type AnimalId =
  | 'rat' | 'ox' | 'tiger' | 'rabbit' | 'dragon' | 'snake'
  | 'horse' | 'goat' | 'monkey' | 'rooster' | 'dog' | 'pig';

export type BloodId = 'A' | 'B' | 'O' | 'AB';

export type MbtiId =
  | 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ' | 'ISTP' | 'ISFP' | 'INFP' | 'INTP'
  | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP' | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ';

export interface BirthCopy {
  stone: string;
  stoneMeaning: string;
  flower: string;
  flowerMeaning: string;
  blurb: string;
}

export interface ColorInfoCopy {
  /**
   * 색 이름.
   *
   * colors와 열두 개로 개수는 같지만 목록이 다르다 — 행운 색 뽑기는 남색·은색이,
   * 오늘의 색 카드는 감색·검정이 들어간다. 같은 배열로 묶었다가 여섯 번째가
   * 언어마다 남색이 됐다 감색이 됐다 하는 일을 막으려고 따로 받는다.
   */
  name: string;
  meaning: string;
  tip: string;
  keywords: [string, string, string];
}

export type FortuneCopy = {
  /** 별자리 — 기간은 날짜라 뼈대에 있고 여기는 이름·원소·지배성만 */
  zodiac: Record<ZodiacId, { name: string; element: string; ruling: string }>;
  /** 별자리 기간 표기 — "3월 21일 ~ 4월 19일"처럼 언어마다 쓰는 법이 다르다 */
  zodiacPeriod: Record<ZodiacId, string>;
  animals: Record<AnimalId, { name: string; trait: string }>;
  bloodTypes: Record<BloodId, { name: string; nickname: string; trait: string }>;
  pool: { overall: string[]; love: string[]; money: string[]; health: string[]; work: string[] };
  advice: string[];
  items: string[];
  keywords: string[];
  /** 열두 색 이름 — hex는 뼈대와 공유한다 */
  colors: [string, string, string, string, string, string, string, string, string, string, string, string];
  /** 동·서·남·북·동남·남서 여섯 방향 */
  directions: [string, string, string, string, string, string];
  /** 1월부터 12월까지 */
  birthInfo: BirthCopy[];
  mbti: Record<MbtiId, { nickname: string; trait: string }>;
  /** LUCKY_COLORS와 같은 순서 열두 개 */
  colorInfo: ColorInfoCopy[];
  lotto: { weekdays: string[]; timeSlots: string[] };
  cycles: { label: string; desc: string }[];
  phaseLabel: { high: string; low: string; critical: string };
  biorhythm: {
    multiCritical: (names: string) => string;
    oneCritical: (name: string) => string;
    veryHigh: string; high: string; mid: string; low: string; veryLow: string;
  };
  /** 화면 문구 — fortune-intl.ts의 FORTUNE_UI와 같은 열쇠 */
  ui: {
    fortuneOf: string; todaysFortune: string; overall: string; advice: string;
    luck: string; luckyColor: string; luckyNumber: string; luckyDirection: string;
    luckyItem: string; love: string; money: string; work: string; health: string;
    share: string; copied: string; disclaimer: string;
  };
};
