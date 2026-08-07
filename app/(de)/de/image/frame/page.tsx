import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FrameTool from '@/components/image/FrameTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'frame');

export default function DeImageFramePage() {
  return (
    <ImageShellIntl slug="frame" lang="de">
      <FrameTool lang="de" />
    </ImageShellIntl>
  );
}
