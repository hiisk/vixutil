import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ResizeTool from '@/components/image/ResizeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hans', 'resize');

export default function ZhHansImageResizePage() {
  return (
    <ImageShellIntl slug="resize" lang="zh-hans">
      <ResizeTool lang="zh-hans" />
    </ImageShellIntl>
  );
}
