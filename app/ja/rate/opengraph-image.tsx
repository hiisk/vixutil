import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { RATE_SECTION } from '@/lib/rate-section';
import { sectionMeta } from '@/lib/formula/section';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

const meta = sectionMeta(RATE_SECTION, 'ja');

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: RATE_SECTION.ogFrom,
      to: RATE_SECTION.ogTo,
    }),
    { ...size }
  );
}
