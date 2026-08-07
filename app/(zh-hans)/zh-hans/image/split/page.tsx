import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import SplitTool from '@/components/image/SplitTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hans', 'split');

export default function ZhHansImageSplitPage() {
  return (
    <ImageShellIntl slug="split" lang="zh-hans">
      <SplitTool lang="zh-hans" />
    </ImageShellIntl>
  );
}
