'use client';
import FormulaEngine from '@/components/FormulaEngine';
import { rateTool } from '@/lib/rate-tools';
import type { FormulaLang } from '@/lib/formula/terms';

/**
 * /rate의 클라이언트 진입점.
 *
 * compute·verdict는 함수라서 서버 컴포넌트에서 props로 넘길 수 없다. 그래서
 * slug만 넘기고 카탈로그 조회는 클라이언트에서 한다 — 섹션마다 이 얇은 파일을
 * 하나 두면 그 섹션 페이지에만 그 섹션 카탈로그가 실린다. 엔진에 registry를
 * 두면 세 섹션 카탈로그가 모든 페이지에 딸려간다.
 */
export default function RateEngine({
  slug,
  lang,
  grad,
  textAccent,
  focusBorder,
}: {
  slug: string;
  lang: FormulaLang;
  grad: string;
  textAccent: string;
  focusBorder: string;
}) {
  const tool = rateTool(slug);
  if (!tool) return null;
  return <FormulaEngine tool={tool} lang={lang} section={{ grad, textAccent, focusBorder }} />;
}
