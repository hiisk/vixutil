/**
 * 공식 도구의 본문 — 스펙에서 기계적으로 뽑아낸다.
 *
 * 페이지마다 설명을 손으로 쓰면 삼백 페이지 × 세 언어 = 구백 벌이다. 그렇게는
 * 못 쓰고, 쓴다 해도 서로 어긋난다. 대신 이미 있는 것(입력 스펙·공식 문자열·
 * compute)에서 읽을 거리를 만들어 낸다.
 *
 *  - 입력 표      : fields에서 라벨·단위·기본값·허용 범위
 *  - 계산 과정    : 공식에 기본값을 실제로 대입한 식과 답
 *  - 값별 결과 표 : 대표 입력을 다섯 단계로 바꿔 진짜로 계산한 값
 *  - 결과 표      : compute가 내놓는 항목마다 뜻
 *
 * 전부 실제 계산이라 숫자가 틀릴 수 없고, 라벨은 TERMS에서 오니 세 언어가
 * 공짜로 따라온다.
 */
import type { FieldSpec, FormulaTool, OutputSpec } from './types.ts';
import { term, unitLabel, type FormulaLang } from './terms.ts';
import { termDesc } from './glossary.ts';
import { FORMULA_UI, groupNum } from './ui.ts';

export const defaultValues = (tool: FormulaTool): Record<string, number> => {
  const v: Record<string, number> = {};
  for (const f of tool.fields) v[f.key] = f.def;
  return v;
};

const fmt = (n: number, digits = 2): string => groupNum(n, digits);

/** 라벨 + 단위를 한 덩어리로 — "허리둘레(cm)" 처럼 */
export const labelOf = (t: string, unit: string | undefined, lang: FormulaLang): string => {
  const u = unitLabel(unit ?? '', lang);
  return u ? `${term(t, lang)} (${u})` : term(t, lang);
};

export interface InputRow {
  label: string;
  def: string;
  range: string;
  desc: string | null;
}

export function inputRows(tool: FormulaTool, lang: FormulaLang): InputRow[] {
  const ui = FORMULA_UI[lang];
  return tool.fields.map(f => {
    const lo = f.min, hi = f.max;
    const range =
      lo !== undefined && hi !== undefined ? `${fmt(lo, 2)} ~ ${fmt(hi, 2)}`
      : lo !== undefined ? `${fmt(lo, 2)} ${ui.andUp}`
      : hi !== undefined ? `${fmt(hi, 2)} ${ui.andBelow}`
      : ui.rangeAny;
    return { label: labelOf(f.term, f.unit, lang), def: fmt(f.def, 4), range, desc: termDesc(f.term, lang) };
  });
}

export interface OutputRow {
  label: string;
  value: string;
  desc: string | null;
  primary: boolean;
}

export function outputRows(tool: FormulaTool, lang: FormulaLang): OutputRow[] {
  const outputs = tool.compute(defaultValues(tool));
  return outputs.map(o => ({
    label: labelOf(o.term, o.unit, lang),
    value: fmt(o.value, o.digits ?? 2),
    desc: termDesc(o.term, lang),
    primary: Boolean(o.primary),
  }));
}

/** 공식의 {키} 가운데 입력값인 것만 숫자로 바꾼다 — 나머지는 이름으로 남긴다 */
export function substituted(tool: FormulaTool, lang: FormulaLang): string {
  const byTerm = new Map(tool.fields.map(f => [f.term, f.def]));
  return tool.formula.replace(/\{(\w+)\}/g, (_, k: string) => {
    const v = byTerm.get(k);
    return v === undefined ? term(k, lang) : fmt(v, 4);
  });
}

export function answerLine(tool: FormulaTool, lang: FormulaLang): string {
  const outputs = tool.compute(defaultValues(tool));
  const primary = outputs.find(o => o.primary) ?? outputs[0];
  const u = unitLabel(primary.unit ?? '', lang);
  return `${term(primary.term, lang)} = ${fmt(primary.value, primary.digits ?? 2)}${u ? ` ${u}` : ''}`;
}

