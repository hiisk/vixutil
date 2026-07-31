import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import PaletteTool from '@/components/image/PaletteTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hans', 'palette');

export default function ZhHansImagePalettePage() {
  return (
    <ImageShellIntl slug="palette" lang="zh-hans">
      <PaletteTool lang="zh-hans" />
    </ImageShellIntl>
  );
}
