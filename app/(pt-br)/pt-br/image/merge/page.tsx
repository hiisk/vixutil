import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MergeTool from '@/components/image/MergeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('pt-br', 'merge');

export default function PtBrImageMergePage() {
  return (
    <ImageShellIntl slug="merge" lang="pt-br">
      <MergeTool lang="pt-br" />
    </ImageShellIntl>
  );
}
