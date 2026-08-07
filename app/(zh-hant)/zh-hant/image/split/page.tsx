import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import SplitTool from '@/components/image/SplitTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'split');

export default function ZhHantImageSplitPage() {
  return (
    <ImageShellIntl slug="split" lang="zh-hant">
      <SplitTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
