import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MosaicTool from '@/components/image/MosaicTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hans', 'mosaic');

export default function ZhHansImageMosaicPage() {
  return (
    <ImageShellIntl slug="mosaic" lang="zh-hans">
      <MosaicTool lang="zh-hans" />
    </ImageShellIntl>
  );
}
