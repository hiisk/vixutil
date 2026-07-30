import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CompressTool from '@/components/image/CompressTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('pt-br', 'compress');

export default function PtBrImageCompressPage() {
  return (
    <ImageShellIntl slug="compress" lang="pt-br">
      <CompressTool lang="pt-br" />
    </ImageShellIntl>
  );
}
