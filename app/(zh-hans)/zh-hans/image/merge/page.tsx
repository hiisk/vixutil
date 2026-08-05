import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MergeTool from '@/components/image/MergeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hans', 'merge');

export default function ZhHansImageMergePage() {
  return (
    <ImageShellIntl slug="merge" lang="zh-hans">
      <MergeTool lang="zh-hans" />
    </ImageShellIntl>
  );
}
