import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ResizeTool from '@/components/image/ResizeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'resize');

export default function EsImageResizePage() {
  return (
    <ImageShellIntl slug="resize" lang="es">
      <ResizeTool lang="es" />
    </ImageShellIntl>
  );
}
