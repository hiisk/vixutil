import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import SplitTool from '@/components/image/SplitTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'split');

export default function EsImageSplitPage() {
  return (
    <ImageShellIntl slug="split" lang="es">
      <SplitTool lang="es" />
    </ImageShellIntl>
  );
}
