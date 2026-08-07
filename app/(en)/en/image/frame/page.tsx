import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FrameTool from '@/components/image/FrameTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'frame');

export default function EnImageFramePage() {
  return (
    <ImageShellIntl slug="frame" lang="en">
      <FrameTool lang="en" />
    </ImageShellIntl>
  );
}
