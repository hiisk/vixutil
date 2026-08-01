/**
 * 사주 한 언어의 문구.
 *
 * ── 왜 문장을 표로 빼는가 ────────────────────────────
 * 영역별 운세 열 가지는 조건 분기가 촘촘해서(신강/신약, 성별, 십성 개수…)
 * 문장이 코드 사이에 끼어 있었다. 언어를 하나 더하려면 300줄짜리 생성기를 통째로
 * 복사해야 했고, 그렇게 아홉 벌이 되면 조건 하나를 고칠 때 아홉 곳을 고쳐야 한다.
 *
 * 그래서 생성기는 하나로 두고 문장만 여기서 받는다. 조건은 코드에, 말은 표에.
 *
 * 한자(比劫·官星·桃花殺)는 언어와 무관하게 그대로 둔다 — 처음 보는 사람에게는
 * 풀어 쓴 이름이 필요하고, 이미 아는 사람에게는 한자가 열쇠다.
 */

export interface StemCopy {
  /** 그 언어에서 읽는 법 — 영어는 병음(Jia), 일본어는 훈독(きのえ) */
  kor: string;
  nature: string;
  personality: string;
  luckyColor: string;
  luckyDirection: string;
  aptitude: string;
}

export interface SipseongCopy {
  name: string; summary: string; category: string;
  male: string; female: string; career: string; wealth: string;
}

/** 한 영역의 문구 — 조건 이름을 열쇠로 둔다 */
export interface DomainCopy {
  title: string;
  /** 성별로 갈리는 영역은 둘, 아니면 하나 */
  intro: string | { female: string; male: string };
  /** 점수 5·4 / 3 / 그 아래 */
  sum: [string, string, string];
  /** 근거 네 줄 — 각 줄의 갈래는 영역마다 다르다 */
  points: Record<string, string>;
  /** 조언 두 갈래 */
  adv: [string, string];
}

export type DomainId =
  | 'love' | 'marriage' | 'career' | 'wealth' | 'study'
  | 'health' | 'social' | 'business' | 'change' | 'future';

export interface SajuCopy {
  /** 오행 다섯 — 열쇠는 한국어 자료가 쓰는 목·화·토·금·수다 */
  elements: Record<string, { label: string; advice: string; shortage: string }>;
  /** 천간 열 — 열쇠는 한자 */
  stems: Record<string, StemCopy>;
  /** 지지 열둘 — 열쇠는 한자 */
  branches: Record<string, { kor: string; animal: string; season: string }>;
  /** 십성 열 — 열쇠는 한국어 이름 */
  sipseong: Record<string, SipseongCopy>;
  ui: Record<string, string>;

  /* ── 영역별 운세 ── */
  grades: Record<1 | 2 | 3 | 4 | 5, string>;
  /** 십성 다섯 갈래의 이름 */
  cat: Record<string, string>;
  /** 배우자 별 이름 */
  star: Record<string, string>;
  /** 오행 하나가 없을 때 짚는 장기와 증상 */
  organ: Record<string, { organ: string; sym: string }>;
  /** 가장 강한 십성 갈래로 정하는 직업 성향 */
  careerType: Record<string, string>;
  /** 별 이름을 이어 붙일 때 쓰는 구분자 — 한자권은 、를 쓴다 */
  starSep: string;
  domains: Record<DomainId, DomainCopy>;
  domainUi: {
    title: string; lead: string; showAll: string; collapse: string;
    scoreOf: (n: number) => string;
  };
}
