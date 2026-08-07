import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import FrameTool from '@/components/image/FrameTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'frame');

export default function ZhHantImageFramePage() {
  return (
    <ImageShellIntl slug="frame" lang="zh-hant">
      <FrameTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
