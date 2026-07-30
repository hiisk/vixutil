import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import PaletteTool from '@/components/image/PaletteTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('fr', 'palette');

export default function FrImagePalettePage() {
  return (
    <ImageShellIntl slug="palette" lang="fr">
      <PaletteTool lang="fr" />
    </ImageShellIntl>
  );
}
