import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FaviconTool from '@/components/image/FaviconTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'favicon');

export default function EsImageFaviconPage() {
  return (
    <ImageShellIntl slug="favicon" lang="es">
      <FaviconTool lang="es" />
    </ImageShellIntl>
  );
}
