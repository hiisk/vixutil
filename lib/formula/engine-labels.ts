// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions).
// JSX를 두지 않는다 — node --test가 .tsx를 못 읽어서 검사에서 부를 수 없다.
import type { FormulaTool } from './types.ts';
import { term, unitLabel, type FormulaLang } from './terms.ts';

/**
 * 그 도구가 쓰는 용어·단위만 골라 그 언어 라벨로 푼다.
 *
 * 클라이언트 엔진에서 term()을 부르면 여덟 언어 사전 전체가 번들에 딸려 온다.
 * 도구 하나가 쓰는 열쇠는 열 개 남짓이므로 서버에서 그것만 풀어 넘긴다.
 * 출력 항목은 입력과 무관하게 고정이라(육백서른다섯 도구 전부 확인) 기본값으로
 * 한 번 계산해 열쇠를 모으면 된다 — 검사가 그 사실을 지킨다.
 */
export function engineLabels(tool: FormulaTool, lang: FormulaLang) {
  const values: Record<string, number> = {};
  for (const f of tool.fields) values[f.key] = f.def;
  const termKeys = new Set<string>();
  const unitKeys = new Set<string>(['none']);
  for (const f of tool.fields) { termKeys.add(f.term); if (f.unit) unitKeys.add(f.unit); }
  for (const o of tool.compute(values)) { termKeys.add(o.term); if (o.unit) unitKeys.add(o.unit); }
  for (const m of tool.formula.matchAll(/\{(\w+)\}/g)) termKeys.add(m[1]);
  return {
    labels: Object.fromEntries([...termKeys].map(k => [k, term(k, lang)])),
    units: Object.fromEntries([...unitKeys].map(k => [k, unitLabel(k, lang)])),
  };
}
