import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { GEO_SECTION } from '@/lib/geo-section';
import { sectionMeta } from '@/lib/formula/section';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

const meta = sectionMeta(GEO_SECTION, 'de');

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: GEO_SECTION.ogFrom,
      to: GEO_SECTION.ogTo,
    }),
    { ...size }
  );
}
