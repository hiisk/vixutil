import type { Metadata } from 'next';
import CalcIntlPage, { calcIntlMeta } from '@/components/calc/CalcIntlPage';
import { CALC_INTL_SLUGS } from '@/lib/calc-l10n';
import { prerender } from '@/lib/prerender';

/**
 * 슬러그가 두 칸인 것이 있다 — dev/json, dev/base64처럼. [slug] 한 칸으로는
 * 그것들이 404가 되므로 catch-all로 받는다.
 */
// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return prerender(CALC_INTL_SLUGS.map(slug => ({ slug: slug.split('/') })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  return calcIntlMeta('es', slug.join('/'));
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <CalcIntlPage lang="es" slug={slug.join('/')} />;
}
