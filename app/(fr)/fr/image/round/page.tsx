import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RoundTool from '@/components/image/RoundTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('fr', 'round');

export default function FrImageRoundPage() {
  return (
    <ImageShellIntl slug="round" lang="fr">
      <RoundTool lang="fr" />
    </ImageShellIntl>
  );
}
