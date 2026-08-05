import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CropTool from '@/components/image/CropTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('es', 'crop');

export default function EsImageCropPage() {
  return (
    <ImageShellIntl slug="crop" lang="es">
      <CropTool lang="es" />
    </ImageShellIntl>
  );
}
