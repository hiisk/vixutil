import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CropTool from '@/components/image/CropTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'crop');

export default function ZhHantImageCropPage() {
  return (
    <ImageShellIntl slug="crop" lang="zh-hant">
      <CropTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
