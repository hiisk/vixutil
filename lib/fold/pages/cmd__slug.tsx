import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CmdPage from '@/components/cmd/CmdPage';
import { detailMetadata, cmdParams } from '@/lib/cmd/route';
import { cmdItem } from '@/lib/cmd/list';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 낱장은 아홉 언어가 이 모듈 하나를 쓴다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return detailMetadata(DATA_KEY[lang], slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!cmdItem(slug)) notFound();
    return <CmdPage slug={slug} lang={DATA_KEY[lang]} />;
  }

  
  /*
   * ── ISR을 켜려면 generateStaticParams가 있어야 한다 (2026-08-13) ──
   * 없으면 [slug] 라우트가 **동적**으로 잡혀(빌드 표에 ƒ) 캐시를 아예 쓰지
   * 않는다. revalidate만 적어도 듣지 않는다 — 실제로 그렇게 해 보고 헤더가
   * no-store로 남는 것을 확인했다. 목록은 비어 있어도 된다(prerender()가 지금
   * 빈 배열이다) — dynamicParams가 켜져 있어 처음 열릴 때 만들어 캐시에 넣는다.
   */
  const generateStaticParams = () => cmdParams();

  return { generateMetadata, generateStaticParams, Page };
}
