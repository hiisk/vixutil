import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import MergeTool from '@/components/image/MergeTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('ja', 'merge');

export default function JaImageMergePage() {
  return (
    <ImageShellIntl slug="merge" lang="ja">
      <MergeTool lang="ja" />
    </ImageShellIntl>
  );
}
