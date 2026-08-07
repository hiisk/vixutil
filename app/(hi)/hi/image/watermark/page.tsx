import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import WatermarkTool from '@/components/image/WatermarkTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'watermark');

export default function HiImageWatermarkPage() {
  return (
    <ImageShellIntl slug="watermark" lang="hi">
      <WatermarkTool lang="hi" />
    </ImageShellIntl>
  );
}
