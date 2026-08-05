import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CompressTool from '@/components/image/CompressTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('ja', 'compress');

export default function JaImageCompressPage() {
  return (
    <ImageShellIntl slug="compress" lang="ja">
      <CompressTool lang="ja" />
    </ImageShellIntl>
  );
}
