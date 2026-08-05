import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import PaletteTool from '@/components/image/PaletteTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'palette');

export default function EnImagePalettePage() {
  return (
    <ImageShellIntl slug="palette" lang="en">
      <PaletteTool lang="en" />
    </ImageShellIntl>
  );
}
