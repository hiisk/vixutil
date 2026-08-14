import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ColorNamePage from '@/components/ColorNamePage';
import { NAMED_COLORS_8, namedColor } from '@/lib/color/named8';
import { allHexShorts, hexSlug, parseHexSlug } from '@/lib/color/hex-grid';
import { hexLeafProps } from '@/lib/color/hex-leaf';
import { detailMetadata } from '@/lib/color/route';
import { prerender } from '@/lib/prerender';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/color/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return detailMetadata(DATA_KEY[lang], slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    /* hex 낱장은 같은 라우트가 받는다 — lib/color/hex-grid.ts 머리말 */
    const short = parseHexSlug(slug);
    if (short) return <ColorNamePage {...hexLeafProps(short, DATA_KEY[lang])} lang={DATA_KEY[lang]} />;
    const color = namedColor(slug);
    if (!color) notFound();
    return <ColorNamePage color={color} lang={DATA_KEY[lang]} />;
  }

  
  /* ISR을 켜려면 generateStaticParams가 있어야 한다 — revalidate만으로는 라우트가
     동적으로 잡혀 캐시가 안 걸린다. 목록은 prerender()가 걸러서 지금은 빈 배열이다.
     까닭은 tests/prerender-budget.test.ts 머리말. */
  const generateStaticParams = () => prerender([
    ...NAMED_COLORS_8.map(c => ({ slug: c.slug })),
    ...allHexShorts().map(h => ({ slug: hexSlug(h) })),
  ]);

  return { generateMetadata, generateStaticParams, Page };
}
