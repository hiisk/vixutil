import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { HANJA_UI, HANJA_SECTION } from '@/lib/hanja-ui';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

const ui = HANJA_UI['zh-hant'];

export default function Image() {
  return ogImage(
    ogCard({
      icon: '📖',
      eyebrow: ui.section,
      title: ui.hubTitle,
      desc: ui.hubLead,
      from: HANJA_SECTION.ogFrom,
      to: HANJA_SECTION.ogTo,
    }),
  );
}
