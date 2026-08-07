import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import WatermarkTool from '@/components/image/WatermarkTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hant', 'watermark');

export default function ZhHantImageWatermarkPage() {
  return (
    <ImageShellIntl slug="watermark" lang="zh-hant">
      <WatermarkTool lang="zh-hant" />
    </ImageShellIntl>
  );
}
