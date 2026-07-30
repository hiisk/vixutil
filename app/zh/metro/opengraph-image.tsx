import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { METRO_UI } from '@/lib/metro/ui';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

const ui = METRO_UI['zh'];

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🚇',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: '#475569',
      to: '#0f172a',
    }),
    { ...size }
  );
}
