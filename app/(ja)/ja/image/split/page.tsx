import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import SplitTool from '@/components/image/SplitTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('ja', 'split');

export default function JaImageSplitPage() {
  return (
    <ImageShellIntl slug="split" lang="ja">
      <SplitTool lang="ja" />
    </ImageShellIntl>
  );
}
