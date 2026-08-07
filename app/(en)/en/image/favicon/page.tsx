import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FaviconTool from '@/components/image/FaviconTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'favicon');

export default function EnImageFaviconPage() {
  return (
    <ImageShellIntl slug="favicon" lang="en">
      <FaviconTool lang="en" />
    </ImageShellIntl>
  );
}
