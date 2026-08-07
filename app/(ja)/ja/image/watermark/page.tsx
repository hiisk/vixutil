import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import WatermarkTool from '@/components/image/WatermarkTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('ja', 'watermark');

export default function JaImageWatermarkPage() {
  return (
    <ImageShellIntl slug="watermark" lang="ja">
      <WatermarkTool lang="ja" />
    </ImageShellIntl>
  );
}
