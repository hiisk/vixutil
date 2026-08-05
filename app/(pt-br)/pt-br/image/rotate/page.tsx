import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RotateTool from '@/components/image/RotateTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('pt-br', 'rotate');

export default function PtBrImageRotatePage() {
  return (
    <ImageShellIntl slug="rotate" lang="pt-br">
      <RotateTool lang="pt-br" />
    </ImageShellIntl>
  );
}
