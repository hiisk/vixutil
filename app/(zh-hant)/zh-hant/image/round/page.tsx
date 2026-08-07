import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import RoundTool from '@/components/image/RoundTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'round');

export default function ZhHantImageRoundPage() {
  return (
    <ImageShellIntl slug="round" lang="zh-hant">
      <RoundTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
