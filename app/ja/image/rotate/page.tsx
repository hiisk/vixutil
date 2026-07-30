import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RotateTool from '@/components/image/RotateTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('ja', 'rotate');

export default function JaImageRotatePage() {
  return (
    <ImageShellIntl slug="rotate" lang="ja">
      <RotateTool lang="ja" />
    </ImageShellIntl>
  );
}
