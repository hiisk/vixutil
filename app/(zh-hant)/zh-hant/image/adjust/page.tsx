import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import AdjustTool from '@/components/image/AdjustTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'adjust');

export default function ZhHantImageAdjustPage() {
  return (
    <ImageShellIntl slug="adjust" lang="zh-hant">
      <AdjustTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
