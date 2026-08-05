import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import ResizeTool from '@/components/image/ResizeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'resize');

export default function DeImageResizePage() {
  return (
    <ImageShellIntl slug="resize" lang="de">
      <ResizeTool lang="de" />
    </ImageShellIntl>
  );
}
