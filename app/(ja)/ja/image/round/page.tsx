import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RoundTool from '@/components/image/RoundTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('ja', 'round');

export default function JaImageRoundPage() {
  return (
    <ImageShellIntl slug="round" lang="ja">
      <RoundTool lang="ja" />
    </ImageShellIntl>
  );
}
