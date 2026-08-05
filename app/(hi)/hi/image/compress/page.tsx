import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CompressTool from '@/components/image/CompressTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'compress');

export default function HiImageCompressPage() {
  return (
    <ImageShellIntl slug="compress" lang="hi">
      <CompressTool lang="hi" />
    </ImageShellIntl>
  );
}
