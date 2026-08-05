import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template';
import { foodOg } from '@/lib/og-intl';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(foodOg('storage', 'zh-hans'));
}
