import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import WatermarkTool from '@/components/image/WatermarkTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('zh-hans', 'watermark');

export default function ZhHansImageWatermarkPage() {
  return (
    <ImageShellIntl slug="watermark" lang="zh-hans">
      <WatermarkTool lang="zh-hans" />
    </ImageShellIntl>
  );
}
