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
    // 표제가 한자와 같으면 한 번만 적는다. 중국어 간체는 표제가 简体라
    // 번체 원자와 글자가 달라, 둘을 함께 견줘야 "鷄卵有骨 鸡卵有骨"처럼 겹쳐 나오지 않는다.
    title: heading === i.hanja || heading === i.simplified
      ? `${i.hanja} — ${ui.section}`
      : `${i.hanja} ${heading} — ${ui.section}`,
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
