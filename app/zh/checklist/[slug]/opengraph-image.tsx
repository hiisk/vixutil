import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { CHECKLISTS_ZH, CHECKLISTS_ZH_MAP } from '@/lib/checklist-zh';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return CHECKLISTS_ZH.map(x => ({ slug: x.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const checklist = CHECKLISTS_ZH_MAP[slug];
  if (!checklist) return new Response('Not found', { status: 404 });

  const total = checklist.sections.reduce((s, sec) => s + sec.items.length, 0);

  return new ImageResponse(
    ogCard({
      icon: checklist.icon,
      eyebrow: `${checklist.category} CHECKLIST`,
      title: checklist.title,
      desc: `${total}项 · ${checklist.desc}`,
      from: '#0ea5e9',
      to: '#06b6d4',
    }),
    { ...size }
  );
}
