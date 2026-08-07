import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FaviconTool from '@/components/image/FaviconTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'favicon');

export default function DeImageFaviconPage() {
  return (
    <ImageShellIntl slug="favicon" lang="de">
      <FaviconTool lang="de" />
    </ImageShellIntl>
  );
}
