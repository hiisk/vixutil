import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import AdjustTool from '@/components/image/AdjustTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('en', 'adjust');

export default function EnImageAdjustPage() {
  return (
    <ImageShellIntl slug="adjust" lang="en">
      <AdjustTool lang="en" />
    </ImageShellIntl>
  );
}
