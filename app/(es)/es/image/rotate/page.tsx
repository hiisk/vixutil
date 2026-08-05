import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RotateTool from '@/components/image/RotateTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'rotate');

export default function EsImageRotatePage() {
  return (
    <ImageShellIntl slug="rotate" lang="es">
      <RotateTool lang="es" />
    </ImageShellIntl>
  );
}
