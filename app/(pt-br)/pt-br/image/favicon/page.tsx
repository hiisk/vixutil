import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FaviconTool from '@/components/image/FaviconTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('pt-br', 'favicon');

export default function PtBrImageFaviconPage() {
  return (
    <ImageShellIntl slug="favicon" lang="pt-br">
      <FaviconTool lang="pt-br" />
    </ImageShellIntl>
  );
}
