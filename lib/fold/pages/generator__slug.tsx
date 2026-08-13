import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { GeneratorIntlDetail, generatorIntlDetailMeta } from '@/components/GeneratorIntlPage';
import { GENERATORS_INTL, GENERATORS_INTL_MAP } from '@/lib/generator-l10n';
import { prerender } from '@/lib/prerender';
import type { FoldLang } from '../lang';
import type { GeneratorIntlLang } from '@/lib/generator-l10n';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/generator/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  /* en은 등록부의 EN_*_OVERRIDES가 딴 모듈로 받는다 — 여기는 여덟 언어만 온다 */
  const glang = lang as GeneratorIntlLang;
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return generatorIntlDetailMeta(glang, slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const gen = GENERATORS_INTL_MAP[glang][slug];
    if (!gen) notFound();
    return <GeneratorIntlDetail lang={glang} gen={gen} />;
  }

  
  /* ISR을 켜려면 generateStaticParams가 있어야 한다 — revalidate만으로는 라우트가
     동적으로 잡혀 캐시가 안 걸린다. 목록은 prerender()가 걸러 지금은 빈 배열이다.
     까닭은 tests/prerender-budget.test.ts 머리말. */
  const generateStaticParams = () => prerender(GENERATORS_INTL[glang].map(g => ({ slug: g.slug })));

  return { generateMetadata, generateStaticParams, Page };
}
