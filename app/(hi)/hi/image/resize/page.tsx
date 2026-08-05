import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ResizeTool from '@/components/image/ResizeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'resize');

export default function HiImageResizePage() {
  return (
    <ImageShellIntl slug="resize" lang="hi">
      <ResizeTool lang="hi" />
    </ImageShellIntl>
  );
}
