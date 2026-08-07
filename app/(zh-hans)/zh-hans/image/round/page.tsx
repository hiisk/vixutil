import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RoundTool from '@/components/image/RoundTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hans', 'round');

export default function ZhHansImageRoundPage() {
  return (
    <ImageShellIntl slug="round" lang="zh-hans">
      <RoundTool lang="zh-hans" />
    </ImageShellIntl>
  );
}
