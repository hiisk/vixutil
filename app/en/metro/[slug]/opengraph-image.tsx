import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { METRO_LINES, metroLine } from '@/lib/metro-lines';
import { METRO_UI } from '@/lib/metro/ui';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return METRO_LINES.map(l => ({ slug: l.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const line = metroLine(slug);
  const ui = METRO_UI['en'];
  if (!line) return new ImageResponse(ogCard({ icon: '🚇', eyebrow: ui.section, title: ui.hubTitle, desc: ui.hubLead, from: '#475569', to: '#0f172a' }), { ...size });
  const t = line['en'];
  return new ImageResponse(
    ogCard({
      icon: line.icon,
      eyebrow: `${ui.section} · ${t.country}`,
      title: `${t.city} ${t.line}`,
      desc: `${line.stations.length} ${ui.stations}`,
      from: line.color,
      to: '#0f172a',
    }),
    { ...size }
  );
}
