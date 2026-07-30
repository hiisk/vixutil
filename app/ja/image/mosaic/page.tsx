import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MosaicTool from '@/components/image/MosaicTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('ja', 'mosaic');

export default function JaImageMosaicPage() {
  return (
    <ImageShellIntl slug="mosaic" lang="ja">
      <MosaicTool lang="ja" />
    </ImageShellIntl>
  );
}
