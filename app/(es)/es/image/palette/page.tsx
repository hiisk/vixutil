import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import PaletteTool from '@/components/image/PaletteTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'palette');

export default function EsImagePalettePage() {
  return (
    <ImageShellIntl slug="palette" lang="es">
      <PaletteTool lang="es" />
    </ImageShellIntl>
  );
}
