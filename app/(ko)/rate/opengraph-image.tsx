import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { RATE_SECTION } from '@/lib/rate-section';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

const meta = RATE_SECTION.meta['ko'];

export default function Image() {
  return ogImage(
    ogCard({
      icon: '📐',
      eyebrow: meta.section,
      title: meta.hubTitle,
      desc: meta.hubLead,
      from: RATE_SECTION.ogFrom,
      to: RATE_SECTION.ogTo,
    }),
  );
}
