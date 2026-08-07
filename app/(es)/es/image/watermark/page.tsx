import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import WatermarkTool from '@/components/image/WatermarkTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'watermark');

export default function EsImageWatermarkPage() {
  return (
    <ImageShellIntl slug="watermark" lang="es">
      <WatermarkTool lang="es" />
    </ImageShellIntl>
  );
}
