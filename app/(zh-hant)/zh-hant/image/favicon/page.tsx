import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FaviconTool from '@/components/image/FaviconTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'favicon');

export default function ZhHantImageFaviconPage() {
  return (
    <ImageShellIntl slug="favicon" lang="zh-hant">
      <FaviconTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
