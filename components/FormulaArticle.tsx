import type { FormulaTool } from '@/lib/formula/types';
import type { FormulaLang } from '@/lib/formula/terms';
import { textOf } from '@/lib/formula/text';
import { FORMULA_UI } from '@/lib/formula/ui';
import { renderFormula } from '@/lib/formula/faq';
import { answerLine, glossaryRows, inputRows, outputRows, scenarioTable, substituted } from '@/lib/formula/article';
import type { SectionConfig } from '@/lib/formula/section';

/**
 * 공식 페이지의 읽을 거리 — 계산기 아래에 붙는 본문.
 *
 * 계산기만 있는 페이지는 값을 넣어 본 사람에게는 충분하지만, 검색으로 들어와
 * "이게 뭔지" 확인하려는 사람에게는 아무 말도 하지 않는다. 입력 하나하나의 뜻,
 * 기본값을 실제로 대입한 식, 값이 달라지면 답이 어디로 움직이는지 표까지 두면
 * 계산을 안 해 봐도 페이지에서 답을 얻는다.
 *
 * 내용은 전부 lib/formula/article.ts가 스펙에서 뽑는다 — 이 파일은 그리기만 한다.
 */

const TH = 'tbl-th';
const TD = 'tbl-td';

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="sec-h2">{children}</h2>;
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border chip-off overflow-x-auto">
      <table className="w-full border-collapse min-w-[20rem]">{children}</table>
    </div>
  );
}

export default function FormulaArticle({
  tool,
  lang,
  section,
}: {
  tool: FormulaTool;
  lang: FormulaLang;
  section: SectionConfig;
}) {
  const ui = FORMULA_UI[lang];
  const text = textOf(tool, lang);
  const inputs = inputRows(tool, lang);
  const outputs = outputRows(tool, lang);
  const table = scenarioTable(tool, lang);
  const glossary = glossaryRows(tool, lang);

  return (
    <div className="mt-9 space-y-8">
      {/* 손으로 쓴 본문이 있는 도구만 — 없으면 아래 자동 본문으로 충분하다 */}
      {text.body && text.body.length > 0 && (
        <section>
          <H>{ui.articleAbout}</H>
          <div className="space-y-4">
            {text.body.map(b => (
              <div key={b.h}>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1.5">{b.h}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{b.p}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <H>{ui.articleInputs}</H>
        <Frame>
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className={TH}>{ui.colInput}</th>
              <th className={TH}>{ui.colDefault}</th>
              <th className={TH}>{ui.colRange}</th>
            </tr>
          </thead>
          <tbody>
            {inputs.map(r => (
              <tr key={r.label} className="row-line">
                <td className={TD}>
                  <span className="font-bold">{r.label}</span>
                  {r.desc && <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{r.desc}</span>}
                </td>
                <td className={`${TD} tabular-nums whitespace-nowrap`}>{r.def}</td>
                <td className={`${TD} tabular-nums whitespace-nowrap text-slate-500 dark:text-slate-400`}>{r.range}</td>
              </tr>
            ))}
          </tbody>
        </Frame>
      </section>

      <section>
        <H>{ui.articleSteps}</H>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 px-4 py-4 space-y-3">
          {[
            { k: ui.stepFormula, v: renderFormula(tool.formula, lang) },
            { k: ui.stepSubstitute, v: substituted(tool, lang) },
            { k: ui.stepAnswer, v: answerLine(tool, lang) },
          ].map((s, i) => (
            <div key={s.k} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <span className="shrink-0 text-[11px] font-bold text-slate-400 dark:text-slate-500 sm:w-28">{s.k}</span>
              <span className={`text-sm font-mono tabular-nums leading-relaxed break-words ${i === 2 ? `font-black ${section.textAccent}` : 'text-slate-700 dark:text-slate-200'}`}>
                {s.v}
              </span>
            </div>
          ))}
        </div>
      </section>

      {table && (
        <section>
          <H>{ui.articleTable}</H>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2.5 leading-relaxed">{ui.tableLead(table.pivot)}</p>
          <Frame>
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                {table.cols.map((c, i) => (
                  <th key={c + i} className={TH}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map(row => (
                <tr key={row[0]} className="row-line">
                  {row.map((cell, i) => (
                    <td key={i} className={`${TD} tabular-nums whitespace-nowrap ${i === 0 ? 'font-bold' : i === 1 ? `font-black ${section.textAccent}` : ''}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Frame>
        </section>
      )}

      <section>
        <H>{ui.articleOutputs}</H>
        <Frame>
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className={TH}>{ui.colOutput}</th>
              <th className={TH}>{ui.colValue}</th>
            </tr>
          </thead>
          <tbody>
            {outputs.map(r => (
              <tr key={r.label} className="row-line">
                <td className={TD}>
                  <span className={`font-bold ${r.primary ? section.textAccent : ''}`}>{r.label}</span>
                  {r.desc && <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{r.desc}</span>}
                </td>
                <td className={`${TD} tabular-nums whitespace-nowrap`}>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </Frame>
      </section>

      <section>
        <H>{ui.articleCaution}</H>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/25 px-4 py-3.5">
          {text.note}
        </p>
      </section>

      {glossary.length >= 2 && (
        <section>
          <H>{ui.articleGlossary}</H>
          <dl className="list-card">
            {glossary.map(g => (
              <div key={g.t} className="px-4 py-3">
                <dt className="text-sm font-bold text-slate-800 dark:text-slate-100">{g.t}</dt>
                <dd className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{g.d}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}
