import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { COUNTRY_UI, COUNTRY_SECTION } from '@/lib/country-ui';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

const ui = COUNTRY_UI['de'];

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🧭',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: COUNTRY_SECTION.ogFrom,
      to: COUNTRY_SECTION.ogTo,
    }),
  );
}
