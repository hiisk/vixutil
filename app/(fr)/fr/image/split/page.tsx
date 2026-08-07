import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import SplitTool from '@/components/image/SplitTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('fr', 'split');

export default function FrImageSplitPage() {
  return (
    <ImageShellIntl slug="split" lang="fr">
      <SplitTool lang="fr" />
    </ImageShellIntl>
  );
}
