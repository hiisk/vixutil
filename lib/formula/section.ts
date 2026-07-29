/**
 * 공식 섹션의 공통 형태.
 *
 * /rate와 /body가 같은 화면 컴포넌트를 쓰려면 설정의 타입이 하나여야 한다.
 * 처음엔 typeof RATE_SECTION을 그대로 썼는데, 그러면 카테고리 문자열까지
 * 리터럴로 굳어 두 번째 섹션이 타입에 맞지 않는다.
 */
import type { FormulaTool } from './types.ts';
import type { Lang } from './terms.ts';

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
