import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CompressTool from '@/components/image/CompressTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('fr', 'compress');

export default function FrImageCompressPage() {
  return (
    <ImageShellIntl slug="compress" lang="fr">
      <CompressTool lang="fr" />
    </ImageShellIntl>
  );
}
