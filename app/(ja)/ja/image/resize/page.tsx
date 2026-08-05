import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ResizeTool from '@/components/image/ResizeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('ja', 'resize');

export default function JaImageResizePage() {
  return (
    <ImageShellIntl slug="resize" lang="ja">
      <ResizeTool lang="ja" />
    </ImageShellIntl>
  );
}
