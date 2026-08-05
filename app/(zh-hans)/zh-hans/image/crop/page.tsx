import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CropTool from '@/components/image/CropTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hans', 'crop');

export default function ZhHansImageCropPage() {
  return (
    <ImageShellIntl slug="crop" lang="zh-hans">
      <CropTool lang="zh-hans" />
    </ImageShellIntl>
  );
}
