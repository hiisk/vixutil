import { notFound } from 'next/navigation';
import CalcShellIntl from '@/components/CalcShellIntl';
import UnitWeightIntl from '@/components/calc/UnitWeightIntl';
import UnitLengthIntl from '@/components/calc/UnitLengthIntl';
import { calcCopy, relatedCalcs } from '@/lib/calc-l10n';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { alternateLanguages10, localeHref, openGraphFor } from '@/lib/locales';

/**
 * 다국어 계산기 상세 한 장.
 *
 * 슬러그마다 계산 컴포넌트가 다르므로 여기서 갈라 준다. 문구는 calcCopy가,
 * 계산은 아래 표가 맡는다 — 새 계산기를 더할 때 고칠 곳이 둘이지만, 하나로
 * 합치려면 컴포넌트를 문자열로 들고 있어야 해서 타입이 풀린다.
 */
const TOOLS: Record<string, (p: { lang: CalcLang }) => React.ReactNode> = {
  'unit-weight': UnitWeightIntl,
  'unit-length': UnitLengthIntl,
};

export function calcIntlMeta(lang: CalcLang, slug: string) {
  const c = calcCopy(lang, slug);
  if (!c) return {};
  const route = `/calculator/${slug}`;
  return {
    title: c.title,
    description: c.desc,
    openGraph: openGraphFor(lang),
    alternates: { canonical: localeHref(lang, route), languages: alternateLanguages10(route) },
  };
}

export default function CalcIntlPage({ lang, slug }: { lang: CalcLang; slug: string }) {
  const c = calcCopy(lang, slug);
  const Tool = TOOLS[slug];
  if (!c || !Tool) notFound();

  return (
    <CalcShellIntl
      lang={lang}
      slug={slug}
      title={c.title}
      description={c.desc}
      intro={c.intro}
      faq={c.faq}
      related={relatedCalcs(lang, slug)}
    >
      <Tool lang={lang} />
    </CalcShellIntl>
  );
}
