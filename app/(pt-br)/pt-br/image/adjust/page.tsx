import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import AdjustTool from '@/components/image/AdjustTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('pt-br', 'adjust');

export default function PtBrImageAdjustPage() {
  return (
    <ImageShellIntl slug="adjust" lang="pt-br">
      <AdjustTool lang="pt-br" />
    </ImageShellIntl>
  );
}
