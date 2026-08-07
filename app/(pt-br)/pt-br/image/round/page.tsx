import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RoundTool from '@/components/image/RoundTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('pt-br', 'round');

export default function PtBrImageRoundPage() {
  return (
    <ImageShellIntl slug="round" lang="pt-br">
      <RoundTool lang="pt-br" />
    </ImageShellIntl>
  );
}
