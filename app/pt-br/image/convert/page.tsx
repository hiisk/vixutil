import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ConvertTool from '@/components/image/ConvertTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('pt-br', 'convert');

export default function PtBrImageConvertPage() {
  return (
    <ImageShellIntl slug="convert" lang="pt-br">
      <ConvertTool lang="pt-br" />
    </ImageShellIntl>
  );
}
