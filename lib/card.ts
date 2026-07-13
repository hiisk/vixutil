import type { Test, Quiz, Generator, Checklist } from './types';

/**
 * 목록 페이지 카드가 실제로 쓰는 필드만 담은 경량 타입.
 *
 * 허브 페이지는 클라이언트 컴포넌트(TestSearch 등)에 데이터를 넘기는데,
 * 전체 객체를 그대로 넘기면 모든 문항·결과·섹션이 HTML에 직렬화된다.
 * 카드 그리드를 그리는 데 문항 본문은 필요 없다 — /test 허브 HTML이 1.2MB가
 * 넘어가던 이유였다. 상세 페이지에서만 전체 데이터를 쓴다.
 */
export interface CardItem {
  slug: string;
  title: string;
  desc: string;
  category: string;
}

/** 아이콘을 카드에 표시하는 섹션용 */
export interface IconCardItem extends CardItem {
  icon: string;
}

/** 체크리스트 카드는 항목 수를 뱃지로 보여준다 */
export interface ChecklistCardItem extends IconCardItem {
  itemCount: number;
}

export const toCard = ({ slug, title, desc, category }: Test | Quiz): CardItem =>
  ({ slug, title, desc, category });

export const toIconCard = ({ slug, title, desc, category, icon }: Generator): IconCardItem =>
  ({ slug, title, desc, category, icon });

export const toChecklistCard = (c: Checklist): ChecklistCardItem => ({
  slug: c.slug,
  title: c.title,
  desc: c.desc,
  category: c.category,
  icon: c.icon,
  itemCount: c.sections.reduce((n, s) => n + s.items.length, 0),
});
