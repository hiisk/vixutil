/**
 * 공식 도구의 FAQ — 실제 계산값으로 만든다.
 *
 * "예를 들어"라고 쓰고 예시가 없으면 아무 말도 안 한 것과 같다. 기본값을 그대로
 * 계산해 넣으면 페이지마다 서로 다른 진짜 숫자가 들어간다.
 */
import type { FormulaTool } from './types.ts';
import { term, unitLabel, type Lang } from './terms.ts';
import { FORMULA_UI, groupNum } from './ui.ts';

/** {키}를 그 언어의 용어로 바꾼다 */
export function renderFormula(formula: string, lang: Lang): string {
  return formula.replace(/\{(\w+)\}/g, (_, k: string) => term(k, lang));
}

export function formulaFaq(tool: FormulaTool, lang: Lang) {
  const ui = FORMULA_UI[lang];
  const text = tool[lang];
  const values: Record<string, number> = {};
  for (const f of tool.fields) values[f.key] = f.def;
  const outputs = tool.compute(values);
  const primary = outputs.find(o => o.primary) ?? outputs[0];

  const inputStr = tool.fields
    .map(f => `${term(f.term, lang)} ${groupNum(f.def, 4)}${unitLabel(f.unit ?? 'none', lang)}`)
    .join(', ');
  const outStr = `${term(primary.term, lang)} ${groupNum(primary.value, primary.digits ?? 2)}${unitLabel(primary.unit ?? 'none', lang)}`;

  return [
    { q: ui.faqHow(text.title), a: `${renderFormula(tool.formula, lang)} — ${text.long}` },
    { q: ui.faqExample, a: ui.exampleLead(inputStr, outStr) },
    { q: ui.faqCaution, a: text.note },
  ];
}
