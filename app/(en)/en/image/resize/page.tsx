import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ResizeTool from '@/components/image/ResizeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'resize');

export default function EnImageResizePage() {
  return (
    <ImageShellIntl slug="resize" lang="en">
      <ResizeTool lang="en" />
    </ImageShellIntl>
  );
}
