import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RotateTool from '@/components/image/RotateTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('fr', 'rotate');

export default function FrImageRotatePage() {
  return (
    <ImageShellIntl slug="rotate" lang="fr">
      <RotateTool lang="fr" />
    </ImageShellIntl>
  );
}
