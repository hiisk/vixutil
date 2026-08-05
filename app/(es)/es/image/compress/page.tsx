import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CompressTool from '@/components/image/CompressTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'compress');

export default function EsImageCompressPage() {
  return (
    <ImageShellIntl slug="compress" lang="es">
      <CompressTool lang="es" />
    </ImageShellIntl>
  );
}
