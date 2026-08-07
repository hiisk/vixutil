import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import AdjustTool from '@/components/image/AdjustTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hans', 'adjust');

export default function ZhHansImageAdjustPage() {
  return (
    <ImageShellIntl slug="adjust" lang="zh-hans">
      <AdjustTool lang="zh-hans" />
    </ImageShellIntl>
  );
}
