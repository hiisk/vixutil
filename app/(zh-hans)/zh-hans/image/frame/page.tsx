import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FrameTool from '@/components/image/FrameTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hans', 'frame');

export default function ZhHansImageFramePage() {
  return (
    <ImageShellIntl slug="frame" lang="zh-hans">
      <FrameTool lang="zh-hans" />
    </ImageShellIntl>
  );
}
