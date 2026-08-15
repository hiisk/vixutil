/* 생성됨(gen.mjs) — 메타 전용. 뷰(<Page/>)는 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 여기서 뷰를 부르면
   서버 그래프가 클라이언트 컴포넌트에 닿아 라우트의 청크가 도로 합쳐진다. */
import type { Metadata } from 'next';
import { EXERCISES, exerciseBySlug, kcal } from '@/lib/body/exercise';
import { EXERCISE_UI } from '@/lib/body/exercise-ui';
import { alternateLanguages10, localeHref, type AnyLocale10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import { prerender } from '@/lib/prerender';
/** 운동 낱장 — `/body/exercise/<슬러그>` 36종 × 열 언어 = 360장 */
export function buildMeta(lang: AnyLocale10) {
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

  const generateStaticParams = () => prerender(EXERCISES.map(x => ({ slug: x.slug })));
  return { generateMetadata, generateStaticParams };
}
