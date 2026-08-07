import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FaviconTool from '@/components/image/FaviconTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hans', 'favicon');

export default function ZhHansImageFaviconPage() {
  return (
    <ImageShellIntl slug="favicon" lang="zh-hans">
      <FaviconTool lang="zh-hans" />
    </ImageShellIntl>
  );
}
