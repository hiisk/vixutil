import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BmiGridLeaf from '@/components/BmiGridLeaf';
import { bmiCell, allCells, cellSlug, parseCellSlug } from '@/lib/body/bmi-grid';
import { BMI_GRID_UI } from '@/lib/body/bmi-grid-ui';
import { alternateLanguages10, localeHref, localeTag, type AnyLocale10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import { prerender } from '@/lib/prerender';

/**
 * 키 × 몸무게 격자 낱장 — `/body/bmi/<키>-<몸무게>` 4,131칸 × 열 언어 = 41,310장.
 *
 * 앞 두 칸이 `body/bmi`로 고정이라 접두 등록부가 필요 없다 — 등록부(SLUG_ROUTES ·
 * KO_DEEP_LEAVES)에 열쇠 하나만 넣으면 이미 있는 세 칸 라우트가 받는다.
 * 값 낱장(convert)과 다른 점이 그것뿐이다.
 */
export function build(lang: AnyLocale10) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const hit = parseCellSlug(slug);
    if (!hit) return {};
    const c = bmiCell(hit.height, hit.weight);
    const t = BMI_GRID_UI[lang];
    const n = (x: number) => x.toLocaleString(localeTag(lang), { maximumFractionDigits: 1 });
    const route = `/body/bmi/${cellSlug(hit.height, hit.weight)}`;
    return withCard({
      title: t.metaTitle(String(hit.height), String(hit.weight), n(c.bmi)),
      description: t.metaDesc(String(hit.height), String(hit.weight), n(c.bmi), t.ap[c.ap]),
      alternates: { canonical: localeHref(lang, route), languages: alternateLanguages10(route) },
    });
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const hit = parseCellSlug(slug);
    if (!hit) notFound();
    return <BmiGridLeaf height={hit.height} weight={hit.weight} lang={lang} />;
  }

  /* ISR을 켜려면 있어야 한다 — prerender()가 걸러서 지금은 빈 배열이다 */
  const generateStaticParams = () => prerender(allCells().map(c => ({ slug: cellSlug(c.height, c.weight) })));

  return { generateMetadata, generateStaticParams, Page };
}
