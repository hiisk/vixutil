import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MosaicTool from '@/components/image/MosaicTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'mosaic');

export default function EsImageMosaicPage() {
  return (
    <ImageShellIntl slug="mosaic" lang="es">
      <MosaicTool lang="es" />
    </ImageShellIntl>
  );
}
