import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CropTool from '@/components/image/CropTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'crop');

export default function DeImageCropPage() {
  return (
    <ImageShellIntl slug="crop" lang="de">
      <CropTool lang="de" />
    </ImageShellIntl>
  );
}
