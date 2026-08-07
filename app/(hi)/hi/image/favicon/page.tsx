import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FaviconTool from '@/components/image/FaviconTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'favicon');

export default function HiImageFaviconPage() {
  return (
    <ImageShellIntl slug="favicon" lang="hi">
      <FaviconTool lang="hi" />
    </ImageShellIntl>
  );
}
