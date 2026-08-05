import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ConvertTool from '@/components/image/ConvertTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('fr', 'convert');

export default function FrImageConvertPage() {
  return (
    <ImageShellIntl slug="convert" lang="fr">
      <ConvertTool lang="fr" />
    </ImageShellIntl>
  );
}
