import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ResizeTool from '@/components/image/ResizeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('pt-br', 'resize');

export default function PtBrImageResizePage() {
  return (
    <ImageShellIntl slug="resize" lang="pt-br">
      <ResizeTool lang="pt-br" />
    </ImageShellIntl>
  );
}
