import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import WatermarkTool from '@/components/image/WatermarkTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('pt-br', 'watermark');

export default function PtBrImageWatermarkPage() {
  return (
    <ImageShellIntl slug="watermark" lang="pt-br">
      <WatermarkTool lang="pt-br" />
    </ImageShellIntl>
  );
}
