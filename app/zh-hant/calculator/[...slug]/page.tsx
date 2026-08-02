import type { Metadata } from 'next';
import CalcIntlPage, { calcIntlMeta } from '@/components/calc/CalcIntlPage';
import { CALC_INTL_SLUGS } from '@/lib/calc-l10n';

/**
 * 슬러그가 두 칸인 것이 있다 — dev/json, dev/base64처럼. [slug] 한 칸으로는
 * 그것들이 404가 되므로 catch-all로 받는다.
 */
export function generateStaticParams() {
  return CALC_INTL_SLUGS.map(slug => ({ slug: slug.split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  return calcIntlMeta('zh-hant', slug.join('/'));
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <CalcIntlPage lang="zh-hant" slug={slug.join('/')} />;
}
