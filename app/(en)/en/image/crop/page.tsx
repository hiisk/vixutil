import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CropTool from '@/components/image/CropTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'crop');

export default function EnImageCropPage() {
  return (
    <ImageShellIntl slug="crop" lang="en">
      <CropTool lang="en" />
    </ImageShellIntl>
  );
}
