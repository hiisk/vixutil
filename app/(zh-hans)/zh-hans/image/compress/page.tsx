import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CompressTool from '@/components/image/CompressTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hans', 'compress');

export default function ZhHansImageCompressPage() {
  return (
    <ImageShellIntl slug="compress" lang="zh-hans">
      <CompressTool lang="zh-hans" />
    </ImageShellIntl>
  );
}
