import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MosaicTool from '@/components/image/MosaicTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'mosaic');

export default function DeImageMosaicPage() {
  return (
    <ImageShellIntl slug="mosaic" lang="de">
      <MosaicTool lang="de" />
    </ImageShellIntl>
  );
}
