import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FrameTool from '@/components/image/FrameTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'frame');

export default function HiImageFramePage() {
  return (
    <ImageShellIntl slug="frame" lang="hi">
      <FrameTool lang="hi" />
    </ImageShellIntl>
  );
}
