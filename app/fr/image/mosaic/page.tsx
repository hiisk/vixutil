import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MosaicTool from '@/components/image/MosaicTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('fr', 'mosaic');

export default function FrImageMosaicPage() {
  return (
    <ImageShellIntl slug="mosaic" lang="fr">
      <MosaicTool lang="fr" />
    </ImageShellIntl>
  );
}
