/* ────────────────────────────────────────────────
   사주(四柱) 영어·중국어 데이터.

   사주는 중화권에서 八字로 본토 문화라 zh 수요가 크다. 한자(甲子·乙丑…)는
   세 언어가 공유하므로 그대로 쓰고, 해석 문구만 언어별로 새로 썼다.

   영어권에는 대응 용어가 없어 통용되는 표기를 따랐다 — 天干은 Heavenly Stems,
   地支는 Earthly Branches, 十神은 Ten Gods, 大運은 Luck Pillars.

   계산(간지 산출·십성 판정·대운)은 saju-data.ts를 그대로 쓴다. 여기에는
   문구만 있고 계산은 없다 — 같은 생년월일이면 세 언어가 같은 명식을 낸다.
──────────────────────────────────────────────── */
import { spreadSaju, type SajuL10nLang } from './saju-l10n/index.ts';
import type { StemCopy, SipseongCopy } from './saju-l10n/types.ts';
import { DATE_FORM } from './fortune-form-intl.ts';

export type SajuIntlLang = SajuL10nLang;

/* ── 오행 ── */
export const ELEMENT_INTL: Record<SajuIntlLang, Record<string, { label: string; advice: string; shortage: string }>> =
  spreadSaju('elements');

/* ── 천간 10개 ── */
export type StemIntl = StemCopy;
export const STEMS_INTL: Record<SajuIntlLang, Record<string, StemIntl>> = spreadSaju('stems');

/* ── 지지 12개 ── */
export const BRANCHES_INTL: Record<SajuIntlLang, Record<string, { kor: string; animal: string; season: string }>> =
  spreadSaju('branches');

/* ── 십성 10개 ── */
export type SipseongIntl = SipseongCopy;
export const SIPSEONG_INTL: Record<SajuIntlLang, Record<string, SipseongIntl>> = spreadSaju('sipseong');

/* ── UI 문구 ──
   생년월일 입력 아홉 줄은 다른 운세 도구와 같은 것을 쓴다 — 같은 오류 문구를
   여기 한 번 더 적으면 곧 한쪽만 고쳐진 채로 남는다. */
const UI = spreadSaju('ui');
export const SAJU_UI: Record<SajuIntlLang, Record<string, string>> = Object.fromEntries(
  (Object.keys(UI) as SajuIntlLang[]).map(l => [l, { ...DATE_FORM[l], ...UI[l] }]),
) as unknown as Record<SajuIntlLang, Record<string, string>>;
