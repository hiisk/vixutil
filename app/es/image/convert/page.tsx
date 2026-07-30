import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ConvertTool from '@/components/image/ConvertTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'convert');

export default function EsImageConvertPage() {
  return (
    <ImageShellIntl slug="convert" lang="es">
      <ConvertTool lang="es" />
    </ImageShellIntl>
  );
}
