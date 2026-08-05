import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MergeTool from '@/components/image/MergeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'merge');

export default function EsImageMergePage() {
  return (
    <ImageShellIntl slug="merge" lang="es">
      <MergeTool lang="es" />
    </ImageShellIntl>
  );
}
