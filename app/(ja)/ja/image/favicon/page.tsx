import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FaviconTool from '@/components/image/FaviconTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('ja', 'favicon');

export default function JaImageFaviconPage() {
  return (
    <ImageShellIntl slug="favicon" lang="ja">
      <FaviconTool lang="ja" />
    </ImageShellIntl>
  );
}
