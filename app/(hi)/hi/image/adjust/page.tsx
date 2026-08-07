import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import AdjustTool from '@/components/image/AdjustTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('hi', 'adjust');

export default function HiImageAdjustPage() {
  return (
    <ImageShellIntl slug="adjust" lang="hi">
      <AdjustTool lang="hi" />
    </ImageShellIntl>
  );
}
