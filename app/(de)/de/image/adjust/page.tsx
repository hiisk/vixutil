import type { Metadata } from 'next';
import ImageShellIntl from '@/components/ImageShellIntl';
import AdjustTool from '@/components/image/AdjustTool';
import { imageMetaIntl } from '@/lib/image-tools-intl';

export const metadata: Metadata = imageMetaIntl('de', 'adjust');

export default function DeImageAdjustPage() {
  return (
    <ImageShellIntl slug="adjust" lang="de">
      <AdjustTool lang="de" />
    </ImageShellIntl>
  );
}
