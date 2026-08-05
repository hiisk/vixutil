import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ResizeTool from '@/components/image/ResizeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'resize');

export default function ZhHantImageResizePage() {
  return (
    <ImageShellIntl slug="resize" lang="zh-hant">
      <ResizeTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
