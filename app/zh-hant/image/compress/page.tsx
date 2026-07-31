import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import CompressTool from '@/components/image/CompressTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'compress');

export default function ZhHantImageCompressPage() {
  return (
    <ImageShellIntl slug="compress" lang="zh-hant">
      <CompressTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
