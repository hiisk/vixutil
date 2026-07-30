import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MergeTool from '@/components/image/MergeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('fr', 'merge');

export default function FrImageMergePage() {
  return (
    <ImageShellIntl slug="merge" lang="fr">
      <MergeTool lang="fr" />
    </ImageShellIntl>
  );
}
