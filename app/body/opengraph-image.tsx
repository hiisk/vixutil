import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { BODY_SECTION } from '@/lib/body-section';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

const meta = BODY_SECTION.meta['ko'];

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🩺',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: BODY_SECTION.ogFrom,
      to: BODY_SECTION.ogTo,
    }),
    { ...size }
  );
}
