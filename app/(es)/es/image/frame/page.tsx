import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FrameTool from '@/components/image/FrameTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'frame');

export default function EsImageFramePage() {
  return (
    <ImageShellIntl slug="frame" lang="es">
      <FrameTool lang="es" />
    </ImageShellIntl>
  );
}
