import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import AdjustTool from '@/components/image/AdjustTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'adjust');

export default function EsImageAdjustPage() {
  return (
    <ImageShellIntl slug="adjust" lang="es">
      <AdjustTool lang="es" />
    </ImageShellIntl>
  );
}
