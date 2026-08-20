import { ELEMENT_INFO, type Element } from '@/lib/saju-data';
import { SAJU_L10N, type SajuL10nLang } from '@/lib/saju-l10n/index';
import { TOPIC_L10N } from '@/lib/saju-topics-l10n/index';
import type { EvidenceRow } from '@/lib/saju-topics';
import type { AnyLocale10 } from '@/lib/locales';

/**
 * 근거 줄을 그 언어의 말로 옮겨 그린다.
 *
 * 값은 lib/saju-topics.ts가 열쇠로만 넘긴다(한자·십성 이름·오행·개수). 여기서
 * 언어별 표를 찾아 말로 바꾼다 — 한국어 표는 lib/saju-data.ts에, 아홉 언어 표는
 * lib/saju-l10n/에 있어서 찾는 곳이 갈린다.
 */
export function evidenceValue(lang: AnyLocale10, r: EvidenceRow): string {
  const c = TOPIC_L10N[lang];
  const sc = lang === 'ko' ? null : SAJU_L10N[lang as SajuL10nLang];
  const elLabel = (el: Element) => (sc ? sc.elements[el].label : ELEMENT_INFO[el].label);
  const starLabel = (s: string) => (sc ? (sc.star[s] ?? s) : s);

  if (r.hanja !== undefined) return r.hanja + (r.el ? ` · ${elLabel(r.el)}` : '');
  if (r.star !== undefined) return r.star ? starLabel(r.star) : c.ui.none;
  if (r.el !== undefined) return r.el ? elLabel(r.el) : c.ui.none;
  if (r.count !== undefined) return c.ui.countOf.replace('{n}', String(r.count));
  if (r.on !== undefined) {
    // 강약만 있음/없음이 아니라 신강·신약으로 읽는다
    if (r.term === 'strength') return r.on ? c.ui.strong : c.ui.weak;
    return r.on ? c.ui.yes : c.ui.no;
  }
  return c.ui.none;
}

export const evidenceTerm = (lang: AnyLocale10, term: string) =>
  TOPIC_L10N[lang].terms[term] ?? term;

export default function SajuEvidence({ lang, rows }: { lang: AnyLocale10; rows: EvidenceRow[] }) {
  return (
    <dl className="grid grid-cols-2 gap-2">
      {rows.map(r => (
        <div key={r.term} className="rounded-xl bg-white/70 dark:bg-slate-900/60 px-3 py-2.5">
          <dt className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-0.5">{evidenceTerm(lang, r.term)}</dt>
          <dd className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">{evidenceValue(lang, r)}</dd>
        </div>
      ))}
    </dl>
  );
}
