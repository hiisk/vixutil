import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import PaletteTool from '@/components/image/PaletteTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('pt-br', 'palette');

export default function PtBrImagePalettePage() {
  return (
    <ImageShellIntl slug="palette" lang="pt-br">
      <PaletteTool lang="pt-br" />
    </ImageShellIntl>
  );
}
