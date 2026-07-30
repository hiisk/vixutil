import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MosaicTool from '@/components/image/MosaicTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('pt-br', 'mosaic');

export default function PtBrImageMosaicPage() {
  return (
    <ImageShellIntl slug="mosaic" lang="pt-br">
      <MosaicTool lang="pt-br" />
    </ImageShellIntl>
  );
}
