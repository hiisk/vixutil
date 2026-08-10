'use client';
import FormulaEngine from '@/components/FormulaEngine';
import { craftTool } from '@/lib/craft-tools';
import type { FormulaLang } from '@/lib/formula/terms';

/** /craft의 클라이언트 진입점 — compute가 함수라서 서버에서 넘길 수 없다 */
export default function CraftEngine({
  slug, lang, grad, textAccent, focusBorder,
}: {
  slug: string; lang: FormulaLang; grad: string; textAccent: string; focusBorder: string;
}) {
  const tool = craftTool(slug);
  if (!tool) return null;
  return <FormulaEngine tool={tool} lang={lang} section={{ grad, textAccent, focusBorder }} />;
}
