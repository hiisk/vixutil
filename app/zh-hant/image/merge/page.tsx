import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MergeTool from '@/components/image/MergeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'merge');

export default function ZhHantImageMergePage() {
  return (
    <ImageShellIntl slug="merge" lang="zh-hant">
      <MergeTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