/**
 * 표를 그릴 대표 입력을 고른다.
 *
 * 성별 플래그(0/1)나 상수처럼 바꿔도 의미가 없는 칸을 잡으면 표가 두 줄로
 * 끝난다. 폭이 넓고 값이 1보다 큰 첫 칸을 쓴다.
 */
function pivotField(tool: FormulaTool): FieldSpec | null {
  const base = defaultValues(tool);
  const out = tool.compute(base);
  const primary = out.findIndex(o => o.primary);
  const idx = primary >= 0 ? primary : 0;
  const at = (v: Record<string, number>) => tool.compute(v)[idx]?.value;
  const before = at(base);

  // 주 결과를 실제로 움직이는 칸이어야 표가 뜻을 가진다 — 할인율만 내놓는 도구에서
  // 정가를 흔들면 다섯 줄이 같은 숫자로 채워진다
  const moves = (f: FieldSpec) => {
    const probe = { ...base, [f.key]: bump(f) };
    return at(probe) !== before;
  };
  const usable = (f: FieldSpec) => f.def > 1 && (f.max === undefined || f.max > 2);

  return (
    tool.fields.find(f => usable(f) && moves(f)) ??
    tool.fields.find(f => moves(f)) ??
    tool.fields.find(usable) ??
    tool.fields[0] ??
    null
  );
}

/** 그 칸을 조금 흔든 값 — 범위를 벗어나지 않게 */
function bump(f: FieldSpec): number {
  const up = f.def === 0 ? 1 : f.def * 1.5;
  if (f.max !== undefined && up > f.max) return f.min !== undefined ? Math.max(f.min, f.def * 0.5) : f.def * 0.5;
  return up;
}

const tidy = (n: number): number => {
  if (!Number.isFinite(n)) return 0;
  if (Math.abs(n) >= 100) return Math.round(n);
  if (Math.abs(n) >= 10) return Math.round(n * 10) / 10;
  return Math.round(n * 100) / 100;
};

export interface ScenarioTable {
  pivot: string;
  cols: string[];
  rows: string[][];
}

export function scenarioTable(tool: FormulaTool, lang: FormulaLang): ScenarioTable | null {
  const pivot = pivotField(tool);
  if (!pivot) return null;

  const base = defaultValues(tool);
  const shown = tool.compute(base).slice(0, 3);
  if (shown.length === 0) return null;

  const seen = new Set<number>();
  const values: number[] = [];
  for (const mul of [0.5, 0.75, 1, 1.5, 2]) {
    let v = tidy(pivot.def * mul);
    if (pivot.min !== undefined) v = Math.max(pivot.min, v);
    if (pivot.max !== undefined) v = Math.min(pivot.max, v);
    if (seen.has(v)) continue;
    seen.add(v);
    values.push(v);
  }
  if (values.length < 2) return null;

  const rows = values.map(v => {
    const out = tool.compute({ ...base, [pivot.key]: v });
    return [
      fmt(v, 4),
      ...shown.map((_, i) => {
        const o = out[i] as OutputSpec | undefined;
        return o ? fmt(o.value, o.digits ?? 2) : '—';
      }),
    ];
  });

  return {
    pivot: labelOf(pivot.term, pivot.unit, lang),
    cols: [labelOf(pivot.term, pivot.unit, lang), ...shown.map(o => labelOf(o.term, o.unit, lang))],
    rows,
  };
}

/** 이 도구가 쓰는 용어 가운데 뜻풀이가 있는 것만 */
export function glossaryRows(tool: FormulaTool, lang: FormulaLang): { t: string; d: string }[] {
  const keys = new Set<string>();
  for (const f of tool.fields) keys.add(f.term);
  for (const o of tool.compute(defaultValues(tool))) keys.add(o.term);
  const rows: { t: string; d: string }[] = [];
  for (const k of keys) {
    const d = termDesc(k, lang);
    if (d) rows.push({ t: term(k, lang), d });
  }
  return rows;
}
