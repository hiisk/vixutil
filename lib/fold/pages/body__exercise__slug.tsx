import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ExerciseLeaf from '@/components/ExerciseLeaf';
import { EXERCISES, exerciseBySlug, kcal } from '@/lib/body/exercise';
import { EXERCISE_UI } from '@/lib/body/exercise-ui';
import { alternateLanguages10, localeHref, type AnyLocale10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import { prerender } from '@/lib/prerender';

/** 운동 낱장 — `/body/exercise/<슬러그>` 36종 × 열 언어 = 360장 */
export function build(lang: AnyLocale10) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const x = exerciseBySlug(slug);
    if (!x) return {};
    const t = EXERCISE_UI[lang];
    const k = String(kcal(x.met, 70, 30));
    const route = `/body/exercise/${slug}`;
    return withCard({
      title: t.metaTitle(x.name[lang], k),
      description: t.metaDesc(x.name[lang], String(x.met), k),
      alternates: { canonical: localeHref(lang, route), languages: alternateLanguages10(route) },
    });
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!exerciseBySlug(slug)) notFound();
    return <ExerciseLeaf slug={slug} lang={lang} />;
  }

  const generateStaticParams = () => prerender(EXERCISES.map(x => ({ slug: x.slug })));
  return { generateMetadata, generateStaticParams, Page };
}
