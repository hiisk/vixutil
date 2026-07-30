/**
 * 공식 도구의 FAQ — 실제 계산값으로 만든다.
 *
 * "예를 들어"라고 쓰고 예시가 없으면 아무 말도 안 한 것과 같다. 기본값을 그대로
 * 계산해 넣으면 페이지마다 서로 다른 진짜 숫자가 들어간다.
 */
import type { FormulaTool } from './types.ts';
import { term, unitLabel, type Lang } from './terms.ts';
import { FORMULA_UI, groupNum } from './ui.ts';
import { scenarioTable } from './article.ts';

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

  const items = [
    { q: ui.faqHow(text.title), a: `${renderFormula(tool.formula, lang)} — ${text.long}` },
    { q: ui.faqExample, a: ui.exampleLead(inputStr, outStr) },
    { q: ui.faqInputs, a: ui.faqInputsLead(tool.fields.map(f => term(f.term, lang)).join(', ')) },
  ];

  // 값이 달라지면 답이 어디로 가는지 — 표와 같은 계산을 문장으로 한 번 더
  const table = scenarioTable(tool, lang);
  if (table && table.rows.length >= 3) {
    const first = table.rows[0];
    const last = table.rows[table.rows.length - 1];
    const cell = (row: string[]) => `${table.cols[0]} ${row[0]} → ${table.cols[1]} ${row[1]}`;
    items.push({ q: ui.faqAnother, a: ui.faqAnotherLead(table.pivot, cell(first), cell(last)) });
  }

  items.push({ q: ui.faqRounding, a: ui.faqRoundingLead });
  items.push({ q: ui.faqCaution, a: text.note });
  return items;
}
