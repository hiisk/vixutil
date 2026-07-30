import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import HanjaPage from '@/components/HanjaPage';
import { IDIOMS, idiomBySlug } from '@/lib/hanja-tools';
import { HANJA_UI, hanjaAlternates, idiomHeading } from '@/lib/hanja-ui';

export function generateStaticParams() {
  return IDIOMS.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = idiomBySlug(slug);
  if (!i) return {};
  const t = i['ko'];
  const ui = HANJA_UI['ko'];
  // 중국어는 표제가 간체라 정자와 같을 때가 있다 — 같으면 제목에 한 번만 적는다
  const heading = idiomHeading(i, 'ko');
  return {
    title: heading === i.hanja ? `${i.hanja} — ${ui.section}` : `${i.hanja} ${heading} — ${ui.section}`,
    description: `${t.meaning} ${t.origin}`,
    alternates: { canonical: '/hanja/' + slug, languages: hanjaAlternates(slug) },
  };
}

export default async function HanjaDetailKO({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = idiomBySlug(slug);
  if (!i) notFound();
  return <HanjaPage idiom={i} lang="ko" />;
}
