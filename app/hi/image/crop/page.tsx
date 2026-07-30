import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CropTool from '@/components/image/CropTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'crop');

export default function HiImageCropPage() {
  return (
    <ImageShellIntl slug="crop" lang="hi">
      <CropTool lang="hi" />
    </ImageShellIntl>
  );
}
