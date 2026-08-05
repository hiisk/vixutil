import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MosaicTool from '@/components/image/MosaicTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'mosaic');

export default function HiImageMosaicPage() {
  return (
    <ImageShellIntl slug="mosaic" lang="hi">
      <MosaicTool lang="hi" />
    </ImageShellIntl>
  );
}
