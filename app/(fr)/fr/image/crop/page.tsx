import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CropTool from '@/components/image/CropTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('fr', 'crop');

export default function FrImageCropPage() {
  return (
    <ImageShellIntl slug="crop" lang="fr">
      <CropTool lang="fr" />
    </ImageShellIntl>
  );
}
