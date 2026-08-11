// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { FormulaLang } from './terms.ts';
import type { FormulaText, FormulaTool } from './types.ts';
import { TOOL_L10N } from './tool-l10n.ts';

/**
 * 그 언어의 도구 문구.
 *
 * types.ts에 있던 것을 여기로 뺐다. 저 파일은 ratio·safe 같은 계산 도우미도
 * 들고 있어서 도구 스펙 육백 개가 값으로 import한다 — 거기에 TOOL_L10N이
 * 붙어 있으면 사전 2.6MB가 클라이언트 번들까지 따라온다. 문구는 서버에서만
 * 필요하므로 경계를 파일로 갈라 둔다.
 *
 * ko·en은 도구 데이터에 그대로 붙어 있고, 나머지는 섹션별 사전(lib/rate-l10n/ 등)에
 * 있다. 사전에 없으면 영어로 되돌린다 — 그 도구만 영어가 되고 화면은 깨지지 않는다.
 */
export const textOf = (tool: FormulaTool, lang: FormulaLang): FormulaText => {
  if (lang === 'ko' || lang === 'en') return tool[lang];
  return TOOL_L10N[lang]?.[tool.slug] ?? tool.en;
};
