/**
 * 공식 섹션의 공통 형태.
 *
 * /rate와 /body가 같은 화면 컴포넌트를 쓰려면 설정의 타입이 하나여야 한다.
 * 처음엔 typeof RATE_SECTION을 그대로 썼는데, 그러면 카테고리 문자열까지
 * 리터럴로 굳어 두 번째 섹션이 타입에 맞지 않는다.
 */
import type { FormulaTool } from './types.ts';
import type { FormulaLang, Lang } from './terms.ts';

export interface SectionMeta {
  /** 헤더 breadcrumb에 쓰는 짧은 이름 */
  section: string;
  hubTitle: string;
  hubLead: string;
  hubNotice: string;
  footNote: string;
  metaTitle: string;
  metaDesc: string;
}

/** PageGlow가 받는 색 이름과 같아야 한다 */
export type Accent = 'blue' | 'violet' | 'amber' | 'emerald' | 'sky' | 'indigo' | 'rose';

export interface SectionConfig {
  key: string;
  tools: FormulaTool[];
  categories: readonly string[];
  meta: Record<Lang, SectionMeta>;
  categoryLabel: Record<Lang, Record<string, string>>;
  /**
   * 번역 언어의 섹션 문구·분류 이름.
   *
   * 위 두 칸은 ko·en으로 굳어 있고 세 섹션이 함께 쓴다. 여덟 칸으로 바꾸면
   * 아직 옮기지 않은 섹션까지 한꺼번에 깨지므로, 옮긴 언어만 여기 담고
   * 없는 언어는 영어로 되돌린다.
   */
  metaIntl?: Partial<Record<FormulaLang, SectionMeta>>;
  categoryIntl?: Partial<Record<FormulaLang, Record<string, string>>>;
  accent: Accent;
  /** Tailwind 클래스는 문자열로 다 적어야 한다 — 조립하면 빌드가 지운다 */
  grad: string;
  gradBar: string;
  hoverBorder: string;
  textAccent: string;
  focusBorder: string;
  hoverText: string;
  linkHover: string;
  ogFrom: string;
  ogTo: string;
}

/** 그 언어의 섹션 문구. 없으면 영어로 되돌린다 — 그 자리만 영어가 된다. */
/**
 * 문구에 적은 {n}을 실제 도구 수로 바꾼다.
 *
 * 전에는 "100종"이라고 박아 뒀는데 도구가 122~126종이 되도록 아무도 못 고쳤다.
 * 열 언어 × 세 섹션이라 고칠 자리가 서른 곳이고, 화면과 검색결과에 그대로
 * 나가는 문구다. 숫자를 문구에서 빼고 여기서 채우면 다시 낡지 않는다.
 */
const fillCount = (m: SectionMeta, n: number): SectionMeta => {
  const put = (s: string) => s.replaceAll('{n}', String(n));
  return { ...m, hubLead: put(m.hubLead), metaTitle: put(m.metaTitle), metaDesc: put(m.metaDesc) };
};

export function sectionMeta(section: SectionConfig, lang: FormulaLang): SectionMeta {
  const raw = lang === 'ko' || lang === 'en' ? section.meta[lang] : section.metaIntl?.[lang] ?? section.meta.en;
  return fillCount(raw, section.tools.length);
}

/** 그 언어의 분류 이름표. 열쇠는 카탈로그의 한국어 문자열 그대로다. */
export function sectionCategories(section: SectionConfig, lang: FormulaLang): Record<string, string> {
  if (lang === 'ko' || lang === 'en') return section.categoryLabel[lang];
  return section.categoryIntl?.[lang] ?? section.categoryLabel.en;
}

/** 그 언어로 내보낼 섹션인가 — 문구가 없으면 라우트를 만들지 않는다 */
export function sectionHasLang(section: SectionConfig, lang: FormulaLang): boolean {
  return lang === 'ko' || lang === 'en' || !!section.metaIntl?.[lang];
}
