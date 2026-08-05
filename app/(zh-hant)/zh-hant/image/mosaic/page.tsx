import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MosaicTool from '@/components/image/MosaicTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'mosaic');

export default function ZhHantImageMosaicPage() {
  return (
    <ImageShellIntl slug="mosaic" lang="zh-hant">
      <MosaicTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
