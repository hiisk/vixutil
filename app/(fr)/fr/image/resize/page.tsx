import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ResizeTool from '@/components/image/ResizeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('fr', 'resize');

export default function FrImageResizePage() {
  return (
    <ImageShellIntl slug="resize" lang="fr">
      <ResizeTool lang="fr" />
    </ImageShellIntl>
  );
}
