import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import AdjustTool from '@/components/image/AdjustTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('ja', 'adjust');

export default function JaImageAdjustPage() {
  return (
    <ImageShellIntl slug="adjust" lang="ja">
      <AdjustTool lang="ja" />
    </ImageShellIntl>
  );
}
