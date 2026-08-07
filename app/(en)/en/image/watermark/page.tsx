import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import WatermarkTool from '@/components/image/WatermarkTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'watermark');

export default function EnImageWatermarkPage() {
  return (
    <ImageShellIntl slug="watermark" lang="en">
      <WatermarkTool lang="en" />
    </ImageShellIntl>
  );
}
