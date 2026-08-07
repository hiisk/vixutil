import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import AdjustTool from '@/components/image/AdjustTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('fr', 'adjust');

export default function FrImageAdjustPage() {
  return (
    <ImageShellIntl slug="adjust" lang="fr">
      <AdjustTool lang="fr" />
    </ImageShellIntl>
  );
}
