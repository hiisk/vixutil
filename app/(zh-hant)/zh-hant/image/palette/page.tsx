import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import PaletteTool from '@/components/image/PaletteTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'palette');

export default function ZhHantImagePalettePage() {
  return (
    <ImageShellIntl slug="palette" lang="zh-hant">
      <PaletteTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
