import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FrameTool from '@/components/image/FrameTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('ja', 'frame');

export default function JaImageFramePage() {
  return (
    <ImageShellIntl slug="frame" lang="ja">
      <FrameTool lang="ja" />
    </ImageShellIntl>
  );
}
