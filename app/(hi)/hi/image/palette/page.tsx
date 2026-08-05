import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import PaletteTool from '@/components/image/PaletteTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'palette');

export default function HiImagePalettePage() {
  return (
    <ImageShellIntl slug="palette" lang="hi">
      <PaletteTool lang="hi" />
    </ImageShellIntl>
  );
}
