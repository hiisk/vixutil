'use client';
import { useMemo, useState } from 'react';
import type { FormulaTool } from '@/lib/formula/types';
import type { FormulaLang } from '@/lib/formula/terms';
import { verdictText } from '@/lib/formula/types';
import { FORMULA_UI, groupNum } from '@/lib/formula/ui';
import { gradeVar } from '@/lib/grade-color';

/**
 * 공식 계산 엔진 — 육백 페이지가 이 컴포넌트 하나를 쓴다.
 *
 * 라벨·주의문·공식 문자열은 서버에서 풀어 prop으로 받는다. 여기서 term()이나
 * textOf()를 부르면 여덟 언어 사전 전체(2.8MB)가 클라이언트 번들로 딸려 온다 —
 * 낱장 하나에 필요한 것은 한 도구·한 언어인데 육백서른다섯 도구의 여덟 언어가
 * 실린다. 사전은 서버에만 두고, 이 컴포넌트는 계산과 그리기만 한다.
 *
 * 입력은 문자열로 들고 있는다. 숫자로 정규화하면 "0.05"를 치는 도중 "0"에서
 * 값이 튀고, 지웠을 때 0이 박혀 다시 지워야 한다.
 *
 * 결과는 렌더 중에 계산한다. 상태로 두면 입력과 결과가 한 프레임 어긋난다.
 */
export default function FormulaEngine({
  tool,
  lang = 'ko',
  section,
  labels,
  units,
  note,
  formulaText,
}: {
  tool: FormulaTool;
  lang?: FormulaLang;
  section: { grad: string; textAccent: string; focusBorder: string };
  /** 용어 열쇠 → 그 언어 라벨. 서버가 이 도구가 쓰는 것만 담아 준다 */
  labels: Record<string, string>;
  /** 단위 열쇠 → 그 언어 라벨 */
  units: Record<string, string>;
  note: string;
  formulaText: string;
}) {
  const term = (k: string) => labels[k] ?? k;
  const unitLabel = (k: string) => units[k] ?? '';
  const ui = FORMULA_UI[lang];
  const [raw, setRaw] = useState<Record<string, string>>(() =>
    Object.fromEntries(tool.fields.map(f => [f.key, String(f.def)])),
  );
  const [copied, setCopied] = useState(false);

  const values = useMemo(() => {
    const out: Record<string, number> = {};
    for (const f of tool.fields) {
      const n = Number(raw[f.key]);
      out[f.key] = raw[f.key] === '' || Number.isNaN(n) ? 0 : n;
    }
    return out;
  }, [raw, tool.fields]);

  const outputs = tool.compute(values);
  const primary = outputs.find(o => o.primary) ?? outputs[0];
  const rest = outputs.filter(o => o !== primary);
  const verdict = tool.verdict?.(values, outputs) ?? null;

  const primaryText = `${groupNum(primary.value, primary.digits ?? 2)}${unitLabel(primary.unit ?? 'none')}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${term(primary.term)} ${primaryText}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch { setCopied(false); }
  };

  const tone =
    verdict?.tone === 'bad' ? 'text-rose-600 dark:text-rose-400'
    : verdict?.tone === 'warn' ? 'text-amber-600 dark:text-amber-400'
    : 'text-emerald-600 dark:text-emerald-400';

  return (
    <div>
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 backdrop-blur p-4">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">{ui.inputs}</p>
        <div className={`grid gap-3 ${tool.fields.length > 2 ? 'sm:grid-cols-2' : ''}`}>
          {tool.fields.map(f => (
            <label key={f.key} className="block">
              <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                {term(f.term)}
                {f.unit && f.unit !== 'none' && (
                  <span className="ml-1 font-medium text-slate-500 dark:text-slate-400">
                    ({unitLabel(f.unit)})
                  </span>
                )}
              </span>
              <input
                value={raw[f.key]}
                onChange={e => {
                  const cleaned = e.target.value.replace(/[^\d.\-]/g, '');
                  setRaw(prev => ({ ...prev, [f.key]: cleaned }));
                }}
                inputMode="decimal"
                aria-label={term(f.term)}
                className={`w-full rounded-xl border-2 chip-off px-3.5 py-3 text-xl font-bold text-slate-800 dark:text-slate-100 tabular-nums focus:outline-none transition-colors ${section.focusBorder}`}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="result-card mt-3 px-6 py-7" style={gradeVar(section.grad)}>
        <p className="text-sm text-white/75 mb-1">{term(primary.term)}</p>
        <p data-formula-result className="text-3xl sm:text-4xl font-bold tabular-nums break-all">{primaryText}</p>
        <button
          onClick={copy}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-900/15 hover:bg-white/25 px-3.5 py-1.5 text-xs font-bold transition-colors"
        >
          {copied ? ui.copied : ui.copy}
        </button>
      </div>

      {rest.length > 0 && (
        <div className={`grid gap-2 mt-3 ${rest.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {rest.map(o => (
            <div
              key={o.term}
              className="rounded-xl border chip-off px-3 py-3 text-center"
            >
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1 truncate">
                {term(o.term)}
              </p>
              <p className={`text-base font-bold tabular-nums ${section.textAccent}`}>
                {groupNum(o.value, o.digits ?? 2)}
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-0.5">
                  {unitLabel(o.unit ?? 'none')}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      {verdict && (
        <div className="mt-3 rounded-lg border chip-off px-4 py-3.5">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">{ui.interpret}</p>
          <p className={`text-sm font-bold leading-relaxed ${tone}`}>{verdictText(verdict, lang)}</p>
        </div>
      )}

      <div className="mt-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-3.5">
        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">{ui.formula}</p>
        <p className="text-sm font-mono font-bold text-slate-700 dark:text-slate-200 leading-relaxed break-words">
          {formulaText}
        </p>
        <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{note}</p>
      </div>
    </div>
  );
}
