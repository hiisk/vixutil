import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FrameTool from '@/components/image/FrameTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('pt-br', 'frame');

export default function PtBrImageFramePage() {
  return (
    <ImageShellIntl slug="frame" lang="pt-br">
      <FrameTool lang="pt-br" />
    </ImageShellIntl>
  );
}
