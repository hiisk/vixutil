import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MosaicTool from '@/components/image/MosaicTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'mosaic');

export default function EnImageMosaicPage() {
  return (
    <ImageShellIntl slug="mosaic" lang="en">
      <MosaicTool lang="en" />
    </ImageShellIntl>
  );
}
