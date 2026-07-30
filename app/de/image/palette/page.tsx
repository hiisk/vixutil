import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import PaletteTool from '@/components/image/PaletteTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'palette');

export default function DeImagePalettePage() {
  return (
    <ImageShellIntl slug="palette" lang="de">
      <PaletteTool lang="de" />
    </ImageShellIntl>
  );
}
