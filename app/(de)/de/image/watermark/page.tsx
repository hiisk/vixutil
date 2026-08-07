import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import WatermarkTool from '@/components/image/WatermarkTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'watermark');

export default function DeImageWatermarkPage() {
  return (
    <ImageShellIntl slug="watermark" lang="de">
      <WatermarkTool lang="de" />
    </ImageShellIntl>
  );
}
