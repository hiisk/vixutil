import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FaviconTool from '@/components/image/FaviconTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('fr', 'favicon');

export default function FrImageFaviconPage() {
  return (
    <ImageShellIntl slug="favicon" lang="fr">
      <FaviconTool lang="fr" />
    </ImageShellIntl>
  );
}
