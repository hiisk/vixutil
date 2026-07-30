import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CropTool from '@/components/image/CropTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('ja', 'crop');

export default function JaImageCropPage() {
  return (
    <ImageShellIntl slug="crop" lang="ja">
      <CropTool lang="ja" />
    </ImageShellIntl>
  );
}
