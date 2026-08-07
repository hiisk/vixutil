import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import SplitTool from '@/components/image/SplitTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('pt-br', 'split');

export default function PtBrImageSplitPage() {
  return (
    <ImageShellIntl slug="split" lang="pt-br">
      <SplitTool lang="pt-br" />
    </ImageShellIntl>
  );
}
