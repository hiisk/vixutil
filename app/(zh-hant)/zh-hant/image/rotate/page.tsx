import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RotateTool from '@/components/image/RotateTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'rotate');

export default function ZhHantImageRotatePage() {
  return (
    <ImageShellIntl slug="rotate" lang="zh-hant">
      <RotateTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
